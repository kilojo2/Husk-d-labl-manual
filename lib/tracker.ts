/**
 * Server-side visit recording logic.
 *
 * Records a visit event into the SQLite database and updates
 * aggregated daily and per-page statistics.
 *
 * Extended with IP address collection:
 * - IP is encrypted (AES-256-GCM) before storage
 * - IP is SHA-256 hashed for deduplication
 * - Raw IP is never logged or exposed
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
  /** AES-256-GCM encrypted IP address */
  ipAddressEncrypted?: string;
  /** SHA-256 hash of the raw IP for deduplication */
  ipHash?: string;
  /** Whether the request came through a proxy/VPN */
  isProxy?: boolean;
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

  const dailyUnique = hasVisit(db, event.visitorId, dateStr) ? 0 : 1;
  const pageUnique = hasVisit(db, event.visitorId, dateStr, event.pagePath) ? 0 : 1;

  db.run("BEGIN TRANSACTION");
  try {
    db.run(
      `INSERT INTO visits
         (visitor_id, page_path, page_title, referrer, user_agent,
          screen_width, screen_height, ip_address_encrypted, ip_hash, is_proxy,
          visit_date, visit_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.visitorId,
        event.pagePath,
        event.pageTitle,
        event.referrer,
        event.userAgent,
        event.screenWidth,
        event.screenHeight,
        event.ipAddressEncrypted || "",
        event.ipHash || "",
        event.isProxy ? 1 : 0,
        dateStr,
        timeStr,
      ],
    );

    db.run(
      `INSERT INTO daily_stats (date, total_visits, unique_visitors, page_views)
       VALUES (?, 1, ?, 1)
       ON CONFLICT(date) DO UPDATE SET
         total_visits    = total_visits + 1,
         unique_visitors = unique_visitors + excluded.unique_visitors,
         page_views      = page_views + 1,
         updated_at      = datetime('now')`,
      [dateStr, dailyUnique],
    );

    db.run(
      `INSERT INTO page_stats
         (page_path, page_title, date, views, unique_views, updated_at)
       VALUES (?, ?, ?, 1, ?, datetime('now'))
       ON CONFLICT(page_path, date) DO UPDATE SET
         page_title   = excluded.page_title,
         views        = views + 1,
         unique_views = unique_views + excluded.unique_views,
         updated_at   = datetime('now')`,
      [event.pagePath, event.pageTitle, dateStr, pageUnique],
    );

    db.run("COMMIT");
    saveDb();
  } catch (error) {
    db.run("ROLLBACK");
    throw error;
  }
}

function hasVisit(
  db: Awaited<ReturnType<typeof getDb>>,
  visitorId: string,
  date: string,
  pagePath?: string,
): boolean {
  const statement = pagePath
    ? db.prepare(
        "SELECT 1 FROM visits WHERE visitor_id = ? AND visit_date = ? AND page_path = ? LIMIT 1",
      )
    : db.prepare(
        "SELECT 1 FROM visits WHERE visitor_id = ? AND visit_date = ? LIMIT 1",
      );

  statement.bind(pagePath ? [visitorId, date, pagePath] : [visitorId, date]);
  const exists = statement.step();
  statement.free();
  return exists;
}

/** Delete a visitor's raw records and rebuild aggregates from remaining data. */
export async function deleteVisitorData(visitorId: string): Promise<void> {
  const db = await getDb();
  const affectedRows: Array<{ date: string; pagePath: string }> = [];
  const affectedStatement = db.prepare(
    "SELECT DISTINCT visit_date, page_path FROM visits WHERE visitor_id = ?",
  );
  affectedStatement.bind([visitorId]);
  while (affectedStatement.step()) {
    const row = affectedStatement.getAsObject();
    affectedRows.push({
      date: String(row.visit_date ?? ""),
      pagePath: String(row.page_path ?? ""),
    });
  }
  affectedStatement.free();

  db.run("BEGIN TRANSACTION");
  try {
    db.run("DELETE FROM visits WHERE visitor_id = ?", [visitorId]);
    rebuildAffectedAggregates(db, affectedRows);
    db.run("COMMIT");
    saveDb();
  } catch (error) {
    db.run("ROLLBACK");
    throw error;
  }
}

function rebuildAffectedAggregates(
  db: Awaited<ReturnType<typeof getDb>>,
  affectedRows: Array<{ date: string; pagePath: string }>,
): void {
  const affectedDates = new Set(affectedRows.map((row) => row.date));

  for (const date of affectedDates) {
    db.run("DELETE FROM daily_stats WHERE date = ?", [date]);
    db.run(
      `INSERT INTO daily_stats
         (date, total_visits, unique_visitors, page_views, updated_at)
       SELECT
         visit_date,
         COUNT(*),
         COUNT(DISTINCT visitor_id),
         COUNT(*),
         datetime('now')
       FROM visits
       WHERE visit_date = ?
       GROUP BY visit_date`,
      [date],
    );
  }

  for (const { date, pagePath } of affectedRows) {
    db.run("DELETE FROM page_stats WHERE date = ? AND page_path = ?", [
      date,
      pagePath,
    ]);
    db.run(
      `INSERT INTO page_stats
         (page_path, page_title, date, views, unique_views, updated_at)
       SELECT
         page_path,
         MAX(page_title),
         visit_date,
         COUNT(*),
         COUNT(DISTINCT visitor_id),
         datetime('now')
       FROM visits
       WHERE visit_date = ? AND page_path = ?
       GROUP BY page_path, visit_date`,
      [date, pagePath],
    );
  }
}
