import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { projectTypes } from "../data/projectTypes";
import { ArrowRight } from "lucide-react";

export function ProjectTypesPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>LCA-beregning efter bygningstype — Din LCA Hjælper</title>
        <meta
          name="description"
          content="LCA-beregning for alle bygningstyper: enfamiliehuse, sommerhuse, erhverv og mere. Se grænseværdier og få tilbud. Fra 3.500 kr."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/lca-beregning" />
        <meta property="og:title" content="LCA-beregning efter bygningstype — Din LCA Hjælper" />
        <meta property="og:description" content="LCA-beregning for alle bygningstyper. Se grænseværdier og få tilbud." />
        <meta property="og:url" content="https://dinlcahjælper.dk/lca-beregning" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute left-0 top-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Forside</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/viden" className="hover:text-primary transition-colors">Viden</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">Bygningstyper</li>
            </ol>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LCA-beregning efter bygningstype
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-body max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Grænseværdierne i BR18 varierer efter bygningstype. Vælg din
            projekttype for at se de specifikke krav og udfordringer.
          </motion.p>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {projectTypes.map((pt) => (
              <motion.div key={pt.slug} variants={fadeUp}>
                <Link
                  to={`/lca-beregning/${pt.slug}`}
                  className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-navy mb-4">
                    {pt.grensevaerdi} kg CO₂e/m²/år
                  </span>
                  <h2 className="text-xl font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                    {pt.title.replace("LCA-beregning for ", "")}
                  </h2>
                  <p className="mt-3 text-body leading-relaxed line-clamp-3">
                    {pt.content[0]?.text || pt.description}
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
        </div>
      </section>
    </motion.div>
  );
}
