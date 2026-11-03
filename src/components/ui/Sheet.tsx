import type { ReactNode } from "react";

/** A white surface on the paper ground, with a hairline instead of a shadow. */
type SheetProps = {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "soft" | "green";
  padding?: boolean;
};

const tones = {
  white: "bg-white ring-1 ring-line",
  mist: "bg-mist",
  soft: "bg-green-soft",
  green: "grain bg-green text-mist",
};

export function Sheet({ children, className = "", tone = "white", padding = true }: SheetProps) {
  return (
    <div className={`overflow-hidden rounded-sheet ${tones[tone]} ${padding ? "p-6 md:p-8" : ""} ${className}`}>
      {children}
    </div>
  );
}
