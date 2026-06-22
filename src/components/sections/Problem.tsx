import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import { AlertTriangle, BookOpen, Clock } from "lucide-react";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Det er lovpligtigt",
    description:
      "Alle nye opvarmede byggerier kræver en LCA-beregning efter BR18, uanset størrelse. For uopvarmede bygninger over 50 m² og tilbygninger over 250 m² gælder kravet også. Uden den, ingen ibrugtagningstilladelse.",
  },
  {
    icon: BookOpen,
    title: "Det kræver specialviden",
    description:
      "En korrekt LCA kræver faglig indsigt i materialer, konstruktioner og lovkrav, samt kendskab til de rette beregningsværktøjer og hvordan de bruges. Det er ikke noget man bare lige gør.",
  },
  {
    icon: Clock,
    title: "Tænk LCA ind fra start",
    description:
      "Materiale- og konstruktionsvalg bør bygge på LCA-beregningen. Jo tidligere du involverer en specialist, jo færre overraskelser undervejs.",
  },
];

export function Problem() {
  return (
    <SectionWrapper bg="alt">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">
          Hvorfor LCA-beregning ikke er til at komme udenom
        </h2>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {painPoints.map((point) => (
          <motion.div
            key={point.title}
            variants={fadeUp}
            className="rounded-xl border border-border border-t-2 border-t-primary/20 bg-white p-6 md:p-8"
          >
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <point.icon size={24} />
            </div>
            <h3 className="text-lg font-semibold text-navy mb-2">
              {point.title}
            </h3>
            <p className="text-body leading-relaxed">{point.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
