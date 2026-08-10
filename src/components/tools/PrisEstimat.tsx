import { beregnPris, formatKr, type PrisType } from "../../lib/pris";

/**
 * Pris-estimat-blok. Deler input (pris-type + m²) med BR18-checkeren.
 * Viser altid LCA Komplet. En mulig Direkte-rabat beskrives som betinget,
 * fordi datagrundlaget skal gennemgås, før den kan indgå i et fast tilbud.
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
  const res = beregnPris(prisType, m2);

  if (res.type === "individuelt") {
    const erRaekkehus = prisType === "raekkehus";
    return (
      <div className="mt-6 rounded-xl border border-border bg-white p-5">
        <p className="text-sm font-medium text-muted">Vejledende pris</p>
        <p className="mt-1 text-2xl font-bold text-navy">Individuelt tilbud</p>
        <p className="mt-2 text-sm text-body leading-relaxed">
          {erRaekkehus
            ? "Rækkehuse og projekter med flere boliger starter ved 8.000 kr. Vi ser på antal boliger, variationer og projektmaterialet, før vi giver en fast pris."
            : "Dit projekt ligger uden for vores faste prisinterval. Send os tegningerne, så får du et konkret tilbud inden for 24 timer."}
        </p>
      </div>
    );
  }

  const rabat = res.komplet - res.direkte;

  return (
    <div className="mt-6 rounded-xl border border-border bg-white p-5">
      <p className="text-sm font-medium text-muted">
        {frivillig ? "Frivillig beregning, vejledende pris" : "Vejledende pris"}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-sm text-muted">ca.</span>
        <span className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
          {formatKr(res.komplet)}
        </span>
        <span className="text-lg text-navy font-medium">kr</span>
        <span className="text-sm text-muted">ekskl. moms</span>
      </p>

      {rabat > 0 && (
        <p className="mt-4 text-sm text-body leading-relaxed">
          Et struktureret mængdeudtræk kan give op til {formatKr(rabat)} kr i afslag, når vi har
          gennemgået og bekræftet, at det kan bruges direkte.
        </p>
      )}

      <p className="mt-4 text-xs text-muted leading-relaxed">
        Estimatet viser LCA Komplet og inkluderer vores mængdeudtræk. Den endelige pris fastsættes
        i et tilbud, når vi har gennemgået projektmaterialet, antallet af konstruktioner og
        projektets kompleksitet.
      </p>
    </div>
  );
}
