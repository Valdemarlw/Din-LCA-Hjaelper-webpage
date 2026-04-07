import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getReferenceProject } from "../data/referenceProjects";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";
import { MapPin, CheckCircle } from "lucide-react";

export function ReferenceProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getReferenceProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/referenceprojekter" replace />;
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Organization",
      name: "Din LCA Hjælper",
      url: "https://dinlcahjælper.dk",
    },
    about: {
      "@type": "Service",
      name: "LCA-beregning",
      provider: {
        "@type": "Organization",
        name: "Din LCA Hjælper",
      },
    },
    url: `https://dinlcahjælper.dk/referenceprojekter/${project.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://dinlcahjælper.dk" },
      { "@type": "ListItem", position: 2, name: "Viden", item: "https://dinlcahjælper.dk/viden" },
      { "@type": "ListItem", position: 3, name: "Referenceprojekter", item: "https://dinlcahjælper.dk/referenceprojekter" },
      { "@type": "ListItem", position: 4, name: project.title, item: `https://dinlcahjælper.dk/referenceprojekter/${project.slug}` },
    ],
  };

  const faqSchema =
    project.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: project.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{project.title} — Din LCA Hjælper</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://dinlcahjælper.dk/referenceprojekter/${project.slug}`} />
        <meta property="og:title" content={`${project.title} — Din LCA Hjælper`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={`https://dinlcahjælper.dk/referenceprojekter/${project.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(creativeWorkSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30">
        {/* Hero */}
        <div className="py-16 md:py-24 lg:py-28">
          <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="mx-auto max-w-3xl px-5 md:px-8 relative">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-muted">
                <li><Link to="/" className="hover:text-primary transition-colors">Forside</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/viden" className="hover:text-primary transition-colors">Viden</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/referenceprojekter" className="hover:text-primary transition-colors">Referenceprojekter</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-navy font-medium truncate max-w-[200px]">{project.title.split(" — ")[0]}</li>
              </ol>
            </nav>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-navy leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h1>

            <motion.div
              className="mt-4 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-navy">
                {project.type}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-alt px-3 py-1 text-sm text-muted">
                <MapPin size={14} />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                <CheckCircle size={14} />
                {project.status}
              </span>
            </motion.div>

            {/* Key metrics */}
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {project.foer && (
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="text-sm text-muted">Før</p>
                  <p className="text-xl font-bold text-red-600">{project.foer}</p>
                  <p className="text-xs text-muted">kg CO₂e/m²/år</p>
                </div>
              )}
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="text-sm text-muted">Resultat</p>
                <p className="text-xl font-bold text-green-600">{project.resultat}</p>
                <p className="text-xs text-muted">kg CO₂e/m²/år</p>
              </div>
              <div className="rounded-xl border border-border bg-white p-4 text-center">
                <p className="text-sm text-muted">Grænseværdi</p>
                <p className="text-xl font-bold text-navy">{project.graensevaerdi}</p>
                <p className="text-xs text-muted">kg CO₂e/m²/år</p>
              </div>
              {project.reduktion && (
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="text-sm text-muted">Reduktion</p>
                  <p className="text-xl font-bold text-primary">{project.reduktion}</p>
                </div>
              )}
              {project.etageareal && !project.reduktion && (
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="text-sm text-muted">Etageareal</p>
                  <p className="text-xl font-bold text-navy">{project.etageareal}</p>
                </div>
              )}
              {project.etageareal && project.reduktion && (
                <div className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="text-sm text-muted">Etageareal</p>
                  <p className="text-xl font-bold text-navy">{project.etageareal}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-bg pb-20 md:pb-28">
          <motion.div className="mx-auto max-w-3xl px-5 md:px-8" variants={fadeUp} initial="hidden" animate="visible">
            <div>
              {project.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {/* FAQ Section */}
            {project.faqs.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">Ofte stillede spørgsmål</h2>
                <div className="rounded-2xl border border-border bg-white px-6 md:px-8">
                  {project.faqs.map((faq) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 rounded-2xl bg-primary-light p-8 md:p-10 text-center">
              <h2 className="text-2xl font-semibold text-navy">
                Har du et lignende projekt?
              </h2>
              <p className="mt-3 text-body max-w-lg mx-auto">
                Send os dine tegninger, så laver vi en tidlig LCA-beregning med hotspot-analyse. Priser fra 3.500 kr.
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
