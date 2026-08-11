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
import { getHomepageFaqs } from "../data/faqs";

/**
 * FAQPage schema for the homepage, generated from the same data the visible
 * FAQ section renders, so the two can never drift apart.
 *
 * This used to live in index.html, which meant all 45 pages shipped the
 * homepage's FAQ. Subpages with their own FAQPage ended up with two conflicting
 * entities; /faq carried nine questions twice with five different answers.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://dinlcahjælper.dk/#faq",
  mainEntity: getHomepageFaqs().map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function HomePage() {
  return (
    <motion.div {...pageTransition}>
      <Helmet>
        <title>LCA-beregning til BR18 | Typisk 5.000-7.000 kr</title>
        <meta name="description" content="Komplet LCA-beregning til enfamiliehuse koster typisk 5.000-7.000 kr ekskl. moms. Vi håndterer hele forløbet efter BR18, inklusive A4+A5." />
        <link rel="canonical" href="https://dinlcahjælper.dk/" />
        <meta property="og:title" content="Din LCA Hjælper, LCA-beregning der bare virker" />
        <meta property="og:description" content="Vi håndterer hele LCA-beregningen fra tidlig fase til myndighedsklar rapport. Typisk 5.000-7.000 kr ekskl. moms for enfamiliehuse." />
        <meta property="og:url" content="https://dinlcahjælper.dk/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="da_DK" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
