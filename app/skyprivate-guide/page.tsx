import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

const subsections = [
  {
    href: "/skyprivate-guide/download",
    title: "Загрузка и установка",
    desc: "Что такое SkyPrivate, скачивание плагина с официального сайта и пошаговая установка на компьютер.",
  },
  {
    href: "/skyprivate-guide/setup",
    title: "Первичная настройка",
    desc: "Ввод учётных данных, настройка параметров подключения и сохранение изменений.",
  },
  {
    href: "/skyprivate-guide/testing",
    title: "Тестирование и проверка",
    desc: "Проверка корректной работы плагина, тестовое подключение и контроль основных функций.",
  },
  {
    href: "/skyprivate-guide/troubleshooting",
    title: "Возможные ошибки и итоги",
    desc: "Частые ошибки, рекомендации по их исправлению и заключение после завершения настройки.",
  },
];

export default function Page() {
  return (
    <ArticlePage title="Гайд по SkyPrivate" description="Плагин · Первичная настройка · Проверка работоспособности">
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