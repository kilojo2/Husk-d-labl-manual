import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Вопросы для сбора информации и флирта с мембером:",
  },
  {
    type: "list",
    items: [
      "Самое странное место для секса?",
      "Любишь игрушки в спальне?",
      "Любимая порнозвезда?",
      "Что девушка должна делать во время секса?",
      "Любишь грязные разговоры?",
      "Самая сексуальная одежда на девушке?",
      "Идеальная прелюдия?",
      "Самая секретная фантазия?",
      "Как и где любишь, чтобы тебя трогали?",
      "Был ли секс втроем?",
      "Что предпочитаешь: получать или делать оральную ласку?",
      "Любишь быть сверху или снизу?",
      "Какая часть моего тела самая сексуальная?",
      "Что бы ты сделал со мной, если бы я была рядом?",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Сексинг-вопросы для мембера">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
