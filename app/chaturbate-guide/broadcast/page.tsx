import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Запуск и подготовка — Chaturbate",
  description: "Подготовка и запуск трансляции на Chaturbate через ShineBrowser",
};

export default function Page() {
  return (
    <ArticlePage title="Запуск и подготовка" description="Подготовка и запуск трансляции на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Как начать трансляцию</h2>

      <p className="text-lg leading-relaxed">
        Для стримов используйте <strong>ShineBrowser</strong>. На главной странице браузера выберите площадку <strong>Chaturbate</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen6.jpg"
          alt="Выбор Chaturbate в ShineBrowser"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        После перехода на сайт в правом верхнем углу найдите кнопку <strong>Broadcast</strong> и нажмите на неё — вы попадёте в панель управления трансляцией.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 7.jpg"
          alt="Кнопка Broadcast на Chaturbate"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Важно</h4>
        <p className="text-base leading-relaxed">
          Для стабильной работы используйте только ShineBrowser. Обычные браузеры могут блокировать
          всплывающие окна и мешать корректной загрузке панели управления.
        </p>
      </div>
    </ArticlePage>
  );
}