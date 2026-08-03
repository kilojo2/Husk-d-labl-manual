import type { QuizQuestion } from "../QuizModal";
export const livejasminQuiz: QuizQuestion[] = [
  { text: "Как войти в аккаунт модели на LiveJasmin?", answers: ["Через Google", "Через ShineBrowser с логином и паролем", "Через мобильное приложение", "Через QR-код"], correctIndex: 1 },
  { text: "Какая программа используется для трансляции на LiveJasmin?", answers: ["OBS Studio", "Streamlabs", "XSplit", "Любая программа по выбору"], correctIndex: 0 },
  { text: "Где находятся настройки трансляции?", answers: ["В браузере", "В Performer Center на сайте LiveJasmin", "В OBS", "В отдельном приложении"], correctIndex: 1 },
  { text: "Что нужно сделать перед началом стрима на LiveJasmin?", answers: ["Только включить камеру", "Проверить OBS, интернет, камеру, микрофон и войти в Performer Center", "Отправить ссылку зрителям", "Запустить музыку"], correctIndex: 1 },
  { text: "Как настроить качество видео?", answers: ["Только в настройках камеры", "В OBS: разрешение, битрейт, FPS", "В браузере", "Автоматически"], correctIndex: 1 },
  { text: "Где отображается заработок?", answers: ["Только в конце месяца", "В реальном времени в Performer Center", "В чате", "По email"], correctIndex: 1 },
  { text: "Что такое 'Performer Center'?", answers: ["Приложение для телефона", "Панель управления модели на LiveJasmin", "Сайт для зрителей", "Программа для монтажа"], correctIndex: 1 },
  { text: "Как работает оплата на LiveJasmin?", answers: ["Только наличными", "Выплаты на банковскую карту или кошелёк по расписанию", "Каждый день", "Только через PayPal"], correctIndex: 1 },
  { text: "Что делать если трансляция зависла?", answers: ["Закончить стрим", "Проверить интернет, перезапустить OBS и обновить страницу Performer Center", "Ждать", "Написать зрителям"], correctIndex: 1 },
  { text: "Где посмотреть историю стримов?", answers: ["В OBS", "В Performer Center → раздел статистики", "В браузере", "На главной странице"], correctIndex: 1 },
];