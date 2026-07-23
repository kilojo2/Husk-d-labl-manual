import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по Chaturbate",
  description: "Полное руководство по работе с платформой Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Гайд по Chaturbate" description="Полное руководство по работе с платформой Chaturbate">
      <p className="text-lg leading-relaxed">
        Chaturbate — интересная и прогрессивная площадка, на которой можно хорошо зарабатывать.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-6">Как начать трансляцию</h2>

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
        После перехода на сайт в правом верхнем углу найдите кнопку <strong>Broadcast</strong> и нажмите на неё.
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

      <h2 className="text-2xl font-bold mt-12 mb-6">Панель управления трансляцией</h2>

      <p className="text-lg leading-relaxed">
        Вы попадёте в панель управления трансляцией. Здесь доступны:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 1.jpg"
          alt="Панель управления трансляцией Chaturbate"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-6">
        <li>Рассылка</li>
        <li>Статистика токенов</li>
        <li>Получение RTMP-адреса и ключа трансляции</li>
        <li>Цели</li>
        <li>Блоки: Apps, Games, Bio, Settings & Privacy, Content Stats, Token Stats, Share, Memberships</li>
        <li>Количество зрителей на трансляции</li>
        <li>PM (приватные сообщения)</li>
        <li>Статистика лайков и дизлайков</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-6">Рассылка (Announce you're online)</h2>

      <p className="text-lg leading-relaxed font-semibold">Что это такое?</p>

      <p className="text-lg leading-relaxed mt-4">
        Рассылка — это уведомление всем вашим подписчикам о том, что вы начали трансляцию.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важное правило</h4>
        <p className="text-base leading-relaxed">
          В рассылке можно использовать только фото без обнажённых половых органов. Например, если грудь прикрыта рукой — можно. Полностью обнажённое тело — нельзя.
        </p>
      </div>

      <p className="text-lg leading-relaxed font-semibold mt-6">Как отправить рассылку:</p>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4">
        <li>На главной странице нажмите кнопку <strong>Announce you're online</strong>.</li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 8.jpg"
          alt="Кнопка Announce you're online"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4" start={2}>
        <li>Загрузите подходящее фото (улыбка модели, селфи и т.д.).</li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 9.png"
          alt="Загрузка фото для рассылки"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4" start={3}>
        <li>Отправьте рассылку.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-12 mb-6">Статистика токенов (Token Stats)</h2>

      <p className="text-lg leading-relaxed">
        Здесь вы видите, сколько токенов заработали, кто и сколько вам донатил в последнее время.
      </p>

      <p className="text-lg leading-relaxed mt-6 font-semibold">Где находится:</p>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4">
        <li>В правом верхнем углу нажмите на иконку монетки с цифрой.</li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 10.png"
          alt="Иконка монетки с балансом токенов"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4" start={2}>
        <li>В появившемся окне нажмите <strong>Token Stats</strong> — вас перенесёт на страницу статистики.</li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 11.jpg"
          alt="Страница статистики токенов"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Блок APPS — 3 основных приложения</h2>

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
        Найдите и выберите <strong>Dream Goals</strong>.
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
        Нажмите <strong>Settings</strong>. Пролистайте до раздела <strong>List of Goals</strong>.
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

      <p className="text-lg leading-relaxed mt-6">
        Удалите все стандартные цели крестиком и добавьте свои. Посмотреть текущее состояние цели можно здесь:
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

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Тип меню (The Menu)</h3>

      <p className="text-lg leading-relaxed">
        Установите приложение <strong>The Menu</strong>.
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
        Добавьте платные действия и укажите количество токенов за каждое.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Подглядки (Baboon's Hidden Show)</h3>

      <p className="text-lg leading-relaxed">
        Установите приложение <strong>Baboon's Hidden Show</strong>.
      </p>

      <p className="text-lg leading-relaxed mt-4">
        Перейдите в <strong>Settings</strong>. Найдите поле <strong>Spy-Price (Tokens/Min)</strong> и измените цену с 50 на 12.
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

      <p className="text-lg leading-relaxed mt-6">
        Чтобы начать подглядки — напишите в чат: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">*start</code>
      </p>
      <p className="text-lg leading-relaxed mt-2">
        Чтобы остановить — напишите: <code className="bg-muted px-2 py-1 rounded text-sm font-mono">*stop</code>
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 19.jpg"
          alt="Команды для подглядок"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Блок SETTINGS & PRIVACY</h2>

      <p className="text-lg leading-relaxed">
        В этом блоке вы можете:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-6">
        <li>Разрешить / запретить приватные шоу</li>
        <li>Настроить геоблок</li>
        <li>Изменить цену приватов</li>
        <li>Настроить цену Fan Club (фанклуба)</li>
      </ul>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 3.jpg"
          alt="Настройки Settings & Privacy часть 1"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 4.jpg"
          alt="Настройки Settings & Privacy часть 2"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
    </ArticlePage>
  );
}
