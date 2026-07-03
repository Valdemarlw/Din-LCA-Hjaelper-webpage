import { useState, useEffect } from "react";
import { beregnPris, formatKr, type PrisType } from "../../lib/pris";
import { track } from "../../lib/analytics";

/**
 * Pris-estimat-blok. Deler input (pris-type + m²) med BR18-checkeren.
 * Anker på den billigere basispris (kunden leverer mængderne); mængdeudtræk
 * er et tilvalg der lægges oveni. Framing-regel: ALDRIG "kr per m²".
 */
export function PrisEstimat({
  prisType,
  m2,
  frivillig = false,
}: {
  prisType: PrisType;
  m2: number;
  frivillig?: boolean;
}) {
  const [medMaengdeudtraek, setMedMaengdeudtraek] = useState(false);
  const res = beregnPris(prisType, m2);

  // Fire once per mount; the component only mounts when a price is first shown.
  useEffect(() => {
    track("price_estimate_shown", {
      pris_type: prisType,
      estimat: res.type === "individuelt" ? "individuelt" : "interval",
      frivillig,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (res.type === "individuelt") {
    return (
      <div className="mt-6 rounded-xl border border-border bg-white p-5">
        <p className="text-sm font-medium text-muted">Vejledende pris</p>
        <p className="mt-1 text-2xl font-bold text-navy">Individuelt tilbud</p>
        <p className="mt-2 text-sm text-body leading-relaxed">
          Dit projekt er større end vores faste prisinterval. Send os tegningerne, så får du et
          konkret tilbud inden for 24 timer.
        </p>
      </div>
    );
  }

  // Add-on = forskellen mellem fuld service (Komplet) og basis (Direkte).
  // Nær gulvet kan den være mindre end 1.000.
  const addOn = res.komplet - res.direkte;
  const pris = medMaengdeudtraek ? res.komplet : res.direkte;

  return (
    <div className="mt-6 rounded-xl border border-border bg-white p-5">
      <p className="text-sm font-medium text-muted">
        {frivillig ? "Frivillig beregning, vejledende pris" : "Vejledende pris"}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-sm text-muted">ca.</span>
        <span className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
          {formatKr(pris)}
        </span>
        <span className="text-lg text-navy font-medium">kr</span>
        <span className="text-sm text-muted">ekskl. moms</span>
      </p>

      {addOn > 0 && (
        <label className="mt-4 flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={medMaengdeudtraek}
            onChange={(e) => setMedMaengdeudtraek(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#0D7C6E]"
          />
          <span className="text-sm text-body">
            Lad os trække mængderne ud for dig{" "}
            <span className="text-muted">(+{formatKr(addOn)} kr)</span>
          </span>
        </label>
      )}

      <p className="mt-4 text-xs text-muted leading-relaxed">
        Basisprisen forudsætter, at du selv leverer strukturerede mængder (fx Revit-model eller
        mængdeliste). Har du ikke det, laver vi mængdeudtrækket for dig. Prisen afhænger af
        projektets omfang og kompleksitet (antal konstruktioner og grænseværdikrav), ikke af
        arealet alene, estimatet er vejledende.
      </p>
    </div>
  );
}
