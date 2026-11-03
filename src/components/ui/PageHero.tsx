import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Brødkrumme" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mist/75">
        {items.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-mist/40">
                /
              </span>
            )}
            {crumb.to ? (
              <Link to={crumb.to} className="rounded-sm transition-colors hover:text-white">
                {crumb.label}
              </Link>
            ) : (
              <span className="max-w-[16rem] truncate font-medium text-mist">{crumb.label}</span>
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

/**
 * Top of every subpage: the same forest field as the home hero, smaller and
 * left-aligned so long titles read like a document heading.
 */
export function PageHero({ title, lede, crumbs, children, width = "wide", size = "default" }: PageHeroProps) {
  const inner = width === "narrow" ? "max-w-[46rem]" : "max-w-4xl";
  const pad = size === "compact" ? "py-10 md:py-14" : "py-12 md:py-20";
  return (
    <section className="px-3 pb-12 pt-2 md:px-6 md:pb-16">
      <div className={`grain mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-green px-5 text-mist md:rounded-[32px] md:px-12 ${pad}`}>
        <div className={inner}>
          {crumbs && <Breadcrumb items={crumbs} className="mb-6" />}
          <h1 className="text-[2.5rem] leading-[1.05] text-white md:text-[3.5rem] lg:text-[4rem]">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist/80 md:text-xl">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
