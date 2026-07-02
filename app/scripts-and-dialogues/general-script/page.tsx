import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "subheading",
    text: "3.1 Сбор информации",
  },
  {
    type: "paragraph",
    text: "Кто он, чем занимается, откуда.",
  },
  {
    type: "subheading",
    text: "3.2 Установление контакта",
  },
  {
    type: "paragraph",
    text: "Общаться «как с кентом».",
  },
  {
    type: "paragraph",
    text: "Если отвечает быстро — ок, параллельно выяснять, что ему нужно на сайте.",
  },
  {
    type: "subheading",
    text: "3.3 Выявление потребности",
  },
  {
    type: "paragraph",
    text: "Чего хочет: общение, фри-шоу, «поплакаться», подрочить.",
  },
  {
    type: "list",
    items: [
      "Задавать открытые и альтернативные вопросы",
      "Всю информацию помечать в «заметки о мембере»",
      "Техника «дублирования»: повторять его запрос («ты хочешь кам шоу?»)",
    ],
  },
  {
    type: "subheading",
    text: "3.4 Презентация",
  },
  {
    type: "list",
    items: [
      "Заранее записать в блокнот красивое описание своих гол и шоу",
      "Подстраивать презентацию под каждого мембера (не использовать шаблоны бездумно)",
    ],
  },
  {
    type: "subheading",
    text: "3.5 Сопровождение после шоу",
  },
  {
    type: "list",
    items: [
      "Не прощаться сразу",
      "Спросить, как ему понравилось (после шоу часто оставляют чаевые)",
      "Это помогает не выглядеть «просто кошельком» и повышает шанс на постоянника",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Скрипт диалога с мембером">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
