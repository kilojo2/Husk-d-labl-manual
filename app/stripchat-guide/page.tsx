import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по Stripchat",
  description: "Полное руководство по работе с платформой Stripchat",
};

const subsections = [
  {
    href: "/stripchat-guide/basics",
    title: "Основы",
    desc: "Создание и верификация аккаунта, настройки профиля, StripBrowser, статусы и Spy-режим.",
  },
  {
    href: "/stripchat-guide/newsletter",
    title: "Рассылка (Newsletter)",
    desc: "Отправка платных и бесплатных уведомлений подписчикам о начале стрима.",
  },
  {
    href: "/stripchat-guide/my-data",
    title: "Мои данные",
    desc: "Раздел My Data: загрузка фото, видео, альбомов. Этичный взлом цен — открыть фото за токены.",
  },
  {
    href: "/stripchat-guide/show-settings",
    title: "Настройки шоу",
    desc: "Платные действия (Tip Menu), цели (Goals), рулетки (Wheel of Fortune), настройки приватного шоу.",
  },
  {
    href: "/stripchat-guide/feed",
    title: "Лента (Feed)",
    desc: "Публикация постов: фото, видео, промо-сообщения. Разница между DRAG & DROP и ATTACH FILES.",
  },
  {
    href: "/stripchat-guide/extensions",
    title: "Расширения",
    desc: "Обзор расширений: Lovense, OhMiBod, Kiiroo. Настройка синхронизации игрушек с токенами.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по Stripchat" description="Разбор функционала — полное руководство по платформе">
      <h2 className="text-2xl font-bold mb-6">Содержание</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {subsections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-2xl border border-border/50 bg-bg-card p-5 transition-all duration-200 hover:border-[#4DA6FF]/40 hover:bg-[rgba(77,166,255,0.04)] hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-[#4DA6FF] transition-colors">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              {s.desc}
            </p>
          </Link>
        ))}
      </div>
    </ArticlePage>
  );
}