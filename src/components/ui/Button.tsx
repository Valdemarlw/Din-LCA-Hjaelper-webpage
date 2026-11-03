import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "light" | "spark";
type Size = "md" | "sm";

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
};

// Pill buttons in the text face. Press feedback is a small scale; hover only shifts colour.
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold leading-none tracking-[0.005em] transition-[background-color,color,border-color,scale] duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-spark";

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-green text-mist hover:bg-green-deep",
  secondary: "border border-green/30 bg-transparent text-green hover:border-green hover:bg-green-soft",
  ghost: "text-green hover:bg-green-soft",
  light: "bg-mist text-green hover:bg-white",
  spark: "bg-spark text-spark-ink hover:bg-[#ff6a26]",
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled,
  target,
  rel,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
