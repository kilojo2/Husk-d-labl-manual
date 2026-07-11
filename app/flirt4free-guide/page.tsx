import ArticlePage from '@/components/ArticlePage';
import Image from 'next/image';

export const metadata = {
  title: 'Гайд по Flirt4Free',
  description: 'Мануал оператора Flirt4Free: интерфейс Performer App, подключение OBS, типы шоу и юзеров',
};

export default function Page() {
  return (
    <ArticlePage title="Гайд по Flirt4Free" description="Мануал оператора: интерфейс, OBS, шоу, юзеры">
      <h2>1. Интерфейс Performer App</h2>
      <p>
        Рабочий экран разделён на пять зон. Разберём каждую.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/flirt4free-screens/Flirt1.png"
          alt="Интерфейс Performer App"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <table className="w-full border-collapse my-6">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-4">Зона</th>
            <th className="text-left py-2 px-4">Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4">1. Панель кнопок (верх)</td>
            <td className="py-2 px-4">Start Chat, Break, Fake, Rate, Group, Party, Show Offers, Alert Monitor, Games.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4">2. Превью видео (лево)</td>
            <td className="py-2 px-4">Трансляция. При External Broadcaster — логотип F4F до старта OBS.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4">3. Чат (центр)</td>
            <td className="py-2 px-4">Все сообщения юзеров и системные уведомления.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4">4. Зрители (право)</td>
            <td className="py-2 px-4">#Users — количество и список зрителей в чате.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4">5. Статистика (низ-лево)</td>
            <td className="py-2 px-4">Time Online, Credits, Tips, Number of Shows, Max Customers.</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse my-6">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-4">Статус</th>
            <th className="text-left py-2 px-4">Что значит</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Offline</td>
            <td className="py-2 px-4">Не в эфире. Зрители не видят стрим.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Online</td>
            <td className="py-2 px-4">Эфир идёт. Зрители подключены.</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
        <p className="font-bold mb-2">⚠️ Важно при первом входе</p>
        <p>
          После логина система напишет: «You must now press the Start Chat button to start a chat session.»
        </p>
        <p className="mt-2">
          Нажми <strong>Start Chat</strong>, чтобы выйти в эфир.
        </p>
      </div>

      <h2>2. Подключение OBS к Flirt4Free</h2>
      
      <h3>Setup → Broadcast Info</h3>
      <p>
        В Performer App: меню <strong>Setup → Broadcast Info</strong>. Скопируй <strong>Server URL</strong> и <strong>Stream Key</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/flirt4free-screens/Flirt2.png"
          alt="Setup → Broadcast Info в Performer App"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <h3>OBS: Настройки → Вещание</h3>
      <ul className="list-disc pl-6 my-4 space-y-2">
        <li>Service: <strong>Custom</strong></li>
        <li>Вставь <strong>Server URL</strong> и <strong>Stream Key</strong></li>
        <li>Нажми «Применить»</li>
      </ul>

      <h3>OBS: Видео</h3>
      <ul className="list-disc pl-6 my-4 space-y-2">
        <li>Resolution: <strong>1920×1080</strong></li>
        <li>FPS: <strong>30</strong></li>
        <li>Bitrate: <strong>10000 kbps</strong></li>
      </ul>

      <h3>Начать стрим → Start Chat</h3>
      <ol className="list-decimal pl-6 my-4 space-y-2">
        <li>Жми <strong>Start Streaming</strong> в OBS</li>
        <li>Подожди 5–10 секунд</li>
        <li>Нажми <strong>Start Chat</strong> в Performer App</li>
      </ol>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
        <p className="font-bold mb-2">ℹ️ Multiple Output (плагин)</p>
        <p>
          Если стримишь одновременно на несколько площадок — настрой плагин множественного вывода в разделе «Настройки → Вещание» и добавь нужные цели (BongaCams, Chaturbate, Stripchat и т.д.).
        </p>
      </div>

      <h2>3. Кнопки управления</h2>
      <p>
        Все кнопки верхней панели Performer App и их назначение.
      </p>

      <table className="w-full border-collapse my-6">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-4">Кнопка</th>
            <th className="text-left py-2 px-4">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Start Chat</td>
            <td className="py-2 px-4">Запускает сессию. Нажми после старта OBS. Статус → Online.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Start Break</td>
            <td className="py-2 px-4">Перерыв — зрители видят заставку. Нажми перед паузой.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Start Fake</td>
            <td className="py-2 px-4">Трансляция записанного видео вместо живого потока.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Change Rate</td>
            <td className="py-2 px-4">Смена цены в кредитах за минуту Private шоу.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Start Group</td>
            <td className="py-2 px-4">Group Show — юзеры скидываются для совместного шоу.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Start Party</td>
            <td className="py-2 px-4">Party Show — платное шоу с объявленной ценой входа.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Show Offers</td>
            <td className="py-2 px-4">Специальные предложения и акции для зрителей.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Alert Monitor</td>
            <td className="py-2 px-4">Уведомления о VIP-юзерах и крупных типах.</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 px-4 font-semibold">Games</td>
            <td className="py-2 px-4">Интерактивные игры с аудиторией.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Типы шоу</h2>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">ОСНОВНОЙ РЕЖИМ</h3>
          <p className="text-2xl font-bold text-primary mb-4">Free Chat</p>
          <ul className="space-y-2">
            <li>✓ Все смотрят бесплатно</li>
            <li>✓ Доход: чаевые (Tips) от юзеров</li>
            <li>✓ Здесь происходит большинство общения</li>
            <li>✓ Используй Show Offers для продажи Private</li>
          </ul>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">СОВМЕСТНОЕ ШОУ</h3>
          <p className="text-2xl font-bold text-primary mb-4">Group Show</p>
          <ul className="space-y-2">
            <li>✓ Юзеры скидываются кредитами (Goal)</li>
            <li>✓ Шоу стартует при достижении цели</li>
            <li>✓ Хорошо при большой аудитории</li>
            <li>✓ Кнопка: <strong>Start Group</strong></li>
          </ul>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">ОДИН НА ОДИН</h3>
          <p className="text-2xl font-bold text-primary mb-4">Private / VIP</p>
          <ul className="space-y-2">
            <li>✓ Один юзер платит за минуту (Rate)</li>
            <li>✓ Другие могут подглядывать — Voyeur</li>
            <li>✓ Самый высокий доход за единицу времени</li>
            <li>✓ Free Chat недоступен во время Private</li>
          </ul>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">ПЛАТНЫЙ ВХОД</h3>
          <p className="text-2xl font-bold text-primary mb-4">Party Show</p>
          <ul className="space-y-2">
            <li>✓ Шоу с ценой входа (билет)</li>
            <li>✓ Контент объявляется заранее</li>
            <li>✓ Привлекает лояльных фанатов</li>
            <li>✓ Кнопка: <strong>Start Party</strong></li>
          </ul>
        </div>
      </div>

      <h2>5. Типы юзеров</h2>
      <p>
        Кто смотрит эфир и чего от них ждать.
      </p>

      <div className="space-y-4 my-6">
        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">НЕЗАРЕГ. <span className="text-muted-foreground">Guest</span></h3>
          <p className="mb-4">
            Не зарегистрирован. Может только смотреть. Не может писать в чат и тратить кредиты.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3">
            <p className="font-bold text-sm mb-1">ℹ️ Совет</p>
            <p className="text-sm">Привлечь к регистрации — попроси написать в чат.</p>
          </div>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">БАЗОВЫЙ <span className="text-muted-foreground">Member</span></h3>
          <p className="mb-4">
            Зарегистрированный юзер. Может писать в чат, покупать кредиты и участвовать в шоу.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3">
            <p className="font-bold text-sm mb-1">ℹ️ Совет</p>
            <p className="text-sm">Большинство аудитории. Поощряй типы и участие.</p>
          </div>
        </div>

        <div className="bg-background rounded-lg p-6 border border-border">
          <h3 className="text-xl font-bold mb-2">LEVELS <span className="text-muted-foreground">Уровни</span></h3>
          <p className="mb-4">
            У каждого юзера есть свой уровень: чем он выше, тем больше юзер потратил и может потратить.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3">
            <p className="font-bold text-sm mb-1">ℹ️ Совет</p>
            <p className="text-sm">Активно взаимодействуй с юзерами высоких уровней — они вкладываются больше остальных.</p>
          </div>
        </div>
      </div>
    </ArticlePage>
  );
}
