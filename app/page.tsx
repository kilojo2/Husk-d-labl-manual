import Link from "next/link";
import { navigationSections } from "@/lib/navigation";
import SFSymbol from "@/components/SFSymbol";

const sectionColorMap: Record<number, { gradient: string; border: string; glow: string; class: string }> = {
  0: {
    gradient: "from-amber-700/20 to-amber-600/5",
    border: "border-amber-700/20",
    glow: "shadow-amber-700/10",
    class: "nav-bronze",
  },
  1: {
    gradient: "from-slate-500/20 to-slate-400/5",
    border: "border-slate-500/20",
    glow: "shadow-slate-500/10",
    class: "nav-silver",
  },
  2: {
    gradient: "from-yellow-600/20 to-yellow-500/5",
    border: "border-yellow-600/20",
    glow: "shadow-yellow-600/10",
    class: "nav-gold",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12 sm:px-6 lg:px-8">
      {/* ─── Hero Section ─── */}
      <div className="text-center mb-16 sm:mb-20">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-b from-text-primary via-text-primary to-text-secondary bg-clip-text text-transparent select-none">
          DJIBUR WORKTEAM
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-text-secondary font-medium">
          База знаний оператора вебкам-моделей
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-muted text-accent">
            <SFSymbol name="book.closed.fill" size={12} />
            Документация
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-muted text-accent">
            <SFSymbol name="sparkles" size={12} />
            Гайды
          </span>
        </div>
      </div>

      {/* ─── Category Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {navigationSections.map((section, idx) => {
          const colors = sectionColorMap[idx] ?? sectionColorMap[0];
          return (
            <div
              key={section.title}
              className={`${colors.class} relative group apple-card rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-muted to-transparent">
                  <SFSymbol name={section.icon} size={20} className="text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-text-primary">{section.title}</h2>
              </div>

              {/* Links */}
              <ul className="space-y-1.5 flex-1">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover transition-all duration-200 group/link"
                    >
                      <SFSymbol
                        name={item.icon}
                        size={14}
                        className="text-text-muted group-hover/link:text-accent transition-colors duration-200"
                      />
                      <span className="truncate">{item.title}</span>
                      {item.children && item.children.length > 0 && (
                        <span className="ml-auto text-xs text-text-muted">
                          {item.children.length}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bottom accent bar */}
              <div className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${colors.gradient}`} />
            </div>
          );
        })}
      </div>

      {/* ─── Footer hint ─── */}
      <p className="mt-12 text-sm text-text-muted text-center">
        Выберите раздел для быстрого перехода к документации
      </p>
    </div>
  );
}