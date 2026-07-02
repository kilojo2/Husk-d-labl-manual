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
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-8 mb-4 text-2xl font-bold tracking-tight text-text-primary first:mt-0"
              >
                {block.emoji && <span className="mr-2">{block.emoji}</span>}
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={index}
                className="mt-6 mb-3 text-xl font-semibold text-text-primary"
              >
                {block.emoji && <span className="mr-2">{block.emoji}</span>}
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={index} className="leading-relaxed text-text-primary">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={index} className="ml-6 space-y-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="list-disc leading-relaxed text-text-primary marker:text-accent">
                    {formatText(item)}
                  </li>
                ))}
              </ul>
            );

          case "ordered-list":
            return (
              <ol key={index} className="ml-6 space-y-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="list-decimal leading-relaxed text-text-primary marker:text-accent">
                    {formatText(item)}
                  </li>
                ))}
              </ol>
            );

          case "divider":
            return (
              <hr key={index} className="my-8 border-border" />
            );

          case "note":
            return (
              <div
                key={index}
                className="rounded-lg border border-accent/20 bg-accent/5 px-5 py-4"
              >
                <p className="text-sm font-medium text-accent">💡 Важно</p>
                <p className="mt-1 leading-relaxed text-text-primary">
                  {block.text}
                </p>
              </div>
            );

          case "link-block":
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-bg-surface/50 px-5 py-4"
              >
                <p className="leading-relaxed text-text-primary">
                  {block.text}
                </p>
                {block.items?.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block break-all text-accent hover:text-accent-light hover:underline"
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
