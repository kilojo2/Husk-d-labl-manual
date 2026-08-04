import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Hi! How are you feeling today?",
      "Hi! How did you come up with this nickname?",
      "Oh, I see. What's the real name behind this cool nickname?",
      "Love at second sight… because you blinded me with the first one.",
      "Once a man went to hell for keeping a cat on a chain. And you're ignoring a lioness.",
      "My name is Alice, but you can call me Ali. I'm 18, and my birthday is coming soon!",
      "I really love our age gap! I think men your age know how to treat women well.",
      "Hehe, I'd love to try that with an experienced man like you.",
      "I really enjoy being with you in private. You don't rush me and feel my pace — that way I can give you a lot more.",
      "I like well-mannered, sensual, unhurried men who know how to court a girl and how to give her pleasure.",
      "Attention comes first! Courtship, dates, gifts, a real connection… and sometimes punishing me if I misbehave 💋",
      "A girl who can give a lot also asks for a lot…",
      "Do you remember what you promised me last time? :)",
      "We met in your dreams and you wanted to play with me… have you forgotten? 😄",
      "Aww, you're not old at all. I love men your age… they really know how to treat women.",
      "I love reading books, meeting new people, horseback riding, and cooking for people I care about.",
      "What brought you here? Do you find me beautiful? 😜",
      "I think a person's character is shaped by life experience, how they were raised, their environment, the books they read, and physical activity.",
      "Let's come up with a special sign I'll make, so you'll know it's me saying hello when you come in.",
      "How should I call you? Or maybe… should I just call you mine?",
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