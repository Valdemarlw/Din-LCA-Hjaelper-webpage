import { SectionWrapper } from "../ui/SectionWrapper";

const painPoints = [
  {
    title: "Det er lovpligtigt",
    description:
      "Alle nye opvarmede byggerier kræver en LCA-beregning efter BR18, uanset størrelse. Kravet gælder også uopvarmede bygninger over 50 m², alle tilbygninger til erhverv og etageboliger, og boligtilbygninger fra 250 m². Uden den, ingen ibrugtagningstilladelse.",
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
    <SectionWrapper bg="mist">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="max-w-[18ch] text-[2.25rem] leading-[1.05] lg:sticky lg:top-28 lg:text-[2.75rem]">Hvorfor <span className="whitespace-nowrap">LCA-beregning</span> ikke er til at komme udenom</h2>
        </div>
        <div className="lg:col-span-7">
          {painPoints.map((point, i) => (
            <div
              key={point.title}
              className={`grid gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8 ${
                i === 0 ? "border-t" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-ink">{point.title}</h3>
              <p className="max-w-[58ch] leading-relaxed text-body">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
