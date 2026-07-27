import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

const subsections = [
  {
    href: "/skyprivate-guide/download",
    title: "Загрузка и установка",
    desc: "Скачивание плагина с официального сайта, процесс установки и первичный запуск.",
  },
  {
    href: "/skyprivate-guide/setup",
    title: "Первичная настройка",
    desc: "Ввод учётных данных, базовые параметры подключения и сохранение изменений.",
  },
  {
    href: "/skyprivate-guide/testing",
    title: "Тестирование и проверка",
    desc: "Тестовое подключение к сервису и проверка корректности работы основных функций.",
  },
  {
    href: "/skyprivate-guide/troubleshooting",
    title: "Ошибки и рекомендации",
    desc: "Частые ошибки, способы их избежать, полезные советы и итоговый чек-лист.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по SkyPrivate" description="Установка, настройка и проверка плагина SkyPrivate">
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