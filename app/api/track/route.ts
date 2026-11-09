import { NextRequest, NextResponse } from "next/server";
import { isDuplicate, startDedupCleanup } from "@/lib/dedup";
import { deleteVisitorData, recordVisit } from "@/lib/tracker";
import { sanitizeSearchQuery } from "@/lib/sanitize";
import { extractIp } from "@/lib/extract-ip";
import { encryptIp } from "@/lib/crypto";
import { startCleanupScheduler } from "@/lib/cleanup";
import { startRotationScheduler } from "@/lib/log-rotation";

function ensureTrackingServicesStarted(): void {
  startDedupCleanup();
  startCleanupScheduler();
  startRotationScheduler();
}

/**
 * Generate a UUID v4 for visitor identification.
 */
function generateVisitorId(): string {
  // Use crypto.randomUUID if available (Node 19+)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function sanitizeText(value: unknown, maxLength: number): string {
  return sanitizeSearchQuery(typeof value === "string" ? value : "", maxLength);
}

function sanitizeDimension(value: unknown, maximum: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return 0;
  return Math.min(Math.abs(Math.trunc(value)), maximum);
}

function isValidVisitorId(value: string | undefined): value is string {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      ),
  );
}

/**
 * POST /api/track
 *
 * Records a page visit. Expects JSON body:
 * {
 *   pagePath: string,
 *   pageTitle?: string,
 *   referrer?: string,
 *   userAgent?: string,
 *   screenWidth?: number,
 *   screenHeight?: number
 * }
 *
 * IP address is extracted server-side from request headers,
 * encrypted with AES-256-GCM, and stored alongside a SHA-256 hash.
 * The raw IP is never exposed to the client or logged.
 *
 * Sets/reads hl_visitor cookie for deduplication.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate body
    const body = await request.json();

    if (body.analyticsConsent !== true) {
      return NextResponse.json(
        { error: "Analytics consent is required" },
        { status: 403 },
      );
    }

    // Start runtime services only after the visitor has explicitly consented.
    // Importing this module during `next build` must remain side-effect free.
    ensureTrackingServicesStarted();

    const pagePath = sanitizeText(body.pagePath, 255);
    if (!pagePath) {
      return NextResponse.json({ error: "pagePath is required" }, { status: 400 });
    }

    // 2. Extract IP information server-side (never from client body)
    const ipInfo = extractIp(request);

    // Encrypt the masked IP for storage
    const ipAddressEncrypted = encryptIp(ipInfo.ip);

    // 3. Get or create visitor cookie
    const existingCookie = request.cookies.get("hl_visitor");
    const existingVisitorId = existingCookie?.value;
    let visitorId: string;

    if (isValidVisitorId(existingVisitorId)) {
      visitorId = existingVisitorId;
    } else {
      visitorId = generateVisitorId();
    }

    // 4. Deduplication check
    if (isDuplicate(visitorId, pagePath)) {
      // Still set the cookie if it's new, but don't record
      const response = NextResponse.json({ ok: true, deduplicated: true });
      if (!isValidVisitorId(existingVisitorId)) {
        response.cookies.set("hl_visitor", visitorId, {
          maxAge: 86400, // 24 hours
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
      return response;
    }

    // 5. Record the visit with IP data
    await recordVisit({
      pagePath,
      pageTitle: sanitizeText(body.pageTitle, 255),
      referrer: sanitizeText(body.referrer, 500),
      userAgent: sanitizeText(body.userAgent, 500),
      screenWidth: sanitizeDimension(body.screenWidth, 7680),
      screenHeight: sanitizeDimension(body.screenHeight, 4320),
      visitorId,
      ipAddressEncrypted,
      ipHash: ipInfo.ipHash,
      isProxy: ipInfo.isProxy,
    });

    // 6. Return success with cookie
    const response = NextResponse.json({ ok: true, deduplicated: false });
    response.cookies.set("hl_visitor", visitorId, {
      maxAge: 86400, // 24 hours
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** Withdraw analytics consent and remove data linked to the visitor cookie. */
export async function DELETE(request: NextRequest) {
  const visitorId = request.cookies.get("hl_visitor")?.value;
  let deletionFailed = false;

  try {
    if (visitorId) {
      await deleteVisitorData(visitorId.slice(0, 64));
    }
  } catch (error) {
    deletionFailed = true;
    console.error("Visitor data deletion error:", error);
  }

  const response = NextResponse.json(
    deletionFailed
      ? { ok: false, error: "Failed to delete stored visitor data" }
      : { ok: true },
    { status: deletionFailed ? 500 : 200 },
  );
  response.cookies.set("hl_visitor", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
