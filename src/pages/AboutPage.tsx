import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp } from "../lib/animations";
import { Button } from "../components/ui/Button";

export function AboutPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Om Din LCA Hjælper, LCA-specialist for byggeri i Danmark</title>
        <meta name="description" content="Bag Din LCA Hjælper står Valdemar Løvschal Wernblad, specialiseret LCA-rådgiver med erfaring fra projekter fra 80 til 3.000 m². Vi gør LCA-beregning nemt og pålideligt." />
        <link rel="canonical" href="https://dinlcahjælper.dk/om-os" />
        <meta property="og:title" content="Om Din LCA Hjælper, LCA-specialist for byggeri" />
        <meta property="og:description" content="Specialiseret LCA-rådgiver i Danmark med erfaring fra bolig, erhverv og industri. Fra 80 til 3.000 m²." />
        <meta property="og:url" content="https://dinlcahjælper.dk/om-os" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28 lg:py-32">
        <div className="absolute left-0 top-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl mx-auto relative">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Om Din LCA Hjælper
          </motion.h1>

          <motion.div
            className="mt-8 space-y-6 text-lg text-body leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p>
              Bag Din LCA Hjælper står Valdemar Løvschal Wernblad, specialiseret i
              LCA-beregning for byggeri. Med erfaring fra projekter i størrelser fra
              80 til 3.000 m² hjælper vi arkitekter og rådgivere med at navigere
              BR18s klimakrav, så de kan fokusere på det, de er bedst til.
            </p>

            <p>
              Vi tror på, at LCA-beregning ikke behøver at være kompliceret. Derfor
              håndterer vi hele processen, fra gennemgang af tegninger og tidlig
              beregning til myndighedsklar rapport. Vores mål er at gøre det nemt,
              gennemsigtigt og pålideligt, uanset om det drejer sig om bolig, erhverv
              eller industri.
            </p>

            <p>
              Vi beregner også transport og byggeproces (A4+A5) som en del af
              opgaven. I den tidlige beregning dokumenterer vi eventuelle
              standardforudsætninger. Inden den endelige rapport opdaterer vi med
              de faktiske oplysninger, der er tilgængelige fra projektet.
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button to="/kontakt">Kontakt os</Button>
          </motion.div>
        </div>
        </div>
      </section>
    </motion.div>
  );
}
