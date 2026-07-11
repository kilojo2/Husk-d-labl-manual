import ArticlePage from '@/components/ArticlePage';
import Image from 'next/image';

export const metadata = {
  title: 'Мануал по LiveJasmin',
  description: 'Подготовка к работе, установка FastProxy для РФ, вход в аккаунт и настройка трансляции на LiveJasmin',
};

export default function Page() {
  return (
    <ArticlePage title="Мануал по LiveJasmin" description="Подготовка, вход, настройка трансляции">
      <nav className="my-6 p-4 bg-muted rounded-lg">
        <h2 className="font-bold mb-2">ОГЛАВЛЕНИЕ</h2>
        <ol className="list-decimal pl-6 space-y-1">
          <li><a href="#preparation" className="hover:underline">Подготовка к работе</a></li>
          <li><a href="#login" className="hover:underline">Вход в аккаунт</a></li>
          <li><a href="#broadcast" className="hover:underline">Настройка трансляции</a></li>
        </ol>
      </nav>

      <h2 id="preparation">Подготовка к работе</h2>
      
      <h3>Для пользователей из РФ</h3>
      <p>
        Перед входом на сайт необходимо установить расширение <strong>FastProxy</strong>, так как LiveJasmin может быть недоступен без использования прокси.
      </p>

      <h3>Установка FastProxy</h3>
      
      <p>
        Переходим в <strong>Яндекс Диск</strong> выбираем «FastProxyOnline_17_Chrome_Release» и нажимаем «Скачать»
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live1.png"
          alt="Скачивание FastProxy из Яндекс Диска"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <p>
        Распаковываем Zip-Архив куда нам удобно.
      </p>

      <p>
        Открываем <strong>ShineBrowser</strong>, находим справа сверху 3 вертикальные точки, нажимаем «Расширения» и потом «Управление расширениями»
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live2.png"
          alt="Переход в Расширения → Управление расширениями"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live3.png"
          alt="Меню Управление расширениями"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <p>
        Справа сверху нажимаем <strong>«Режим разработчика»</strong>
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live4.png"
          alt="Включение режима разработчика"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <p>
        И нажимаем <strong>«Загрузить распакованное расширение»</strong> и выбираем папку «FastProxyOnline_17_Chrome_Release»
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live5.png"
          alt="Загрузка распакованного расширения"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <h2 id="login">Вход в аккаунт</h2>
      
      <p>
        Переходим на сайт <strong>LiveJasmin Model</strong> нажимаем справа сверху «Войти»
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live6.png"
          alt="Кнопка входа на LiveJasmin Model"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <p>
        И входим в аккаунт по данным модели из анкеты
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live7.png"
          alt="Форма входа в аккаунт"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <h2 id="broadcast">Настройка трансляции</h2>
      
      <p>
        Листаем главную страницу <strong>«LiveJasmin'а»</strong> чуть ниже и находим «В онлайн сейчас»
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live8.png"
          alt="Переход к разделу В онлайн сейчас"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>

      <p>
        И дальше ставим настройки по скрину ниже
      </p>

      <div className="my-6 overflow-hidden rounded-2xl border border-border/50">
        <Image
          src="/livejasmin-screens/Live9.png"
          alt="Настройки трансляции"
          width={1200}
          height={800}
          className="w-full"
        />
      </div>
    </ArticlePage>
  );
}
