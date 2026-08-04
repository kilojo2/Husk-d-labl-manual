import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  { type: "subheading", text: "Приветствие / начало диалога" },
  { type: "paragraph", text: "Hi! How are you feeling today?" },

  { type: "subheading", text: "Вопрос про никнейм" },
  { type: "paragraph", text: "Hi! How did you come up with this nickname?" },

  { type: "subheading", text: "Уточнение настоящего имени" },
  { type: "paragraph", text: "Oh, I see. What’s the real name behind this cool nickname?" },

  { type: "subheading", text: "Комплимент / лёгкий флирт" },
  { type: "paragraph", text: "Love at second sight… because you blinded me with the first one." },

  { type: "subheading", text: "Флирт с лёгкой провокацией" },
  { type: "paragraph", text: "Once a man went to hell for keeping a cat on a chain. And you’re ignoring a lioness." },

  { type: "subheading", text: "Представление себя (имя + возраст)" },
  { type: "paragraph", text: "My name is Alice, but you can call me Ali. I’m 18, and my birthday is coming soon!" },

  { type: "subheading", text: "Игра на разнице в возрасте" },
  { type: "paragraph", text: "I really love our age gap! I think men your age know how to treat women well." },

  { type: "subheading", text: "Флирт + намёк на опыт" },
  { type: "paragraph", text: "Hehe, I’d love to try that with an experienced man like you." },

  { type: "subheading", text: "Похвала за поведение в привате" },
  { type: "paragraph", text: "I really enjoy being with you in private. You don’t rush me and feel my pace — that way I can give you a lot more." },

  { type: "subheading", text: "Описание желаемого типа мужчины" },
  { type: "paragraph", text: "I like well-mannered, sensual, unhurried men who know how to court a girl and how to give her pleasure." },

  { type: "subheading", text: "Описание желаемых отношений" },
  { type: "paragraph", text: "Attention comes first! Courtship, dates, gifts, a real connection… and sometimes punishing me if I misbehave 💋" },

  { type: "subheading", text: "Намёк на высокую ценность" },
  { type: "paragraph", text: "A girl who can give a lot also asks for a lot…" },

  { type: "subheading", text: "Напоминание о прошлом обещании" },
  { type: "paragraph", text: "Do you remember what you promised me last time? :)" },

  { type: "subheading", text: "Игривое напоминание / возврат в игру" },
  { type: "paragraph", text: "We met in your dreams and you wanted to play with me… have you forgotten? 😄" },

  { type: "subheading", text: "Успокоение по поводу возраста" },
  { type: "paragraph", text: "Aww, you’re not old at all. I love men your age… they really know how to treat women." },

  { type: "subheading", text: "Рассказ о себе / хобби" },
  { type: "paragraph", text: "I love reading books, meeting new people, horseback riding, and cooking for people I care about." },

  { type: "subheading", text: "Прямой вопрос + комплимент" },
  { type: "paragraph", text: "What brought you here? Do you find me beautiful? 😜" },

  { type: "subheading", text: "Глубокий / «умный» ответ" },
  { type: "paragraph", text: "I think a person’s character is shaped by life experience, how they were raised, their environment, the books they read, and physical activity." },

  { type: "subheading", text: "Предложение секретного знака" },
  { type: "paragraph", text: "Let’s come up with a special sign I’ll make, so you’ll know it’s me saying hello when you come in." },

  { type: "subheading", text: "Игривый вопрос про обращение" },
  { type: "paragraph", text: "How should I call you? Or maybe… should I just call you mine?" },
];

export default function Page() {
  return (
    <ArticlePage title="Заготовки фраз">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}