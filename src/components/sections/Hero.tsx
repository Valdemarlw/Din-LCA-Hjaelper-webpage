import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { HeroReportCard } from "./HeroReportCard";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.55, ease },
        };

  return (
    <section className="bg-paper pb-16 pt-3 md:pb-24 md:pt-4">
      <div className="mx-auto max-w-6xl px-3 md:px-6 lg:px-8">
        {/* The brand green as an object on the page, not a wallpaper. */}
        <div className="rounded-[20px] bg-green px-6 pb-16 pt-14 text-mist md:rounded-[28px] md:px-12 md:pb-20 md:pt-20 lg:px-16 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.h1
                {...enter(0)}
                className="max-w-[12ch] text-[2.6rem] font-extrabold leading-[1.02] text-white md:text-6xl lg:text-[4.25rem]"
              >
                LCA-beregning der bare virker
              </motion.h1>

              <motion.p
                {...enter(0.12)}
                className="mt-6 max-w-xl text-lg leading-relaxed text-mist/90 md:text-xl"
              >
                Vi håndterer hele LCA-beregningen, fra tidlig fase til myndighedsklar rapport, så
                du kan fokusere på projektet.
              </motion.p>

              <motion.div
                {...enter(0.24)}
                className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
              >
                <Button to="/kontakt" variant="light">
                  Få et tilbud
                </Button>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl font-bold text-white">Typisk 5.000-7.000 kr</span>
                  <Tag tone="light">A4+A5 inkluderet</Tag>
                </div>
              </motion.div>

              <motion.p
                {...enter(0.34)}
                className="mt-10 max-w-xl text-[15px] leading-relaxed text-mist/70"
              >
                Din LCA Hjælper er en dansk LCA-rådgivningsvirksomhed der leverer myndighedsklar
                LCA-beregning for byggeri efter BR18. Vi betjener arkitekter og rådgivere i hele
                Danmark med beregninger for bolig, erhverv og industri, fra 80 til 3.000 m².
              </motion.p>
            </div>

            {/* The report sheet breaches the bottom edge of the panel on large screens. */}
            <div className="lg:col-span-5 lg:-mb-36 lg:self-end">
              <HeroReportCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
