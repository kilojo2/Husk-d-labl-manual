import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Не просить поддержки: просить лайки, оценки, комментарии (в середине, в конце и после привата)",
      "Игнорировать «тихих» мемберов: предлагать свой сценарий, делать паузы, менять формат",
      "Отключать подсмотрщиков: это дополнительный доход и будущие клиенты. Если нужен эксклюзив — поднять цену за подсмотр",
      "Разговаривать с подсмотрщиками: всё внимание на того, кто платит за приват",
      "Медленное начало: сразу показать готовность, поприветствовать, спросить, чего хочет мембер, начать с небольшого действия",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Топ ошибок в привате">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
