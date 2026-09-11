import { ExternalLink } from "lucide-react";

const PREFERRED_SOURCE_URL =
  "https://www.google.com/preferences/source?q=xn--dinlcahjlper-edb.dk";

export function PreferredSourcePrompt() {
  return (
    <section className="bg-paper pb-16 md:pb-24" aria-labelledby="preferred-source-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 rounded-sheet bg-white p-6 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <h2 id="preferred-source-title" className="text-lg font-bold text-ink">
              Følg vores LCA-viden på Google
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-body md:text-base">
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
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-green/40 px-5 py-3 text-sm font-semibold text-green transition-colors hover:border-green hover:bg-green-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            Vælg os som foretrukken kilde på Google
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
