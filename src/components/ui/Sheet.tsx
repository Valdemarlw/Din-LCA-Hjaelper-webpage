import type { ReactNode } from "react";

/**
 * A surface that sits on the paper background. Sheets have no border or
 * shadow; hierarchy comes from tone and spacing.
 */
type SheetProps = {
  children: ReactNode;
  className?: string;
  tone?: "white" | "mist" | "soft" | "green";
  padding?: boolean;
};

const tones = {
  white: "bg-white",
  mist: "bg-mist",
  soft: "bg-green-soft",
  green: "bg-green text-mist",
};

export function Sheet({ children, className = "", tone = "white", padding = true }: SheetProps) {
  return (
    <div className={`rounded-sheet ${tones[tone]} ${padding ? "p-6 md:p-8" : ""} ${className}`}>
      {children}
    </div>
  );
}
