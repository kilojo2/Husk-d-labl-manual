import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Расширения",
  },
  {
    type: "paragraph",
    text: "Дополнительные функции и инструменты Stripchat",
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
    text: "Контент для этого раздела будет добавлен позже. Здесь будет информация о браузерных расширениях, ботах и других инструментах для Stripchat.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Расширения" description="Дополнительные функции и инструменты Stripchat">
      <MarkdownContent blocks={section1} />
    </ArticlePage>
  );
}
