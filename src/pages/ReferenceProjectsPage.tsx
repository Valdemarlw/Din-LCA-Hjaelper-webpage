import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { referenceProjects } from "../data/referenceProjects";
import { PageHero } from "../components/ui/PageHero";
import { Tag } from "../components/ui/Tag";
import { statusTagTone, statusToneOf } from "../lib/statusTone";

export function ReferenceProjectsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://dinlcahjælper.dk" },
      { "@type": "ListItem", position: 2, name: "Viden", item: "https://dinlcahjælper.dk/viden" },
      { "@type": "ListItem", position: 3, name: "Referenceprojekter", item: "https://dinlcahjælper.dk/referenceprojekter" },
    ],
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Referenceprojekter | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Se dokumenterede LCA-cases med beregningsforløb, kvalitetssikring og hotspotanalyser fra konkrete byggeprojekter."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/referenceprojekter" />
        <meta property="og:title" content="Referenceprojekter | Din LCA Hjælper" />
        <meta property="og:description" content="Se vores LCA-referenceprojekter med dokumenterede resultater fra rigtige byggeprojekter." />
        <meta property="og:url" content="https://dinlcahjælper.dk/referenceprojekter" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "Viden", to: "/viden" }, { label: "Referenceprojekter" }]}
        title="Referenceprojekter"
        lede="Se hvordan beregninger bliver kontrolleret, rettet og optimeret. Hver case viser både resultat, metode og de forbehold, der stadig gælder."
      />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {referenceProjects.map((project) => {
              const tone = statusToneOf(project);
              const cardMetrics = project.metrics?.slice(0, 3) ?? [
                ...(project.foer ? [{ label: "Før", value: project.foer }] : []),
                ...(project.resultat ? [{ label: "Resultat", value: project.resultat }] : []),
                ...(project.graensevaerdi ? [{ label: "Grænse", value: project.graensevaerdi }] : []),
              ];
              return (
                <Link
                  key={project.slug}
                  to={`/referenceprojekter/${project.slug}`}
                  className="group flex h-full flex-col rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft md:p-7"
                >
                  <p className="text-[13px] text-muted">
                    {project.type}, {project.location}
                    {project.etageareal && `, ${project.etageareal}`}
                  </p>
                  <div className="mt-3">
                    <Tag tone={statusTagTone[tone]}>{project.status}</Tag>
                  </div>

                  <h2 className="mt-4 flex-1 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green">
                    {project.title}
                  </h2>

                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
                    {cardMetrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="text-xs text-muted">{metric.label}</dt>
                        <dd className="mt-0.5 text-base font-bold text-ink">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-6 text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 group-hover:decoration-green">
                    Læs hele casen
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
