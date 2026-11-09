import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * GET /api/admin/pages/[slug]
 * Returns a single page with all blocks.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const db = await getDb();
    const { slug } = await params;

    // Get page metadata
    const pageResult = db.exec(
      `SELECT slug, title, description, section_slug, sort_order, is_published, parent_slug, icon, created_at, updated_at FROM cms_pages WHERE slug = '${slug.replace(/'/g, "''")}'`
    );

    if (pageResult.length === 0 || pageResult[0].values.length === 0) {
      return NextResponse.json({ page: null, blocks: [] });
    }

    const row = pageResult[0].values[0];

    // Get blocks
    const blocksResult = db.exec(
      `SELECT id, sort_order, block_type, content_json FROM cms_blocks WHERE page_slug = '${slug.replace(/'/g, "''")}' ORDER BY sort_order`
    );

    const blocks = blocksResult.length > 0
      ? blocksResult[0].values.map((blockRow) => {
          let content: Record<string, unknown> = {};
          try {
            const parsed: unknown = JSON.parse(String(blockRow[3]));
            if (typeof parsed === "object" && parsed !== null) {
              content = parsed as Record<string, unknown>;
            }
          } catch { /* keep default */ }
          return {
            id: blockRow[0],
            sortOrder: blockRow[1],
            type: blockRow[2],
            ...content,
          };
        })
      : [];

    return NextResponse.json({
      page: {
        slug: row[0],
        title: row[1],
        description: row[2],
        sectionSlug: row[3],
        sortOrder: row[4],
        isPublished: row[5],
        parentSlug: row[6],
        icon: row[7],
        createdAt: row[8],
        updatedAt: row[9],
      },
      blocks,
    });
  } catch (error) {
    console.error("[API] GET /api/admin/pages/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}
