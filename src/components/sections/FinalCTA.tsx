import { Button } from "../ui/Button";
import { Reveal, RevealWords } from "../motion/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-green py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealWords
              as="h2"
              text="Klar til at få styr på dit projekts LCA?"
              className="max-w-[18ch] text-3xl font-bold leading-tight text-white md:text-5xl"
            />
            <Reveal as="p" delay={0.15} className="mt-5 max-w-xl text-lg leading-relaxed text-mist/85">
              Send os dine tegninger og få et tilbud, vi vender tilbage inden for 24 timer.
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <Button to="/kontakt" variant="light">
                Send tegninger, få pris
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.4} className="lg:col-span-4 lg:text-right">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
