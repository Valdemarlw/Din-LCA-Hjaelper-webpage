import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send, FileCheck, BarChart3, Truck, RefreshCw, FileOutput, type LucideProps } from "lucide-react";
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

const DRAW_SECONDS = 2.8;

type Pt = { x: number; y: number };
type Geometry = { width: number; height: number; points: Pt[] };

type PathModel = {
  d: string;
  /** Arrowhead per segment: position, rotation and how far along the path it sits (0..1). */
  arrows: { x: number; y: number; angle: number; at: number }[];
  /** How far along the path each step's disc sits (0..1). */
  stepAt: number[];
};

/** How far outside the grid the side lanes run when a row change has to pass a column of text. */
const LANE_OFFSET = 14;

/**
 * Turns disc centres into the polyline the connector follows. A straight drop
 * from one row to the next would cut through the upper step's text, so those
 * transitions detour along a lane just outside the grid (right lane for the
 * right half, left lane for the left half) and carry a single arrow there.
 */
function routePoints(points: Pt[], width: number) {
  const multiColumn = new Set(points.map((p) => Math.round(p.x))).size > 1;
  const pts: Pt[] = [];
  const arrowOn: boolean[] = []; // per segment pts[i] -> pts[i + 1]
  const stepIndex: number[] = []; // index in pts of each original disc

  const push = (p: Pt, arrow: boolean) => {
    if (pts.length) arrowOn.push(arrow);
    pts.push(p);
  };

  points.forEach((p, i) => {
    const prev = points[i - 1];
    const drops = prev && Math.abs(p.x - prev.x) < 1 && p.y > prev.y;
    if (multiColumn && drops) {
      const laneX = prev.x > width / 2 ? width + LANE_OFFSET : -LANE_OFFSET;
      push({ x: laneX, y: prev.y }, false);
      push({ x: laneX, y: p.y }, true);
      push(p, false);
    } else {
      push(p, true);
    }
    stepIndex.push(pts.length - 1);
  });
  return { pts, arrowOn, stepIndex };
}

function buildPath(points: Pt[], width: number, radius = 26): PathModel {
  if (points.length < 2) return { d: "", arrows: [], stepAt: points.map(() => 0) };
  const { pts, arrowOn, stepIndex } = routePoints(points, width);

  const lengths: number[] = [];
  for (let i = 1; i < pts.length; i++) {
    lengths.push(Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  const total = lengths.reduce((a, b) => a + b, 0) || 1;

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const prev = pts[i - 1];
    const p = pts[i];
    const next = pts[i + 1];
    const inLen = lengths[i - 1];
    const outLen = lengths[i];
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const inDir = { x: (p.x - prev.x) / inLen, y: (p.y - prev.y) / inLen };
    const outDir = { x: (next.x - p.x) / outLen, y: (next.y - p.y) / outLen };
    const a = { x: p.x - inDir.x * r, y: p.y - inDir.y * r };
    const b = { x: p.x + outDir.x * r, y: p.y + outDir.y * r };
    d += ` L ${a.x} ${a.y} Q ${p.x} ${p.y} ${b.x} ${b.y}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;

  const arrows: PathModel["arrows"] = [];
  const cumAt: number[] = [0];
  let cum = 0;
  for (let i = 0; i < lengths.length; i++) {
    const from = pts[i];
    const to = pts[i + 1];
    if (arrowOn[i]) {
      arrows.push({
        x: (from.x + to.x) / 2,
        y: (from.y + to.y) / 2,
        angle: (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI,
        at: (cum + lengths[i] / 2) / total,
      });
    }
    cum += lengths[i];
    cumAt.push(cum / total);
  }
  return { d, arrows, stepAt: stepIndex.map((idx) => cumAt[idx]) };
}

/**
 * The six steps sit along a connector that draws itself when the section
 * scrolls into view: arrowheads show direction, each disc springs in as the
 * line reaches it. Geometry is measured from the rendered grid, so the path
 * follows the discs exactly at every breakpoint.
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

  const path = useMemo(() => buildPath(geometry?.points ?? [], geometry?.width ?? 0), [geometry]);

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
              strokeWidth={1.5}
              strokeLinecap="round"
              className="text-green/45"
              initial={reduce ? false : { pathLength: 0 }}
              animate={play ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: DRAW_SECONDS, ease: "easeInOut" }}
            />
            {path.arrows.map((arrow, i) => (
              <g key={i} transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.angle})`}>
                <motion.path
                  d="M -6 -5 L 5 0 L -6 5 Z"
                  fill="currentColor"
                  className="text-green"
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  animate={play ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: arrow.at * DRAW_SECONDS, duration: 0.35, ease: EASE }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
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
                transition={{ delay, type: "spring", stiffness: 320, damping: 18 }}
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
                transition={{ delay: delay + 0.12, duration: 0.6, ease: EASE }}
              >
                <h3 className="text-lg font-semibold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-body">{step.description}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </SectionWrapper>
  );
}
