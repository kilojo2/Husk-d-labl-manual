import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Лента",
  },
  {
    type: "paragraph",
    text: "Работа с лентой постов и контентом",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "Раздел в разработке",
  },
  {
    type: "paragraph",
    text: "Контент для этого раздела будет добавлен позже. Здесь будет информация о публикации постов, фото и видео в ленте, взаимодействии с подписчиками.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Лента" description="Работа с лентой постов и контентом">
      <MarkdownContent blocks={section1} />
    </ArticlePage>
  );
}
