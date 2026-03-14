import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
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

function PriceCounter({ inView }: { inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    const n = Math.round(v);
    return n.toLocaleString("da-DK");
  });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(count, 3500, {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return controls.stop;
    }
  }, [inView, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return <span>{displayValue}</span>;
}

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper>
      <div className="max-w-2xl mx-auto text-center" ref={ref}>
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">
          Gennemsigtig pris
        </h2>
        <p className="mt-4 text-lg text-muted">
          Prisen afhænger af projektets størrelse, kompleksitet og antal konstruktionstyper.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-white p-8 md:p-10 shadow-sm">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm text-muted font-medium">Fra</span>
            <span className="text-5xl md:text-6xl font-bold text-navy tracking-tight">
              <PriceCounter inView={isInView} />
            </span>
            <span className="text-xl text-navy font-medium">kr</span>
          </div>

          <div className="mt-3 flex justify-center">
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

          <div className="mt-8">
            <Button to="/kontakt" className="w-full md:w-auto">
              Kontakt os med dit projekt
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            Send os dine tegninger, så giver vi en pris.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
