import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import {
  Send,
  FileCheck,
  BarChart3,
  MonitorCog,
  RefreshCw,
  FileOutput,
} from "lucide-react";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Send dit projekt",
    description: "Tegninger, mængder og projektinfo, vi klarer resten.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Modtag tilbud",
    description: "Vi vurderer omfanget og sender et klart tilbud.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "Tidlig beregning",
    description: "LCA-beregning med hotspot-analyse og materialeoptimering.",
  },
  {
    icon: MonitorCog,
    number: "04",
    title: "Opsætning af A45",
    description:
      "A45 platformen sættes op til dokumentation af A4- og A5-moduler.",
  },
  {
    icon: RefreshCw,
    number: "05",
    title: "Opdatering til as-built",
    description:
      "Beregningen opdateres med faktiske mængder fra det færdige byggeri.",
  },
  {
    icon: FileOutput,
    number: "06",
    title: "Myndighedsklar rapport",
    description: "Opdateret dokumentation klar til kommunen.",
  },
];

/* lg:order classes to reverse row 2, creating a snake reading pattern:
   Row 1 (L→R): 01 → 02 → 03
   Row 2 (R→L): 04 → 05 → 06   */
const snakeOrder = ["", "", "", "lg:order-6", "lg:order-5", "lg:order-4"];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper bg="teal">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">
          Sådan foregår det
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Seks trin fra projektstart til myndighedsklar dokumentation.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Vertical timeline connector, mobile only */}
        <div className="md:hidden absolute left-[27px] top-7 bottom-7 w-0.5 bg-primary/15" />

        {/* Snake connector, desktop only */}
        <svg
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M 17 8 L 83 8 C 97 8, 97 62, 83 62 L 17 62"
            stroke="#0D7C6E"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeOpacity="0.2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className={`relative ${snakeOrder[index]} flex items-start gap-4 md:block md:text-center`}
              >
                <div className="relative shrink-0 md:mx-auto mb-0 md:mb-5 w-14 h-14">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shadow-sm z-10">
                    {step.number}
                  </span>
                </div>
                <div className="pt-1 md:pt-0">
                  <h3 className="text-lg font-semibold text-navy mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed md:max-w-xs md:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
