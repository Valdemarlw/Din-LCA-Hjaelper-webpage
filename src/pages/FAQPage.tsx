import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { faqCategories, getAllFaqs } from "../data/faqs";
import { ChevronDown } from "lucide-react";

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

export function FAQPage() {
  const allFaqs = getAllFaqs();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://dinlcahjælper.dk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://dinlcahjælper.dk/faq",
      },
    ],
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>
          Ofte stillede spørgsmål om LCA-beregning — Din LCA Hjælper
        </title>
        <meta
          name="description"
          content="Svar på de mest stillede spørgsmål om LCA-beregning for byggeri i Danmark. Lovkrav, grænseværdier, priser, proces, materialer og meget mere."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/faq" />
        <meta
          property="og:title"
          content="Ofte stillede spørgsmål om LCA-beregning — Din LCA Hjælper"
        />
        <meta
          property="og:description"
          content="Svar på de mest stillede spørgsmål om LCA-beregning for byggeri i Danmark."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Forside
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">FAQ</li>
            </ol>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ofte stillede spørgsmål
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-body max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Alt hvad du skal vide om LCA-beregning for byggeri i Danmark —
            lovkrav, grænseværdier, priser, proces og materialer.
          </motion.p>

          {/* Category nav */}
          <motion.nav
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {faqCategories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy hover:border-primary hover:text-primary transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </motion.nav>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.div
            className="space-y-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {faqCategories.map((category) => (
              <motion.div key={category.slug} id={category.slug} variants={fadeUp}>
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-2">
                  {category.title}
                </h2>
                <p className="text-muted mb-6">{category.description}</p>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {category.faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-body mb-6">
              Har du et spørgsmål, vi ikke har besvaret?
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md"
            >
              Kontakt os
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
