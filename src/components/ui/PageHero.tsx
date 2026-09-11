import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { RevealWords } from "../motion/Reveal";
import { EASE } from "../motion/constants";

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Brødkrumme" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {items.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-muted/50">/</span>}
            {crumb.to ? (
              <Link to={crumb.to} className="transition-colors hover:text-green">
                {crumb.label}
              </Link>
            ) : (
              <span className="max-w-[16rem] truncate font-medium text-ink">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type PageHeroProps = {
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  width?: "wide" | "narrow";
  size?: "default" | "compact";
};

const titleCls = "max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-[3.5rem]";

/** Top band of every subpage: a soft mist wash fading into the paper ground, with a short entrance. */
export function PageHero({ title, lede, crumbs, children, width = "wide", size = "default" }: PageHeroProps) {
  const reduce = useReducedMotion();
  const maxW = width === "narrow" ? "max-w-[46rem]" : "max-w-6xl";
  const pad = size === "compact" ? "pt-10 pb-10 md:pt-14 md:pb-12" : "pt-12 pb-14 md:pt-20 md:pb-20";
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease: EASE },
        };

  return (
    <section className="bg-linear-to-b from-mist/70 to-paper">
      <div className={`mx-auto ${maxW} px-5 md:px-8 ${pad}`}>
        {crumbs && (
          <motion.div {...enter(0)} className="mb-6">
            <Breadcrumb items={crumbs} />
          </motion.div>
        )}
        {typeof title === "string" ? (
          <RevealWords as="h1" onMount delay={0.1} stagger={0.05} text={title} className={titleCls} />
        ) : (
          <motion.h1 {...enter(0.1)} className={titleCls}>
            {title}
          </motion.h1>
        )}
        {lede && (
          <motion.p {...enter(0.45)} className="mt-5 max-w-2xl text-lg leading-relaxed text-body md:text-xl">
            {lede}
          </motion.p>
        )}
        {children && <motion.div {...enter(0.6)}>{children}</motion.div>}
      </div>
    </section>
  );
}
