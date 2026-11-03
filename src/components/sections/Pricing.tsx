import { SectionWrapper } from "../ui/SectionWrapper";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";

const inclusions = [
  "Gennemgang af tegninger og projektmateriale",
  "Tidlig LCA-beregning med hotspot-analyse",
  "Materialeforslag ved overskridelse af grænseværdi",
  "Anbefaling af produkter med produktspecifik EPD",
  "Opdatering ved færdigmelding med endelige mængder og byggepladsdata",
  "Myndighedsklar rapport klar til kommunen",
  "Beregning og dokumentation af A4/A5",
];

function Check() {
  return (
    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-soft text-green" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
    </span>
  );
}

export function Pricing() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-[2.25rem] leading-[1.05] md:text-[3rem]">Gennemsigtig pris</h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Prisen afhænger af projektets omfang og kompleksitet, antallet af konstruktioner og
            hvilke grænseværdikrav der gælder. Få et vejledende estimat på sekunder med vores
            BR18-tjekker.
          </p>

          <div className="mt-10">
            <p className="font-display text-[2.4rem] leading-[1.05] text-ink sm:text-[3rem]">
              Typisk <span className="whitespace-nowrap">5.000-7.000 kr</span>
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[15px] text-muted">
              ekskl. moms for et komplet enfamiliehus
              <Tag tone="spark" className="ml-2">A4+A5 inkluderet</Tag>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/vaerktoejer/br18-tjekker">Estimér din pris</Button>
            <Button to="/kontakt" variant="secondary">
              Send dine tegninger
            </Button>
          </div>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            Rækkehuse og projekter med flere boliger starter ved 8.000 kr og prissættes manuelt.
            Du får altid et fast tilbud, når vi har set projektmaterialet.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-start">
          <Sheet className="h-full">
            <ul className="divide-y divide-line">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <Check />
                  <span className="leading-relaxed text-body">{item}</span>
                </li>
              ))}
            </ul>
          </Sheet>
        </div>
      </div>
    </SectionWrapper>
  );
}
