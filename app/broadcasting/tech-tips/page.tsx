import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "list",
    items: [
      "Мульти-гол (addtokens): использовать, чтобы продвинуть шоу, если гол не закрывается",
      "Голы: маленькие — для активности, большие — для сбора денег",
      "Ставить голы не выше 100 токенов, в зависимости от онлайна",
      "Настроить фан-клуб: сиджи с именем мембера, контроль игрушки раз в день и т.д.",
      "Делать шоу ПОСТОЯННО на трансляции. Смотреть чат (голы, боты, меню, действия модели)",
      "Не затягивать с началом гола, сменой кадра, переодеванием",
      "Экспериментировать и пробовать новое",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Технические моменты и фишки">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}
