import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/ui/PageHero";
import { trackAnalyticsEvent } from "../lib/analytics";
import { BYGNINGSTYPER } from "../lib/br18";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "80bd8607-2b37-4bfd-9ad3-184e93658aed";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-ink transition-colors placeholder:text-muted/70 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20";
const labelCls = "block text-sm font-medium text-ink";

const nextSteps = [
  "Du sender os projektinfo her eller på mail. Tegninger er en stor hjælp.",
  "Vi ser på omfanget og vender tilbage inden for 24 timer med et tilbud.",
  "Siger du ja, går vi i gang med den tidlige beregning.",
];

/** Danish text instead of the browser's default validation messages. */
function danishValidity(e: React.InvalidEvent<HTMLInputElement>) {
  const el = e.currentTarget;
  if (el.validity.valueMissing) el.setCustomValidity("Udfyld feltet.");
  else if (el.validity.typeMismatch) el.setCustomValidity("Skriv en gyldig mailadresse.");
  else el.setCustomValidity("");
}

function clearValidity(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.setCustomValidity("");
}

function Required() {
  return (
    <span className="text-brick" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const hasTrackedStart = useRef(false);
  const [params] = useSearchParams();
  // Answers carried over from the BR18 checker, so the visitor does not type them twice.
  const typeParam = params.get("type") ?? "";
  const presetType = BYGNINGSTYPER.some((t) => t.value === typeParam) ? typeParam : "";
  const m2Param = Number(params.get("m2"));
  const presetArea = Number.isFinite(m2Param) && m2Param > 0 ? String(Math.round(m2Param)) : "";
  const presetByggeri = params.get("byggeri") === "tilbygning" ? "tilbygning" : params.get("byggeri") === "nybyggeri" ? "nybyggeri" : "";

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

      <PageHero
        title="Kontakt os"
        lede="Send os information om dit projekt, så vender vi tilbage med et tilbud. Du kan også ringe eller skrive direkte."
      />

      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* Phones: contact, form, then what happens next. Desktop: contact and next steps share the left column. */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
            {/* Direct contact */}
            <div className="lg:col-span-5 lg:row-start-1">
              <div className="space-y-4">
                <a
                  href="tel:+4529899999"
                  className="block text-2xl font-bold text-ink transition-colors hover:text-green md:text-3xl"
                >
                  +45 29 89 99 99
                </a>
                <a
                  href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                  className="block break-all text-lg text-ink transition-colors hover:text-green"
                >
                  valdemar.wernblad@dinlcahjælper.dk
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              {submitted ? (
                <div className="rounded-sheet bg-mist p-8 md:p-10" role="status">
                  <h2 className="text-2xl font-bold text-ink">Tak for din henvendelse</h2>
                  <p className="mt-3 text-lg text-body">Vi vender tilbage inden for 24 timer.</p>
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
                  className="rounded-sheet bg-white p-6 ring-1 ring-line md:p-8"
                >
                  {/* Honeypot spam protection */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>
                        Navn
                        <Required />
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        onInvalid={danishValidity}
                        onInput={clearValidity}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelCls}>
                        Email
                        <Required />
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        onInvalid={danishValidity}
                        onInput={clearValidity}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelCls}>
                        Telefon
                      </label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" className={`${inputCls}`} />
                    </div>

                    <div>
                      <label htmlFor="project-type" className={labelCls}>
                        Projekttype
                      </label>
                      <select id="project-type" name="project-type" defaultValue={presetType} className={inputCls}>
                        <option value="">Vælg type...</option>
                        {BYGNINGSTYPER.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      {presetByggeri && <input type="hidden" name="byggeri" value={presetByggeri} />}
                    </div>

                    <div>
                      <label htmlFor="area" className={labelCls}>
                        Estimeret areal m²
                      </label>
                      <input
                        id="area"
                        name="area"
                        type="number"
                        min="0"
                        inputMode="numeric"
                        defaultValue={presetArea}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="timeline" className={labelCls}>
                        Tidshorisont / Forventet byggestart
                      </label>
                      <input id="timeline" name="timeline" type="text" className={inputCls} />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelCls}>
                        Besked
                      </label>
                      <textarea id="message" name="message" rows={5} className={`${inputCls} resize-y`} />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
                      {submitting ? "Sender..." : "Send forespørgsel"}
                    </Button>
                    <p className="text-sm text-muted">Uforpligtende. Vi vender tilbage inden for 24 timer.</p>
                  </div>

                  {error && (
                    <p className="mt-4 text-sm text-brick" role="alert">
                      Noget gik galt. Prøv igen, eller skriv direkte til{" "}
                      <a href="mailto:valdemar.wernblad@dinlcahjælper.dk" className="underline underline-offset-2">
                        valdemar.wernblad@dinlcahjælper.dk
                      </a>
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* What happens next */}
            <div className="lg:col-span-5 lg:row-start-2">
              <div>
                <h2 className="text-lg font-bold text-ink">Det sker, når du har skrevet</h2>
                <ol className="mt-4 space-y-4">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green text-sm font-semibold text-white"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed text-body">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 rounded-sheet bg-mist p-5 text-[15px] leading-relaxed text-body md:p-6">
                <p>
                  <strong className="font-semibold text-ink">Tegninger?</strong> Send dem gerne direkte til{" "}
                  <a
                    href="mailto:valdemar.wernblad@dinlcahjælper.dk"
                    className="break-all text-green underline decoration-green/40 underline-offset-2 hover:decoration-green"
                  >
                    valdemar.wernblad@dinlcahjælper.dk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
