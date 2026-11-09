import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSession,
  verifyAdminToken,
} from "@/lib/admin-auth";

/**
 * POST /api/admin/login
 *
 * Authenticates with ADMIN_TOKEN and returns an httpOnly session cookie.
 * This prevents the token from being stored in JavaScript-accessible memory.
 *
 * Body: { token: string }
 *
 * Returns: { ok: true } + Set-Cookie: admin_session=<random>; HttpOnly; Secure; SameSite=Strict
 */
export async function POST(request: NextRequest) {
  try {
    const adminToken = process.env.ADMIN_TOKEN;
    if (!adminToken) {
      return NextResponse.json(
        { error: "ADMIN_TOKEN not configured on server" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    // F13: Rate-limit login attempts per IP
    const ipHeader =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Simple in-memory rate limit: 5 attempts per 15 minutes per IP
    if (!loginRateLimit.has(ipHeader)) {
      loginRateLimit.set(ipHeader, { count: 0, resetAt: Date.now() + 900000 });
    }
    const limitRecord = loginRateLimit.get(ipHeader)!;
    if (Date.now() > limitRecord.resetAt) {
      limitRecord.count = 0;
      limitRecord.resetAt = Date.now() + 900000;
    }
    limitRecord.count++;
    if (limitRecord.count > 5) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429 }
      );
    }

    // Exact, timing-safe comparison. Correct prefixes are not valid tokens.
    if (!verifyAdminToken(token)) {
      // Artificial delay on failure
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const session = createAdminSession();

    const response = NextResponse.json({ ok: true });

    // Set httpOnly cookie — JavaScript CANNOT read this
    response.cookies.set(ADMIN_SESSION_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// In-memory login rate limit
const loginRateLimit = new Map<
  string,
  { count: number; resetAt: number }
>();
