import { NextRequest, NextResponse } from "next/server";
import { extractIp } from "@/lib/extract-ip";
import { reportViolation } from "@/lib/fail2ban";

/**
 * GET /api/honeypot
 *
 * Hidden endpoint — NEVER linked from the UI.
 * Bots and scrapers that discover this endpoint via directory scanning
 * get their IP reported to the fail2ban system.
 *
 * Returns a fake admin panel page to waste scraper resources.
 */
export async function GET(request: NextRequest) {
  const ipInfo = extractIp(request);

  // Log the violation
  console.warn(`[HONEYPOT] Bot detected: ${ipInfo.ipHash.slice(0, 12)}...`);

  // Report to fail2ban system
  reportViolation(ipInfo.ipHash, "honeypot_endpoint");

  // Return fake admin panel to waste scraper time
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head><title>Admin Panel</title></head>
<body style="background:#1c1c1e;color:#fff;font-family:system-ui;padding:40px;">
  <h1>Admin Dashboard</h1>
  <p>Loading statistics...</p>
  <div id="data"></div>
  <script>
    // Waste scraper CPU resources
    for(let i=0;i<100000;i++){
      console.log("Processing data chunk " + i);
      document.getElementById("data").innerHTML = "Processing: " + i + "%";
    }
  </script>
</body></html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}
