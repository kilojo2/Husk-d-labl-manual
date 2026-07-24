import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Рассылка — Chaturbate",
  description: "Рассылка уведомлений подписчикам (Announce you're online) на Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Рассылка" description="Рассылка уведомлений подписчикам (Announce you're online) на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Рассылка (Announce you're online)</h2>

      <p className="text-lg leading-relaxed font-semibold">Что это такое?</p>

      <p className="text-lg leading-relaxed mt-4">
        Рассылка — это уведомление всем вашим подписчикам о том, что вы начали трансляцию. Это необходимый шаг сразу после старта стрима.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важное правило</h4>
        <p className="text-base leading-relaxed">
          В рассылке можно использовать только фото без обнажённых половых органов. Например, если грудь прикрыта рукой — можно. Полностью обнажённое тело — нельзя. За нарушение — блокировка рассылки.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Как отправить рассылку:</h3>

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4">
        <li>
          <strong>Шаг 1.</strong> На главной странице панели управления нажмите кнопку <strong>Announce you're online</strong>.
        </li>
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

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4" start={2}>
        <li>
          <strong>Шаг 2.</strong> Загрузите подходящее фото — улыбка модели, селфи и т.д. Фото должно быть привлекательным, но без откровенной наготы.
        </li>
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

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4" start={3}>
        <li>
          <strong>Шаг 3.</strong> Нажмите <strong>Send notifications</strong> — рассылка отправлена всем вашим подписчикам.
        </li>
      </ol>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Совет</h4>
        <p className="text-base leading-relaxed">
          Делайте рассылку в первые 2-3 минуты после начала стрима. Чем раньше подписчики получат уведомление, тем быстрее они зайдут в комнату и начнут донатить.
        </p>
      </div>
    </ArticlePage>
  );
}