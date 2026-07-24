import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по BongaCams",
  description: "Полное руководство по работе с платформой BongaCams",
};

const subsections = [
  {
    href: "/bongacams-guide/broadcast",
    title: "Запуск трансляции",
    desc: "Главная страница, Dashboard, CamScore, кнопка Broadcast Yourself и получение RTMP-данных для стрима.",
  },
  {
    href: "/bongacams-guide/apps-chatbots",
    title: "Приложения и чат-боты",
    desc: "Обзор APPS & CHATBOTS: Tip Menu, Countdown, Wheel of Fortune и Fan Boost Bot.",
  },
  {
    href: "/bongacams-guide/tip-menu",
    title: "Платные действия (Tip Menu)",
    desc: "Создание прайс-листа услуг. Правило согласования с моделью, цены, сохранение настроек.",
  },
  {
    href: "/bongacams-guide/countdown",
    title: "Работа с целями (Countdown)",
    desc: "Правила постановки целей: от дешёвой к дорогой, стартовые цели, выполнение и переключение.",
  },
  {
    href: "/bongacams-guide/settings-security",
    title: "Настройки безопасности",
    desc: "DMCA-защита контента и GEO Block для России, Беларуси и Украины. Обязательная проверка перед стримом.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по BongaCams" description="Полное руководство по платформе BongaCams">
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