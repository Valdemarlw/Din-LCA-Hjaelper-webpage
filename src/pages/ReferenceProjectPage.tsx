import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { getReferenceProject } from "../data/referenceProjects";
import { RenderSection } from "../components/content/RenderSection";
import { FAQList } from "../components/ui/FAQList";
import { CtaPanel } from "../components/ui/CtaPanel";
import { PageHero } from "../components/ui/PageHero";
import { Tag } from "../components/ui/Tag";
import { buildSeoTitle } from "../lib/seoTitles";
import { buildReferenceProjectSchemas } from "../lib/referenceProjectSeo";
import { statusTagTone, statusToneOf } from "../lib/statusTone";

const metricTone = {
  positive: "text-green",
  negative: "text-brick",
  neutral: "text-ink",
  primary: "text-green",
};

export function ReferenceProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getReferenceProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/referenceprojekter" replace />;
  }

  const seoTitle = buildSeoTitle(project.metaTitle ?? project.title);
  const schemas = buildReferenceProjectSchemas(project);
  const tone = statusToneOf(project);
  const metrics = project.metrics ?? [
    ...(project.foer ? [{ label: "Før", value: project.foer, unit: "kg CO₂e/m²/år", tone: "negative" as const }] : []),
    ...(project.resultat ? [{ label: "Resultat", value: project.resultat, unit: "kg CO₂e/m²/år", tone: "positive" as const }] : []),
    ...(project.graensevaerdi ? [{ label: "Grænseværdi", value: project.graensevaerdi, unit: "kg CO₂e/m²/år", tone: "neutral" as const }] : []),
    ...(project.reduktion ? [{ label: "Reduktion", value: project.reduktion, tone: "primary" as const }] : []),
    ...(project.etageareal ? [{ label: "Etageareal", value: project.etageareal, tone: "neutral" as const }] : []),
  ];

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
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={project.description} />
        <script type="application/ld+json">{JSON.stringify(schemas.article)}</script>
        <script type="application/ld+json">{JSON.stringify(schemas.breadcrumb)}</script>
      </Helmet>

      <article>
        <PageHero
          width="narrow"
          crumbs={[
            { label: "Forside", to: "/" },
            { label: "Viden", to: "/viden" },
            { label: "Referenceprojekter", to: "/referenceprojekter" },
            { label: project.title.split(", ")[0] },
          ]}
          title={project.title}
        >
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Tag tone="mist">{project.type}</Tag>
            <Tag tone="outline">{project.location}</Tag>
            <Tag tone={statusTagTone[tone]}>{project.status}</Tag>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">{project.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl bg-white p-4">
                <dt className="text-xs text-muted">{metric.label}</dt>
                <dd className={`mt-1 text-2xl font-extrabold leading-none tracking-tight ${metricTone[metric.tone ?? "neutral"]}`}>
                  {metric.value}
                </dd>
                {metric.unit && <dd className="mt-1.5 text-xs text-muted">{metric.unit}</dd>}
              </div>
            ))}
          </dl>
        </PageHero>

        <div className="bg-paper pb-20 md:pb-28">
          <div className="mx-auto max-w-[46rem] px-5 md:px-8">
            {project.journey && (
              <section aria-labelledby="journey-heading" className="mb-14">
                <h2 id="journey-heading" className="mb-6 text-2xl font-bold md:text-3xl">
                  Beregningens forløb
                </h2>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {project.journey.map((step, index) => (
                    <li key={step.label} className="rounded-sheet bg-white p-5">
                      <p className="text-sm font-semibold text-green">
                        {index + 1}. {step.label}
                      </p>
                      <p className="mt-2 text-3xl font-extrabold leading-none tracking-tight text-ink">
                        {step.value}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-body">{step.detail}</p>
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

            {project.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ofte stillede spørgsmål</h2>
                <FAQList items={project.faqs} />
              </section>
            )}

            <CtaPanel
              className="mt-16"
              title="Har du et lignende projekt?"
              text="Send os dine tegninger, så laver vi en tidlig LCA-beregning med hotspot-analyse og giver en fast pris."
              cta="Få et tilbud"
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
