import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Settings & Privacy — Chaturbate",
  description: "Настройки приватности, геоблокировки, приватные шоу и Fan Club на Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Settings & Privacy" description="Настройки приватности, геоблокировки, приватные шоу и Fan Club на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Блок SETTINGS & PRIVACY</h2>

      <p className="text-lg leading-relaxed">
        Блок <strong>Settings & Privacy</strong> находится внизу панели управления. Здесь собраны все ключевые настройки безопасности, приватности и параметров шоу.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 3.jpg"
          alt="Настройки Settings & Privacy часть 1"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Геоблокировка (Geo Block)</h3>

      <p className="text-lg leading-relaxed">
        Ограничение доступа к трансляции для пользователей из определённых стран и регионов.
      </p>

      <p className="text-lg leading-relaxed mt-4 font-semibold">Зачем нужна геоблокировка?</p>
      <p className="text-lg leading-relaxed mt-2">
        Чтобы скрыть стрим от зрителей из стран, где:
      </p>
      <ul className="list-disc list-inside space-y-1 text-lg ml-4 mt-2">
        <li>Модель хочет избежать узнавания (страна проживания)</li>
        <li>Низкая платёжеспособность аудитории</li>
        <li>Законодательные ограничения</li>
      </ul>

      <p className="text-lg leading-relaxed mt-6 font-semibold">Как настроить:</p>
      <p className="text-lg leading-relaxed mt-2">
        Найдите раздел <strong>Block Access to Users in These Countries/Regions</strong> и выберите нужные страны из выпадающего списка.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Fan Club (Фан-клуб)</h3>

      <p className="text-lg leading-relaxed">
        Fan Club — платная ежемесячная подписка, которая даёт пользователям доступ к эксклюзивному контенту.
      </p>

      <p className="text-lg leading-relaxed mt-4 font-semibold">Настройка стоимости:</p>
      <p className="text-lg leading-relaxed mt-2">
        В поле <strong>Fan Club Cost</strong> установите ежемесячную стоимость подписки в токенах.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Настройки приватных шоу (Private Show Settings)</h3>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 4.jpg"
          alt="Настройки Settings & Privacy часть 2"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        В этом разделе вы можете:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>
          <strong>Разрешить / Запретить приватные шоу</strong> — переключатель для включения или отключения приватных трансляций
        </li>
        <li>
          <strong>Установить цену за минуту</strong> — поле <strong>Private Show Tokens Per Minute</strong>. Рекомендуемая цена: 12-18 токенов в минуту
        </li>
        <li>
          <strong>Настроить «подглядывания»</strong> — опция <strong>Spy on Private Show</strong> разрешает другим пользователям смотреть приват за токены. Установите цену подглядок (обычно ниже цены привата)
        </li>
        <li>
          <strong>Premium Private Shows</strong> — премиум-приваты с повышенной ценой, обычно включают более откровенный контент
        </li>
      </ul>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важно</h4>
        <p className="text-base leading-relaxed">
          В настройках приватов проверьте корректность цен перед каждым стримом. Слишком высокая цена отпугнёт пользователей, слишком низкая — уменьшит ваш доход. Оптимальная цена — 12-18 токенов/минута для обычного привата и 24-30 токенов/минута для премиум-привата.
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Совет</h4>
        <p className="text-base leading-relaxed">
          Не забывайте включать «подглядывания» (Spy on Private Show) — это дополнительный пассивный доход. Пользователи могут смотреть приват, не участвуя в нём напрямую, за меньшую плату.
        </p>
      </div>
    </ArticlePage>
  );
}