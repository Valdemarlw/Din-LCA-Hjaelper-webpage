import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { evaluateBR18, prisTypeFor, type Bygningstype, type Byggeri, type LovpligtStatus } from "../../lib/br18";
import { beregnPris, formatKr } from "../../lib/pris";
import { kommatal } from "../../lib/format";
import { trackAnalyticsEvent } from "../../lib/analytics";
import { Picker, type PickerGroup } from "../ui/Picker";

const ico = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);
const I = {
  hus: ico(<><path d="M3.5 11 12 4l8.5 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>),
  raekke: ico(<><path d="M2.5 11 7 7l4.5 4M12.5 11 17 7l4.5 4" /><path d="M4 10v10h16V10" /><path d="M12 11v9" /></>),
  sommer: ico(<><path d="M3 12 12 5l9 7" /><path d="M6 10.5V20h12v-9.5" /><path d="M9 20v-4h6v4" /><path d="M18 4.5v2" /></>),
  etage: ico(<><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></>),
  kontor: ico(<><rect x="3.5" y="7" width="17" height="13" rx="1" /><path d="M9 7V4h6v3M3.5 12h17" /></>),
  butik: ico(<><path d="M4 9h16l-1-5H5z" /><path d="M5 9v11h14V9M10 20v-5h4v5" /></>),
  lager: ico(<><path d="M3 9 12 4l9 5v11H3z" /><path d="M7 20v-7h10v7M7 16h10" /></>),
  institution: ico(<><path d="M3 9h18L12 4z" /><path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>),
  andet: ico(<><circle cx="6" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18" cy="12" r="1.3" /></>),
  ny: ico(<><path d="M12 5v14M5 12h14" /></>),
  til: ico(<><rect x="3.5" y="9" width="10" height="11" rx="1" /><path d="M13.5 13h7v7h-7" /><path d="M17 4v4M15 6h4" /></>),
};

/** Building types: the menu shows the noun, the sentence shows it with its article. */
const TYPER: { value: Bygningstype; label: string; sentence: string; hint?: string; icon: React.ReactNode; group: string }[] = [
  { value: "enfamiliehus", label: "Enfamiliehus", sentence: "et enfamiliehus", hint: "Parcelhus og stuehus", icon: I.hus, group: "Bolig" },
  { value: "raekkehus", label: "Række- eller dobbelthus", sentence: "et række- eller dobbelthus", hint: "Også kædehuse", icon: I.raekke, group: "Bolig" },
  { value: "sommerhus", label: "Sommerhus", sentence: "et sommerhus", hint: "Fritidshus", icon: I.sommer, group: "Bolig" },
  { value: "etagebolig", label: "Etagebolig", sentence: "en etagebolig", icon: I.etage, group: "Bolig" },
  { value: "kontor", label: "Kontorbygning", sentence: "en kontorbygning", icon: I.kontor, group: "Erhverv" },
  { value: "handel", label: "Butik", sentence: "en butik", icon: I.butik, group: "Erhverv" },
  { value: "lager", label: "Lager eller hal", sentence: "et lager eller en hal", icon: I.lager, group: "Erhverv" },
  { value: "institution", label: "Institution", sentence: "en institution", hint: "Skole, daginstitution", icon: I.institution, group: "Andet" },
  { value: "andet", label: "Noget andet", sentence: "noget andet", icon: I.andet, group: "Andet" },
];
const TYPE_GROUPS: PickerGroup[] = ["Bolig", "Erhverv", "Andet"].map((g) => ({
  label: g,
  options: TYPER.filter((t) => t.group === g).map(({ value, label, hint, icon }) => ({ value, label, hint, icon })),
}));
const BYGGERI_GROUPS: PickerGroup[] = [
  {
    options: [
      { value: "nybyggeri", label: "Nybyggeri", hint: "En ny bygning", icon: I.ny },
      { value: "tilbygning", label: "Tilbygning", hint: "Til en eksisterende bygning", icon: I.til },
    ],
  },
];

/** Example projects the sentence cycles through until the visitor takes over. */
const EXAMPLES: { type: Bygningstype; m2: string; byggeri: Byggeri }[] = [
  { type: "enfamiliehus", m2: "160", byggeri: "nybyggeri" },
  { type: "sommerhus", m2: "94", byggeri: "nybyggeri" },
  { type: "kontor", m2: "1200", byggeri: "nybyggeri" },
  { type: "raekkehus", m2: "480", byggeri: "nybyggeri" },
  { type: "enfamiliehus", m2: "40", byggeri: "tilbygning" },
  { type: "lager", m2: "600", byggeri: "nybyggeri" },
];
const HOLD_MS = 3200;
const ROUNDS = 2;

const STATUS: Record<LovpligtStatus, string> = {
  lovpligtig: "Lovpligtig",
  kun_dokumentation: "Lovpligtig, uden grænseværdi",
  undtaget_tilbygning: "Undtaget",
  undtaget_helt: "Ikke omfattet",
};

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="pointer-events-none h-3.5 w-3.5 shrink-0 translate-y-px" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Holds its width while the text inside changes and eases to the new width,
 * so the sentence reflows smoothly instead of snapping. The new text fades in
 * from a light blur while the demo runs.
 */
function Glide({ k, swap, children }: { k: string; swap: boolean; children: ReactNode }) {
  const inner = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    // Re-measure when the text changes and when the web font finishes loading.
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [k]);
  return (
    <span
      className="glide inline-block overflow-hidden whitespace-nowrap align-bottom"
      style={width === null ? undefined : { width }}
    >
      <span ref={inner} key={k} className={`inline-block ${swap ? "demo-swap" : ""}`}>
        {children}
      </span>
    </span>
  );
}

/** Eases its height when the sentence re-wraps to a different number of lines. */
function GlideHeight({ children }: { children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="glide-h overflow-hidden" style={height === null ? undefined : { height }}>
      <div ref={inner}>{children}</div>
    </div>
  );
}

const fieldCls =
  "rounded-lg bg-green-soft font-semibold text-green shadow-[inset_0_-2px_0_var(--color-green)] outline-none transition-[background-color,scale] duration-150 ease-out hover:bg-[#d4e8dd] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark aria-expanded:bg-[#d4e8dd]";

/**
 * The seal carries the BR18 limit for the chosen building type. It is the one
 * moving part on the page: the number settles in when the limit changes.
 */
function Seal({ value }: { value: number | null }) {
  return (
    <div
      className="relative mx-auto mb-6 grid h-24 w-24 -rotate-6 place-items-center rounded-full bg-spark text-green-deep shadow-[0_18px_30px_-18px_rgb(0_0_0/0.55)] lg:absolute lg:right-6 lg:top-6 lg:mb-0 lg:h-32 lg:w-32 xl:right-10 xl:top-10 xl:h-40 xl:w-40"
      aria-hidden="true"
    >
      <svg viewBox="0 0 164 164" className="absolute inset-0 hidden h-full w-full lg:block">
        <defs>
          <path id="seal-ring" d="M82 82 m-64 0 a64 64 0 1 1 128 0 a64 64 0 1 1 -128 0" />
        </defs>
        <text className="fill-green-deep text-[10.5px] font-semibold tracking-[0.12em]">
          <textPath href="#seal-ring" textLength="398" lengthAdjust="spacing">
            GRÆNSEVÆRDI · BR18 § 298 · GRÆNSEVÆRDI · BR18 § 298 ·
          </textPath>
        </text>
      </svg>
      <div className="text-center">
        <span key={value ?? "ingen"} className="seal-value block font-display text-[1.9rem] leading-none lg:text-[2.2rem] xl:text-[2.75rem]">
          {value === null ? "Ingen" : kommatal(value)}
        </span>
        <span className="mt-1 block text-[9px] font-semibold lg:text-[11px]">{value === null ? "grænseværdi" : "kg CO₂e/m²/år"}</span>
      </div>
    </div>
  );
}

export function Hero() {
  const [type, setType] = useState<Bygningstype>("enfamiliehus");
  const [byggeri, setByggeri] = useState<Byggeri>("nybyggeri");
  const [areal, setAreal] = useState("160");
  const tracked = useRef(false);

  const m2 = Number.parseInt(areal, 10);
  const harAreal = Number.isFinite(m2) && m2 > 0;
  const res = harAreal ? evaluateBR18({ bygningstype: type, byggeri, m2, uopvarmet: false, samfundskritisk: false }) : null;
  const pris = harAreal ? beregnPris(prisTypeFor(type), m2) : null;
  const visPris = res && res.status !== "undtaget_helt";
  const prisTekst =
    !pris || pris.type === "individuelt"
      ? type === "raekkehus"
        ? "fra 8.000 kr"
        : "Individuelt tilbud"
      : `ca. ${formatKr(pris.komplet)} kr`;

  const changed = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  // The demo only runs for visitors who have not asked for reduced motion.
  const [demo, setDemo] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const demoOn = useRef(demo);
  const demoAtMount = useRef(demo);

  /** The visitor takes over: the loop stops for good and their input counts. */
  function takeOver() {
    changed.current = true;
    if (demoOn.current) {
      demoOn.current = false;
      setDemo(false);
    }
  }

  useEffect(() => {
    if (!demoAtMount.current) return;
    let visible = true;
    let timer = 0;
    let step = 0;
    const seen = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (form.current) seen.observe(form.current);
    const total = EXAMPLES.length * ROUNDS;

    const tick = () => {
      if (!demoOn.current) return;
      if (!visible || document.hidden) {
        timer = window.setTimeout(tick, 600);
        return;
      }
      // One example at a time, all three fields together, so the result row never empties.
      const ex = EXAMPLES[step % EXAMPLES.length];
      setType(ex.type);
      setByggeri(ex.byggeri);
      setAreal(ex.m2);
      step += 1;
      if (step >= total) {
        // Rest on the first example and hand the sentence to the visitor.
        timer = window.setTimeout(() => {
          if (!demoOn.current) return;
          setType(EXAMPLES[0].type);
          setByggeri(EXAMPLES[0].byggeri);
          setAreal(EXAMPLES[0].m2);
          demoOn.current = false;
          setDemo(false);
        }, HOLD_MS);
        return;
      }
      timer = window.setTimeout(tick, HOLD_MS);
    };
    // The first example is already on screen; start moving after one hold.
    step = 1;
    timer = window.setTimeout(tick, HOLD_MS);
    return () => {
      demoOn.current = false;
      window.clearTimeout(timer);
      seen.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!changed.current || tracked.current || !res) return;
    tracked.current = true;
    trackAnalyticsEvent("br18_tjekker_brugt", { bygningstype: type, byggeri, placering: "forside" });
  }, [res, type, byggeri]);

  const kontaktUrl = `/kontakt?${new URLSearchParams({ type, ...(harAreal ? { m2: String(m2) } : {}), byggeri }).toString()}`;

  return (
    <section className="px-3 pt-2 md:px-8">
      <div className="grain relative mx-auto max-w-[68rem] overflow-hidden rounded-[24px] bg-green px-4 pt-12 text-center text-mist md:rounded-[32px] md:px-12 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-520px] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]" />
        <Seal value={res?.graensevaerdi ?? null} />

        <h1 className="relative mx-auto max-w-[12ch] text-[2.85rem] leading-[1.02] text-white md:text-[4.75rem] lg:text-[5.25rem]">
          LCA-beregning der bare virker
        </h1>
        <p className="relative mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-mist/80 md:text-xl">
          Vi håndterer hele LCA-beregningen, fra tidlig fase til myndighedsklar rapport, så du kan fokusere på projektet.
        </p>

        {/* The check: a working BR18 answer in one sentence. */}
        <form
          aria-label="Tjek om dit projekt skal have en LCA-beregning"
          onSubmit={(e) => e.preventDefault()}
          ref={form}
          onPointerDownCapture={takeOver}
          onFocusCapture={takeOver}
          onChange={takeOver}
          className="relative mx-auto mt-10 max-w-[54rem] rounded-t-[22px] bg-white px-5 pb-6 pt-6 text-left text-ink md:mt-12 md:px-8 md:pt-7"
        >
          <p className="mb-3 flex h-5 items-center gap-2 overflow-hidden whitespace-nowrap font-sans text-[13px] font-medium text-muted" aria-live="off">
            {demo ? (
              <>
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="demo-ping absolute inline-flex h-full w-full rounded-full bg-spark" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-spark" />
                </span>
                Eksempel. Tryk og skriv dit eget projekt.
              </>
            ) : (
              "Dit projekt"
            )}
          </p>
          <GlideHeight>
          <p className="font-display text-[1.3rem] leading-[1.9] md:text-[1.65rem]">
            Jeg bygger{" "}
            <Picker
              label="Bygningstype"
              value={type}
              groups={TYPE_GROUPS}
              onChange={(v) => setType(v as Bygningstype)}
              onInteract={takeOver}
              className={`${fieldCls} inline-flex items-center gap-1.5 py-0.5 pl-2 pr-2 font-sans text-[0.9em]`}
            >
              <Glide k={type} swap={demo}>
                {TYPER.find((t) => t.value === type)?.sentence}
              </Glide>
              <Chevron />
            </Picker>{" "}
            på{" "}
            <label className={`${fieldCls} inline-flex cursor-text items-baseline py-0.5 pl-2 pr-2 font-sans text-[0.9em] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-spark`}>
              <input
                aria-label="Opvarmet etageareal i m²"
                type="number"
                inputMode="numeric"
                min={1}
                max={100000}
                value={areal}
                onChange={(e) => setAreal(e.target.value.slice(0, 6))}
                onFocus={(e) => e.currentTarget.select()}
                style={{ width: `${Math.max(2, areal.length) + 0.4}ch` }}
                key={demo ? `demo-${areal}` : "input"}
                className={`bg-transparent text-right font-semibold text-green caret-spark outline-none transition-[width] duration-300 ease-out [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none ${demo ? "demo-swap" : ""}`}
              />
              <span className="ml-1">m²</span>
            </label>{" "}
            som{" "}
            <Picker
              label="Nybyggeri eller tilbygning"
              value={byggeri}
              groups={BYGGERI_GROUPS}
              onChange={(v) => setByggeri(v as Byggeri)}
              onInteract={takeOver}
              className={`${fieldCls} inline-flex items-center gap-1.5 py-0.5 pl-2 pr-2 font-sans text-[0.9em]`}
            >
              <Glide k={byggeri} swap={demo}>
                {byggeri}
              </Glide>
              <Chevron />
            </Picker>
          </p>
          </GlideHeight>

          <div aria-live={demo ? "off" : "polite"} className="mt-5 grid grid-cols-2 gap-y-4 border-t border-line pt-5 lg:grid-cols-[minmax(10.5rem,auto)_minmax(13rem,auto)_minmax(14.5rem,auto)_1fr] lg:items-center lg:gap-y-0">
            {res ? (
              <>
                <Out label="LCA-krav">
                  <span key={demo ? res.status : "s"} className={`inline-flex items-center gap-2 ${demo ? "demo-swap" : ""}`}>
                    <span className={`grid h-[18px] w-[18px] place-items-center rounded-full ${res.status === "undtaget_helt" ? "bg-muted" : "bg-green"}`} aria-hidden="true">
                      <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                        {res.status === "undtaget_helt" ? <path d="M3 6h6" /> : <path d="M2.5 6.2 5 8.5l4.5-5" />}
                      </svg>
                    </span>
                    {STATUS[res.status]}
                  </span>
                </Out>
                <Out label="Grænseværdi" divider>
                  <span key={demo ? String(res.graensevaerdi) : "g"} className={demo ? "demo-swap" : ""}>
                    {res.graensevaerdi === null ? (
                      "Ingen"
                    ) : (
                      <>
                        {kommatal(res.graensevaerdi)} <span className="font-sans text-[13px] text-muted">kg CO₂e/m²/år</span>
                      </>
                    )}
                  </span>
                </Out>
                {visPris && (
                  <Out label="Vejledende pris" divider className="col-span-2 border-l-0 pl-0 lg:col-span-1 lg:border-l lg:pl-6">
                    <span key={demo ? prisTekst : "p"} className={`whitespace-nowrap shadow-[inset_0_-9px_0_rgb(255_122_61/0.4)] ${demo ? "demo-swap" : ""}`}>
                      {prisTekst}
                    </span>
                    {prisTekst !== "Individuelt tilbud" && (
                      <>
                        {" "}
                        <span className="font-sans text-[13px] text-muted">ekskl. moms</span>
                      </>
                    )}
                  </Out>
                )}
              </>
            ) : (
              <p className="col-span-2 text-[15px] text-muted lg:col-span-3">Skriv det opvarmede etageareal for at se krav og pris.</p>
            )}
            <Link
              to={demo ? "/kontakt" : kontaktUrl}
              className="col-span-2 inline-flex h-12 items-center justify-center gap-2.5 justify-self-stretch rounded-full bg-green px-6 text-[15px] font-semibold text-mist transition-[background-color,scale] duration-150 ease-out hover:bg-green-deep active:scale-[0.97] lg:col-span-1 lg:justify-self-end"
            >
              Få et fast tilbud
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </form>
      </div>

      <ul className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 text-sm font-medium text-muted">
        {["A4+A5 inkluderet", "Svar inden for 24 timer", "Bolig, erhverv og industri, 80 til 3.000 m²"].map((f, i) => (
          <li key={f} className="flex items-center gap-3">
            {i > 0 && <span className="h-1 w-1 rounded-full bg-spark" aria-hidden="true" />}
            {f}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-2 max-w-6xl px-4 text-center text-[13px] text-muted">
        Vejledende svar efter BR18 § 297-298. Flere valg i{" "}
        <Link to="/vaerktoejer/br18-tjekker" className="font-medium text-green underline decoration-spark decoration-2 underline-offset-4">
          BR18-tjekkeren
        </Link>
        .
      </p>
    </section>
  );
}

function Out({ label, children, divider = false, className = "" }: { label: string; children: React.ReactNode; divider?: boolean; className?: string }) {
  return (
    <div className={`min-w-0 ${divider ? "lg:border-l lg:border-line lg:pl-6" : ""} pr-6 ${className}`}>
      <p className="text-[13px] font-medium text-muted">{label}</p>
      <p className="mt-0.5 font-display text-[1.35rem] leading-tight md:text-[1.5rem]">{children}</p>
    </div>
  );
}
