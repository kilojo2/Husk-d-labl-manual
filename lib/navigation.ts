export interface NavItem {
  title: string;
  href: string;
  slug: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Начало работы",
    items: [
      { title: "Словарь терминов", href: "/getting-started/dictionary", slug: "dictionary" },
      { title: "Правила сайтов", href: "/getting-started/site-rules", slug: "site-rules" },
      { title: "Железные правила переговоров", href: "/getting-started/negotiation-rules", slug: "negotiation-rules" },
    ],
  },
  {
    title: "Трансляция",
    items: [
      { title: "Первые 20 секунд", href: "/broadcasting/first-20-seconds", slug: "first-20-seconds" },
      { title: "Цели (goals)", href: "/broadcasting/goals", slug: "goals" },
      { title: "Рулетки", href: "/broadcasting/roulettes", slug: "roulettes" },
      { title: "Технические фишки", href: "/broadcasting/tech-tips", slug: "tech-tips" },
      { title: "Бот на чатуре (Token Counter)", href: "/broadcasting/token-counter", slug: "token-counter" },
    ],
  },
  {
    title: "Скрипты и диалоги",
    items: [
      { title: "Общий скрипт общения", href: "/scripts-and-dialogues/general-script", slug: "general-script" },
      { title: "Лёгкий скрипт по шагам", href: "/scripts-and-dialogues/light-step-script", slug: "light-step-script" },
      { title: "Сексинг-вопросы", href: "/scripts-and-dialogues/sexting-questions", slug: "sexting-questions" },
      { title: "Заготовки фраз", href: "/scripts-and-dialogues/phrase-templates", slug: "phrase-templates" },
    ],
  },
  {
    title: "Обработка ситуаций",
    items: [
      { title: "Возражения", href: "/situation-handling/objections", slug: "objections" },
      { title: "Топ-3 обидки", href: "/situation-handling/top-3-grievances", slug: "top-3-grievances" },
      { title: "Ошибки в привате", href: "/situation-handling/private-mistakes", slug: "private-mistakes" },
    ],
  },
  {
    title: "Общие правила",
    items: [
      { title: "Правила общения", href: "/general-rules/communication-rules", slug: "communication-rules" },
      { title: "Сопровождение после шоу", href: "/general-rules/post-show-support", slug: "post-show-support" },
      { title: "Не быть ботом", href: "/general-rules/dont-be-a-bot", slug: "dont-be-a-bot" },
    ],
  },
];

export function getSectionBySlug(slug: string): NavSection | undefined {
  return navigationSections.find((section) =>
    section.items.some((item) => item.slug === slug)
  );
}

export function getArticleBySlug(slug: string): NavItem | undefined {
  for (const section of navigationSections) {
    const item = section.items.find((item) => item.slug === slug);
    if (item) return item;
  }
  return undefined;
}
