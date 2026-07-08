import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Гайд по Stripchat",
  },
  {
    type: "paragraph",
    text: "Как делать рассылку (Newsletter) после начала стрима",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "Зачем нужна рассылка?",
  },
  {
    type: "paragraph",
    text: "После того как вы начали стрим, вам необходимо сделать рассылку. Для чего она нужна? Если у вас уже раскрученная модель, к примеру у нее 2000 подписчиков, то какая-то часть из них получит уведомление о том что модель стримит, и зайдет, и ваш онлайн сразу в гору, соответственно и донаты. По этому рассылка после начала стрима необходимое действие.",
  },
  {
    type: "divider",
  },
];

const section2: ContentBlock[] = [
  {
    type: "subheading",
    text: "Как сделать рассылку: пошаговая инструкция",
  },
  {
    type: "paragraph",
    text: "В правом верхнем углу есть кнопка как газета — нажимаем на нее.",
  },
];

const section3: ContentBlock[] = [
  {
    type: "paragraph",
    text: "У нас появляется окошко 'Сообщения' справа от этого текста есть зеленая кнопочка с карандашем — нажимаем на нее.",
  },
];

const section3b: ContentBlock[] = [
  {
    type: "paragraph",
    text: "После чего по середине экрана у вас появляется окошко 'Рассылка'.",
  },
  {
    type: "divider",
  },
];

const section4: ContentBlock[] = [
  {
    type: "subheading",
    text: "Настройка параметров рассылки",
  },
  {
    type: "subheading",
    text: "1. Платная или бесплатная рассылка",
  },
  {
    type: "paragraph",
    text: "У вас есть надпись 'Платная рассылка' — нажав на нее вам дается выбор сделать бесплатную рассылку либо платную.",
  },
  {
    type: "list",
    items: [
      "Бесплатная рассылка — не добавляем нюд фото, просто делаем рассылку с ноу нюд фотками.",
      "Платная рассылка — добавляем нюд фотки. Если у вас есть нюд фото вашей модели, или уже есть готовый альбом нюд фоток, тогда мы делаем платную рассылку и ставим количество токенов такое как и цена альбома, а если же нету альбома тогда 1 фотка = 12-15 токенов.",
    ],
  },
  {
    type: "subheading",
    text: "2. Выбор получателей",
  },
  {
    type: "paragraph",
    text: "В разделе 'Выбери получателей рассылки' выбираем:",
  },
  {
    type: "list",
    items: [
      "Друзей",
      "Подписчиков фанклуба",
    ],
  },
  {
    type: "subheading",
    text: "3. Текст сообщения",
  },
  {
    type: "paragraph",
    text: "В поле 'Добавить сообщение' мы обязательно пишем текст что-то вроде 'Hi!! I'm coming!', в кратце говорим юзеру что мы его ждем на стриме.",
  },
  {
    type: "subheading",
    text: "4. Отправка",
  },
  {
    type: "paragraph",
    text: "И все, нажимаем 'Отправить рассылку'. Поздравляю, вы сделали рассылку!",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по Stripchat" description="Как делать рассылку после начала стрима">
      <MarkdownContent blocks={section1} />
      <MarkdownContent blocks={section2} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Newsletter.png"
          alt="Кнопка Newsletter в правом верхнем углу Stripchat"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section3} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Newsletter2.png"
          alt="Зеленая кнопочка с карандашем для создания рассылки"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section3b} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Newsletter3.png"
          alt="Окно рассылки с настройками"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section4} />
    </ArticlePage>
  );
}
