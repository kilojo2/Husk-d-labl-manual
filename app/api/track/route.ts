import { NextRequest, NextResponse } from "next/server";
import { isDuplicate, startDedupCleanup } from "@/lib/dedup";
import { recordVisit } from "@/lib/tracker";
import { sanitizeSearchQuery } from "@/lib/sanitize";

// Initialize dedup cleanup on module load (server-side only)
if (typeof globalThis !== "undefined") {
  startDedupCleanup();
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
 * Sets/reads hl_visitor cookie for deduplication.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate body
    const body = await request.json();

    const pagePath = sanitizeSearchQuery(body.pagePath || "", 255);
    if (!pagePath) {
      return NextResponse.json({ error: "pagePath is required" }, { status: 400 });
    }

    // 2. Get or create visitor cookie
    const existingCookie = request.cookies.get("hl_visitor");
    let visitorId: string;

    if (existingCookie?.value) {
      visitorId = existingCookie.value;
    } else {
      visitorId = generateVisitorId();
    }

    // 3. Deduplication check
    if (isDuplicate(visitorId, pagePath)) {
      // Still set the cookie if it's new, but don't record
      const response = NextResponse.json({ ok: true, deduplicated: true });
      if (!existingCookie) {
        response.cookies.set("hl_visitor", visitorId, {
          maxAge: 86400, // 24 hours
          path: "/",
          httpOnly: true,
          sameSite: "lax",
        });
      }
      return response;
    }

    // 4. Record the visit
    await recordVisit({
      pagePath,
      pageTitle: sanitizeSearchQuery(body.pageTitle || "", 255),
      referrer: sanitizeSearchQuery(body.referrer || "", 500),
      userAgent: sanitizeSearchQuery(body.userAgent || "", 500),
      screenWidth: Math.min(Math.abs(body.screenWidth || 0), 7680),
      screenHeight: Math.min(Math.abs(body.screenHeight || 0), 4320),
      visitorId,
    });

    // 5. Return success with cookie
    const response = NextResponse.json({ ok: true, deduplicated: false });
    response.cookies.set("hl_visitor", visitorId, {
      maxAge: 86400, // 24 hours
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
