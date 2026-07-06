/**
 * Application-level IP banning (fail2ban equivalent).
 *
 * Tracks violations per IP and automatically bans IPs that exceed
 * a threshold within a time window. Bans expire after a configurable
 * duration.
 *
 * This runs in-process (in-memory) since Railway does not expose
 * server-level iptables/fail2ban access.
 */

interface BanRecord {
  count: number;
  until: number; // timestamp when ban expires
}

const violationMap = new Map<string, BanRecord>();

const VIOLATION_THRESHOLD = 10; // 10 violations → ban
const BAN_DURATION_MS = 3600000; // ban for 1 hour

/**
 * Check if an IP is currently banned.
 */
export function isBanned(ipHash: string): boolean {
  const record = violationMap.get(ipHash);
  if (!record) return false;

  if (Date.now() > record.until) {
    violationMap.delete(ipHash);
    return false;
  }

  return true;
}

/**
 * Report a security violation for an IP.
 * If the IP exceeds the threshold, it gets banned.
 */
export function reportViolation(ipHash: string, reason = "unknown"): void {
  const now = Date.now();
  const record = violationMap.get(ipHash);

  if (!record) {
    violationMap.set(ipHash, {
      count: 1,
      until: now + BAN_DURATION_MS,
    });
    return;
  }

  record.count++;

  if (record.count >= VIOLATION_THRESHOLD) {
    record.until = now + BAN_DURATION_MS;
    console.warn(`[FAIL2BAN] IP ${ipHash.slice(0, 12)} banned for 1 hour (${record.count} violations, last: ${reason})`);
  }
}

/**
 * Get the current ban list (for admin dashboard).
 */
export function getBanList(): { ipHash: string; count: number; until: number }[] {
  const now = Date.now();
  const bans: { ipHash: string; count: number; until: number }[] = [];

  for (const [ipHash, record] of violationMap.entries()) {
    if (now < record.until) {
      bans.push({
        ipHash: ipHash.slice(0, 16) + "...",
        count: record.count,
        until: record.until,
      });
    }
  }

  return bans;
}

/**
 * Manually unban an IP.
 */
export function unbanIp(ipHash: string): void {
  violationMap.delete(ipHash);
}

/**
 * Periodic cleanup of expired bans.
 */
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of violationMap.entries()) {
      if (now > record.until) {
        violationMap.delete(key);
      }
    }
  }, 60000);
}
