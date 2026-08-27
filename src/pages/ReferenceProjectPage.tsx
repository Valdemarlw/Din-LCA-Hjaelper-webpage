import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { getReferenceProject } from "../data/referenceProjects";
import { Button } from "../components/ui/Button";
import { RenderSection, FAQItem } from "../components/content/RenderSection";
import { MapPin, CheckCircle, Info, AlertTriangle, ArrowRight } from "lucide-react";
import { buildSeoTitle } from "../lib/seoTitles";
import { buildReferenceProjectSchemas } from "../lib/referenceProjectSeo";

export function ReferenceProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getReferenceProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/referenceprojekter" replace />;
  }

  const seoTitle = buildSeoTitle(project.metaTitle ?? project.title);

  const schemas = buildReferenceProjectSchemas(project);
  const statusTone = project.statusTone ?? "success";
  const statusStyle = {
    success: "bg-green-50 text-green-700",
    info: "bg-blue-50 text-blue-700",
    warning: "bg-amber-50 text-amber-800",
  }[statusTone];
  const StatusIcon = statusTone === "success" ? CheckCircle : statusTone === "warning" ? AlertTriangle : Info;
  const metrics = project.metrics ?? [
    ...(project.foer ? [{ label: "Før", value: project.foer, unit: "kg CO₂e/m²/år", tone: "negative" as const }] : []),
    ...(project.resultat ? [{ label: "Resultat", value: project.resultat, unit: "kg CO₂e/m²/år", tone: "positive" as const }] : []),
    ...(project.graensevaerdi ? [{ label: "Grænseværdi", value: project.graensevaerdi, unit: "kg CO₂e/m²/år", tone: "neutral" as const }] : []),
    ...(project.reduktion ? [{ label: "Reduktion", value: project.reduktion, tone: "primary" as const }] : []),
    ...(project.etageareal ? [{ label: "Etageareal", value: project.etageareal, tone: "neutral" as const }] : []),
  ];
  const metricTone = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-navy",
    primary: "text-primary",
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://dinlcahjælper.dk/referenceprojekter/${project.slug}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={`https://dinlcahjælper.dk/referenceprojekter/${project.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="da_DK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={project.description} />
        <script type="application/ld+json">{JSON.stringify(schemas.article)}</script>
        <script type="application/ld+json">{JSON.stringify(schemas.breadcrumb)}</script>
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
                <li className="text-navy font-medium truncate max-w-[200px]">{project.title.split(", ")[0]}</li>
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
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${statusStyle}`}>
                <StatusIcon size={14} />
                {project.status}
              </span>
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-body"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {project.description}
            </motion.p>

            {/* Key metrics */}
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-white p-4 text-center">
                  <p className="text-sm text-muted">{metric.label}</p>
                  <p className={`text-xl font-bold ${metricTone[metric.tone ?? "neutral"]}`}>{metric.value}</p>
                  {metric.unit && <p className="text-xs text-muted">{metric.unit}</p>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-bg pb-20 md:pb-28">
          <motion.div className="mx-auto max-w-3xl px-5 md:px-8" variants={fadeUp} initial="hidden" animate="visible">
            {project.journey && (
              <section aria-labelledby="journey-heading" className="pt-12 md:pt-16">
                <h2 id="journey-heading" className="text-2xl md:text-3xl font-semibold text-navy mb-6">
                  Beregningens forløb
                </h2>
                <ol className="grid gap-4 md:grid-cols-2">
                  {project.journey.map((step, index) => (
                    <li key={step.label} className="relative rounded-xl border border-border bg-white p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-primary">{index + 1}. {step.label}</p>
                        {index < project.journey!.length - 1 && <ArrowRight aria-hidden="true" size={16} className="hidden text-muted md:block" />}
                      </div>
                      <p className="mt-2 text-2xl font-bold text-navy">{step.value}</p>
                      <p className="mt-2 text-sm leading-relaxed text-body">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
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
                Send os dine tegninger, så laver vi en tidlig LCA-beregning med hotspot-analyse og giver en fast pris.
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
