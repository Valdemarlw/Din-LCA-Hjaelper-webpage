import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import {
  Send,
  FileCheck,
  BarChart3,
  Truck,
  RefreshCw,
  FileOutput,
  RotateCcw,
  type LucideProps,
} from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";

type Step = { icon: ComponentType<LucideProps>; title: string; description: string };

const steps: Step[] = [
  {
    icon: Send,
    title: "Send dit projekt",
    description: "Tegninger, mængder og projektinfo, vi klarer resten.",
  },
  {
    icon: FileCheck,
    title: "Modtag tilbud",
    description: "Vi vurderer omfanget og sender et klart tilbud.",
  },
  {
    icon: BarChart3,
    title: "Tidlig beregning",
    description: "LCA-beregning med hotspot-analyse og materialeoptimering.",
  },
  {
    icon: Truck,
    title: "Beregning af A4+A5",
    description:
      "Vi beregner transport og byggeproces og noterer de data, der skal indsamles til den endelige rapport.",
  },
  {
    icon: RefreshCw,
    title: "Opdatering til as-built",
    description: "Beregningen opdateres med faktiske mængder fra det færdige byggeri.",
  },
  {
    icon: FileOutput,
    title: "Myndighedsklar rapport",
    description: "Opdateret dokumentation klar til kommunen.",
  },
];

/*
 * Snake reading order so the connector never crosses itself:
 * tablets, 2 columns:   01 02 / 04 03 / 05 06
 * desktop, 3 columns:   01 02 03 / 06 05 04
 * phones stack vertically in plain order.
 */
const ORDER = [
  "md:order-1 lg:order-1",
  "md:order-2 lg:order-2",
  "md:order-4 lg:order-3",
  "md:order-3 lg:order-6",
  "md:order-5 lg:order-5",
  "md:order-6 lg:order-4",
];

const DRAW_SECONDS = 2.4;
/** How far outside the grid a row-change turn swings, clear of the column's text. */
const LANE_OFFSET = 18;
/** Corner radius of a row-change turn: soft, but a turn rather than a balloon. */
const TURN_RADIUS = 48;

/*
 * The early calculation can come back over the limit. Then materials are
 * optimised and the calculation runs again before the process moves on. That
 * iteration is drawn as a loop in the stroke right after step 03: a solid
 * green circle with a chevron on top pointing back toward the step, and the
 * explanation attached to the loop itself.
 */
const LOOP_STEP = 2;
const LOOP_AT = 74; // distance from the disc centre to the loop, along the travel direction
const LOOP_RADIUS = 22;
const LOOP_NOTE = "Over grænseværdien? Vi optimerer materialer og regner igen.";

type Pt = { x: number; y: number };
type Geometry = { width: number; height: number; points: Pt[] };
type Leg = (
  | { kind: "line"; from: Pt; to: Pt }
  | { kind: "turn"; from: Pt; to: Pt; laneX: number; r: number }
  | { kind: "loop"; from: Pt; to: Pt; far: Pt; sweep: 0 | 1; dir: Pt }
) & { endsAtDisc: boolean; arrow: boolean };
type Arrow = { x: number; y: number; angle: number; at: number };
type LoopModel = {
  d: string;
  at: number;
  /** Where the label sits and which way it extends from the loop. */
  label: { x: number; y: number; side: "right" | "left" | "none" };
};
type PathModel = { d: string; arrows: Arrow[]; stepAt: number[]; loop: LoopModel | null };

const f = (n: number) => n.toFixed(1);

/** The straight runs and quarter-circle corners that make up a row-change turn. */
function turnGeometry(leg: Extract<Leg, { kind: "turn" }>) {
  const s = Math.sign(leg.laneX - leg.from.x) || 1;
  const r = leg.r;
  const cornerIn = { x: leg.laneX - s * r, y: leg.from.y };
  const downStart = { x: leg.laneX, y: leg.from.y + r };
  const downEnd = { x: leg.laneX, y: leg.to.y - r };
  const cornerOut = { x: leg.laneX - s * r, y: leg.to.y };
  const quarter = (Math.PI * r) / 2;
  const h1 = Math.abs(cornerIn.x - leg.from.x);
  const v = Math.max(0, downEnd.y - downStart.y);
  const h2 = Math.abs(leg.to.x - cornerOut.x);
  return {
    sweep: s > 0 ? 1 : 0,
    cornerIn,
    downStart,
    downEnd,
    cornerOut,
    quarter,
    h1,
    v,
    h2,
    length: h1 + quarter + v + quarter + h2,
  };
}

function legLength(leg: Leg): number {
  if (leg.kind === "line") return Math.hypot(leg.to.x - leg.from.x, leg.to.y - leg.from.y);
  if (leg.kind === "loop") return 2 * Math.PI * LOOP_RADIUS;
  return turnGeometry(leg).length;
}

function loopPath(leg: Extract<Leg, { kind: "loop" }>): string {
  const r = LOOP_RADIUS;
  return `M ${f(leg.from.x)} ${f(leg.from.y)} A ${r} ${r} 0 0 ${leg.sweep} ${f(leg.far.x)} ${f(leg.far.y)} A ${r} ${r} 0 0 ${leg.sweep} ${f(leg.to.x)} ${f(leg.to.y)}`;
}

/**
 * Discs in the same row are joined by straight runs. A change of row runs out
 * past the column's text, turns down through a soft quarter-circle corner, and
 * comes back the same way, so the stroke stays continuous without ballooning.
 */
function buildLegs(points: Pt[], width: number): Leg[] {
  const multiColumn = new Set(points.map((p) => Math.round(p.x))).size > 1;
  const legs: Leg[] = [];
  for (let i = 1; i < points.length; i++) {
    let from = points[i - 1];
    const to = points[i];
    const drops = multiColumn && Math.abs(to.x - from.x) < 1 && to.y > from.y;
    const laneX = from.x > width / 2 ? width + LANE_OFFSET : -LANE_OFFSET;

    if (i - 1 === LOOP_STEP) {
      // Travel direction leaving the disc: a turn departs horizontally toward its lane.
      const dir = drops
        ? { x: Math.sign(laneX - from.x), y: 0 }
        : (() => {
            const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
            return { x: (to.x - from.x) / len, y: (to.y - from.y) / len };
          })();
      const at = { x: from.x + dir.x * LOOP_AT, y: from.y + dir.y * LOOP_AT };
      // Loop away from the step text: upward on a horizontal run, leftward on a vertical one.
      const normal = Math.abs(dir.x) > 0.5 ? { x: 0, y: -1 } : { x: -1, y: 0 };
      const sweep: 0 | 1 = dir.x * normal.y - dir.y * normal.x > 0 ? 1 : 0;
      const far = { x: at.x + 2 * LOOP_RADIUS * normal.x, y: at.y + 2 * LOOP_RADIUS * normal.y };
      legs.push({ kind: "line", from, to: at, endsAtDisc: false, arrow: false });
      legs.push({ kind: "loop", from: at, to: at, far, sweep, dir, endsAtDisc: false, arrow: false });
      from = at;
    }

    if (drops) {
      const r = Math.max(8, Math.min(TURN_RADIUS, (to.y - from.y) / 2 - 1, Math.abs(laneX - from.x) - 8));
      legs.push({ kind: "turn", from, to, laneX, r, endsAtDisc: true, arrow: true });
    } else {
      legs.push({ kind: "line", from, to, endsAtDisc: true, arrow: true });
    }
  }
  return legs;
}

function buildPath(points: Pt[], width: number): PathModel {
  if (points.length < 2) return { d: "", arrows: [], stepAt: points.map(() => 0), loop: null };
  const legs = buildLegs(points, width);
  const lengths = legs.map(legLength);
  const total = lengths.reduce((a, b) => a + b, 0) || 1;

  let d = `M ${f(points[0].x)} ${f(points[0].y)}`;
  const arrows: Arrow[] = [];
  const stepAt = [0];
  let loop: LoopModel | null = null;
  let cum = 0;

  legs.forEach((leg, i) => {
    if (leg.kind === "line") {
      d += ` L ${f(leg.to.x)} ${f(leg.to.y)}`;
      if (leg.arrow) {
        arrows.push({
          x: (leg.from.x + leg.to.x) / 2,
          y: (leg.from.y + leg.to.y) / 2,
          angle: (Math.atan2(leg.to.y - leg.from.y, leg.to.x - leg.from.x) * 180) / Math.PI,
          at: (cum + lengths[i] / 2) / total,
        });
      }
    } else if (leg.kind === "loop") {
      const r = LOOP_RADIUS;
      d += ` A ${r} ${r} 0 0 ${leg.sweep} ${f(leg.far.x)} ${f(leg.far.y)} A ${r} ${r} 0 0 ${leg.sweep} ${f(leg.to.x)} ${f(leg.to.y)}`;
      // On the far side of the loop the flow runs back toward the step: that chevron is the cue.
      arrows.push({
        x: leg.far.x,
        y: leg.far.y,
        angle: (Math.atan2(-leg.dir.y, -leg.dir.x) * 180) / Math.PI,
        at: (cum + lengths[i] / 2) / total,
      });
      const horizontal = Math.abs(leg.dir.x) > 0.5;
      const centre = { x: (leg.from.x + leg.far.x) / 2, y: (leg.from.y + leg.far.y) / 2 };
      loop = {
        d: loopPath(leg),
        at: cum / total,
        label: horizontal
          ? {
              x: leg.dir.x > 0 ? centre.x + r + 12 : centre.x - r - 12,
              y: centre.y,
              side: leg.dir.x > 0 ? "right" : "left",
            }
          : { x: centre.x, y: centre.y, side: "none" },
      };
    } else {
      const t = turnGeometry(leg);
      const r = leg.r;
      d +=
        ` L ${f(t.cornerIn.x)} ${f(t.cornerIn.y)}` +
        ` A ${r} ${r} 0 0 ${t.sweep} ${f(t.downStart.x)} ${f(t.downStart.y)}` +
        ` L ${f(t.downEnd.x)} ${f(t.downEnd.y)}` +
        ` A ${r} ${r} 0 0 ${t.sweep} ${f(t.cornerOut.x)} ${f(t.cornerOut.y)}` +
        ` L ${f(leg.to.x)} ${f(leg.to.y)}`;
      if (leg.arrow) {
        // Midway down the lane, pointing down.
        arrows.push({
          x: leg.laneX,
          y: (t.downStart.y + t.downEnd.y) / 2,
          angle: 90,
          at: (cum + t.h1 + t.quarter + t.v / 2) / total,
        });
      }
    }
    cum += lengths[i];
    if (leg.endsAtDisc) stepAt.push(cum / total);
  });

  return { d, arrows, stepAt, loop };
}

/**
 * The six steps sit along one connector. It draws once when the section comes
 * into view, and the loop after step 03 draws last in the spark colour: that
 * iteration (over the limit, optimise, recalculate) is the one thing motion
 * explains here. Everything else is static. Geometry is measured from the
 * rendered grid, so the path follows the discs at every breakpoint.
 */
export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const discRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // ResizeObserver fires once on observe, so the first measurement happens here too.
    const observer = new ResizeObserver(() => {
      const box = wrap.getBoundingClientRect();
      const points = discRefs.current.flatMap((el) => {
        if (!el) return [];
        const r = el.getBoundingClientRect();
        return [{ x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }];
      });
      setGeometry({ width: box.width, height: box.height, points });
    });
    observer.observe(wrap);
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          seen.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    seen.observe(wrap);
    return () => {
      observer.disconnect();
      seen.disconnect();
    };
  }, []);

  const path = useMemo(() => buildPath(geometry?.points ?? [], geometry?.width ?? 0), [geometry]);
  const loop = path.loop;
  const drawn = play ? "process-drawn" : "";

  return (
    <SectionWrapper bg="mist">
      <div className="max-w-2xl">
        <h2 className="text-[2.25rem] leading-[1.05] md:text-[3rem]">Sådan foregår det</h2>
        <p className="mt-4 text-lg text-body">Seks trin fra projektstart til myndighedsklar dokumentation.</p>
      </div>

      <div ref={wrapRef} className={`process relative mt-14 md:mt-20 ${drawn}`}>
        {geometry && path.d && (
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            aria-hidden="true"
          >
            <path
              d={path.d}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="process-line text-green/35"
            />
            {loop && (
              <path
                d={loop.d}
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                className="process-loop text-spark"
                style={{ animationDelay: `${(loop.at * DRAW_SECONDS).toFixed(2)}s` }}
              />
            )}
            {path.arrows.map((arrow, i) => (
              <g key={i} transform={`translate(${f(arrow.x)} ${f(arrow.y)}) rotate(${f(arrow.angle)})`}>
                <path
                  d="M -5 -4.5 L 0 0 L -5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green"
                />
              </g>
            ))}
          </svg>
        )}

        <ol className="grid gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className={`relative flex gap-5 md:block ${ORDER[i]}`}>
                <div
                  ref={(el) => {
                    discRefs.current[i] = el;
                  }}
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-green ring-1 ring-green/15"
                >
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green text-[11px] font-semibold text-mist ring-2 ring-mist">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="pt-1 md:pt-5">
                  <h3 className="text-lg font-semibold leading-snug text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-body">{step.description}</p>
                  {i === LOOP_STEP && (
                    <p className="mt-3 flex max-w-[30ch] items-start gap-2 text-[14px] font-semibold leading-snug text-ink">
                      <RotateCcw size={15} strokeWidth={2.25} aria-hidden="true" className="mt-0.5 shrink-0 text-spark" />
                      <span>{LOOP_NOTE}</span>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
}
