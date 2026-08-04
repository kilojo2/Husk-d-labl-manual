import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/proxy
 * Server-side proxy for CORS-limited external API requests.
 *
 * Body: { url: string, method?: string, headers?: Record<string, string>, body?: any }
 *
 * Security:
 *   - Only allows HTTPS URLs to prevent SSRF to internal services
 *   - Blocks private/localhost IP ranges
 *   - 15-second timeout
 *   - Maximum response size: 5 MB
 */
export async function POST(request: NextRequest) {
  try {
    const { url, method = "GET", headers = {}, body } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    let targetUrl: URL;
    try {
      targetUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Only allow HTTPS
    if (targetUrl.protocol !== "https:") {
      return NextResponse.json({ error: "Only HTTPS URLs are allowed" }, { status: 400 });
    }

    // Block private IP ranges (SSRF protection)
    const blockedHosts = ["localhost", "127.0.0.1", "0.0.0.0", "10.", "172.16.", "192.168."];
    if (blockedHosts.some((h) => targetUrl.hostname.startsWith(h))) {
      return NextResponse.json({ error: "Blocked host" }, { status: 403 });
    }

    // Allow only GET and POST methods
    const allowedMethods = ["GET", "POST"];
    const safeMethod = allowedMethods.includes(method.toUpperCase())
      ? method.toUpperCase()
      : "GET";

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: safeMethod,
      headers: {
        "User-Agent": "KILLASNAZZ-Proxy/1.0",
        "Accept": "application/json, text/plain, */*",
        ...headers,
      },
    };

    if (safeMethod === "POST" && body) {
      fetchOptions.body = JSON.stringify(body);
      fetchOptions.headers = {
        ...fetchOptions.headers,
        "Content-Type": "application/json",
      };
    }

    // Fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetchOptions.signal = controller.signal;

    try {
      const response = await fetch(targetUrl.toString(), fetchOptions);
      clearTimeout(timeout);

      // Get response body as text, limit to 5 MB
      const text = await response.text();
      const maxSize = 5 * 1024 * 1024; // 5 MB
      const truncated = text.length > maxSize ? text.slice(0, maxSize) : text;

      let contentType = response.headers.get("content-type") || "text/plain";

      return new NextResponse(truncated, {
        status: response.status,
        headers: {
          "Content-Type": contentType,
          "X-Proxy-Status": "ok",
          "X-Original-Status": String(response.status),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (fetchError: any) {
      clearTimeout(timeout);
      return NextResponse.json(
        { error: "Proxy request failed", details: fetchError.message },
        { status: 502 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request", details: error.message },
      { status: 400 }
    );
  }
}

/**
 * OPTIONS /api/proxy — CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}