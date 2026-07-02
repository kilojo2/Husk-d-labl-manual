import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Вам самим было бы приятно получать ответ «норм» на вопрос «как ты?»? В диалогах важна ЖИЗНЬ, ФЛИРТ, ЗАИНТЕРЕСОВАННОСТЬ.",
  },
  {
    type: "subheading",
    text: "Как не быть ботом",
  },
  {
    type: "list",
    items: [
      "Отвечать развёрнуто, а не односложно",
      "Проявлять искренний интерес к собеседнику",
      "Использовать смайлики — они повышают эмпатию к диалогу у собеседника на ~60%",
      "Задавать встречные вопросы",
      "Флиртовать и шутить",
      "Адаптировать стиль общения под конкретного мембера",
    ],
  },
  {
    type: "note",
    text: "Скрипт — это шаблон. Использовать по обстоятельствам, а не как робот.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Не быть ботом">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
