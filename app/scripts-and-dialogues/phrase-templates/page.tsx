import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Hiii, how are you feeling today?",
      "Hii, how did you come up with such name?",
      "Oh i see, and what's the real name behind this original nickname?",
      "love from the second sight… cuz u blinded me with the first one",
      "Once a man went to hell because he kept a cat on a chain. And you ignore the lioness",
      "My name is Alice, but you can call me Ali. im 18 but it's my birthday soon!",
      "I really love our age gap! i think men ur age know how to treat women well haha",
      "hehe, i would love to try that with an experienced man u are",
      "I really enjoy being with you in an exclusive private, and you don't rush me and instead feel my pace, I'll be capable of a lot.",
      "I like well-mannered, sensual, unhurried men who know how to court a girl and know how to give her pleasure.",
      "Attention comes first! Courtship, dates, gifts, a good relationship and sometimes punishing me if I misbehave...💋",
      "A girl who can give a lot asks for a lot...",
      "Do you remember what you promised me last time? :)",
      "We met in your dreams and you wanted to play with me, have you forgotten? 😄",
      "aww u are not old at all. i love men ur age... i think they really know how to treat women",
      "I love reading books, meeting new people... I love horseback riding and cooking for loved ones",
      "What are u here for? do u find me beautifull?😜",
      "I think a person's character is shaped by their life experience, upbringing by their parents, environment, literature, and physical activity.",
      "Let's come up with a sign that I'll make so you'll know it's me saying hello to you when you come in",
      "How can i call you? should i call you mine?",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Заготовки фраз">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
