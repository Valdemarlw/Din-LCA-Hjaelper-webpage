import { motion, useReducedMotion } from "framer-motion";
import { kommatal } from "../../lib/format";

/**
 * A dimension line, borrowed from the drawing sheets our clients work with:
 * a hairline with end ticks, the result marked against the BR18 limit.
 */
type MeasureProps = {
  value: number;
  limit: number;
  unit?: string;
  animate?: boolean;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Measure({ value, limit, unit = "kg CO₂e/m²/år", animate = false, className = "" }: MeasureProps) {
  const pct = Math.max(0, Math.min(100, (value / limit) * 100));
  const margin = Math.round(100 - pct);
  const reduce = useReducedMotion();
  const anim = animate && !reduce;
  const transition = { duration: 1.1, ease, delay: 0.55 };

  return (
    <div className={`${className}`}>
      <div className="flex items-baseline justify-between text-[13px] text-muted">
        <span>0</span>
        <span>Grænseværdi {kommatal(limit)}</span>
      </div>
      <div className="relative mt-1.5 h-7" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-ink/40" />
        <div className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-ink/70" />
        <div className="absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 bg-ink/70" />
        <motion.div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-green"
          initial={anim ? { width: 0 } : false}
          animate={{ width: `${pct}%` }}
          transition={transition}
        />
        <motion.div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green ring-4 ring-white"
          initial={anim ? { left: "0%" } : false}
          animate={{ left: `${pct}%` }}
          transition={transition}
        />
      </div>
      <div className="mt-1 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="font-semibold text-ink">
          {kommatal(value)} <span className="font-normal text-muted">{unit}</span>
        </span>
        <span className="text-muted">{margin} % under grænsen</span>
      </div>
    </div>
  );
}
