import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Первичная настройка SkyPrivate",
  },
  {
    type: "paragraph",
    text: "Настройка плагина после установки: вход в аккаунт, параметры подключения и сохранение",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "3. Первичная настройка",
  },
  {
    type: "paragraph",
    text: "Шаг 3. Настройка плагина",
  },
  {
    type: "paragraph",
    text: "После запуска необходимо:",
  },
  {
    type: "list",
    items: [
      "ввести данные своей учётной записи;",
      "настроить параметры подключения;",
      "убедиться, что система совместима с плагином;",
      "сохранить изменения.",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Первичная настройка" description="Настройка плагина SkyPrivate после установки">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}