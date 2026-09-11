import { Check } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";

const inclusions = [
  "Gennemgang af tegninger og projektmateriale",
  "Tidlig LCA-beregning med hotspot-analyse",
  "Materialeforslag ved overskridelse af grænseværdi",
  "Opdatering ved færdigmelding med endelige mængder og byggepladsdata",
  "Myndighedsklar rapport klar til kommunen",
  "Beregning og dokumentation af A4/A5",
];

export function Pricing() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">Gennemsigtig pris</h2>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Prisen afhænger af projektets omfang og kompleksitet, antallet af konstruktioner og
            hvilke grænseværdikrav der gælder. Få et vejledende estimat på sekunder med vores
            BR18-tjekker.
          </p>

          <div className="mt-10">
            <Tag>A4+A5 inkluderet</Tag>
            <p className="mt-4 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
              Typisk <span className="whitespace-nowrap">5.000-7.000 kr</span>
            </p>
            <p className="mt-3 text-[15px] text-muted">ekskl. moms for et komplet enfamiliehus</p>
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

        <div className="lg:col-span-6 lg:col-start-7">
          <Sheet className="h-full">
            <ul className="divide-y divide-line">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-green" />
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
