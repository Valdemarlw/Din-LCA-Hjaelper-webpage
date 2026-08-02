import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { Hero } from "../components/sections/Hero";
import { Problem } from "../components/sections/Problem";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { Pricing } from "../components/sections/Pricing";
import { References } from "../components/sections/References";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";

export function HomePage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>LCA-beregning fra 4.000 kr | Din LCA Hjælper</title>
        <meta name="description" content="Professionel LCA-beregning til byggeri fra 4.000 kr. Vi håndterer hele processen fra tidlig fase til myndighedsklar rapport efter BR18, inkl. A4+A5." />
        <link rel="canonical" href="https://dinlcahjælper.dk/" />
        <meta property="og:title" content="Din LCA Hjælper, LCA-beregning der bare virker" />
        <meta property="og:description" content="Vi håndterer hele LCA-beregningen fra tidlig fase til myndighedsklar rapport. Fra 4.000 kr, inkl. A4+A5." />
        <meta property="og:url" content="https://dinlcahjælper.dk/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
      </Helmet>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <Pricing />
      <References />
      <FAQ />
      <FinalCTA />
    </motion.div>
  );
}
