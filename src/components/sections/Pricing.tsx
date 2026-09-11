import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "../motion/Reveal";
import { EASE, VIEWPORT } from "../motion/constants";

const inclusions = [
  "Gennemgang af tegninger og projektmateriale",
  "Tidlig LCA-beregning med hotspot-analyse",
  "Materialeforslag ved overskridelse af grænseværdi",
  "Opdatering ved færdigmelding med endelige mængder og byggepladsdata",
  "Myndighedsklar rapport klar til kommunen",
  "Beregning og dokumentation af A4/A5",
];

/** A check mark that draws itself as the list reveals. */
function DrawnCheck({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0 text-green"
      aria-hidden="true"
    >
      <motion.path
        d="M5 12.5l4.5 4.5L19 7"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: EASE, delay }}
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <RevealWords as="h2" text="Gennemsigtig pris" className="text-3xl font-bold leading-tight md:text-4xl" />
          <Reveal as="p" delay={0.1} className="mt-4 text-lg leading-relaxed text-body">
            Prisen afhænger af projektets omfang og kompleksitet, antallet af konstruktioner og
            hvilke grænseværdikrav der gælder. Få et vejledende estimat på sekunder med vores
            BR18-tjekker.
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <Tag>A4+A5 inkluderet</Tag>
            <p className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              Typisk <span className="whitespace-nowrap">5.000-7.000 kr</span>
            </p>
            <p className="mt-3 text-[15px] text-muted">ekskl. moms for et komplet enfamiliehus</p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <Button to="/vaerktoejer/br18-tjekker">Estimér din pris</Button>
            <Button to="/kontakt" variant="secondary">
              Send dine tegninger
            </Button>
          </Reveal>

          <Reveal as="p" delay={0.4} className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            Rækkehuse og projekter med flere boliger starter ved 8.000 kr og prissættes manuelt.
            Du får altid et fast tilbud, når vi har set projektmaterialet.
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15} y={40}>
          <Sheet className="h-full">
            <RevealGroup as="ul" className="divide-y divide-line" stagger={0.1} delay={0.3}>
              {inclusions.map((item, i) => (
                <RevealItem key={item} as="li" className="flex items-start gap-4 py-4 first:pt-0 last:pb-0" y={12}>
                  <DrawnCheck delay={0.35 + i * 0.1} />
                  <span className="leading-relaxed text-body">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Sheet>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
