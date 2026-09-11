import { Button } from "../ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-green py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="max-w-[18ch] text-3xl font-bold leading-tight text-white md:text-5xl">
              Klar til at få styr på dit projekts LCA?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist/85">
              Send os dine tegninger og få et tilbud, vi vender tilbage inden for 24 timer.
            </p>
            <div className="mt-8">
              <Button to="/kontakt" variant="light">
                Send tegninger, få pris
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href="tel:+4529899999"
              className="block text-xl font-semibold text-white transition-colors hover:text-mist"
            >
              +45 29 89 99 99
            </a>
            <a
              href="mailto:valdemar.wernblad@dinlcahjælper.dk"
              className="mt-1.5 block break-all text-mist/85 transition-colors hover:text-white"
            >
              valdemar.wernblad@dinlcahjælper.dk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
