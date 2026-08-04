import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Скрипт общения с мембером",
  },
  {
    type: "paragraph",
    text: "(идеальный стиль работы)",
  },

  // ═══ 1. Почему мемберы быстро уходят ═══
  { type: "subheading", text: "1. Почему мемберы быстро уходят и как это исправить" },

  { type: "subheading", text: "Модель в телефоне" },
  { type: "paragraph", text: "**Проблема:** он зашёл — она даже не посмотрела в камеру. Сидит в телефоне или отвернулась." },
  { type: "paragraph", text: "**Решение:** глаза в камеру, реакция на мембера. Иногда 5 секунд внимания дают 50 минут привата." },

  { type: "subheading", text: "Только текст или только голос" },
  { type: "paragraph", text: "**Проблема:** модель пишет, но не говорит (или наоборот). Мембер не может читать или включить звук — ему неудобно, и он уходит." },
  { type: "paragraph", text: "**Решение:** пишите и одновременно проговаривайте сообщение вслух + давайте визуал. Мембер должен понимать, что происходит. Исключение — постоянная лояльная аудитория, которая знает ваш формат." },

  { type: "subheading", text: "Громкая / странная музыка" },
  { type: "paragraph", text: "**Проблема:** слишком громко или не в вайб — уже причина выйти." },
  { type: "paragraph", text: "**Решение:** слушайте свой стрим со стороны. Любимая музыка может быть какофонией для других." },

  { type: "subheading", text: "«Токены-токены-токены»" },
  { type: "paragraph", text: "**Проблема:** с порога «tip first», «no tip = no show», «no money no honey»." },
  { type: "paragraph", text: "**Решение:** сначала флирт и искренний интерес, потом монетизация. Не ставьте кассу перед сердцем." },

  { type: "subheading", text: "Нет реакции на тип" },
  { type: "paragraph", text: "**Проблема:** отправил токены — модель ноль внимания." },
  { type: "paragraph", text: "**Решение:** реагируйте всегда. Хотя бы взглядом или «Thank you, baby»." },

  { type: "subheading", text: "Несоответствие тегам" },
  { type: "paragraph", text: "**Проблема:** пришёл по тегу feet — модель курит. Хотел bratty — сидит милашка." },
  { type: "paragraph", text: "**Решение:** следите, чтобы сегодняшний вайб соответствовал тегам. Все теги должны отрабатываться в течение стрима." },

  { type: "subheading", text: "Шоу «для себя»" },
  { type: "paragraph", text: "**Проблема:** танцует, готовит, принимает душ — но без вовлечения." },
  { type: "paragraph", text: "**Решение:** любое действие сопровождайте взглядом в камеру, фразами, вопросами и комментариями." },

  { type: "subheading", text: "Плохое качество картинки" },
  { type: "paragraph", text: "**Проблема:** пиксели, зависания — мембер просто уходит." },
  { type: "paragraph", text: "**Решение:** если видите массовые выходы — зайдите на свой стрим как зритель и проверьте качество." },

  // ═══ 2. Как начинать диалог ═══
  { type: "divider" },
  { type: "subheading", text: "2. Как начинать диалог (вместо «Hi, hru?»)" },
  { type: "paragraph", text: "Скучные «hi / hello / how was your day?» дают автоматический ответ «fine, u?». Нет зацепки, нет коннекта." },

  { type: "subheading", text: "Цепляющие варианты:" },
  { type: "list", items: [
    "Are you new here or just secretly in love with me for a while now?",
    "Where have you been? I’ve been waiting for you.",
    "You look like someone who knows the answer: what does male cum smell like?",
    "Emergency help needed. Should I be a teasing princess or a strict lady today?",
    "Let’s make a deal: you compliment me, and I’ll tell you a secret.",
    "I wonder… are you polite or do you go straight to the point?",
    "You know, the most attractive men are the ones who say “hi” first… and not just that.",
  ]},

  { type: "subheading", text: "Мягкие и простые:" },
  { type: "list", items: [
    "What brought you to this site today?",
    "Are you just wandering around or looking for someone special?",
    "It’s cozy in here. I hope you stay a while.",
  ]},

  { type: "subheading", text: "С перчинкой:" },
  { type: "list", items: [
    "Guess what I’m wearing under this dress. If you’re wrong, you’ll be punished.",
    "I know what you’re staring at. And I like it.",
    "I like when you watch. But you want more, don’t you?",
    "Are you here to jerk off… or to get impressed? I can do both.",
  ]},
  { type: "paragraph", text: "Цель — открыть мембера с первых секунд и показать, что здесь можно не только «покажи сиськи», но и поговорить, поиграть, включиться." },

  // ═══ 3. Ответ на «Слишком дорого» ═══
  { type: "divider" },
  { type: "subheading", text: "3. Ответ на «Слишком дорого. Давай приват по 6 токенов»" },
  { type: "subheading", text: "Почему пишут так:" },
  { type: "list", items: [
    "Халявщики по натуре",
    "Тестеры (проверяют, поведётесь ли вы)",
    "Те, кто делает вид, что не понимает: вы работаете, а не просто «хотите показать»",
  ]},
  { type: "paragraph", text: "Их поведение — не показатель вашей ценности. Это показатель их мышления." },
  { type: "subheading", text: "Ответы с характером (без злости):" },
  { type: "list", items: [
    "I believe I’m worth more than 6 tokens.",
    "Good things don’t come at discount prices, baby.",
    "Private shows are like good wine — you don’t rush and you don’t go cheap.",
    "If you can’t afford it now, come back when you’re ready. I’m not going anywhere.",
  ]},
  { type: "note", text: "Ваш приват и ваша комната — ваша территория. Пускать только за достойный вход — это самоуважение, а не наглость." },

  // ═══ 4. Ответ на «Stand up, bb!» ═══
  { type: "divider" },
  { type: "subheading", text: "4. Ответ на «Stand up, bb!»" },
  { type: "subheading", text: "Почему пишут:" },
  { type: "list", items: [
    "Привыкли к формату «модель по умолчанию ready to serve»",
    "Думают, что это «просто посмотреть аутфит»",
    "Видели у других и считают нормой",
    "Не умеют/не хотят строить диалог, хотят быстрый визуал",
    "Пустой аккаунт — хотят понять, что там на самом деле",
    "Проверка: подчиняетесь ли вы",
  ]},

  { type: "subheading", text: "С юмором:" },
  { type: "list", items: [
    "Oh, I thought we were getting to know each other, not doing military drills.",
    "Stand up? What’s next — jump, roll over?",
    "That’s a lot of confidence for someone who didn’t even say hello.",
  ]},

  { type: "subheading", text: "С перчинкой:" },
  { type: "list", items: [
    "I stand up when I’m impressed. For now… I’m sitting.",
    "Mmm… that’s in the tip menu, love. Or you can try asking nicer.",
    "You want legs? Earn your view, baby.",
  ]},

  { type: "subheading", text: "С уверенностью:" },
  { type: "list", items: [
    "Orders are for soldiers. I prefer requests… with a gift.",
    "I don’t respond to orders. Especially free ones.",
    "This isn’t Simon Says, dear.",
  ]},

  { type: "subheading", text: "Спокойно:" },
  { type: "list", items: [
    "I don’t do that for free. Take a look at the tip menu.",
    "If you’re looking for dancers — wrong room. I talk first.",
    "I’m not getting up right now. But you can still enjoy the view.",
  ]},

  // ═══ 5. Железные правила ═══
  { type: "divider" },
  { type: "subheading", text: "5. Железные правила переговоров" },
  { type: "paragraph", text: "**Главное правило:** мы продаём не сиськи и жопы, а эмоции. Для голого тела есть порносайты. Наша задача — влюбить мембера. Влюблённый пользователь платит просто за общение и внимание." },
  { type: "paragraph", text: "**Примеры:** мембер взял дорогой приват, чтобы сыграть модели на барабанах. Другой сидел 3 часа, пока модель устраивала фэшн-шоу. Кто-то играл в шахматы." },

  { type: "list", items: [
    "Не делайте из модели шлюху (исключение — если мембер готов платить огромные деньги за этот образ).",
    "Не пишите со старта «wanna fun with me?». Особенно если у человека много денег и он не в состоянии horniness. С таких можно зарабатывать максимум, вообще не раздевая модель. Поймите его проблему, надавите на одиночество, разделите его чувства.",
    "Вебка — не про секс. Посмотрите на топ-моделей с онлайном 10–16k. Они работают на паблик и зарабатывают огромные деньги. Чем быстрее мембер увидит тело, тем быстрее уйдёт. Держите интригу.",
    "Не будьте ботом. На «как ты?» отвечать «норм» — табу. Мембер не будет вытягивать из вас слова. В диалоге нужна жизнь, лёгкий флирт и искренняя заинтересованность.",
    "Используйте смайлики. Эмодзи повышают эмпатию примерно на 60%. Собеседник сразу считывает эмоцию. Общение становится живее.",
  ]},

  { type: "note", text: "Итог: решайте проблемы мембера, дарите эмоции, держите интригу и общайтесь как живой человек. Это приносит в разы больше денег, чем просто контент 18+." },
];

export default function Page() {
  return (
    <ArticlePage title="Скрипт общения с мембером" description="Идеальный стиль работы: как начинать диалог, отвечать на возражения и выстраивать общение">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}