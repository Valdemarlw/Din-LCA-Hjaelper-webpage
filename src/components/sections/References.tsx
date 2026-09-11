import { Link } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";

const cases = [
  {
    slug: "ternedalen-42",
    type: "Sommerhus",
    location: "Ternedalen",
    stat: "6,88 → 3,839",
    statLabel: "kg CO₂e/m²/år",
    description:
      "En dokumenteret beregnings- og optimeringsrejse med rettelser, EPD'er og tydelige forbehold.",
  },
  {
    slug: "agavevej-4a",
    type: "Tidlig LCA",
    location: "Knebel",
    stat: "72 %",
    statLabel: "i tre hotspots",
    description:
      "Tag, terrændæk og fundament stod for 72 % af den tidlige beregning. Det viste, hvor arbejdet skulle begynde.",
  },
  {
    slug: "lagerhal-laesovej-randers",
    type: "Lagerhal",
    location: "Randers",
    stat: "16 %",
    statLabel: "margin til grænsen",
    description:
      "Stål og beton dominerede CO₂-regnskabet. Den tidlige analyse gav et klart beslutningsgrundlag.",
  },
];

export function References() {
  return (
    <SectionWrapper bg="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">Referenceprojekter</h2>
          <p className="mt-4 text-lg text-body">
            Se hvordan vi har hjulpet arkitekter og bygherrer med at overholde BR18's klimakrav.
          </p>
        </div>
        <Link
          to="/referenceprojekter"
          className="shrink-0 font-semibold text-green underline decoration-green/40 underline-offset-4 transition-colors hover:decoration-green"
        >
          Se alle referenceprojekter
        </Link>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3 md:mt-16">
        {cases.map((c) => (
          <Link
            key={c.slug}
            to={`/referenceprojekter/${c.slug}`}
            className="group flex h-full flex-col rounded-sheet bg-white p-6 transition-colors hover:bg-green-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green md:p-7"
          >
            <p className="text-[13px] text-muted">
              {c.type}, {c.location}
            </p>
            <p className="mt-6 text-[2rem] font-extrabold leading-none tracking-tight text-ink md:text-4xl">
              {c.stat}
            </p>
            <p className="mt-2 text-sm text-muted">{c.statLabel}</p>
            <p className="mt-5 flex-1 text-[15px] leading-relaxed text-body">{c.description}</p>
            <span className="mt-6 text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 group-hover:decoration-green">
              Læs mere
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
