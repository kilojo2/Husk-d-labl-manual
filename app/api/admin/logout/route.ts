import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/logout
 *
 * Invalidates the admin session by deleting the httpOnly cookie.
 * The server-side session will naturally expire (or be cleaned up by
 * the periodic cleanup interval), but the cookie deletion ensures
 * the client cannot reuse it.
 */
export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Immediately expire
    path: "/",
  });

  return response;
}