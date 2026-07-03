/**
 * Differential privacy utilities for aggregated statistics.
 *
 * Adds calibrated Laplace noise to visitor counts before they are
 * displayed in the admin dashboard. This prevents re-identification
 * of individual visitors from aggregate data.
 *
 * The epsilon parameter controls the privacy-accuracy tradeoff:
 * - epsilon = 0.1: Strong privacy (more noise)
 * - epsilon = 1.0: Weak privacy (less noise)
 * - epsilon = 0.3: Default — good balance
 */

/**
 * Sample from the Laplace distribution.
 * Used to generate noise for differential privacy.
 */
function laplaceNoise(beta: number): number {
  const u = Math.random() - 0.5;
  return -beta * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
}

/**
 * Add calibrated noise to a count value.
 *
 * @param trueValue — The actual count
 * @param epsilon — Privacy budget (lower = more privacy)
 * @returns Noisy count (rounded to nearest integer, minimum 0)
 */
export function addNoise(trueValue: number, epsilon = 0.3): number {
  const beta = 1 / epsilon;
  const noise = laplaceNoise(beta);
  return Math.max(0, Math.round(trueValue + noise));
}

/**
 * Apply differential privacy to a stats object.
 * Adds noise to visitor counts while leaving metadata intact.
 */
export function privatizeStats<T extends Record<string, any>>(stats: T): T {
  const privatized = { ...stats };

  // Add noise to numeric visitor-related fields
  for (const key of Object.keys(privatized)) {
    const val = privatized[key];
    if (typeof val === "number") {
      // Only add noise to count-like fields
      if (
        key.toLowerCase().includes("visit") ||
        key.toLowerCase().includes("view") ||
        key.toLowerCase().includes("unique") ||
        key.toLowerCase().includes("count")
      ) {
        (privatized as any)[key] = addNoise(val, 0.3);
      }
    }
  }

  return privatized;
}

/**
 * Apply differential privacy to an array of daily stats.
 */
export function privatizeDailyStats(
  daily: { date: string; totalVisits: number; uniqueVisitors: number; pageViews: number }[]
): { date: string; totalVisits: number; uniqueVisitors: number; pageViews: number }[] {
  return daily.map((day) => ({
    date: day.date,
    totalVisits: addNoise(day.totalVisits, 0.3),
    uniqueVisitors: addNoise(day.uniqueVisitors, 0.5), // More noise for unique counts
    pageViews: addNoise(day.pageViews, 0.3),
  }));
}
