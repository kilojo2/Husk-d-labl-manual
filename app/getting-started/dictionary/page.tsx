import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "list",
    items: [
      "**C2С (Cam2Cam)**: мембер включает камеру. Услуга платная.",
      "**HRU**: How are you?",
      "**BB**: Baby.",
      "**Goal**: цель на трансляции.",
      "**Tip menu**: меню услуг.",
      "**PM (Private Message)**: личная переписка на трансляции.",
      "**DM (Direct Message)**: личная переписка вне трансляции.",
      "**Модератор**: следит за чатом, спамит, подбадривает. Может быть оператор или адекватный мембер.",
      "**Эксклюзивный приват (Exclusive private / Full private)**: приват с возможностью C2C.",
      "**Тикет-шоу**: шоу по билетам (15-30 мин, невысокий ценник).",
      "**Подглядки**: режим, когда при приватной трансляции на другом сайте ее скрывают.",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Словарь терминов">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
