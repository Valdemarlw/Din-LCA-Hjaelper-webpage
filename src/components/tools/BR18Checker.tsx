import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { trackAnalyticsEvent } from "../../lib/analytics";
import { kommatal } from "../../lib/format";
import {
  evaluateBR18,
  prisTypeFor,
  BYGNINGSTYPER,
  type Bygningstype,
  type Byggeri,
  type LovpligtStatus,
} from "../../lib/br18";
import { PrisEstimat } from "./PrisEstimat";

const TONE: Record<
  LovpligtStatus,
  { wrap: string; iconWrap: string; Icon: typeof ClipboardCheck }
> = {
  lovpligtig: {
    wrap: "bg-mist",
    iconWrap: "bg-green text-white",
    Icon: ClipboardCheck,
  },
  kun_dokumentation: {
    wrap: "bg-white ring-1 ring-line",
    iconWrap: "bg-green-soft text-green",
    Icon: FileText,
  },
  undtaget_tilbygning: {
    wrap: "bg-green-soft",
    iconWrap: "bg-white text-green",
    Icon: CheckCircle2,
  },
  undtaget_helt: {
    wrap: "bg-green-soft",
    iconWrap: "bg-white text-green",
    Icon: CheckCircle2,
  },
};

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-ink transition-colors placeholder:text-muted/70 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20";

export function BR18Checker() {
  const [bygningstype, setBygningstype] = useState<Bygningstype>("enfamiliehus");
  const [byggeri, setByggeri] = useState<Byggeri>("nybyggeri");
  const [m2input, setM2input] = useState("");
  const [uopvarmet, setUopvarmet] = useState(false);
  const [samfundskritisk, setSamfundskritisk] = useState(false);
  const harTracket = useRef(false);

  const m2 = parseInt(m2input, 10);
  const harAreal = Number.isFinite(m2) && m2 > 0;
  const resultat = harAreal
    ? evaluateBR18({ bygningstype, byggeri, m2, uopvarmet, samfundskritisk })
    : null;

  useEffect(() => {
    if (resultat && !harTracket.current) {
      harTracket.current = true;
      trackAnalyticsEvent("br18_tjekker_brugt", { bygningstype, byggeri });
    }
  }, [resultat, bygningstype, byggeri]);

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Inputs */}
      <div className="rounded-sheet bg-white p-6 ring-1 ring-line md:p-8">
        <h2 className="text-xl font-bold text-ink">Dit projekt</h2>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="bygningstype" className="block text-sm font-medium text-ink">
              Bygningstype
            </label>
            <select
              id="bygningstype"
              value={bygningstype}
              onChange={(e) => setBygningstype(e.target.value as Bygningstype)}
              className={`mt-1.5 ${inputCls}`}
            >
              {BYGNINGSTYPER.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-sm font-medium text-ink">Type byggeri</span>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(
                [
                  { value: "nybyggeri", label: "Nybyggeri" },
                  { value: "tilbygning", label: "Tilbygning" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setByggeri(opt.value)}
                  aria-pressed={byggeri === opt.value}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                    byggeri === opt.value
                      ? "border-green bg-green text-white"
                      : "border-line bg-white text-ink hover:border-green"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="areal" className="block text-sm font-medium text-ink">
              Opvarmet etageareal (m²)
            </label>
            <input
              id="areal"
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="fx 150"
              value={m2input}
              onChange={(e) => setM2input(e.target.value)}
              className={`mt-1.5 ${inputCls}`}
            />
            {uopvarmet && (
              <p className="mt-1.5 text-xs text-muted">
                For uopvarmet byggeri: angiv det samlede etageareal (ikke kun opvarmet areal).
              </p>
            )}
          </div>

          {/* Særlige forhold, vist direkte (valgfrit) */}
          <div className="space-y-3 border-t border-line pt-4">
            <p className="text-sm font-medium text-ink">
              Særlige forhold <span className="font-normal text-muted">(valgfrit)</span>
            </p>

            <label className="flex cursor-pointer select-none items-start gap-2.5">
              <input
                type="checkbox"
                checked={uopvarmet}
                onChange={(e) => setUopvarmet(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-green"
              />
              <span className="text-sm text-body">Bygningen er uopvarmet</span>
            </label>

            <label className="flex cursor-pointer select-none items-start gap-2.5">
              <input
                type="checkbox"
                checked={samfundskritisk}
                onChange={(e) => setSamfundskritisk(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-green"
              />
              <span className="text-sm text-body">
                Samfundskritisk byggeri / industriproduktion
                <span className="mt-0.5 block text-xs text-muted">
                  Fx hospital, fængsel, energi-, vand- eller affaldsforsyning, industri, forsvar.
                  Undtaget fra grænseværdi
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Resultat */}
      <div>
        {!resultat ? (
          <div className="flex h-full min-h-[280px] items-center justify-center rounded-sheet border border-dashed border-line p-8 text-center">
            <p className="max-w-sm text-muted">
              Indtast et opvarmet areal for at se, om dit projekt skal have en LCA-beregning, og
              hvad det koster.
            </p>
          </div>
        ) : (
          (() => {
            const tone = TONE[resultat.status];
            const visPris = resultat.status !== "undtaget_helt";
            return (
              <div className={`rounded-sheet p-6 md:p-8 ${tone.wrap}`} aria-live="polite">
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.iconWrap}`}
                  >
                    <tone.Icon size={22} aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-bold leading-snug text-ink">{resultat.overskrift}</h2>
                </div>

                <p className="mt-4 leading-relaxed text-body">{resultat.forklaring}</p>

                {resultat.graensevaerdi !== null && (
                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/80 px-4 py-3">
                      <dt className="text-xs font-medium text-muted">Grænseværdi</dt>
                      <dd className="mt-0.5 text-lg font-bold text-ink">
                        {kommatal(resultat.graensevaerdi)}{" "}
                        <span className="text-xs font-normal text-muted">kg CO₂-eq/m²/år</span>
                      </dd>
                      {resultat.lavemission !== null && (
                        <dd className="text-xs text-muted">
                          Lavemission: {kommatal(resultat.lavemission)}
                        </dd>
                      )}
                    </div>
                    {resultat.a4a5 !== null && (
                      <div className="rounded-lg bg-white/80 px-4 py-3">
                        <dt className="text-xs font-medium text-muted">Byggeproces (A4+A5)</dt>
                        <dd className="mt-0.5 text-lg font-bold text-ink">
                          {kommatal(resultat.a4a5)}{" "}
                          <span className="text-xs font-normal text-muted">kg CO₂-eq/m²/år</span>
                        </dd>
                        {resultat.a4a5Lavemission !== null && (
                          <dd className="text-xs text-muted">
                            Lavemission: {kommatal(resultat.a4a5Lavemission)}
                          </dd>
                        )}
                      </div>
                    )}
                  </dl>
                )}

                {(resultat.status === "lovpligtig" || resultat.status === "kun_dokumentation") && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">{resultat.b6Metode}</p>
                )}

                <p className="mt-4 leading-relaxed text-body">{resultat.naesteSkridt}</p>

                {visPris && (
                  <PrisEstimat
                    prisType={prisTypeFor(bygningstype)}
                    m2={m2}
                    frivillig={resultat.status === "undtaget_tilbygning"}
                  />
                )}

                <div className="mt-6">
                  <Button to="/kontakt">Få et tilbud</Button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
