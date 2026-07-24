import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Панель управления — Chaturbate",
  description: "Обзор панели управления трансляцией на Chaturbate",
};

export default function Page() {
  return (
    <ArticlePage title="Панель управления" description="Обзор панели управления трансляцией на Chaturbate">
      <h2 className="text-2xl font-bold mb-6">Обзор панели управления</h2>

      <p className="text-lg leading-relaxed">
        После нажатия кнопки <strong>Broadcast</strong> вы попадёте в панель управления трансляцией. Здесь доступны все основные инструменты для ведения стрима.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/chaturbate-screens/Screen 1.jpg"
          alt="Панель управления трансляцией Chaturbate"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Основные элементы панели</h3>

      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Broadcast yourself</strong> — получение RTMP-адреса и ключа трансляции для OBS</li>
        <li><strong>Announce you're online</strong> — рассылка уведомлений подписчикам</li>
        <li><strong>Token Stats</strong> — статистика токенов и донатов</li>
        <li><strong>Goals (цели)</strong> — настройка и управление целями трансляции</li>
        <li><strong>Apps</strong> — установка и настройка приложений</li>
        <li><strong>Games</strong> — интерактивные игры для зрителей</li>
        <li><strong>Bio</strong> — редактирование информации о модели</li>
        <li><strong>Settings & Privacy</strong> — настройки приватности и шоу</li>
        <li><strong>Content Stats</strong> — статистика контента</li>
        <li><strong>Share</strong> — публикация ссылок на трансляцию</li>
        <li><strong>Memberships</strong> — управление подписками</li>
        <li><strong>PM</strong> — приватные сообщения от зрителей</li>
        <li><strong>Количество зрителей</strong> — счётчик онлайн-пользователей</li>
        <li><strong>Лайки / Дизлайки</strong> — статистика оценок</li>
      </ul>
    </ArticlePage>
  );
}