# Research integration: Transformers, Agents and RAG

Implemented **27 September 2026**, following the [24 September audit](transformers-rag-agents-audit-2026-09-24.md). Sources were reviewed through 26 September. This record describes local source changes; the original audit remains a historical assessment of commit 06f5fe8.

The update changes all seven c3–c5 lessons and their seven quizzes, plus the public-benchmark explanation in c6.1. Each quiz now has twelve worked questions with model answers and rubrics, for 84 total; the existing rapid-fire questions remain. Fourteen accessible, deterministic server-rendered SVG figures illustrate the mechanisms and worked examples.

## Coverage map

The mechanisms, experimental conclusions and limitations below are explained in the lessons, not merely listed in their bibliographies. Inline primary-source links and a cited-reference section make the evidence traceable. All 42 distinct primary-source URLs extracted from the audit are present in c3–c5.

| Research or correction | Implemented explanation | Assessment |
|---|---|---|
| Attention scaling and KV complexity | [c3.1](../src/content/c3/c3.1.mdx), [c3.3](../src/content/c3/c3.3.mdx), corresponding quizzes | Standard deviation versus variance; symmetric scores versus row-softmax probabilities; per-step versus total dense-attention work |
| DeepSeek-V2 / MLA | [c3.2](../src/content/c3/c3.2.mdx), quiz Q9 | Compressed latent plus decoupled positional key; cache derivation; implementation caveats; reported savings tied to the paper's baseline |
| DeepSeek-V3 | c3.2, quiz Q11 | Total versus active weights, sparse routing at large batch, communication, router balancing, FP8 training and multi-token prediction |
| Mamba-2 and Native Sparse Attention | c3.2, quiz Q10 | Fixed recurrent state, remaining hybrid KV growth, native sparsity versus dense-kernel optimization; matched-quality measurements |
| FlashAttention-3 and FlashAttention-4 | c3.2 and c3.3 | Algebraic equivalence versus bitwise identity and low-precision error; Hopper/Blackwell bottlenecks; corrected IO bound |
| Test-time compute and DeepSeek-R1 | c3.3, quiz Q9–Q11 | Difficulty-aware budgets, candidate availability versus verifier selection, R1-Zero versus R1, RL versus prompted planning and distillation |
| Engram and mHC | c3.2, quiz Q12 | Architectural lookup memory versus retrieval/notes; residual connectivity; emerging evidence and first-publication dates |
| September 2026 FP4 attention study | c3.3, quiz Q12 | Amdahl calculation; tested training divergence distinguished from inference and from all possible FP4 designs |
| Wang/Xi agent surveys | [c4.1](../src/content/c4/c4.1.mdx) | Planning, memory, action and perception taxonomy; surveys are synthesis, not demonstrations that every component helps |
| SWE-agent and Agentless | c4.1, quiz Q9–Q10 | Observation/action interface as a variable; simple workflow baselines; matched tools and budgets |
| OSWorld and tau2-bench | c4.1, c4.2 | Visual grounding, execution checks and shared user–agent state; perception, execution and coordination failures separated |
| Recursive Language Models | c4.1, quiz Q12 | External programmatic context access and recursion, with budgets, evidence pointers and decomposition limits |
| Scaling Agent Systems and 2026 diversity study | c4.1, quiz Q11 | Parallelism, context isolation and complementary evidence; dependency chains, correlated answers and coordination overhead |
| tau-bench | [c4.2](../src/content/c4/c4.2.mdx), quiz Q9–Q10 | Environment-state success; pass@k versus pass^k; per-task subset estimates, repeated trials and idempotency |
| AgentDojo | c4.2, quiz Q11 | Clean utility, attack success and defended utility with explicit denominators and adaptive attacks |
| Why Multi-Agent Systems Fail and 2026 Agent Reliability | c4.2, quiz Q12 | First divergence; system design, misalignment and termination; consistency, robustness, predictability and severity |
| Open-ended tool evaluation | c4.2 and its quiz; [c6.1](../src/content/c6/c6.1.mdx) | Broad action spaces remain evaluable through sampled execution checks; public benchmarks can evaluate agent systems, not only base models |
| 2024 RAG survey | [c5.1](../src/content/c5/c5.1.mdx), quiz Q8 | Inference-only, retriever/reranker, generator and policy-training interventions |
| RAPTOR and Lost in the Middle | [c5.2](../src/content/c5/c5.2.mdx) | Citations added; offline abstractions versus query-time synthesis; positional heuristics to revalidate |
| RAGAs and Seven Failure Points | c5.2, existing quiz corrections | Stage attribution; support, correctness, relevance, completeness and citation support; validatable binary/ordinal/pairwise judges |
| Self-RAG, Corrective RAG and Search-R1 | c5.2, quiz Q9 | Learned reflection, corrective evidence actions and RL search policies; authorized sources, budgets and abstention |
| Sufficient Context | c5.2, quiz Q9/Q12 | Sufficiency versus answer faithfulness; aliases; false stops versus actual wrong answers; coverage and selective accuracy |
| RAG versus Long Context / Self-Route | c5.1, c5.2, quiz Q7/Q12 | Empirical quality/cost tradeoff; matched routing comparison; 400× input-only example and tenant-local cache reuse |
| Microsoft GraphRAG, LightRAG and HippoRAG 2 | c5.2, quiz Q10 | Local relation traversal, global community summaries, dual-level retrieval and passage-linked PageRank; distinct costs and objectives |
| GraphRAG evaluation | c5.2, quiz Q10 | Global preference gains do not establish multi-hop correctness; verbosity is a testable confound, not an established explanation |
| RGB and Comprehensive RAG Benchmark | c5.2, quiz Q11 | Noise, rejection, integration, conflicting evidence, dynamism and long-tail slices; two meanings of CRAG distinguished |
| T2-RAGBench and 2026 OCR study | c5.1/c5.2, quizzes | Actual retrieval over text/tables; complete evidence sets; units, dates and structure versus character accuracy |
| AgenticRAGTracer and TREC 2025 RAG Track report | c5.2, quiz Q11 | Per-hop evidence acquisition, premature stopping, excess hops; relevance, completeness and attribution; report year distinguished from track year |

Other corrections include agent token-cost arithmetic, cache-discount assumptions, repair success conditional on detected errors, and the claim that choosing RAG itself guarantees document privacy. Older summaries, tradeoff tables and model answers were updated where they repeated audited errors.

## Evidence limits

The [citation snapshot](citation-evidence-2026-09-24.json) remains unchanged. Its OpenAlex counts are dated observations for selected records, **not an exhaustive global most-cited ranking** or merged cross-version counts. Citation popularity guided coverage; primary papers support the technical claims.

Recent preprints are identified and bounded by their tested settings. Worked cache, latency, accuracy, cost and reliability numbers are illustrative unless expressly attributed. The update does not claim a census of every 2026 publication.

## Validation

- Production build, including TypeScript: passed.
- ESLint on the new figure component and MDX component registration: passed.
- MDX compilation and KaTeX parse checks: all fourteen c3–c5 lesson/quiz files and c6.1 passed.
- Local production requests: all fifteen changed routes returned HTTP 200 with complete expected lesson or quiz content.
- Rendered content: twelve questions per quiz, two accessible figures per c3–c5 lesson, no KaTeX error nodes, and local cross-page anchors resolved.
- Source coverage: all 42 primary-source URLs from the audit are included.
- Whitespace/diff check: passed.

Full browser visual inspection was unavailable: the computer-use service exposed no browser and its native-app connection failed. The SVGs were checked structurally in the rendered HTML; this does not substitute for a browser layout review.
