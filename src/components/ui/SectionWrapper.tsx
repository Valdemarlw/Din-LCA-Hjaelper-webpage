import type { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "paper" | "mist" | "white" | "green";
  padding?: "default" | "tight";
};

const bgMap = {
  paper: "bg-paper",
  mist: "bg-mist",
  white: "bg-white",
  green: "bg-green text-mist",
};

const padMap = {
  default: "py-20 md:py-28 lg:py-32",
  tight: "py-12 md:py-16",
};

export function SectionWrapper({
  children,
  className = "",
  id,
  bg = "paper",
  padding = "default",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`${padMap[padding]} ${bgMap[bg]} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}
