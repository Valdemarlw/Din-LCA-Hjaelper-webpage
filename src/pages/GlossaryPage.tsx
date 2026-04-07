import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { glossaryTerms } from "../data/glossary";

// Group terms by first letter
function groupByLetter() {
  const groups: Record<string, typeof glossaryTerms> = {};
  for (const term of glossaryTerms) {
    const letter = term.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "da"));
}

export function GlossaryPage() {
  const grouped = groupByLetter();
  const letters = grouped.map(([letter]) => letter);

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
      {
        "@type": "ListItem",
        position: 3,
        name: "LCA-ordbog",
        item: "https://dinlcahjælper.dk/ordbog",
      },
    ],
  };

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "LCA-ordbog — Begreber i livscyklusvurdering for byggeri",
    description:
      "Ordliste med 20 centrale begreber inden for LCA-beregning for byggeri i Danmark efter BR18.",
    url: "https://dinlcahjælper.dk/ordbog",
    hasDefinedTerm: glossaryTerms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.shortDefinition,
      url: `https://dinlcahjælper.dk/ordbog/${term.slug}`,
    })),
  };

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>LCA-ordbog — Begreber i LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Ordliste med 20 centrale LCA-begreber forklaret: EPD, grænseværdi, GWP, modul A1-A3, B4, B6, C3-C4, D og flere. Præcise definitioner for byggeri i Danmark."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/ordbog" />
        <meta
          property="og:title"
          content="LCA-ordbog — Begreber i LCA-beregning | Din LCA Hjælper"
        />
        <meta
          property="og:description"
          content="Ordliste med 20 centrale LCA-begreber forklaret for byggeri i Danmark."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/ordbog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(definedTermSetSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-3xl px-5 md:px-8">
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
                <Link
                  to="/viden"
                  className="hover:text-primary transition-colors"
                >
                  Viden
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium">LCA-ordbog</li>
            </ol>
          </nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LCA-ordbog
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-body max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Centrale begreber inden for LCA-beregning for byggeri i Danmark.
            Fra EPD og grænseværdi til moduler og standarder.
          </motion.p>

          {/* Letter navigation */}
          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-border text-sm font-semibold text-navy hover:bg-primary-light hover:border-primary/20 transition-colors"
              >
                {letter}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Term list */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {grouped.map(([letter, terms]) => (
              <motion.div
                key={letter}
                id={`letter-${letter}`}
                className="mb-10"
                variants={fadeUp}
              >
                <h2 className="text-2xl font-bold text-navy mb-4 pb-2 border-b border-border">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {terms.map((term) => (
                    <Link
                      key={term.slug}
                      to={`/ordbog/${term.slug}`}
                      className="group block rounded-xl border border-border bg-white p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <h3 className="text-lg font-semibold text-navy group-hover:text-primary transition-colors">
                        {term.term}
                      </h3>
                      <p className="mt-2 text-sm text-body leading-relaxed line-clamp-2">
                        {term.shortDefinition}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
