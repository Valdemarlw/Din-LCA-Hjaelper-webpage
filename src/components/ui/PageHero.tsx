import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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

/** Top band of every subpage: a soft mist wash fading into the paper ground. */
export function PageHero({ title, lede, crumbs, children, width = "wide", size = "default" }: PageHeroProps) {
  const maxW = width === "narrow" ? "max-w-[46rem]" : "max-w-6xl";
  const pad = size === "compact" ? "pt-10 pb-10 md:pt-14 md:pb-12" : "pt-12 pb-14 md:pt-20 md:pb-20";
  return (
    <section className="bg-linear-to-b from-mist/70 to-paper">
      <div className={`mx-auto ${maxW} px-5 md:px-8 ${pad}`}>
        {crumbs && <Breadcrumb items={crumbs} className="mb-6" />}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body md:text-xl">{lede}</p>
        )}
        {children}
      </div>
    </section>
  );
}
