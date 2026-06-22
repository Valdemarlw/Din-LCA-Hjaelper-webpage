import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getComparison } from "../data/comparisons";
import { glossaryTerms } from "../data/glossary";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";

export function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = slug ? getComparison(slug) : undefined;

  if (!comparison) {
    return <Navigate to="/viden" replace />;
  }

  const url = `https://dinlcahjælper.dk/sammenligninger/${comparison.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.metaDescription,
    datePublished: comparison.date,
    dateModified: comparison.date,
    author: {
      "@type": "Person",
      name: "Valdemar Løvschal Wernblad",
    },
    publisher: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: "https://dinlcahjælper.dk",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: {
      "@type": "SoftwareApplication",
      name: "LCAbyg",
      applicationCategory: "BuildingLifeCycleAssessment",
      operatingSystem: "Windows, macOS",
      url: "https://www.build.aau.dk/lcabyg",
    },
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
        name: "Viden",
        item: "https://dinlcahjælper.dk/viden",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sammenligninger",
        item: "https://dinlcahjælper.dk/viden#sammenligninger",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: comparison.title,
        item: url,
      },
    ],
  };

  const faqSchema =
    comparison.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: comparison.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const related = comparison.relatedTerms
    .map((s) => glossaryTerms.find((t) => t.slug === s))
    .filter(Boolean) as typeof glossaryTerms;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{`${comparison.metaTitle} | Din LCA Hjælper`}</title>
        <meta name="description" content={comparison.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={comparison.metaTitle} />
        <meta property="og:description" content={comparison.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <article className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30">
        {/* Hero */}
        <div className="py-16 md:py-24 lg:py-28">
          <div className="absolute left-0 top-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-3xl px-5 md:px-8 relative">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Forside
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to="/viden"
                    className="hover:text-primary transition-colors"
                  >
                    Viden
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-navy font-medium truncate max-w-[260px]">
                  vs. {comparison.alternativeName}
                </li>
              </ol>
            </nav>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-navy leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {comparison.title}
            </motion.h1>

            {/* Short intro callout */}
            <motion.div
              className="mt-6 rounded-xl bg-primary-light border border-primary/10 p-5 md:p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="text-body leading-relaxed font-medium">
                {comparison.shortIntro}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-bg pb-20 md:pb-28">
          <motion.div
            className="mx-auto max-w-3xl px-5 md:px-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div>
              {comparison.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {/* Related glossary terms */}
            {related.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-4">
                  Relaterede begreber
                </h2>
                <div className="flex flex-wrap gap-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/ordbog/${r.slug}`}
                      className="inline-flex items-center rounded-full bg-white border border-border px-4 py-2 text-sm font-medium text-navy hover:bg-primary-light hover:border-primary/20 transition-colors"
                    >
                      {r.term}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {comparison.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                  Ofte stillede spørgsmål
                </h2>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {comparison.faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-primary-light p-8 md:p-10 text-center">
              <h2 className="text-2xl font-semibold text-navy">
                Vil du have LCA-beregningen ud af hænderne?
              </h2>
              <p className="mt-3 text-body max-w-lg mx-auto">
                Send tegninger og konstruktionsbeskrivelser, så får du et fast
                tilbud inden 24 timer. Priser fra 4.000 kr.
              </p>
              <div className="mt-6">
                <Button to="/kontakt">Få et tilbud</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </motion.div>
  );
}
