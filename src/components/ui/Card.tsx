import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
};

export function Card({ children, className = "", highlighted = false }: CardProps) {
  return (
    <motion.div
      className={`rounded-xl border bg-white p-6 md:p-8 ${
        highlighted
          ? "border-status-green/40 shadow-md"
          : "border-border"
      } ${className}`}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}
