import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по BongaCams",
  description: "Полное руководство по работе с платформой BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Гайд по BongaCams" description="Полное руководство по работе с платформой BongaCams">
      <p className="text-lg leading-relaxed">
        При открытии сайта вы попадаете на главную страницу. На ней вы увидите:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Screenshot_1.png"
          alt="Главная страница BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        Зелёную кнопку <strong>«Broadcast Yourself»</strong> — при нажатии на неё вас перенаправит в настройки трансляции.
      </p>

      <p className="text-lg leading-relaxed mt-4">
        Здесь вы получаете токен и ссылку для стрима, устанавливаете цену на приват, выбираете камеру и микрофон, а также можете включать/выключать чат-ботов.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-6">Apps & Chatbots (Приложения и Чат-боты)</h2>

      <p className="text-lg leading-relaxed">
        В этом разделе находятся полезные помощники для стрима:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Apps&Chatbots.png"
          alt="Раздел Apps & Chatbots"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-6">
        <li>Tip Menu</li>
        <li>Countdown</li>
        <li>Wheel of Fortune</li>
        <li>Fan Boost Bot</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Tip Menu (Платные действия)</h3>

      <p className="text-lg leading-relaxed">
        Здесь вы создаёте список платных действий для модели.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Tip Menu.png"
          alt="Настройка Tip Menu"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Важно!</h4>
        <p className="text-base leading-relaxed">
          Обязательно заранее согласуйте с моделью все действия из списка. Если модель не выполнит действие, за которое ей задонатили, на вас могут подать жалобу. Это сильно портит рейтинг модели.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Countdown («Цель»)</h3>

      <p className="text-lg leading-relaxed">
        Цель — один из самых важных элементов стрима. Про неё нельзя забывать.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Countdown.png"
          alt="Настройка Countdown"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Как правильно работать с целями:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Всегда расставляйте цели от самой дешёвой к самой дорогой.</li>
        <li>В самом начале стрима сразу ставьте самую низкую цель (10–15 токенов).</li>
        <li>После выполнения цели сразу меняйте её на следующую (более дорогую).</li>
        <li>Чем больше целей вы выполняете за стрим — тем выше растёт стрипскор модели.</li>
      </ul>

      <p className="text-lg leading-relaxed mt-6 font-semibold">
        Примеры начальных целей:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Lick my lips</li>
        <li>Show feet</li>
        <li>Blow a kiss</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-6">Settings (Настройки)</h2>

      <p className="text-lg leading-relaxed">
        Перед началом каждого стрима обязательно выполните два важных действия:
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Settings.png"
          alt="Раздел Settings"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-2 text-lg ml-4 mt-6">
        <li>Включите защиту DMCA.</li>
        <li>Поставьте региональную блокировку на 3 страны: Россия, Украина, Беларусь.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-10 mb-4">Включение DMCA</h3>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/DMCA.png"
          alt="Настройка DMCA"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-2 text-lg ml-4 mt-6">
        <li>В правом верхнем углу найдите ползунок «OFF» и переключите его на «ON».</li>
        <li>Выберите иконку DMCA (желательно маленькую, например, вариант №4).</li>
        <li>Внизу нажмите кнопку «Update Settings» (или «Применить изменения»).</li>
      </ol>

      <h3 className="text-xl font-semibold mt-10 mb-4">Региональная блокировка (GEO Block)</h3>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/GEO Block.png"
          alt="Настройка GEO Block"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-2 text-lg ml-4 mt-6">
        <li>Заблокируйте страны: Россия, Беларусь, Украина.</li>
        <li>Нажмите «Update Settings» / «Применить изменения».</li>
        <li>В левом верхнем углу переключите ползунок в положение ON (включить блокировку).</li>
      </ol>
    </ArticlePage>
  );
}
