import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * POST /api/privacy
 *
 * GDPR data access and deletion endpoint.
 * Allows users to request access to their data or deletion of their data.
 *
 * Request body:
 * {
 *   action: "access" | "delete",
 *   identifier: string (visitorId from cookie)
 * }
 *
 * Ownership is verified by matching the hl_visitor cookie against the
 * requested identifier, preventing IDOR (CWE-639).
 *
 * In production, this should be augmented with email verification.
 */
export async function POST(request: NextRequest) {
  try {
    const { action, identifier } = await request.json();

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json(
        { error: "identifier is required" },
        { status: 400 }
      );
    }

    const sanitizedId = identifier.trim().slice(0, 64);

    // F2 fix: Verify ownership — the hl_visitor cookie MUST match the requested identifier
    const visitorCookie = request.cookies.get("hl_visitor");
    if (!visitorCookie || visitorCookie.value !== sanitizedId) {
      console.warn(
        `[PRIVACY] Ownership verification failed: cookie=${visitorCookie?.value?.slice(0, 8)}... requested=${sanitizedId.slice(0, 8)}...`
      );
      return NextResponse.json(
        { error: "Cannot access another user's data" },
        { status: 403 }
      );
    }

    if (action === "delete") {
      const db = await getDb();

      // F1 fix: Parameterized query — impossible to inject
      const stmt = db.prepare(`DELETE FROM visits WHERE visitor_id = ?`);
      stmt.run([sanitizedId]);
      stmt.free();

      return NextResponse.json({
        ok: true,
        message: "Your data has been deleted.",
      });
    }

    if (action === "access") {
      const db = await getDb();

      // F1 fix: Parameterized query — impossible to inject
      const stmt = db.prepare(`
        SELECT page_path, page_title, visit_date, visit_time
        FROM visits
        WHERE visitor_id = ?
        ORDER BY id DESC
        LIMIT 100
      `);
      stmt.bind([sanitizedId]);

      const visits: Array<{
        pagePath: string;
        pageTitle: string;
        date: string;
        time: string;
      }> = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        visits.push({
          pagePath: String(row.page_path || ""),
          pageTitle: String(row.page_title || ""),
          date: String(row.visit_date || ""),
          time: String(row.visit_time || ""),
        });
      }
      stmt.free();

      return NextResponse.json({
        ok: true,
        data: {
          visitorId: sanitizedId,
          visitCount: visits.length,
          visits,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "access" or "delete".' },
      { status: 400 }
    );
  } catch (error) {
    console.error("Privacy endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
