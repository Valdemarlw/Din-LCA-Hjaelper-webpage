import { Link } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { kommatal } from "../../lib/format";

type Stat = { to: number; from?: number; decimals?: number; prefix?: string; suffix?: string };

const cases: {
  slug: string;
  type: string;
  location: string;
  stat: Stat;
  statLabel: string;
  description: string;
}[] = [
  {
    slug: "ternedalen-42",
    type: "Sommerhus",
    location: "Ternedalen",
    // The number falls from the first QA to the current result, rounded on the card: 6,88 → 3,84.
    stat: { from: 6.88, to: 3.84, decimals: 2, prefix: "6,88 → " },
    statLabel: "kg CO₂e/m²/år",
    description:
      "En dokumenteret beregnings- og optimeringsrejse med rettelser, EPD'er og tydelige forbehold.",
  },
  {
    slug: "agavevej-4a",
    type: "Tidlig LCA",
    location: "Knebel",
    stat: { to: 72, suffix: " %" },
    statLabel: "i tre hotspots",
    description:
      "Tag, terrændæk og fundament stod for 72 % af den tidlige beregning. Det viste, hvor arbejdet skulle begynde.",
  },
  {
    slug: "lagerhal-laesovej-randers",
    type: "Lagerhal",
    location: "Randers",
    stat: { to: 16, suffix: " %" },
    statLabel: "margin til grænsen",
    description:
      "Stål og beton dominerede CO₂-regnskabet. Den tidlige analyse gav et klart beslutningsgrundlag.",
  },
];

export function References() {
  return (
    <SectionWrapper bg="paper">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[2.25rem] leading-[1.05] md:text-[3rem]">Referenceprojekter</h2>
          <p className="mt-4 text-lg text-body">
            Se hvordan vi har hjulpet arkitekter og bygherrer med at overholde BR18's klimakrav.
          </p>
        </div>
        <div>
          <Link
            to="/referenceprojekter"
            className="shrink-0 font-semibold text-green underline decoration-spark decoration-2 underline-offset-4 transition-colors hover:text-green-deep"
          >
            Se alle referenceprojekter
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3 md:mt-16">
        {cases.map((c) => (
          <div key={c.slug} className="h-full">
            <Link
              to={`/referenceprojekter/${c.slug}`}
              className="group flex h-full flex-col rounded-sheet bg-white p-6 ring-1 ring-line transition-[box-shadow] duration-150 hover:ring-green/40 md:p-7"
            >
              <p className="text-[13px] text-muted">
                {c.type}, {c.location}
              </p>
              <p className="mt-6 font-display text-[2.25rem] leading-none text-ink md:text-[2.6rem]">
                {c.stat.prefix}
                {kommatal(c.stat.to, c.stat.decimals ?? 0)}
                {c.stat.suffix}
              </p>
              <p className="mt-2 text-sm text-muted">{c.statLabel}</p>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-body">{c.description}</p>
              <span className="mt-6 text-sm font-semibold text-green underline decoration-spark decoration-2 underline-offset-4">
                Læs casen
              </span>
            </Link>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
