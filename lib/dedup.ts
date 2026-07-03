/**
 * In-memory deduplication for visit tracking.
 *
 * Prevents the same visitor from recording multiple visits
 * to the same page within a configurable time window (default: 5 minutes).
 */

const DEDUP_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL_MS = 60 * 1000;  // Clean expired entries every 60s

// Map key: "visitorId:pagePath" -> value: timestamp of last visit
const visitCache = new Map<string, number>();

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Start the periodic cleanup of expired entries.
 * Call once on server startup.
 */
export function startDedupCleanup(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of visitCache.entries()) {
      if (now - timestamp > DEDUP_WINDOW_MS) {
        visitCache.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

/**
 * Stop the periodic cleanup.
 */
export function stopDedupCleanup(): void {
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }
}

/**
 * Check if this visit is a duplicate.
 *
 * Returns `true` if the same visitor has visited the same page
 * within the dedup window (5 minutes).
 *
 * If not a duplicate, records the visit timestamp and returns `false`.
 */
export function isDuplicate(visitorId: string, pagePath: string): boolean {
  const key = `${visitorId}:${pagePath}`;
  const now = Date.now();
  const lastVisit = visitCache.get(key);

  if (lastVisit && now - lastVisit < DEDUP_WINDOW_MS) {
    return true;
  }

  // Record this visit
  visitCache.set(key, now);
  return false;
}

/**
 * Get the current size of the dedup cache (for monitoring).
 */
export function getDedupCacheSize(): number {
  return visitCache.size;
}
