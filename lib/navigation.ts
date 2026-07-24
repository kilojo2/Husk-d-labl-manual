export interface NavItem {
  title: string;
  href: string;
  slug: string;
  icon: string;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  icon: string;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Начало работы",
    icon: "house",
    items: [
      { title: "Вход в аккаунты", href: "/account-login", slug: "account-login", icon: "key.fill" },
      {
        title: "Гайд по Chaturbate",
        href: "/chaturbate-guide",
        slug: "chaturbate-guide",
        icon: "sparkles",
        children: [
          { title: "Запуск и подготовка", href: "/chaturbate-guide/broadcast", slug: "chaturbate-broadcast", icon: "play.circle" },
          { title: "Панель управления", href: "/chaturbate-guide/panel", slug: "chaturbate-panel", icon: "square.grid.2x2" },
          { title: "Рассылка", href: "/chaturbate-guide/announcements", slug: "chaturbate-announcements", icon: "envelope.fill" },
          { title: "Статистика токенов", href: "/chaturbate-guide/token-stats", slug: "chaturbate-token-stats", icon: "chart.bar" },
          { title: "Приложения (APPS)", href: "/chaturbate-guide/apps", slug: "chaturbate-apps", icon: "puzzlepiece.extension" },
          { title: "Settings & Privacy", href: "/chaturbate-guide/settings-privacy", slug: "chaturbate-settings-privacy", icon: "gearshape.fill" },
        ],
      },
      {
        title: "Гайд по Stripchat",
        href: "/stripchat-guide",
        slug: "stripchat-guide",
        icon: "building.2",
        children: [
          { title: "Основы", href: "/stripchat-guide/basics", slug: "stripchat-basics", icon: "book.closed" },
          { title: "Рассылка", href: "/stripchat-guide/newsletter", slug: "stripchat-newsletter", icon: "envelope.fill" },
          { title: "Мои данные", href: "/stripchat-guide/my-data", slug: "stripchat-my-data", icon: "person.crop.circle" },
          { title: "Настройки шоу", href: "/stripchat-guide/show-settings", slug: "stripchat-show-settings", icon: "gearshape.fill" },
          { title: "Лента", href: "/stripchat-guide/feed", slug: "stripchat-feed", icon: "square.stack.3d.up" },
          { title: "Расширения", href: "/stripchat-guide/extensions", slug: "stripchat-extensions", icon: "puzzlepiece.extension" },
        ],
      },
      {
        title: "Гайд по BongaCams",
        href: "/bongacams-guide",
        slug: "bongacams-guide",
        icon: "desktopcomputer",
        children: [
          { title: "Запуск трансляции", href: "/bongacams-guide/broadcast", slug: "bonga-broadcast", icon: "play.circle" },
          { title: "Приложения и чат-боты", href: "/bongacams-guide/apps-chatbots", slug: "bonga-apps-chatbots", icon: "puzzlepiece.extension" },
          { title: "Платные действия (Tip Menu)", href: "/bongacams-guide/tip-menu", slug: "bonga-tip-menu", icon: "list.bullet" },
          { title: "Работа с целями (Countdown)", href: "/bongacams-guide/countdown", slug: "bonga-countdown", icon: "timer" },
          { title: "Настройки безопасности", href: "/bongacams-guide/settings-security", slug: "bonga-settings-security", icon: "shield" },
        ],
      },
      { title: "Мануал по LiveJasmin", href: "/livejasmin-guide", slug: "livejasmin-guide", icon: "play.circle" },
      {
        title: "Гайд по Flirt4Free",
        href: "/flirt4free-guide",
        slug: "flirt4free-guide",
        icon: "star",
        children: [
          { title: "Интерфейс Performer App", href: "/flirt4free-guide/interface", slug: "f4f-interface", icon: "square.grid.2x2" },
          { title: "Подключение OBS", href: "/flirt4free-guide/obs-setup", slug: "f4f-obs-setup", icon: "wrench" },
          { title: "Кнопки управления", href: "/flirt4free-guide/control-buttons", slug: "f4f-control-buttons", icon: "play.circle" },
          { title: "Типы шоу", href: "/flirt4free-guide/show-types", slug: "f4f-show-types", icon: "sparkles" },
          { title: "Типы юзеров", href: "/flirt4free-guide/user-types", slug: "f4f-user-types", icon: "person.crop.circle" },
        ],
      },
      { title: "Мануал по Lovense / Lush", href: "/lovense-guide", slug: "lovense-guide", icon: "link" },
      { title: "Гайд по настройке OBS", href: "/obs-guide", slug: "obs-guide", icon: "wrench" },
      { title: "Словарь терминов", href: "/getting-started/dictionary", slug: "dictionary", icon: "book.closed" },
      { title: "Правила сайтов", href: "/getting-started/site-rules", slug: "site-rules", icon: "doc.text" },
      { title: "Железные правила переговоров", href: "/getting-started/negotiation-rules", slug: "negotiation-rules", icon: "hand.raised" },
    ],
  },
  {
    title: "Середина работы",
    icon: "antenna.radiowaves.left.and.right",
    items: [
      { title: "Первые 20 секунд", href: "/broadcasting/first-20-seconds", slug: "first-20-seconds", icon: "timer" },
      { title: "Цели (goals)", href: "/broadcasting/goals", slug: "goals", icon: "target" },
      { title: "Рулетки", href: "/broadcasting/roulettes", slug: "roulettes", icon: "dice" },
      { title: "Технические фишки", href: "/broadcasting/tech-tips", slug: "tech-tips", icon: "wrench" },
      { title: "Бот на чатуре (Token Counter)", href: "/broadcasting/token-counter", slug: "token-counter", icon: "chart.bar" },
      { title: "Общий скрипт общения", href: "/scripts-and-dialogues/general-script", slug: "general-script", icon: "doc.plaintext" },
      { title: "Лёгкий скрипт по шагам", href: "/scripts-and-dialogues/light-step-script", slug: "light-step-script", icon: "list.bullet" },
      { title: "Сексинг-вопросы", href: "/scripts-and-dialogues/sexting-questions", slug: "sexting-questions", icon: "heart.text" },
      { title: "Заготовки фраз", href: "/scripts-and-dialogues/phrase-templates", slug: "phrase-templates", icon: "quote.bubble" },
    ],
  },
  {
    title: "Профессиональный режим",
    icon: "shield",
    items: [
      { title: "Возражения", href: "/situation-handling/objections", slug: "objections", icon: "hand.thumbsdown" },
      { title: "Топ-3 обидки", href: "/situation-handling/top-3-grievances", slug: "top-3-grievances", icon: "exclamationmark.circle" },
      { title: "Ошибки в привате", href: "/situation-handling/private-mistakes", slug: "private-mistakes", icon: "eye.slash" },
      { title: "Правила общения", href: "/general-rules/communication-rules", slug: "communication-rules", icon: "message" },
      { title: "Сопровождение после шоу", href: "/general-rules/post-show-support", slug: "post-show-support", icon: "figure.wave" },
      { title: "Не быть ботом", href: "/general-rules/dont-be-a-bot", slug: "dont-be-a-bot", icon: "robot" },
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
