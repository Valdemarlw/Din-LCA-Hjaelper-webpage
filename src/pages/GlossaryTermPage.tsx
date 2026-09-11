import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { getGlossaryTerm, glossaryTerms } from "../data/glossary";
import { getBlogPost } from "../data/blogPosts";
import { buildSeoTitle } from "../lib/seoTitles";
import { RenderSection } from "../components/content/RenderSection";
import { FAQList } from "../components/ui/FAQList";
import { CtaPanel } from "../components/ui/CtaPanel";
import { PageHero } from "../components/ui/PageHero";

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

  const seoTitle = term.metaTitle
    ? buildSeoTitle(term.metaTitle)
    : `${term.term} | LCA-ordbog | Din LCA Hjælper`;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={term.shortDefinition} />
        <link
          rel="canonical"
          href={`https://dinlcahjælper.dk/ordbog/${term.slug}`}
        />
        <meta
          property="og:title"
          content={seoTitle}
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

      <article>
        <PageHero
          width="narrow"
          crumbs={[
            { label: "Forside", to: "/" },
            { label: "Viden", to: "/viden" },
            { label: "LCA-ordbog", to: "/ordbog" },
            { label: term.term },
          ]}
          title={term.term}
        >
          <div className="mt-7 rounded-sheet bg-mist p-5 md:p-6">
            <p className="text-lg font-medium leading-relaxed text-ink">{term.shortDefinition}</p>
          </div>
        </PageHero>

        <div className="bg-paper pb-20 md:pb-28">
          <div className="mx-auto max-w-[46rem] px-5 md:px-8">
            <div>
              {term.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold md:text-2xl">Relaterede begreber</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      to={`/ordbog/${r.slug}`}
                      className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-green hover:text-green"
                    >
                      {r.term}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold md:text-2xl">Læs mere</h2>
                <div className="mt-4 border-t border-line">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post!.slug}
                      to={`/blog/${post!.slug}`}
                      className="group block border-b border-line py-4 font-medium text-ink transition-colors hover:text-green"
                    >
                      {post!.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {term.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ofte stillede spørgsmål</h2>
                <FAQList items={term.faqs} />
              </section>
            )}

            <CtaPanel
              className="mt-16"
              title="Har du brug for en LCA-beregning?"
              text="Vi håndterer hele processen, fra tidlig fase til myndighedsklar rapport. Et typisk enfamiliehus koster 5.000-7.000 kr ekskl. moms."
              cta="Få et tilbud"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
