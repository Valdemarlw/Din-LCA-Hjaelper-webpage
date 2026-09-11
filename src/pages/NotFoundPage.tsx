import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";

/**
 * Real 404 page. Prerendered to dist/404.html, which Vercel serves with a
 * genuine 404 status for unmatched paths.
 *
 * Before this existed, vercel.json rewrote every unknown path to index.html,
 * so any typo or dead legacy URL returned HTTP 200 with a byte-identical copy
 * of the homepage. Search engines read that as a real page and kept five dead
 * pre-relaunch URLs in the index.
 */
export function NotFoundPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Siden blev ikke fundet | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Siden findes ikke. Find i stedet vores LCA-beregning, BR18-tjekker eller kontakt Din LCA Hjælper direkte."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="bg-linear-to-b from-mist/70 to-paper py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <p className="text-sm font-semibold text-green">404</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
            Siden blev ikke fundet
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Siden er måske flyttet eller fjernet. Herunder er de steder folk oftest skal hen.
          </p>

          <nav className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              { to: "/lca-beregning", label: "LCA-beregning", hint: "Ydelser og priser" },
              {
                to: "/vaerktoejer/br18-tjekker",
                label: "BR18-tjekker",
                hint: "Er dit projekt omfattet?",
              },
              { to: "/blog", label: "Viden om LCA", hint: "Artikler og guides" },
              { to: "/kontakt", label: "Kontakt", hint: "Få et fast tilbud" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl bg-white px-5 py-4 transition-colors hover:bg-green-soft"
              >
                <span className="block font-semibold text-ink">{l.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{l.hint}</span>
              </Link>
            ))}
          </nav>

          <p className="mt-10 text-body">
            Eller ring på{" "}
            <a href="tel:+4529899999" className="font-semibold text-green underline decoration-green/40 underline-offset-4 hover:decoration-green">
              +45 29 89 99 99
            </a>
            .
          </p>
        </div>
      </section>
    </motion.div>
  );
}
