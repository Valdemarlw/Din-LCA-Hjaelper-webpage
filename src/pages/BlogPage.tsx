import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { blogPosts } from "../data/blogPosts";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export function BlogPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Viden om LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Artikler og guides om LCA-beregning for byggeri i Danmark. Lær om klimakrav, grænseværdier, A4/A5-dokumentation og meget mere."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/blog" />
        <meta property="og:title" content="Viden om LCA-beregning | Din LCA Hjælper" />
        <meta
          property="og:description"
          content="Artikler og guides om LCA-beregning for byggeri i Danmark."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Forside
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/viden" className="hover:text-primary transition-colors">
                  Viden
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">Artikler</li>
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
            Artikler og guides om LCA-beregning, klimakrav og bæredygtigt
            byggeri i Danmark.
          </motion.p>

          {blogPosts.length > 0 ? (
            <motion.div
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post) => (
                <motion.div key={post.slug} variants={fadeUp}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-xl border border-border bg-white p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
                    <h2 className="text-xl font-semibold text-navy leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-body leading-relaxed line-clamp-3">
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
          ) : (
            <motion.p
              className="mt-12 text-muted text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Artikler er på vej, kom snart tilbage.
            </motion.p>
          )}
        </div>
      </section>
    </motion.div>
  );
}
