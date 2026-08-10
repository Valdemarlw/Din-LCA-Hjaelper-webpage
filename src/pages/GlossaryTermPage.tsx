import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getGlossaryTerm, glossaryTerms } from "../data/glossary";
import { getBlogPost } from "../data/blogPosts";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";
import { ArrowRight } from "lucide-react";

export function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const term = slug ? getGlossaryTerm(slug) : undefined;

  if (!term) {
    return <Navigate to="/ordbog" replace />;
  }

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDefinition,
    url: `https://dinlcahjælper.dk/ordbog/${term.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "LCA-ordbog",
      url: "https://dinlcahjælper.dk/ordbog",
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
        name: "LCA-ordbog",
        item: "https://dinlcahjælper.dk/ordbog",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: term.term,
        item: `https://dinlcahjælper.dk/ordbog/${term.slug}`,
      },
    ],
  };

  const faqSchema =
    term.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: term.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // Resolve related terms
  const related = term.relatedTerms
    .map((slug) => glossaryTerms.find((t) => t.slug === slug))
    .filter(Boolean) as typeof glossaryTerms;

  // Resolve related blog posts
  const relatedPosts = term.relatedBlogPosts
    .map((slug) => getBlogPost(slug))
    .filter(Boolean);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{`${term.term} | LCA-ordbog | Din LCA Hjælper`}</title>
        <meta name="description" content={term.shortDefinition} />
        <link
          rel="canonical"
          href={`https://dinlcahjælper.dk/ordbog/${term.slug}`}
        />
        <meta
          property="og:title"
          content={`${term.term} | LCA-ordbog | Din LCA Hjælper`}
        />
        <meta property="og:description" content={term.shortDefinition} />
        <meta
          property="og:url"
          content={`https://dinlcahjælper.dk/ordbog/${term.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(definedTermSchema)}
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
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
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
                <li>
                  <Link
                    to="/ordbog"
                    className="hover:text-primary transition-colors"
                  >
                    LCA-ordbog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-navy font-medium truncate max-w-[200px]">
                  {term.term}
                </li>
              </ol>
            </nav>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-navy leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {term.term}
            </motion.h1>

            {/* Short definition callout */}
            <motion.div
              className="mt-6 rounded-xl bg-primary-light border border-primary/10 p-5 md:p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <p className="text-body leading-relaxed font-medium">
                {term.shortDefinition}
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
              {term.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {/* Related terms */}
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

            {/* Related blog posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-4">
                  Læs mere
                </h2>
                <div className="space-y-3">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post!.slug}
                      to={`/blog/${post!.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-white p-4 md:p-5 transition-all duration-300 hover:shadow-md"
                    >
                      <span className="text-navy font-medium group-hover:text-primary transition-colors">
                        {post!.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-muted group-hover:text-primary transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {term.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                  Ofte stillede spørgsmål
                </h2>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {term.faqs.map((faq) => (
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
                Har du brug for en LCA-beregning?
              </h2>
              <p className="mt-3 text-body max-w-lg mx-auto">
                Vi håndterer hele processen, fra tidlig fase til myndighedsklar
                rapport. Et typisk enfamiliehus koster 5.000-7.000 kr ekskl. moms.
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
