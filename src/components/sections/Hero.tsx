import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { evaluateBR18, prisTypeFor, type Bygningstype, type Byggeri, type LovpligtStatus } from "../../lib/br18";
import { beregnPris, formatKr } from "../../lib/pris";
import { kommatal } from "../../lib/format";
import { trackAnalyticsEvent } from "../../lib/analytics";

/** The building types in sentence form, so the check reads as one Danish sentence. */
const TYPER: { value: Bygningstype; label: string }[] = [
  { value: "enfamiliehus", label: "et enfamiliehus" },
  { value: "raekkehus", label: "et række- eller dobbelthus" },
  { value: "sommerhus", label: "et sommerhus" },
  { value: "etagebolig", label: "en etagebolig" },
  { value: "kontor", label: "en kontorbygning" },
  { value: "handel", label: "en butik" },
  { value: "lager", label: "et lager eller en hal" },
  { value: "institution", label: "en institution" },
  { value: "andet", label: "noget andet" },
];

const STATUS: Record<LovpligtStatus, string> = {
  lovpligtig: "Lovpligtig",
  kun_dokumentation: "Lovpligtig, uden grænseværdi",
  undtaget_tilbygning: "Undtaget",
  undtaget_helt: "Ikke omfattet",
};

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * A native select sized to its current text: the visible label sets the width
 * and the transparent select on top keeps keyboard, screen reader and the
 * phone's own picker.
 */
function InlineSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const current = options.find((o) => o.value === value)?.label ?? "";
  return (
    <span className={`${fieldCls} relative inline-flex items-center py-0.5 pl-2 pr-7 font-sans text-[0.9em] has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-spark`}>
      <span aria-hidden="true">{current}</span>
      <Chevron />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  );
}

const fieldCls =
  "rounded-lg bg-green-soft font-semibold text-green shadow-[inset_0_-2px_0_var(--color-green)] outline-none transition-colors hover:bg-[#d4e8dd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spark";

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
          onChange={() => (changed.current = true)}
          className="relative mx-auto mt-10 max-w-[54rem] rounded-t-[22px] bg-white px-5 pb-6 pt-6 text-left text-ink md:mt-12 md:px-8 md:pt-7"
        >
          <p className="font-display text-[1.3rem] leading-[1.9] md:text-[1.65rem]">
            Jeg bygger{" "}
            <InlineSelect
              label="Bygningstype"
              value={type}
              onChange={(v) => setType(v as Bygningstype)}
              options={TYPER}
            />{" "}
            på{" "}
            <span className={`${fieldCls} inline-flex items-baseline py-0.5 pl-2 pr-2 font-sans text-[0.9em]`}>
              <input
                aria-label="Opvarmet etageareal i m²"
                type="number"
                inputMode="numeric"
                min={1}
                max={100000}
                value={areal}
                onChange={(e) => setAreal(e.target.value.slice(0, 6))}
                style={{ width: `${Math.max(2, areal.length) + 0.4}ch` }}
                className="bg-transparent text-right font-semibold text-green outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="ml-1">m²</span>
            </span>{" "}
            som{" "}
            <InlineSelect
              label="Nybyggeri eller tilbygning"
              value={byggeri}
              onChange={(v) => setByggeri(v as Byggeri)}
              options={[
                { value: "nybyggeri", label: "nybyggeri" },
                { value: "tilbygning", label: "tilbygning" },
              ]}
            />
          </p>

          <div aria-live="polite" className="mt-5 grid grid-cols-2 gap-y-4 border-t border-line pt-5 lg:grid-cols-[auto_auto_auto_1fr] lg:items-center lg:gap-y-0">
            {res ? (
              <>
                <Out label="LCA-krav">
                  <span className="inline-flex items-center gap-2">
                    <span className={`grid h-[18px] w-[18px] place-items-center rounded-full ${res.status === "undtaget_helt" ? "bg-muted" : "bg-green"}`} aria-hidden="true">
                      <svg viewBox="0 0 12 12" className="h-[11px] w-[11px]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                        {res.status === "undtaget_helt" ? <path d="M3 6h6" /> : <path d="M2.5 6.2 5 8.5l4.5-5" />}
                      </svg>
                    </span>
                    {STATUS[res.status]}
                  </span>
                </Out>
                <Out label="Grænseværdi" divider>
                  {res.graensevaerdi === null ? (
                    "Ingen"
                  ) : (
                    <>
                      {kommatal(res.graensevaerdi)} <span className="font-sans text-[13px] text-muted">kg CO₂e/m²/år</span>
                    </>
                  )}
                </Out>
                {visPris && (
                  <Out label="Vejledende pris" divider className="col-span-2 border-l-0 pl-0 lg:col-span-1 lg:border-l lg:pl-6">
                    <span className="whitespace-nowrap shadow-[inset_0_-9px_0_rgb(255_122_61/0.4)]">{prisTekst}</span>
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
              to={kontaktUrl}
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
