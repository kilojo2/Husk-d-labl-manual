# CHANGELOG — DJIBUR Manuals

## [2026-07-24] — Сессия UI/UX и ребрендинг

### 🏠 Главная страница
- **Добавлена** полноценная приветственная страница (`/`) с герой-секцией «DJIBUR WORKTEAM» и тремя карточками категорий (Bronze/Silver/Gold) для быстрой навигации по документации
- **Запрещён скролл** на главной странице — контент всегда помещается в один экран (блокировка на уровнях `body` и `main`)

### 🧭 Навигация
- **Добавлена** кнопка «Главное меню» в сайдбар первой строкой (иконка `house.fill`, ведёт на `/`)
- **Исправлено** несоответствие индексных страниц гайдов: `/stripchat-guide` теперь имеет сетку карточек быстрой навигации (как Chaturbate/BongaCams/Flirt4Free)

### ✨ Анимации
- **Добавлены** плавные переходы между страницами:
  - **View Transitions API** — нативный кроссфейд (fade-out 200ms + fade-in/slide-up 250ms)
  - **fadeInUp-анимация** контента — заголовки и карточки статей появляются с плавным подъёмом
  - **Stagger-анимация** карточек на главной — последовательное появление (0ms, 120ms, 240ms)

### 🖱️ Курсорный след
- **Заменён** с 6 размытых dimples на **искры (sparkle particles)**:
  - 2 частицы каждые 28ms при движении
  - Случайное направление (360°), скорость 0.4–2.2 px/frame
  - Время жизни 350–700ms, затухание opacity + scale
  - Цвет: accent текущей темы со свечением

### 🎨 Ребрендинг
- **«Husk'd Labl Manuals»** → **«DJIBUR Manuals»** во всех файлах:
  - `components/Header.tsx` — иконка `DM`, текст `DJIBUR Manuals`
  - `app/layout.tsx` — метатеги `title` и `description`
  - `README.md` — заголовок и описание
  - `components/FooterCredit.tsx` — `DJIBUR Manuals • by DJIBUR WORKTEAM`
  - `public/robots.txt` — комментарии и Sitemap URL → `djibur-workteam.up.railway.app`

### 📝 Документация
- `README.md` полностью переписан: архитектура, контентные разделы, UI/UX, безопасность, аналитика, деплой
- `CHANGELOG.md` создан (этот файл)

---

## Коммиты сессии

| Commit | Описание |
|---|---|
| `0decf77` | feat: replace redirect with welcome page (DJIBUR WORKTEAM hero + category cards) |
| `5987a53` | feat: add Home button to sidebar navigation |
| `e75d5a8` | feat: add smooth page transition animations (View Transitions API + fadeInUp + stagger cards) |
| `6ed68d4` | fix: add index cards to /stripchat-guide — consistent with Chaturbate/BongaCams/Flirt4Free |
| `a9819fd` | fix: disable scroll on homepage (h-screen + overflow-hidden) |
| `3e68a48` | fix: disable scroll on homepage at body and main level (not just inner div) |
| `785deb6` | feat: replace cursor dimples with sparkle particle trail |
| `4a4bb6b` | refactor: rename Husk'd Labl to DJIBUR Manuals across all files |