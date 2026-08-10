import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { FileText, Search, Lightbulb, ClipboardCheck, Truck } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "LCA-beregning",
    description: "Komplet beregning fra tidlig fase til myndighedsklar rapport, klar til kommunen.",
  },
  {
    icon: Search,
    title: "Hotspot-analyse",
    description: "Vi identificerer de mest CO₂-tunge bygningsdele, så du ved hvor indsatsen skal lægges.",
  },
  {
    icon: Lightbulb,
    title: "Materialeoptimering",
    description: "Forslag til alternative materialer hvis grænseværdien er i fare, inden det bliver et problem.",
  },
  {
    icon: ClipboardCheck,
    title: "Opdatering ved færdigmelding",
    description:
      "Vi opdaterer beregningen med endelige mængder og de registrerede data fra byggepladsen, så rapporten matcher det byggede.",
  },
  {
    icon: Truck,
    title: "A4/A5-beregning",
    description:
      "Tidligt beregner vi A4 og A5 med dokumenterede generiske forudsætninger. Efter byggeriet opdaterer vi A5 med det registrerede forbrug fra byggepladsen og de endelige projektoplysninger.",
    highlighted: true,
  },
];

export function Services() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">
          Det får du
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          En komplet LCA-løsning fra start til slut, så du kan aflevere med ro i maven.
        </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-6"
      >
        {/* Row 1: 3 standard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <Card className="h-full">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <service.icon size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-navy">
                    {service.title}
                  </h3>
                </div>
                <p className="text-body leading-relaxed">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Row 2: 1 standard + 1 wide featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Opdatering card */}
          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                <ClipboardCheck size={24} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-navy">
                  {services[3].title}
                </h3>
              </div>
              <p className="text-body leading-relaxed">{services[3].description}</p>
            </Card>
          </motion.div>

          {/* A4/A5 card, spans 2 cols on md+ */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <Card highlighted className="h-full">
              <div className="md:flex md:items-start md:gap-6">
                <div className="mb-4 md:mb-0 md:shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-navy">
                      {services[4].title}
                    </h3>
                    <Badge>Inkluderet</Badge>
                  </div>
                  <p className="text-body leading-relaxed">{services[4].description}</p>
                  <ul className="mt-3 space-y-1.5 text-body text-sm leading-relaxed">
                    <li>A4: Dokumenterede generiske transportforudsætninger for materialer</li>
                    <li>A5: Foreløbige værdier for spild og byggepladsforbrug</li>
                    <li>Entreprenøren registrerer el, varme, gas og brændstof under byggeriet</li>
                    <li>Vi indarbejder de registrerede data i den endelige rapport</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
