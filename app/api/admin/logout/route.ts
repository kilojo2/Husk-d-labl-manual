import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

/**
 * POST /api/admin/logout
 *
 * Ends the browser session by deleting the signed httpOnly cookie.
 */
export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Immediately expire
    path: "/",
  });

  return response;
}
