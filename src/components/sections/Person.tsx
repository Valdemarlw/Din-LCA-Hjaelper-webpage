import { Link } from "react-router-dom";

/** The person is the proof: one named adviser, with a face, a phone number and a way to write. */
export function Person() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16 md:px-8">
        <figure className="relative mx-auto w-full max-w-[22rem]">
          {/* Same portrait as the VW Projects site. */}
          <img
            src="/images/valdemar-wernblad.webp"
            width={364}
            height={476}
            alt="Valdemar Løvschal Wernblad"
            loading="lazy"
            className="aspect-[364/476] w-full rounded-sheet bg-mist object-cover object-top grayscale"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-2xl bg-white px-4 py-2.5 text-sm leading-snug shadow-[0_10px_24px_-14px_rgb(19_35_32/0.45)]">
            <span className="block font-semibold text-ink">Valdemar Løvschal Wernblad</span>
            <span className="text-muted">LCA-rådgiver</span>
          </figcaption>
        </figure>
        <div>
          <h2 className="max-w-[14ch] text-[2.25rem] leading-[1.05] md:text-[3.25rem]">Du får én rådgiver, hele vejen</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-body">
            Bag Din LCA Hjælper står Valdemar Løvschal Wernblad. Han gennemgår dine tegninger, laver beregningen og står
            for rapporten til kommunen.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="tel:+4529899999"
              className="inline-flex h-12 items-center rounded-full bg-spark px-6 text-[15px] font-semibold text-spark-ink transition-[background-color,scale] duration-150 ease-out hover:bg-[#ff6a26] active:scale-[0.97]"
            >
              Ring +45 29 89 99 99
            </a>
            <Link
              to="/kontakt"
              className="font-semibold text-ink underline decoration-spark decoration-2 underline-offset-[6px] transition-colors hover:text-green"
            >
              Eller skriv direkte
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
