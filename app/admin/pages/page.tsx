"use client";

import { useState, useEffect, useCallback } from "react";

type BlockType = "heading" | "subheading" | "paragraph" | "list" | "ordered-list" | "divider" | "note" | "table" | "link-block";

interface Block {
  id?: number;
  sortOrder?: number;
  type: BlockType;
  text?: string;
  items?: string[];
  emoji?: string;
  headers?: string[];
  rows?: string[][];
}

interface PageData {
  slug: string;
  title: string;
  description: string;
  sectionSlug: string;
  sortOrder: number;
  isPublished: number;
  parentSlug: string;
  icon: string;
}

const BLOCK_LABELS: Record<BlockType, string> = {
  "heading": "Заголовок",
  "subheading": "Подзаголовок",
  "paragraph": "Текст",
  "list": "Список",
  "ordered-list": "Нумерованный список",
  "divider": "Разделитель",
  "note": "Важно! 💡",
  "table": "Таблица",
  "link-block": "Блок ссылок",
};

export default function AdminPages() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Check auth on mount
  useEffect(() => {
    fetch("/api/stats", { credentials: "include" })
      .then((r) => {
        if (r.status === 401 || r.status === 403) setAuthenticated(false);
        else setAuthenticated(true);
      })
      .catch(() => setAuthenticated(false));
  }, []);

  // Load all pages
  const loadPages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/pages", { credentials: "include" });
      const data = await res.json();
      setPages(data.pages || []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadPages();
  }, [authenticated, loadPages]);

  // Load single page with blocks
  const loadPage = useCallback(async (slug: string) => {
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, { credentials: "include" });
      const data = await res.json();
      if (data.page) {
        setPageData(data.page);
        setBlocks(data.blocks.length > 0 ? data.blocks : [{ type: "paragraph", text: "" }]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Create new page
  const createPage = () => {
    const slug = prompt("Slug страницы (например: my-new-guide):");
    if (!slug) return;
    const title = prompt("Заголовок страницы:") || slug;
    setSelectedSlug(slug);
    setPageData({
      slug, title, description: "", sectionSlug: "", sortOrder: 0, isPublished: 1,
      parentSlug: "", icon: ""
    });
    setBlocks([{ type: "heading", text: title }, { type: "paragraph", text: "" }]);
  };

  // Update block
  const updateBlock = (index: number, updates: Partial<Block>) => {
    setBlocks((prev) => prev.map((b, i) => i === index ? { ...b, ...updates } : b));
  };

  // Add block
  const addBlock = (type: BlockType) => {
    const newBlock: Block = { type, text: "" };
    if (type === "list" || type === "ordered-list") newBlock.items = [""];
    if (type === "table") { newBlock.headers = ["Колонка 1", "Колонка 2"]; newBlock.rows = [["", ""]]; }
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Remove block
  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  // Move block
  const moveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  // Add list item
  const addListItem = (blockIndex: number) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      return { ...b, items: [...(b.items || [""]), ""] };
    }));
  };

  // Update list item
  const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      const items = [...(b.items || [])];
      items[itemIndex] = value;
      return { ...b, items };
    }));
  };

  // Remove list item
  const removeListItem = (blockIndex: number, itemIndex: number) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      return { ...b, items: (b.items || []).filter((_, j) => j !== itemIndex) };
    }));
  };

  // Table helpers
  const addTableRow = (blockIndex: number) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      const cols = b.headers?.length || 2;
      return { ...b, rows: [...(b.rows || []), new Array(cols).fill("")] };
    }));
  };

  const updateTableCell = (blockIndex: number, rowIdx: number, colIdx: number, value: string) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      const rows = [...(b.rows || [])];
      rows[rowIdx] = [...rows[rowIdx]];
      rows[rowIdx][colIdx] = value;
      return { ...b, rows };
    }));
  };

  const removeTableRow = (blockIndex: number, rowIdx: number) => {
    setBlocks((prev) => prev.map((b, i) => {
      if (i !== blockIndex) return b;
      return { ...b, rows: (b.rows || []).filter((_, j) => j !== rowIdx) };
    }));
  };

  // Save
  const handleSave = async () => {
    if (!pageData) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          slug: pageData.slug,
          title: pageData.title,
          description: pageData.description,
          sectionSlug: pageData.sectionSlug,
          sortOrder: pageData.sortOrder,
          icon: pageData.icon,
          parentSlug: pageData.parentSlug,
          isPublished: pageData.isPublished,
          blocks,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessage("Ошибка: " + (err.error || "не удалось сохранить"));
      } else {
        setMessage("✅ Сохранено!");
        loadPages();
      }
    } catch (e) {
      setMessage("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (slug: string) => {
    if (!confirm(`Удалить страницу "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/pages?slug=${slug}`, { method: "DELETE", credentials: "include" });
      if (selectedSlug === slug) {
        setSelectedSlug("");
        setPageData(null);
        setBlocks([]);
      }
      loadPages();
    } catch (e) { /* ignore */ }
  };

  if (authenticated === null) return <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>Загрузка...</div>;
  if (!authenticated) return <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#ff453a", display: "flex", alignItems: "center", justifyContent: "center" }}>Требуется авторизация. Перейдите на /admin</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#1c1c1e", color: "#fff", display: "flex", fontFamily: "system-ui, sans-serif" }}>
      {/* ── Sidebar: Page List ── */}
      <div style={{ width: "280px", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>Страницы</h2>
          <a href="/admin" style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Статистика</a>
        </div>
        <button
          onClick={createPage}
          style={{
            width: "100%", padding: "10px", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.15)",
            background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "13px",
            marginBottom: "12px", fontWeight: 500
          }}
        >
          + Новая страница
        </button>
        {pages.map((p) => (
          <div key={p.slug} style={{ marginBottom: "4px" }}>
            <button
              onClick={() => { setSelectedSlug(p.slug); loadPage(p.slug); }}
              style={{
                width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: "8px", border: "none",
                background: selectedSlug === p.slug ? "rgba(0,122,255,0.15)" : "transparent",
                color: selectedSlug === p.slug ? "#007AFF" : "rgba(255,255,255,0.7)", cursor: "pointer",
                fontSize: "13px"
              }}
            >
              <div style={{ fontWeight: 500 }}>{p.title || p.slug}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{p.slug}</div>
            </button>
          </div>
        ))}
      </div>

      {/* ── Main: Editor ── */}
      <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
        {pageData ? (
          <>
            {/* Meta */}
            <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                value={pageData.title}
                onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                placeholder="Заголовок страницы"
                style={{ fontSize: "24px", fontWeight: 600, background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "4px 0", outline: "none", width: "100%" }}
              />
              <div style={{ display: "flex", gap: "12px" }}>
                <input
                  value={pageData.description}
                  onChange={(e) => setPageData({ ...pageData, description: e.target.value })}
                  placeholder="Описание (meta description)"
                  style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#fff", padding: "8px 12px", fontSize: "13px", outline: "none" }}
                />
                <input
                  value={pageData.sectionSlug}
                  onChange={(e) => setPageData({ ...pageData, sectionSlug: e.target.value })}
                  placeholder="Секция (sectionSlug)"
                  style={{ width: "180px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#fff", padding: "8px 12px", fontSize: "13px", outline: "none" }}
                />
              </div>
            </div>

            {/* Blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {blocks.map((block, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "16px", position: "relative" }}>
                  {/* Block type + controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {BLOCK_LABELS[block.type] || block.type}
                    </span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: "4px" }}>
                      <button onClick={() => moveBlock(i, "up")} disabled={i === 0} style={btnStyle}>↑</button>
                      <button onClick={() => moveBlock(i, "down")} disabled={i === blocks.length - 1} style={btnStyle}>↓</button>
                      <button onClick={() => removeBlock(i)} style={{ ...btnStyle, color: "#ff453a" }}>✕</button>
                    </div>
                  </div>

                  {/* Block content based on type */}
                  {(block.type === "heading" || block.type === "subheading") && (
                    <input
                      value={block.text || ""}
                      onChange={(e) => updateBlock(i, { text: e.target.value })}
                      placeholder={block.type === "heading" ? "Текст заголовка" : "Текст подзаголовка"}
                      style={inputStyle}
                    />
                  )}

                  {block.type === "paragraph" && (
                    <textarea
                      value={block.text || ""}
                      onChange={(e) => updateBlock(i, { text: e.target.value })}
                      placeholder="Текст параграфа..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  )}

                  {block.type === "note" && (
                    <textarea
                      value={block.text || ""}
                      onChange={(e) => updateBlock(i, { text: e.target.value })}
                      placeholder="Текст блока «Важно»..."
                      rows={2}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  )}

                  {(block.type === "list" || block.type === "ordered-list") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {(block.items || [""]).map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: "6px" }}>
                          <input
                            value={item}
                            onChange={(e) => updateListItem(i, j, e.target.value)}
                            placeholder={`Пункт ${j + 1}`}
                            style={inputStyle}
                          />
                          <button onClick={() => removeListItem(i, j)} style={{ ...btnStyle, color: "#ff453a" }}>✕</button>
                        </div>
                      ))}
                      <button onClick={() => addListItem(i)} style={{ ...btnStyle, width: "fit-content", fontSize: "12px", padding: "4px 10px" }}>+ Добавить пункт</button>
                    </div>
                  )}

                  {block.type === "divider" && (
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>───── Разделительная линия ─────</div>
                  )}

                  {block.type === "table" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {(block.headers || ["Колонка 1", "Колонка 2"]).map((h, j) => (
                          <input key={j} value={h} onChange={(e) => {
                            const headers = [...(block.headers || [])];
                            headers[j] = e.target.value;
                            updateBlock(i, { headers });
                          }} placeholder={`Колонка ${j + 1}`} style={inputStyle} />
                        ))}
                      </div>
                      {(block.rows || []).map((row, rowIdx) => (
                        <div key={rowIdx} style={{ display: "flex", gap: "6px" }}>
                          {row.map((cell, colIdx) => (
                            <input key={colIdx} value={cell} onChange={(e) => updateTableCell(i, rowIdx, colIdx, e.target.value)} style={inputStyle} />
                          ))}
                          <button onClick={() => removeTableRow(i, rowIdx)} style={{ ...btnStyle, color: "#ff453a" }}>✕</button>
                        </div>
                      ))}
                      <button onClick={() => addTableRow(i)} style={{ ...btnStyle, width: "fit-content", fontSize: "12px", padding: "4px 10px" }}>+ Добавить строку</button>
                    </div>
                  )}

                  {block.type === "link-block" && (
                    <textarea
                      value={block.text || ""}
                      onChange={(e) => updateBlock(i, { text: e.target.value })}
                      placeholder="Текст блока ссылок..."
                      rows={2}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Add block bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
              {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
                <button key={type} onClick={() => addBlock(type)} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "12px" }}>
                  + {BLOCK_LABELS[type]}
                </button>
              ))}
            </div>

            {/* Save */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "12px 24px", borderRadius: "10px", border: "none", background: saving ? "rgba(255,255,255,0.1)" : "#007AFF",
                  color: "#fff", fontSize: "14px", fontWeight: 600, cursor: saving ? "default" : "pointer"
                }}
              >
                {saving ? "Сохранение..." : "💾 Сохранить"}
              </button>
              {message && <span style={{ fontSize: "13px", color: message.startsWith("✅") ? "#30d158" : "#ff453a" }}>{message}</span>}
              <button onClick={() => handleDelete(pageData.slug)} style={{ ...btnStyle, color: "#ff453a", marginLeft: "auto", fontSize: "12px" }}>🗑 Удалить страницу</button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.3)", fontSize: "15px" }}>
            Выберите страницу из списка слева или создайте новую
          </div>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px",
  color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "4px 8px", fontSize: "11px"
};

const inputStyle: React.CSSProperties = {
  flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px", color: "#fff", padding: "8px 12px", fontSize: "14px", outline: "none"
};