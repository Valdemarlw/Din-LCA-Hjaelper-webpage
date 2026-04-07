import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BlogSection } from "../../data/blogPosts";

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
              <Link
                key={i}
                to={url}
                className="text-primary hover:text-primary-hover underline underline-offset-2"
              >
                {linkText}
              </Link>
            );
          }
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline underline-offset-2"
            >
              {linkText}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading2":
      return (
        <h2 className="text-2xl md:text-3xl font-semibold text-navy mt-10 mb-4">
          {section.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 className="text-xl md:text-2xl font-semibold text-navy mt-8 mb-3">
          {section.text}
        </h3>
      );
    case "paragraph":
      return (
        <p className="text-body leading-relaxed mb-4">
          <InlineLinks text={section.text || ""} />
        </p>
      );
    case "list":
      return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-body">
          {section.items?.map((item, i) => (
            <li key={i}>
              <InlineLinks text={item} />
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            {section.headers && (
              <thead>
                <tr className="bg-navy text-white">
                  {section.headers.map((header, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-bg-alt"}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-3 text-sm text-body border-t border-border"
                    >
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

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <h3 className="text-lg font-semibold text-navy">{question}</h3>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-body leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}
