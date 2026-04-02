import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../../lib/animations";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Hvad er en LCA-beregning?",
    answer:
      "En LCA-beregning (livscyklusvurdering) opgør et byggeris samlede miljøpåvirkning over hele dets levetid — fra materialeproduktion til nedrivning. Beregningen er lovpligtig efter BR18 og dokumenterer bl.a. CO₂-udledning pr. m² pr. år. Resultatet afleveres som en rapport til kommunen sammen med færdigmeldingen.",
  },
  {
    question: "Hvornår er LCA-beregning lovpligtigt?",
    answer:
      "Alle nye opvarmede byggerier skal have en LCA-beregning uanset størrelse. For uopvarmede bygninger gælder kravet ved arealer over 50 m², og for tilbygninger over 250 m². Kravet følger af BR18 og skal dokumenteres ved færdigmelding for at opnå ibrugtagningstilladelse.",
  },
  {
    question: "Hvad koster en LCA-beregning?",
    answer:
      "Vores priser starter fra 3.500 kr inkl. adgang til A45-platformen. Den endelige pris afhænger af projektets størrelse, kompleksitet og antal konstruktionstyper. Send os dine tegninger, så giver vi et fast tilbud inden for 24 timer.",
  },
  {
    question: "Hvor lang tid tager en LCA-beregning?",
    answer:
      "En typisk LCA-beregning tager 1-2 uger fra vi modtager det nødvendige projektmateriale. Ved tidlig fase kan vi levere en foreløbig beregning hurtigere. Vi anbefaler at involvere os så tidligt som muligt, så materialevalgene kan bygge på LCA-resultaterne.",
  },
  {
    question: "Hvad er A4- og A5-faserne i LCA?",
    answer:
      "A4 dækker transport af materialer til byggepladsen, og A5 dækker spild og affald under selve opførelsen. Disse faser kræver data fra leverandører og underentreprenører. Vores A45-platform gør det nemt at indsamle og dokumentere disse data automatisk.",
  },
  {
    question: "Hvad er grænseværdien for CO₂ i BR18?",
    answer:
      "Fra 1. juli 2025 gælder differentierede grænseværdier afhængigt af bygningstype: sommerhuse under 150 m² skal holde 4,0 kg CO₂e/m²/år, enfamiliehuse og rækkehuse 6,7, etageboliger og kontor 7,5, og øvrigt nybyggeri 8,0. Derudover er der en separat grænse for byggeprocessen (A4+A5) på 1,5 kg CO₂e/m²/år for alle typer.",
  },
  {
    question: "Kan I hjælpe med både bolig og erhverv?",
    answer:
      "Ja, vi håndterer LCA-beregninger for alle bygningstyper — bolig, erhverv og industri. Vi har erfaring med projekter fra 80 til 3.000 m² og tilpasser altid vores tilgang til det konkrete projekts kompleksitet og krav.",
  },
  {
    question: "Hvem bør lave min LCA-beregning?",
    answer:
      "En LCA-beregning bør udføres af en specialist med erfaring i BR18-kravene og de relevante beregningsværktøjer. Din LCA Hjælper er specialiseret udelukkende i LCA for byggeri, hvilket sikrer præcise beregninger og myndighedsklar dokumentation. Vi anbefaler at vælge en rådgiver der inkluderer opdatering ved færdigmelding, da mange projekter ellers ender med en rapport der ikke matcher det faktisk byggede.",
  },
  {
    question: "Hvad skal jeg kigge efter i en LCA-rådgiver?",
    answer:
      "Kig efter erfaring med din bygningstype, inkludering af hotspot-analyse og materialeoptimering, samt om de tilbyder opdatering ved færdigmelding. Det er også vigtigt at rådgiveren kan dokumentere A4- og A5-faserne, da disse ofte overses men er lovpligtige. Hos Din LCA Hjælper er alt dette inkluderet — sammen med adgang til A45-platformen.",
  },
  {
    question: "Kan jeg få LCA-beregning hurtigt?",
    answer:
      "Ja. En typisk LCA-beregning tager 1-2 uger, men ved tidlig fase kan vi levere en foreløbig beregning hurtigere. Vi tilbyder fast tilbud inden for 24 timer efter modtagelse af tegninger. Kontakt os på +45 29 89 99 99 eller via kontaktformularen.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <h3 className="text-lg font-semibold text-navy">{question}</h3>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-body leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export function FAQ() {
  return (
    <SectionWrapper bg="alt">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-navy">
            Ofte stillede spørgsmål
          </h2>
          <p className="mt-4 text-lg text-muted">
            Alt hvad du skal vide om LCA-beregning for byggeri i Danmark.
          </p>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-border bg-white px-6 md:px-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {faqs.map((faq) => (
            <motion.div key={faq.question} variants={fadeUp}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
