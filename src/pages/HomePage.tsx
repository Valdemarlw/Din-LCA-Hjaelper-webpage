import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { Hero } from "../components/sections/Hero";
import { Problem } from "../components/sections/Problem";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { Pricing } from "../components/sections/Pricing";
import { FinalCTA } from "../components/sections/FinalCTA";

export function HomePage() {
  return (
    <motion.div {...pageTransition}>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <Pricing />
      <FinalCTA />
    </motion.div>
  );
}
