import { motion } from "framer-motion";

/** Illustrativt eksempel-rapportkort til hero'en (ikke interaktivt). */

const GWP = 4.8;
const GRAENSE = 6.7;
const fillPct = Math.round((GWP / GRAENSE) * 100); // 72
const marginPct = 100 - fillPct; // 28

const breakdown = [
  { label: "Ydervægge", value: 1.6 },
  { label: "Dæk & fundament", value: 1.7 },
  { label: "Tag", value: 0.9 },
  { label: "Installationer", value: 0.6 },
];
const maxVal = Math.max(...breakdown.map((b) => b.value));

function kommatal(n: number): string {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function HeroReportCard() {
  return (
    <motion.div
      className="rounded-2xl border border-border bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,43,60,0.30)] md:p-7"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Myndighedsklar rapport
          </p>
          <h3 className="mt-1 text-lg font-bold text-navy">Enfamiliehus · 184 m²</h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-a45-green/10 px-2.5 py-1 text-xs font-medium text-a45-green">
          <span className="h-1.5 w-1.5 rounded-full bg-a45-green" /> Godkendt
        </span>
      </div>

      <div className="my-5 h-px bg-border" />

      {/* Samlet GWP */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">Samlet GWP</span>
        <span className="text-muted">Grænse {kommatal(GRAENSE)}</span>
      </div>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tracking-tight text-navy">{kommatal(GWP)}</span>
        <span className="text-sm text-muted">kg CO₂-eq/m²/år</span>
      </p>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-bg-alt">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <p className="mt-1.5 text-center text-xs text-muted">{marginPct}% margin</p>

      <div className="my-5 h-px bg-border" />

      {/* Nedbrydning */}
      <div className="space-y-3">
        {breakdown.map((b) => (
          <div key={b.label} className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 text-body">{b.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg-alt">
              <div
                className="h-full rounded-full bg-a45-green/70"
                style={{ width: `${(b.value / maxVal) * 100}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-medium text-navy">{kommatal(b.value)}</span>
          </div>
        ))}
      </div>

      <div className="my-5 h-px bg-border" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {["BR18", "A1–A3", "EN 15804", "Inkl. A45"].map((t) => (
          <span
            key={t}
            className="rounded-md bg-bg-alt px-2.5 py-1 text-xs font-medium text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
