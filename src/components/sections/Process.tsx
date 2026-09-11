import { SectionWrapper } from "../ui/SectionWrapper";

const steps = [
  {
    title: "Send dit projekt",
    description: "Tegninger, mængder og projektinfo, vi klarer resten.",
  },
  {
    title: "Modtag tilbud",
    description: "Vi vurderer omfanget og sender et klart tilbud.",
  },
  {
    title: "Tidlig beregning",
    description: "LCA-beregning med hotspot-analyse og materialeoptimering.",
  },
  {
    title: "Beregning af A4+A5",
    description:
      "Vi beregner transport og byggeproces og noterer de data, der skal indsamles til den endelige rapport.",
  },
  {
    title: "Opdatering til as-built",
    description: "Beregningen opdateres med faktiske mængder fra det færdige byggeri.",
  },
  {
    title: "Myndighedsklar rapport",
    description: "Opdateret dokumentation klar til kommunen.",
  },
];

/**
 * The six steps are laid out along a dimension line: one tick per step and a
 * closing tick at the end, so each step "measures" one segment of the process.
 * Three per row on tablets, all six in one chain on wide screens, a vertical
 * chain on phones.
 */
export function Process() {
  return (
    <SectionWrapper bg="paper">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">Sådan foregår det</h2>
        <p className="mt-4 text-lg text-body">
          Seks trin fra projektstart til myndighedsklar dokumentation.
        </p>
      </div>

      <ol className="relative mt-12 grid gap-y-10 md:mt-16 md:grid-cols-3 md:gap-x-6 md:gap-y-16 xl:grid-cols-6">
        {steps.map((step, index) => (
          <li key={step.title} className="group relative pl-7 md:pl-0">
            {/* Phone: vertical chain */}
            <span
              aria-hidden="true"
              className="absolute -bottom-10 left-0 top-2 w-px bg-ink/20 group-last:hidden md:hidden"
            />
            <span aria-hidden="true" className="absolute left-0 top-2 h-px w-4 bg-ink/70 md:hidden" />

            {/* Tablet and up: horizontal chain */}
            <div aria-hidden="true" className="relative mb-5 hidden h-6 md:block">
              <span className="absolute -right-6 left-0 top-3 h-px bg-ink/20 group-[:nth-child(3n)]:right-0 xl:group-[:nth-child(3n)]:-right-6 xl:group-last:right-0" />
              <span className="absolute left-0 top-0 h-6 w-px bg-ink/70" />
              <span className="absolute right-0 top-0 hidden h-6 w-px bg-ink/70 group-[:nth-child(3n)]:block xl:group-[:nth-child(3n)]:hidden xl:group-last:block" />
            </div>

            <span className="block text-sm font-semibold text-green">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{step.title}</h3>
            <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-body">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
