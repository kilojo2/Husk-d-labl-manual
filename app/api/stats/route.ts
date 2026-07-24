import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";
import { privatizeDailyStats } from "@/lib/differential-privacy";
import { getBanList } from "@/lib/fail2ban";
import { getRecentAnomalies, getAnomalyStats } from "@/lib/anomaly-monitor";
import { isAdminSessionValid } from "@/app/api/admin/login/route";

/**
 * F8 fix: Timing-safe string comparison using crypto.timingSafeEqual.
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
 * F13 fix: In-memory brute force protection for Bearer token auth.
 */
interface AuthFailureRecord {
  count: number;
  until: number;
}
const adminAuthFailures = new Map<string, AuthFailureRecord>();
const MAX_AUTH_FAILURES = 5;
const AUTH_LOCKOUT_MS = 900000; // 15 minutes

function getIpHashForAuth(request: NextRequest): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  const realIp = request.headers.get("x-real-ip");
  const xff = request.headers.get("x-forwarded-for");
  const raw = cfIp || realIp || xff?.split(",")[0]?.trim() || "unknown";
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    hash = hash & hash;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Unified authentication check.
 * Returns true if the request is authenticated via admin_session cookie OR Bearer token.
 */
async function authenticateRequest(
  request: NextRequest
): Promise<{ ok: boolean; errorResponse?: NextResponse }> {
  // F7: Check httpOnly cookie session first (no brute-force needed)
  const sessionId = request.cookies.get("admin_session")?.value;
  if (sessionId && isAdminSessionValid(sessionId)) {
    return { ok: true };
  }

  // Fallback: Bearer token with brute-force protection (F13)
  const ipHash = getIpHashForAuth(request);

  // Check lockout
  const failRecord = adminAuthFailures.get(ipHash);
  if (
    failRecord &&
    failRecord.count >= MAX_AUTH_FAILURES &&
    Date.now() < failRecord.until
  ) {
    const retryAfter = Math.ceil((failRecord.until - Date.now()) / 1000);
    return {
      ok: false,
      errorResponse: NextResponse.json(
        { error: "Too many authentication attempts. Try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      ),
    };
  }

  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return {
      ok: false,
      errorResponse: NextResponse.json(
        { error: "ADMIN_TOKEN not configured on server" },
        { status: 500 }
      ),
    };
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      ok: false,
      errorResponse: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.slice(7);

  if (!safeCompare(token, adminToken)) {
    const record = failRecord || {
      count: 0,
      until: Date.now() + AUTH_LOCKOUT_MS,
    };
    record.count++;
    adminAuthFailures.set(ipHash, record);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ok: false,
      errorResponse: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  adminAuthFailures.delete(ipHash);
  return { ok: true };
}

/**
 * GET /api/stats
 *
 * Returns aggregated visit statistics. Requires authentication via
 * admin_session cookie (httpOnly) or Bearer token (legacy).
 *
 * Security improvements (F5, F7, F8, F13):
 *   - httpOnly session cookie support (F7)
 *   - Timing-safe token comparison (F8)
 *   - Brute force protection (5 failures → 15 min lockout per IP, F13)
 *   - Parameterized queries (F5)
 */
export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if (!auth.ok) {
    return auth.errorResponse!;
  }

  try {
    const db = await getDb();
    const url = new URL(request.url);
    const days = Math.min(
      Math.abs(parseInt(url.searchParams.get("days") || "30", 10)),
      365
    );
    const limit = Math.min(
      Math.abs(parseInt(url.searchParams.get("limit") || "20", 10)),
      100
    );

    // 2. Daily stats (last N days) — parameterized (F5)
    const dailyStmt = db.prepare(`
      SELECT date, total_visits, unique_visitors, page_views
      FROM daily_stats
      ORDER BY date DESC
      LIMIT ?
    `);
    dailyStmt.bind([days]);

    const dailyRows: Array<{
      date: string;
      totalVisits: number;
      uniqueVisitors: number;
      pageViews: number;
    }> = [];
    while (dailyStmt.step()) {
      const row = dailyStmt.getAsObject();
      dailyRows.push({
        date: String(row.date || ""),
        totalVisits: Number(row.total_visits || 0),
        uniqueVisitors: Number(row.unique_visitors || 0),
        pageViews: Number(row.page_views || 0),
      });
    }
    dailyStmt.free();

    const privatizedDaily = privatizeDailyStats(dailyRows);

    // 3. Top pages — parameterized (F5)
    const pagesStmt = db.prepare(`
      SELECT page_path, page_title, SUM(views) as total_views
      FROM page_stats
      GROUP BY page_path
      ORDER BY total_views DESC
      LIMIT ?
    `);
    pagesStmt.bind([limit]);

    const pages: Array<{
      pagePath: string;
      pageTitle: string;
      views: number;
    }> = [];
    while (pagesStmt.step()) {
      const row = pagesStmt.getAsObject();
      pages.push({
        pagePath: String(row.page_path || ""),
        pageTitle: String(row.page_title || ""),
        views: Number(row.total_views || 0),
      });
    }
    pagesStmt.free();

    // 4. Today's realtime stats — parameterized (F5)
    const today = new Date().toISOString().slice(0, 10);
    const todayStmt = db.prepare(`
      SELECT total_visits, unique_visitors, page_views
      FROM daily_stats
      WHERE date = ?
    `);
    todayStmt.bind([today]);

    let realtime = { todayVisits: 0, todayUnique: 0, todayPageViews: 0 };
    if (todayStmt.step()) {
      const row = todayStmt.getAsObject();
      realtime = {
        todayVisits: Number(row.total_visits || 0),
        todayUnique: Number(row.unique_visitors || 0),
        todayPageViews: Number(row.page_views || 0),
      };
    }
    todayStmt.free();

    // 5. All-time totals (no user input)
    const totalsResult = db.exec(`
      SELECT
        COALESCE(SUM(total_visits), 0) as all_visits,
        COALESCE(SUM(page_views), 0) as all_views
      FROM daily_stats
    `);

    const totals =
      totalsResult.length > 0 && totalsResult[0].values.length > 0
        ? {
            allTimeVisits: totalsResult[0].values[0][0],
            allTimePageViews: totalsResult[0].values[0][1],
          }
        : { allTimeVisits: 0, allTimePageViews: 0 };

    // 6. Recent visits (no user input)
    const recentResult = db.exec(`
      SELECT page_path, page_title, referrer, visit_date, visit_time,
             user_agent, ip_hash, is_proxy, ip_address_encrypted
      FROM visits
      ORDER BY id DESC
      LIMIT 50
    `);

    const recent =
      recentResult.length > 0
        ? recentResult[0].values.map((row: any[]) => ({
            pagePath: row[0],
            pageTitle: row[1],
            referrer: row[2],
            date: row[3],
            time: row[4],
            userAgent: row[5],
            ipHash: row[6] ? (row[6] as string).slice(0, 16) + "..." : null,
            isProxy: row[7] === 1,
            ipAddressEncrypted: row[8] || null,
          }))
        : [];

    // 7. Security data
    const blockedIps = getBanList();
    const anomalyStats = await getAnomalyStats();
    const recentAnomalies = getRecentAnomalies(20).map((a) => ({
      type: a.type,
      ipHash: a.ipHash.slice(0, 16) + "...",
      details: a.details,
      timestamp: a.timestamp,
    }));

    return NextResponse.json({
      daily: privatizedDaily,
      pages,
      realtime,
      totals,
      recent,
      security: {
        blockedIps,
        anomalyStats,
        recentAnomalies,
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}