import { ExternalLink, Star } from "lucide-react";

const PREFERRED_SOURCE_URL =
  "https://www.google.com/preferences/source?q=xn--dinlcahjlper-edb.dk";

export function PreferredSourcePrompt() {
  return (
    <section className="bg-bg-alt py-10 md:py-12" aria-labelledby="preferred-source-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary">
              <Star size={18} aria-hidden="true" />
              <h2 id="preferred-source-title" className="text-lg font-semibold text-navy">
                Følg vores LCA-viden på Google
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-body md:text-base">
              Du kan vælge Din LCA Hjælper som foretrukken kilde. Så kan vores nye
              artikler blive fremhævet i relevante Google-resultater for dig.
            </p>
          </div>

          <a
            href={PREFERRED_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="preferred_source_klik"
            data-analytics-location="viden"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-primary/50 px-5 py-3 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Vælg os som foretrukken kilde på Google
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
