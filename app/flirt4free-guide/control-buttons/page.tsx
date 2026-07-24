import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Кнопки управления — Flirt4Free",
  description: "Обзор кнопок управления Performer App на Flirt4Free",
};

export default function Page() {
  return (
    <ArticlePage title="Кнопки управления" description="Обзор кнопок управления Performer App на Flirt4Free">
      <h2 className="text-2xl font-bold mb-6">Кнопки управления (Верхняя панель)</h2>

      <p className="text-lg leading-relaxed">
        В верхней панели Performer App расположены основные кнопки управления трансляцией.
      </p>

      <div className="space-y-6 mt-8">
        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Start Chat</h3>
          <p className="mt-2 text-text-muted">Запуск сессии (нажимается после старта OBS). Переводит статус в Online.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Start Break</h3>
          <p className="mt-2 text-text-muted">Включает перерыв. Зрители видят заставку. Нажимается перед паузой.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Start Fake</h3>
          <p className="mt-2 text-text-muted">Запускает трансляцию заранее записанного видео вместо живого потока.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Change Rate</h3>
          <p className="mt-2 text-text-muted">Позволяет изменить цену за минуту в Private шоу (в кредитах).</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Start Group</h3>
          <p className="mt-2 text-text-muted">Запускает Group Show — совместное шоу, для которого юзеры скидываются кредитами.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Start Party</h3>
          <p className="mt-2 text-text-muted">Запускает Party Show — платное шоу с заранее объявленной ценой за вход.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Show Offers</h3>
          <p className="mt-2 text-text-muted">Включает специальные предложения и акции для зрителей.</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Alert Monitor</h3>
          <p className="mt-2 text-text-muted">Выводит уведомления о VIP-юзерах и крупных чаевых (типах).</p>
        </div>

        <div className="border border-border/50 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-text-primary">Games</h3>
          <p className="mt-2 text-text-muted">Открывает интерактивные игры с аудиторией.</p>
        </div>
      </div>
    </ArticlePage>
  );
}