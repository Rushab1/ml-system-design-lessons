# Curriculum plan

The lesson list and forward plan for this interview-prep course. The authoring standard lives
in `.claude/skills/authoring-lessons/SKILL.md` — including §11 on **figures**, which is a hard
bar. Real interview questions and expected-answer rubrics by company live in
`.claude/skills/interview-questions/SKILL.md`.

**Target.** Tier 1 quant research/trading roles, alongside an AI Product / AI Engineer track.
The quant target sets the calibration bar: derivations *are* asked in quant loops, so rigor on
OLS, PCA, estimators, stationarity and portfolio math is deliberate, not accidental depth.

---

## Status: all ten chapters are written

33 lessons, each with a paired quiz. Content is discovered by directory scan
(`src/lib/lessons.ts`) — there is no manifest to update, just drop files in.

| Ch | Title | Lessons | Track |
|---|---|---|---|
| 1 | Classical ML foundations | 9 | shared |
| 2 | Deep learning foundations | 3 | AI |
| 3 | Transformers | 3 | AI |
| 4 | Agentic AI | 2 | AI |
| 5 | Retrieval-augmented generation | 2 | AI |
| 6 | Evaluation pipelines | 3 | AI |
| 7 | Probability & statistics | 2 | quant |
| 8 | Time series & strategy statistics | 3 | quant |
| 9 | Bias, variance & what makes an estimator good | 3 | quant |
| 10 | Portfolio construction | 3 | quant |

### Chapter 1 — Classical ML foundations

| Lesson | Title | Status |
|---|---|---|
| c1.1 | Data, splits & validation | ✅ |
| c1.2 | Loss functions | ✅ |
| c1.3 | Linear regression | ✅ |
| c1.4 | Logistic regression | ✅ rebuilt to depth |
| c1.5 | PCA & dimensionality reduction | ✅ rebuilt to depth |
| c1.6 | Trees & ensembles | ✅ |
| c1.7 | Unsupervised learning | ✅ |
| c1.8 | SVM, kNN & Naive Bayes | ✅ |
| c1.9 | Evaluation & class imbalance | ✅ |

### Chapters 2–10

| Lesson | Title |
|---|---|
| c2.1 / c2.2 / c2.3 | Neural networks and backpropagation · Training dynamics · Making training work |
| c3.1 / c3.2 / c3.3 | Attention and the transformer block · What changed since the original paper · Inference, serving and cost |
| c4.1 / c4.2 | How agents actually work · Where agents break |
| c5.1 / c5.2 | Retrieval fundamentals · Building a RAG system that works |
| c6.1 / c6.2 / c6.3 | What to measure and how · Building the eval pipeline · Statistical rigor in evals |
| c7.1 / c7.2 | The techniques that solve most problems · Distributions, order statistics and stopping |
| c8.1 / c8.2 / c8.3 | Stationarity and spurious regression · Autocorrelation, ARIMA and volatility · The statistics of a track record |
| c9.1 / c9.2 / c9.3 | What makes an estimator good · The bias-variance decomposition for prediction · Bias and variance across model families |
| c10.1 / c10.2 / c10.3 | Mean-variance, and why it breaks · Factor models and where risk comes from · From backtest to live portfolio |

---

## Rapid-fire ordering convention

**Rapid-fire is the only section actually studied**, so its order carries the triage. Within
every `## Rapid-fire` section the questions are sorted by **interview importance, most important
first**, against this contract:

- **Top 5 = ~80% of that lesson's interview value.** These are the questions a loop opens with.
  They have to be bang on.
- **Top 10 = ~95%+.** Everything past 10 is genuine but lower-frequency depth.

Nothing is deleted to achieve this — the full set stays on the page, reordered. A reader with
one evening does the top 5 per lesson; a reader with a week does all of them.

**When you add a rapid-fire question, insert it at its correct rank** rather than appending to
the end, and renumber. Appending silently breaks the contract, because position *is* the
priority signal.

Related standing rules: 10–20 questions per rapid-fire section (a cap, not a target);
calibrate on interview frequency rather than teaching value; each answerable out loud in
2–5 minutes; self-contained, never referencing the numbered questions above.

---

## Planned work

### c7.3 — Markov chains, martingales and Brownian motion *(not yet written)*

The one genuine coverage gap for a Tier 1 quant loop. Current state, verified by grep:
"Markov chain" appears in **no** lesson; martingales appear only as a shortcut inside c7.1's
gambler's-ruin section; Brownian motion appears only inside c8.1's unit-root discussion. These
are opening questions at Jane Street, Citadel, HRT and Two Sigma, so the gap is squarely on the
critical path.

Build it to the c1.1 / c1.2 depth bar. Coverage it needs:

- **Markov chains.** State space, transition matrix, Chapman–Kolmogorov. Stationary distribution
  as the left eigenvector of $P$ with eigenvalue 1 — connect explicitly to the eigen machinery
  already derived in c1.5, since that link is the sort of thing a quant interviewer probes.
  Irreducibility, aperiodicity, ergodicity. Hitting times and absorption via first-step analysis
  (c7.1 already does this concretely for gambler's ruin — frame that retroactively as the
  Markov-chain method it is). Detailed balance and reversibility.
- **Martingales.** Definition against a filtration; why "fair game" is the wrong one-line gloss.
  The optional stopping theorem with its three separate sufficient conditions, and a worked
  counter-example where it fails (the unbounded doubling strategy). Wald's identity. Martingale
  constructions as the fast route to gambler's-ruin and ballot-type answers — c7.1's "martingale
  shortcut" section is the forward reference to honor.
- **Brownian motion.** Defining properties; scaling and the quadratic-variation result
  $[W]_t = t$, which is the fact that makes Itô calculus behave unusually. Reflection principle
  and the running maximum. First-passage times. Geometric Brownian motion and why log-returns
  rather than returns are the modeled object — this is the bridge into c8.
- **Interview surface.** Expected time to a pattern; ruin probabilities with a drift; "is this
  process a martingale" verification questions; the ant/random-walk family; why a stopped
  martingale is still a martingale.

Cross-links to honor when it lands: c7.1 (first-step analysis, martingale shortcut), c7.2
(stopping, order statistics), c8.1 (random walks, unit roots, spurious regression), c8.3
(track-record statistics), c10.3 (drawdown and first-passage).

### Figures

Every lesson needs **2–4 inline SVG figures minimum** (skill §11), and more is better — the
bar is the whiteboard test: if you would sketch it while teaching, it gets a figure. Chapters
3 through 8 and chapter 10 were written without figures and are being backfilled. See
`src/components/mdx/*-figures.tsx` for the existing set and `figure-helpers.tsx` for the shared
primitives. Figures are server-rendered SVG only: no client JS, no chart library, no
`Math.random` or `new Date()`.

---

## Deliberately not doing

- **Bringing chapters 2–10 quizzes up to the 12-question spec.** Most sit at 6–8 numbered
  questions. Since rapid-fire is the studied surface, ~100 new numbered questions would be
  written onto a page nobody reads. Sharpen rapid-fire instead.
- **A dedicated linear-algebra chapter.** Eigen material already spans a dozen lessons,
  including c1.5's full power-iteration → orthogonal-iteration → QR → Householder → Lanczos
  chain. A separate chapter would duplicate rather than add.

---

## Build notes

- Lessons render at `/c/<chapter>/<lesson>`, quizzes at `/c/<chapter>/<lesson>/quiz`.
- `listLessons` sorts with `localeCompare(..., { numeric: true })`, so `c1.10` would order after
  `c1.9` correctly. No id zero-padding needed.
- **MDX compiles per request.** `npm run build` and a green Vercel deploy both pass on MDX that
  500s when served. Always curl the changed lesson *and* quiz pages for 200 after deploying.
- Escape bare `<`, `>`, `{`, `}` in prose — all four have shipped request-time 500s here.
