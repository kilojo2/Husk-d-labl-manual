import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const SESSION_VERSION = "v1";
const MAX_BEARER_FAILURES = 5;
const BEARER_LOCKOUT_MS = 15 * 60 * 1000;

interface BearerFailureRecord {
  count: number;
  expiresAt: number;
}

const bearerFailures = new Map<string, BearerFailureRecord>();

function getAdminSecret(): string | null {
  const secret = process.env.ADMIN_TOKEN;
  return secret && secret.length > 0 ? secret : null;
}

/** Compare secrets without accepting prefixes or leaking byte differences. */
export function verifyAdminToken(candidate: string): boolean {
  const expected = getAdminSecret();
  if (!expected) return false;

  const candidateBuffer = Buffer.from(candidate, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  if (candidateBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(candidateBuffer, expectedBuffer);
}

function signSessionPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Create a signed, stateless session that works across processes and instances. */
export function createAdminSession(): string {
  const secret = getAdminSecret();
  if (!secret) throw new Error("ADMIN_TOKEN is not configured");

  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const nonce = crypto.randomBytes(16).toString("base64url");
  const payload = `${SESSION_VERSION}.${expiresAt}.${nonce}`;
  return `${payload}.${signSessionPayload(payload, secret)}`;
}

export function isAdminSessionValid(session: string): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  const parts = session.split(".");
  if (parts.length !== 4 || parts[0] !== SESSION_VERSION) return false;

  const expiresAt = Number(parts[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now()) return false;

  const maximumExpiry = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000 + 60_000;
  if (expiresAt > maximumExpiry) return false;

  const payload = parts.slice(0, 3).join(".");
  const expectedSignature = signSessionPayload(payload, secret);
  const receivedBuffer = Buffer.from(parts[3], "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  if (receivedBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

function getRequesterKey(request: NextRequest): string {
  return (
    request.headers.get("x-ip-hash") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/**
 * Return null for an authenticated request, otherwise a ready-to-return error.
 * Every data route performs this check; Proxy is not the security boundary.
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (session && isAdminSessionValid(session)) return null;

  if (!getAdminSecret()) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN not configured on server" },
      { status: 500 },
    );
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requesterKey = getRequesterKey(request);
  const now = Date.now();
  const failure = bearerFailures.get(requesterKey);
  if (failure && failure.expiresAt <= now) {
    bearerFailures.delete(requesterKey);
  } else if (failure && failure.count >= MAX_BEARER_FAILURES) {
    const retryAfter = Math.ceil((failure.expiresAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many authentication attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  const token = authorization.slice("Bearer ".length);
  if (verifyAdminToken(token)) {
    bearerFailures.delete(requesterKey);
    return null;
  }

  const currentFailure = bearerFailures.get(requesterKey);
  bearerFailures.set(requesterKey, {
    count: (currentFailure?.count ?? 0) + 1,
    expiresAt: currentFailure?.expiresAt ?? now + BEARER_LOCKOUT_MS,
  });
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
