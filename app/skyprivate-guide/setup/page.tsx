import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Первичная настройка SkyPrivate",
  },
  {
    type: "paragraph",
    text: "Ввод учётных данных, базовые параметры и сохранение изменений",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "1. Вход в аккаунт",
  },
  {
    type: "ordered-list",
    items: [
      "Ввести данные своей учётной записи (логин и пароль).",
      "Настроить базовые параметры подключения.",
      "Убедиться, что ваша система совместима с плагином (обычно происходит автоматически).",
      "Обязательно сохранить внесённые изменения.",
    ],
  },
  {
    type: "note",
    text: "Данные аккаунта передаются между операторами — используйте единый формат записи.",
  },
  {
    type: "divider",
  },
  {
    type: "subheading",
    text: "2. Проверка совместимости",
  },
  {
    type: "paragraph",
    text: "Плагин SkyPrivate автоматически проверяет совместимость с вашей операционной системой при первом запуске. Если система несовместима, вы увидите соответствующее предупреждение — в этом случае обратитесь в техническую поддержку сервиса.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Первичная настройка" description="Настройка плагина SkyPrivate после установки">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}