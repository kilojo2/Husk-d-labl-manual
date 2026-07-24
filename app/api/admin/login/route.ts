import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * F8 fix: Timing-safe string comparison.
 */
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(
    b.slice(0, bufA.length).padEnd(bufA.length, "\0"),
    "utf8"
  );
  try {
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * In-memory session store.
 * In production, replace with Redis or a database-backed store.
 */
const adminSessions = new Map<
  string,
  { expiresAt: number; createdAt: number }
>();

// Export for use in stats routes
export function isAdminSessionValid(sessionId: string): boolean {
  const session = adminSessions.get(sessionId);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    adminSessions.delete(sessionId);
    return false;
  }
  return true;
}

// Clean up expired sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of adminSessions) {
    if (now > session.expiresAt) {
      adminSessions.delete(id);
    }
  }
}, 60000); // Every minute

/**
 * POST /api/admin/login
 *
 * Authenticates with ADMIN_TOKEN and returns an httpOnly session cookie.
 * This prevents the token from being stored in JavaScript-accessible memory.
 *
 * Body: { token: string }
 *
 * Returns: { ok: true } + Set-Cookie: admin_session=<random>; HttpOnly; Secure; SameSite=Strict
 */
export async function POST(request: NextRequest) {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    if (!adminToken) {
      return NextResponse.json(
        { error: "ADMIN_TOKEN not configured on server" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // F13: Rate-limit login attempts per IP
    const ipHeader =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Simple in-memory rate limit: 5 attempts per 15 minutes per IP
    if (!loginRateLimit.has(ipHeader)) {
      loginRateLimit.set(ipHeader, { count: 0, resetAt: Date.now() + 900000 });
    }
    const limitRecord = loginRateLimit.get(ipHeader)!;
    if (Date.now() > limitRecord.resetAt) {
      limitRecord.count = 0;
      limitRecord.resetAt = Date.now() + 900000;
    }
    limitRecord.count++;
    if (limitRecord.count > 5) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429 }
      );
    }

    // Timing-safe comparison
    if (!safeCompare(token, adminToken)) {
      // Artificial delay on failure
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Generate session ID
    const sessionId = crypto.randomBytes(32).toString("hex");

    // Store session (8 hour expiry)
    adminSessions.set(sessionId, {
      createdAt: Date.now(),
      expiresAt: Date.now() + 8 * 3600000,
    });

    const response = NextResponse.json({ ok: true });

    // Set httpOnly cookie — JavaScript CANNOT read this
    response.cookies.set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 28800, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// In-memory login rate limit
const loginRateLimit = new Map<
  string,
  { count: number; resetAt: number }
>();