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
    text: "Что такое SkyPrivate, скачивание плагина с официального сайта и пошаговая установка",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "1. Что такое SkyPrivate",
  },
  {
    type: "paragraph",
    text: "SkyPrivate — сервис, с которым интегрируется плагин. Установка не требует специальных технических знаний и подходит даже для начинающих пользователей.",
  },
  {
    type: "table",
    headers: ["Свойство", "Описание"],
    rows: [
      ["Назначение", "Интегрируется с системой SkyPrivate и открывает доступ к нужным функциям сервиса"],
      ["Сложность установки", "Простая — без специальных технических знаний"],
      ["Кому подходит", "В том числе новичкам, ранее не устанавливавшим подобные плагины"],
    ],
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "2. Загрузка плагина",
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
    text: "3. Установка",
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
    <ArticlePage title="Загрузка и установка" description="Что такое SkyPrivate, скачивание и установка плагина">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}