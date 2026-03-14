import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "inverted";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[10px] px-6 py-3 text-base font-medium tracking-[-0.01em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  const variants = {
    primary:
      "bg-primary text-white shadow-[0_1px_2px_rgba(13,124,110,0.25),0_4px_12px_rgba(13,124,110,0.15)] hover:bg-[#0B6B5F] hover:shadow-[0_2px_4px_rgba(13,124,110,0.3),0_8px_20px_rgba(13,124,110,0.2)]",
    secondary:
      "bg-transparent text-primary border-[1.5px] border-primary/50 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_2px_8px_rgba(13,124,110,0.2)]",
    inverted:
      "bg-white text-navy shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-primary-light hover:shadow-[0_2px_8px_rgba(255,255,255,0.12)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;
  const isPrimary = variant === "primary";

  const motionProps = {
    whileHover: { y: isPrimary ? -2 : -1 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 500, damping: 30 },
  };

  const content = (
    <>
      {children}
      {isPrimary && (
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <motion.div {...motionProps} className="group inline-block">
        <Link to={to} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={`group ${classes}`} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={`group ${classes}`}
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
