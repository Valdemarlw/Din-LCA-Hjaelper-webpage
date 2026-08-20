import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { Phone, Mail, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { trackAnalyticsEvent } from "../lib/analytics";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "80bd8607-2b37-4bfd-9ad3-184e93658aed";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const hasTrackedStart = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "Ny forespørgsel fra dinlcahjælper.dk");

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        trackAnalyticsEvent("kontakt_formular_sendt");
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>Kontakt Din LCA Hjælper, Få tilbud på LCA-beregning</title>
        <meta name="description" content="Bestil LCA-beregning til dit byggeprojekt. Send os dine tegninger og få et tilbud inden for 24 timer. Ring +45 29 89 99 99 eller skriv direkte." />
        <link rel="canonical" href="https://dinlcahjælper.dk/kontakt" />
        <meta property="og:title" content="Kontakt Din LCA Hjælper, Få tilbud på LCA-beregning" />
        <meta property="og:description" content="Send os dine tegninger og få et tilbud inden for 24 timer. Vi håndterer LCA-beregningen fra start til slut." />
        <meta property="og:url" content="https://dinlcahjælper.dk/kontakt" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>
      <section className="relative overflow-hidden bg-gradient-to-br from-bg via-bg to-primary-light/20 py-20 md:py-28 lg:py-32">
        <div className="absolute right-0 top-1/4 translate-x-1/3 w-[350px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Left, Intro + contact */}
            <motion.div variants={fadeUp}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Kontakt os
              </h1>
              <p className="mt-6 text-lg text-body leading-relaxed">
                Send os information om dit projekt, så vender vi tilbage med et
                tilbud. Du kan også ringe eller skrive direkte.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+4529899999"
                  className="flex items-center gap-3 text-lg text-navy hover:text-primary transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                    <Phone size={20} />
                  </div>
                  +45 29 89 99 99
                </a>
                <a
                  href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                  className="flex items-center gap-3 text-lg text-navy hover:text-primary transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                    <Mail size={20} />
                  </div>
                  valdemar.wernblad@dinlcahjælper.dk
                </a>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-bg-alt border border-border">
                <p className="text-sm text-muted">
                  <strong className="text-navy">Tegninger?</strong> Send dem gerne direkte til{" "}
                  <a
                    href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                    className="text-primary hover:underline"
                  >
                    valdemar.wernblad@dinlcahjælper.dk
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Right, Form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="rounded-2xl border border-border bg-bg-alt p-8 md:p-10 text-center">
                  <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                    <Send size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold text-navy">
                    Tak for din henvendelse
                  </h2>
                  <p className="mt-3 text-body">
                    Vi vender tilbage inden for 24 timer.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  onFocusCapture={() => {
                    if (!hasTrackedStart.current) {
                      hasTrackedStart.current = true;
                      trackAnalyticsEvent("kontakt_formular_startet");
                    }
                  }}
                  className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-5"
                >
                  {/* Honeypot spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  {/* Navn */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                      Navn <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Telefon */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
                      Telefon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Projekttype */}
                  <div>
                    <label htmlFor="project-type" className="block text-sm font-medium text-navy mb-1.5">
                      Projekttype
                    </label>
                    <select
                      id="project-type"
                      name="project-type"
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="">Vælg type...</option>
                      <option value="bolig">Bolig</option>
                      <option value="erhverv">Erhverv</option>
                      <option value="industri">Industri</option>
                      <option value="andet">Andet</option>
                    </select>
                  </div>

                  {/* Areal */}
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-navy mb-1.5">
                      Estimeret areal m²
                    </label>
                    <input
                      id="area"
                      name="area"
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Tidshorisont */}
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-navy mb-1.5">
                      Tidshorisont / Forventet byggestart
                    </label>
                    <input
                      id="timeline"
                      name="timeline"
                      type="text"
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Besked */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                      Besked
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-y"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {submitting ? "Sender..." : "Send forespørgsel"}
                  </Button>

                  {error && (
                    <p className="text-sm text-red-600 text-center">
                      Noget gik galt. Prøv igen, eller skriv direkte til{" "}
                      <a href="mailto:valdemar.wernblad@dinlcahjælper.dk" className="underline">
                        valdemar.wernblad@dinlcahjælper.dk
                      </a>
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
