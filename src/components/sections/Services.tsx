import type { ReactNode } from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Tag } from "../ui/Tag";

/* One line icon set for the site: 32px grid, 1.6 stroke, round caps. */
const icon = (paths: ReactNode) => (
  <svg viewBox="0 0 32 32" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const services = [
  {
    title: "LCA-beregning",
    description: "Komplet beregning fra tidlig fase til myndighedsklar rapport, klar til kommunen.",
    icon: icon(
      <>
        <path d="M4 15 16 5l12 10" />
        <path d="M7 13v14h18V13" />
        <path d="M13 27v-7h6v7" />
      </>
    ),
  },
  {
    title: "Hotspot-analyse",
    description: "Vi identificerer de mest CO₂-tunge bygningsdele, så du ved hvor indsatsen skal lægges.",
    icon: icon(
      <>
        <path d="M6 26V6M6 26h20" />
        <path d="M10 20l5-6 4 3 6-8" />
      </>
    ),
  },
  {
    title: "Materialeoptimering",
    description: "Forslag til alternative materialer hvis grænseværdien er i fare, inden det bliver et problem.",
    icon: icon(
      <>
        <path d="M5 11h17l-4-4M27 21H10l4 4" />
      </>
    ),
  },
  {
    title: "Produktspecifikke EPD'er",
    description: "Vi anbefaler produkter med egen EPD, der kan bringe beregningen ned.",
    icon: icon(
      <>
        <rect x="7" y="4" width="18" height="24" rx="2" />
        <path d="M11 11h10M11 16h10M11 21h6" />
      </>
    ),
  },
  {
    title: "Opdatering ved færdigmelding",
    description:
      "Vi opdaterer beregningen med endelige mængder og de registrerede data fra byggepladsen, så rapporten matcher det byggede.",
    icon: icon(
      <>
        <path d="M26 16a10 10 0 1 1-3-7.1" />
        <path d="M26 5v5h-5" />
      </>
    ),
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
    <SectionWrapper bg="paper">
      <div className="max-w-2xl">
        <h2 className="text-[2.25rem] leading-[1.05] md:text-[3rem]">Det får du</h2>
        <p className="mt-4 text-lg text-body">En komplet LCA-løsning fra start til slut, så du kan aflevere med ro i maven.</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 md:mt-14">
        <ul className="lg:col-span-7">
          {services.map((service) => (
            <li key={service.title} className="grid grid-cols-[52px_1fr] gap-5 border-t border-line py-6 last:border-b">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-green-soft text-green">{service.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-body md:text-base">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="grain flex flex-col overflow-hidden rounded-sheet bg-green p-7 text-mist md:p-9 lg:col-span-5 lg:self-start">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-[1.75rem] font-normal leading-tight text-white">{a4a5.title}</h3>
            <Tag tone="spark">Inkluderet</Tag>
          </div>
          <p className="mt-4 leading-relaxed text-mist/85">{a4a5.description}</p>
          <ul className="mt-6 space-y-3 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-mist/85">
            {a4a5.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-spark" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
