import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { kommatal } from "../../lib/format";
import { EASE } from "./constants";

type CountUpProps = {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Force the start instead of waiting for the element to scroll into view. */
  start?: boolean;
};

/**
 * Counts a number into place. The static markup always holds the final value,
 * so crawlers and reduced-motion visitors read the real figure.
 */
export function CountUp({
  to,
  from = 0,
  decimals = 0,
  duration = 1.3,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  start,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(to);
  const [text, setText] = useState(() => kommatal(to, decimals));
  const go = start ?? inView;

  useEffect(() => {
    if (!go || reduce) return;
    // Hold at `from` through the delay so the number never flashes its final value first.
    const total = delay + duration;
    const controls = animate(value, [from, from, to], {
      duration: total,
      times: [0, total > 0 ? delay / total : 0, 1],
      ease: [EASE, EASE],
      onUpdate: (v: number) => setText(kommatal(v, decimals)),
    });
    return () => controls.stop();
  }, [go, reduce, value, from, to, duration, delay, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
