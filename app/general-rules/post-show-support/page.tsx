import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Правильное сопровождение мембера после шоу — ключ к получению чаевых и возвращению постоянников.",
  },
  {
    type: "list",
    items: [
      "Не прощаться сразу после окончания шоу",
      "Спросить, как ему понравилось (после шоу часто оставляют чаевые)",
      "Это помогает не выглядеть «просто кошельком» и повышает шанс на постоянника",
    ],
  },
  {
    type: "note",
    text: "Мемберы ценят внимание и заботу после шоу не меньше, чем само шоу. Нескольких минут тёплого общения достаточно, чтобы выделиться среди других моделей.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Сопровождение после шоу">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
