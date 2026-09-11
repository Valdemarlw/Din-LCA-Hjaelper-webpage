import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { getProjectType, type ProjectType } from "../data/projectTypes";
import { referenceProjects } from "../data/referenceProjects";
import { RenderSection } from "../components/content/RenderSection";
import { FAQList } from "../components/ui/FAQList";
import { CtaPanel } from "../components/ui/CtaPanel";
import { PageHero } from "../components/ui/PageHero";
import { Tag } from "../components/ui/Tag";
import { statusTagTone, statusToneOf } from "../lib/statusTone";

function buildSchema(pt: ProjectType) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pt.title,
    description: pt.description,
    provider: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: "https://dinlcahjælper.dk",
    },
    areaServed: { "@type": "Country", name: "Denmark" },
    url: `https://dinlcahjælper.dk/lca-beregning/${pt.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://dinlcahjælper.dk" },
      { "@type": "ListItem", position: 2, name: "Viden", item: "https://dinlcahjælper.dk/viden" },
      { "@type": "ListItem", position: 3, name: "Bygningstyper", item: "https://dinlcahjælper.dk/lca-beregning" },
      { "@type": "ListItem", position: 4, name: pt.title, item: `https://dinlcahjælper.dk/lca-beregning/${pt.slug}` },
    ],
  };

  const faqSchema = pt.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: pt.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return { serviceSchema, breadcrumbSchema, faqSchema };
}

export function ProjectTypePage() {
  const { slug } = useParams<{ slug: string }>();
  const pt = slug ? getProjectType(slug) : undefined;

  if (!pt) {
    return <Navigate to="/lca-beregning" replace />;
  }

  const { serviceSchema, breadcrumbSchema, faqSchema } = buildSchema(pt);
  const relatedProjects = referenceProjects.filter((rp) => rp.relatedProjectType === pt.slug);

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{`${pt.title} | Din LCA Hjælper`}</title>
        <meta name="description" content={pt.description} />
        <link rel="canonical" href={`https://dinlcahjælper.dk/lca-beregning/${pt.slug}`} />
        <meta property="og:title" content={`${pt.title} | Din LCA Hjælper`} />
        <meta property="og:description" content={pt.description} />
        <meta property="og:url" content={`https://dinlcahjælper.dk/lca-beregning/${pt.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article>
        <PageHero
          width="narrow"
          crumbs={[
            { label: "Forside", to: "/" },
            { label: "Viden", to: "/viden" },
            { label: "Bygningstyper", to: "/lca-beregning" },
            { label: pt.title.replace("LCA-beregning for ", "") },
          ]}
          title={pt.title}
        >
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag tone="mist">Grænseværdi: {pt.grensevaerdi} kg CO₂e/m²/år</Tag>
            <Tag tone="outline">A4+A5: {pt.a4a5Grense}</Tag>
          </div>
        </PageHero>

        <div className="bg-paper pb-20 md:pb-28">
          <div className="mx-auto max-w-[46rem] px-5 md:px-8">
            <div>
              {pt.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {relatedProjects.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold md:text-2xl">Se et referenceprojekt</h2>
                <div className="mt-5 space-y-4">
                  {relatedProjects.map((rp) => {
                    const tone = statusToneOf(rp);
                    return (
                      <Link
                        key={rp.slug}
                        to={`/referenceprojekter/${rp.slug}`}
                        className="group block rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Tag tone={statusTagTone[tone]}>{rp.status}</Tag>
                          <span className="text-sm text-muted">{rp.location}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-green">
                          {rp.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-body">{rp.description}</p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                          {(rp.metrics?.slice(0, 2) ?? []).map((metric) => (
                            <span key={metric.label}>
                              {metric.label}: <span className="font-semibold text-ink">{metric.value}</span>
                            </span>
                          ))}
                          {!rp.metrics && rp.resultat && (
                            <span>
                              Resultat: <span className="font-semibold text-green">{rp.resultat}</span>
                              {rp.graensevaerdi && ` vs. grænse ${rp.graensevaerdi}`}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {pt.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ofte stillede spørgsmål</h2>
                <FAQList items={pt.faqs} />
              </section>
            )}

            <CtaPanel
              className="mt-16"
              title="Klar til at komme i gang?"
              text="Send os dine tegninger, så giver vi et fast tilbud inden 24 timer. A4/A5 er inkluderet."
              cta="Få et tilbud"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
