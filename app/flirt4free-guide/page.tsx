import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Гайд по Flirt4Free",
  description: "Полное руководство по работе с платформой Flirt4Free",
};

const subsections = [
  {
    href: "/flirt4free-guide/interface",
    title: "Интерфейс Performer App",
    desc: "Пять зон рабочего экрана: панель кнопок, превью видео, чат, зрители, статистика. Статусы Offline и Online, первый вход.",
  },
  {
    href: "/flirt4free-guide/obs-setup",
    title: "Подключение OBS",
    desc: "Получение Server URL и Stream Key через Setup → Broadcast Info. Настройки видео 1920×1080, 30 FPS, 10000 kbps. Порядок запуска и мультистриминг.",
  },
  {
    href: "/flirt4free-guide/control-buttons",
    title: "Кнопки управления",
    desc: "Start Chat, Break, Fake, Change Rate, Start Group, Start Party, Show Offers, Alert Monitor, Games — все 9 кнопок верхней панели.",
  },
  {
    href: "/flirt4free-guide/show-types",
    title: "Типы шоу",
    desc: "Free Chat (чаевые), Private/VIP (поминутно, Voyeur), Group Show (общая цель), Party Show (билеты). Стратегия комбинирования.",
  },
  {
    href: "/flirt4free-guide/user-types",
    title: "Типы юзеров",
    desc: "Guest (только смотреть), Member (чат и кредиты), Levels (уровни по тратам). Стратегия взаимодействия с каждой категорией.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по Flirt4Free" description="Мануал оператора — полное руководство по платформе">
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