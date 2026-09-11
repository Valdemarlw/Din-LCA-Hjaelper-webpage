import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { getComparison } from "../data/comparisons";
import { glossaryTerms } from "../data/glossary";
import { RenderSection } from "../components/content/RenderSection";
import { FAQList } from "../components/ui/FAQList";
import { CtaPanel } from "../components/ui/CtaPanel";
import { PageHero } from "../components/ui/PageHero";

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

      <article>
        <PageHero
          width="narrow"
          crumbs={[
            { label: "Forside", to: "/" },
            { label: "Viden", to: "/viden" },
            { label: `vs. ${comparison.alternativeName}` },
          ]}
          title={comparison.title}
        >
          <div className="mt-7 rounded-sheet bg-mist p-5 md:p-6">
            <p className="text-lg font-medium leading-relaxed text-ink">{comparison.shortIntro}</p>
          </div>
        </PageHero>

        <div className="bg-paper pb-20 md:pb-28">
          <div className="mx-auto max-w-[46rem] px-5 md:px-8">
            <div>
              {comparison.content.map((section, i) => (
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

            {comparison.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ofte stillede spørgsmål</h2>
                <FAQList items={comparison.faqs} />
              </section>
            )}

            <CtaPanel
              className="mt-16"
              title="Vil du have LCA-beregningen ud af hænderne?"
              text="Send tegninger og konstruktionsbeskrivelser, så får du et fast tilbud inden 24 timer. Et typisk enfamiliehus koster 5.000-7.000 kr ekskl. moms."
              cta="Få et tilbud"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
