/** Short cross-fade between routes. Section content does not animate on scroll. */
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;
