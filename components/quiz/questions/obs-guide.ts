import type { QuizQuestion } from "../QuizModal";
export const obsGuideQuiz: QuizQuestion[] = [
  { text: "Какая программа используется для трансляции видео на вебкам-сайты?", answers: ["Zoom", "OBS Studio", "Photoshop", "Discord"], correctIndex: 1 },
  { text: "Как добавить источник видео в OBS?", answers: ["В настройках звука", "Нажать '+' в разделе 'Sources' и выбрать 'Video Capture Device'", "В меню 'Help'", "Никак, добавляется автоматически"], correctIndex: 1 },
  { text: "Где настраивается качество видео (разрешение, битрейт)?", answers: ["В настройках браузера", "В OBS: Settings → Output и Video", "В настройках камеры", "Нигде"], correctIndex: 1 },
  { text: "Как запустить виртуальную камеру в OBS?", answers: ["Нажать 'Start Streaming'", "Нажать 'Start Virtual Camera'", "Закрыть OBS", "Перезагрузить компьютер"], correctIndex: 1 },
  { text: "Что делать если OBS не видит камеру?", answers: ["Купить новую камеру", "Проверить подключение камеры, обновить драйверы, перезапустить OBS", "Удалить OBS", "Обновить Windows"], correctIndex: 1 },
  { text: "Как добавить микрофон в OBS?", answers: ["В разделе 'Sources' добавить 'Audio Input Capture'", "В настройках видео", "Микрофон добавляется автоматически", "Через меню 'View'"], correctIndex: 0 },
  { text: "Зачем нужен 'Output Mode' Simple/Advanced?", answers: ["Для изменения темы", "Simple — базовые настройки, Advanced — детальная настройка кодеков и битрейта", "Для чата", "Не используется"], correctIndex: 1 },
  { text: "Как запустить запись стрима?", answers: ["Нажать 'Start Recording'", "Никак", "Через браузер", "Через настройки Windows"], correctIndex: 0 },
  { text: "Что такое 'Sources' в OBS?", answers: ["Источники новостей", "Слои видео и аудио: камера, изображения, текст, захват экрана", "Список контактов", "Настройки интернета"], correctIndex: 1 },
  { text: "Как применить настройки OBS к конкретному вебкам-сайту?", answers: ["Никак", "Выбрать OBS Virtual Camera в настройках браузера на сайте", "Через отдельное приложение", "Настройки общие для всех сайтов"], correctIndex: 1 },
];