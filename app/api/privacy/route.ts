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

    if (action === "delete") {
      const db = await getDb();

      db.run(`DELETE FROM visits WHERE visitor_id = '${sanitizedId.replace(/'/g, "''")}'`);

      return NextResponse.json({
        ok: true,
        message: "Your data has been deleted.",
      });
    }

    if (action === "access") {
      const db = await getDb();

      const result = db.exec(
        `SELECT page_path, page_title, visit_date, visit_time
         FROM visits
         WHERE visitor_id = '${sanitizedId.replace(/'/g, "''")}'
         ORDER BY id DESC
         LIMIT 100`
      );

      const visits =
        result.length > 0
          ? result[0].values.map((row: any[]) => ({
              pagePath: row[0],
              pageTitle: row[1],
              date: row[2],
              time: row[3],
            }))
          : [];

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
