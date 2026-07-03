"use client";

import { useState, useEffect, useCallback } from "react";

interface DailyStat {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
}

interface PageStat {
  pagePath: string;
  pageTitle: string;
  views: number;
}

interface RealtimeStat {
  todayVisits: number;
  todayUnique: number;
  todayPageViews: number;
}

interface Totals {
  allTimeVisits: number;
  allTimePageViews: number;
}

interface RecentVisit {
  pagePath: string;
  pageTitle: string;
  referrer: string;
  date: string;
  time: string;
  userAgent: string;
}

interface StatsData {
  daily: DailyStat[];
  pages: PageStat[];
  realtime: RealtimeStat;
  totals: Totals;
  recent: RecentVisit[];
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401 || res.status === 403) {
        setError("Неверный токен доступа");
        setAuthenticated(false);
        return;
      }
      if (!res.ok) {
        setError(`Ошибка ${res.status}`);
        return;
      }
      const json: StatsData = await res.json();
      setData(json);
      setAuthenticated(true);
    } catch (err) {
      setError("Не удалось загрузить статистику");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(token);
  };

  // Auto-refresh every 30 seconds when authenticated
  useEffect(() => {
    if (!authenticated || !token) return;
    const interval = setInterval(() => fetchStats(token), 30000);
    return () => clearInterval(interval);
  }, [authenticated, token, fetchStats]);

  // Login screen
  if (!authenticated) {
    return (
      <div className="mx-auto mt-20 max-w-md">
        <div className="apple-card rounded-2xl p-8">
          <h1 className="mb-6 text-center text-2xl font-semibold text-text-primary">
            Статистика посещений
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Токен доступа"
              className="w-full rounded-xl border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Загрузка..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-text-muted">Загрузка...</div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  };

  // Build bar chart data
  const maxVisits = Math.max(...data.daily.map((d) => d.totalVisits), 1);
  const maxViews = Math.max(...data.daily.map((d) => d.pageViews), 1);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">
          Статистика посещений
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Панель управления — данные обновляются каждые 30 секунд
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Сегодня (визиты)"
          value={data.realtime.todayVisits}
          subtitle={`уникальных: ${data.realtime.todayUnique}`}
        />
        <KpiCard
          label="Сегодня (просмотры)"
          value={data.realtime.todayPageViews}
        />
        <KpiCard
          label="Всего визитов"
          value={data.totals.allTimeVisits}
        />
        <KpiCard
          label="Всего просмотров"
          value={data.totals.allTimePageViews}
        />
      </div>

      {/* Daily Chart */}
      <div className="apple-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Визиты по дням
        </h2>
        {data.daily.length === 0 ? (
          <p className="text-sm text-text-muted">Данных пока нет</p>
        ) : (
          <div className="space-y-6">
            {/* Visits bar chart */}
            <div>
              <p className="mb-2 text-xs font-medium text-text-muted">Визиты</p>
              <div className="flex items-end gap-1">
                {[...data.daily].reverse().map((day) => (
                  <div
                    key={day.date}
                    className="group relative flex flex-1 flex-col items-center"
                  >
                    <div className="mb-1 text-[10px] text-text-muted opacity-0 group-hover:opacity-100">
                      {day.totalVisits}
                    </div>
                    <div
                      className="w-full rounded-t bg-accent/70 transition-all hover:bg-accent"
                      style={{
                        height: `${Math.max((day.totalVisits / maxVisits) * 120, 4)}px`,
                      }}
                      title={`${day.date}: ${day.totalVisits} визитов`}
                    />
                    <div className="mt-1 text-[10px] text-text-muted">
                      {formatDate(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page views bar chart */}
            <div>
              <p className="mb-2 text-xs font-medium text-text-muted">Просмотры страниц</p>
              <div className="flex items-end gap-1">
                {[...data.daily].reverse().map((day) => (
                  <div
                    key={`views-${day.date}`}
                    className="group relative flex flex-1 flex-col items-center"
                  >
                    <div className="mb-1 text-[10px] text-text-muted opacity-0 group-hover:opacity-100">
                      {day.pageViews}
                    </div>
                    <div
                      className="w-full rounded-t bg-green-500/60 transition-all hover:bg-green-500"
                      style={{
                        height: `${Math.max((day.pageViews / maxViews) * 120, 4)}px`,
                      }}
                      title={`${day.date}: ${day.pageViews} просмотров`}
                    />
                    <div className="mt-1 text-[10px] text-text-muted">
                      {formatDate(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Pages */}
      <div className="apple-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Популярные страницы
        </h2>
        {data.pages.length === 0 ? (
          <p className="text-sm text-text-muted">Данных пока нет</p>
        ) : (
          <div className="space-y-2">
            {data.pages.map((page, i) => (
              <div
                key={page.pagePath}
                className="flex items-center justify-between rounded-xl bg-bg-surface/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-muted">
                    #{i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {page.pageTitle || page.pagePath}
                    </p>
                    <p className="text-xs text-text-muted">{page.pagePath}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-accent">
                  {page.views}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Visits */}
      <div className="apple-card rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Последние визиты
        </h2>
        {data.recent.length === 0 ? (
          <p className="text-sm text-text-muted">Данных пока нет</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-text-muted">
                  <th className="pb-2 pr-4 font-medium">Время</th>
                  <th className="pb-2 pr-4 font-medium">Страница</th>
                  <th className="pb-2 pr-4 font-medium">Referrer</th>
                  <th className="pb-2 font-medium">User-Agent</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((visit, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-text-muted">
                      {visit.date} {visit.time}
                    </td>
                    <td className="py-2 pr-4 text-text-primary">
                      {visit.pageTitle || visit.pagePath}
                    </td>
                    <td className="max-w-[200px] truncate py-2 pr-4 text-text-muted">
                      {visit.referrer || "—"}
                    </td>
                    <td className="max-w-[200px] truncate py-2 text-text-muted">
                      {visit.userAgent || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number;
  subtitle?: string;
}) {
  return (
    <div className="apple-card rounded-2xl p-5">
      <p className="text-xs font-medium text-text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-text-primary">{value}</p>
      {subtitle && (
        <p className="mt-1 text-xs text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
