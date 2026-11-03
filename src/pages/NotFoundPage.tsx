import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
    <div>
      <Helmet>
        <title>Siden blev ikke fundet | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Siden findes ikke. Find i stedet vores LCA-beregning, BR18-tjekker eller kontakt Din LCA Hjælper direkte."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="px-3 pb-16 pt-2 md:px-6 md:pb-24">
        <div className="grain mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-green px-5 py-16 text-mist md:rounded-[32px] md:px-12 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-spark">404</p>
          <h1 className="mt-3 text-[2.5rem] leading-tight text-white md:text-[3.5rem]">
            Siden blev ikke fundet
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mist/80">
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
                className="rounded-2xl bg-white px-5 py-4 transition-colors hover:bg-green-soft"
              >
                <span className="block font-semibold text-ink">{l.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{l.hint}</span>
              </Link>
            ))}
          </nav>

          <p className="mt-10 text-mist/80">
            Eller ring på{" "}
            <a href="tel:+4529899999" className="font-semibold text-white underline decoration-spark decoration-2 underline-offset-4">
              +45 29 89 99 99
            </a>
            .
          </p>
        </div>
        </div>
      </section>
    </div>
  );
}
