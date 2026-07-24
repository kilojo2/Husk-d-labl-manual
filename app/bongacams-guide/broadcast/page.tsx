import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Запуск трансляции — BongaCams",
  description: "Главная страница, Dashboard и запуск трансляции на BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Запуск трансляции" description="Главная страница, Dashboard и запуск трансляции на BongaCams">
      <h2 className="text-2xl font-bold mb-6">Главная страница и запуск трансляции</h2>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Dashboard (Главная панель)</h3>

      <p className="text-lg leading-relaxed">
        При открытии сайта BongaCams отображается главная панель (<strong>Dashboard</strong>) со статистикой модели.
      </p>

      <p className="text-lg leading-relaxed mt-4">На Dashboard отображаются:</p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>CamScore</strong> — рейтинг модели на платформе (чем выше, тем лучше позиции в поиске)</li>
        <li><strong>Текущие позиции в рейтингах</strong> — место модели среди всех вещающих</li>
        <li><strong>Заработок</strong> — статистика дохода за период</li>
      </ul>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Screenshot_1.png"
          alt="Главная панель Dashboard BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Кнопка «Broadcast Yourself»</h3>

      <p className="text-lg leading-relaxed">
        Для перехода к настройкам трансляции используется <strong>зелёная кнопка «Broadcast Yourself»</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Broadcast yourself.png"
          alt="Кнопка Broadcast Yourself на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <p className="text-lg leading-relaxed mt-6">
        В разделе <strong>Broadcast Yourself</strong> можно:
      </p>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Получить <strong>токен и ссылку для стрима</strong> (RTMP-адрес и ключ для OBS)</li>
        <li>Установить <strong>цену на приват</strong></li>
        <li>Выбрать <strong>камеру и микрофон</strong></li>
        <li>Управлять <strong>чат-ботами</strong></li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Совет</h4>
        <p className="text-base leading-relaxed">
          Перед каждым стримом проверяйте CamScore — это главный показатель здоровья аккаунта. Падение рейтинга влияет на видимость модели в поиске и каталогах.
        </p>
      </div>
    </ArticlePage>
  );
}