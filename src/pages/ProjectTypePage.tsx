import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getProjectType, type ProjectType } from "../data/projectTypes";
import { referenceProjects } from "../data/referenceProjects";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";
import { ArrowRight, CheckCircle } from "lucide-react";

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
        <title>{pt.title} — Din LCA Hjælper</title>
        <meta name="description" content={pt.description} />
        <link rel="canonical" href={`https://dinlcahjælper.dk/lca-beregning/${pt.slug}`} />
        <meta property="og:title" content={`${pt.title} — Din LCA Hjælper`} />
        <meta property="og:description" content={pt.description} />
        <meta property="og:url" content={`https://dinlcahjælper.dk/lca-beregning/${pt.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30">
        <div className="py-16 md:py-24 lg:py-28">
          <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-3xl px-5 md:px-8 relative">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted">
                <li><Link to="/" className="hover:text-primary transition-colors">Forside</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/viden" className="hover:text-primary transition-colors">Viden</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/lca-beregning" className="hover:text-primary transition-colors">Bygningstyper</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-navy font-medium">{pt.title.replace("LCA-beregning for ", "")}</li>
              </ol>
            </nav>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-navy leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {pt.title}
            </motion.h1>

            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-navy">
                Grænseværdi: {pt.grensevaerdi} kg CO₂e/m²/år
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-alt px-3 py-1 text-sm font-medium text-muted">
                A4+A5: {pt.a45Grense}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="bg-bg pb-20 md:pb-28">
          <motion.div className="mx-auto max-w-3xl px-5 md:px-8" variants={fadeUp} initial="hidden" animate="visible">
            <div>
              {pt.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {relatedProjects.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                  Se et referenceprojekt
                </h2>
                <div className="space-y-4">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.slug}
                      to={`/referenceprojekter/${rp.slug}`}
                      className="group block rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                              <CheckCircle size={12} />
                              {rp.status}
                            </span>
                            <span className="text-sm text-muted">{rp.location}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-navy group-hover:text-primary transition-colors">
                            {rp.title}
                          </h3>
                          <p className="mt-1 text-sm text-body line-clamp-2">
                            {rp.description}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <span className="text-muted">
                              Resultat: <span className="font-semibold text-green-600">{rp.resultat}</span> vs. grænse {rp.graensevaerdi}
                            </span>
                          </div>
                        </div>
                        <ArrowRight size={20} className="shrink-0 text-muted mt-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {pt.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">Ofte stillede spørgsmål</h2>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {pt.faqs.map((faq) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 rounded-2xl bg-primary-light p-8 md:p-10 text-center">
              <h2 className="text-2xl font-semibold text-navy">Klar til at komme i gang?</h2>
              <p className="mt-3 text-body max-w-lg mx-auto">
                Send os dine tegninger, så giver vi et fast tilbud inden 24 timer. Priser fra 3.500 kr inkl. A45-adgang.
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
