import { Link } from "react-router-dom";
import { SectionWrapper } from "../ui/SectionWrapper";
import { CountUp } from "../motion/CountUp";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "../motion/Reveal";

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
    // The number falls from the first QA to the current result: 6,88 → 3,839.
    stat: { from: 6.88, to: 3.839, decimals: 3, prefix: "6,88 → " },
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
    <SectionWrapper bg="mist">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <RevealWords as="h2" text="Referenceprojekter" className="text-3xl font-bold leading-tight md:text-4xl" />
          <Reveal as="p" delay={0.1} className="mt-4 text-lg text-body">
            Se hvordan vi har hjulpet arkitekter og bygherrer med at overholde BR18's klimakrav.
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link
            to="/referenceprojekter"
            className="shrink-0 font-semibold text-green underline decoration-green/40 underline-offset-4 transition-colors hover:decoration-green"
          >
            Se alle referenceprojekter
          </Link>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3 md:mt-16" stagger={0.12} delay={0.1}>
        {cases.map((c, i) => (
          <RevealItem key={c.slug} className="h-full" y={36}>
            <Link
              to={`/referenceprojekter/${c.slug}`}
              className="group flex h-full flex-col rounded-sheet bg-white p-6 transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-1 hover:bg-green-soft hover:shadow-sheet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green md:p-7"
            >
              <p className="text-[13px] text-muted">
                {c.type}, {c.location}
              </p>
              <p className="mt-6 text-[2rem] font-extrabold leading-none tracking-tight text-ink md:text-4xl">
                <CountUp
                  to={c.stat.to}
                  from={c.stat.from}
                  decimals={c.stat.decimals}
                  prefix={c.stat.prefix}
                  suffix={c.stat.suffix}
                  duration={1.6}
                  delay={0.3 + i * 0.12}
                />
              </p>
              <p className="mt-2 text-sm text-muted">{c.statLabel}</p>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-body">{c.description}</p>
              <span className="mt-6 text-sm font-semibold text-green underline decoration-green/40 underline-offset-4 group-hover:decoration-green">
                Læs mere
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
}
