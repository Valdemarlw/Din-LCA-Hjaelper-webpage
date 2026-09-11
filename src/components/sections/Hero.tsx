import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { HeroReportCard } from "./HeroReportCard";
import { RevealWords } from "../motion/Reveal";
import { EASE } from "../motion/constants";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Gentle depth: the report sheet drifts up and the copy settles down as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sheetY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.75, ease: EASE },
        };

  return (
    <section ref={ref} className="bg-paper pb-16 pt-3 md:pb-24 md:pt-4">
      <div className="mx-auto max-w-6xl px-3 md:px-6 lg:px-8">
        {/* The brand green as an object on the page, not a wallpaper. */}
        <motion.div
          className="rounded-[20px] bg-green px-6 pb-16 pt-14 text-mist md:rounded-[28px] md:px-12 md:pb-20 md:pt-20 lg:px-16 lg:pb-24 lg:pt-24"
          initial={reduce ? false : { opacity: 0, scale: 0.975 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: copyY }}>
              <RevealWords
                as="h1"
                onMount
                delay={0.3}
                text="LCA-beregning der bare virker"
                className="max-w-[12ch] text-[2.6rem] font-extrabold leading-[1.02] text-white md:text-6xl lg:text-[4.25rem]"
              />

              <motion.p
                {...enter(0.7)}
                className="mt-6 max-w-xl text-lg leading-relaxed text-mist/90 md:text-xl"
              >
                Vi håndterer hele LCA-beregningen, fra tidlig fase til myndighedsklar rapport, så
                du kan fokusere på projektet.
              </motion.p>

              <motion.div
                {...enter(0.85)}
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
                {...enter(1.0)}
                className="mt-10 max-w-xl text-[15px] leading-relaxed text-mist/70"
              >
                Dansk LCA-rådgivning for arkitekter og rådgivere. Bolig, erhverv og industri, fra 80
                til 3.000 m².
              </motion.p>
            </motion.div>

            {/* The report sheet breaches the bottom edge of the panel on large screens. */}
            <motion.div className="lg:col-span-5 lg:-mb-36 lg:self-end" style={reduce ? undefined : { y: sheetY }}>
              <HeroReportCard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
