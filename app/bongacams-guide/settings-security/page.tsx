import Image from "next/image";
import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Настройки безопасности — BongaCams",
  description: "Обязательные настройки безопасности: DMCA и GEO Block на BongaCams",
};

export default function Page() {
  return (
    <ArticlePage title="Настройки безопасности" description="Обязательные настройки безопасности: DMCA и GEO Block на BongaCams">
      <h2 className="text-2xl font-bold mb-6">Обязательные настройки безопасности (Settings)</h2>

      <p className="text-lg leading-relaxed">
        Перед каждым стримом необходимо зайти в раздел <strong>SETTINGS</strong> и настроить два обязательных параметра: <strong>DMCA Security</strong> и <strong>GEO Block</strong>.
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/Settings.png"
          alt="Раздел SETTINGS на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Включение DMCA (Защита контента)</h3>

      <p className="text-lg leading-relaxed">
        DMCA-защита предотвращает несанкционированную запись и распространение ваших трансляций.
      </p>

      <p className="text-lg leading-relaxed mt-4 font-semibold">Как включить:</p>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4">
        <li>В правом верхнем углу блока DMCA переключить ползунок в положение <strong>ON</strong>.</li>
        <li>Выбрать иконку DMCA — рекомендуется небольшая, например, <strong>вариант №4</strong>.</li>
        <li>Внизу нажать кнопку <strong>«Update Settings»</strong> (Применить изменения).</li>
      </ol>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/DMCA.png"
          alt="Настройка DMCA-защиты на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Региональная блокировка (GEO Block)</h3>

      <p className="text-lg leading-relaxed">
        Геоблокировка скрывает трансляцию от зрителей из указанных стран. Это защищает модель от нежелательной аудитории и снижает риск узнавания.
      </p>

      <p className="text-lg leading-relaxed mt-4 font-semibold">Как настроить:</p>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4">
        <li>Ввести в поле и <strong>заблокировать 3 страны</strong>:</li>
      </ol>

      <ul className="list-disc list-inside space-y-2 text-lg ml-10 mt-3">
        <li><strong>Россия</strong> (Russian Federation)</li>
        <li><strong>Беларусь</strong> (Belarus)</li>
        <li><strong>Украина</strong> (Ukraine)</li>
      </ul>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/bongacams-screens/GEO Block.png"
          alt="Настройка геоблокировки на BongaCams"
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>

      <ol className="list-decimal list-inside space-y-3 text-lg ml-4 mt-4" start={2}>
        <li>Нажать <strong>«Update Settings»</strong> (Применить изменения).</li>
        <li>В левом верхнем углу блока переключить ползунок <strong>Geo-blocking</strong> в положение <strong>ON</strong> для физического включения блокировки.</li>
      </ol>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-3">⚠️ Критически важно</h4>
        <p className="text-base leading-relaxed">
          Проверяйте GEO Block перед <strong>каждым стримом</strong>. Если геоблокировка не включена, трансляцию могут увидеть зрители из стран, которые вы хотите исключить. Это прямой риск для безопасности и анонимности модели.
        </p>
      </div>
    </ArticlePage>
  );
}