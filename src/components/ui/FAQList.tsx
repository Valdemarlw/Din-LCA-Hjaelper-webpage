import { useId, useState } from "react";

export type FAQEntry = { question: string; answer: string };

/*
 * The answer stays in the DOM (crawlers and find-in-page read it). The row
 * opens with a grid-rows transition, so no animation library is needed.
 */
function FAQRow({ question, answer }: FAQEntry) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-t border-line last:border-b">
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="group flex w-full items-start justify-between gap-6 py-5 text-left text-[17px] font-semibold leading-snug text-ink md:text-lg"
          aria-expanded={open}
          aria-controls={id}
        >
          <span className="transition-colors group-hover:text-green">{question}</span>
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-green transition-[rotate,background-color] duration-200 ease-out group-hover:bg-green-soft ${
              open ? "rotate-45 bg-green-soft" : ""
            }`}
          >
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="max-w-[68ch] pb-6 leading-relaxed text-body">{answer}</p>
        </div>
      </div>
    </div>
  );
}

type FAQListProps = {
  items: FAQEntry[];
  className?: string;
  /** Kept for call sites; rows no longer stagger in. */
  animate?: boolean;
};

export function FAQList({ items, className = "" }: FAQListProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <FAQRow key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
