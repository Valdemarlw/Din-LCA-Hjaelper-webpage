import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { ANALYTICS_SETTINGS_EVENT } from "../lib/analytics";

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

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h1 className="text-3xl font-bold text-navy md:text-4xl">Privatliv og statistik</h1>
          <div className="mt-8 space-y-7 leading-relaxed text-body">
            <section>
              <h2 className="text-xl font-semibold text-navy">Hvad vi måler</h2>
              <p className="mt-2">
                Hvis du siger ja, måler vi sidevisninger, trafikkilde og UTM-parametre. Vi måler
                også, om BR18-tjekkeren bliver brugt, om kontaktformularen bliver startet og sendt,
                og om nogen klikker på telefon, mail eller en kontaktknap.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy">Hvad vi ikke indsamler</h2>
              <p className="mt-2">
                Vi sender ikke navn, mailadresse, telefonnummer, beskeder eller andre formularfelter
                til statistiksystemet. Vi gemmer ikke IP-adresser, laver ikke heatmaps og optager
                ikke din skærm.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy">PostHog</h2>
              <p className="mt-2">
                Statistikken behandles af PostHog i deres EU-region. Vi bruger en cookieløs
                opsætning uden personprofiler. PostHog bliver først indlæst, når du har sagt ja.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy">Du kan altid ændre dit valg</h2>
              <p className="mt-2">
                Dit valg bliver gemt i din browser. Du kan åbne indstillingerne igen her eller via
                linket nederst på siden.
              </p>
              <button
                type="button"
                className="mt-4 rounded-[10px] border border-primary px-5 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
              >
                Åbn statistikindstillinger
              </button>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy">Kontakt</h2>
              <p className="mt-2">
                Har du spørgsmål, kan du skrive til{" "}
                <a className="text-primary underline" href="mailto:valdemar.wernblad@dinlcahjælper.dk">
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
