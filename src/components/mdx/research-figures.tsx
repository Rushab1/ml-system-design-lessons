import { figureFrame, PALETTE } from "./figure-helpers";

type FlowSpec = {
  title: string;
  steps: readonly (readonly [string, string, string])[];
  note: string;
  caption: string;
};

const flows = {
  attention: {
    title: "Attention: match addresses, then read payloads",
    steps: [
      ["Project", "X → Q, K, V", "separate learned maps"],
      ["Score", "QKᵀ / √d", "mask future positions"],
      ["Normalize", "row-wise softmax", "one distribution / query"],
      ["Read", "weighted sum of V", "one output / query"],
    ],
    note: "Scaling controls logit spread; the causal mask controls which positions are visible.",
    caption: "The matching calculation uses Q and K; the information returned comes from V.",
  },
  architectures: {
    title: "Four ways to carry information from the past",
    steps: [
      ["Dense attention", "past K/V → query", "direct token access"],
      ["MLA", "past latents → query", "compressed token cache"],
      ["Sparse attention", "selected blocks → query", "selection + local window"],
      ["Recurrent SSM", "state + token → state", "fixed-size history state"],
    ],
    note: "These are alternatives, not stages. A hybrid combines mechanisms across layers.",
    caption: "Dense kernels, compressed representations, sparse selection and recurrent state change different costs.",
  },
  agent: {
    title: "The model proposes; the runtime controls execution",
    steps: [
      ["Observe", "task + current state", "bounded tool results"],
      ["Propose", "model selects action", "or signals completion"],
      ["Validate / execute", "permissions + schema", "budgets + idempotency"],
      ["Check", "record resulting state", "continue or terminate"],
    ],
    note: "Continue → updated observations. Terminate → checked outcome or explicit budget failure.",
    caption: "A final message is a proposed stopping point; the runtime owns limits and outcome checks.",
  },
  execution: {
    title: "A refund is evaluated in the environment",
    steps: [
      ["Reset fixture", "tenant + order + ledger", "known initial state"],
      ["Run task", "record calls and results", "inject commit timeout"],
      ["Check state", "one refund: 2,999¢", "other tenant unchanged"],
      ["Repeat", "fresh fixture each trial", "success + violations"],
    ],
    note: "A persuasive completion message cannot replace ledger and permission assertions.",
    caption: "Execution checks verify effects; repeated trials reveal whether those effects are reliable.",
  },
  retrieval: {
    title: "A retrieval system has multiple evidence-loss points",
    steps: [
      ["Preserve", "parse + chunk + metadata", "units, dates and ACLs"],
      ["Find", "sparse + dense candidates", "authorized evidence"],
      ["Select", "rerank + assemble", "budget + deduplication"],
      ["Answer", "use and cite evidence", "check support"],
    ],
    note: "Inspect the earliest stage that lost required evidence before changing the generator.",
    caption: "Good generation cannot recover a table header that never survived ingestion.",
  },
  ragTraining: {
    title: "Training can intervene at different places",
    steps: [
      ["Retriever", "query ↔ evidence pairs", "improve candidates"],
      ["Reranker", "relevance + hard negatives", "improve ordering"],
      ["Generator", "evidence → answer", "improve evidence use"],
      ["Policy", "search / stop trajectories", "improve decisions"],
    ],
    note: "Independent intervention choices: hold other components and the evaluation split fixed.",
    caption: "RAG is an architecture and training problem, as well as an inference pipeline.",
  },
  ragControl: {
    title: "Evidence control: the gate chooses the next action",
    steps: [
      ["Need evidence?", "task + source requirements", "search only if useful"],
      ["Retrieve / inspect", "authorized source", "record evidence spans"],
      ["Sufficient?", "covers required facts?", "not just topical overlap"],
      ["Choose branch", "answer / refine / clarify", "or abstain at budget"],
    ],
    note: "Refine → a changed query or permitted source. Repeating the same failed search is not repair.",
    caption: "A learned policy or an engineered controller still needs support checks and a stopping budget.",
  },
  evidence: {
    title: "A correct number needs the complete evidence set",
    steps: [
      ["Table", "2025: 4,200", "2024: 3,500"],
      ["Header", "USD thousands", "preserve column years"],
      ["Compute", "(4,200 − 3,500) × 1,000", "USD 700,000 increase"],
      ["Verify", "cite values AND units", "check requested coverage"],
    ],
    note: "Illustrative example: exact digits alone do not establish the correct scale or year.",
    caption: "Trace evidence acquisition per hop; measure numerical correctness and citation support separately.",
  },
} satisfies Record<string, FlowSpec>;

export function ResearchFlow({ variant }: { variant: keyof typeof flows }) {
  const spec = flows[variant];
  const alternatives = variant === "architectures" || variant === "ragTraining";
  return figureFrame({
    W: 840,
    H: 204,
    ariaLabel: `${spec.title}. ${spec.steps.map((s) => s.join(": ")).join(". ")}. ${spec.note}`,
    caption: spec.caption,
    children: (
      <>
        <text x={20} y={27} fontSize={18} fontWeight={600} className="fill-foreground">{spec.title}</text>
        {spec.steps.map(([title, line1, line2], i) => (
          <g key={title} transform={`translate(${20 + i * 205}, 50)`}>
            <rect width={185} height={98} rx={8} fill="none" stroke="currentColor" className="text-border" />
            <rect width={4} height={64} x={0} y={17} rx={2} fill={PALETTE.blue} />
            <text x={12} y={25} fontSize={15} fontWeight={600} className="fill-foreground">{title}</text>
            <text x={12} y={51} fontSize={12} className="fill-foreground">{line1}</text>
            <text x={12} y={75} fontSize={12} className="fill-muted-foreground">{line2}</text>
            {!alternatives && i < 3 ? <text x={191} y={55} fontSize={16} className="fill-muted-foreground">→</text> : null}
          </g>
        ))}
        <text x={20} y={180} fontSize={12} className="fill-muted-foreground">{spec.note}</text>
      </>
    ),
  });
}

type BarSpec = {
  title: string;
  max: number;
  unit: string;
  rows: readonly (readonly [string, number])[];
  caption: string;
};

const bars = {
  decode: {
    title: "Doubling the prefix: per-step attention work",
    max: 4, unit: "×",
    rows: [["Recompute: n", 1], ["Recompute: 2n", 4], ["Cached: n", 1], ["Cached: 2n", 2]],
    caption: "Each method is normalized to its own n-token baseline. Recomputing dense attention scales quadratically per step; cached attention scales linearly. These are scaling proxies, not measured FLOPs.",
  },
  cache: {
    title: "Illustrative cache: 80 layers, 100K tokens, batch 1, 2-byte elements",
    max: 275, unit: " GB",
    rows: [["MHA: 64 heads", 262.144], ["GQA: 8 KV heads", 32.768], ["MQA: 1 KV head", 4.096], ["MLA: 512 + 64 dims", 9.216]],
    caption: "Decimal GB; ideal retained tensors only. MLA uses chosen latent/RoPE dimensions. This compares memory formulas, not quality-matched deployed models.",
  },
  precision: {
    title: "Amdahl example: halve the attention time",
    max: 100, unit: " time units",
    rows: [["Before: 70 + 30", 100], ["After: 70 + 15", 85]],
    caption: "Attention is 30% of the initial request time. A 2× attention speedup saves 15% of total time, giving 1.18× overall speedup if other work stays fixed.",
  },
  compute: {
    title: "Illustrative success at the same mean compute budget",
    max: 100, unit: "%",
    rows: [["Uniform: 2 units/task", 75], ["Adaptive: 1 easy, 3 hard", 80]],
    caption: "A 50/50 easy/hard workload averages 2 units in both cases. The adaptive result assumes a perfect difficulty router and the lesson’s hypothetical response curves.",
  },
  parallel: {
    title: "Four 4-second subtasks: dependencies set the latency floor",
    max: 20, unit: " s",
    rows: [["Serial execution", 16], ["Independent + combine", 6], ["Dependent + combine", 18]],
    caption: "Illustrative critical-path times with 2 seconds of coordination. Parallelism reduces latency only for independent work; it does not remove token costs.",
  },
  consistency: {
    title: "80% per-run success can mean very different five-run scores",
    max: 100, unit: "%",
    rows: [["One run", 80], ["At least one of five", 99.968], ["All five", 32.768]],
    caption: "Illustrative independent trials on an identical task: pass@5 = 1 − 0.2⁵; pass⁵ = 0.8⁵. Real evaluations should estimate and average these per task.",
  },
} satisfies Record<string, BarSpec>;

export function ResearchBars({ variant }: { variant: keyof typeof bars }) {
  const spec = bars[variant];
  const height = 85 + 48 * spec.rows.length;
  return figureFrame({
    W: 840,
    H: height,
    ariaLabel: `${spec.title}. ${spec.rows.map(([label, value]) => `${label}: ${value}${spec.unit}`).join(". ")}`,
    caption: spec.caption,
    children: (
      <>
        <text x={20} y={27} fontSize={17} fontWeight={600} className="fill-foreground">{spec.title}</text>
        {spec.rows.map(([label, value], i) => (
          <g key={label} transform={`translate(0, ${53 + 48 * i})`}>
            <text x={20} y={20} fontSize={14} className="fill-foreground">{label}</text>
            <rect x={240} width={450 * value / spec.max} height={29} rx={3} fill={i % 2 === 0 ? PALETTE.blue : PALETTE.green} />
            <text x={705} y={20} fontSize={14} className="fill-foreground">{value}{spec.unit}</text>
          </g>
        ))}
        <line x1={240} x2={690} y1={height - 26} y2={height - 26} stroke="currentColor" className="text-border" />
        <text x={240} y={height - 7} fontSize={12} className="fill-muted-foreground">0</text>
        <text x={690} y={height - 7} textAnchor="end" fontSize={12} className="fill-muted-foreground">{spec.max}{spec.unit}</text>
      </>
    ),
  });
}
