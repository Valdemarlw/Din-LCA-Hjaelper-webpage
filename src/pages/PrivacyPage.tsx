import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { ANALYTICS_SETTINGS_EVENT } from "../lib/analytics";
import { PageHero } from "../components/ui/PageHero";
import { Button } from "../components/ui/Button";

export function PrivacyPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Privatliv og statistik | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Læs hvilke oplysninger Din LCA Hjælper indsamler til cookieløs hjemmesidestatistik, og hvordan du ændrer dit valg."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/privatliv" />
        <meta property="og:title" content="Privatliv og statistik | Din LCA Hjælper" />
        <meta
          property="og:description"
          content="Læs hvilke oplysninger vi indsamler til cookieløs hjemmesidestatistik."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/privatliv" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      <PageHero width="narrow" size="compact" title="Privatliv og statistik" />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="space-y-8 leading-relaxed text-body">
            <section>
              <h2 className="text-xl font-bold text-ink">Hvad vi måler</h2>
              <p className="mt-2">
                Hvis du siger ja, måler vi sidevisninger, trafikkilde og UTM-parametre. Vi måler
                også, om BR18-tjekkeren bliver brugt, om kontaktformularen bliver startet og sendt,
                og om nogen klikker på telefon, mail eller en kontaktknap.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Hvad vi ikke indsamler</h2>
              <p className="mt-2">
                Vi sender ikke navn, mailadresse, telefonnummer, beskeder eller andre formularfelter
                til statistiksystemet. Vi gemmer ikke IP-adresser, laver ikke heatmaps og optager
                ikke din skærm.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">PostHog</h2>
              <p className="mt-2">
                Statistikken behandles af PostHog i deres EU-region. Vi bruger en cookieløs
                opsætning uden personprofiler. PostHog bliver først indlæst, når du har sagt ja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Du kan altid ændre dit valg</h2>
              <p className="mt-2">
                Dit valg bliver gemt i din browser. Du kan åbne indstillingerne igen her eller via
                linket nederst på siden.
              </p>
              <div className="mt-5">
                <Button
                  variant="secondary"
                  onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
                >
                  Åbn statistikindstillinger
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">Kontakt</h2>
              <p className="mt-2">
                Har du spørgsmål, kan du skrive til{" "}
                <a
                  className="text-green underline decoration-green/40 underline-offset-2 hover:decoration-green"
                  href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                >
                  valdemar.wernblad@dinlcahjælper.dk
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
