import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { extractIp } from "@/lib/extract-ip";
import { checkRateLimit } from "@/lib/rate-limit";
import { isBanned } from "@/lib/fail2ban";
import { getDb } from "@/lib/db";
import { getArticleByHref } from "@/lib/navigation";

function isMaintenanceMode(): boolean {
  if (process.env.MAINTENANCE_MODE === "true") return true;

  try {
    return fs.existsSync(path.join(process.cwd(), ".maintenance"));
  } catch {
    return false;
  }
}

function isMaintenanceExempt(pathname: string): boolean {
  return (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/stats") ||
    pathname.startsWith("/api/quiz/results") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  );
}

async function hasPublishedCmsOverride(slug: string): Promise<boolean> {
  try {
    const db = await getDb();
    const statement = db.prepare(`
      SELECT 1
      FROM cms_pages
      WHERE slug = ?
        AND is_published = 1
        AND EXISTS (
          SELECT 1 FROM cms_blocks WHERE page_slug = cms_pages.slug
        )
      LIMIT 1
    `);
    statement.bind([slug]);
    const found = statement.step();
    statement.free();
    return found;
  } catch (error) {
    console.error("[CMS] Failed to check published override:", error);
    return false;
  }
}

/** Request boundary for maintenance redirects and API abuse protection. */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isMaintenanceMode() && !isMaintenanceExempt(pathname)) {
    return NextResponse.redirect(new URL("/maintenance", request.url), 307);
  }

  if (!pathname.startsWith("/api/")) {
    const article = getArticleByHref(pathname);
    if (article && (await hasPublishedCmsOverride(article.slug))) {
      const destination = request.nextUrl.clone();
      destination.pathname = `/db/${encodeURIComponent(article.slug)}`;
      return NextResponse.rewrite(destination);
    }

    return NextResponse.next();
  }

  const ipInfo = extractIp(request);
  if (isBanned(ipInfo.ipHash)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: {
        "X-Robots-Tag": "noindex",
        "Retry-After": "3600",
      },
    });
  }

  const rateLimitResult = checkRateLimit(ipInfo.ipHash);
  if (rateLimitResult.blocked) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": String(rateLimitResult.retryAfter),
        "X-RateLimit-Reset": String(
          Math.ceil(Date.now() / 1000) + rateLimitResult.retryAfter,
        ),
      },
    });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ip-hash", ipInfo.ipHash);
  requestHeaders.set("x-ip-masked", ipInfo.ip);
  requestHeaders.set("x-ip-proxy", String(ipInfo.isProxy));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/:path*"],
};
