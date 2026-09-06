// Inline SVG figures for the time-series chapter (c8).
// Server components: no client JS, deterministic seeded paths only.

import {
  PALETTE,
  axisTitles,
  figureFrame,
  legendRow,
  linScale,
  polyPath,
  rng,
  gauss,
  xTickLabel,
  yTick,
} from "./figure-helpers";

/** Deterministic random walk of length n from a seed. */
function rw(seed: number, n: number, drift = 0, scale = 1): number[] {
  const r = rng(seed);
  const out = [0];
  for (let i = 1; i < n; i++) out.push(out[i - 1] + drift + scale * gauss(r));
  return out;
}

/**
 * The defining property of a unit root: the variance of the level grows
 * linearly in t, so the series never settles and has no mean to revert to.
 */
export function RandomWalkVariance({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 20, right: 20, bottom: 46, left: 46 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const n = 260;
  const x = linScale(0, n, pad.left, pad.left + plotW);
  const y = linScale(-42, 42, pad.top + plotH, pad.top);
  const ts = Array.from({ length: n }, (_, i) => i);

  const walks = [3, 17, 29, 41, 58, 73].map((s) => rw(s, n));
  const band = (k: number) =>
    `M${ts.map((t) => `${x(t).toFixed(1)},${y(k * Math.sqrt(t)).toFixed(1)}`).join(" L")} L${ts
      .slice()
      .reverse()
      .map((t) => `${x(t).toFixed(1)},${y(-k * Math.sqrt(t)).toFixed(1)}`)
      .join(" L")} Z`;

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Six random walks spreading apart over time inside a widening square-root envelope, showing that the variance of a unit-root process grows without bound.",
    caption,
    children: (
      <>
        {[-40, -20, 0, 20, 40].map((v, i) =>
          yTick({ y: y(v), label: `${v}`, left: pad.left, right: pad.left + plotW, labelX: pad.left - 8, key: i }),
        )}
        <path d={band(2)} fill={PALETTE.red} opacity={0.09} />
        <path d={band(1)} fill={PALETTE.red} opacity={0.12} />
        {walks.map((w, i) => (
          <path
            key={`w${i}`}
            d={polyPath(ts, (t) => w[t], x, y)}
            fill="none"
            stroke={i === 0 ? PALETTE.blue : PALETTE.gray}
            strokeWidth={i === 0 ? 2 : 1.2}
            opacity={i === 0 ? 1 : 0.6}
          />
        ))}
        <line
          x1={pad.left}
          x2={pad.left + plotW}
          y1={y(0)}
          y2={y(0)}
          className="text-foreground"
          stroke="currentColor"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text x={pad.left + plotW - 6} y={y(2 * Math.sqrt(n)) + 14} textAnchor="end" fill={PALETTE.red} fontSize={11}>
          ±2σ√t — the envelope widens forever
        </text>
        <text x={pad.left + 8} y={pad.top + 14} className="fill-foreground" fontSize={11.5}>
          Var(yₜ) = σ²t, so there is no mean to revert to
        </text>
        {[0, 100, 200].map((t, i) => xTickLabel({ x: x(t), y: pad.top + plotH + 17, label: `${t}`, key: i }))}
        {axisTitles({ xLabel: "time", yLabel: "level", plotW, plotH, pad, H })}
      </>
    ),
  });
}

/**
 * Two unrelated random walks and the regression between them. The left panel
 * shows there is no relationship; the right shows the regression insisting
 * there is.
 */
export function SpuriousRegression({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 20, right: 16, bottom: 46, left: 44 };
  const gap = 46;
  const panelW = (W - pad.left - pad.right - gap) / 2;
  const plotH = H - pad.top - pad.bottom;
  const n = 300;
  const a = rw(11, n, 0.04);
  const b = rw(404, n, 0.035);

  const lo = Math.min(...a, ...b) - 1;
  const hi = Math.max(...a, ...b) + 1;
  const lx = linScale(0, n, pad.left, pad.left + panelW);
  const ly = linScale(lo, hi, pad.top + plotH, pad.top);
  const ts = Array.from({ length: n }, (_, i) => i);

  // OLS of b on a, plus R^2 — computed, not asserted.
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) {
    sab += (a[i] - ma) * (b[i] - mb);
    saa += (a[i] - ma) ** 2;
    sbb += (b[i] - mb) ** 2;
  }
  const slope = sab / saa;
  const r2 = (sab * sab) / (saa * sbb);

  const rLeft = pad.left + panelW + gap;
  const rx = linScale(lo, hi, rLeft, rLeft + panelW);
  const ry = linScale(lo, hi, pad.top + plotH, pad.top);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Left: two unrelated random walks drifting upward over time. Right: a scatter of one against the other with a steep fitted line and a high R-squared, despite the two series being independent by construction.",
    caption,
    children: (
      <>
        {/* left: the two series */}
        <path d={polyPath(ts, (t) => a[t], lx, ly)} fill="none" stroke={PALETTE.blue} strokeWidth={1.9} />
        <path d={polyPath(ts, (t) => b[t], lx, ly)} fill="none" stroke={PALETTE.red} strokeWidth={1.9} />
        <text x={pad.left} y={pad.top + 12} className="fill-foreground" fontSize={11.5}>
          Two independent random walks
        </text>
        <text x={pad.left + panelW / 2} y={H - 26} textAnchor="middle" className="fill-foreground" fontSize={12}>
          time
        </text>

        {/* right: the scatter that lies */}
        {ts.filter((t) => t % 3 === 0).map((t) => (
          <circle key={`s${t}`} cx={rx(a[t])} cy={ry(b[t])} r={2} fill={PALETTE.gray} opacity={0.6} />
        ))}
        <line
          x1={rx(lo)}
          x2={rx(hi)}
          y1={ry(mb + slope * (lo - ma))}
          y2={ry(mb + slope * (hi - ma))}
          stroke={PALETTE.red}
          strokeWidth={2.2}
        />
        <text x={rLeft} y={pad.top + 12} className="fill-foreground" fontSize={11.5}>
          Regressing one on the other
        </text>
        <text x={rLeft + panelW - 2} y={pad.top + plotH - 22} textAnchor="end" fill={PALETTE.red} fontSize={12} fontWeight={600}>
          R² = {r2.toFixed(2)}
        </text>
        <text x={rLeft + panelW - 2} y={pad.top + plotH - 6} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          slope = {slope.toFixed(2)}, |t| large
        </text>
        <text x={rLeft + panelW / 2} y={H - 26} textAnchor="middle" className="fill-foreground" fontSize={12}>
          series A
        </text>
      </>
    ),
  });
}

/**
 * The null-hypothesis trap: ADF and KPSS point in opposite directions, so the
 * four combinations of their verdicts are what you actually read.
 */
export function AdfKpssGrid({ caption }: { caption?: string }) {
  const W = 560;
  const H = 290;
  const x0 = 150;
  const y0 = 78;
  const cw = 190;
  const ch = 74;

  const cells = [
    { r: 0, c: 0, t: "Stationary", s: "Both agree. Trade it.", color: PALETTE.green },
    { r: 0, c: 1, t: "Contradiction", s: "Neither model fits — suspect\nstructural break or fractional\nintegration.", color: PALETTE.amber },
    { r: 1, c: 0, t: "Inconclusive", s: "Not enough data to separate\nthem. Do not read this as\n“stationary”.", color: PALETTE.amber },
    { r: 1, c: 1, t: "Unit root", s: "Both agree. Difference it,\nor find a cointegrating pair.", color: PALETTE.red },
  ];

  return figureFrame({
    W,
    H,
    ariaLabel:
      "A two by two grid crossing the ADF verdict with the KPSS verdict, labelling the two agreeing cells stationary and unit root and the two disagreeing cells contradiction and inconclusive.",
    caption,
    children: (
      <>
        <text x={x0 + cw} y={22} textAnchor="middle" className="fill-foreground" fontSize={12} fontWeight={600}>
          ADF — null is “has a unit root”
        </text>
        <text x={x0 + 0.5 * cw} y={44} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>
          rejects (p small)
        </text>
        <text x={x0 + 1.5 * cw} y={44} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>
          fails to reject
        </text>
        <text
          transform={`translate(22 ${y0 + ch}) rotate(-90)`}
          textAnchor="middle"
          className="fill-foreground"
          fontSize={12}
          fontWeight={600}
        >
          KPSS — null is “is stationary”
        </text>
        <text x={x0 - 10} y={y0 + 0.5 * ch} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          fails to reject
        </text>
        <text x={x0 - 10} y={y0 + 1.5 * ch} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          rejects (p small)
        </text>

        {cells.map((c, i) => (
          <g key={`c${i}`}>
            <rect
              x={x0 + c.c * cw}
              y={y0 + c.r * ch}
              width={cw}
              height={ch}
              fill={c.color}
              opacity={0.12}
              stroke={c.color}
              strokeWidth={1.3}
            />
            <text x={x0 + c.c * cw + 10} y={y0 + c.r * ch + 19} fill={c.color} fontSize={12} fontWeight={600}>
              {c.t}
            </text>
            {c.s.split("\n").map((ln, j) => (
              <text
                key={`l${j}`}
                x={x0 + c.c * cw + 10}
                y={y0 + c.r * ch + 35 + j * 13}
                className="fill-muted-foreground"
                fontSize={10.2}
              >
                {ln}
              </text>
            ))}
          </g>
        ))}
        <text x={x0} y={H - 16} className="fill-foreground" fontSize={11.3}>
          The tests have opposite nulls, so “failed to reject ADF” is not evidence of a unit root — only KPSS can supply that.
        </text>
      </>
    ),
  });
}

/**
 * Cointegration: two non-stationary price series that wander together, and the
 * stationary spread that is the actual tradeable object.
 */
export function CointegratedSpread({ caption }: { caption?: string }) {
  const W = 560;
  const H = 330;
  const pad = { top: 18, right: 18, bottom: 44, left: 46 };
  const plotW = W - pad.left - pad.right;
  const topH = 150;
  const botH = 74;
  const n = 320;

  // One shared stochastic trend plus a stationary AR(1) spread: I(1) + I(0).
  const common = rw(5, n, 0.05, 0.9);
  const r = rng(99);
  const spread: number[] = [0];
  for (let i = 1; i < n; i++) spread.push(0.94 * spread[i - 1] + 0.6 * gauss(r));
  const A = common.map((v, i) => 20 + v + 0.5 * spread[i]);
  const B = common.map((v, i) => 20 + v - 0.5 * spread[i]);

  const ts = Array.from({ length: n }, (_, i) => i);
  const lo = Math.min(...A, ...B) - 1;
  const hi = Math.max(...A, ...B) + 1;
  const x = linScale(0, n, pad.left, pad.left + plotW);
  const yT = linScale(lo, hi, pad.top + topH, pad.top);
  const sMax = Math.max(...spread.map(Math.abs)) * 1.15;
  const yB = linScale(-sMax, sMax, pad.top + topH + 34 + botH, pad.top + topH + 34);
  const sd = Math.sqrt(spread.reduce((s, v) => s + v * v, 0) / n);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Top: two price series wandering upward together without settling. Bottom: their difference oscillating around zero inside plus and minus two standard deviation bands.",
    caption,
    children: (
      <>
        <path d={polyPath(ts, (t) => A[t], x, yT)} fill="none" stroke={PALETTE.blue} strokeWidth={1.8} />
        <path d={polyPath(ts, (t) => B[t], x, yT)} fill="none" stroke={PALETTE.red} strokeWidth={1.8} />
        <text x={pad.left + 6} y={pad.top + 13} className="fill-foreground" fontSize={11.5}>
          Two I(1) prices: each alone has a unit root
        </text>

        {/* the spread */}
        {[-2, 0, 2].map((k, i) => (
          <line
            key={`b${i}`}
            x1={pad.left}
            x2={pad.left + plotW}
            y1={yB(k * sd)}
            y2={yB(k * sd)}
            stroke={k === 0 ? PALETTE.gray : PALETTE.amber}
            strokeWidth={1}
            strokeDasharray={k === 0 ? undefined : "4 3"}
            opacity={0.85}
          />
        ))}
        <path d={polyPath(ts, (t) => spread[t], x, yB)} fill="none" stroke={PALETTE.green} strokeWidth={1.8} />
        <text x={pad.left + 6} y={pad.top + topH + 30} className="fill-foreground" fontSize={11.5}>
          Their combination A − B is I(0): it has a mean, and it comes back to it
        </text>
        <text x={pad.left + plotW - 4} y={yB(2 * sd) - 5} textAnchor="end" fill={PALETTE.amber} fontSize={10.5}>
          ±2σ entry bands
        </text>

        {[0, 100, 200, 300].map((t, i) =>
          xTickLabel({ x: x(t), y: pad.top + topH + 34 + botH + 18, label: `${t}`, key: i }),
        )}
        <text x={pad.left + plotW / 2} y={H - 8} textAnchor="middle" className="fill-foreground" fontSize={12}>
          time
        </text>
      </>
    ),
  });
}

/** Small ACF/PACF stem panel used by the identification figure. */
function stems({
  x0,
  y0,
  w,
  h,
  vals,
  title,
  color,
  cutoff,
}: {
  x0: number;
  y0: number;
  w: number;
  h: number;
  vals: number[];
  title: string;
  color: string;
  cutoff?: number;
}) {
  const mid = y0 + h / 2;
  const sc = (v: number) => mid - (v * h) / 2.35;
  const bw = w / vals.length;
  const band = 1.96 / Math.sqrt(500);
  return (
    <g key={title}>
      <text x={x0} y={y0 - 5} className="fill-foreground" fontSize={10.6} fontWeight={600}>
        {title}
      </text>
      <rect x={x0} y={sc(band)} width={w} height={sc(-band) - sc(band)} fill={PALETTE.gray} opacity={0.16} />
      <line x1={x0} x2={x0 + w} y1={mid} y2={mid} className="text-border" stroke="currentColor" strokeWidth={1} />
      {vals.map((v, i) => (
        <g key={`s${i}`}>
          <line
            x1={x0 + bw * (i + 0.5)}
            x2={x0 + bw * (i + 0.5)}
            y1={mid}
            y2={sc(v)}
            stroke={cutoff !== undefined && i + 1 > cutoff ? PALETTE.gray : color}
            strokeWidth={2.4}
            opacity={cutoff !== undefined && i + 1 > cutoff ? 0.45 : 1}
          />
          <circle
            cx={x0 + bw * (i + 0.5)}
            cy={sc(v)}
            r={2}
            fill={cutoff !== undefined && i + 1 > cutoff ? PALETTE.gray : color}
            opacity={cutoff !== undefined && i + 1 > cutoff ? 0.45 : 1}
          />
        </g>
      ))}
      {cutoff !== undefined && (
        <line
          x1={x0 + bw * cutoff}
          x2={x0 + bw * cutoff}
          y1={y0}
          y2={y0 + h}
          stroke={PALETTE.red}
          strokeWidth={1.2}
          strokeDasharray="3 3"
        />
      )}
    </g>
  );
}

/**
 * The Box-Jenkins identification rule as a picture: AR cuts off in the PACF,
 * MA cuts off in the ACF, and each tails off in the other.
 */
export function AcfPacfSignatures({ caption }: { caption?: string }) {
  const W = 560;
  const H = 320;
  const L = 12;
  const lags = Array.from({ length: L }, (_, i) => i + 1);

  // AR(2) with phi1=0.6, phi2=0.25 — ACF from Yule-Walker, PACF cuts at 2.
  const arAcf: number[] = [];
  for (const k of lags) {
    if (k === 1) arAcf.push(0.6 / (1 - 0.25));
    else if (k === 2) arAcf.push(0.6 * arAcf[0] + 0.25);
    else arAcf.push(0.6 * arAcf[k - 2] + 0.25 * arAcf[k - 3]);
  }
  const arPacf = lags.map((k) => (k === 1 ? arAcf[0] : k === 2 ? 0.25 : 0.012 * Math.cos(k)));

  // MA(2) with theta1=0.7, theta2=0.4 — ACF cuts at 2, PACF tails off.
  const d = 1 + 0.7 ** 2 + 0.4 ** 2;
  const maAcf = lags.map((k) =>
    k === 1 ? (0.7 + 0.7 * 0.4) / d : k === 2 ? 0.4 / d : 0.01 * Math.cos(k),
  );
  const maPacf = lags.map((k) => 0.62 * Math.pow(-0.62, k - 1) * Math.pow(0.86, k - 1));

  const cw = 232;
  const ch = 96;
  return figureFrame({
    W,
    H,
    ariaLabel:
      "Four stem plots. For an AR process the autocorrelation tails off while the partial autocorrelation cuts off after lag two; for an MA process the pattern is reversed.",
    caption,
    children: (
      <>
        {stems({ x0: 56, y0: 40, w: cw, h: ch, vals: arAcf, title: "AR(2) — ACF tails off", color: PALETTE.blue })}
        {stems({ x0: 56 + cw + 30, y0: 40, w: cw, h: ch, vals: arPacf, title: "AR(2) — PACF cuts off at 2", color: PALETTE.red, cutoff: 2 })}
        {stems({ x0: 56, y0: 200, w: cw, h: ch, vals: maAcf, title: "MA(2) — ACF cuts off at 2", color: PALETTE.red, cutoff: 2 })}
        {stems({ x0: 56 + cw + 30, y0: 200, w: cw, h: ch, vals: maPacf, title: "MA(2) — PACF tails off", color: PALETTE.blue })}
        <text
          transform={`translate(20 88) rotate(-90)`}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={10.5}
        >
          AR(2)
        </text>
        <text
          transform={`translate(20 248) rotate(-90)`}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={10.5}
        >
          MA(2)
        </text>
        <text x={56} y={H - 10} className="fill-foreground" fontSize={11.3}>
          The rule: whichever plot cuts off names the model, and the lag where it cuts off names the order.
        </text>
      </>
    ),
  });
}

/**
 * The single empirical fact the whole volatility literature is built on:
 * returns are unpredictable, their squares are not.
 */
export function ReturnsVsSquaredAcf({ caption }: { caption?: string }) {
  const W = 560;
  const H = 340;
  const pad = { left: 50, top: 22 };
  const seriesW = W - pad.left - 22;
  const seriesH = 104;

  // GARCH(1,1)-like path: omega, alpha, beta chosen to give alpha+beta = 0.98.
  const n = 420;
  const r = rng(2027);
  const om = 0.02, al = 0.08, be = 0.9;
  let v = om / (1 - al - be);
  const rets: number[] = [];
  for (let i = 0; i < n; i++) {
    const e = gauss(r) * Math.sqrt(v);
    rets.push(e);
    v = om + al * e * e + be * v;
  }
  const mx = Math.max(...rets.map(Math.abs));
  const x = linScale(0, n, pad.left, pad.left + seriesW);
  const y = linScale(-mx, mx, pad.top + seriesH, pad.top);

  // Sample ACFs, computed from the series above rather than drawn by hand.
  function acf(z: number[], L: number) {
    const m = z.reduce((s, q) => s + q, 0) / z.length;
    const c0 = z.reduce((s, q) => s + (q - m) ** 2, 0);
    return Array.from({ length: L }, (_, k) => {
      let c = 0;
      for (let i = k + 1; i < z.length; i++) c += (z[i] - m) * (z[i - k - 1] - m);
      return c / c0;
    });
  }
  const L = 14;
  const aR = acf(rets, L);
  const aS = acf(rets.map((q) => q * q), L);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Top: a simulated return series with visible calm and turbulent stretches. Bottom left: the autocorrelation of returns, essentially zero at every lag. Bottom right: the autocorrelation of squared returns, positive and decaying slowly.",
    caption,
    children: (
      <>
        <text x={pad.left} y={pad.top - 6} className="fill-foreground" fontSize={11.5}>
          Simulated daily returns — quiet stretches and violent stretches cluster
        </text>
        <line
          x1={pad.left}
          x2={pad.left + seriesW}
          y1={y(0)}
          y2={y(0)}
          className="text-border"
          stroke="currentColor"
          strokeWidth={1}
        />
        {rets.map((q, i) => (
          <line
            key={`r${i}`}
            x1={x(i)}
            x2={x(i)}
            y1={y(0)}
            y2={y(q)}
            stroke={Math.abs(q) > 1.4 * Math.sqrt(om / (1 - al - be)) ? PALETTE.red : PALETTE.blue}
            strokeWidth={1}
            opacity={0.85}
          />
        ))}

        {stems({
          x0: pad.left,
          y0: pad.top + seriesH + 52,
          w: 218,
          h: 96,
          vals: aR,
          title: "ACF of returns rₜ — no memory",
          color: PALETTE.blue,
        })}
        {stems({
          x0: pad.left + 248,
          y0: pad.top + seriesH + 52,
          w: 218,
          h: 96,
          vals: aS,
          title: "ACF of squared returns rₜ² — long memory",
          color: PALETTE.red,
        })}

        <text x={pad.left} y={H - 10} className="fill-foreground" fontSize={11.3}>
          Uncorrelated is not independent: the sign is unpredictable while the magnitude is highly predictable.
        </text>
      </>
    ),
  });
}

/**
 * GARCH forecasts revert to the long-run variance geometrically at rate
 * (alpha + beta) per step, which is what the term structure of volatility is.
 */
export function GarchTermStructure({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 22, right: 24, bottom: 48, left: 56 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const persist = 0.98;
  const hs = Array.from({ length: 253 }, (_, i) => i);
  // Current variance is 4x long-run (vol is 2x); forecast reverts geometrically.
  const volRatio = (h: number) => Math.sqrt(1 + Math.pow(persist, h) * 3);

  const x = linScale(0, 252, pad.left, pad.left + plotW);
  const y = linScale(0.9, 2.1, pad.top + plotH, pad.top);
  const hl = Math.log(0.5) / Math.log(persist);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "A curve starting at twice the long-run volatility and decaying toward it over a year, with the half-life of thirty-four days marked.",
    caption,
    children: (
      <>
        {[1.0, 1.25, 1.5, 1.75, 2.0].map((v, i) =>
          yTick({ y: y(v), label: `${v.toFixed(2)}×`, left: pad.left, right: pad.left + plotW, labelX: pad.left - 8, key: i }),
        )}
        <line
          x1={pad.left}
          x2={pad.left + plotW}
          y1={y(1)}
          y2={y(1)}
          stroke={PALETTE.gray}
          strokeWidth={1.4}
          strokeDasharray="5 4"
        />
        <text x={pad.left + plotW - 4} y={y(1) - 7} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          long-run level √(ω/(1−α−β))
        </text>
        <path d={polyPath(hs, volRatio, x, y)} fill="none" stroke={PALETTE.red} strokeWidth={2.6} />

        <line x1={x(hl)} x2={x(hl)} y1={pad.top} y2={pad.top + plotH} stroke={PALETTE.blue} strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={x(hl) + 6} y={pad.top + 16} fill={PALETTE.blue} fontSize={11}>
          variance half-life = ln½ / ln(α+β) ≈ 34 days
        </text>

        {[
          [1, "tomorrow"],
          [22, "1 month"],
          [252, "1 year"],
        ].map(([h, lab], i) => (
          <g key={`m${i}`}>
            <circle cx={x(h as number)} cy={y(volRatio(h as number))} r={4} fill={PALETTE.amber} />
            <text
              x={x(h as number) + 7}
              y={y(volRatio(h as number)) - 7}
              fill={PALETTE.amber}
              fontSize={10.5}
            >
              {lab}: {volRatio(h as number).toFixed(2)}×
            </text>
          </g>
        ))}

        {[0, 60, 120, 180, 240].map((t, i) => xTickLabel({ x: x(t), y: pad.top + plotH + 18, label: `${t}`, key: i }))}
        {axisTitles({ xLabel: "forecast horizon h (trading days)", yLabel: "forecast vol ÷ long-run vol", plotW, plotH, pad, H })}
      </>
    ),
  });
}

/** Standard normal density, used by the two Sharpe figures. */
const phi = (z: number) => Math.exp(-(z * z) / 2) / Math.sqrt(2 * Math.PI);

/**
 * A Sharpe ratio is an estimate with a standard error, and over three years of
 * daily data that error is large enough to swallow most claimed edges.
 */
export function SharpeSamplingError({ caption }: { caption?: string }) {
  const W = 560;
  const H = 300;
  const pad = { top: 22, right: 22, bottom: 48, left: 50 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const years = 3;
  const se = 1 / Math.sqrt(years); // 0.577 for an annual Sharpe over 3 years
  const observed = 1.5;

  const x = linScale(-2.2, 3.4, pad.left, pad.left + plotW);
  const y = linScale(0, 0.42 / se, pad.top + plotH, pad.top);
  const grid = Array.from({ length: 281 }, (_, i) => -2.2 + (5.6 * i) / 280);
  const dens = (v: number) => phi(v / se) / se;

  const areaFrom = observed;
  const tail = grid.filter((v) => v >= areaFrom);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "The sampling distribution of an estimated annual Sharpe ratio when the true Sharpe is zero, over three years of daily data. The observed value of 1.5 sits in the right tail with a t-statistic of 2.6.",
    caption,
    children: (
      <>
        <path d={polyPath(grid, dens, x, y)} fill="none" stroke={PALETTE.blue} strokeWidth={2.4} />
        <path
          d={
            `M${x(areaFrom).toFixed(1)},${y(0).toFixed(1)} ` +
            tail.map((v) => `L${x(v).toFixed(1)},${y(dens(v)).toFixed(1)}`).join(" ") +
            ` L${x(3.4).toFixed(1)},${y(0).toFixed(1)} Z`
          }
          fill={PALETTE.red}
          opacity={0.28}
        />
        <line
          x1={pad.left}
          x2={pad.left + plotW}
          y1={y(0)}
          y2={y(0)}
          className="text-border"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(dens(0))} className="text-foreground" stroke="currentColor" strokeWidth={1.2} strokeDasharray="4 3" />
        <text x={x(0)} y={pad.top + 12} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>
          true Sharpe = 0
        </text>

        <line x1={x(observed)} x2={x(observed)} y1={y(0)} y2={pad.top + 26} stroke={PALETTE.red} strokeWidth={1.8} />
        <text x={x(observed) + 6} y={pad.top + 24} fill={PALETTE.red} fontSize={11.5} fontWeight={600}>
          observed 1.5
        </text>
        <text x={x(observed) + 6} y={pad.top + 40} fill={PALETTE.red} fontSize={11}>
          t = SR√T = 1.5 × √3 = 2.60
        </text>

        {/* the standard error, drawn */}
        <line x1={x(0)} x2={x(se)} y1={y(dens(se))} y2={y(dens(se))} className="text-foreground" stroke="currentColor" strokeWidth={1.4} />
        <text x={x(se / 2)} y={y(dens(se)) - 7} textAnchor="middle" className="fill-foreground" fontSize={11}>
          SE ≈ √(1/T) = 0.58
        </text>

        {[-2, -1, 0, 1, 2, 3].map((t, i) => xTickLabel({ x: x(t), y: pad.top + plotH + 18, label: `${t}`, key: i }))}
        {axisTitles({ xLabel: "estimated annual Sharpe ratio", yLabel: "density", plotW, plotH, pad, H })}
      </>
    ),
  });
}

/**
 * The multiple-testing correction that decides the best-of-200 question: the
 * expected maximum of 200 null Sharpes exceeds the Sharpe actually observed.
 */
export function BestOfNSharpe({ caption }: { caption?: string }) {
  const W = 560;
  const H = 310;
  const pad = { top: 22, right: 22, bottom: 50, left: 50 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  const years = 3;
  const se = 1 / Math.sqrt(years);
  const observed = 1.5;
  // E[max of N standard normals] (Bailey & Lopez de Prado), converted to Sharpe.
  const g = 0.5772156649;
  // Inverse normal CDF, rational approximation (Acklam), enough for labels here.
  function ndtri(p: number) {
    const a = [-3.969683028665376e1, 2.20946098424521e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
    const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
    const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
    const pl = 0.02425;
    if (p > 1 - pl) {
      const q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    const q = p - 0.5, r = q * q;
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const emax = (N: number) => ((1 - g) * ndtri(1 - 1 / N) + g * ndtri(1 - 1 / (N * Math.E))) * se;

  const Ns = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  const x = linScale(0, Ns.length - 1, pad.left, pad.left + plotW);
  const y = linScale(0, 2.4, pad.top + plotH, pad.top);

  return figureFrame({
    W,
    H,
    ariaLabel:
      "The expected best Sharpe ratio from pure noise, rising with the number of strategies tried. At two hundred trials it exceeds the observed Sharpe of 1.5.",
    caption,
    children: (
      <>
        {[0, 0.5, 1, 1.5, 2].map((v, i) =>
          yTick({ y: y(v), label: v.toFixed(1), left: pad.left, right: pad.left + plotW, labelX: pad.left - 8, key: i }),
        )}

        {/* the claimed result */}
        <line x1={pad.left} x2={pad.left + plotW} y1={y(observed)} y2={y(observed)} stroke={PALETTE.red} strokeWidth={1.8} strokeDasharray="5 4" />
        <text x={pad.left + 6} y={y(observed) - 7} fill={PALETTE.red} fontSize={11.5} fontWeight={600}>
          the backtest you were shown: Sharpe 1.5
        </text>

        <path
          d={Ns.map((N, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(emax(N)).toFixed(1)}`).join(" ")}
          fill="none"
          stroke={PALETTE.blue}
          strokeWidth={2.6}
        />
        {Ns.map((N, i) => (
          <circle key={`p${i}`} cx={x(i)} cy={y(emax(N))} r={N === 200 ? 5.2 : 3} fill={N === 200 ? PALETTE.amber : PALETTE.blue} />
        ))}
        {(() => {
          const i = Ns.indexOf(200);
          return (
            <text x={x(i) - 6} y={y(emax(200)) - 10} textAnchor="end" fill={PALETTE.amber} fontSize={11.5} fontWeight={600}>
              N = 200 → expected best from noise = {emax(200).toFixed(2)}
            </text>
          );
        })()}

        {Ns.map((N, i) => xTickLabel({ x: x(i), y: pad.top + plotH + 18, label: `${N}`, key: i }))}
        <text x={pad.left} y={H - 8} className="fill-foreground" fontSize={11.3}>
          Above the dashed line, a Sharpe of 1.5 is worse than what searching that hard produces from nothing.
        </text>
        {axisTitles({ xLabel: "number of strategies tried (log spacing)", yLabel: "expected best Sharpe", plotW, plotH, pad, H })}
      </>
    ),
  });
}

/**
 * Why k-fold leaks on time series, and what purging plus an embargo actually
 * remove. Three stacked schemes on one shared timeline.
 */
export function PurgedKFold({ caption }: { caption?: string }) {
  const W = 560;
  const H = 320;
  const left = 118;
  const right = W - 20;
  const span = right - left;
  const barH = 17;

  type Seg = { a: number; b: number; kind: "train" | "test" | "purge" | "gap" };
  const rows: { label: string; segs: Seg[]; note: string }[] = [
    {
      label: "Plain k-fold",
      segs: [
        { a: 0, b: 0.38, kind: "train" },
        { a: 0.38, b: 0.58, kind: "test" },
        { a: 0.58, b: 1, kind: "train" },
      ],
      note: "Training data sits on both sides of the test fold — the model sees the future.",
    },
    {
      label: "Walk-forward",
      segs: [
        { a: 0, b: 0.38, kind: "train" },
        { a: 0.38, b: 0.58, kind: "test" },
        { a: 0.58, b: 1, kind: "gap" },
      ],
      note: "Only the past trains. Honest, but each fold uses less data than the last.",
    },
    {
      label: "Purged + embargo",
      segs: [
        { a: 0, b: 0.33, kind: "train" },
        { a: 0.33, b: 0.38, kind: "purge" },
        { a: 0.38, b: 0.58, kind: "test" },
        { a: 0.58, b: 0.65, kind: "purge" },
        { a: 0.65, b: 1, kind: "train" },
      ],
      note: "Both sides used, with overlapping labels purged and an embargo after the fold.",
    },
  ];

  const fill = (k: Seg["kind"]) =>
    k === "train" ? PALETTE.blue : k === "test" ? PALETTE.amber : k === "purge" ? PALETTE.red : PALETTE.gray;

  return figureFrame({
    W,
    H,
    ariaLabel:
      "Three cross-validation schemes on one timeline: plain k-fold with training data on both sides of the test fold, walk-forward using only past data, and purged k-fold with red purge and embargo bands separating train from test.",
    caption,
    children: (
      <>
        {rows.map((r, i) => {
          const y0 = 54 + i * 78;
          return (
            <g key={`r${i}`}>
              <text x={left - 10} y={y0 + barH - 4} textAnchor="end" className="fill-foreground" fontSize={11.5} fontWeight={600}>
                {r.label}
              </text>
              {r.segs.map((s, j) => (
                <rect
                  key={`s${j}`}
                  x={left + s.a * span}
                  y={y0}
                  width={(s.b - s.a) * span}
                  height={barH}
                  fill={fill(s.kind)}
                  opacity={s.kind === "gap" ? 0.16 : s.kind === "purge" ? 0.75 : 0.8}
                />
              ))}
              <rect x={left} y={y0} width={span} height={barH} className="text-border" stroke="currentColor" strokeWidth={1} fill="none" />
              <text x={left} y={y0 + barH + 16} className="fill-muted-foreground" fontSize={10.4}>
                {r.note}
              </text>
              {i === 0 && (
                <>
                  <path
                    d={`M${left + 0.7 * span},${y0 + barH + 26} L${left + 0.55 * span},${y0 + barH + 4}`}
                    stroke={PALETTE.red}
                    strokeWidth={1.5}
                    fill="none"
                  />
                  <text x={left + 0.71 * span} y={y0 + barH + 31} fill={PALETTE.red} fontSize={10.4}>
                    leakage
                  </text>
                </>
              )}
            </g>
          );
        })}

        <text x={left - 10} y={34} textAnchor="end" className="fill-muted-foreground" fontSize={11}>
          time →
        </text>
        <g transform={`translate(${left} ${H - 26})`}>
          {[
            ["train", PALETTE.blue],
            ["test fold", PALETTE.amber],
            ["purged / embargoed", PALETTE.red],
            ["unused", PALETTE.gray],
          ].map(([lab, col], i) => (
            <g key={`lg${i}`} transform={`translate(${i * 120} 0)`}>
              <rect x={0} y={-9} width={14} height={11} fill={col as string} opacity={0.8} />
              <text x={19} y={0} className="fill-muted-foreground" fontSize={10.2}>
                {lab as string}
              </text>
            </g>
          ))}
        </g>
      </>
    ),
  });
}
