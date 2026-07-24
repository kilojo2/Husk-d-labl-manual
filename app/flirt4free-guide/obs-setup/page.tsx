import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Подключение OBS — Flirt4Free",
  description: "Настройка OBS для Flirt4Free: получение ключей, настройки видео и порядок запуска",
};

export default function Page() {
  return (
    <ArticlePage title="Подключение OBS" description="Настройка OBS для Flirt4Free: получение ключей, настройки видео и порядок запуска">
      <h2 className="text-2xl font-bold mb-6">Подключение и настройка OBS</h2>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Где взять ключи</h3>
      <p className="text-lg leading-relaxed">
        В приложении Performer App перейди в меню <strong>Setup → Broadcast Info</strong> и скопируй оттуда <strong>Server URL</strong> и <strong>Stream Key</strong>.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Настройки вещания в OBS</h3>
      <p className="text-lg leading-relaxed">
        Открой <strong>Настройки → Вещание</strong> в OBS:
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Выбери <strong>Service: Custom</strong></li>
        <li>Вставь скопированные <strong>Server URL</strong> и <strong>Stream Key</strong></li>
        <li>Нажми <strong>«Применить»</strong></li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Настройки видео в OBS</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li><strong>Resolution (Базовое разрешение):</strong> 1920×1080</li>
        <li><strong>FPS (Частота кадров):</strong> 30</li>
        <li><strong>Bitrate (Битрейт):</strong> 10000 kbps</li>
      </ul>

      <h3 className="text-xl font-semibold mt-10 mb-4">4. Порядок запуска</h3>
      <ol className="list-decimal list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Сначала нажми <strong>Start Streaming</strong> в OBS</li>
        <li>Подожди <strong>5–10 секунд</strong></li>
        <li>Затем нажми <strong>Start Chat</strong> в Performer App</li>
      </ol>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">💡 Мультистриминг</h4>
        <p className="text-base leading-relaxed">
          Для одновременной трансляции на несколько площадок (например, BongaCams, Chaturbate, Stripchat) используй плагин <strong>Multiple Output</strong>, добавив нужные цели в разделе «Настройки → Вещание».
        </p>
      </div>
    </ArticlePage>
  );
}