interface ArticlePageProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function ArticlePage({ title, description, children }: ArticlePageProps) {
  return (
    <article className="mx-auto max-w-7xl">
      {/* Title section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-text-primary md:text-5xl md:leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-text-secondary md:text-xl">
            {description}
          </p>
        )}
      </div>

      {/* Content card — Apple-style floating card */}
      <div className="apple-card p-8 md:p-12">
        {children ?? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg
              className="mb-4 h-14 w-14 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <p className="text-text-muted">
              Содержание будет добавлено на следующем этапе.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
