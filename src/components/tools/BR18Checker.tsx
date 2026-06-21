import { useState } from "react";
import { ClipboardCheck, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import {
  evaluateBR18,
  prisTypeFor,
  BYGNINGSTYPER,
  type Bygningstype,
  type Byggeri,
  type LovpligtStatus,
} from "../../lib/br18";
import { PrisEstimat } from "./PrisEstimat";

/** Formatér et tal med dansk komma, fx 6.7 -> "6,7". */
function kommatal(n: number): string {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const TONE: Record<
  LovpligtStatus,
  { wrap: string; iconWrap: string; Icon: typeof ClipboardCheck }
> = {
  lovpligtig: {
    wrap: "border-primary/30 bg-primary-light/40",
    iconWrap: "bg-primary/10 text-primary",
    Icon: ClipboardCheck,
  },
  kun_dokumentation: {
    wrap: "border-navy/20 bg-bg-alt",
    iconWrap: "bg-navy/10 text-navy",
    Icon: FileText,
  },
  undtaget_tilbygning: {
    wrap: "border-a45-green/30 bg-a45-green/5",
    iconWrap: "bg-a45-green/10 text-a45-green",
    Icon: CheckCircle2,
  },
  undtaget_helt: {
    wrap: "border-a45-green/30 bg-a45-green/5",
    iconWrap: "bg-a45-green/10 text-a45-green",
    Icon: CheckCircle2,
  },
};

const inputCls =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-navy focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function BR18Checker() {
  const [bygningstype, setBygningstype] = useState<Bygningstype>("enfamiliehus");
  const [byggeri, setByggeri] = useState<Byggeri>("nybyggeri");
  const [m2input, setM2input] = useState("");
  const [uopvarmet, setUopvarmet] = useState(false);
  const [samfundskritisk, setSamfundskritisk] = useState(false);

  const m2 = parseInt(m2input, 10);
  const harAreal = Number.isFinite(m2) && m2 > 0;
  const resultat = harAreal
    ? evaluateBR18({ bygningstype, byggeri, m2, uopvarmet, samfundskritisk })
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {/* Inputs */}
      <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
        <h2 className="text-xl font-semibold text-navy">Dit projekt</h2>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="bygningstype" className="block text-sm font-medium text-navy">
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
            <span className="block text-sm font-medium text-navy">Type byggeri</span>
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
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    byggeri === opt.value
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-navy hover:border-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="areal" className="block text-sm font-medium text-navy">
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
          </div>

          {/* Særlige forhold — vist direkte (valgfrit) */}
          <div className="space-y-3 border-t border-border pt-4">
            <p className="text-sm font-medium text-navy">
              Særlige forhold <span className="font-normal text-muted">(valgfrit)</span>
            </p>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uopvarmet}
                onChange={(e) => setUopvarmet(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#0D7C6E]"
              />
              <span className="text-sm text-body">Bygningen er uopvarmet</span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={samfundskritisk}
                onChange={(e) => setSamfundskritisk(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#0D7C6E]"
              />
              <span className="text-sm text-body">
                Samfundskritisk byggeri / industriproduktion
                <span className="mt-0.5 block text-xs text-muted">
                  Fx hospital, fængsel, energi-, vand- eller affaldsforsyning, industri, forsvar —
                  undtaget fra grænseværdi
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Resultat */}
      <div>
        {!resultat ? (
          <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-bg-alt/50 p-8 text-center">
            <p className="text-muted">
              Indtast et opvarmet areal for at se, om dit projekt skal have en LCA-beregning — og
              hvad det koster.
            </p>
          </div>
        ) : (
          (() => {
            const tone = TONE[resultat.status];
            const visPris = resultat.status !== "undtaget_helt";
            return (
              <div className={`rounded-2xl border p-6 md:p-8 ${tone.wrap}`}>
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.iconWrap}`}
                  >
                    <tone.Icon size={22} />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-navy leading-snug">
                      {resultat.overskrift}
                    </h2>
                  </div>
                </div>

                <p className="mt-4 text-body leading-relaxed">{resultat.forklaring}</p>

                {resultat.graensevaerdi !== null && (
                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/70 px-4 py-3">
                      <dt className="text-xs font-medium text-muted">Grænseværdi</dt>
                      <dd className="mt-0.5 text-lg font-bold text-navy">
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
                      <div className="rounded-lg bg-white/70 px-4 py-3">
                        <dt className="text-xs font-medium text-muted">Byggeproces (A4+A5)</dt>
                        <dd className="mt-0.5 text-lg font-bold text-navy">
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

                <p className="mt-4 text-sm text-muted leading-relaxed">{resultat.b6Metode}</p>

                <p className="mt-4 text-body leading-relaxed">{resultat.naesteSkridt}</p>

                {visPris && (
                  <PrisEstimat
                    prisType={prisTypeFor(bygningstype)}
                    m2={m2}
                    frivillig={resultat.status === "undtaget_tilbygning"}
                  />
                )}

                <div className="mt-6">
                  <Button to="/kontakt">Få et fast tilbud</Button>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
