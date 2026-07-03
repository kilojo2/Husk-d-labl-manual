import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { privatizeDailyStats } from "@/lib/differential-privacy";
import { getBanList } from "@/lib/fail2ban";
import { getRecentAnomalies, getAnomalyStats } from "@/lib/anomaly-monitor";

/**
 * GET /api/stats
 *
 * Returns aggregated visit statistics. Requires Authorization header
 * with Bearer token matching ADMIN_TOKEN environment variable.
 *
 * Query parameters:
 *   - days: number (default: 30) — how many days of daily stats to return
 *   - limit: number (default: 20) — how many top pages to return
 *
 * IP data is returned anonymized (masked IPs, no raw addresses).
 * Visitor counts have differential privacy noise applied.
 */
export async function GET(request: NextRequest) {
  // 1. Authentication
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN not configured on server" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  if (token !== adminToken) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = await getDb();
    const url = new URL(request.url);
    const days = Math.min(Math.abs(parseInt(url.searchParams.get("days") || "30", 10)), 365);
    const limit = Math.min(Math.abs(parseInt(url.searchParams.get("limit") || "20", 10)), 100);

    // 2. Daily stats (last N days) — with differential privacy
    const dailyResult = db.exec(`
      SELECT date, total_visits, unique_visitors, page_views
      FROM daily_stats
      ORDER BY date DESC
      LIMIT ${days}
    `);

    const daily = dailyResult.length > 0
      ? dailyResult[0].values.map((row: any[]) => ({
          date: row[0],
          totalVisits: row[1],
          uniqueVisitors: row[2],
          pageViews: row[3],
        }))
      : [];

    // Apply differential privacy to daily stats
    const privatizedDaily = privatizeDailyStats(daily);

    // 3. Top pages (all time)
    const pagesResult = db.exec(`
      SELECT page_path, page_title, SUM(views) as total_views
      FROM page_stats
      GROUP BY page_path
      ORDER BY total_views DESC
      LIMIT ${limit}
    `);

    const pages = pagesResult.length > 0
      ? pagesResult[0].values.map((row: any[]) => ({
          pagePath: row[0],
          pageTitle: row[1],
          views: row[2],
        }))
      : [];

    // 4. Today's realtime stats
    const today = new Date().toISOString().slice(0, 10);
    const todayResult = db.exec(`
      SELECT total_visits, unique_visitors, page_views
      FROM daily_stats
      WHERE date = '${today}'
    `);

    const realtime = todayResult.length > 0 && todayResult[0].values.length > 0
      ? {
          todayVisits: todayResult[0].values[0][0],
          todayUnique: todayResult[0].values[0][1],
          todayPageViews: todayResult[0].values[0][2],
        }
      : { todayVisits: 0, todayUnique: 0, todayPageViews: 0 };

    // 5. All-time totals
    const totalsResult = db.exec(`
      SELECT
        COALESCE(SUM(total_visits), 0) as all_visits,
        COALESCE(SUM(page_views), 0) as all_views
      FROM daily_stats
    `);

    const totals = totalsResult.length > 0 && totalsResult[0].values.length > 0
      ? {
          allTimeVisits: totalsResult[0].values[0][0],
          allTimePageViews: totalsResult[0].values[0][1],
        }
      : { allTimeVisits: 0, allTimePageViews: 0 };

    // 6. Recent visits (last 50) — with masked IPs
    const recentResult = db.exec(`
      SELECT page_path, page_title, referrer, visit_date, visit_time, user_agent, ip_hash, is_proxy
      FROM visits
      ORDER BY id DESC
      LIMIT 50
    `);

    const recent = recentResult.length > 0
      ? recentResult[0].values.map((row: any[]) => ({
          pagePath: row[0],
          pageTitle: row[1],
          referrer: row[2],
          date: row[3],
          time: row[4],
          userAgent: row[5],
          // Only expose first 16 chars of IP hash (anonymized)
          ipHash: row[6] ? (row[6] as string).slice(0, 16) + "..." : null,
          isProxy: row[7] === 1,
        }))
      : [];

    // 7. Security data (blocked IPs, anomaly stats)
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
