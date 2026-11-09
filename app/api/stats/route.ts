import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { privatizeDailyStats } from "@/lib/differential-privacy";
import { getBanList } from "@/lib/fail2ban";
import { getRecentAnomalies, getAnomalyStats } from "@/lib/anomaly-monitor";
import { requireAdmin } from "@/lib/admin-auth";

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
  const authError = requireAdmin(request);
  if (authError) return authError;

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
        ? recentResult[0].values.map((row) => ({
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
