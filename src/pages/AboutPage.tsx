import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { Logo } from "../components/ui/Logo";

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

      <PageHero title="Om Din LCA Hjælper" />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 text-lg leading-relaxed text-body lg:col-span-7">
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
              <div className="pt-4">
                <Button to="/kontakt">Kontakt os</Button>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="overflow-hidden rounded-sheet bg-white">
                {/* Portrait slot. Until a photo is chosen the brand mark holds the space. */}
                <div className="flex aspect-[4/3] items-center justify-center bg-mist">
                  <Logo kind="mark" className="h-24 w-auto" decorative />
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold text-ink">Valdemar Løvschal Wernblad</p>
                  <p className="mt-0.5 text-[15px] text-muted">LCA-rådgiver</p>
                  <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-[15px]">
                    <li>
                      <a href="tel:+4529899999" className="text-ink transition-colors hover:text-green">
                        +45 29 89 99 99
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                        className="break-all text-ink transition-colors hover:text-green"
                      >
                        valdemar.wernblad@dinlcahjælper.dk
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
