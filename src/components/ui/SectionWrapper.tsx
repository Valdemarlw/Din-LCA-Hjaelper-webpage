import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";

type SectionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "default" | "alt" | "teal";
};

const bgMap = {
  default: "bg-bg",
  alt: "bg-bg-alt",
  teal: "bg-primary-light",
};

export function SectionWrapper({
  children,
  className = "",
  id,
  bg = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 lg:py-32 ${bgMap[bg]} ${className}`}
    >
      <motion.div
        className="mx-auto max-w-6xl px-5 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        {children}
      </motion.div>
    </section>
  );
}
