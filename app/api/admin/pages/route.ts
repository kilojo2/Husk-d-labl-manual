import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";

/**
 * GET /api/admin/pages
 * Returns all CMS pages.
 */
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const result = db.exec(`
      SELECT slug, title, description, section_slug, sort_order, is_published, parent_slug, icon, created_at, updated_at
      FROM cms_pages
      ORDER BY section_slug, sort_order, title
    `);

    const pages = result.length > 0
      ? result[0].values.map((row: any) => ({
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
        }))
      : [];

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("[API] GET /api/admin/pages error:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

/**
 * POST /api/admin/pages
 * Create or update a page and its blocks.
 * Body: { slug, title, description?, sectionSlug?, sortOrder?, icon?, parentSlug?, isPublished?, blocks? }
 */
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { slug, title, description, sectionSlug, sortOrder, icon, parentSlug, isPublished, blocks } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
    }

    // Upsert page
    db.run(`
      INSERT INTO cms_pages (slug, title, description, section_slug, sort_order, is_published, parent_slug, icon, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        description = excluded.description,
        section_slug = excluded.section_slug,
        sort_order = excluded.sort_order,
        is_published = excluded.is_published,
        parent_slug = excluded.parent_slug,
        icon = excluded.icon,
        updated_at = datetime('now')
    `, [
      slug,
      title,
      description || "",
      sectionSlug || "",
      sortOrder ?? 0,
      isPublished ?? 1,
      parentSlug || "",
      icon || "",
    ]);

    // Save blocks if provided
    if (blocks && Array.isArray(blocks)) {
      // Delete old blocks
      db.run("DELETE FROM cms_blocks WHERE page_slug = ?", [slug]);

      // Insert new blocks
      const stmt = db.prepare(`
        INSERT INTO cms_blocks (page_slug, sort_order, block_type, content_json, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
      `);

      blocks.forEach((block: any, index: number) => {
        stmt.run([
          slug,
          index,
          block.type || "paragraph",
          JSON.stringify(block),
        ]);
      });
      stmt.free();
    }

    saveDb();

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("[API] POST /api/admin/pages error:", error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/pages?slug=xxx
 * Delete a page and its blocks.
 */
export async function DELETE(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    db.run("DELETE FROM cms_blocks WHERE page_slug = ?", [slug]);
    db.run("DELETE FROM cms_pages WHERE slug = ?", [slug]);
    saveDb();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] DELETE /api/admin/pages error:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}