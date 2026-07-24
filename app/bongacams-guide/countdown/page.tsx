import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Работа с целями (Countdown) — BongaCams",
  description: "Настройка и использование целей (Countdown) на BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Работа с целями (Countdown)" description="Настройка и использование целей (Countdown) на BongaCams">
      <h2 className="text-2xl font-bold mb-6">Работа с целями (Countdown)</h2>

      <p className="text-lg leading-relaxed">
        Цель (<strong>Countdown</strong>) — один из важнейших элементов стрима, про который нельзя забывать. Бот автоматически отслеживает полученные чаевые и показывает прогресс до достижения установленной цели.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Countdown.png"
          alt="Настройка целей Countdown на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Правила постановки целей</h3>

      <ul className="list-disc list-inside space-y-3 text-lg ml-4 mt-4">
        <li>
          <strong>Цели расставляются по возрастанию цены</strong> — от самой дешёвой к самой дорогой. Это создаёт ощущение прогресса и мотивирует зрителей продолжать донатить.
        </li>
        <li>
          <strong>Стрим начинается с минимальной цели</strong> — 10–15 токенов. Низкий порог входа позволяет даже новым зрителям участвовать.
        </li>
        <li>
          <strong>После выполнения текущей цели необходимо сразу переключать её на следующую</strong> — более дорогую. Не оставляйте выполненные цели висеть.
        </li>
        <li>
          <strong>Чем больше целей выполняется за стрим — тем выше растёт стрипскор модели</strong>. Активность напрямую влияет на позиции модели в рейтингах.
        </li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Примеры стартовых целей</h4>
        <ul className="space-y-2 text-base">
          <li>• <strong>Lick my lips</strong> — 10 токенов</li>
          <li>• <strong>Show feet</strong> — 15 токенов</li>
          <li>• <strong>Blow a kiss</strong> — 10 токенов</li>
          <li>• <strong>Show tongue</strong> — 20 токенов</li>
          <li>• <strong>Flash boobs</strong> — 80 токенов</li>
          <li>• <strong>Spank ass</strong> — 120 токенов</li>
          <li>• <strong>Full nude + oil</strong> — 400 токенов</li>
        </ul>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важное напоминание</h4>
        <p className="text-base leading-relaxed">
          Цели — это не статичная настройка. Их нужно активно менять во время стрима. Модель должна выполнять достигнутую цель и сразу переходить к следующей. Забытая выполненная цель = потерянные токены и падение интереса зрителей.
        </p>
      </div>
    </ArticlePage>
  );
}