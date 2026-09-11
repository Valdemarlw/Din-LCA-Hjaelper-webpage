import { Link } from "react-router-dom";
import type { BlogSection } from "../../data/blogPosts";

const linkCls =
  "text-green underline decoration-green/40 underline-offset-2 transition-colors hover:decoration-green";

export function InlineLinks({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, linkText, url] = match;
          if (url.startsWith("/")) {
            return (
              <Link key={i} to={url} className={linkCls}>
                {linkText}
              </Link>
            );
          }
          return (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={linkCls}>
              {linkText}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/** Renders one block of structured article content with the site's editorial styles. */
export function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading2":
      return (
        <h2 className="mb-4 mt-12 text-2xl font-bold leading-tight md:text-3xl">{section.text}</h2>
      );
    case "heading3":
      return <h3 className="mb-3 mt-8 text-xl font-semibold md:text-2xl">{section.text}</h3>;
    case "paragraph":
      return (
        <p className="mb-5 leading-[1.7] text-body">
          <InlineLinks text={section.text || ""} />
        </p>
      );
    case "list":
      return (
        <ul className="mb-5 list-disc space-y-2 pl-5 leading-relaxed text-body marker:text-green">
          {section.items?.map((item, i) => (
            <li key={i}>
              <InlineLinks text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mb-8 overflow-x-auto rounded-xl ring-1 ring-line">
          <table className="w-full border-collapse text-[15px]">
            {section.headers && (
              <thead>
                <tr className="bg-green text-left text-white">
                  {section.headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className="border-t border-line even:bg-paper">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 align-top text-body">
                      <InlineLinks text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
