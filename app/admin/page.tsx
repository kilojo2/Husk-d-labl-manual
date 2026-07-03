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
    } catch {
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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1c1e",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            style={{
              marginBottom: "24px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Статистика посещений
          </h1>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Токен доступа"
              autoFocus
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007AFF";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            />
            {error && (
              <p style={{ fontSize: "13px", color: "#ff453a", margin: 0 }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !token.trim()}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "none",
                background: !token.trim() || loading ? "rgba(255,255,255,0.12)" : "#007AFF",
                color: !token.trim() || loading ? "rgba(255,255,255,0.3)" : "#ffffff",
                fontSize: "14px",
                fontWeight: 500,
                cursor: !token.trim() || loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (token.trim() && !loading) {
                  e.currentTarget.style.opacity = "0.85";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1c1e",
          color: "rgba(255,255,255,0.5)",
          fontSize: "16px",
        }}
      >
        Загрузка...
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
    <div
      style={{
        minHeight: "100vh",
        background: "#1c1c1e",
        color: "#ffffff",
        padding: "40px 16px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, margin: 0 }}>
            Статистика посещений
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            Панель управления — данные обновляются каждые 30 секунд
          </p>
        </div>

        {/* KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
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
        <GlassSection title="Визиты по дням">
          {data.daily.length === 0 ? (
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Данных пока нет</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Visits bar chart */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Визиты
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
                  {[...data.daily].reverse().map((day) => (
                    <div
                      key={day.date}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "4px 4px 0 0",
                          background: "#007AFF",
                          opacity: 0.7,
                          height: `${Math.max((day.totalVisits / maxVisits) * 120, 4)}px`,
                          transition: "opacity 0.2s",
                          cursor: "pointer",
                        }}
                        title={`${day.date}: ${day.totalVisits} визитов`}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                      />
                      <div style={{ marginTop: "4px", fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>
                        {formatDate(day.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page views bar chart */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Просмотры страниц
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "2px" }}>
                  {[...data.daily].reverse().map((day) => (
                    <div
                      key={`views-${day.date}`}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "4px 4px 0 0",
                          background: "#30d158",
                          opacity: 0.6,
                          height: `${Math.max((day.pageViews / maxViews) * 120, 4)}px`,
                          transition: "opacity 0.2s",
                          cursor: "pointer",
                        }}
                        title={`${day.date}: ${day.pageViews} просмотров`}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                      />
                      <div style={{ marginTop: "4px", fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>
                        {formatDate(day.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </GlassSection>

        {/* Top Pages */}
        <GlassSection title="Популярные страницы">
          {data.pages.length === 0 ? (
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Данных пока нет</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.pages.map((page, i) => (
                <div
                  key={page.pagePath}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.4)", minWidth: "24px" }}>
                      #{i + 1}
                    </span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, margin: 0, color: "#ffffff" }}>
                        {page.pageTitle || page.pagePath}
                      </p>
                      <p style={{ fontSize: "12px", margin: 0, color: "rgba(255,255,255,0.4)" }}>
                        {page.pagePath}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#007AFF" }}>
                    {page.views}
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassSection>

        {/* Recent Visits */}
        <GlassSection title="Последние визиты">
          {data.recent.length === 0 ? (
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Данных пока нет</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <th style={{ padding: "0 12px 8px 0", textAlign: "left", fontWeight: 500 }}>Время</th>
                    <th style={{ padding: "0 12px 8px 0", textAlign: "left", fontWeight: 500 }}>Страница</th>
                    <th style={{ padding: "0 12px 8px 0", textAlign: "left", fontWeight: 500 }}>Referrer</th>
                    <th style={{ padding: "0 0 8px 0", textAlign: "left", fontWeight: 500 }}>User-Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recent.map((visit, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "8px 12px 8px 0", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                        {visit.date} {visit.time}
                      </td>
                      <td style={{ padding: "8px 12px 8px 0", color: "#ffffff" }}>
                        {visit.pageTitle || visit.pagePath}
                      </td>
                      <td style={{ padding: "8px 12px 8px 0", color: "rgba(255,255,255,0.5)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {visit.referrer || "—"}
                      </td>
                      <td style={{ padding: "8px 0", color: "rgba(255,255,255,0.5)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {visit.userAgent || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassSection>
      </div>
    </div>
  );
}

function GlassSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          fontSize: "17px",
          fontWeight: 600,
          margin: "0 0 16px",
          color: "#ffffff",
        }}
      >
        {title}
      </h2>
      {children}
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
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p style={{ fontSize: "11px", fontWeight: 600, margin: 0, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}
      </p>
      <p style={{ fontSize: "32px", fontWeight: 700, margin: "4px 0 0", color: "#ffffff" }}>
        {value}
      </p>
      {subtitle && (
        <p style={{ fontSize: "12px", margin: "4px 0 0", color: "rgba(255,255,255,0.4)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
