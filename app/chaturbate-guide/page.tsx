import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по Chaturbate",
  description: "Полное руководство по работе с платформой Chaturbate",
};

const subsections = [
  {
    href: "/chaturbate-guide/broadcast",
    title: "Запуск и подготовка",
    desc: "Подготовка к стриму, использование ShineBrowser, кнопка Broadcast и вход в панель управления.",
  },
  {
    href: "/chaturbate-guide/panel",
    title: "Панель управления",
    desc: "Обзор всех инструментов: Broadcast yourself, Goals, Apps, Games, Bio, Share, Memberships, PM, лайки и дизлайки.",
  },
  {
    href: "/chaturbate-guide/announcements",
    title: "Рассылка (Announcements)",
    desc: "Отправка уведомлений подписчикам о начале стрима. Правила модерации фото, алгоритм отправки.",
  },
  {
    href: "/chaturbate-guide/token-stats",
    title: "Статистика токенов (Token Stats)",
    desc: "Финансовая аналитика: общий баланс, последние донаты, топ-донатеры, история платежей.",
  },
  {
    href: "/chaturbate-guide/apps",
    title: "Приложения (APPS)",
    desc: "Настройка Dream Goals, The Menu (прайс-лист) и Baboon's Hidden Show (подглядки).",
  },
  {
    href: "/chaturbate-guide/settings-privacy",
    title: "Settings & Privacy",
    desc: "Геоблокировка, Fan Club, настройки приватных шоу и Spy-режима.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по Chaturbate" description="Разбор функционала — полное руководство по платформе">
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