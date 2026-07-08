import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Настройки шоу",
  },
  {
    type: "paragraph",
    text: "Настройка параметров трансляции и приватов",
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
    text: "Контент для этого раздела будет добавлен позже. Здесь будет информация о настройке приватных шоу, цен, тип-меню и других параметров трансляции.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Настройки шоу" description="Настройка параметров трансляции и приватов">
      <MarkdownContent blocks={section1} />
    </ArticlePage>
  );
}
