import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Приложения (APPS) — Chaturbate",
  description: "Настройка приложений Dream Goals, The Menu и Baboon's Hidden Show на Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Приложения (APPS)" description="Настройка приложений Dream Goals, The Menu и Baboon's Hidden Show на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Блок APPS — 3 основных приложения</h2>

      <p className="text-lg leading-relaxed">
        Приложения (Apps) — ключевой инструмент для монетизации стрима. Три главных приложения: Dream Goals, The Menu и Baboon's Hidden Show.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Цели (Dream Goals)</h3>

      <p className="text-lg leading-relaxed">
        Пролистайте вниз до <strong>App Directory</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 12.jpg"
          alt="App Directory на Chaturbate"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        Найдите и выберите <strong>Dream Goals</strong>. Нажмите <strong>Install</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 13.jpg"
          alt="Выбор приложения Dream Goals"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        После установки нажмите <strong>Settings</strong>. Пролистайте до раздела <strong>List of Goals</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 14.jpg"
          alt="Настройка списка целей Dream Goals"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важно: удалите стандартные цели</h4>
        <p className="text-base leading-relaxed">
          Удалите все стандартные (дефолтные) цели крестиком и добавьте свои собственные. Стандартные цели неэффективны — пишите персонализированные цели для своей модели.
        </p>
      </div>

      <p className="text-lg leading-relaxed mt-6">
        Посмотреть текущее состояние цели можно здесь:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 15.jpg"
          alt="Текущее состояние целей"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Прайс-лист действий (The Menu)</h3>

      <p className="text-lg leading-relaxed">
        Найдите и установите приложение <strong>The Menu</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 16.jpg"
          alt="Установка приложения The Menu"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        Перейдите в <strong>Settings</strong>. Пролистайте вниз до <strong>Menu Item</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 17.jpg"
          alt="Настройка Menu Item"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        Заполните поля:
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Menu Item</strong> — название действия (например, «Flash boobs», «Spank», «Kiss»)</li>
        <li><strong>Item Price</strong> — цена в токенах</li>
      </ul>

      <p className="text-lg leading-relaxed mt-4">
        Добавьте все платные действия и укажите количество токенов за каждое. Меню отобразится в чате для зрителей.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Подглядки (Baboon's Hidden Show)</h3>

      <p className="text-lg leading-relaxed">
        Найдите и установите приложение <strong>Baboon's Hidden Show</strong>.
      </p>

      <p className="text-lg leading-relaxed mt-4">
        Перейдите в <strong>Settings</strong>. Найдите поле <strong>Spy-Price (Tokens/Min)</strong> и измените цену с 50 на <strong>12</strong> токенов.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 18.jpg"
          alt="Настройка Baboon's Hidden Show"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">🎮 Управление подглядками</h4>
        <p className="text-base leading-relaxed">
          Чтобы <strong>начать</strong> подглядки — напишите в чат команду: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">*start</code>
        </p>
        <p className="text-base leading-relaxed mt-2">
          Чтобы <strong>остановить</strong> — напишите: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">*stop</code>
        </p>
      </div>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 19.jpg"
          alt="Команды для подглядок"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
    </ArticlePage>
  );
}