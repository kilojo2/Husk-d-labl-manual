import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Проверка работы SkyPrivate",
  },
  {
    type: "paragraph",
    text: "Тестирование корректной работы плагина после настройки",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "5. Проверка работы",
  },
  {
    type: "paragraph",
    text: "Шаг 4. Тестирование",
  },
  {
    type: "paragraph",
    text: "Для проверки корректной работы:",
  },
  {
    type: "list",
    items: [
      "выполните тестовое подключение;",
      "убедитесь, что соединение устанавливается без ошибок;",
      "проверьте, что все функции работают корректно.",
    ],
  },
  {
    type: "note",
    text: "Если ошибок нет, установка завершена успешно.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Тестирование и проверка" description="Проверка работы плагина SkyPrivate">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}