/**
 * Database log rotation.
 *
 * SQLite is a single file. When it grows too large, performance degrades.
 * This module monitors database size and rotates (archives) the file
 * when it exceeds a configurable threshold.
 *
 * Rotation strategy:
 * 1. Close the current database connection
 * 2. Copy the database file to an archive directory with a timestamp
 * 3. The next getDb() call will create a fresh database
 * 4. Old records are cleaned up by cleanup.ts (GDPR retention)
 */

import fs from "fs";
import path from "path";
import { closeDb } from "./db";

const MAX_DB_SIZE_MB = 100; // Rotate when DB exceeds 100MB
const ARCHIVE_DIR = "archives";
const CHECK_INTERVAL_MS = 3600000; // Check every hour
let rotationTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Get the database file path (same logic as db.ts).
 */
function getDbPath(): string {
  return process.env.DATABASE_PATH || path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "visits.db");
}

/**
 * Check database size and rotate if needed.
 */
export function checkRotation(): void {
  const dbPath = getDbPath();

  if (!fs.existsSync(/* turbopackIgnore: true */ dbPath)) return;

  try {
    const stats = fs.statSync(/* turbopackIgnore: true */ dbPath);
    const sizeMB = stats.size / (1024 * 1024);

    if (sizeMB > MAX_DB_SIZE_MB) {
      rotateDatabase(dbPath, sizeMB);
    }
  } catch (err) {
    console.error("[ROTATION] Error checking database size:", err);
  }
}

/**
 * Rotate the database: archive the current file and start fresh.
 */
function rotateDatabase(dbPath: string, sizeMB: number): void {
  try {
    // 1. Close current connection (saves to disk)
    closeDb();

    // 2. Create archive directory
    const archiveDir = path.join(
      /* turbopackIgnore: true */ path.dirname(/* turbopackIgnore: true */ dbPath),
      ARCHIVE_DIR
    );
    if (!fs.existsSync(/* turbopackIgnore: true */ archiveDir)) {
      fs.mkdirSync(/* turbopackIgnore: true */ archiveDir, { recursive: true });
    }

    // 3. Archive old data
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const archiveName = `visits-${timestamp}.db`;
    const archivePath = path.join(/* turbopackIgnore: true */ archiveDir, archiveName);

    fs.copyFileSync(
      /* turbopackIgnore: true */ dbPath,
      /* turbopackIgnore: true */ archivePath
    );

    // 4. Truncate the original file (start fresh)
    // The database will be re-initialized on the next getDb() call
    fs.writeFileSync(/* turbopackIgnore: true */ dbPath, Buffer.alloc(0));

    console.log(
      `[ROTATION] Database archived: ${archiveName} (${sizeMB.toFixed(1)} MB → ${archiveDir})`
    );
  } catch (err) {
    console.error("[ROTATION] Error during rotation:", err);
  }
}

/**
 * Start the rotation scheduler. Call once on server startup.
 */
export function startRotationScheduler(): void {
  if (rotationTimer) return;

  // Check on startup
  checkRotation();

  // Check periodically
  rotationTimer = setInterval(checkRotation, CHECK_INTERVAL_MS);
  rotationTimer.unref?.();

  console.log(`[ROTATION] Scheduler started (check interval: ${CHECK_INTERVAL_MS / 3600000}h)`);
}
