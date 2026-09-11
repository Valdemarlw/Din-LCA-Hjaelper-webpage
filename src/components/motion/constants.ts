import type { Variants } from "framer-motion";

/** Shared easing and viewport settings for the motion layer. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const VIEWPORT = { once: true, margin: "-10% 0px -8% 0px" } as const;

export function staggerParent(stagger = 0.09, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}
