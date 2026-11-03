import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { projectTypes } from "../data/projectTypes";
import { PageHero } from "../components/ui/PageHero";
import { Tag } from "../components/ui/Tag";

export function ProjectTypesPage() {
  return (
    <div>
      <Helmet>
        <title>LCA-beregning efter bygningstype | Din LCA Hjælper</title>
        <meta
          name="description"
          content="LCA-beregning for enfamiliehuse, sommerhuse, rækkehuse og erhverv. Se grænseværdier og få et fast tilbud. Enfamiliehuse typisk 5.000-7.000 kr. ekskl. moms."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/lca-beregning" />
        <meta property="og:title" content="LCA-beregning efter bygningstype | Din LCA Hjælper" />
        <meta property="og:description" content="LCA-beregning for alle bygningstyper. Se grænseværdier og få tilbud." />
        <meta property="og:url" content="https://dinlcahjælper.dk/lca-beregning" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      <PageHero
        crumbs={[{ label: "Forside", to: "/" }, { label: "Viden", to: "/viden" }, { label: "Bygningstyper" }]}
        title="LCA-beregning efter bygningstype"
        lede="Grænseværdierne i BR18 varierer efter bygningstype. Vælg din projekttype for at se de specifikke krav og udfordringer."
      />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {projectTypes.map((pt) => (
              <div key={pt.slug} className="h-full">
                <Link
                  to={`/lca-beregning/${pt.slug}`}
                  className="group flex h-full flex-col rounded-sheet bg-white p-6 ring-1 ring-line transition-[box-shadow] duration-150 hover:ring-green/40 md:p-7"
                >
                  <Tag tone="mist" className="self-start">
                    {pt.grensevaerdi} kg CO₂e/m²/år
                  </Tag>
                  <h2 className="mt-5 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-green">
                    {pt.title.replace("LCA-beregning for ", "")}
                  </h2>
                  <p className="mt-3 line-clamp-4 flex-1 text-[15px] leading-relaxed text-body">
                    {pt.content[0]?.text || pt.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-green underline decoration-spark/70 underline-offset-4 group-hover:decoration-spark">
                    Læs mere
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
