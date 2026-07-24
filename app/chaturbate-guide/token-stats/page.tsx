import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Статистика токенов — Chaturbate",
  description: "Финансовая статистика и отслеживание донатов на Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Статистика токенов" description="Финансовая статистика и отслеживание донатов на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Статистика токенов (Token Stats)</h2>

      <p className="text-lg leading-relaxed">
        В разделе Token Stats вы видите полную финансовую картину стрима: сколько токенов заработали, кто и сколько донатил, историю последних донатов.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">Как открыть статистику:</h3>

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4">
        <li>
          <strong>Шаг 1.</strong> В правом верхнем углу панели управления нажмите на иконку монетки с цифрой (баланс токенов).
        </li>
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

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4" start={2}>
        <li>
          <strong>Шаг 2.</strong> В появившемся окне нажмите <strong>Token Stats</strong> — вас перенесёт на страницу полной статистики.
        </li>
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

      <h3 className="text-xl font-semibold mt-10 mb-4">Что отображается в Token Stats:</h3>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Общий баланс токенов</strong> — текущий заработок за сессию</li>
        <li><strong>Последние донаты</strong> — список транзакций с указанием ника пользователя и суммы</li>
        <li><strong>Топ-донатеры</strong> — пользователи, которые потратили больше всего токенов</li>
        <li><strong>История донатов</strong> — полный лог всех платежей за выбранный период</li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Совет</h4>
        <p className="text-base leading-relaxed">
          Периодически проверяйте Token Stats во время стрима. Это помогает отслеживать, какие действия приносят больше донатов и кто из зрителей наиболее активен.
        </p>
      </div>
    </ArticlePage>
  );
}