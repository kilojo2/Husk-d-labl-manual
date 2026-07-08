import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Мои данные",
  },
  {
    type: "paragraph",
    text: "Управление личной информацией и настройками профиля",
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
    text: "Контент для этого раздела будет добавлен позже. Здесь будет информация о настройке профиля, верификации, выплатах и других личных данных.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Мои данные" description="Управление личной информацией и настройками профиля">
      <MarkdownContent blocks={section1} />
    </ArticlePage>
  );
}
