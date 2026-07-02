interface ArticlePageProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function ArticlePage({ title, description, children }: ArticlePageProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-text-secondary">{description}</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-bg-surface p-8">
        {children ?? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="mb-4 h-12 w-12 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
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
