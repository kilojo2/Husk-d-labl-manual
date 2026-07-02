import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Бот на Chaturbate, который считает и отображает токены, потраченные за всё время перед сообщением мембера. Бот настраиваемый, полезен для тех, кто хочет работать на фришку.",
  },
  {
    type: "link-block",
    text: "Ссылка на бота Token Counter:",
    items: [
      "https://ru.chaturbate.com/v2apps/apps/cc5b4606-Token-Counter-and-Icons---Just-a-model-",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Бот на чатуре (Token Counter)">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
