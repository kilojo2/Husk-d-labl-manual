import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Платные действия (Tip Menu) — BongaCams",
  description: "Настройка прайс-листа платных действий (Tip Menu) на BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Платные действия (Tip Menu)" description="Настройка прайс-листа платных действий (Tip Menu) на BongaCams">
      <h2 className="text-2xl font-bold mb-6">Настройка платных действий (Tip Menu)</h2>

      <p className="text-lg leading-relaxed">
        Бот <strong>Tip Menu</strong> позволяет создать прайс-лист на услуги модели. Зрители видят меню в чате и могут выбирать действия, оплачивая их токенами.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">Как настроить Tip Menu:</h3>

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4">
        <li>
          <strong>Шаг 1.</strong> Перейти в раздел <strong>APPS & CHATBOTS → ChatBots</strong>.
        </li>
        <li>
          <strong>Шаг 2.</strong> Включить ползунок <strong>Tip Menu Bot</strong> — перевести в положение <strong>ON</strong>.
        </li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Tip Menu.png"
          alt="Настройка Tip Menu Bot на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-4 text-lg ml-4 mt-4" start={3}>
        <li>
          <strong>Шаг 3.</strong> В настройках (<strong>Tip Menu Settings</strong>) заполнить поля:
          <ul className="list-disc list-inside space-y-2 text-lg ml-6 mt-3">
            <li><strong>Service</strong> — название услуги (например, «Kiss», «Flash boobs», «Spank»)</li>
            <li><strong>Price</strong> — стоимость в токенах</li>
          </ul>
        </li>
        <li>
          <strong>Шаг 4.</strong> Нажать <strong>Save Changes</strong> для сохранения.
        </li>
      </ol>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Критически важное правило</h4>
        <p className="text-base leading-relaxed">
          Все действия из списка должны быть <strong>заранее согласованы с моделью</strong>. Невыполнение оплаченного действия может привести к жалобам зрителей и <strong>сильному падению рейтинга модели</strong>. Модель обязана выполнить любое оплаченное действие из Tip Menu.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Рекомендации по ценам</h4>
        <ul className="space-y-2 text-base">
          <li>• Простые действия (Kiss, Blow kiss, Lick lips) — <strong>10-15 токенов</strong></li>
          <li>• Средний сегмент (Show feet, Flash boobs, Spank) — <strong>50-150 токенов</strong></li>
          <li>• Дорогие шоу (Full nude, Oil show, Toy play) — <strong>300+ токенов</strong></li>
        </ul>
      </div>
    </ArticlePage>
  );
}