// Inline SVG figures for the probability chapter (c7).
// Server components: no client JS, no chart library, deterministic by construction.

import {
  PALETTE,
  axisTitles,
  figureFrame,
  legendRow,
  linScale,
  polyPath,
  xTickLabel,
  yTick,
} from "./figure-helpers";

/** Shared bits for the two little automata below. */
function automaton({
  x0,
  y0,
  title,
  states,
  edges,
  answer,
}: {
  x0: number;
  y0: number;
  title: string;
  states: string[];
  edges: { from: number; to: number; label: string; back?: boolean }[];
  answer: string;
}) {
  const R = 21;
  const gap = 92;
  const cx = (i: number) => x0 + i * gap;
  return (
    <g key={title}>
      <text x={x0 - 12} y={y0 - 40} className="fill-foreground" fontSize={12.5} fontWeight={600}>
        {title}
      </text>
      {edges.map((e, i) => {
        const a = cx(e.from);
        const b = cx(e.to);
        if (e.from === e.to) {
          // self-loop above the node
          return (
            <g key={`sl${i}`}>
              <path
                d={`M${a - 10},${y0 - R + 3} C${a - 24},${y0 - R - 26} ${a + 24},${y0 - R - 26} ${a + 10},${y0 - R + 3}`}
                fill="none"
                className="text-muted-foreground"
                stroke="currentColor"
                strokeWidth={1.4}
                markerEnd="url(#arrow)"
              />
              <text x={a} y={y0 - R - 24} textAnchor="middle" className="fill-muted-foreground" fontSize={10.5}>
                {e.label}
              </text>
            </g>
          );
        }
        const back = e.back || e.to < e.from;
        const dip = back ? 46 : 0;
        const d = back
          ? `M${a - 4},${y0 + R - 4} C${a - 10},${y0 + dip} ${b + 10},${y0 + dip} ${b + 4},${y0 + R - 4}`
          : `M${a + R},${y0} L${b - R - 6},${y0}`;
        return (
          <g key={`e${i}`}>
            <path
              d={d}
              fill="none"
              stroke={back ? PALETTE.red : PALETTE.blue}
              strokeWidth={1.6}
              markerEnd={back ? "url(#arrowred)" : "url(#arrowblue)"}
            />
            <text
              x={back ? (a + b) / 2 : (a + b) / 2}
              y={back ? y0 + dip + 12 : y0 - 8}
              textAnchor="middle"
              fill={back ? PALETTE.red : PALETTE.blue}
              fontSize={10.5}
            >
              {e.label}
            </text>
          </g>
        );
      })}
      {states.map((s, i) => (
        <g key={`s${i}`}>
          <circle
            cx={cx(i)}
            cy={y0}
            r={R}
            className="text-border"
            stroke="currentColor"
            strokeWidth={1.6}
            fill="none"
          />
          {i === states.length - 1 && (
            <circle
              cx={cx(i)}
              cy={y0}
              r={R - 4}
              className="text-border"
              stroke="currentColor"
              strokeWidth={1.2}
              fill="none"
            />
          )}
          <text x={cx(i)} y={y0 + 4} textAnchor="middle" className="fill-foreground" fontSize={11.5}>
            {s}
          </text>
        </g>
      ))}
      <text x={cx(states.length - 1) + 44} y={y0 + 4} className="fill-foreground" fontSize={12} fontWeight={600}>
        {answer}
      </text>
    </g>
  );
}

/**
 * The whole reason HHT takes 8 flips and HTH takes 10: where the failure edge
 * sends you back to. This is the picture first-step analysis is drawn on.
 */
export function PatternAutomata({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  return figureFrame({
    W,
    H,
    ariaLabel:
      "Two state machines for coin patterns. In the HHT machine a failed third flip returns to the HH state; in the HTH machine it returns all the way to the H state, which is why HTH takes longer on average.",
    caption,
    children: (
      <>
        <defs>
          <marker id="arrow" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" className="fill-muted-foreground" />
          </marker>
          <marker id="arrowblue" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={PALETTE.blue} />
          </marker>
          <marker id="arrowred" markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={PALETTE.red} />
          </marker>
        </defs>

        {automaton({
          x0: 60,
          y0: 78,
          title: "HHT — a failed third flip keeps HH",
          states: ["∅", "H", "HH", "HHT"],
          edges: [
            { from: 0, to: 1, label: "H" },
            { from: 1, to: 2, label: "H" },
            { from: 2, to: 3, label: "T" },
            { from: 0, to: 0, label: "T" },
            { from: 1, to: 0, label: "T", back: true },
            { from: 2, to: 2, label: "H" },
          ],
          answer: "E = 8",
        })}

        {automaton({
          x0: 60,
          y0: 218,
          title: "HTH — a failed third flip drops back to H",
          states: ["∅", "H", "HT", "HTH"],
          edges: [
            { from: 0, to: 1, label: "H" },
            { from: 1, to: 2, label: "T" },
            { from: 2, to: 3, label: "H" },
            { from: 0, to: 0, label: "T" },
            { from: 1, to: 1, label: "H" },
            { from: 2, to: 0, label: "T", back: true },
          ],
          answer: "E = 10",
        })}
      </>
    ),
  });
}

/**
 * The rare-disease answer as natural frequencies: out of 10,000 people the
 * positives are overwhelmingly the false ones.
 */
export function BaseRateGrid({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 34, left: 40 };
  const cols = 40;
  const rows = 12;
  // 10,000 people compressed: each dot is 20 people. Show the positives only.
  const barY = 210;
  const barH = 34;
  const barX = 40;
  const barW = W - 80;
  const truePos = 99;
  const falsePos = 9999;
  const tot = truePos + falsePos;
  const tpW = (truePos / tot) * barW;

  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const sick = i === 0; // 1 in 480 shown; the real rate is 1 in 10,000
      dots.push(
        <circle
          key={`d${i}`}
          cx={pad.left + c * 12.4}
          cy={pad.top + r * 12.4}
          r={sick ? 4.4 : 2.5}
          fill={sick ? PALETTE.red : PALETTE.gray}
          opacity={sick ? 1 : 0.34}
        />,
      );
    }
  }

  return figureFrame({
    W,
    H,
    ariaLabel:
      "A grid of people with a single sick individual highlighted, above a bar splitting the positive test results into 99 true positives and 9,999 false positives.",
    caption,
    children: (
      <>
        <text x={40} y={20} className="fill-foreground" fontSize={12}>
          The population: disease is rare (1 in 10,000)
        </text>
        {dots}

        <text x={40} y={barY - 10} className="fill-foreground" fontSize={12}>
          Everyone who tests positive, out of 1,000,000 tested
        </text>

        <rect x={barX} y={barY} width={barW} height={barH} fill={PALETTE.gray} opacity={0.28} />
        <rect x={barX} y={barY} width={Math.max(tpW, 2.5)} height={barH} fill={PALETTE.red} />
        <rect
          x={barX}
          y={barY}
          width={barW}
          height={barH}
          className="text-border"
          stroke="currentColor"
          strokeWidth={1}
          fill="none"
        />

        <text x={barX + 10} y={barY + barH + 17} fill={PALETTE.red} fontSize={11}>
          99 true positives
        </text>
        <text x={barX + barW - 8} y={barY + barH + 17} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          9,999 false positives (1% of 999,900 healthy people)
        </text>
        <text x={W / 2} y={barY + barH + 34} textAnchor="middle" className="fill-foreground" fontSize={12} fontWeight={600}>
          P(sick | positive) = 99 / 10,098 ≈ 0.98%
        </text>
      </>
    ),
  });
}

/**
 * Coupon collector as a sum of geometric waits: each new face costs more than
 * the last, and the final one dominates.
 */
export function CouponCollectorStages({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 24, right: 20, bottom: 48, left: 52 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const waits = [1, 1.2, 1.5, 2, 3, 6]; // 6/6, 6/5, ... 6/1
  const total = waits.reduce((a, b) => a + b, 0); // 14.7
  const y = linScale(0, 6.6, pad.top + plotH, pad.top);
  const barW = plotW / waits.length;

  let cum = 0;
  return figureFrame({
    W,
    H,
    ariaLabel:
      "Six bars showing the expected number of extra rolls needed to see each new face of a die, rising from one roll for the first face to six rolls for the last.",
    caption,
    children: (
      <>
        {[0, 2, 4, 6].map((v, i) =>
          yTick({ y: y(v), label: `${v}`, left: pad.left, right: pad.left + plotW, labelX: pad.left - 8, key: i }),
        )}
        {waits.map((w, i) => {
          cum += w;
          const h = pad.top + plotH - y(w);
          return (
            <g key={`b${i}`}>
              <rect
                x={pad.left + barW * i + barW * 0.18}
                y={y(w)}
                width={barW * 0.64}
                height={h}
                fill={i === waits.length - 1 ? PALETTE.red : PALETTE.blue}
                opacity={i === waits.length - 1 ? 1 : 0.55 + i * 0.07}
              />
              <text
                x={pad.left + barW * (i + 0.5)}
                y={y(w) - 6}
                textAnchor="middle"
                className="fill-foreground"
                fontSize={10.5}
              >
                6/{6 - i}
              </text>
              <text
                x={pad.left + barW * (i + 0.5)}
                y={pad.top + plotH + 17}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize={10.5}
              >
                {cum.toFixed(1)}
              </text>
            </g>
          );
        })}
        <text x={pad.left + plotW} y={pad.top + 12} textAnchor="end" className="fill-foreground" fontSize={12} fontWeight={600}>
          total = 6(1 + ½ + … + ⅙) = {total.toFixed(1)} rolls
        </text>
        {axisTitles({
          xLabel: "collecting the 1st, 2nd, … 6th distinct face  (running total below)",
          yLabel: "extra rolls",
          plotW,
          plotH,
          pad,
          H,
        })}
      </>
    ),
  });
}

/**
 * Gambler's ruin: sample paths from 20 toward the two absorbing barriers, and
 * the linear absorption probability that first-step analysis produces.
 */
export function GamblersRuinPaths({ caption }: { caption?: string }) {
  const W = 560;
  const H = 310;
  const pad = { top: 22, right: 138, bottom: 46, left: 46 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const N = 100;
  const start = 20;
  const steps = 340;
  const x = linScale(0, steps, pad.left, pad.left + plotW);
  const y = linScale(0, N, pad.top + plotH, pad.top);

  // Deterministic pseudo-random walks (Mulberry32 inline, seeded per path).
  function walk(seed: number) {
    let a = seed >>> 0;
    const rand = () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const pts: [number, number][] = [[0, start]];
    let v = start;
    for (let t = 1; t <= steps; t++) {
      v += rand() < 0.5 ? 1 : -1;
      pts.push([t, v]);
      if (v <= 0 || v >= N) break;
    }
    return pts;
  }

  const seeds = [7, 21, 44, 91, 158];
  const paths = seeds.map(walk);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Five random walks starting at twenty dollars between absorbing barriers at zero and one hundred. Most hit zero; one reaches one hundred, matching the one-in-five absorption probability.",
    caption,
    children: (
      <>
        {[0, 20, 50, 100].map((v, i) =>
          yTick({ y: y(v), label: `${v}`, left: pad.left, right: pad.left + plotW, labelX: pad.left - 8, key: i }),
        )}
        {/* absorbing barriers */}
        {[0, N].map((v, i) => (
          <line
            key={`bar${i}`}
            x1={pad.left}
            x2={pad.left + plotW}
            y1={y(v)}
            y2={y(v)}
            stroke={PALETTE.red}
            strokeWidth={2}
          />
        ))}
        <line
          x1={pad.left}
          x2={pad.left + plotW}
          y1={y(start)}
          y2={y(start)}
          className="text-muted-foreground"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 3"
        />

        {paths.map((p, i) => {
          const end = p[p.length - 1][1];
          const won = end >= N;
          return (
            <path
              key={`p${i}`}
              d={p.map(([t, v], j) => `${j === 0 ? "M" : "L"}${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
              fill="none"
              stroke={won ? PALETTE.blue : PALETTE.gray}
              strokeWidth={won ? 2.1 : 1.3}
              opacity={won ? 1 : 0.7}
            />
          );
        })}

        <text x={pad.left + 6} y={y(N) - 7} fill={PALETTE.red} fontSize={11}>
          absorbing: reach 100
        </text>
        <text x={pad.left + 6} y={y(0) - 7} fill={PALETTE.red} fontSize={11}>
          absorbing: ruin at 0
        </text>

        <g transform={`translate(${pad.left + plotW + 12} ${pad.top + 30})`}>
          <text x={0} y={0} className="fill-foreground" fontSize={11.5} fontWeight={600}>
            Fair game
          </text>
          <text x={0} y={20} className="fill-muted-foreground" fontSize={11}>
            P(reach N)
          </text>
          <text x={0} y={38} className="fill-foreground" fontSize={13}>
            = i / N
          </text>
          <text x={0} y={58} className="fill-muted-foreground" fontSize={11}>
            = 20/100
          </text>
          <text x={0} y={76} fill={PALETTE.blue} fontSize={13} fontWeight={600}>
            = 0.20
          </text>
          <text x={0} y={104} className="fill-muted-foreground" fontSize={10.5}>
            The absorption
          </text>
          <text x={0} y={118} className="fill-muted-foreground" fontSize={10.5}>
            probability is linear
          </text>
          <text x={0} y={132} className="fill-muted-foreground" fontSize={10.5}>
            in the start only
          </text>
          <text x={0} y={146} className="fill-muted-foreground" fontSize={10.5}>
            when the walk is fair.
          </text>
        </g>

        {[0, 100, 200, 300].map((t, i) =>
          xTickLabel({ x: x(t), y: pad.top + plotH + 17, label: `${t}`, key: i }),
        )}
        {axisTitles({ xLabel: "rounds played", yLabel: "your capital", plotW, plotH, pad, H })}
      </>
    ),
  });
}

/**
 * The inspection paradox drawn on a timeline: a uniformly random arrival lands
 * inside a long gap far more often than inside a short one, because long gaps
 * cover more of the line.
 */
export function InspectionParadox({ caption }: { caption?: string }) {
  const W = 560;
  const H = 260;
  const left = 40;
  const right = W - 30;
  const span = right - left;
  const yLine = 96;

  // Gaps summing to 100 "minutes"; mean 10, but the long ones own the timeline.
  const gaps = [4, 21, 6, 3, 17, 5, 26, 8, 10];
  const total = gaps.reduce((a, b) => a + b, 0);
  const px = (v: number) => left + (v / total) * span;
  const edges: number[] = [0];
  gaps.forEach((g) => edges.push(edges[edges.length - 1] + g));

  // Three arrivals; deterministic positions chosen to sit in the widest gaps,
  // which is exactly the point being made.
  const arrivals = [33, 62, 79];
  const gapOf = (t: number) => gaps[edges.findIndex((e, i) => t >= e && t < edges[i + 1])];

  return figureFrame({
    W,
    H,
    ariaLabel:
      "A timeline of bus arrivals with unequal gaps. Three randomly placed passenger arrivals all land inside the widest gaps, because wide gaps occupy more of the timeline.",
    caption,
    children: (
      <>
        <text x={left} y={28} className="fill-foreground" fontSize={12}>
          Buses arrive with gaps averaging 10 minutes — but the gaps are not equal
        </text>

        {gaps.map((g, i) => {
          const a = px(edges[i]);
          const b = px(edges[i + 1]);
          const wide = g >= 15;
          return (
            <g key={`g${i}`}>
              <rect
                x={a}
                y={yLine - 16}
                width={b - a}
                height={32}
                fill={wide ? PALETTE.red : PALETTE.blue}
                opacity={wide ? 0.2 : 0.11}
              />
              <text x={(a + b) / 2} y={yLine + 5} textAnchor="middle" className="fill-muted-foreground" fontSize={10}>
                {g}
              </text>
            </g>
          );
        })}

        <line x1={left} x2={right} y1={yLine} y2={yLine} className="text-border" stroke="currentColor" strokeWidth={1.4} />
        {edges.map((e, i) => (
          <line
            key={`t${i}`}
            x1={px(e)}
            x2={px(e)}
            y1={yLine - 16}
            y2={yLine + 16}
            className="text-foreground"
            stroke="currentColor"
            strokeWidth={1.6}
          />
        ))}
        <text x={left} y={yLine + 34} className="fill-muted-foreground" fontSize={10.5}>
          ticks = bus arrivals; numbers = gap length in minutes
        </text>

        {arrivals.map((t, i) => (
          <g key={`a${i}`}>
            <line
              x1={px(t)}
              x2={px(t)}
              y1={yLine + 44}
              y2={yLine + 18}
              stroke={PALETTE.amber}
              strokeWidth={1.8}
              markerEnd="url(#upArrow)"
            />
            <circle cx={px(t)} cy={yLine + 50} r={4} fill={PALETTE.amber} />
            <text x={px(t)} y={yLine + 68} textAnchor="middle" fill={PALETTE.amber} fontSize={10}>
              gap {gapOf(t)}
            </text>
          </g>
        ))}
        <defs>
          <marker id="upArrow" markerWidth={8} markerHeight={8} refX={4} refY={2} orient="auto">
            <path d="M0,6 L4,0 L8,6 Z" fill={PALETTE.amber} />
          </marker>
        </defs>

        <text x={left} y={H - 32} className="fill-foreground" fontSize={11.5}>
          You arrive at a random <tspan fontStyle="italic">moment</tspan>, not at a random gap. Long gaps cover more of the line, so
        </text>
        <text x={left} y={H - 15} className="fill-foreground" fontSize={11.5}>
          you are more likely to land in one: E[gap you land in] = m + σ²/m ≥ m, and it is 20 for the exponential.
        </text>
      </>
    ),
  });
}

/**
 * Order statistics of n uniforms land, in expectation, at the n+1 equally
 * spaced interior points — the "fenceposts" picture.
 */
export function UniformOrderStats({ caption }: { caption?: string }) {
  const W = 560;
  const H = 250;
  const left = 56;
  const right = W - 36;
  const span = right - left;
  const rows = [
    { n: 1, y: 62 },
    { n: 2, y: 110 },
    { n: 4, y: 158 },
  ];
  const px = (u: number) => left + u * span;

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Three number lines from zero to one showing where one, two and four uniform order statistics sit on average: at the points that cut the interval into n plus one equal pieces.",
    caption,
    children: (
      <>
        <text x={left - 16} y={30} className="fill-foreground" fontSize={12}>
          E[U₍ᵢ₎] = i / (n+1) — the points splitting [0,1] into n+1 equal gaps
        </text>
        {rows.map(({ n, y }) => (
          <g key={`r${n}`}>
            <text x={left - 12} y={y + 4} textAnchor="end" className="fill-muted-foreground" fontSize={11.5}>
              n = {n}
            </text>
            <line x1={left} x2={right} y1={y} y2={y} className="text-border" stroke="currentColor" strokeWidth={1.4} />
            {[0, 1].map((e) => (
              <line
                key={`e${n}${e}`}
                x1={px(e)}
                x2={px(e)}
                y1={y - 7}
                y2={y + 7}
                className="text-foreground"
                stroke="currentColor"
                strokeWidth={1.4}
              />
            ))}
            {Array.from({ length: n }, (_, k) => {
              const u = (k + 1) / (n + 1);
              return (
                <g key={`p${n}${k}`}>
                  <circle cx={px(u)} cy={y} r={5} fill={PALETTE.blue} />
                  <text x={px(u)} y={y - 12} textAnchor="middle" fill={PALETTE.blue} fontSize={10.5}>
                    {k + 1}/{n + 1}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x={left} y={210} className="fill-foreground" fontSize={11.5}>
          So E[max of 2] = 2/3, E[min of 2] = 1/3, and the expected gaps are all equal — which is why
        </text>
        <text x={left} y={227} className="fill-foreground" fontSize={11.5}>
          symmetry answers most order-statistic questions without a single integral.
        </text>
      </>
    ),
  });
}

/**
 * Kelly: log-growth rate against bet fraction. The peak is at the edge, and
 * betting twice the optimum gives back all of the growth.
 */
export function KellyCurve({ caption }: { caption?: string }) {
  const W = 560;
  const H = 320;
  const pad = { top: 22, right: 22, bottom: 50, left: 60 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const p = 0.6;
  const g = (f: number) => p * Math.log(1 + f) + (1 - p) * Math.log(1 - f);
  const fStar = 2 * p - 1; // 0.2

  const x = linScale(0, 0.6, pad.left, pad.left + plotW);
  const y = linScale(-0.03, 0.025, pad.top + plotH, pad.top);
  const grid = Array.from({ length: 241 }, (_, i) => (0.6 * i) / 240).filter((f) => f < 0.999);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Expected log growth per bet against the fraction of bankroll wagered, for a sixty percent even-money edge. The curve peaks at twenty percent and crosses zero near forty percent.",
    caption,
    children: (
      <>
        {[-0.03, -0.02, -0.01, 0, 0.01, 0.02].map((v, i) =>
          yTick({
            y: y(v),
            label: v.toFixed(2),
            left: pad.left,
            right: pad.left + plotW,
            labelX: pad.left - 8,
            key: i,
          }),
        )}
        <line
          x1={pad.left}
          x2={pad.left + plotW}
          y1={y(0)}
          y2={y(0)}
          className="text-foreground"
          stroke="currentColor"
          strokeWidth={1.3}
        />

        <path d={polyPath(grid, g, x, y)} fill="none" stroke={PALETTE.blue} strokeWidth={2.6} />

        {/* the optimum */}
        <line
          x1={x(fStar)}
          x2={x(fStar)}
          y1={y(g(fStar))}
          y2={y(0)}
          stroke={PALETTE.red}
          strokeWidth={1.4}
          strokeDasharray="4 3"
        />
        <circle cx={x(fStar)} cy={y(g(fStar))} r={4.6} fill={PALETTE.red} />
        <text x={x(fStar)} y={y(g(fStar)) - 10} textAnchor="middle" fill={PALETTE.red} fontSize={11.5} fontWeight={600}>
          f* = 2p − 1 = 0.20
        </text>

        {/* double Kelly gives back everything */}
        <circle cx={x(2 * fStar)} cy={y(g(2 * fStar))} r={4.2} fill={PALETTE.amber} />
        <text x={x(2 * fStar) + 8} y={y(g(2 * fStar)) + 4} fill={PALETTE.amber} fontSize={11}>
          2f* — growth back to zero
        </text>

        {/* half Kelly keeps most of the growth */}
        <circle cx={x(fStar / 2)} cy={y(g(fStar / 2))} r={3.8} fill={PALETTE.green} />
        <text x={x(fStar / 2) - 6} y={y(g(fStar / 2)) - 9} textAnchor="end" fill={PALETTE.green} fontSize={11}>
          half Kelly: 75% of the growth
        </text>

        {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((t, i) =>
          xTickLabel({ x: x(t), y: pad.top + plotH + 18, label: t.toFixed(1), key: i }),
        )}
        {axisTitles({
          xLabel: "fraction of bankroll bet, f",
          yLabel: "expected log growth per bet",
          plotW,
          plotH,
          pad,
          H,
        })}
      </>
    ),
  });
}

/**
 * The five distributions as one page of shapes, so the generating story and the
 * picture are learned together.
 */
export function FiveDistributions({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const cols = 3;
  const cellW = W / cols;
  const cellH = 132;
  const pad = 26;

  function lgamma(z: number): number {
    const c = [76.18009173, -86.50532033, 24.01409822, -1.231739516, 0.00120858003, -0.00000536382];
    let t = z + 5.5 - (z + 0.5) * Math.log(z + 5.5);
    let s = 1.0;
    for (let i = 0; i < 6; i++) s += c[i] / (z + i + 1);
    return -t + Math.log(2.5066282746 * s / z);
  }
  const choose = (n: number, k: number) =>
    Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1));

  const panels: {
    title: string;
    story: string;
    kind: "bar" | "curve";
    vals: number[];
  }[] = [
    {
      title: "Binomial(10, 0.4)",
      story: "n fixed trials, count successes",
      kind: "bar",
      vals: Array.from({ length: 11 }, (_, k) => choose(10, k) * 0.4 ** k * 0.6 ** (10 - k)),
    },
    {
      title: "Geometric(0.3)",
      story: "trials until the first success",
      kind: "bar",
      vals: Array.from({ length: 11 }, (_, k) => 0.3 * 0.7 ** k),
    },
    {
      title: "Poisson(3)",
      story: "events in a fixed window",
      kind: "bar",
      vals: Array.from({ length: 11 }, (_, k) => (Math.exp(-3) * 3 ** k) / Math.exp(lgamma(k + 1))),
    },
    {
      title: "Exponential(1)",
      story: "waiting time to the next event",
      kind: "curve",
      vals: Array.from({ length: 41 }, (_, i) => Math.exp(-(i / 10))),
    },
    {
      title: "Normal(0, 1)",
      story: "sums of many small effects",
      kind: "curve",
      vals: Array.from({ length: 41 }, (_, i) => Math.exp(-(((i - 20) / 5) ** 2) / 2)),
    },
  ];

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Five small panels showing the shapes of the binomial, geometric, Poisson, exponential and normal distributions, each labelled with the situation that generates it.",
    caption,
    children: (
      <>
        {panels.map((p, idx) => {
          const cx0 = (idx % cols) * cellW + pad;
          const cy0 = Math.floor(idx / cols) * cellH + 26;
          const w = cellW - pad - 14;
          const h = 62;
          const mx = Math.max(...p.vals);
          return (
            <g key={`p${idx}`}>
              <text x={cx0} y={cy0 - 12} className="fill-foreground" fontSize={11} fontWeight={600}>
                {p.title}
              </text>
              <line
                x1={cx0}
                x2={cx0 + w}
                y1={cy0 + h}
                y2={cy0 + h}
                className="text-border"
                stroke="currentColor"
                strokeWidth={1}
              />
              {p.kind === "bar"
                ? p.vals.map((v, i) => {
                    const bw = w / p.vals.length;
                    const bh = (v / mx) * h;
                    return (
                      <rect
                        key={`b${i}`}
                        x={cx0 + i * bw + bw * 0.15}
                        y={cy0 + h - bh}
                        width={bw * 0.7}
                        height={bh}
                        fill={PALETTE.blue}
                        opacity={0.85}
                      />
                    );
                  })
                : (
                    <path
                      d={p.vals
                        .map(
                          (v, i) =>
                            `${i === 0 ? "M" : "L"}${(cx0 + (i / (p.vals.length - 1)) * w).toFixed(1)},${(cy0 + h - (v / mx) * h).toFixed(1)}`,
                        )
                        .join(" ")}
                      fill="none"
                      stroke={PALETTE.red}
                      strokeWidth={2.2}
                    />
                  )}
              <text x={cx0} y={cy0 + h + 15} className="fill-muted-foreground" fontSize={9.6}>
                {p.story}
              </text>
            </g>
          );
        })}
        <text x={pad} y={H - 12} className="fill-foreground" fontSize={11.5}>
          Learn the generating story, not the formula: the story tells you which one a word problem is describing.
        </text>
      </>
    ),
  });
}
