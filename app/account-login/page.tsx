import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const intro: ContentBlock[] = [
  {
    type: "heading",
    text: "Stripchat - вход в аккаунт",
  },
  {
    type: "divider",
  },
];

const section1: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Чтобы войти в аккаунт на Stripchat, нужно перейти по ссылке в ShineBrowser. Это красный блок, который называется StripChat.",
  },
];

const section2: ContentBlock[] = [
  {
    type: "paragraph",
    text: "Нажимаем на него, и нас перекидывает на сам сайт Stripchat. Чтобы войти, снизу есть кнопка \"Войти в аккаунт без пароля\".",
  },
];

const section3: ContentBlock[] = [
  {
    type: "ordered-list",
    items: [
      "Вводим туда почту, которую вам дал ваш коуч.",
      "Нажимаем зелёную кнопку \"Получить код и ссылку\".",
      "Пишем коучу: \"дай код от стрипа\".",
      "После чего вводим код, и всё — вы зашли в аккаунт.",
    ],
  },
];

export default function Page() {
  return (
    <ArticlePage title="Вход в аккаунты" description="Stripchat - вход в аккаунт">
      <MarkdownContent blocks={intro} />

      <MarkdownContent blocks={section1} />
      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/StripBrowser.png"
          alt="Красный блок StripChat в ShineBrowser"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section2} />
      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Accnopass.png"
          alt="Кнопка 'Войти в аккаунт без пароля' на Stripchat"
          width={800}
          height={450}
          className="h-auto w-full"
        />
      </div>

      <MarkdownContent blocks={section3} />
    </ArticlePage>
  );
}
