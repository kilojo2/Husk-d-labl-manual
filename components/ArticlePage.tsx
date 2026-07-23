import type { ReactNode } from "react";

interface ArticlePageProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ArticlePage({ title, description, children }: ArticlePageProps) {
  return (
    <article>
      {/* Title section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-base text-text-secondary leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="prose-custom">
        {children}
      </div>
    </article>
  );
}
