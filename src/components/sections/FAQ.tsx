import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ChevronDown, ArrowRight } from "lucide-react";
import { getHomepageFaqs } from "../../data/faqs";

const faqs = getHomepageFaqs();

function FAQItem({ question, answer }: { question: string; answer: string }) {
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
          className={`shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
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

export function FAQ() {
  return (
    <SectionWrapper bg="alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-navy">
            Ofte stillede spørgsmål
          </h2>
          <p className="mt-4 text-lg text-muted">
            Alt hvad du skal vide om LCA-beregning for byggeri i Danmark.
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-border bg-white px-6 md:px-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {faqs.map((faq) => (
            <motion.div key={faq.question} variants={fadeUp}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Se alle spørgsmål
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
