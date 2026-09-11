import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
import { Reveal, RevealWords } from "../motion/Reveal";
import { EASE } from "../motion/constants";

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

const DRAW_SECONDS = 3;
/** How far outside the grid a row-change turn swings, clear of the column's text. */
const LANE_OFFSET = 18;
const SAMPLES = 32;
const FLOW_PERIOD = 18; // dash + gap of the drifting "current" overlay

/*
 * The early calculation can come back over the limit. Then materials are
 * optimised and the calculation runs again before the process moves on. That
 * iteration is drawn as a small loop in the stroke right after step 03.
 */
const LOOP_STEP = 2;
const LOOP_AT = 64; // distance from the disc centre to the loop, along the travel direction
const LOOP_RADIUS = 15;
const LOOP_NOTE = "Over grænsen? Vi optimerer materialer og regner igen.";

type Pt = { x: number; y: number };
type Geometry = { width: number; height: number; points: Pt[] };
type Leg = (
  | { kind: "line"; from: Pt; to: Pt }
  | { kind: "turn"; from: Pt; to: Pt; c1: Pt; c2: Pt }
  | { kind: "loop"; from: Pt; to: Pt; far: Pt; sweep: 0 | 1 }
) & { endsAtDisc: boolean; arrow: boolean };
type Arrow = { x: number; y: number; angle: number; at: number };
type PathModel = { d: string; arrows: Arrow[]; stepAt: number[] };

const f = (n: number) => n.toFixed(1);

function bezierAt(leg: Extract<Leg, { kind: "turn" }>, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * leg.from.x + b * leg.c1.x + c * leg.c2.x + d * leg.to.x,
    y: a * leg.from.y + b * leg.c1.y + c * leg.c2.y + d * leg.to.y,
  };
}

function bezierTangent(leg: Extract<Leg, { kind: "turn" }>, t: number): Pt {
  const u = 1 - t;
  return {
    x: 3 * u * u * (leg.c1.x - leg.from.x) + 6 * u * t * (leg.c2.x - leg.c1.x) + 3 * t * t * (leg.to.x - leg.c2.x),
    y: 3 * u * u * (leg.c1.y - leg.from.y) + 6 * u * t * (leg.c2.y - leg.c1.y) + 3 * t * t * (leg.to.y - leg.c2.y),
  };
}

function legLength(leg: Leg): number {
  if (leg.kind === "line") return Math.hypot(leg.to.x - leg.from.x, leg.to.y - leg.from.y);
  if (leg.kind === "loop") return 2 * Math.PI * LOOP_RADIUS;
  let len = 0;
  let prev = leg.from;
  for (let i = 1; i <= SAMPLES; i++) {
    const p = bezierAt(leg, i / SAMPLES);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

/**
 * Discs in the same row are joined by straight runs. A change of row becomes
 * one continuous S-curve that swings out past the column's text and lands on
 * the next disc tangent to the incoming line, so the whole route reads as one
 * flowing stroke rather than a wiring diagram.
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
      legs.push({ kind: "loop", from: at, to: at, far, sweep, endsAtDisc: false, arrow: false });
      from = at;
    }

    if (drops) {
      // A cubic with both handles at the same x peaks at 0.75 of the handle reach.
      const reach = (laneX - from.x) / 0.75;
      legs.push({
        kind: "turn",
        from,
        to,
        c1: { x: from.x + reach, y: from.y },
        c2: { x: to.x + reach, y: to.y },
        endsAtDisc: true,
        arrow: true,
      });
    } else {
      legs.push({ kind: "line", from, to, endsAtDisc: true, arrow: true });
    }
  }
  return legs;
}

function buildPath(points: Pt[], width: number): PathModel {
  if (points.length < 2) return { d: "", arrows: [], stepAt: points.map(() => 0) };
  const legs = buildLegs(points, width);
  const lengths = legs.map(legLength);
  const total = lengths.reduce((a, b) => a + b, 0) || 1;

  let d = `M ${f(points[0].x)} ${f(points[0].y)}`;
  const arrows: Arrow[] = [];
  const stepAt = [0];
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
    } else {
      d += ` C ${f(leg.c1.x)} ${f(leg.c1.y)} ${f(leg.c2.x)} ${f(leg.c2.y)} ${f(leg.to.x)} ${f(leg.to.y)}`;
      if (leg.arrow) {
        const apex = bezierAt(leg, 0.5);
        const tangent = bezierTangent(leg, 0.5);
        arrows.push({
          x: apex.x,
          y: apex.y,
          angle: (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI,
          at: (cum + lengths[i] / 2) / total,
        });
      }
    }
    cum += lengths[i];
    if (leg.endsAtDisc) stepAt.push(cum / total);
  });

  return { d, arrows, stepAt };
}

/**
 * The six steps sit along a connector that draws itself when the section
 * scrolls into view: soft chevrons show direction, a faint current keeps
 * drifting along the stroke afterwards, and each disc springs in as the line
 * reaches it. Geometry is measured from the rendered grid, so the path follows
 * the discs exactly at every breakpoint.
 */
export function Process() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const discRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const inView = useInView(listRef, { once: true, margin: "-15% 0px -15% 0px" });
  const play = inView || !!reduce;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    // ResizeObserver fires once on observe, so the first measurement happens here too.
    const observer = new ResizeObserver(() => {
      const box = list.getBoundingClientRect();
      const points = discRefs.current.flatMap((el) => {
        if (!el) return [];
        const r = el.getBoundingClientRect();
        return [{ x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }];
      });
      setGeometry({ width: box.width, height: box.height, points });
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  const path = useMemo(
    () => buildPath(geometry?.points ?? [], geometry?.width ?? 0),
    [geometry]
  );

  return (
    <SectionWrapper bg="paper">
      <div className="max-w-2xl">
        <RevealWords as="h2" text="Sådan foregår det" className="text-3xl font-bold leading-tight md:text-4xl" />
        <Reveal as="p" delay={0.1} className="mt-4 text-lg text-body">
          Seks trin fra projektstart til myndighedsklar dokumentation.
        </Reveal>
      </div>

      <ol
        ref={listRef}
        className="relative mt-12 grid gap-y-10 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3"
      >
        {geometry && path.d && (
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            aria-hidden="true"
          >
            <motion.path
              d={path.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              className="text-green/40"
              initial={reduce ? false : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: DRAW_SECONDS, ease: [0.65, 0, 0.35, 1] }}
            />
            {!reduce && (
              <motion.path
                d={path.d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeDasharray={`3 ${FLOW_PERIOD - 3}`}
                className="text-green"
                initial={{ opacity: 0, strokeDashoffset: 0 }}
                animate={play ? { opacity: 0.4, strokeDashoffset: -FLOW_PERIOD } : {}}
                transition={{
                  opacity: { delay: DRAW_SECONDS, duration: 1 },
                  strokeDashoffset: { delay: DRAW_SECONDS, duration: 1.4, ease: "linear", repeat: Infinity },
                }}
              />
            )}
            {path.arrows.map((arrow, i) => (
              <g key={i} transform={`translate(${f(arrow.x)} ${f(arrow.y)}) rotate(${f(arrow.angle)})`}>
                <motion.path
                  d="M -6 -5.5 L 0 0 L -6 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green"
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={play ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: arrow.at * DRAW_SECONDS, duration: 0.6, ease: EASE }}
                />
              </g>
            ))}
          </svg>
        )}

        {steps.map((step, i) => {
          const delay = (path.stepAt[i] ?? 0) * DRAW_SECONDS;
          const Icon = step.icon;
          return (
            <li key={step.title} className={`relative flex gap-5 md:block ${ORDER[i]}`}>
              <motion.div
                ref={(el) => {
                  discRefs.current[i] = el;
                }}
                className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-green shadow-[0_10px_24px_-14px_rgb(44_95_48/0.55)] ring-1 ring-green/30"
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                animate={play ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay, type: "spring", stiffness: 210, damping: 19 }}
              >
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green text-[11px] font-bold text-white ring-2 ring-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
              <motion.div
                className="pt-1 md:pt-5"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay + 0.12, duration: 0.7, ease: EASE }}
              >
                <h3 className="text-lg font-semibold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-body">{step.description}</p>
                {i === LOOP_STEP && (
                  <p className="mt-3 flex max-w-[30ch] items-start gap-2 text-[13px] font-medium leading-snug text-green">
                    <RotateCcw size={14} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
                    <span>{LOOP_NOTE}</span>
                  </p>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </SectionWrapper>
  );
}
