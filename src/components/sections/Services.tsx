import { SectionWrapper } from "../ui/SectionWrapper";
import { Sheet } from "../ui/Sheet";
import { Tag } from "../ui/Tag";

const services = [
  {
    title: "LCA-beregning",
    description: "Komplet beregning fra tidlig fase til myndighedsklar rapport, klar til kommunen.",
  },
  {
    title: "Hotspot-analyse",
    description: "Vi identificerer de mest CO₂-tunge bygningsdele, så du ved hvor indsatsen skal lægges.",
  },
  {
    title: "Materialeoptimering",
    description: "Forslag til alternative materialer hvis grænseværdien er i fare, inden det bliver et problem.",
  },
  {
    title: "Opdatering ved færdigmelding",
    description:
      "Vi opdaterer beregningen med endelige mængder og de registrerede data fra byggepladsen, så rapporten matcher det byggede.",
  },
];

const a4a5 = {
  title: "A4/A5-beregning",
  description:
    "Tidligt beregner vi A4 og A5 med dokumenterede generiske forudsætninger. Efter byggeriet opdaterer vi A5 med det registrerede forbrug fra byggepladsen og de endelige projektoplysninger.",
  points: [
    "A4: Dokumenterede generiske transportforudsætninger for materialer",
    "A5: Foreløbige værdier for spild og byggepladsforbrug",
    "Entreprenøren registrerer el, varme, gas og brændstof under byggeriet",
    "Vi indarbejder de registrerede data i den endelige rapport",
  ],
};

export function Services() {
  return (
    <SectionWrapper bg="mist">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">Det får du</h2>
        <p className="mt-4 text-lg text-body">
          En komplet LCA-løsning fra start til slut, så du kan aflevere med ro i maven.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12 md:mt-16">
        <Sheet className="lg:col-span-7" padding={false}>
          <ul className="px-6 md:px-8">
            {services.map((service) => (
              <li
                key={service.title}
                className="grid gap-1.5 border-b border-line py-6 last:border-b-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
              >
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="max-w-[52ch] text-[15px] leading-relaxed text-body md:text-base">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </Sheet>

        <Sheet tone="green" className="flex flex-col lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white">{a4a5.title}</h3>
            <Tag tone="light">Inkluderet</Tag>
          </div>
          <p className="mt-4 leading-relaxed text-mist/90">{a4a5.description}</p>
          <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-mist/85">
            {a4a5.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-4 shrink-0 bg-mist/60" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Sheet>
      </div>
    </SectionWrapper>
  );
}
