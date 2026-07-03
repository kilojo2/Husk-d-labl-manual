import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractIp } from "@/lib/extract-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { isBanned } from "@/lib/fail2ban";

/**
 * Next.js Edge Middleware
 *
 * Runs before every API request. Performs:
 * 1. IP extraction from request headers
 * 2. IP ban check (fail2ban)
 * 3. Rate limiting (multi-tier)
 * 4. Attaches IP info as request headers for downstream handlers
 *
 * Only applies to /api/* routes to avoid overhead on static pages.
 */
export function middleware(request: NextRequest) {
  // 1. Extract IP information
  const ipInfo = extractIp(request);

  // 2. Check if IP is banned
  if (isBanned(ipInfo.ipHash)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: {
        "X-Robots-Tag": "noindex",
        "Retry-After": "3600",
      },
    });
  }

  // 3. Rate limit check
  const rateLimitResult = checkRateLimit(ipInfo.ipHash);
  if (rateLimitResult.blocked) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(rateLimitResult.retryAfter),
        "X-RateLimit-Reset": String(Math.ceil(Date.now() / 1000) + rateLimitResult.retryAfter),
      },
    });
  }

  // 4. Attach IP info to request headers for downstream handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ip-hash", ipInfo.ipHash);
  requestHeaders.set("x-ip-masked", ipInfo.ip);
  requestHeaders.set("x-ip-proxy", String(ipInfo.isProxy));

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

/**
 * Only run middleware on API routes.
 * Static pages and assets bypass middleware for performance.
 */
export const config = {
  matcher: ["/api/:path*"],
};
