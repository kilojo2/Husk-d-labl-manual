import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Пример возражения: «сними трусы».",
  },
  {
    type: "list",
    items: [
      "«У меня сейчас месячные, надеюсь, это не проблема».",
      "«Я не делаю этого при первой встрече, я должна доверять человеку».",
      "(Для постоянника) «Это запрещено в моей стране».",
    ],
  },
  {
    type: "paragraph",
    text: "Дать альтернативу: смена белья, спустить лямки трусиков.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Обработка возражений">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
