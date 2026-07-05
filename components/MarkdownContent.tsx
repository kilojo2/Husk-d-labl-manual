export interface ContentBlock {
  type: "heading" | "subheading" | "paragraph" | "list" | "ordered-list" | "divider" | "note" | "link-block";
  text?: string;
  items?: string[];
  emoji?: string;
}

interface MarkdownContentProps {
  blocks: ContentBlock[];
}

function formatText(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function MarkdownContent({ blocks }: MarkdownContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-10 mb-5 text-3xl font-bold tracking-tight text-text-primary first:mt-0"
              >
                {block.emoji && <span className="mr-2">{block.emoji}</span>}
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={index}
                className="mt-8 mb-4 text-xl font-semibold text-text-primary"
              >
                {block.emoji && <span className="mr-2">{block.emoji}</span>}
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={index} className="text-[15px] leading-relaxed text-text-primary">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={index} className="ml-5 space-y-2.5">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-primary">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    <span>{formatText(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={index} className="ml-5 space-y-2.5">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-text-primary">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span>{formatText(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "divider":
            return (
              <hr key={index} className="my-10 border-border" />
            );

          case "note":
            return (
              <div
                key={index}
                className="rounded-2xl border border-accent/25 bg-accent/10 px-6 py-5"
              >
                <p className="text-sm font-semibold text-accent">💡 Важно</p>
                <p className="mt-2 text-[15px] leading-relaxed text-text-primary">
                  {block.text}
                </p>
              </div>
            );

          case "link-block":
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-bg-surface/50 px-6 py-5"
              >
                <p className="text-[15px] leading-relaxed text-text-primary">
                  {block.text}
                </p>
                {block.items?.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-accent transition-colors hover:text-accent-hover hover:underline"
                  >
                    {url}
                  </a>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
