import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT, staggerParent } from "./constants";

/**
 * Scroll-driven entrance motion. Every component here renders its final,
 * static state when the visitor prefers reduced motion. The prerender step
 * emulates that preference, so the static HTML never carries hidden content.
 */


type Tag = "div" | "section" | "ul" | "ol" | "li" | "p" | "span" | "article" | "aside" | "dl";

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  article: motion.article,
  aside: motion.aside,
  dl: motion.dl,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  x?: number;
  id?: string;
};

/** Fades and lifts an element in the first time it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0, y = 28, x = 0, id }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain: ElementType = as;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }
  const M = tags[as];
  return (
    <M
      id={id}
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Staggers its RevealItem descendants as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.09,
  delay = 0,
  id,
}: Omit<RevealProps, "y" | "x"> & { stagger?: number }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain: ElementType = as;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }
  const M = tags[as];
  return (
    <M
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerParent(stagger, delay)}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div", y = 24 }: Omit<RevealProps, "delay" | "x" | "id">) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain: ElementType = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const M = tags[as];
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}

const headings = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

type WordsProps = {
  text: string;
  className?: string;
  as?: keyof typeof headings;
  /** Play on mount (above the fold) instead of when scrolled into view. */
  onMount?: boolean;
  delay?: number;
  stagger?: number;
};

/** Headline whose words rise out of a mask, one after the other. */
export function RevealWords({ text, className, as = "h2", onMount = false, delay = 0, stagger = 0.07 }: WordsProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain: ElementType = as;
    return <Plain className={className}>{text}</Plain>;
  }
  const M = headings[as];
  const trigger = onMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT };
  return (
    <M className={className} initial="hidden" {...trigger} variants={staggerParent(stagger, delay)} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="-mb-[0.14em] -mt-[0.1em] mr-[0.26em] inline-block overflow-hidden pb-[0.14em] pt-[0.1em] align-bottom last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "112%" },
              visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </M>
  );
}
