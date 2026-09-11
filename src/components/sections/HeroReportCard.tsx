import { motion, useReducedMotion } from "framer-motion";
import { Measure } from "../ui/Measure";
import { Tag } from "../ui/Tag";
import { CountUp } from "../motion/CountUp";
import { EASE } from "../motion/constants";
import { kommatal } from "../../lib/format";

/** Illustrative example of the report sheet a client receives (not interactive). */

const GWP = 4.8;
const GRAENSE = 6.7;

const breakdown = [
  { label: "Ydervægge", value: 1.6 },
  { label: "Dæk & fundament", value: 1.7 },
  { label: "Tag", value: 0.9 },
  { label: "Installationer", value: 0.6 },
];
const maxVal = Math.max(...breakdown.map((b) => b.value));

/* One choreography: sheet lands, the total counts up while the measure fills, then the breakdown grows. */
const T = { sheet: 0.5, number: 0.95, bars: 1.7, tags: 2.3 };

export function HeroReportCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="rounded-sheet bg-white p-6 text-body shadow-sheet md:p-7"
      initial={reduce ? false : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: T.sheet, duration: 0.9, ease: EASE }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] text-muted">Myndighedsklar rapport</p>
          <h3 className="mt-0.5 text-lg font-bold text-ink">Enfamiliehus, 184 m²</h3>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: T.tags, duration: 0.4, ease: EASE }}
        >
          <Tag tone="soft" className="shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            Godkendt
          </Tag>
        </motion.div>
      </div>

      <div className="my-5 h-px bg-line" />

      <p className="text-[13px] text-muted">Samlet GWP</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-[2.75rem] font-extrabold leading-none tracking-tight text-ink">
          <CountUp to={GWP} decimals={1} start delay={T.number} duration={1.2} />
        </span>
        <span className="text-sm text-muted">kg CO₂-eq/m²/år</span>
      </p>

      <Measure value={GWP} limit={GRAENSE} unit="kg CO₂-eq/m²/år" animate delay={T.number} className="mt-4" />

      <div className="my-5 h-px bg-line" />

      <div className="space-y-2.5">
        {breakdown.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3 text-sm">
            <span className="w-32 shrink-0 text-body">{b.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-green-soft">
              <motion.div
                className="h-full rounded-full bg-green/70"
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${(b.value / maxVal) * 100}%` }}
                transition={{ delay: T.bars + i * 0.12, duration: 0.8, ease: EASE }}
              />
            </div>
            <span className="w-8 shrink-0 text-right font-semibold text-ink">{kommatal(b.value)}</span>
          </div>
        ))}
      </div>

      <div className="my-5 h-px bg-line" />

      <motion.div
        className="flex flex-wrap gap-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: T.tags, duration: 0.6 }}
      >
        {["BR18", "A1–A3", "A4+A5", "EN 15804"].map((t) => (
          <Tag key={t} tone="outline">
            {t}
          </Tag>
        ))}
      </motion.div>
    </motion.div>
  );
}
