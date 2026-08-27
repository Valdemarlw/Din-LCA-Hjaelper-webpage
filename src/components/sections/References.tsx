import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  {
    slug: "ternedalen-42",
    type: "Sommerhus",
    location: "Ternedalen",
    stat: "6,88 → 3,839",
    statLabel: "kg CO₂e/m²/år",
    description:
      "En dokumenteret beregnings- og optimeringsrejse med rettelser, EPD'er og tydelige forbehold.",
  },
  {
    slug: "moerkdalvej-6",
    type: "Enfamiliehus",
    location: "Silkeborg",
    stat: "+0,94 %",
    statLabel: "efter QA",
    description:
      "Kvalitetssikringen fandt manglende mængder og materialer. Det højere resultat var det mere retvisende.",
  },
  {
    slug: "lagerhal-laesovej-randers",
    type: "Lagerhal",
    location: "Randers",
    stat: "16 %",
    statLabel: "margin til grænsen",
    description:
      "Stål og beton dominerede CO₂-regnskabet. Den tidlige analyse gav et klart beslutningsgrundlag.",
  },
];

export function References() {
  return (
    <SectionWrapper bg="alt">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-navy">
          Referenceprojekter
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Se hvordan vi har hjulpet arkitekter og bygherrer med at overholde
          BR18's klimakrav.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {cases.map((c) => (
          <motion.div key={c.slug} variants={fadeUp}>
            <Link to={`/referenceprojekter/${c.slug}`} className="block h-full">
              <Card className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {c.type}
                  </span>
                  <span className="text-xs text-muted">{c.location}</span>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-navy">{c.stat}</span>
                  <span className="ml-1.5 text-sm text-muted">{c.statLabel}</span>
                </div>
                <p className="text-body text-sm leading-relaxed flex-1">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                  Læs mere <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 text-center">
        <Link
          to="/referenceprojekter"
          className="text-primary font-medium hover:underline inline-flex items-center gap-1"
        >
          Se alle referenceprojekter <ArrowRight size={16} />
        </Link>
      </div>
    </SectionWrapper>
  );
}
