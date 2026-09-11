import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "light";
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

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold leading-none transition-[background-color,color,border-color,transform] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[15px]",
  sm: "px-4 py-2.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-green-deep",
  secondary: "border border-green/40 bg-transparent text-green hover:border-green hover:bg-green-soft",
  ghost: "text-green hover:bg-green-soft",
  light: "bg-mist text-green hover:bg-white focus-visible:outline-mist",
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
