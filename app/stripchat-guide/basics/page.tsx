import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Основы Stripchat",
  description: "Основное меню стрима, режим подглядок, типы зрителей и настройки",
};

export default function Page() {
  return (
    <ArticlePage title="Основы" description="Основное меню стрима, режим подглядок, типы зрителей и настройки">
      <h2 className="text-2xl font-bold mb-6">Основное меню вашего стрима</h2>

      <p className="text-lg leading-relaxed">
        Здесь вы можете увидеть и управлять основными параметрами трансляции:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Main Menu.png"
          alt="Основное меню Stripchat"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-6">
        <li>включение режима подглядок;</li>
        <li>количество зрителей онлайн;</li>
        <li>типы зрителей;</li>
        <li>статус стрима (онлайн/оффлайн);</li>
        <li>качество трансляции;</li>
        <li>тикет-шоу;</li>
        <li>настройки OBS.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Режим подглядок (Spy Mode)</h3>

      <p className="text-lg leading-relaxed font-semibold">
        Что это такое?
      </p>

      <p className="text-lg leading-relaxed mt-4">
        Подглядки (Spy Mode) включаются, когда у вас запущен приват на одной из площадок. Режим нужен, чтобы обычные пользователи не могли бесплатно смотреть обнажённую модель во время приватного шоу.
      </p>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Как включить?
      </p>

      <p className="text-lg leading-relaxed mt-4">
        На главном экране под кнопкой «Вернуться к трансляции через браузер» находится кнопка «Режим подглядывания».
        Нажмите на неё → выберите цену → нажмите «Включить подглядки».
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Spy mode.png"
          alt="Настройка режима подглядок"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Количество и типы зрителей</h3>

      <p className="text-lg leading-relaxed">
        Очень важно постоянно следить, сколько людей находится на вашем стриме и кто именно сидит.
      </p>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Где смотреть?
      </p>

      <p className="text-lg leading-relaxed mt-4">
        В левой части сайта находится панель «Пользователи». Здесь отображается список всех зрителей. При нажатии на пользователя можно посмотреть подробную информацию о нём.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Users.png"
          alt="Панель пользователей"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важное правило:</h4>
        <p className="text-base leading-relaxed">
          Обычным серым пользователям не пишем. Пишем только цветным пользователям:
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <Image
              src="/stripchat-screens/Red user.png"
              alt="Красный пользователь"
              width={120}
              height={80}
              className="rounded-lg border border-border/50"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-red-500">Красный</p>
            <p className="text-base">Самый богатый тип. Обычно тратит больше всех денег.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <Image
              src="/stripchat-screens/Gold user.png"
              alt="Золотой пользователь"
              width={120}
              height={80}
              className="rounded-lg border border-border/50"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-500">Золотой (жёлтый)</p>
            <p className="text-base">Тоже очень хороший пользователь, чуть слабее красного.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <Image
              src="/stripchat-screens/Purple user.png"
              alt="Фиолетовый пользователь"
              width={120}
              height={80}
              className="rounded-lg border border-border/50"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-500">Фиолетовый</p>
            <p className="text-base">Средний по платежеспособности.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <p className="text-lg font-semibold text-cyan-500">Голубой</p>
            <p className="text-base">Ниже среднего.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <Image
              src="/stripchat-screens/Silver user.png"
              alt="Серебряный пользователь"
              width={120}
              height={80}
              className="rounded-lg border border-border/50"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-400">Серебряный</p>
            <p className="text-base">Бедный тип пользователя.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-32">
            <Image
              src="/stripchat-screens/Bronze user.png"
              alt="Бронзовый пользователь"
              width={120}
              height={80}
              className="rounded-lg border border-border/50"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-orange-700">Бронзовый</p>
            <p className="text-base">Самый слабый тип.</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Статус и качество стрима</h3>

      <p className="text-lg leading-relaxed">
        Слева в интерфейсе видно:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Status stream.png"
          alt="Статус и качество стрима"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-6">
        <li><strong>Онлайн / Оффлайн</strong> — запущен ли сейчас стрим.</li>
        <li><strong>Качество стрима</strong> (обычно 3 варианта):</li>
      </ul>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-2 text-left">Качество</th>
              <th className="border border-border px-4 py-2 text-left">Что значит</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2">Плохое</td>
              <td className="border border-border px-4 py-2">Нет звука или очень низкий битрейт (картинка плохая)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Неважное</td>
              <td className="border border-border px-4 py-2">Звук тихий, картинка размытая («как в Майнкрафте»)</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2">Отличное</td>
              <td className="border border-border px-4 py-2">Всё идеально: хорошая картинка и звук</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">4. Тикет-шоу (Ticket show)</h3>

      <p className="text-lg leading-relaxed">
        Тикет-шоу (шоу по билетам) — отличный способ дополнительно заработать в конце стрима.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/stripchat-screens/Ticket show.png"
          alt="Настройка тикет-шоу"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Рекомендации по настройке:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Ставьте максимальное время на покупку билета — <strong>15 минут</strong>.</li>
        <li>Цена — от <strong>44 токенов и выше</strong>.</li>
      </ul>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Название должно быть максимально интригующим и возбуждающим:
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Примеры хороших названий:</h4>
        <ul className="space-y-2 text-base">
          <li>• «Доведу себя до сквирта и громкого оргазма»</li>
          <li>• «Увидишь, как сильно кончает моя киска»</li>
          <li>• «Мокрое сквирт-шоу с игрушками»</li>
          <li>• «Анал с кремпаем на лицо» (для пары)</li>
          <li>• «Секретное шоу только для вас — без цензуры»</li>
          <li>• «Двойная penetration до дрожи в ногах»</li>
        </ul>
      </div>
    </ArticlePage>
  );
}
