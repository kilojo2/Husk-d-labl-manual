import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";
import { navigationSections } from "@/lib/navigation";
import fs from "fs";
import path from "path";

type PageMeta = {
  slug: string;
  title: string;
  description: string;
  sectionSlug: string;
  sortOrder: number;
  parentSlug: string;
  icon: string;
};

/**
 * POST /api/admin/migrate
 * Reads all existing page.tsx files and navigation, then populates cms_pages + cms_blocks.
 */
export async function POST(request: NextRequest) {
  const db = await getDb();

  // ═══ 1. Collect all pages from navigation ═══════════════════
  const pagesFromNav: PageMeta[] = [];

  for (const section of navigationSections) {
    const sectionSlug = section.title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    section.items.forEach((item, itemIdx) => {
      const slug = item.slug;
      const parentSlug = "";
      const icon = item.icon || "";

      if (item.children && item.children.length > 0) {
        // Parent page
        pagesFromNav.push({
          slug,
          title: item.title,
          description: "",
          sectionSlug,
          sortOrder: itemIdx,
          parentSlug,
          icon,
        });

        // Child pages
        item.children.forEach((child, childIdx) => {
          pagesFromNav.push({
            slug: child.slug,
            title: child.title,
            description: "",
            sectionSlug,
            sortOrder: childIdx,
            parentSlug: slug,
            icon: child.icon || "",
          });
        });
      } else {
        pagesFromNav.push({
          slug,
          title: item.title,
          description: "",
          sectionSlug,
          sortOrder: itemIdx,
          parentSlug,
          icon,
        });
      }
    });
  }

  console.log(`[migrate] ${pagesFromNav.length} pages found in navigation`);

  // ═══ 2. Read page.tsx files and extract blocks ═══════════════
  const appDir = path.join(process.cwd(), "app");

  let savedCount = 0;
  let errors: string[] = [];

  const readRecursive = (dir: string): string[] => {
    const files: string[] = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (
        entry.name.startsWith(".") ||
        entry.name.startsWith("[") ||
        entry.name === "node_modules" ||
        entry.name === "api" ||
        entry.name === "admin" ||
        entry.name === "db" ||
        entry.name === "favicon.ico" ||
        entry.name === "globals.css" ||
        entry.name === "layout.tsx" ||
        entry.name === "page.tsx"
      ) {
        if (entry.isDirectory() && entry.name !== "api" && entry.name !== "admin" && entry.name !== "db") {
          files.push(...readRecursive(path.join(dir, entry.name)));
        }
        continue;
      }

      if (entry.isDirectory()) {
        files.push(...readRecursive(path.join(dir, entry.name)));
      }
    }

    // Check if current dir has page.tsx
    const pageFile = path.join(dir, "page.tsx");
    if (fs.existsSync(pageFile)) {
      files.push(pageFile);
    }

    return files;
  };

  const pageFiles = readRecursive(appDir);
  console.log(`[migrate] ${pageFiles.length} page.tsx files found`);

  for (const file of pageFiles) {
    try {
      const content = fs.readFileSync(file, "utf-8");

      // Extract slug from path
      const relativePath = path.relative(appDir, file);
      let slug = path.dirname(relativePath).replace(/\\/g, "/");
      if (slug === "." || slug === "") slug = "home";

      // Convert app-directory path to navigation slug
      // e.g. "chaturbate-guide/broadcast" → "chaturbate-broadcast"
      const navSlug = slug.replace(/\//g, "-");

      // Extract meta
      const titleMatch = content.match(/title="([^"]*)"/);
      const descMatch = content.match(/description="([^"]*)"/);
      const title = titleMatch ? titleMatch[1] : slug;
      const description = descMatch ? descMatch[1] : "";

      // Find matching nav page for section/parent info
      const navPage = pagesFromNav.find((p) => p.slug === navSlug);
      const sectionSlug = navPage?.sectionSlug || "";
      const parentSlug = navPage?.parentSlug || "";
      const sortOrder = navPage?.sortOrder ?? 0;
      const icon = navPage?.icon || "";

      // Extract ContentBlock arrays
      const blocks = extractBlocks(content);

      if (blocks.length === 0) {
        continue; // Skip pages without ContentBlock arrays (like index pages with Link cards)
      }

      // Upsert page
      db.run(
        `INSERT INTO cms_pages (slug, title, description, section_slug, sort_order, is_published, parent_slug, icon, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?, datetime('now'))
         ON CONFLICT(slug) DO UPDATE SET
           title = excluded.title,
           description = excluded.description,
           section_slug = excluded.section_slug,
           sort_order = excluded.sort_order,
           parent_slug = excluded.parent_slug,
           icon = excluded.icon,
           updated_at = datetime('now')`,
        [navSlug, title, description, sectionSlug, sortOrder, parentSlug, icon]
      );

      // Delete old blocks and insert new ones
      db.run("DELETE FROM cms_blocks WHERE page_slug = ?", [navSlug]);

      const stmt = db.prepare(
        "INSERT INTO cms_blocks (page_slug, sort_order, block_type, content_json, created_at) VALUES (?, ?, ?, ?, datetime('now'))"
      );

      blocks.forEach((block: any, index: number) => {
        stmt.run([navSlug, index, block.type || "paragraph", JSON.stringify(block)]);
      });
      stmt.free();

      savedCount++;
      console.log(`  ✅ ${navSlug} (${blocks.length} blocks) from ${slug}`);
    } catch (err: any) {
      console.error(`  ❌ ${file}: ${err.message}`);
      errors.push(`${file}: ${err.message}`);
    }
  }

  // ═══ 3. Also add index pages (without blocks) from nav ═══════
  for (const page of pagesFromNav) {
    const existing = db.exec(
      `SELECT slug FROM cms_pages WHERE slug = '${page.slug.replace(/'/g, "''")}'`
    );
    if (existing.length > 0 && existing[0].values.length > 0) continue;

    db.run(
      `INSERT OR IGNORE INTO cms_pages (slug, title, description, section_slug, sort_order, is_published, parent_slug, icon, updated_at)
       VALUES (?, ?, ?, ?, ?, 1, ?, ?, datetime('now'))`,
      [page.slug, page.title, page.description, page.sectionSlug, page.sortOrder, page.parentSlug, page.icon]
    );
  }

  saveDb();

  return NextResponse.json({
    success: true,
    pagesFromNav: pagesFromNav.length,
    pagesWithBlocks: savedCount,
    errors: errors.length > 0 ? errors.slice(0, 10) : [],
  });
}

/**
 * Extract ContentBlock[] arrays from a TypeScript file content.
 */
function extractBlocks(content: string): any[] {
  const allBlocks: any[] = [];

  // Find all const/let/var xxx: ContentBlock[] = [...] or const xxx = [...]
  const regex = /(?:const|let|var)\s+(\w+)\s*(?::\s*(?:ContentBlock\[\]\s*=\s*|=\s*))(\[[\s\S]*?\]);/g;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    const rawArray = match[2];

    // Try to extract individual block objects
    const blockRegex = /\{\s*type:\s*"([^"]+)"(?:[\s\S]*?)\}/g;
    let blockMatch: RegExpExecArray | null;
    while ((blockMatch = blockRegex.exec(rawArray)) !== null) {
      try {
        // Extract key fields from block
        const blockText = blockMatch[0];

        const typeField = (blockText.match(/type:\s*"([^"]+)"/) || [])[1];
        const textField = (blockText.match(/text:\s*"((?:[^"\\]|\\.)*)"/) || [])[1];
        const emojiField = (blockText.match(/emoji:\s*"((?:[^"\\]|\\.)*)"/) || [])[1];

        // Extract items array
        const itemsMatch = blockText.match(/items:\s*\[([\s\S]*?)\]/);
        const items: string[] = [];
        if (itemsMatch) {
          const itemsStr = itemsMatch[1];
          const itemRegex = /"((?:[^"\\]|\\.)*)"/g;
          let itemMatch: RegExpExecArray | null;
          while ((itemMatch = itemRegex.exec(itemsStr)) !== null) {
            items.push(itemMatch[1]);
          }
        }

        // Extract headers array
        const headersMatch = blockText.match(/headers:\s*\[([\s\S]*?)\]/);
        const headers: string[] = [];
        if (headersMatch) {
          const headersStr = headersMatch[1];
          const headerRegex = /"((?:[^"\\]|\\.)*)"/g;
          let headerMatch: RegExpExecArray | null;
          while ((headerMatch = headerRegex.exec(headersStr)) !== null) {
            headers.push(headerMatch[1]);
          }
        }

        // Extract rows array
        const rowsMatch = blockText.match(/rows:\s*\[([\s\S]*?)\]\s*\]/);
        const rows: string[][] = [];
        if (rowsMatch) {
          const rowsStr = rowsMatch[1];
          const rowRegex = /\[([\s\S]*?)\]/g;
          let rowMatch: RegExpExecArray | null;
          while ((rowMatch = rowRegex.exec(rowsStr)) !== null) {
            const rowCells: string[] = [];
            const cellRegex = /"((?:[^"\\]|\\.)*)"/g;
            let cellMatch: RegExpExecArray | null;
            while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
              rowCells.push(cellMatch[1]);
            }
            if (rowCells.length > 0) rows.push(rowCells);
          }
        }

        const block: any = { type: typeField };
        if (textField !== undefined) block.text = textField;
        if (emojiField !== undefined) block.emoji = emojiField;
        if (items.length > 0) block.items = items;
        if (headers.length > 0) block.headers = headers;
        if (rows.length > 0) block.rows = rows;

        allBlocks.push(block);
      } catch {
        // skip broken blocks
      }
    }
  }

  return allBlocks;
}