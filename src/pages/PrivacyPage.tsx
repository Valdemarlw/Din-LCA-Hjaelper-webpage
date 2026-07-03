import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";

export function PrivacyPage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Privatlivspolitik | Din LCA Hjælper</title>
        <meta
          name="description"
          content="Sådan behandler Din LCA Hjælper dine oplysninger: hvad vi indsamler via kontaktformularen, hvordan vi måler trafik uden cookies, og hvilke rettigheder du har."
        />
        <link rel="canonical" href="https://dinlcahjælper.dk/privatlivspolitik" />
        <meta property="og:title" content="Privatlivspolitik | Din LCA Hjælper" />
        <meta
          property="og:description"
          content="Sådan behandler Din LCA Hjælper dine oplysninger. Ingen cookies, ingen tracking på tværs af sider."
        />
        <meta property="og:url" content="https://dinlcahjælper.dk/privatlivspolitik" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/30 py-20 md:py-28">
        <div className="absolute right-0 top-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
            Privatlivspolitik
          </h1>
          <p className="mt-4 text-lg text-body">
            Her kan du læse, hvilke oplysninger vi behandler, hvorfor vi gør det, og hvilke
            rettigheder du har.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8 space-y-12">
          <div>
            <h2 className="text-2xl font-semibold text-navy">Dataansvarlig</h2>
            <p className="mt-3 text-body leading-relaxed">
              Din LCA Hjælper, CVR 45 80 00 59, er dataansvarlig for de oplysninger, du giver
              os via denne hjemmeside. Har du spørgsmål til vores behandling af dine
              oplysninger, kan du altid skrive til{" "}
              <a
                href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                className="text-primary hover:underline"
              >
                valdemar.wernblad@dinlcahjælper.dk
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Kontaktformularen</h2>
            <p className="mt-3 text-body leading-relaxed">
              Når du udfylder kontaktformularen, beder vi om dit navn og din e-mail. Du kan
              også vælge at oplyse telefonnummer, projekttype, areal, tidshorisont og en
              besked. Vi bruger kun oplysningerne til at besvare din henvendelse og give dig
              et tilbud på en LCA-beregning.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              Formularen leveres teknisk af tjenesten Web3Forms, som sender din besked videre
              til vores mail. Web3Forms fungerer her som databehandler og behandler kun
              beskeden for at levere den til os.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              Vi gemmer din henvendelse, så længe det er nødvendigt for at besvare dig og
              følge op på et eventuelt samarbejde. Bliver du kunde, gemmer vi
              korrespondancen som en del af projektet, og bogføringsmateriale opbevares efter
              bogføringslovens regler.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Statistik uden cookies</h2>
            <p className="mt-3 text-body leading-relaxed">
              Vi måler trafikken på siden med Plausible Analytics. Værktøjet bruger hverken
              cookies eller anden lagring på din enhed, og det gemmer ikke personoplysninger
              om dig. Vi kan se samlede tal, fx hvor mange der besøger en side, men ikke
              hvem du er, og du kan ikke følges på tværs af hjemmesider eller over tid.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              Plausible er en europæisk tjeneste, og data behandles på servere i EU.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Cookies</h2>
            <p className="mt-3 text-body leading-relaxed">
              Hjemmesiden sætter ingen cookies. Derfor møder du heller ikke et
              cookie-banner.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy">Dine rettigheder</h2>
            <p className="mt-3 text-body leading-relaxed">
              Du kan bede om indsigt i de oplysninger, vi har om dig, få dem rettet eller
              slettet, og gøre indsigelse mod vores behandling. Skriv til{" "}
              <a
                href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                className="text-primary hover:underline"
              >
                valdemar.wernblad@dinlcahjælper.dk
              </a>
              , så svarer vi hurtigst muligt.
            </p>
            <p className="mt-3 text-body leading-relaxed">
              Er du uenig i den måde, vi behandler dine oplysninger på, kan du klage til
              Datatilsynet via{" "}
              <a
                href="https://www.datatilsynet.dk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                datatilsynet.dk
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-muted">Senest opdateret 3. juli 2026.</p>
        </div>
      </section>
    </motion.div>
  );
}
