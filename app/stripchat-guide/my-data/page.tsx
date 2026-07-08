import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const section1: ContentBlock[] = [
  {
    type: "heading",
    text: "Мои данные",
  },
  {
    type: "paragraph",
    text: "Управление личной информацией и настройками профиля",
  },
  {
    type: "divider",
  },
];

const section2: ContentBlock[] = [
  {
    type: "subheading",
    text: "Подробности о шоу",
  },
  {
    type: "list",
    items: [
      "**В публичных шоу я делаю** — сюда вносим ноу-нюд действия: например, показываем ножки, оцениваем член и прочее.",
      "**В приватных шоу я также делаю** — сюда вносим уже нюд-действия, но не указываем мастурбацию. Например: раздеваемся до трусиков, делаем футджоб, массаж груди или попы.",
      "**Эксклюзивный приват** — здесь указываем все действия модели: мастурбируем, раздеваемся догола, плюём на грудь и прочее.",
    ],
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "Цена шоу",
  },
  {
    type: "paragraph",
    text: "Всего есть три вида привата:",
  },
  {
    type: "list",
    items: [
      "**Подглядки** — включаем, когда приват запущен на одной из площадок, чтобы юзер не смотрел на обнажённую модель бесплатно.",
      "**Обычный приват** — его отправляют нам, самостоятельно включить его мы не можем. На Стрипчате уведомление о привате появляется в правом нижнем углу.",
      "**Эксклюзивный приват** — самый дорогой вид, с поддержкой C2C. В нём модель выполняет намного больше действий, чем в обычном привате.",
    ],
  },
  {
    type: "subheading",
    text: "Минимальные цены и время",
  },
  {
    type: "list",
    items: [
      "**Обычное приватное шоу** — 16 или 18 токенов, от 2 минут.",
      "**Эксклюзивное шоу** — 24 токена, от 3 минут.",
    ],
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "Оффлайн-статус",
  },
  {
    type: "paragraph",
    text: "Оффлайн-статус мы создаём с помощью ИИ — это текст, который отображается юзеру, пока модель не в эфире.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Мои данные" description="Управление личной информацией и настройками профиля">
      <MarkdownContent blocks={section1} />

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/My information.png"
          alt="Интерфейс раздела Мои данные в Stripchat"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section2} />
    </ArticlePage>
  );
}
