/**
 * SQLite database connection and schema initialization.
 *
 * Uses sql.js (pure JavaScript SQLite) to avoid native compilation issues.
 * The database file is persisted at the path specified by DATABASE_PATH env var,
 * defaulting to "data/visits.db" relative to the project root.
 */

import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";
import fs from "fs";
import path from "path";

let db: SqlJsDatabase | null = null;

function getDbPath(): string {
  return process.env.DATABASE_PATH || path.join(process.cwd(), "data", "visits.db");
}

/**
 * Initialize (or re-open) the SQLite database and ensure all tables exist.
 */
export async function getDb(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQL = await initSqlJs();
  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);

  // Ensure the data directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Enable WAL mode for better concurrent read performance
  db.run("PRAGMA journal_mode=WAL;");
  db.run("PRAGMA synchronous=NORMAL;");

  createTables(db);

  return db;
}

/**
 * Create tables if they don't exist.
 */
function createTables(database: SqlJsDatabase): void {
  database.run(`
    CREATE TABLE IF NOT EXISTS visits (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id    TEXT NOT NULL,
      page_path     TEXT NOT NULL,
      page_title    TEXT DEFAULT '',
      referrer      TEXT DEFAULT '',
      user_agent    TEXT DEFAULT '',
      screen_width  INTEGER DEFAULT 0,
      screen_height INTEGER DEFAULT 0,
      visit_date    TEXT NOT NULL,
      visit_time    TEXT NOT NULL,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS daily_stats (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      date            TEXT NOT NULL UNIQUE,
      total_visits    INTEGER NOT NULL DEFAULT 0,
      unique_visitors INTEGER NOT NULL DEFAULT 0,
      page_views      INTEGER NOT NULL DEFAULT 0,
      updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS page_stats (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      page_path    TEXT NOT NULL,
      page_title   TEXT DEFAULT '',
      date         TEXT NOT NULL,
      views        INTEGER NOT NULL DEFAULT 0,
      unique_views INTEGER NOT NULL DEFAULT 0,
      UNIQUE(page_path, date)
    )
  `);

  // Index for fast daily lookups
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visit_date)
  `);
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_visits_visitor ON visits(visitor_id)
  `);
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_visits_page ON visits(page_path)
  `);
}

/**
 * Persist the database to disk.
 * Must be called after any write operations.
 */
export function saveDb(): void {
  if (!db) return;
  const dbPath = getDbPath();
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

/**
 * Close the database connection gracefully.
 */
export function closeDb(): void {
  if (db) {
    saveDb();
    db.close();
    db = null;
  }
}
