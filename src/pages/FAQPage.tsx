import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { faqCategories, getAllFaqs } from "../data/faqs";
import { PageHero } from "../components/ui/PageHero";
import { FAQList } from "../components/ui/FAQList";
import { Button } from "../components/ui/Button";

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
          Ofte stillede spørgsmål om LCA-beregning | Din LCA Hjælper
        </title>
        <meta
          name="description"
          content="Svar på de mest stillede spørgsmål om LCA-beregning for byggeri i Danmark. Lovkrav, grænseværdier, priser, proces, materialer og meget mere."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/faq" />
        <meta
          property="og:title"
          content="Ofte stillede spørgsmål om LCA-beregning | Din LCA Hjælper"
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

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "FAQ" }]}
        title="Ofte stillede spørgsmål"
        lede="Alt hvad du skal vide om LCA-beregning for byggeri i Danmark: lovkrav, grænseværdier, priser, proces og materialer."
      >
        <nav aria-label="Kategorier" className="mt-8 flex flex-wrap gap-2">
          {faqCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-green hover:text-green"
            >
              {cat.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="space-y-16 md:space-y-20">
            {faqCategories.map((category) => (
              <div key={category.slug} id={category.slug} className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <h2 className="text-2xl font-bold leading-tight md:text-3xl">{category.title}</h2>
                    <p className="mt-3 text-body">{category.description}</p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <FAQList items={category.faqs} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start gap-5 rounded-sheet bg-mist p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <p className="text-lg text-ink">Har du et spørgsmål, vi ikke har besvaret?</p>
            <Button to="/kontakt">Kontakt os</Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
