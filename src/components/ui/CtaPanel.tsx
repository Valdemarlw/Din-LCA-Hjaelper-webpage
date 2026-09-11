import { Button } from "./Button";

type CtaPanelProps = {
  title: string;
  text: string;
  cta: string;
  to?: string;
  tone?: "mist" | "green";
  className?: string;
};

export function CtaPanel({ title, text, cta, to = "/kontakt", tone = "mist", className = "" }: CtaPanelProps) {
  const green = tone === "green";
  return (
    <div className={`rounded-sheet p-8 md:p-10 ${green ? "bg-green" : "bg-mist"} ${className}`}>
      <div className="md:flex md:items-end md:justify-between md:gap-10">
        <div className="max-w-xl">
          <h2 className={`text-2xl font-bold md:text-[28px] ${green ? "text-white" : "text-ink"}`}>{title}</h2>
          <p className={`mt-3 leading-relaxed ${green ? "text-mist/85" : "text-body"}`}>{text}</p>
        </div>
        <div className="mt-6 shrink-0 md:mt-0">
          <Button to={to} variant={green ? "light" : "primary"}>
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
