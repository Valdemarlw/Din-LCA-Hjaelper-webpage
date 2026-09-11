import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { glossaryTerms } from "../data/glossary";
import { PageHero } from "../components/ui/PageHero";

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
    name: "LCA-ordbog, Begreber i livscyklusvurdering for byggeri",
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
        <title>LCA-ordbog, Begreber i LCA-beregning | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Ordliste med 20 centrale LCA-begreber forklaret: EPD, grænseværdi, GWP, modul A1-A3, B4, B6, C3-C4, D og flere. Præcise definitioner for byggeri i Danmark."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/ordbog" />
        <meta
          property="og:title"
          content="LCA-ordbog, Begreber i LCA-beregning | Din LCA Hjælper"
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

      <PageHero
        width="narrow"
        crumbs={[{ label: "Forside", to: "/" }, { label: "Viden", to: "/viden" }, { label: "LCA-ordbog" }]}
        title="LCA-ordbog"
        lede="Centrale begreber inden for LCA-beregning for byggeri i Danmark. Fra EPD og grænseværdi til moduler og standarder."
      >
        <nav aria-label="Bogstaver" className="mt-7 flex flex-wrap gap-2">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white text-sm font-semibold text-ink transition-colors hover:border-green hover:text-green"
            >
              {letter}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          {grouped.map(([letter, terms]) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-28 last:mb-0">
              <h2 className="text-3xl font-extrabold text-green">{letter}</h2>
              <div className="mt-3 border-t border-line">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    to={`/ordbog/${term.slug}`}
                    className="group grid gap-1.5 border-b border-line py-5 transition-colors hover:bg-white sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 sm:px-3"
                  >
                    <h3 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-green">
                      {term.term}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-body">{term.shortDefinition}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
