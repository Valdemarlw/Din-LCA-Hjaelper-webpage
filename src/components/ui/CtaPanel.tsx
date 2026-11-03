import { Button } from "./Button";

type CtaPanelProps = {
  title: string;
  text: string;
  cta: string;
  to?: string;
  tone?: "mist" | "green";
  className?: string;
};

export function CtaPanel({ title, text, cta, to = "/kontakt", tone = "green", className = "" }: CtaPanelProps) {
  const green = tone === "green";
  return (
    <div className={`overflow-hidden rounded-sheet p-8 md:p-10 ${green ? "grain bg-green" : "bg-green-soft"} ${className}`}>
      <div className="md:flex md:items-end md:justify-between md:gap-10">
        <div className="max-w-xl">
          <h2 className={`text-[1.75rem] leading-tight md:text-[2rem] ${green ? "text-white" : "text-ink"}`}>{title}</h2>
          <p className={`mt-3 leading-relaxed ${green ? "text-mist/80" : "text-body"}`}>{text}</p>
        </div>
        <div className="mt-6 shrink-0 md:mt-0">
          <Button to={to} variant={green ? "spark" : "primary"}>
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
