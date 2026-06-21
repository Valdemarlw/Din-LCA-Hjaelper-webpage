import { useState } from "react";
import { beregnPris, formatKr, type PrisType } from "../../lib/pris";

/**
 * Pris-estimat-blok. Deler input (pris-type + m²) med BR18-checkeren.
 * Framing-regel: ALDRIG "kr per m²" — driveren er omfang/kompleksitet.
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
  const [direkte, setDirekte] = useState(false);
  const res = beregnPris(prisType, m2);

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

  const pris = direkte ? res.direkte : res.komplet;

  return (
    <div className="mt-6 rounded-xl border border-border bg-white p-5">
      <p className="text-sm font-medium text-muted">
        {frivillig ? "Frivillig beregning — vejledende pris" : "Vejledende pris"}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-sm text-muted">ca.</span>
        <span className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
          {formatKr(pris)}
        </span>
        <span className="text-lg text-navy font-medium">kr</span>
        <span className="text-sm text-muted">ekskl. moms</span>
      </p>

      <label className="mt-4 flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={direkte}
          onChange={(e) => setDirekte(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#0D7C6E]"
        />
        <span className="text-sm text-body">
          Jeg leverer selv et struktureret mængdeudtræk (LCA Direkte, −1.000 kr)
        </span>
      </label>

      <p className="mt-4 text-xs text-muted leading-relaxed">
        Prisen afhænger af projektets omfang og kompleksitet (antal konstruktioner og
        grænseværdikrav), ikke af arealet alene. Estimatet er vejledende — du får et fast tilbud,
        når vi har set tegningerne.
      </p>
    </div>
  );
}
