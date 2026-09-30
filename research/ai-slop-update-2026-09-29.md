# Prose audit implementation — 29 September 2026

Addressed all **66 finding groups (AS-001–AS-066)** in the [27 September audit](ai-slop-audit-2026-09-27.md). This pass changes 60 lesson/quiz MDX files, the homepage description and `PLAN.md`. The earlier Transformers, Agents and RAG research additions remain in place.

## Changes

- Removed repeated rapid-fire coaching and unsupported interview-coverage percentages. Preserved every quiz ID, figure/component sequence and rapid-fire question hook in its original order.
- Replaced five AI-assistant deferrals with explicit results, assumptions and source links. Distinguished James–Stein risk dominance from fixed-penalty ridge, stated the multiclass Cover–Hart bound, and supplied the distance-concentration argument with its sample-size condition.
- Replaced generic quiz descriptions with topic-specific copy and removed repeated bibliography process narration.
- Qualified claims about dropout and memorization, training diagnostics, GQA, inference bottlenecks, caching, replay, RAG failure attribution and judge formats. Updated matching questions, model answers and rubrics where needed.
- Scoped statements about uncertainty, bias, forest averaging, backtest interpretation, portfolio estimation and execution costs to their stated assumptions.
- Replaced status claims and invented reader/interviewer reactions with the actual mechanism or diagnostic action.

The original audit JSON/CSV files retain the pre-edit excerpts and hashes as a historical snapshot. This follow-up closes the enumerated findings; it is not a new proof audit of every result in the book.

## Technical sources checked

- [James and Stein (1961), Estimation with Quadratic Loss](https://www.math.tau.ac.il/~yekutiel/eBayes/james_stein_1961.pdf).
- [Cover and Hart (1967), Nearest Neighbor Pattern Classification](https://isl.stanford.edu/~cover/papers/transIT/0021cove.pdf).
- [Beyer et al., When Is “Nearest Neighbor” Meaningful?](https://research.cs.wisc.edu/techreports/1998/TR1377.pdf), technical report underlying the 1999 paper.
- [Liu, Bauer and Manning (2025), Drop Dropout on Single-Epoch Language Model Pretraining](https://arxiv.org/abs/2505.24788).
- [Biderman et al. (2023), Emergent and Predictable Memorization in Large Language Models](https://arxiv.org/abs/2304.11158).

## Verification

- `npm run build`, including TypeScript: passed.
- Targeted ESLint on homepage, MDX renderer and existing research-figure additions: passed.
- All 66 MDX files compiled with the application’s Markdown plugins and strict KaTeX error handling: passed. The final distance-concentration assumption clarification was checked again afterward.
- Local production requests: all 66 lesson/quiz routes and the homepage returned HTTP 200; lesson content and final quiz blocks were present, with no KaTeX error nodes.
- Compared with a snapshot of the working tree taken at the beginning of this pass: all quiz IDs, figure/component sequences and rapid-fire question hooks retained their order.
- Checked all 140 recorded audit occurrences: none of the flagged original passages remain verbatim.
- Safari visual spot-check: the revised distance-concentration prose, citation and displayed inequality rendered at desktop width. This was a spot-check, not a full device/layout sweep.
- `git diff --check`: passed.

This record describes the source changes and local checks completed before commit and deployment. Production deployment status is tracked by the repository’s commit checks.

## Finding coverage

All rows below are addressed. File links point to the current source; the original audit retains the exact pre-edit locations and reasons.

| Finding | Original issue | Source files |
|---|---|---|
| AS-001 | Five deferrals to an AI assistant | [c1.3.mdx](../src/content/c1/c1.3.mdx), [c1.3.quiz.mdx](../src/content/c1/c1.3.quiz.mdx), [c1.8.quiz.mdx](../src/content/c1/c1.8.quiz.mdx), [c1.8.mdx](../src/content/c1/c1.8.mdx) |
| AS-002 | Unsubstantiated interview-value ranking repeated in 26 quizzes | 26 files; [original locations](ai-slop-audit-2026-09-27.md) |
| AS-003 | Timing and frequency preamble repeated in eight quizzes | [c1.1.quiz.mdx](../src/content/c1/c1.1.quiz.mdx), [c1.2.quiz.mdx](../src/content/c1/c1.2.quiz.mdx), [c1.3.quiz.mdx](../src/content/c1/c1.3.quiz.mdx), [c1.5.quiz.mdx](../src/content/c1/c1.5.quiz.mdx), [c1.6.quiz.mdx](../src/content/c1/c1.6.quiz.mdx), [c1.7.quiz.mdx](../src/content/c1/c1.7.quiz.mdx), [c1.8.quiz.mdx](../src/content/c1/c1.8.quiz.mdx), [c1.9.quiz.mdx](../src/content/c1/c1.9.quiz.mdx) |
| AS-004 | Seven quiz descriptions I made indistinguishable in the recent update | [c3.1.quiz.mdx](../src/content/c3/c3.1.quiz.mdx), [c3.2.quiz.mdx](../src/content/c3/c3.2.quiz.mdx), [c3.3.quiz.mdx](../src/content/c3/c3.3.quiz.mdx), [c4.1.quiz.mdx](../src/content/c4/c4.1.quiz.mdx), [c4.2.quiz.mdx](../src/content/c4/c4.2.quiz.mdx), [c5.1.quiz.mdx](../src/content/c5/c5.1.quiz.mdx), [c5.2.quiz.mdx](../src/content/c5/c5.2.quiz.mdx) |
| AS-005 | Seven formulaic quiz introductions from the recent update | [c3.1.quiz.mdx](../src/content/c3/c3.1.quiz.mdx), [c3.2.quiz.mdx](../src/content/c3/c3.2.quiz.mdx), [c3.3.quiz.mdx](../src/content/c3/c3.3.quiz.mdx), [c4.1.quiz.mdx](../src/content/c4/c4.1.quiz.mdx), [c4.2.quiz.mdx](../src/content/c4/c4.2.quiz.mdx), [c5.1.quiz.mdx](../src/content/c5/c5.1.quiz.mdx), [c5.2.quiz.mdx](../src/content/c5/c5.2.quiz.mdx) |
| AS-006 | Seven reference-section goals describe the editorial process | [c3.1.mdx](../src/content/c3/c3.1.mdx), [c3.2.mdx](../src/content/c3/c3.2.mdx), [c3.3.mdx](../src/content/c3/c3.3.mdx), [c4.1.mdx](../src/content/c4/c4.1.mdx), [c4.2.mdx](../src/content/c4/c4.2.mdx), [c5.1.mdx](../src/content/c5/c5.1.mdx), [c5.2.mdx](../src/content/c5/c5.2.mdx) |
| AS-007 | The data-pipeline opening turns a scenario into a population claim | [c1.1.mdx](../src/content/c1/c1.1.mdx) |
| AS-008 | The leakage introduction ranks itself and the field | [c1.1.mdx](../src/content/c1/c1.1.mdx) |
| AS-009 | Readers are portrayed as memorisers before the derivation | [c1.1.mdx](../src/content/c1/c1.1.mdx) |
| AS-010 | Seniority and candidate quality substitute for learning objectives | [c1.1.mdx](../src/content/c1/c1.1.mdx), [c1.2.mdx](../src/content/c1/c1.2.mdx) |
| AS-011 | The losses chapter invents a careless universal reader | [c1.2.mdx](../src/content/c1/c1.2.mdx) |
| AS-012 | A loss-function preference is presented as 'Nobody does' | [c1.2.mdx](../src/content/c1/c1.2.mdx) |
| AS-013 | Calibration is introduced as what everyone skips | [c1.2.mdx](../src/content/c1/c1.2.mdx) |
| AS-014 | The PCA opening promises everything and invents a classroom foil | [c1.5.mdx](../src/content/c1/c1.5.mdx) |
| AS-015 | Bagging and boosting become the only possible fixes | [c1.6.mdx](../src/content/c1/c1.6.mdx) |
| AS-016 | The ensemble summary asks for memorisation and claims top frequency | [c1.6.mdx](../src/content/c1/c1.6.mdx) |
| AS-017 | A mixture-model interpretation is asserted for every clustering algorithm | [c1.7.mdx](../src/content/c1/c1.7.mdx) |
| AS-018 | The universal-approximation section dismisses the theorem's audience | [c2.1.mdx](../src/content/c2/c2.1.mdx) |
| AS-019 | Single-pass pretraining is equated with nothing to memorise | [c2.2.mdx](../src/content/c2/c2.2.mdx), [c2.2.quiz.mdx](../src/content/c2/c2.2.quiz.mdx), [c2.3.mdx](../src/content/c2/c2.3.mdx), [c2.3.quiz.mdx](../src/content/c2/c2.3.quiz.mdx) |
| AS-020 | A debugging order forbids early data inspection | [c2.3.mdx](../src/content/c2/c2.3.mdx) |
| AS-021 | Manual inspection is sold as the honest senior answer | [c2.3.quiz.mdx](../src/content/c2/c2.3.quiz.mdx) |
| AS-022 | A fixed overfitting-fix ladder is declared the answer | [c2.3.quiz.mdx](../src/content/c2/c2.3.quiz.mdx) |
| AS-023 | Failure to fit eight examples rules out capacity by assertion | [c2.3.quiz.mdx](../src/content/c2/c2.3.quiz.mdx) |
| AS-024 | The GQA answer claims every large model uses it | [c3.2.quiz.mdx](../src/content/c3/c3.2.quiz.mdx) |
| AS-025 | A SwiGLU subquestion tests why an answer is satisfying | [c3.2.quiz.mdx](../src/content/c3/c3.2.quiz.mdx) |
| AS-026 | The serving thesis erases compute-sensitive regimes | [c3.3.mdx](../src/content/c3/c3.3.mdx) |
| AS-027 | Caching and batching are declared risk-free; routing wins by assertion | [c3.3.mdx](../src/content/c3/c3.3.mdx), [c3.3.quiz.mdx](../src/content/c3/c3.3.quiz.mdx) |
| AS-028 | Cache monitoring advice ends with 'almost nobody graphs it' | [c3.3.quiz.mdx](../src/content/c3/c3.3.quiz.mdx) |
| AS-029 | Refusing an unnecessary agent is advertised as seniority | [c4.1.quiz.mdx](../src/content/c4/c4.1.quiz.mdx) |
| AS-030 | The ReAct answer caricatures current practice and the reader | [c4.1.quiz.mdx](../src/content/c4/c4.1.quiz.mdx) |
| AS-031 | Agent questions explain what is being graded | [c4.2.quiz.mdx](../src/content/c4/c4.2.quiz.mdx) |
| AS-032 | Agent failures are said to happen mainly before execution | [c4.2.mdx](../src/content/c4/c4.2.mdx), [c4.2.quiz.mdx](../src/content/c4/c4.2.quiz.mdx) |
| AS-033 | Replay is declared the most valuable debugging feature | [c4.2.quiz.mdx](../src/content/c4/c4.2.quiz.mdx) |
| AS-034 | A vector-search failure is called the most common | [c5.1.mdx](../src/content/c5/c5.1.mdx) |
| AS-035 | Chunking evaluation advice is wrapped in grading claims | [c5.1.quiz.mdx](../src/content/c5/c5.1.quiz.mdx) |
| AS-036 | ANN advice tells the reader to stop and implies they lack experience | [c5.1.quiz.mdx](../src/content/c5/c5.1.quiz.mdx) |
| AS-037 | RRF is recommended based on what a reader can say aloud | [c5.1.quiz.mdx](../src/content/c5/c5.1.quiz.mdx) |
| AS-038 | The RAG thesis assigns every failure to exactly one stage | [c5.2.mdx](../src/content/c5/c5.2.mdx) |
| AS-039 | Judge-format guidance dismisses ordinal scores across lessons and quizzes | [c6.1.mdx](../src/content/c6/c6.1.mdx), [c6.2.mdx](../src/content/c6/c6.2.mdx), [c5.2.quiz.mdx](../src/content/c5/c5.2.quiz.mdx) |
| AS-040 | An evaluation is defined solely as a deployment gate | [c6.2.mdx](../src/content/c6/c6.2.mdx) |
| AS-041 | An illustrative failure table is introduced as a real distribution | [c6.2.mdx](../src/content/c6/c6.2.mdx) |
| AS-042 | Using BLEU is treated as proof a practitioner stopped reading | [c6.1.mdx](../src/content/c6/c6.1.mdx) |
| AS-043 | Shadow deployment promises zero user risk | [c6.2.mdx](../src/content/c6/c6.2.mdx) |
| AS-044 | The statistical-rigour opening declares nearly all evals unsound | [c6.3.mdx](../src/content/c6/c6.3.mdx) |
| AS-045 | Nobody is said to care about input distributions | [c6.3.mdx](../src/content/c6/c6.3.mdx) |
| AS-046 | An uncertainty interval becomes a claim that every decision is a coin flip | [c6.3.mdx](../src/content/c6/c6.3.mdx) |
| AS-047 | Four probability techniques are made to cover almost every famous problem | [c7.1.mdx](../src/content/c7/c7.1.mdx) |
| AS-048 | Five distributions supposedly carry almost all quant interviewing | [c7.2.mdx](../src/content/c7/c7.2.mdx) |
| AS-049 | A probability answer warns what an interviewer might think | [c7.1.quiz.mdx](../src/content/c7/c7.1.quiz.mdx) |
| AS-050 | The Kelly question says nobody uses the result | [c7.2.quiz.mdx](../src/content/c7/c7.2.quiz.mdx) |
| AS-051 | Missing an economic explanation proves a statistical result was coincidence | [c8.1.quiz.mdx](../src/content/c8/c8.1.quiz.mdx) |
| AS-052 | A track-record diagnostic is endorsed by dismissing everyone else | [c8.3.mdx](../src/content/c8/c8.3.mdx) |
| AS-053 | Covariance estimation advice insists everyone wants a name and nobody a derivation | [c8.3.quiz.mdx](../src/content/c8/c8.3.quiz.mdx) |
| AS-054 | A backtest is declared evidence only about search, not a strategy | [c8.3.mdx](../src/content/c8/c8.3.mdx) |
| AS-055 | MSE is defended as the loss we always use | [c9.1.quiz.mdx](../src/content/c9/c9.1.quiz.mdx) |
| AS-056 | More data is said to do nothing at all for bias | [c9.2.mdx](../src/content/c9/c9.2.mdx) |
| AS-057 | More forest trees are said never to hurt | [c9.3.mdx](../src/content/c9/c9.3.mdx) |
| AS-058 | Nobody is said to tune the forest parameter | [c9.3.mdx](../src/content/c9/c9.3.mdx) |
| AS-059 | Estimated inputs supposedly invalidate all portfolio theory | [c10.1.mdx](../src/content/c10/c10.1.mdx) |
| AS-060 | Minimum variance is called better than anything else at surviving estimation error | [c10.1.quiz.mdx](../src/content/c10/c10.1.quiz.mdx) |
| AS-061 | The marginal assets are assumed less liquid to force a negative conclusion | [c10.2.quiz.mdx](../src/content/c10/c10.2.quiz.mdx) |
| AS-062 | Nobody is said to audit their own factor model upward | [c10.2.quiz.mdx](../src/content/c10/c10.2.quiz.mdx) |
| AS-063 | Backtests are said never to include impact | [c10.3.mdx](../src/content/c10/c10.3.mdx) |
| AS-064 | Close or midpoint fills are universally called impossible | [c10.3.mdx](../src/content/c10/c10.3.mdx) |
| AS-065 | The landing page promises uniform thirty-minute senior-level reads | [page.tsx](../src/app/page.tsx) |
| AS-066 | The curriculum plan turns an editorial priority into numerical coverage | [PLAN.md](../PLAN.md) |
