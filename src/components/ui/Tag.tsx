import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  tone?: "soft" | "mist" | "outline" | "light" | "brick" | "ochre" | "spark";
  className?: string;
};

const tones = {
  soft: "bg-green-soft text-green",
  mist: "bg-mist text-green",
  outline: "border border-line text-body",
  light: "bg-white/12 text-mist",
  spark: "bg-spark text-spark-ink",
  brick: "bg-brick/10 text-brick",
  ochre: "bg-ochre/10 text-ochre",
};

export function Tag({ children, tone = "soft", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
