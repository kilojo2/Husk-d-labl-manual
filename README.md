# DJIBUR Manuals

**База знаний DJIBUR WORKTEAM для операторов вебкам-моделей** — корпоративный справочный портал с документацией, гайдами по платформам, скриптами общения, правилами работы и техническими инструкциями.

Сайт разработан командой **DJIBUR WORKTEAM** и предназначен для внутреннего использования операторами, ведущими трансляции вебкам-моделей.

---

## 🚀 Технологический стек

| Технология | Версия | Назначение |
|---|---|---|
| **Next.js** (App Router) | 16.2.10 | React-фреймворк, серверный рендеринг, статическая генерация (SSG) |
| **React** | 19.2.4 | UI-библиотека |
| **TypeScript** | 5 | Статическая типизация |
| **Tailwind CSS** | v4 | Utility-first CSS-фреймворк, 4 кастомные темы оформления |
| **sql.js** | 1.14.1 | SQLite в WebAssembly — локальная БД без внешних зависимостей |
| **Zustand** | 5.0.14 | Лёгкий стейт-менеджмент |
| **Geist** (Google Fonts) | — | Системный шрифт в стиле Apple (Sans + Mono) |

Платформы деплоя: **Vercel** (основная) / **Railway** (альтернативная).

---

## 📁 Архитектура проекта

```
├── app/                          # Next.js App Router (страницы и API)
│   ├── account-login/            # Вход в аккаунты моделей
│   ├── admin/                    # Админ-панель (защищена токеном)
│   ├── api/                      # API-эндпоинты
│   │   ├── honeypot/             # Ловушка для ботов
│   │   ├── privacy/              # GDPR: доступ и удаление данных
│   │   ├── stats/                # Агрегированная статистика (защищена)
│   │   │   └── decrypt/          # Дешифровка IP-адресов
│   │   └── track/                # Запись посещений
│   │       └── beacon/           # Image-beacon fallback (для Brave/ETP)
│   ├── bongacams-guide/          # Гайд по BongaCams (5 подпунктов)
│   ├── broadcasting/             # Раздел «Середина работы» (5 статей)
│   ├── chaturbate-guide/         # Гайд по Chaturbate (6 подпунктов)
│   ├── flirt4free-guide/         # Гайд по Flirt4Free (5 подпунктов)
│   ├── general-rules/            # Общие правила (3 статьи)
│   ├── getting-started/          # Раздел «Начало работы» (3 статьи)
│   ├── livejasmin-guide/         # Мануал по LiveJasmin
│   ├── lovense-guide/            # Мануал по Lovense / Lush
│   ├── obs-guide/                # Гайд по настройке OBS
│   ├── scripts-and-dialogues/    # Скрипты и диалоги (4 статьи)
│   ├── situation-handling/       # Обработка ситуаций (3 статьи)
│   ├── stripchat-guide/          # Гайд по Stripchat (6 подпунктов)
│   ├── globals.css               # Глобальные стили + 4 темы + CSS-переменные
│   ├── layout.tsx                # Корневой layout с CSP-заголовками
│   └── page.tsx                  # Точка входа → редирект на /account-login
├── components/                   # React-компоненты (19 шт.)
│   ├── ArticlePage.tsx           # Обёртка статьи (заголовок + карточка)
│   ├── BackgroundOrbs.tsx        # 4 анимированных градиентных шара
│   ├── CookieConsent.tsx         # GDPR-баннер с Accept / Reject
│   ├── CursorTrail.tsx           # Курсорный след (8-точечная lerp-интерполяция)
│   ├── FooterCredit.tsx          # Glass-pill с логотипом + «by DJIBUR WORKTEAM»
│   ├── Header.tsx                # Sticky-заголовок с логотипом и поиском
│   ├── LayoutWrapper.tsx         # Клиентская обёртка: тема, сайдбар, состояния
│   ├── MarkdownContent.tsx       # Рендерер контентных блоков (heading, paragraph, list, etc.)
│   ├── NavItem.tsx               # Пункт навигации (активная полоса, hover, вложенность)
│   ├── NavSection.tsx            # Секция навигации (эмодзи-заголовок, chevron, разделитель)
│   ├── SearchBar.tsx             # Поле поиска с дебаунсом 150 мс
│   ├── SearchHighlight.tsx       # Подсветка текста из строки запроса (?q=)
│   ├── SearchResultsDropdown.tsx # Выпадающие результаты поиска
│   ├── SFSymbol.tsx              # 25+ SVG-иконок в стиле Apple SF Symbols (outline)
│   ├── Sidebar.tsx               # Адаптивный сайдбар (overlay на мобильных, static на десктопе)
│   ├── TableOfContents.tsx       # Оглавление статьи (заглушка)
│   ├── TelegramContacts.tsx      # Плавающая кнопка контактов Telegram
│   ├── ThemeSwitcher.tsx         # Переключатель 4 тем (плавающая кнопка)
│   ├── TreeNavigation.tsx        # Рендерер дерева навигации
│   └── VisitTracker.tsx          # Клиентский трекинг посещений
├── lib/                          # Серверные библиотеки (13 модулей)
│   ├── anomaly-monitor.ts        # Детектор аномалий (proxy-цепочки, сканирование, боты)
│   ├── cleanup.ts                # Автоудаление старых записей (90 / 365 / 30 дней)
│   ├── crypto.ts                 # AES-256-GCM шифрование IP (3-частный ключ)
│   ├── db.ts                     # SQLite-подключение + схема таблиц
│   ├── dedup.ts                  # Дедупликация визитов в памяти (окно 5 мин.)
│   ├── differential-privacy.ts   # Дифференциальная приватность (шум Лапласа, ε=0.3)
│   ├── extract-ip.ts             # Извлечение IP из заголовков (CF → X-Real-IP → X-Forwarded-For)
│   ├── fail2ban.ts               # Бан IP после 10 нарушений на 1 час
│   ├── log-rotation.ts           # Ротация БД при достижении 100 МБ
│   ├── navigation.ts             # Структура навигации (3 секции, 25+ статей)
│   ├── rate-limit.ts             # Трёхуровневый рейт-лимитинг (global / per-IP / burst)
│   ├── sanitize.ts               # XSS-санитизация пользовательского ввода
│   ├── search-index.ts           # Полнотекстовый поисковый индекс (30+ записей)
│   ├── themes.ts                 # Определения 4 тем (Apple Light/Dark, Retro Light/Dark)
│   └── tracker.ts                # Логика записи посещений
├── middleware.ts                  # Edge Middleware (рейт-лимит, бан-проверка на /api/*)
├── next.config.ts                 # Конфигурация Next.js + security-заголовки
├── public/                        # Статические ресурсы
│   ├── logo-purple.svg           # Брендовый логотип
│   ├── robots.txt                # Decoy-пути для скраперов
│   ├── *-screens/                # Скриншоты для гайдов (5 платформ + OBS)
├── data/
│   └── visits.db                 # SQLite-файл с визитами (создаётся автоматически)
└── plans/                        # Архитектурные планы и документация (10+ файлов)
```

---

## 📚 Контентные разделы

Сайт организован в **три уровня сложности** (Bronze → Silver → Gold):

### 🟤 Начало работы (Bronze)
| Статья | Маршрут | Подпункты |
|---|---|---|
| Вход в аккаунты | `/account-login` | — |
| **Гайд по Chaturbate** | `/chaturbate-guide` | Запуск, Панель управления, Рассылка, Token Stats, APPS, Settings & Privacy |
| **Гайд по Stripchat** | `/stripchat-guide` | Основы, Рассылка, Мои данные, Настройки шоу, Лента, Расширения |
| **Гайд по BongaCams** | `/bongacams-guide` | Запуск, Чат-боты, Tip Menu, Countdown, Безопасность |
| Мануал по LiveJasmin | `/livejasmin-guide` | — |
| **Гайд по Flirt4Free** | `/flirt4free-guide` | Интерфейс, OBS, Кнопки управления, Типы шоу, Типы юзеров |
| Мануал по Lovense / Lush | `/lovense-guide` | — |
| Гайд по настройке OBS | `/obs-guide` | — |
| Словарь терминов | `/getting-started/dictionary` | — |
| Правила сайтов | `/getting-started/site-rules` | — |
| Железные правила переговоров | `/getting-started/negotiation-rules` | — |

### ⚪ Середина работы (Silver)
| Статья | Маршрут |
|---|---|
| Первые 20 секунд | `/broadcasting/first-20-seconds` |
| Цели (goals) | `/broadcasting/goals` |
| Рулетки | `/broadcasting/roulettes` |
| Технические фишки | `/broadcasting/tech-tips` |
| Бот на чатуре (Token Counter) | `/broadcasting/token-counter` |
| Общий скрипт общения | `/scripts-and-dialogues/general-script` |
| Лёгкий скрипт по шагам | `/scripts-and-dialogues/light-step-script` |
| Сексинг-вопросы | `/scripts-and-dialogues/sexting-questions` |
| Заготовки фраз | `/scripts-and-dialogues/phrase-templates` |

### 🟡 Профессиональный режим (Gold)
| Статья | Маршрут |
|---|---|
| Возражения | `/situation-handling/objections` |
| Топ-3 обидки | `/situation-handling/top-3-grievances` |
| Ошибки в привате | `/situation-handling/private-mistakes` |
| Правила общения | `/general-rules/communication-rules` |
| Сопровождение после шоу | `/general-rules/post-show-support` |
| Не быть ботом | `/general-rules/dont-be-a-bot` |

**Всего: ~30 маршрутов** (22 статических + 8 динамических), **4 гида с подпунктами** (Stripchat, Chaturbate, BongaCams, Flirt4Free).

---

## 🎨 UI/UX и темы оформления

### 4 визуальные темы
Темы переключаются через плавающую кнопку в правом нижнем углу и сохраняются в `localStorage`. При первом посещении тема выбирается по `prefers-color-scheme`.

| Тема | Ключ | Описание |
|---|---|---|
| 🍎 **Apple Style** | `apple` | Светлая iOS/macOS-минималистика |
| 🌙 **Apple Dark** | `apple-dark` | Тёмная iOS/macOS-тема |
| 🎵 **Retro 80/90** | `retro` | Тёплая ностальгическая ретро-тема |
| ✨ **Retro Dark** | `retro-dark` | Тёмная ретро-тема |

### Фирменные UI-эффекты
- **Apple Glassmorphism** — `backdrop-blur-2xl`, полупрозрачные фоны, мягкие тени
- **SF Symbols** — 25+ кастомных SVG-иконок в стиле Apple (единый outline-стиль, `strokeWidth: 1.5`)
- **Background Orbs** — 4 парящих градиентных шара с CSS-анимациями
- **Cursor Trail** — курсорный след (8 точек, lerp-интерполяция, затухание)
- **Секционные цвета навигации**: Bronze `#965A38`, Silver `#5B6770`, Gold `#B8860B`

### Адаптивная навигация
- **Десктоп**: статическая панель 230px слева, выровненная с заголовком
- **Мобильные**: hamburger-меню → overlay с backdrop blur, закрытие по Escape, блокировка скролла
- **Сайдбар**: эмодзи-заголовки, цветная левая полоса активного пункта, hover translateX, анимированные chevron-стрелки

### Поиск
- Полнотекстовый поиск по всем 30+ статьям
- Дебаунс 150 мс, реальное время
- Навигация с клавиатуры (↑↓ Enter Escape)
- Бейджи секций, сниппеты с контекстом
- Подсветка текста на странице при переходе (`?q=` параметр)
- AND-логика: все слова запроса должны совпасть
- Ранжирование: совпадение в заголовке (10 очков) > ключевых словах (5) > контенте (2)

---

## 🛡️ Инфраструктура безопасности

### Защита на уровне Middleware (Edge)
Edge Middleware работает на всех `/api/*` маршрутах и обеспечивает:
- **Рейт-лимитинг**: глобальный (10K/мин), per-IP (60/мин), burst (10/10 сек)
- **fail2ban**: 10 нарушений → бан IP на 1 час
- **Honeypot**: скрытый эндпоинт для детекта ботов
- **Аномалии-монитор**: детект proxy-цепочек, сканирования путей, известных ботов

### Security-заголовки
| Заголовок | Значение |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

### Защита IP-адресов
- **Извлечение**: цепочка `CF-Connecting-IP → X-Real-IP → X-Forwarded-For → socket`
- **Маскировка**: последний октет зануляется для GDPR-комплаенса
- **Хеширование**: SHA-256 для дедупликации
- **Шифрование**: AES-256-GCM с ключом из 3 частей (env: `KEY_PART_1`, `KEY_PART_2`, `KEY_PART_3`)
- **XSS-санитизация**: весь пользовательский ввод очищается

---

## 📊 Приватная аналитика

Полностью автономная система трекинга без сторонних сервисов (Google Analytics, etc.):

| Компонент | Детали |
|---|---|
| **База данных** | SQLite (`data/visits.db`) через sql.js (WebAssembly, нет нативных зависимостей) |
| **Дедупликация** | In-memory Map с 5-минутным окном — исключает повторные запросы |
| **Дифференциальная приватность** | Шум Лапласа (ε = 0.3) — сильная гарантия конфиденциальности |
| **Автоочистка** | Визиты — 90 дней, Статистика — 365 дней, Аномалии — 30 дней |
| **Ротация логов** | Архивирование БД при достижении 100 МБ |
| **Image-beacon fallback** | Для браузеров с агрессивной блокировкой (Brave, Safari ETP) |
| **GDPR** | Endpoint `/api/privacy` — доступ к своим данным и их удаление |
| **Cookie Consent** | Баннер с Accept / Reject, localStorage-персистентность |

### Админ-панель (`/admin`)
Доступ защищён переменной окружения `ADMIN_TOKEN`. Функции:
- График посещений по дням (столбцы + линия)
- Рейтинг популярных страниц
- Список последних визитов с SHA-256 хешами IP
- Дешифровка IP-адресов (требуется ключ)
- Безопасность: список забаненных IP, статистика аномалий, временная шкала

---

## ⚙️ Конфигурация и деплой

### Переменные окружения

| Переменная | Обязательна | Описание |
|---|---|---|
| `ADMIN_TOKEN` | Да | Токен для доступа к `/admin` и `/api/stats` |
| `KEY_PART_1` | Условно | Часть 1 AES-ключа (или `IP_ENCRYPTION_KEY`) |
| `KEY_PART_2` | Условно | Часть 2 AES-ключа |
| `KEY_PART_3` | Условно | Часть 3 AES-ключа |
| `IP_ENCRYPTION_KEY` | Условно | Готовый ключ шифрования (альтернатива трём частям) |
| `DATABASE_PATH` | Нет | Путь к SQLite (по умолчанию `data/visits.db`) |

*Минимум один из `KEY_PART_1+2+3` или `IP_ENCRYPTION_KEY` должен быть установлен для шифрования IP.*

### Команды

```bash
npm run dev       # Запуск dev-сервера
npm run build     # Production-сборка (30 маршрутов: 22 static + 8 dynamic)
npm start         # Запуск production-сервера
npm run lint      # ESLint-проверка
```

---

## 📄 Лицензия

Приватный проект **DJIBUR WORKTEAM**. Все права защищены.