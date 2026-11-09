import { getDb } from "@/lib/db";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

type LoadedPage =
  | { status: "found"; title: string; description: string; blocks: ContentBlock[] }
  | { status: "not-found" }
  | { status: "error" };

const BLOCK_TYPES = new Set<ContentBlock["type"]>([
  "heading",
  "subheading",
  "paragraph",
  "list",
  "ordered-list",
  "divider",
  "note",
  "link-block",
  "table",
]);

function isBlockType(value: string): value is ContentBlock["type"] {
  return BLOCK_TYPES.has(value as ContentBlock["type"]);
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : undefined;
}

function stringRows(value: unknown): string[][] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter(Array.isArray)
    .map((row) => row.filter((cell): cell is string => typeof cell === "string"));
}

async function loadPage(slug: string): Promise<LoadedPage> {
  try {
    const db = await getDb();
    const pageStatement = db.prepare(
      "SELECT title, description FROM cms_pages WHERE slug = ? AND is_published = 1",
    );
    pageStatement.bind([slug]);

    if (!pageStatement.step()) {
      pageStatement.free();
      return { status: "not-found" };
    }

    const page = pageStatement.getAsObject();
    pageStatement.free();

    const blockStatement = db.prepare(
      "SELECT block_type, content_json FROM cms_blocks WHERE page_slug = ? ORDER BY sort_order",
    );
    blockStatement.bind([slug]);
    const blocks: ContentBlock[] = [];

    while (blockStatement.step()) {
      const row = blockStatement.getAsObject();
      const typeValue = String(row.block_type ?? "paragraph");
      if (!isBlockType(typeValue)) continue;

      let content: Record<string, unknown> = {};
      try {
        const parsed: unknown = JSON.parse(String(row.content_json ?? "{}"));
        if (typeof parsed === "object" && parsed !== null) {
          content = parsed as Record<string, unknown>;
        }
      } catch {
        // Invalid CMS JSON is represented as an empty block instead of crashing.
      }

      blocks.push({
        type: typeValue,
        text: typeof content.text === "string" ? content.text : undefined,
        emoji: typeof content.emoji === "string" ? content.emoji : undefined,
        items: stringArray(content.items),
        headers: stringArray(content.headers),
        rows: stringRows(content.rows),
      });
    }
    blockStatement.free();

    return {
      status: "found",
      title: String(page.title ?? ""),
      description: String(page.description ?? ""),
      blocks,
    };
  } catch (error) {
    console.error("[DynamicPage] Error:", error);
    return { status: "error" };
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await loadPage(slug);

  if (page.status === "not-found") {
    return (
      <ArticlePage title="Страница не найдена" description="">
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
          {`Страница «${slug}» не найдена в базе данных.`}
        </p>
      </ArticlePage>
    );
  }

  if (page.status === "error") {
    return (
      <ArticlePage title="Ошибка" description="">
        <p style={{ color: "#ff453a", fontSize: "15px" }}>
          Не удалось загрузить страницу.
        </p>
      </ArticlePage>
    );
  }

  return (
    <ArticlePage title={page.title} description={page.description}>
      <MarkdownContent blocks={page.blocks} />
    </ArticlePage>
  );
}
