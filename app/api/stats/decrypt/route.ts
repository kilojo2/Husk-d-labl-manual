import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

/**
 * Derive AES key from user-provided key parts (same logic as lib/crypto.ts).
 */
function deriveKey(part1: string, part2: string, part3: string): Buffer {
  const combined = part1 + part2 + part3;
  if (combined.length < 32) {
    // Try single key
    if (combined.length === 64) {
      return Buffer.from(combined, "hex");
    }
    throw new Error("Invalid key: combined length must be at least 32 characters");
  }
  return crypto.createHash("sha256").update(combined).digest();
}

/**
 * POST /api/stats/decrypt
 *
 * Decrypts an IP address that was encrypted with AES-256-GCM.
 * Requires the encryption key (same as KEY_PART_1/2/3 or IP_ENCRYPTION_KEY).
 *
 * Body:
 *   encryptedIp: string — the encrypted IP from the database
 *   key: string — the encryption key (KEY_PART_1+KEY_PART_2+KEY_PART_3 or IP_ENCRYPTION_KEY)
 *
 * Returns:
 *   { ip: string } — the decrypted IP address
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate with ADMIN_TOKEN
    const adminToken = process.env.ADMIN_TOKEN;
    if (!adminToken) {
      return NextResponse.json(
        { error: "ADMIN_TOKEN not configured on server" },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.slice(7);
    if (token !== adminToken) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse body
    const body = await request.json();
    const { encryptedIp, key } = body;

    if (!encryptedIp || typeof encryptedIp !== "string") {
      return NextResponse.json(
        { error: "Missing required field: encryptedIp" },
        { status: 400 }
      );
    }

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { error: "Missing required field: key" },
        { status: 400 }
      );
    }

    // 3. Decrypt
    const parts = encryptedIp.split(":");
    if (parts.length !== 3) {
      return NextResponse.json(
        { error: "Invalid encrypted IP format" },
        { status: 400 }
      );
    }

    const [ivB64, authTagB64, ciphertext] = parts;

    // Try to derive key — support both combined key and single 64-char hex key
    let keyBuffer: Buffer;
    try {
      // If key is 64 hex chars, use as-is; otherwise treat as combined parts
      if (key.length === 64 && /^[0-9a-fA-F]+$/.test(key)) {
        keyBuffer = Buffer.from(key, "hex");
      } else {
        // Split key into 3 parts for deriveKey compatibility
        const third = Math.ceil(key.length / 3);
        const part1 = key.slice(0, third);
        const part2 = key.slice(third, third * 2);
        const part3 = key.slice(third * 2);
        keyBuffer = deriveKey(part1, part2, part3);
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid encryption key" },
        { status: 400 }
      );
    }

    try {
      const decipher = crypto.createDecipheriv(
        ALGORITHM,
        keyBuffer,
        Buffer.from(ivB64, "base64")
      );
      decipher.setAuthTag(Buffer.from(authTagB64, "base64"));

      let decrypted = decipher.update(ciphertext, "base64", "utf8");
      decrypted += decipher.final("utf8");

      return NextResponse.json({ ip: decrypted });
    } catch {
      return NextResponse.json(
        { error: "Decryption failed — wrong key or corrupted data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Decrypt API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
