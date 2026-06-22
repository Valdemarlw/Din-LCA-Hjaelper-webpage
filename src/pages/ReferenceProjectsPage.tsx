import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { referenceProjects } from "../data/referenceProjects";
import { ArrowRight, MapPin, CheckCircle } from "lucide-react";

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
          content="Se vores LCA-referenceprojekter: sommerhuse, lagerhaller og erhvervsbyggeri. Rigtige projekter med hotspot-analyser, EPD-optimering og dokumenterede resultater."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/referenceprojekter" />
        <meta property="og:title" content="Referenceprojekter | Din LCA Hjælper" />
        <meta property="og:description" content="Se vores LCA-referenceprojekter med dokumenterede resultater fra rigtige byggeprojekter." />
        <meta property="og:url" content="https://dinlcahjælper.dk/referenceprojekter" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li><Link to="/" className="hover:text-primary transition-colors">Forside</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/viden" className="hover:text-primary transition-colors">Viden</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">Referenceprojekter</li>
            </ol>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Referenceprojekter
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-body max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Rigtige byggeprojekter med dokumenterede LCA-resultater. Se hvordan vi arbejder med hotspot-analyser og EPD-optimering.
          </motion.p>
        </div>
      </section>

      {/* Project cards */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {referenceProjects.map((project) => (
              <motion.div key={project.slug} variants={fadeUp}>
                <Link
                  to={`/referenceprojekter/${project.slug}`}
                  className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-navy">
                      {project.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      <CheckCircle size={12} />
                      {project.status}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={14} />
                    {project.location}
                    {project.etageareal && <span className="ml-2">| {project.etageareal}</span>}
                  </div>

                  {/* Result metrics */}
                  <div className="mt-4 flex items-center gap-3">
                    {project.foer && (
                      <div className="text-center">
                        <p className="text-xs text-muted">Før</p>
                        <p className="text-lg font-bold text-red-500">{project.foer}</p>
                      </div>
                    )}
                    {project.foer && (
                      <ArrowRight size={16} className="text-muted" />
                    )}
                    <div className="text-center">
                      <p className="text-xs text-muted">Resultat</p>
                      <p className="text-lg font-bold text-green-600">{project.resultat}</p>
                    </div>
                    <div className="text-center ml-auto">
                      <p className="text-xs text-muted">Grænse</p>
                      <p className="text-lg font-bold text-navy">{project.graensevaerdi}</p>
                    </div>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Læs hele casen
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
