import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Типы шоу — Flirt4Free",
  description: "Обзор типов шоу на Flirt4Free: Free Chat, Private/VIP, Group Show, Party Show",
};

export default function Page() {
  return (
    <ArticlePage title="Типы шоу" description="Обзор типов шоу на Flirt4Free: Free Chat, Private/VIP, Group Show, Party Show">
      <h2 className="text-2xl font-bold mb-6">Типы шоу на площадке</h2>

      <p className="text-lg leading-relaxed">
        Flirt4Free предлагает <strong>4 типа шоу</strong>, каждый со своей механикой монетизации.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Основной режим (Free Chat)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Бесплатный просмотр для всех.</li>
        <li>Доход формируется из чаевых (<strong>Tips</strong>).</li>
        <li>Это основное место для общения с аудиторией.</li>
        <li>Рекомендуется использовать <strong>Show Offers</strong> для продажи приватов.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Один на один (Private / VIP)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Один юзер оплачивает поминутный тариф (<strong>Rate</strong>).</li>
        <li>Другие пользователи могут подглядывать (режим <strong>Voyeur</strong>).</li>
        <li>Приносит <strong>самый высокий доход</strong> за единицу времени.</li>
        <li>Во время привата Free Chat недоступен.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Совместное шоу (Group Show)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Юзеры коллективно скидываются на цель (<strong>Goal</strong>).</li>
        <li>Шоу начинается после достижения цели.</li>
        <li>Формат отлично подходит для <strong>большой аудитории</strong>.</li>
        <li>Запускается кнопкой <strong>Start Group</strong>.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">4. Платный вход (Party Show)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Шоу по билетам с <strong>фиксированной ценой входа</strong>.</li>
        <li>Содержание эфира объявляется заранее.</li>
        <li>Хорошо привлекает лояльных фанатов.</li>
        <li>Запускается кнопкой <strong>Start Party</strong>.</li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Рекомендация</h4>
        <p className="text-base leading-relaxed">
          Начинайте стрим с Free Chat для набора аудитории, затем используйте Group Show для разогрева, а Private/VIP предлагайте самым заинтересованным зрителям. Party Show хорошо работает с лояльной аудиторией, которая уже знакома с моделью.
        </p>
      </div>
    </ArticlePage>
  );
}