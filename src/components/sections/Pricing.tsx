import { Check } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const inclusions = [
  "Gennemgang af tegninger og projektmateriale",
  "Tidlig LCA-beregning med hotspot-analyse",
  "Materialeforslag ved overskridelse af grænseværdi",
  "Opdatering ved færdigmelding med faktiske mængder",
  "Myndighedsklar rapport klar til kommunen",
  "Adgang til A45 platformen til A4/A5 dokumentation",
];

export function Pricing() {
  return (
    <SectionWrapper>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">Gennemsigtig pris</h2>
        <p className="mt-4 text-lg text-muted">
          Prisen afhænger af projektets omfang og kompleksitet, antallet af konstruktioner og
          hvilke grænseværdikrav der gælder. Få et vejledende estimat på sekunder med vores
          BR18-tjekker.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-white p-8 md:p-10 shadow-sm">
          <div className="flex justify-center">
            <Badge>Inkl. A45 adgang</Badge>
          </div>

          <ul className="mt-8 space-y-3 text-left">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Button to="/vaerktoejer/br18-tjekker" analytics={{ location: "pricing_section_tool" }}>
              Estimér din pris
            </Button>
            <Button to="/kontakt" variant="secondary" analytics={{ location: "pricing_section" }}>
              Send dine tegninger
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            Du får et fast tilbud, så snart vi har set tegningerne.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
