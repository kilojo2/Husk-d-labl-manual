import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/track/beacon?d=<base64-encoded-payload>
 *
 * Image beacon fallback endpoint for browsers that block fetch() tracking
 * (e.g., Brave Shields, some privacy extensions).
 *
 * The client sends tracking data as a base64-encoded query parameter.
 * This endpoint decodes it and forwards to the main POST /api/track endpoint.
 *
 * Returns a 1x1 transparent GIF to satisfy the image request.
 */
export async function GET(request: NextRequest) {
  const encoded = request.nextUrl.searchParams.get("d") || "";

  if (!encoded) {
    // Return transparent GIF even for invalid requests
    return gifResponse();
  }

  let visitorCookie: string | null = null;
  try {
    const decoded = decodeURIComponent(atob(encoded));
    const payload = JSON.parse(decoded);

    // Forward to main tracking endpoint (internal request)
    const origin = new URL(request.url).origin;
    const headers = new Headers({ "Content-Type": "application/json" });
    for (const name of [
      "cookie",
      "cf-connecting-ip",
      "x-real-ip",
      "x-forwarded-for",
      "user-agent",
    ]) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }

    const trackingResponse = await fetch(`${origin}/api/track`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    visitorCookie = trackingResponse.headers.get("set-cookie");
  } catch {
    // Silently fail — tracking should never break the user experience
  }

  return gifResponse(visitorCookie);
}

/**
 * Return a 1x1 transparent GIF.
 */
function gifResponse(setCookie?: string | null): NextResponse {
  // Base64-encoded 1x1 transparent GIF
  const gifBase64 = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const gifBuffer = Buffer.from(gifBase64, "base64");

  const headers = new Headers({
    "Content-Type": "image/gif",
    "Content-Length": String(gifBuffer.length),
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  });
  if (setCookie) headers.set("Set-Cookie", setCookie);

  return new NextResponse(gifBuffer, { headers });
}
