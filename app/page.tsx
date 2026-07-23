import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  return (
    <div className="py-4 md:py-6">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          Husk'd Lab Manuals
        </h1>
        <p className="mt-2 text-base text-text-secondary">
          Справочник оператора — база знаний, гайды и инструкции для работы
        </p>
      </section>

      {/* Category cards */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard
          title="Начало работы"
          icon="house"
          description="Вход в аккаунты, гайды по платформам, словарь терминов, правила переговоров"
          href="/account-login"
        >
          <ul className="space-y-1">
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/chaturbate-guide" className="hover:text-accent transition-colors">Гайд по Chaturbate</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/stripchat-guide" className="hover:text-accent transition-colors">Гайд по Stripchat</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/bongacams-guide" className="hover:text-accent transition-colors">Гайд по BongaCams</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/obs-guide" className="hover:text-accent transition-colors">Гайд по настройке OBS</Link>
            </li>
          </ul>
        </CategoryCard>

        <CategoryCard
          title="Середина работы"
          icon="antenna"
          description="Техники ведения стрима, скрипты общения, цели, рулетки и фишки"
          href="/broadcasting/first-20-seconds"
        >
          <ul className="space-y-1">
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/broadcasting/first-20-seconds" className="hover:text-accent transition-colors">Первые 20 секунд</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/broadcasting/goals" className="hover:text-accent transition-colors">Цели (goals)</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/scripts-and-dialogues/general-script" className="hover:text-accent transition-colors">Скрипты общения</Link>
            </li>
          </ul>
        </CategoryCard>

        <CategoryCard
          title="Профессиональный режим"
          icon="shield"
          description="Обработка возражений, ошибки в привате, правила общения, сопровождение"
          href="/situation-handling/objections"
        >
          <ul className="space-y-1">
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/situation-handling/objections" className="hover:text-accent transition-colors">Возражения</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/situation-handling/private-mistakes" className="hover:text-accent transition-colors">Ошибки в привате</Link>
            </li>
            <li className="text-xs text-text-muted flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
              <Link href="/general-rules/dont-be-a-bot" className="hover:text-accent transition-colors">Не быть ботом</Link>
            </li>
          </ul>
        </CategoryCard>
      </section>

      {/* Quick links */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-text-muted">
          Быстрые ссылки
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Словарь терминов", href: "/getting-started/dictionary" },
            { label: "Правила сайтов", href: "/getting-started/site-rules" },
            { label: "Правила переговоров", href: "/getting-started/negotiation-rules" },
            { label: "Гайд по Lovense", href: "/lovense-guide" },
            { label: "Гайд по OBS", href: "/obs-guide" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
