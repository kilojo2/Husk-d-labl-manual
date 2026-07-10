import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Лента",
  },
  {
    type: "paragraph",
    text: "Работа с лентой постов и контентом",
  },
  {
    type: "divider",
  },
];

const section2: ContentBlock[] = [
  {
    type: "subheading",
    text: "Лента Stripchat: как делать крутые посты перед стримом",
  },
  {
    type: "paragraph",
    text: "Лента — это 'лицо' аккаунта модели на Stripchat. Именно по ней пользователи понимают, жива ли модель, насколько она активна и хочет ли она общаться. Регулярные посты перед стримом сильно повышают посещаемость, помогают прогревать аудиторию и создавать эмоциональную связь с фанатами.",
  },
  {
    type: "divider",
  },
];

const section3: ContentBlock[] = [
  {
    type: "subheading",
    text: "Зачем публиковать посты в ленту?",
  },
  {
    type: "list",
    items: [
      "Показываете, что аккаунт активный и 'живой'.",
      "Создаёте интригу перед стримом.",
      "Продаёте контент (особенно нюд-снимки).",
      "Развлекаете подписчиков смешными, милыми или провокационными фото.",
      "Повышаете доверие и лояльность аудитории.",
    ],
  },
  {
    type: "divider",
  },
];

const section4: ContentBlock[] = [
  {
    type: "subheading",
    text: "Как правильно создать пост",
  },
  {
    type: "subheading",
    text: "1. Нажмите кнопку 'Загрузить'",
  },
  {
    type: "paragraph",
    text: "Она обычно находится на главной странице вашего профиля или в разделе ленты.",
  },
];

const section5: ContentBlock[] = [
  {
    type: "subheading",
    text: "2. Загрузите качественное фото",
  },
  {
    type: "paragraph",
    text: "Лучше всего использовать:",
  },
  {
    type: "list",
    items: [
      "Селфи с лицом (пользователи хотят видеть эмоции и глаза).",
      "Красивые кадры в белье или ню (для платных постов).",
      "Юмористические, дерзкие или милые фотографии.",
      "Снимки, которые передают настроение: игривое, соблазнительное, озорное, загадочное.",
    ],
  },
  {
    type: "note",
    text: "Совет: Фото должно быть ярким, хорошо освещённым и в высоком качестве. Избегайте размытых или слишком тёмных кадров.",
  },
];

const section6: ContentBlock[] = [
  {
    type: "subheading",
    text: "3. Напишите цепляющий текст от лица модели",
  },
  {
    type: "paragraph",
    text: "Текст — это ключевой элемент. Он должен звучать живо, эмоционально и естественно, как будто пишет сама модель.",
  },
  {
    type: "subheading",
    text: "Что писать:",
  },
  {
    type: "list",
    items: [
      "Настроение ('Я сегодня такая игривая…', 'Не могу дождаться, когда покажу тебе это вживую').",
      "Лёгкий флирт и интригу.",
      "Призыв к действию ('Присоединяйся ко мне на стриме через 30 минут!', 'Кто хочет увидеть продолжение в привате?').",
      "Эмодзи для живости и выразительности.",
    ],
  },
  {
    type: "divider",
  },
];

const section7: ContentBlock[] = [
  {
    type: "subheading",
    text: "Пример готового поста",
  },
  {
    type: "paragraph",
    text: "Фото: Селфи модели в сексуальном белье с лёгкой улыбкой и взглядом в камеру.",
  },
  {
    type: "subheading",
    text: "Текст:",
  },
  {
    type: "paragraph",
    text: "'Оххх, ребята… 🔥 Сегодня я в таком игривом настроении, что даже сама себе не могу отказать 😈 Сделала пару очень горячих кадров специально для вас… Хотите увидеть полную версию на стриме? Я уже мокрая от предвкушения 😉 Жду тебя ровно через 20 минут в моей комнате! Не опаздывай…'",
  },
];

const section8: ContentBlock[] = [
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "Дополнительные рекомендации для максимальной эффективности",
  },
  {
    type: "list",
    items: [
      "Публикуйте за 15–40 минут до начала стрима — это лучшее время.",
      "Чередуйте типы контента: сегодня милое селфи, завтра — дерзкий ню, послезавтра — юмор.",
      "Используйте сторис-подобный стиль — люди любят чувствовать, что общаются с живым человеком.",
      "Добавляйте хэштеги, если нужно (#Stripchat #Live #HotGirl и т.д.).",
      "Следите за реакциями — какие посты собирают больше всего просмотров и чаевых, делайте в похожем стиле.",
    ],
  },
  {
    type: "note",
    text: "Регулярные и качественные посты в ленту — это один из самых простых и эффективных способов расти на платформе. Делайте их с душой, и ваша аудитория будет возвращаться снова и снова! ❤️",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Лента" description="Работа с лентой постов и контентом">
      <MarkdownContent blocks={section1} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Model's Profile.png"
          alt="Профиль модели на Stripchat"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section2} />
      <MarkdownContent blocks={section3} />
      <MarkdownContent blocks={section4} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/New post.png"
          alt="Кнопка загрузки нового поста"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section5} />
      <MarkdownContent blocks={section6} />
      <MarkdownContent blocks={section7} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/A post that's half done.png"
          alt="Пост в процессе создания"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Ready-to-post.png"
          alt="Готовый пост перед публикацией"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section8} />
    </ArticlePage>
  );
}
