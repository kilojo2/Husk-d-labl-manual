/**
 * Server-side visit recording logic.
 *
 * Records a visit event into the SQLite database and updates
 * aggregated daily and per-page statistics.
 */

import { getDb, saveDb } from "./db";

export interface VisitEvent {
  pagePath: string;
  pageTitle: string;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  visitorId: string;
}

/**
 * Record a visit in the database.
 *
 * Inserts a row into `visits`, then upserts `daily_stats` and `page_stats`.
 */
export async function recordVisit(event: VisitEvent): Promise<void> {
  const db = await getDb();
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const timeStr = now.toISOString().slice(11, 19); // HH:MM:SS

  // 1. Insert raw visit record
  db.run(
    `INSERT INTO visits (visitor_id, page_path, page_title, referrer, user_agent, screen_width, screen_height, visit_date, visit_time)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      event.visitorId,
      event.pagePath,
      event.pageTitle,
      event.referrer,
      event.userAgent,
      event.screenWidth,
      event.screenHeight,
      dateStr,
      timeStr,
    ]
  );

  // 2. Upsert daily_stats
  db.run(
    `INSERT INTO daily_stats (date, total_visits, unique_visitors, page_views)
     VALUES (?, 1, 1, 1)
     ON CONFLICT(date) DO UPDATE SET
       total_visits    = total_visits + 1,
       page_views      = page_views + 1,
       updated_at      = datetime('now')`,
    [dateStr]
  );

  // 3. Upsert page_stats
  db.run(
    `INSERT INTO page_stats (page_path, page_title, date, views, unique_views)
     VALUES (?, ?, ?, 1, 1)
     ON CONFLICT(page_path, date) DO UPDATE SET
       views   = views + 1,
       updated_at = datetime('now')`,
    [event.pagePath, event.pageTitle, dateStr]
  );

  // Persist to disk
  saveDb();
}
