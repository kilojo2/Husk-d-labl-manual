import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Загрузка и установка SkyPrivate",
  },
  {
    type: "paragraph",
    text: "Скачивание плагина с официального сайта и пошаговая установка",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "1. Загрузка плагина",
  },
  {
    type: "paragraph",
    text: "Шаг 1. Скачивание",
  },
  {
    type: "ordered-list",
    items: [
      "Перейдите на официальный сайт SkyPrivate.",
      "Найдите раздел загрузки плагина.",
      "Скачайте последнюю доступную версию.",
    ],
  },
  {
    type: "note",
    text: "Используйте только официальный источник, чтобы избежать повреждённых или вредоносных файлов.",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "2. Установка",
  },
  {
    type: "paragraph",
    text: "Шаг 2. Запуск установки",
  },
  {
    type: "paragraph",
    text: "После загрузки файла:",
  },
  {
    type: "list",
    items: [
      "откройте установщик;",
      "нажмите «Далее»;",
      "примите лицензионное соглашение;",
      "нажмите «Установить»;",
      "дождитесь окончания процесса.",
    ],
  },
  {
    type: "paragraph",
    text: "После завершения установки можно переходить к настройке.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Загрузка и установка" description="Скачивание и установка плагина SkyPrivate">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}