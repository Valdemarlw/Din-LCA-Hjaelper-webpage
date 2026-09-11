import { SectionWrapper } from "../ui/SectionWrapper";
import { RevealGroup, RevealItem, RevealWords } from "../motion/Reveal";

const painPoints = [
  {
    title: "Det er lovpligtigt",
    description:
      "Alle nye opvarmede byggerier kræver en LCA-beregning efter BR18, uanset størrelse. For uopvarmede bygninger over 50 m² og tilbygninger over 250 m² gælder kravet også. Uden den, ingen ibrugtagningstilladelse.",
  },
  {
    title: "Det kræver specialviden",
    description:
      "En korrekt LCA kræver faglig indsigt i materialer, konstruktioner og lovkrav, samt kendskab til de rette beregningsværktøjer og hvordan de bruges. Det er ikke noget man bare lige gør.",
  },
  {
    title: "Tænk LCA ind fra start",
    description:
      "Materiale- og konstruktionsvalg bør bygge på LCA-beregningen. Jo tidligere du involverer en specialist, jo færre overraskelser undervejs.",
  },
];

export function Problem() {
  return (
    <SectionWrapper bg="paper">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <RevealWords
            as="h2"
            text="Hvorfor LCA-beregning ikke er til at komme udenom"
            className="max-w-[16ch] text-3xl font-bold leading-tight md:text-4xl lg:sticky lg:top-28"
          />
        </div>
        <RevealGroup className="lg:col-span-7" stagger={0.14}>
          {painPoints.map((point, i) => (
            <RevealItem
              key={point.title}
              className={`grid gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-ink">{point.title}</h3>
              <p className="max-w-[58ch] leading-relaxed text-body">{point.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </SectionWrapper>
  );
}
