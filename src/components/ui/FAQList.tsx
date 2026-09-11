import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RevealGroup, RevealItem } from "../motion/Reveal";

export type FAQEntry = { question: string; answer: string };

function FAQRow({ question, answer }: FAQEntry) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        aria-expanded={open}
      >
        <h3 className="text-[17px] font-semibold leading-snug text-ink md:text-lg">{question}</h3>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`mt-0.5 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-[68ch] pb-6 leading-relaxed text-body">{answer}</p>
      </motion.div>
    </div>
  );
}

type FAQListProps = {
  items: FAQEntry[];
  className?: string;
  /** Stagger the rows in as the list scrolls into view. */
  animate?: boolean;
};

export function FAQList({ items, className = "", animate = false }: FAQListProps) {
  if (!animate) {
    return (
      <div className={className}>
        {items.map((item) => (
          <FAQRow key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    );
  }
  return (
    <RevealGroup className={className} stagger={0.07}>
      {items.map((item) => (
        <RevealItem key={item.question} y={16}>
          <FAQRow question={item.question} answer={item.answer} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
