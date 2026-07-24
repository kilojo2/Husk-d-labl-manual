import ArticlePage from "@/components/ArticlePage";

export const metadata = {
  title: "Типы юзеров — Flirt4Free",
  description: "Обзор типов пользователей на Flirt4Free: Guest, Member, Levels",
};

export default function Page() {
  return (
    <ArticlePage title="Типы юзеров" description="Обзор типов пользователей на Flirt4Free: Guest, Member, Levels">
      <h2 className="text-2xl font-bold mb-6">Типы юзеров аудитории</h2>

      <p className="text-lg leading-relaxed">
        На Flirt4Free существуют <strong>три категории пользователей</strong>, различающихся по правам и платёжеспособности.
      </p>

      <h3 className="text-xl font-semibold mt-10 mb-4">1. Незарегистрированные (Guest)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Пользователи без регистрации.</li>
        <li>Могут только <strong>смотреть эфир</strong>.</li>
        <li>Писать в чат и тратить кредиты им <strong>недоступно</strong>.</li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-4 ml-4">
        <p className="text-base"><strong>💡 Совет:</strong> Проси их написать в чат, чтобы мотивировать зарегистрироваться.</p>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">2. Базовый (Member)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>Зарегистрированные пользователи, составляющие <strong>большинство аудитории</strong>.</li>
        <li>Могут <strong>писать в чат</strong>, покупать кредиты и участвовать в шоу.</li>
      </ul>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 my-4 ml-4">
        <p className="text-base"><strong>💡 Совет:</strong> Активно поощряй их чаевые и участие в эфире.</p>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">3. Уровни (Levels)</h3>
      <ul className="list-disc list-inside space-y-2 text-lg ml-4 mt-4">
        <li>У каждого зарегистрированного юзера есть <strong>уровень</strong>.</li>
        <li>Чем выше уровень, тем больше средств юзер <strong>уже потратил</strong> и может потратить в будущем.</li>
      </ul>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 my-4 ml-4">
        <p className="text-base"><strong>⚠️ Ключевое правило:</strong> Уделяй максимум внимания юзерам с высокими уровнями, так как они вкладываются больше остальных.</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">📊 Стратегия взаимодействия</h4>
        <ul className="space-y-2 text-base">
          <li>• <strong>Guest</strong> → мотивируй зарегистрироваться фразами «напиши мне в чат»</li>
          <li>• <strong>Member</strong> → активно общайся, поощряй небольшие чаевые</li>
          <li>• <strong>High Level</strong> → максимальное внимание, персональные предложения, VIP-отношение</li>
        </ul>
      </div>
    </ArticlePage>
  );
}