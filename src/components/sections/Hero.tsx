import { motion } from "framer-motion";
import { wordReveal, wordChild } from "../../lib/animations";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { HeroReportCard } from "./HeroReportCard";

function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span variants={wordReveal} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span variants={wordChild} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Venstre: tekst + CTA */}
          <motion.div initial="hidden" animate="visible" variants={wordReveal}>
            <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-navy leading-[1.1] tracking-tight">
              <RevealText text="LCA-beregning der bare virker" />
            </h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-body leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Vi håndterer hele LCA-beregningen, fra tidlig fase til myndighedsklar rapport, så du kan fokusere på projektet.
            </motion.p>

            <motion.p
              className="mt-3 text-sm text-muted max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Din LCA Hjælper er en dansk LCA-rådgivningsvirksomhed der leverer myndighedsklar LCA-beregning for byggeri efter BR18. Vi betjener arkitekter og rådgivere i hele Danmark med beregninger for bolig, erhverv og industri, fra 80 til 3.000 m².
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button to="/kontakt">Få et tilbud</Button>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-navy">Fra 4.000 kr</span>
                <Badge>A4+A5 inkluderet</Badge>
              </div>
            </motion.div>
          </motion.div>

          {/* Højre: eksempel-rapportkort */}
          <HeroReportCard />
        </div>
      </div>
    </section>
  );
}
