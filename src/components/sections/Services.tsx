import { SectionWrapper } from "../ui/SectionWrapper";
import { Sheet } from "../ui/Sheet";
import { Tag } from "../ui/Tag";
import { Reveal, RevealGroup, RevealItem, RevealWords } from "../motion/Reveal";

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
        <RevealWords as="h2" text="Det får du" className="text-3xl font-bold leading-tight md:text-4xl" />
        <Reveal as="p" delay={0.1} className="mt-4 text-lg text-body">
          En komplet LCA-løsning fra start til slut, så du kan aflevere med ro i maven.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12 md:mt-16">
        <Reveal className="lg:col-span-7">
          <Sheet className="h-full" padding={false}>
            <RevealGroup as="ul" className="px-6 md:px-8" stagger={0.1} delay={0.2}>
              {services.map((service) => (
                <RevealItem
                  key={service.title}
                  as="li"
                  className="grid gap-1.5 border-b border-line py-6 last:border-b-0 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8"
                >
                  <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-body md:text-base">
                    {service.description}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Sheet>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.25} y={40}>
          <Sheet tone="green" className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-bold text-white">{a4a5.title}</h3>
              <Tag tone="light">Inkluderet</Tag>
            </div>
            <p className="mt-4 leading-relaxed text-mist/90">{a4a5.description}</p>
            <RevealGroup
              as="ul"
              stagger={0.1}
              delay={0.5}
              className="mt-6 space-y-2.5 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-mist/85"
            >
              {a4a5.points.map((point) => (
                <RevealItem key={point} as="li" className="flex gap-3" y={10}>
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-mist/60" aria-hidden="true" />
                  <span>{point}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </Sheet>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
