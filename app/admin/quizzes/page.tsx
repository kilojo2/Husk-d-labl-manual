"use client";

import { useState, useEffect, useCallback } from "react";

interface QuizResult {
  id: number;
  operatorName: string;
  quizSlug: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  createdAt: string;
}

export default function AdminQuizzes() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterQuiz, setFilterQuiz] = useState("");

  useEffect(() => {
    fetch("/api/stats", { credentials: "include" })
      .then((r) => (r.status === 401 || r.status === 403 ? setAuthenticated(false) : setAuthenticated(true)))
      .catch(() => setAuthenticated(false));
  }, []);

  const loadResults = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterName) params.set("operator", filterName);
      if (filterQuiz) params.set("quiz", filterQuiz);
      const res = await fetch(`/api/quiz/results?${params}`, { credentials: "include" });
      const data = await res.json();
      setResults(data.results || []);
    } catch { /* ignore */ }
  }, [filterName, filterQuiz]);

  useEffect(() => { if (authenticated) loadResults(); }, [authenticated, loadResults]);

  if (authenticated === null) return <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>Загрузка...</div>;
  if (!authenticated) return <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#ff453a", display: "flex", alignItems: "center", justifyContent: "center" }}>Требуется авторизация. Перейдите на /admin</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#fff", padding: "32px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Результаты тестов</h1>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <a href="/admin" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Статистика</a>
              <a href="/admin/pages" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Страницы</a>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <input value={filterName} onChange={(e) => setFilterName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loadResults()} placeholder="Фильтр по оператору..." style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "14px", width: "220px", outline: "none" }} />
          <input value={filterQuiz} onChange={(e) => setFilterQuiz(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loadResults()} placeholder="Фильтр по тесту..." style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: "14px", width: "220px", outline: "none" }} />
          <button onClick={loadResults} style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: "#007AFF", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>Применить</button>
        </div>

        {/* Stats summary */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px 24px" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Всего тестов</div>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>{results.length}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px 24px" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Средний балл</div>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>
              {results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length) : 0}%
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px 24px" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Операторов</div>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>{new Set(results.map((r) => r.operatorName)).size}</div>
          </div>
        </div>

        {/* Results table */}
        <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Оператор</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Тест</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Результат</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500 }}>Дата</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>Нет результатов тестов</td>
                </tr>
              ) : (
                results.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 500 }}>{r.operatorName}</td>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.6)" }}>{r.quizTitle}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontWeight: 700, color: r.percentage >= 70 ? "#30d158" : "#ff453a" }}>
                        {r.score}/{r.total} ({r.percentage}%)
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                      {r.createdAt?.replace("T", " ").substring(0, 16)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}