/**
 * AES-256-GCM encryption for IP address storage.
 *
 * Encrypts IP addresses before writing to the database so that
 * even if the database file is compromised, the raw IPs remain
 * inaccessible without the encryption key.
 *
 * Key management:
 * - The encryption key is assembled from three environment variables
 *   (KEY_PART_1, KEY_PART_2, KEY_PART_3) to avoid a single point of
 *   compromise.
 * - The combined string is SHA-256 hashed to produce a 32-byte key.
 * - NEVER log or expose the key or decrypted IPs.
 */

import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

/**
 * Derive a 32-byte AES key from three environment variable parts.
 * This prevents the key from existing in any single place.
 */
function deriveKey(): Buffer {
  const part1 = process.env.KEY_PART_1 || "";
  const part2 = process.env.KEY_PART_2 || "";
  const part3 = process.env.KEY_PART_3 || "";
  const combined = part1 + part2 + part3;

  if (combined.length < 32) {
    // Fallback to single env var for backward compatibility
    const singleKey = process.env.IP_ENCRYPTION_KEY;
    if (singleKey && singleKey.length === 64) {
      return Buffer.from(singleKey, "hex");
    }
    // Development fallback — WARNING: not secure for production
    console.warn(
      "[CRYPTO] No encryption key found. Using derived fallback. Set KEY_PART_1/2/3 or IP_ENCRYPTION_KEY in production."
    );
    return crypto.createHash("sha256").update("dev-fallback-key-do-not-use-in-production").digest();
  }

  return crypto.createHash("sha256").update(combined).digest();
}

/**
 * Encrypt an IP address for storage.
 * Returns a colon-delimited string: iv:authTag:ciphertext (all base64).
 */
export function encryptIp(ip: string): string {
  const key = deriveKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(ip, "utf8", "base64");
  encrypted += cipher.final("base64");
  const authTag = cipher.getAuthTag().toString("base64");

  return `${iv.toString("base64")}:${authTag}:${encrypted}`;
}

/**
 * Decrypt an IP address from storage.
 * Expects the format produced by encryptIp.
 */
export function decryptIp(encrypted: string): string {
  const key = deriveKey();
  const parts = encrypted.split(":");

  if (parts.length !== 3) {
    throw new Error("Invalid encrypted IP format");
  }

  const [ivB64, authTagB64, ciphertext] = parts;

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivB64, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTagB64, "base64"));

  let decrypted = decipher.update(ciphertext, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Generate a new random encryption key (hex, 64 chars / 32 bytes).
 * Run once and distribute across KEY_PART_1/2/3 env vars.
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
