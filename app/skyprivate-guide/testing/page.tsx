import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Тестирование и проверка работы",
  },
  {
    type: "paragraph",
    text: "Как убедиться, что плагин SkyPrivate настроен правильно и готов к работе",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "1. Тестовое подключение",
  },
  {
    type: "ordered-list",
    items: [
      "Выполните тестовое подключение к сервису.",
      "Убедитесь, что соединение устанавливается без задержек и системных ошибок.",
      "Проверьте корректность работы основных функций.",
    ],
  },
  {
    type: "note",
    text: "Если ошибок нет — установка завершена успешно, плагин готов к работе.",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "2. Чек-лист проверки",
  },
  {
    type: "list",
    items: [
      "☐ Плагин установлен и запущен",
      "☐ Учётные данные введены и сохранены",
      "☐ Подключение к сервису установлено",
      "☐ Основные функции работают корректно",
      "☐ Система совместима, ошибок нет",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Тестирование и проверка" description="Проверка работы плагина SkyPrivate">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}