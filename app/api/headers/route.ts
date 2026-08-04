import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/headers
 * Returns all incoming request headers as JSON.
 * Useful for debugging proxy/X-Forwarded-* headers.
 */
export async function GET(request: NextRequest) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return NextResponse.json({
    headers,
    url: request.url,
    method: request.method,
  });
}