import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { blogPosts } from "../data/blogPosts";
import { glossaryTerms } from "../data/glossary";
import { projectTypes } from "../data/projectTypes";
import { referenceProjects } from "../data/referenceProjects";
import { ArrowRight, Clock, Calendar, MapPin, CheckCircle, Info } from "lucide-react";

export function VidenPage() {
  const recentPosts = blogPosts.slice(0, 3);

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
    ],
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Viden om LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Artikler, bygningstyper og guides om LCA-beregning for byggeri i Danmark. Lær om klimakrav, grænseværdier og LCA-processen."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/viden" />
        <meta property="og:title" content="Viden om LCA-beregning | Din LCA Hjælper" />
        <meta property="og:description" content="Artikler, bygningstyper og guides om LCA-beregning for byggeri i Danmark." />
        <meta property="og:url" content="https://dinlcahjælper.dk/viden" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Forside
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">Viden</li>
            </ol>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Viden om LCA-beregning
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-body max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Artikler, bygningstyper og guides om LCA-beregning, klimakrav og
            bæredygtigt byggeri i Danmark.
          </motion.p>
        </div>
      </section>

      {/* Artikler */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-navy">
                Artikler
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Se alle artikler
                <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {recentPosts.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center gap-4 text-sm text-muted mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-body leading-relaxed line-clamp-2 text-sm">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Læs mere
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LCA-ordbog */}
      <section className="bg-bg-alt py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-navy">
                  LCA-ordbog
                </h2>
                <p className="mt-2 text-muted">
                  Centrale begreber inden for LCA-beregning forklaret.
                </p>
              </div>
              <Link
                to="/ordbog"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Se alle begreber
                <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {glossaryTerms.slice(0, 6).map((term) => (
                <motion.div key={term.slug} variants={fadeUp}>
                  <Link
                    to={`/ordbog/${term.slug}`}
                    className="group block rounded-xl border border-border bg-white p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
                  >
                    <h3 className="text-base font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {term.term}
                    </h3>
                    <p className="mt-2 text-body leading-relaxed line-clamp-2 text-sm">
                      {term.shortDefinition}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <Link
              to="/ordbog"
              className="mt-6 md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Se alle begreber
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bygningstyper */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-navy">
                  LCA efter bygningstype
                </h2>
                <p className="mt-2 text-muted">
                  Grænseværdierne i BR18 varierer efter bygningstype. Vælg din
                  projekttype.
                </p>
              </div>
              <Link
                to="/lca-beregning"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Se alle bygningstyper
                <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {projectTypes.map((pt) => (
                <motion.div key={pt.slug} variants={fadeUp}>
                  <Link
                    to={`/lca-beregning/${pt.slug}`}
                    className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
                  >
                    <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-navy mb-4">
                      {pt.grensevaerdi} kg CO₂e/m²/år
                    </span>
                    <h3 className="text-lg font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {pt.title.replace("LCA-beregning for ", "")}
                    </h3>
                    <p className="mt-3 text-body leading-relaxed line-clamp-2 text-sm">
                      {pt.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Læs mere
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <Link
              to="/lca-beregning"
              className="mt-6 md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Se alle bygningstyper
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Referenceprojekter */}
      <section className="bg-bg-alt py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-navy">
                  Referenceprojekter
                </h2>
                <p className="mt-2 text-muted">
                  Rigtige byggeprojekter med dokumenterede LCA-resultater.
                </p>
              </div>
              <Link
                to="/referenceprojekter"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Se alle referenceprojekter
                <ArrowRight size={14} />
              </Link>
            </div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${project.statusTone === "info" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>
                        {project.statusTone === "info" ? <Info size={12} /> : <CheckCircle size={12} />}
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin size={14} />
                      {project.location}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      {(project.metrics?.slice(0, 2) ?? []).map((metric) => (
                        <span key={metric.label}>{metric.label}: <span className="font-semibold text-navy">{metric.value}</span></span>
                      ))}
                      {!project.metrics && project.resultat && (
                        <span>Resultat: <span className="font-semibold text-green-600">{project.resultat}</span>{project.graensevaerdi && ` vs. grænse ${project.graensevaerdi}`}</span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Læs hele casen
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <Link
              to="/referenceprojekter"
              className="mt-6 md:hidden inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Se alle referenceprojekter
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sammenligninger */}
      <section id="sammenligninger" className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-navy">
                Sammenligninger
              </h2>
              <p className="mt-2 text-muted">
                Hvordan Din LCA Hjælper står sig over for andre løsninger.
              </p>
            </div>

            <Link
              to="/sammenligninger/din-lca-hjaelper-vs-lcabyg"
              className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 max-w-2xl"
            >
              <h3 className="text-lg font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                Din LCA Hjælper vs. LCAbyg: Hvornår bør du få hjælp?
              </h3>
              <p className="mt-3 text-body leading-relaxed text-sm">
                LCAbyg er gratis og dækker BR18, men har en stejl læringskurve.
                Sammenlign pris, tid og hvornår hver løsning passer.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Læs sammenligningen
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
