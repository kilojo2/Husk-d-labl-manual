/**
 * Automatic data retention enforcement (GDPR compliance).
 *
 * Deletes records older than the configured retention period.
 * Runs on server startup and periodically thereafter.
 *
 * Retention periods:
 * - Raw visits (with encrypted IPs): 90 days
 * - Daily aggregated stats: 365 days
 * - Page stats: 365 days
 * - Anomaly logs: 30 days
 */

import { getDb, saveDb } from "./db";

const RETENTION_DAYS_VISITS = 90;
const RETENTION_DAYS_STATS = 365;
const RETENTION_DAYS_ANOMALY = 30;
const CLEANUP_INTERVAL_MS = 86400000; // Run once per day

/**
 * Delete records older than the configured retention period.
 * Safe to call on every server startup.
 */
export async function cleanupOldRecords(): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;

    const now = new Date();
    const visitsCutoff = new Date(now);
    visitsCutoff.setDate(visitsCutoff.getDate() - RETENTION_DAYS_VISITS);
    const visitsCutoffStr = visitsCutoff.toISOString().slice(0, 10);

    const statsCutoff = new Date(now);
    statsCutoff.setDate(statsCutoff.getDate() - RETENTION_DAYS_STATS);
    const statsCutoffStr = statsCutoff.toISOString().slice(0, 10);

    const anomalyCutoff = new Date(now);
    anomalyCutoff.setDate(anomalyCutoff.getDate() - RETENTION_DAYS_ANOMALY);
    const anomalyCutoffStr = anomalyCutoff.toISOString().slice(0, 10);

    // Delete old visit records (including encrypted IPs)
    const visitsDeleted = db.run(
      `DELETE FROM visits WHERE visit_date < ?`,
      [visitsCutoffStr]
    );

    // Delete old daily stats
    db.run(
      `DELETE FROM daily_stats WHERE date < ?`,
      [statsCutoffStr]
    );

    // Delete old page stats
    db.run(
      `DELETE FROM page_stats WHERE date < ?`,
      [statsCutoffStr]
    );

    // Delete old anomaly logs
    db.run(
      `DELETE FROM anomaly_log WHERE created_at < ?`,
      [anomalyCutoffStr]
    );

    saveDb();

    console.log(
      `[CLEANUP] Cleaned up records older than ${visitsCutoffStr}`
    );
  } catch (err) {
    console.error("[CLEANUP] Error during cleanup:", err);
  }
}

/**
 * Start periodic cleanup. Call once on server startup.
 */
export function startCleanupScheduler(): void {
  // Run on startup (fire and forget)
  cleanupOldRecords().catch(() => {});

  // Run periodically
  setInterval(() => {
    cleanupOldRecords().catch(() => {});
  }, CLEANUP_INTERVAL_MS);

  console.log(`[CLEANUP] Scheduler started (interval: ${CLEANUP_INTERVAL_MS / 3600000}h)`);
}
