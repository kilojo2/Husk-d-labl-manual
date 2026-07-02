import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "subheading",
    text: "Приветствие",
  },
  {
    type: "paragraph",
    text: "«Привет, как проходит твой день? / У тебя интересный ник, что он значит?»",
  },
  {
    type: "paragraph",
    text: "(Англ: Hello, how is your day going? / You have an interesting nickname, what does it mean?)",
  },
  {
    type: "subheading",
    text: "Знакомство",
  },
  {
    type: "paragraph",
    text: "«Привет, [Имя], очень приятно. Спасибо за комплимент. Можно узнать, откуда ты?»",
  },
  {
    type: "list",
    items: [
      "Общаться, добавляя его имя",
      "Узнать интересы / хобби",
    ],
  },
  {
    type: "subheading",
    text: "Инвайт (начало диалога)",
  },
  {
    type: "paragraph",
    text: "Начать с НЕсексуальной темы, от которой можно свернуть в 2 пути:",
  },
  {
    type: "paragraph",
    text: "Пример: «[Имя], что ты предпочитаешь есть на завтрак?»",
  },
  {
    type: "list",
    items: [
      "Путь 1 (сексинг): «Тебя».",
      "Путь 2 (общение): «Омлет/кашу».",
    ],
  },
  {
    type: "paragraph",
    text: "Другой пример: «Какая твоя главная слабость/страсть?»",
  },
  {
    type: "paragraph",
    text: "Спорный, но эффективный: «Держу пари, [Имя], ты бы не справился с такой красоткой, как я».",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Лёгкий скрипт общения (по шагам)">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
