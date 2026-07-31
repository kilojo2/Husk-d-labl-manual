import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractIp } from "@/lib/extract-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { isBanned } from "@/lib/fail2ban";
import fs from "fs";
import path from "path";

/**
 * Next.js Edge Middleware
 *
 * Runs on every request. Performs:
 * 1. Maintenance mode check (if .maintenance file exists, block all except admin)
 * 2. IP extraction from request headers
 * 3. IP ban check (fail2ban)
 * 4. Rate limiting (multi-tier)
 * 5. Attaches IP info as request headers for downstream handlers
 *
 * NOTE: middleware runs in Edge runtime — fs is NOT available.
 * Use MAINTENANCE_MODE env var on Railway to enable maintenance mode.
 */

// Read the maintenance flag at module level
function isMaintenanceMode(): boolean {
  // Check env var first
  if (process.env.MAINTENANCE_MODE === "true") return true;

  // Check for .maintenance file in project root
  try {
    const flagPath = path.join(process.cwd(), ".maintenance");
    if (fs.existsSync(flagPath)) return true;
  } catch { /* ignore in Edge runtime */ }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ═══ MAINTENANCE MODE ═══════════════════════════════════════
  // Set MAINTENANCE_MODE=true env variable on Railway, OR
  // create a .maintenance file in the project root.
  // Admin and static assets remain accessible.
  if (process.env.MAINTENANCE_MODE === "true") {
    // Allow admin pages and API
    if (
      pathname.startsWith("/maintenance") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api/admin") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Redirect everything else to maintenance page
    const maintenanceUrl = new URL("/maintenance", request.url);
    return NextResponse.redirect(maintenanceUrl, 307);
  }

  // ═══ API PROTECTION ═════════════════════════════════════════
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

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
 * Match all routes for maintenance mode + API protection.
 */
export const config = {
  matcher: ["/:path*"],
};