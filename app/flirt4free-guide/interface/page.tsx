import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Интерфейс Performer App — Flirt4Free",
  description: "Обзор рабочего экрана Performer App: пять зон и статусы трансляции",
};

export default function Page() {
  return (
    <ArticlePage title="Интерфейс Performer App" description="Обзор рабочего экрана Performer App на Flirt4Free">
      <h2 className="text-2xl font-bold mb-6">Интерфейс Performer App</h2>

      <p className="text-lg leading-relaxed">
        Рабочий экран программы разделён на <strong>пять основных зон</strong>:
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Панель кнопок (верх)</h3>
      <p className="text-lg leading-relaxed">
        Включает функции: Start Chat, Break, Fake, Rate, Group, Party, Show Offers, Alert Monitor, Games.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Превью видео (лево)</h3>
      <p className="text-lg leading-relaxed">
        Область трансляции. Если используется External Broadcaster, здесь отображается логотип F4F до запуска OBS.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Чат (центр)</h3>
      <p className="text-lg leading-relaxed">
        Здесь отображаются все сообщения от юзеров и системные уведомления.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">4. Зрители (право)</h3>
      <p className="text-lg leading-relaxed">
        Вкладка <strong>#Users</strong> показывает количество и список подключенных зрителей.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">5. Статистика (низ-лево)</h3>
      <p className="text-lg leading-relaxed">
        Содержит данные о:
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Time Online</strong> — время в эфире</li>
        <li><strong>Credits, Tips</strong> — заработок в кредитах и чаевых</li>
        <li><strong>Number of Shows</strong> — количество проведённых шоу</li>
        <li><strong>Max Customers</strong> — пиковый онлайн</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">Статус трансляции</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Offline</strong> — стрим не в эфире, зрители его не видят.</li>
        <li><strong>Online</strong> — эфир запущен, зрители подключены.</li>
      </ul>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важно</h4>
        <p className="text-base leading-relaxed">
          При первом входе после логина система требует нажать кнопку <strong>Start Chat</strong>, чтобы начать сессию и выйти в эфир. Появится сообщение: «You must now press the Start Chat button to start a chat session.»
        </p>
      </div>
    </ArticlePage>
  );
}