/**
 * Multi-level in-memory rate limiting.
 *
 * Three tiers of rate limiting:
 * - Tier 1 (Global): 10,000 requests/minute — prevents DDoS
 * - Tier 2 (Per-IP sustained): 60 requests/minute — normal browsing
 * - Tier 3 (Per-IP burst): 10 requests/10 seconds — rapid refresh protection
 *
 * Uses an in-memory Map with automatic cleanup to prevent memory leaks.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Tier 1: Global — 10,000 requests/minute
const GLOBAL_LIMIT = 10000;
const GLOBAL_WINDOW_MS = 60000;

// Tier 2: Per-IP sustained — 60 requests/minute
const TIER1_LIMIT = 60;
const TIER1_WINDOW_MS = 60000;

// Tier 3: Per-IP burst — 10 requests/10 seconds
const TIER2_LIMIT = 10;
const TIER2_WINDOW_MS = 10000;

let globalCount = 0;
let globalResetAt = Date.now() + GLOBAL_WINDOW_MS;

export interface RateLimitResult {
  blocked: boolean;
  retryAfter: number; // seconds until retry
  reason?: string;
}

/**
 * Check if a request should be rate-limited.
 *
 * @param ipHash — SHA-256 hash of the client IP
 * @returns RateLimitResult with blocked status and retry time
 */
export function checkRateLimit(ipHash: string): RateLimitResult {
  const now = Date.now();

  // --- Tier 1: Global rate limit ---
  if (now > globalResetAt) {
    globalCount = 0;
    globalResetAt = now + GLOBAL_WINDOW_MS;
  }
  globalCount++;
  if (globalCount > GLOBAL_LIMIT) {
    return {
      blocked: true,
      retryAfter: Math.ceil((globalResetAt - now) / 1000),
      reason: "global",
    };
  }

  // --- Per-IP rate limiting ---
  const record = rateLimitMap.get(ipHash);

  if (!record || now > record.resetAt) {
    // First visit or window expired — reset
    rateLimitMap.set(ipHash, {
      count: 1,
      resetAt: now + TIER1_WINDOW_MS,
    });
    return { blocked: false, retryAfter: 0 };
  }

  record.count++;

  // Tier 3: Burst check (10 requests in 10 seconds)
  const timeSinceWindowStart = now - (record.resetAt - TIER1_WINDOW_MS);
  if (timeSinceWindowStart < TIER2_WINDOW_MS && record.count > TIER2_LIMIT) {
    return {
      blocked: true,
      retryAfter: Math.ceil((TIER2_WINDOW_MS - timeSinceWindowStart) / 1000),
      reason: "burst",
    };
  }

  // Tier 2: Sustained check (60 requests per minute)
  if (record.count > TIER1_LIMIT) {
    return {
      blocked: true,
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
      reason: "sustained",
    };
  }

  return { blocked: false, retryAfter: 0 };
}

/**
 * Periodic cleanup of expired entries to prevent memory leaks.
 * Runs every 60 seconds.
 */
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000);
}
