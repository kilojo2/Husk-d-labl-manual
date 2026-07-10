import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Расширения",
  },
  {
    type: "paragraph",
    text: "Дополнительные функции и инструменты Stripchat",
  },
  {
    type: "divider",
  },
];

const section2: ContentBlock[] = [
  {
    type: "subheading",
    text: "Расширения на Stripchat: как делать стримы ещё интереснее и прибыльнее",
  },
  {
    type: "paragraph",
    text: "Расширения (Extensions) — это мощные встроенные инструменты Stripchat, которые превращают обычный стрим в настоящую интерактивную игру. Они отлично повышают вовлечённость зрителей, увеличивают время пребывания на стриме и, главное, помогают зарабатывать больше.",
  },
  {
    type: "paragraph",
    text: "Вот самые популярные и эффективные расширения:",
  },
  {
    type: "divider",
  },
];

const section3: ContentBlock[] = [
  {
    type: "subheading",
    text: "1. Wheel of Fortune (Колесо Фортуны) — 'Рулетка'",
  },
  {
    type: "paragraph",
    text: "Самое любимое расширение у моделей и зрителей. Это яркое интерактивное колесо, которое можно запускать за токены. Зрители платят, чтобы крутить рулетку и получать разные призы от модели.",
  },
  {
    type: "subheading",
    text: "Что можно поставить в рулетку:",
  },
  {
    type: "list",
    items: [
      "Раздевание (снимать одну вещь)",
      "Определённое действие (танец, поцелуй в камеру, шлепок и т.д.)",
      "Приват или эксклюзивный контент",
      "Специальные шоу (массаж, фетиш, игрушки)",
      "Шуточные наказания ('покажи язык', 'сделай милое личико')",
      "Бонусы ('+5 минут в привате', 'личное фото')",
    ],
  },
  {
    type: "note",
    text: "Совет: Делайте рулетку разнообразной и соблазнительной. Чем выше цена прокрута — тем горячее должен быть приз. Это один из лучших способов быстро собрать токены в начале стрима.",
  },
];

const section4: ContentBlock[] = [
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "2. Polls (Опросы) — Платные голосования",
  },
  {
    type: "paragraph",
    text: "Отличный инструмент для вовлечения и монетизации. Зрители голосуют за то, что вы будете делать дальше, но за голоса нужно платить токены.",
  },
  {
    type: "subheading",
    text: "Примеры крутых опросов:",
  },
  {
    type: "list",
    items: [
      "'Что снять первым: чулки или трусики?'",
      "'Какой игрушкой поиграть сегодня?'",
      "'Рольплей: секретарша или школьница?'",
      "'Куда нанести масло: грудь или попку?'",
      "'Цвет лака на ногтях ног' (мелкие, но частые опросы тоже работают)",
    ],
  },
  {
    type: "subheading",
    text: "Плюсы:",
  },
  {
    type: "list",
    items: [
      "Зрители чувствуют, что влияют на шоу.",
      "Постоянно держат внимание.",
      "Отлично работают в связке с Wheel of Fortune.",
    ],
  },
];

const section5: ContentBlock[] = [
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "3. Battleship (Морской бой)",
  },
  {
    type: "paragraph",
    text: "Самое азартное и конкурентное расширение. Классический 'Морской бой', где зрители стреляют по клеткам и открывают части тела модели. Каждая клетка стоит токенов, а попадание приносит горячий кадр или видео.",
  },
  {
    type: "subheading",
    text: "Как это работает:",
  },
  {
    type: "list",
    items: [
      "Вы ставите что будет при победе участников, например вы снимите что-то или покажите соски.",
      "Ставите количество токенов за каждый выстрел от участника.",
      "И участники начинают играть.",
    ],
  },
  {
    type: "paragraph",
    text: "Это расширение создаёт настоящий азарт и соревнование между зрителями. Часто именно в Морском бою модели зарабатывают очень хорошие суммы.",
  },
  {
    type: "divider",
  },
];

const section6: ContentBlock[] = [
  {
    type: "subheading",
    text: "Общие рекомендации по использованию расширений",
  },
  {
    type: "list",
    items: [
      "Комбинируйте все три расширения в одном стриме — они отлично дополняют друг друга.",
      "Объясняйте правила в начале стрима весело и понятно.",
      "Делайте яркие объявления: 'Кто готов крутить рулетку первым?!'",
      "Следите за статистикой — какие расширения лучше работают именно на вашу аудиторию.",
      "Регулярно обновляйте призы и условия, чтобы не было скучно.",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Расширения" description="Дополнительные функции и инструменты Stripchat">
      <MarkdownContent blocks={section1} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Extension 1.png"
          alt="Интерфейс расширений Stripchat"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section2} />
      <MarkdownContent blocks={section3} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Wheel of Fortune.png"
          alt="Колесо Фортуны (Рулетка)"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section4} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Polls.png"
          alt="Платные опросы (Polls)"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section5} />
      <MarkdownContent blocks={section6} />
    </ArticlePage>
  );
}
