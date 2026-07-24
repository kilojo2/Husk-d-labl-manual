import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Приложения и чат-боты — BongaCams",
  description: "Обзор приложений и чат-ботов на BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Приложения и чат-боты" description="Обзор приложений и чат-ботов на BongaCams">
      <h2 className="text-2xl font-bold mb-6">Приложения и Чат-боты (Apps & Chatbots)</h2>

      <p className="text-lg leading-relaxed">
        BongaCams предоставляет встроенных чат-ботов для автоматизации стрима. Переход к ботам осуществляется через боковое меню: <strong>APPS & CHATBOTS → ChatBots</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Apps&Chatbots.png"
          alt="Раздел APPS & CHATBOTS в меню BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Доступные чат-боты</h3>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Chatbots.png"
          alt="Список доступных чат-ботов BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">Платформа предлагает 4 основных бота:</p>

      <ul className="list-disc list-inside space-y-3 text-lg ml-4 mt-4">
        <li>
          <strong>Tip Menu</strong> — прайс-лист платных действий. Позволяет зрителям выбирать действия за токены из меню.
        </li>
        <li>
          <strong>Countdown</strong> — отслеживание прогресса целей. Автоматически считает полученные чаевые и показывает прогресс до достижения цели.
        </li>
        <li>
          <strong>Wheel of Fortune</strong> — колесо фортуны. Интерактивная рулетка, где зрители крутят колесо за токены для получения призов.
        </li>
        <li>
          <strong>Fan Boost Bot</strong> — бот для повышения рейтинга. Позволяет зрителям голосовать за модель токенами для поднятия её в рейтинге.
        </li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Совет</h4>
        <p className="text-base leading-relaxed">
          Включите как минимум Tip Menu и Countdown перед каждым стримом. Это два самых важных бота, которые напрямую влияют на заработок. Wheel of Fortune подключайте по желанию — он требует более активного управления.
        </p>
      </div>
    </ArticlePage>
  );
}