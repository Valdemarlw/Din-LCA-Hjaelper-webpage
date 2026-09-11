import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
          className={`mt-0.5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-[68ch] pb-6 leading-relaxed text-body">{answer}</p>
      </motion.div>
    </div>
  );
}

export function FAQList({ items, className = "" }: { items: FAQEntry[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <FAQRow key={item.question} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
