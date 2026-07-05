export interface SearchRecord {
  title: string;
  href: string;
  section: string;
  keywords: string[];
  content: string;
}

export interface SearchResult {
  title: string;
  href: string;
  section: string;
  snippet: string;
  score: number;
}

const searchIndex: SearchRecord[] = [
  // ─── Начало работы ───
  {
    title: "Гайд по настройке OBS",
    href: "/obs-guide",
    section: "Начало работы",
    keywords: [
      "obs", "open broadcaster", "стрим", "stream", "мультистрим",
      "bongacams", "chaturbate", "stripchat", "elecap", "vb cable",
      "multirtmp", "плагин", "настройка", "obs studio",
    ],
    content:
      "Полный гайд по настройке OBS для мультистриминга на BongaCams, Chaturbate и Stripchat. Установка OBS Studio, настройка Elecap и VB Cable, установка плагина MultiRTMP для одновременной трансляции на несколько площадок.",
  },
  {
    title: "Словарь терминов",
    href: "/getting-started/dictionary",
    section: "Начало работы",
    keywords: [
      "словарь", "термины", "c2c", "cam2cam", "hru", "bb", "goal",
      "tip menu", "pm", "dm", "модератор", "эксклюзивный приват",
      "тикет-шоу", "подглядки", "сленг",
    ],
    content:
      "Словарь основных терминов: C2C (Cam2Cam), HRU, BB, Goal, Tip menu, PM, DM, модератор, эксклюзивный приват, тикет-шоу, подглядки.",
  },
  {
    title: "Правила сайтов",
    href: "/getting-started/site-rules",
    section: "Начало работы",
    keywords: [
      "правила", "сайты", "bongacams", "chaturbate", "stripchat",
      "запреты", "нарушения", "бан", "модерация", "tos",
    ],
    content:
      "Правила площадок BongaCams, Chaturbate и Stripchat. Что запрещено, как избежать бана, правила модерации контента и общения с пользователями.",
  },
  {
    title: "Железные правила переговоров",
    href: "/getting-started/negotiation-rules",
    section: "Начало работы",
    keywords: [
      "переговоры", "торг", "цена", "приват", "negotiation",
      "цена", "скидка", "услуги", "торговаться",
    ],
    content:
      "Жесткие правила ведения переговоров с мемберами. Как не сбивать цену, держать позицию, не идти на уступки и правильно аргументировать стоимость услуг.",
  },

  // ─── Середина работы ───
  {
    title: "Первые 20 секунд",
    href: "/broadcasting/first-20-seconds",
    section: "Середина работы",
    keywords: [
      "первые 20 секунд", "удержание", "внимание", "зритель",
      "темп комнаты", "роль", "архетип", "контекст", "доступность",
      "крючок", "приманка", "ошибки",
    ],
    content:
      "Как удержать зрителя в первые 20 секунд. Темп комнаты, манера присутствия и роль, контекст трансляции, ощущение доступности, приманка для внимания, ошибки убивающие удержание.",
  },
  {
    title: "Цели (goals)",
    href: "/broadcasting/goals",
    section: "Середина работы",
    keywords: [
      "goal", "цели", "цель", "токены", "tips", "заработок",
      "мотивация", "донаты",
    ],
    content:
      "Как правильно ставить цели на трансляции. Какие goals работают лучше, как мотивировать зрителей, оптимальные суммы и время для разных типов целей.",
  },
  {
    title: "Рулетки",
    href: "/broadcasting/roulettes",
    section: "Середина работы",
    keywords: [
      "рулетка", "roulette", "spin", "колесо", "игра",
      "токены", "развлечение", "интерактив",
    ],
    content:
      "Как использовать рулетки на трансляции для вовлечения зрителей. Настройка, правила, примеры команд и механик для увеличения доната.",
  },
  {
    title: "Технические фишки",
    href: "/broadcasting/tech-tips",
    section: "Середина работы",
    keywords: [
      "техника", "фишки", "obs", "настройки", "качество",
      "звук", "видео", "свет", "камера", "оборудование",
    ],
    content:
      "Технические советы по улучшению качества трансляции: настройки OBS, освещение, звук, камера, оптимизация для разных площадок.",
  },
  {
    title: "Бот на чатуре (Token Counter)",
    href: "/broadcasting/token-counter",
    section: "Середина работы",
    keywords: [
      "бот", "token counter", "чат", "токены", "автоматизация",
      "nightbot", "streamlabs", "команды",
    ],
    content:
      "Настройка бота для подсчета токенов в чате. Использование Nightbot, Streamlabs и других инструментов для автоматизации чата и отслеживания донатов.",
  },
  {
    title: "Общий скрипт общения",
    href: "/scripts-and-dialogues/general-script",
    section: "Середина работы",
    keywords: [
      "скрипт", "общение", "диалог", "чат", "фразы",
      "знакомство", "приветствие", "общение с мемберами",
    ],
    content:
      "Общий скрипт общения с мемберами на трансляции. Приветствия, поддержание разговора, переход к приватному общению, завершение диалога.",
  },
  {
    title: "Лёгкий скрипт по шагам",
    href: "/scripts-and-dialogues/light-step-script",
    section: "Середина работы",
    keywords: [
      "скрипт", "пошаговый", "лёгкий", "диалог", "сценарий",
      "для новичков", "простые фразы",
    ],
    content:
      "Пошаговый скрипт общения для новичков. Простые и эффективные фразы для начала и поддержания разговора с мемберами.",
  },
  {
    title: "Сексинг-вопросы",
    href: "/scripts-and-dialogues/sexting-questions",
    section: "Середина работы",
    keywords: [
      "сексинг", "вопросы", "sexting", "интим", "общение",
      "возбуждение", "диалог", "private",
    ],
    content:
      "Вопросы и фразы для sexting-общения с мемберами. Как поддерживать интимный диалог, задавать правильные вопросы и удерживать интерес.",
  },
  {
    title: "Заготовки фраз",
    href: "/scripts-and-dialogues/phrase-templates",
    section: "Середина работы",
    keywords: [
      "фразы", "заготовки", "шаблоны", "templates", "диалог",
      "чат", "быстрые ответы",
    ],
    content:
      "Готовые шаблоны фраз для разных ситуаций на трансляции. Быстрые ответы на частые вопросы, реакции на донаты, приветствия и прощания.",
  },

  // ─── Профессиональный режим ───
  {
    title: "Возражения",
    href: "/situation-handling/objections",
    section: "Профессиональный режим",
    keywords: [
      "возражения", "objections", "отказ", "нет", "не хочу",
      "дорого", "потом", "обработка возражений",
    ],
    content:
      "Как работать с возражениями мемберов. Обработка отказов, аргументация цены, преодоление сомнений и возражений в диалоге.",
  },
  {
    title: "Топ-3 обидки",
    href: "/situation-handling/top-3-grievances",
    section: "Профессиональный режим",
    keywords: [
      "обидки", "grievances", "жалобы", "недовольство",
      "конфликт", "претензии", "обиженный мембер",
    ],
    content:
      "Три самые частые обиды мемберов и как на них реагировать. Как не потерять клиента при конфликте и сохранить доход.",
  },
  {
    title: "Ошибки в привате",
    href: "/situation-handling/private-mistakes",
    section: "Профессиональный режим",
    keywords: [
      "ошибки", "приват", "private", "mistakes", "проколы",
      "частые ошибки", "что не делать",
    ],
    content:
      "Типичные ошибки моделей в приватных трансляциях. Что не стоит делать, как избежать неловких ситуаций и повысить качество привата.",
  },
  {
    title: "Правила общения",
    href: "/general-rules/communication-rules",
    section: "Профессиональный режим",
    keywords: [
      "правила общения", "communication", "этикет", "вежливость",
      "границы", "профессиональное общение",
    ],
    content:
      "Правила профессионального общения с мемберами. Как соблюдать границы, сохранять вежливость и оставаться профессионалом в любой ситуации.",
  },
  {
    title: "Сопровождение после шоу",
    href: "/general-rules/post-show-support",
    section: "Профессиональный режим",
    keywords: [
      "сопровождение", "после шоу", "post-show", "follow-up",
      "удержание", "возврат", "постоянные",
    ],
    content:
      "Как сопровождать мемберов после завершения трансляции. Follow-up сообщения, удержание постоянных зрителей, возврат после долгого отсутствия.",
  },
  {
    title: "Не быть ботом",
    href: "/general-rules/dont-be-a-bot",
    section: "Профессиональный режим",
    keywords: [
      "бот", "не бот", "живое общение", "естественность",
      "искренность", "эмоции", "настоящая",
    ],
    content:
      "Как оставаться живой и естественной на трансляции. Избегание шаблонного поведения, проявление эмоций, создание настоящей связи со зрителями.",
  },
];

/**
 * Generate a text snippet with context around the first matched word.
 */
function generateSnippet(content: string, words: string[]): string {
  const lower = content.toLowerCase();
  let bestIndex = -1;

  for (const word of words) {
    const idx = lower.indexOf(word);
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx;
    }
  }

  if (bestIndex === -1) {
    return content.length > 120 ? content.slice(0, 117) + "..." : content;
  }

  const start = Math.max(0, bestIndex - 40);
  const end = Math.min(content.length, bestIndex + 80);
  let snippet = content.slice(start, end);

  if (start > 0) snippet = "…" + snippet;
  if (end < content.length) snippet = snippet + "…";

  return snippet;
}

/**
 * Search the index for articles matching the query.
 * Uses AND logic: all query words must match at least somewhere.
 * Ranking: title match (10pts) > keyword match (5pts) > content match (2pts).
 */
export function search(query: string): SearchResult[] {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return [];

  const results: SearchResult[] = [];

  for (const record of searchIndex) {
    let score = 0;
    const lowerTitle = record.title.toLowerCase();
    const lowerContent = record.content.toLowerCase();
    const lowerKeywords = record.keywords.map((k) => k.toLowerCase());

    let allWordsMatched = true;

    for (const word of words) {
      let wordMatched = false;

      if (lowerTitle.includes(word)) {
        score += 10;
        wordMatched = true;
      }
      if (lowerKeywords.some((k) => k.includes(word))) {
        score += 5;
        wordMatched = true;
      }
      if (lowerContent.includes(word)) {
        score += 2;
        wordMatched = true;
      }

      if (!wordMatched) {
        allWordsMatched = false;
        break;
      }
    }

    if (allWordsMatched) {
      const snippet = generateSnippet(record.content, words);
      results.push({ ...record, snippet, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
