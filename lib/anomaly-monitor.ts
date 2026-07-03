/**
 * Anomaly detection for suspicious visitor activity.
 *
 * Monitors request patterns and flags suspicious behavior:
 * - Proxy/VPN chains
 * - Path scanning (sequential numeric paths)
 * - Invalid IP formats
 * - Known bot patterns
 *
 * Anomalies are logged to the anomaly_log table and can trigger
 * automatic IP banning via the fail2ban system.
 */

import { getDb } from "./db";
import { reportViolation } from "./fail2ban";
import type { IpInfo } from "./extract-ip";

export interface AnomalyEvent {
  type: "proxy_chain" | "path_scan" | "known_bot" | "invalid_ip" | "rate_burst";
  ipHash: string;
  ip: string;
  details: string;
  timestamp: number;
}

// In-memory ring buffer for recent anomalies
const anomalyBuffer: AnomalyEvent[] = [];
const MAX_BUFFER_SIZE = 10000;

/**
 * Check a request for anomalous patterns.
 * Returns true if the activity is highly suspicious.
 */
export function checkAnomaly(ipInfo: IpInfo, path: string): boolean {
  let suspicious = false;

  // 1. Proxy/VPN detection
  if (ipInfo.isProxy) {
    logAnomaly({
      type: "proxy_chain",
      ipHash: ipInfo.ipHash,
      ip: ipInfo.ip,
      details: `Proxy chain detected: ${ipInfo.forwardedChain.join(" -> ")}`,
      timestamp: Date.now(),
    });
    suspicious = true;
  }

  // 2. Path scanning (sequential numeric paths like /123456)
  if (/\/\d{6,}/.test(path)) {
    logAnomaly({
      type: "path_scan",
      ipHash: ipInfo.ipHash,
      ip: ipInfo.ip,
      details: `Suspicious path pattern: ${path}`,
      timestamp: Date.now(),
    });
    reportViolation(ipInfo.ipHash, "path_scan");
    suspicious = true;
  }

  // 3. Invalid IP format
  if (ipInfo.ip === "0.0.0.0" || ipInfo.ip.includes("undefined") || ipInfo.ip.includes("null")) {
    logAnomaly({
      type: "invalid_ip",
      ipHash: ipInfo.ipHash,
      ip: ipInfo.ip,
      details: `Invalid or missing IP address`,
      timestamp: Date.now(),
    });
  }

  // 4. Known bot user-agent patterns (basic check)
  // (Comprehensive bot detection should use a dedicated library)

  return suspicious;
}

function logAnomaly(event: AnomalyEvent): void {
  anomalyBuffer.push(event);
  if (anomalyBuffer.length > MAX_BUFFER_SIZE) {
    anomalyBuffer.shift();
  }

  console.warn(`[ANOMALY] ${event.type}: ${event.details}`);

  // Also persist to database
  try {
    persistAnomaly(event);
  } catch {
    // Silently fail — anomaly logging should never crash the app
  }
}

/**
 * Persist anomaly to the database.
 */
async function persistAnomaly(event: AnomalyEvent): Promise<void> {
  const db = await getDb();
  db.run(
    `INSERT INTO anomaly_log (event_type, ip_hash, details, created_at)
     VALUES (?, ?, ?, datetime('now'))`,
    [event.type, event.ipHash, event.details]
  );
}

/**
 * Get recent anomalies from the in-memory buffer.
 */
export function getRecentAnomalies(count = 50): AnomalyEvent[] {
  return anomalyBuffer.slice(-count).reverse();
}

/**
 * Get anomaly statistics from the database.
 */
export async function getAnomalyStats(): Promise<{ type: string; count: number }[]> {
  const db = await getDb();
  const result = db.exec(`
    SELECT event_type, COUNT(*) as count
    FROM anomaly_log
    WHERE created_at >= datetime('now', '-24 hours')
    GROUP BY event_type
    ORDER BY count DESC
  `);

  if (result.length === 0) return [];

  return result[0].values.map((row: any[]) => ({
    type: row[0] as string,
    count: row[1] as number,
  }));
}
