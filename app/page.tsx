import Link from "next/link";
import { navigationSections } from "@/lib/navigation";
import SFSymbol from "@/components/SFSymbol";
import ContinueLearning from "@/components/ContinueLearning";

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-[1400px] mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* ── Hero — compact ── */}
      <div className="text-center mb-10 sm:mb-12 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-b from-text-primary via-text-primary to-text-secondary bg-clip-text text-transparent select-none">
          KILLASNAZZ Manuals
        </h1>
        <p className="mt-3 text-base sm:text-lg text-text-secondary font-medium">
          База знаний для операторов
        </p>
      </div>

      {/* ── Search bar (prominent) ── */}
      <div className="w-full max-w-[600px] mb-12 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl apple-glass apple-shadow-md cursor-text
                        hover:border-accent/30 transition-all duration-300 group">
          <svg className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="flex-1 text-sm text-text-muted">Поиск по справочнику...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-bg-surface-hover text-[11px] font-medium text-text-muted border border-border">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* ── Популярное ── */}
      <div className="w-full max-w-[700px] mb-10 text-center animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted/60 mb-4">Популярное</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { title: "Chaturbate", href: "/chaturbate-guide" },
            { title: "Stripchat", href: "/stripchat-guide" },
            { title: "BongaCams", href: "/bongacams-guide" },
            { title: "OBS", href: "/obs-guide" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center px-4 py-2.5 rounded-full border border-border/50 bg-bg-surface/50
                         text-sm font-medium text-text-secondary hover:text-text-primary hover:border-accent/30
                         hover:bg-accent/5 transition-all duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Continue Learning ── */}
      <div className="w-full max-w-[600px] mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <ContinueLearning />
      </div>

      {/* ── Category Cards — compact ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[900px] animate-fade-in-up" style={{ animationDelay: "250ms" }}>
        {navigationSections.map((section, idx) => (
          <Link
            key={section.title}
            href={section.items[0]?.href || "/"}
            className="group relative apple-card rounded-2xl p-5 flex flex-col transition-all duration-300
                       hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/10">
                <SFSymbol name={section.icon} size={18} className="text-accent" />
              </div>
              <h2 className="text-base font-semibold text-text-primary">{section.title}</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-3 flex-1">
              {idx === 0 && "Начни здесь, если ты новичок"}
              {idx === 1 && "Продвинутые техники и скрипты"}
              {idx === 2 && "Стань профи в своём деле"}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted/60">{section.items.length} материалов</span>
              <span className="text-sm text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                Открыть →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}