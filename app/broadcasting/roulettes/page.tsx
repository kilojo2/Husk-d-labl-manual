import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "subheading",
    emoji: "🎲",
    text: "Рулетка недорогая – 25-33 токена",
  },
  {
    type: "list",
    items: [
      "Air kiss",
      "Spank my ass x10",
      "Lick finger",
      "Squeeze my boobs",
      "Air kiss for you",
      "Show my bra",
      "Suck my fingers",
      "Show my feet",
      "Massage my ass close up",
      "Show my tummy",
      "Hard spank x5",
      "Bite my lips",
    ],
  },
  {
    type: "subheading",
    emoji: "🎲",
    text: "Рулетка средняя – 50-100 токена",
  },
  {
    type: "list",
    items: [
      "Show ass",
      "Spank my ass hard х15",
      "Show my bra",
      "Oil on my ass",
      "Squeeze my tits",
      "Show panties",
      "Doggy position",
      "Ahegao",
      "Slap pussy",
      "Sexy belly dance",
      "Suck fingers with saliva",
      "Squeeze nipples",
      "Lovense 3m",
    ],
  },
  {
    type: "subheading",
    emoji: "🎲",
    text: "Рулетка дорогая – 100-200 токена",
  },
  {
    type: "list",
    items: [
      "Oil on tits",
      "Spank my ass hard х15",
      "Ice on nipples",
      "Oil on my ass",
      "Squeeze my tits",
      "Flash tits",
      "Doggy position",
      "Ahegao",
      "Slap pussy",
      "Striptease",
      "Suck fingers with saliva",
      "Squeeze nipples",
      "Lovense 4m",
    ],
  },
  {
    type: "note",
    text: "Если не берут – добавляем вместо ахегао топлес.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Рулетки">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
