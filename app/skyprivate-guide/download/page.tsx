import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const intro: ContentBlock[] = [
  {
    type: "heading",
    text: "Загрузка и установка SkyPrivate",
  },
  {
    type: "paragraph",
    text: "Скачивание плагина с официального сайта и пошаговая установка на компьютер",
  },
  {
    type: "divider",
  },
];

const section1: ContentBlock[] = [
  {
    type: "subheading",
    text: "1. Что такое SkyPrivate",
  },
  {
    type: "paragraph",
    text: "SkyPrivate — это сервис, с которым интегрируется специальный плагин. Его установка не требует глубоких технических знаний и легко дается даже начинающим пользователям.",
  },
  {
    type: "table",
    headers: ["Свойство", "Описание"],
    rows: [
      ["Назначение", "Интегрируется с системой SkyPrivate и открывает доступ к функциям сервиса"],
      ["Сложность установки", "Простая — справится любой ПК-пользователь"],
      ["Кому подходит", "Абсолютно всем, в том числе новичкам, ранее не работавшим с подобным софтом"],
    ],
  },
  {
    type: "divider",
  },
];

const section2: ContentBlock[] = [
  {
    type: "subheading",
    text: "2. Шаг 1: Загрузка плагина",
  },
  {
    type: "ordered-list",
    items: [
      "Перейдите на официальный сайт SkyPrivate.",
      "Найдите раздел загрузки плагина.",
      "Скачайте последнюю доступную версию на свой компьютер.",
    ],
  },
  {
    type: "note",
    text: "Используйте для скачивания только официальный источник! Это обезопасит вас от установки повреждённых или вредоносных файлов.",
  },
  {
    type: "divider",
  },
];

const section3: ContentBlock[] = [
  {
    type: "subheading",
    text: "3. Шаг 2: Процесс установки",
  },
  {
    type: "paragraph",
    text: "После загрузки файла выполните следующие действия:",
  },
  {
    type: "ordered-list",
    items: [
      "Откройте скачанный установщик.",
      "Нажмите кнопку «Далее».",
      "Прочитайте и примите лицензионное соглашение.",
      "Нажмите «Установить».",
      "Дождитесь окончания процесса распаковки файлов.",
    ],
  },
  {
    type: "paragraph",
    text: "Как только установка завершится, можно переходить к настройке системы.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Загрузка и установка" description="Скачивание и установка плагина SkyPrivate">
      <MarkdownContent blocks={intro} />
      <MarkdownContent blocks={section1} />
      <MarkdownContent blocks={section2} />
      <MarkdownContent blocks={section3} />
    </ArticlePage>
  );
}