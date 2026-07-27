import { getDb } from "@/lib/db";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const db = await getDb();

    // Get page
    const pageResult = db.exec(
      `SELECT slug, title, description FROM cms_pages WHERE slug = '${slug.replace(/'/g, "''")}' AND is_published = 1`
    );

    if (pageResult.length === 0 || pageResult[0].values.length === 0) {
      return (
        <ArticlePage title="Страница не найдена" description="">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            Страница "{slug}" не найдена в базе данных.
          </p>
        </ArticlePage>
      );
    }

    const row = pageResult[0].values[0] as any;

    // Get blocks
    const blocksResult = db.exec(
      `SELECT id, sort_order, block_type, content_json FROM cms_blocks WHERE page_slug = '${slug.replace(/'/g, "''")}' ORDER BY sort_order`
    );

    const blocks: ContentBlock[] = blocksResult.length > 0
      ? blocksResult[0].values.map((b: any) => {
          let content: any = {};
          try {
            content = JSON.parse(b[3]);
          } catch { /* keep default */ }
          return {
            type: b[2] as any,
            text: content.text,
            items: content.items,
            emoji: content.emoji,
            headers: content.headers,
            rows: content.rows,
          } as ContentBlock;
        })
      : [];

    return (
      <ArticlePage title={row[1]} description={row[2]}>
        <MarkdownContent blocks={blocks} />
      </ArticlePage>
    );
  } catch (error) {
    console.error("[DynamicPage] Error:", error);
    return (
      <ArticlePage title="Ошибка" description="">
        <p style={{ color: "#ff453a", fontSize: "15px" }}>
          Не удалось загрузить страницу.
        </p>
      </ArticlePage>
    );
  }
}