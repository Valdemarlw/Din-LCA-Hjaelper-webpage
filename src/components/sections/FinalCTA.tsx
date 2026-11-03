import { Button } from "../ui/Button";

export function FinalCTA() {
  return (
    <section className="px-3 pb-6 md:px-6">
      <div className="grain mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-green px-6 py-16 md:rounded-[32px] md:px-12 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-[18ch] text-[2.25rem] leading-[1.05] text-white md:text-[3.5rem]">
              Klar til at få styr på dit projekts LCA?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist/80">
              Send os dine tegninger og få et tilbud, vi vender tilbage inden for 24 timer.
            </p>
            <div className="mt-8">
              <Button to="/kontakt" variant="spark">
                Få et tilbud
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href="tel:+4529899999" className="block font-display text-[1.75rem] text-white transition-colors hover:text-spark">
              +45 29 89 99 99
            </a>
            <a
              href="mailto:valdemar.wernblad@dinlcahjælper.dk"
              className="mt-1.5 block break-all text-mist/80 transition-colors hover:text-white"
            >
              valdemar.wernblad@dinlcahjælper.dk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
