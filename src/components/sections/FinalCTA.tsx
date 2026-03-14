import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import { Button } from "../ui/Button";
import { Phone, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="bg-navy py-20 md:py-28 lg:py-32">
      <motion.div
        className="mx-auto max-w-6xl px-5 md:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Klar til at få styr på dit projekts LCA?
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
          Send os dine tegninger og få et tilbud — vi vender tilbage inden for 24 timer.
        </p>

        <div className="mt-8">
          <Button to="/kontakt" variant="inverted">
            Send tegninger — få pris
          </Button>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-white/60">
          <a href="tel:+4529899999" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={16} />
            +45 29 89 99 99
          </a>
          <a href="mailto:valdemar.wernblad@dinlcahjælper.dk" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={16} />
            valdemar.wernblad@dinlcahjælper.dk
          </a>
        </div>
      </motion.div>
    </section>
  );
}
