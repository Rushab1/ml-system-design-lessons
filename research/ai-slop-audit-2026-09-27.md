# Book prose audit — 27 September 2026

**Implementation follow-up, 29 September:** all 66 finding groups have been addressed in the local working tree. See the [change and verification record](ai-slop-update-2026-09-29.md). The excerpts and assessments below describe the pre-edit snapshot.

**66 actionable finding groups: 30 P1, 35 P2 and 1 P3.** The groups identify 135 distinct locations in the book, plus landing-page and curriculum-plan findings. The dominant problems are unsupported certainty, interview-status coaching and repeated process narration, rather than a few stereotypical AI words.

“AI slop” here means identifiable editorial defects. It is not an inference about who or what wrote a passage. The mathematical derivations, concrete examples and useful diagnostic structure should be preserved.

## Scope and limits

Screened all **66 MDX files: 33 lessons and 33 quizzes across all ten chapters** (407,191 whitespace-delimited tokens, including equations, code and metadata). Reviewed candidate passages in context, chapter openings and recurring quiz/reference boilerplate. Inspected the landing-page copy, PLAN.md and the authoring skill as related material. This is a full-corpus editorial screen with contextual review, not a claim to have line-edited every sentence or re-proved every technical result.

Book text and application code were left unchanged. The CSV and JSON retain exact excerpts, full containing lines, locations and suggested actions. The coverage CSV records every screened file and its SHA-256 snapshot; an unflagged file or paragraph is not a certification that it is flawless.

- **P1 — fix first:** missing source material, unsupported generality, invented premises, or wording that can change what a reader learns. Re-check the technical source when the edit affects a substantive claim.
- **P2 — clear editorial cleanup:** coaching filler, gatekeeping, unsupported popularity/status claims, or generic/repeated copy.
- **P3 — optional tightening:** a house-style choice that adds little in this particular position.

## First edits to make

1. Replace all five “ask an AI assistant” deferrals with scoped statements and sources.
2. Correct the overbroad GQA, RAG failure-attribution and binary-versus-ordinal evaluation claims; these are especially confusing beside the recent research additions.
3. Remove the 26 repeated interview-value claims and the eight repeated timing/frequency preambles.
4. Remove passages about sounding senior, what interviewers secretly want, and what supposedly signals inexperience.
5. Scope technical slogans: “exactly one”, “nobody”, “never”, “zero risk” and “the whole story” should only survive when the surrounding evidence warrants them.
6. Replace the generic quiz metadata/intros I added in the previous update with topic-specific copy.

## Coverage by chapter

| Chapter | Files screened | Distinct flagged locations | Finding groups touching chapter |
|---|---:|---:|---:|
| 1. Classical ML foundations | 18 | 35 | 14 |
| 2. Deep learning foundations | 6 | 12 | 7 |
| 3. Transformers | 6 | 17 | 8 |
| 4. Agentic AI | 4 | 14 | 8 |
| 5. Retrieval-augmented generation | 4 | 12 | 9 |
| 6. Evaluation pipelines | 6 | 16 | 9 |
| 7. Probability and statistics | 4 | 6 | 5 |
| 8. Time series and strategy statistics | 6 | 7 | 5 |
| 9. Bias, variance and estimators | 6 | 7 | 5 |
| 10. Portfolio construction | 6 | 9 | 7 |

A repeated pattern can touch several chapters, so the last column is not additive.

## Detailed findings

### Book-wide patterns

#### AS-001 · P1 · Five deferrals to an AI assistant

**Category:** Unfinished explanation. **Locations:** 5.

- [src/content/c1/c1.3.mdx:517](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.3.mdx:517) — “ask an AI assistant like Claude or ChatGPT”
- [src/content/c1/c1.3.mdx:606](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.3.mdx:606) — “ask an AI for the precise statement”
- [src/content/c1/c1.3.quiz.mdx:145](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.3.quiz.mdx:145) — “ask an AI assistant (Claude or ChatGPT)”
- [src/content/c1/c1.8.quiz.mdx:199](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.8.quiz.mdx:199) — “for the exact statement, ask an AI assistant”
- [src/content/c1/c1.8.mdx:200](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.8.mdx:200) — “for the formal variance-ratio statement, ask an AI assistant”

**Why:** These are instructions to obtain missing explanations elsewhere, embedded where the book should state a result or cite a source. Four also guess what an interviewer will or will not ask. The omissions matter because the surrounding claims depend on theorem conditions.

**Suggested edit:** Replace each deferral with the precise scoped statement and a primary-source or appendix link. Keep proof details optional if necessary; do not substitute an AI prompt for a citation. Verify the James–Stein, nearest-neighbour error-bound and distance-concentration conditions during that edit.

#### AS-002 · P2 · Unsubstantiated interview-value ranking repeated in 26 quizzes

**Category:** Repeated coaching. **Locations:** 26.

> They are ordered by interview importance, most-asked first: the first five carry most of the value and the first ten cover nearly all of it.

Locations: [src/content/c1/c1.1.quiz.mdx:824](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.quiz.mdx:824); [src/content/c1/c1.2.quiz.mdx:949](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.quiz.mdx:949); [src/content/c1/c1.3.quiz.mdx:478](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.3.quiz.mdx:478); [src/content/c1/c1.4.quiz.mdx:445](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.4.quiz.mdx:445); [src/content/c1/c1.5.quiz.mdx:528](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.5.quiz.mdx:528); [src/content/c1/c1.6.quiz.mdx:337](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.6.quiz.mdx:337); [src/content/c1/c1.7.quiz.mdx:323](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.7.quiz.mdx:323); [src/content/c1/c1.8.quiz.mdx:639](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.8.quiz.mdx:639); [src/content/c1/c1.9.quiz.mdx:632](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.9.quiz.mdx:632); [src/content/c10/c10.1.quiz.mdx:383](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.1.quiz.mdx:383); [src/content/c10/c10.2.quiz.mdx:424](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.2.quiz.mdx:424); [src/content/c10/c10.3.quiz.mdx:441](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.3.quiz.mdx:441); [src/content/c2/c2.1.quiz.mdx:336](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.1.quiz.mdx:336); [src/content/c2/c2.2.quiz.mdx:420](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.2.quiz.mdx:420); [src/content/c2/c2.3.quiz.mdx:369](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.quiz.mdx:369); [src/content/c6/c6.1.quiz.mdx:179](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.1.quiz.mdx:179); [src/content/c6/c6.2.quiz.mdx:199](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.quiz.mdx:199); [src/content/c6/c6.3.quiz.mdx:200](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.3.quiz.mdx:200); [src/content/c7/c7.1.quiz.mdx:293](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.1.quiz.mdx:293); [src/content/c7/c7.2.quiz.mdx:306](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.2.quiz.mdx:306); [src/content/c8/c8.1.quiz.mdx:418](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.1.quiz.mdx:418); [src/content/c8/c8.2.quiz.mdx:315](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.2.quiz.mdx:315); [src/content/c8/c8.3.quiz.mdx:314](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.3.quiz.mdx:314); [src/content/c9/c9.1.quiz.mdx:412](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.1.quiz.mdx:412); [src/content/c9/c9.2.quiz.mdx:275](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.2.quiz.mdx:275); [src/content/c9/c9.3.quiz.mdx:277](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.3.quiz.mdx:277).

**Why:** The same sentence claims a measured popularity order and near-complete coverage without giving a measurement basis. Repetition adds no subject knowledge.

**Suggested edit:** Delete the sentence from each quiz. Preserve the intended question order; if the ranking is editorial judgment, that does not need to be advertised as empirical coverage.

#### AS-003 · P2 · Timing and frequency preamble repeated in eight quizzes

**Category:** Repeated coaching. **Locations:** 8.

> Each one should take 2 to 5 minutes to answer out loud. They are chosen for interview frequency, not for theoretical interest.

Locations: [src/content/c1/c1.1.quiz.mdx:823](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.quiz.mdx:823); [src/content/c1/c1.2.quiz.mdx:948](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.quiz.mdx:948); [src/content/c1/c1.3.quiz.mdx:477](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.3.quiz.mdx:477); [src/content/c1/c1.5.quiz.mdx:527](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.5.quiz.mdx:527); [src/content/c1/c1.6.quiz.mdx:336](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.6.quiz.mdx:336); [src/content/c1/c1.7.quiz.mdx:322](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.7.quiz.mdx:322); [src/content/c1/c1.8.quiz.mdx:638](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.8.quiz.mdx:638); [src/content/c1/c1.9.quiz.mdx:631](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.9.quiz.mdx:631).

**Why:** This is study coaching rather than an introduction to the topic. The authoring skill explicitly excludes rapid-fire timing/coaching preambles.

**Suggested edit:** Remove the preamble and begin with the questions. Preserve any genuinely topic-specific scope information separately.

#### AS-004 · P2 · Seven quiz descriptions I made indistinguishable in the recent update

**Category:** Generic metadata. **Locations:** 7.

> description: Twelve worked questions on mechanisms, engineering tradeoffs, research findings and their limits.

Locations: [src/content/c3/c3.1.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.1.quiz.mdx:5); [src/content/c3/c3.2.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.quiz.mdx:5); [src/content/c3/c3.3.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.quiz.mdx:5); [src/content/c4/c4.1.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.1.quiz.mdx:5); [src/content/c4/c4.2.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:5); [src/content/c5/c5.1.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.quiz.mdx:5); [src/content/c5/c5.2.quiz.mdx:5](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.2.quiz.mdx:5).

**Why:** The description could belong to any technical quiz. Reusing it across all seven transformer, agent and RAG quizzes loses useful topic information.

**Suggested edit:** Replace each with a short topic-specific description, such as 'Twelve worked questions on attention shapes, masking, positional information and long-context evidence.'

#### AS-005 · P2 · Seven formulaic quiz introductions from the recent update

**Category:** Generic introduction. **Locations:** 7.

> Twelve worked questions test the mechanisms, arithmetic and evidence limits

Locations: [src/content/c3/c3.1.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.1.quiz.mdx:9); [src/content/c3/c3.2.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.quiz.mdx:9); [src/content/c3/c3.3.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.quiz.mdx:9); [src/content/c4/c4.1.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.1.quiz.mdx:9); [src/content/c4/c4.2.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:9); [src/content/c5/c5.1.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.quiz.mdx:9); [src/content/c5/c5.2.quiz.mdx:9](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.2.quiz.mdx:9).

**Why:** The introductory clause repeats the same generic promise. The following qualification about illustrative numerical scenarios is useful and should not be deleted indiscriminately.

**Suggested edit:** Name what this quiz actually tests, or remove the generic clause when the description already does that. Keep the numerical-scenario qualification where needed.

#### AS-006 · P3 · Seven reference-section goals describe the editorial process

**Category:** Redundant signposting. **Locations:** 7.

> connect the mechanisms to primary sources, with original publication dates distinguished from later revisions.

Locations: [src/content/c3/c3.1.mdx:250](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.1.mdx:250); [src/content/c3/c3.2.mdx:257](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.mdx:257); [src/content/c3/c3.3.mdx:369](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.mdx:369); [src/content/c4/c4.1.mdx:224](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.1.mdx:224); [src/content/c4/c4.2.mdx:287](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.mdx:287); [src/content/c5/c5.1.mdx:271](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.mdx:271); [src/content/c5/c5.2.mdx:369](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.2.mdx:369).

**Why:** The repeated goal tells the reader what a bibliography is doing. Publication dates and revision distinctions are useful; the repeated process narration is optional padding.

**Suggested edit:** Keep the research cutoff and original/revision-date information as a compact reference note. Omit the repeated goal if it adds nothing beyond the references heading. Preserve substantive goal-first teaching elsewhere.

### Chapter 1: Classical ML foundations

#### AS-007 · P1 · The data-pipeline opening turns a scenario into a population claim

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c1/c1.1.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.mdx:12) — “Most ML systems fail in production”

**Why:** An effective hypothetical postmortem is followed by an unsupported statement about why most production ML systems fail.

**Suggested edit:** Label the numerical postmortem as illustrative and say 'A data-pipeline assumption can fail while the modeling code remains unchanged.' Retain the example and the concrete failure mechanism.

#### AS-008 · P2 · The leakage introduction ranks itself and the field

**Category:** Authority and self-promotion. **Locations:** 1.

- [src/content/c1/c1.1.mdx:464](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.mdx:464) — “This is the most important section of the lesson.”

**Why:** The paragraph combines 'most important', 'single most common', an explanation of course design and a claim that nobody owns leakage. Those claims distract from the mechanism.

**Suggested edit:** Start with the definition of leakage and explain how it inflates offline performance. Remove the unsupported superlatives and the book's self-assessment.

#### AS-009 · P2 · Readers are portrayed as memorisers before the derivation

**Category:** Imaginary audience. **Locations:** 1.

- [src/content/c1/c1.1.mdx:650](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.mdx:650) — “Most people can recite "bias-variance tradeoff"”

**Why:** The claimed ignorance of 'most people' does not help explain the decomposition.

**Suggested edit:** Start: 'Add and subtract the mean prediction to derive the bias and variance terms.' Keep the algebra.

#### AS-010 · P2 · Seniority and candidate quality substitute for learning objectives

**Category:** Status coaching. **Locations:** 2.

- [src/content/c1/c1.1.mdx:740](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.1.mdx:740) — “a staff-level answer separates all three.”
- [src/content/c1/c1.2.mdx:725](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.mdx:725) — “This separates strong candidates.”

**Why:** The useful technical criteria already appear before these status judgments.

**Suggested edit:** Delete the status clauses. Say directly that the answer should distinguish the three CV effects, or demonstrate the calibration checks.

#### AS-011 · P2 · The losses chapter invents a careless universal reader

**Category:** Strawman opening. **Locations:** 1.

- [src/content/c1/c1.2.mdx:36](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.mdx:36) — “Open any notebook.”

**Why:** Every course, every notebook and nobody asking about the loss are rhetorical generalisations, not evidence.

**Suggested edit:** Open with the actual problem: a library's default loss need not match the deployment objective.

#### AS-012 · P1 · A loss-function preference is presented as 'Nobody does'

**Category:** Unqualified universal. **Locations:** 1.

- [src/content/c1/c1.2.mdx:439](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.mdx:439) — “Nobody does, for two reasons.”

**Why:** A rationale for preferring one loss does not establish that the other is never used.

**Suggested edit:** State the two optimisation or modelling drawbacks under the stated setup without claiming universal non-use.

#### AS-013 · P2 · Calibration is introduced as what everyone skips

**Category:** Condescending heading. **Locations:** 1.

- [src/content/c1/c1.2.mdx:461](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.2.mdx:461) — “## Calibration: the part everyone skips”

**Why:** The heading asserts reader negligence rather than naming the lesson content.

**Suggested edit:** Use 'Calibration: interpreting predicted probabilities'.

#### AS-014 · P2 · The PCA opening promises everything and invents a classroom foil

**Category:** Overpromised unification. **Locations:** 2.

- [src/content/c1/c1.5.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.5.mdx:12) — “Everything worth knowing follows from that move”
- [src/content/c1/c1.5.mdx:179](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.5.mdx:179) — “The linear algebra course answer is to form the characteristic polynomial”

**Why:** The reconstruction-versus-prediction distinction is useful. 'Everything worth knowing' and 'never computed' overstate what that distinction and the subsequent numerical discussion cover.

**Suggested edit:** State the reconstruction objective and its limitation for predicting a target. Describe practical numerical methods directly, without claiming what every course teaches.

#### AS-015 · P1 · Bagging and boosting become the only possible fixes

**Category:** False exhaustiveness. **Locations:** 1.

- [src/content/c1/c1.6.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.6.mdx:12) — “There are exactly two ways to fix that”

**Why:** The opening's 'exactly two ways' turns a choice of teaching examples into an exhaustive classification.

**Suggested edit:** Say 'This lesson compares two ensemble approaches: bagging and boosting.' Preserve the derivations and state the assumptions behind the bias/variance comparison.

#### AS-016 · P2 · The ensemble summary asks for memorisation and claims top frequency

**Category:** Unsupported interview frequency. **Locations:** 1.

- [src/content/c1/c1.6.mdx:304](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.6.mdx:304) — “This is the single most-asked ensemble idea.”

**Why:** The technical summary can stand without a claim about which interview idea is asked most often.

**Suggested edit:** Replace the coaching with a scoped comparison of bagging and boosting; retain the mechanisms and qualifications.

#### AS-017 · P1 · A mixture-model interpretation is asserted for every clustering algorithm

**Category:** Forced unification. **Locations:** 1.

- [src/content/c1/c1.7.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c1/c1.7.mdx:12) — “Every one of them is **a probabilistic generative model plus a hardening choice**”

**Why:** The opening expands the subsequent k-means/Gaussian-mixture derivation into a claim about all clustering methods.

**Suggested edit:** Limit the thesis to the methods for which the derivation is provided. Introduce other clustering families on their own assumptions.

### Chapter 2: Deep learning foundations

#### AS-018 · P2 · The universal-approximation section dismisses the theorem's audience

**Category:** Dismissive framing. **Locations:** 1.

- [src/content/c2/c2.1.mdx:152](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.1.mdx:152) — “instead of the theorem everyone recites”

**Why:** Saying a theorem is something everyone recites and that it predicts nothing useful is less precise than stating what it does and does not guarantee.

**Suggested edit:** Name the missing guarantees: the section can distinguish existence of a representation from practical width, data and optimisation requirements.

#### AS-019 · P1 · Single-pass pretraining is equated with nothing to memorise

**Category:** Overconfident causal shortcut. **Locations:** 5.

- [src/content/c2/c2.2.mdx:204](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.2.mdx:204) — “With a single pass over a corpus far larger than the parameter count there is nothing to memorize”
- [src/content/c2/c2.2.mdx:240](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.2.mdx:240) — “Single-epoch pretraining on a corpus larger than the parameter count, no”
- [src/content/c2/c2.2.quiz.mdx:360](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.2.quiz.mdx:360) — “There is nothing to memorize, so there is no co-adaptation to break”
- [src/content/c2/c2.3.mdx:58](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.mdx:58) — “With a single pass over a corpus far larger than the parameter count there is nothing to memorize”
- [src/content/c2/c2.3.quiz.mdx:343](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.quiz.mdx:343) — “with one pass over a corpus much larger than the parameter count there is nothing to memorize”

**Why:** A training-recipe observation is given a sweeping causal explanation. Corpus size and epoch count alone do not substantiate the claimed impossibility of memorisation in the prose.

**Suggested edit:** Source the specific pretraining configurations. Separate observed dropout settings from the proposed explanation, and verify the memorisation claim before retaining it.

#### AS-020 · P1 · A debugging order forbids early data inspection

**Category:** Heuristic presented as a rule. **Locations:** 1.

- [src/content/c2/c2.3.mdx:14](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.mdx:14) — “Then, and only then, go read the data pipeline.”

**Why:** The 'then, and only then' wording converts a useful checklist into an unconditional sequence. The company examples and claims about grading need their own provenance.

**Suggested edit:** Present the order as a starting checklist and allow observed symptoms to redirect it. Link reported interview examples or remove the company-specific claims.

#### AS-021 · P2 · Manual inspection is sold as the honest senior answer

**Category:** Status coaching. **Locations:** 1.

- [src/content/c2/c2.3.quiz.mdx:69](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.quiz.mdx:69) — “the honest senior answer includes”

**Why:** Reading examples is a concrete debugging action. Claiming it proves seniority adds no information; fifty is not justified as a universal threshold.

**Suggested edit:** Say 'Inspect a sample of validation documents to check the suspected mismatch.' Specify a sample size only as an example or justified protocol.

#### AS-022 · P1 · A fixed overfitting-fix ladder is declared the answer

**Category:** Unsupported intervention ranking. **Locations:** 1.

- [src/content/c2/c2.3.quiz.mdx:343](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.quiz.mdx:343) — “The ordering is the answer, not the list.”

**Why:** The universal cost/effectiveness ranking is stronger than the scenario supports, even though later sentences provide some qualifications.

**Suggested edit:** Make intervention order depend on data availability, acquisition cost, valid augmentations, observed failure and validation results.

#### AS-023 · P1 · Failure to fit eight examples rules out capacity by assertion

**Category:** Overconfident diagnosis. **Locations:** 1.

- [src/content/c2/c2.3.quiz.mdx:347](/Users/rushab/Projects/life_prep/app/src/content/c2/c2.3.quiz.mdx:347) — “no amount of capacity will help.”

**Why:** A diagnostic exercise becomes a proof of one cause and an unsupported claim about the most common wasted week.

**Suggested edit:** Present failure to overfit as evidence that warrants inspecting the setup, including representational constraints. Remove the prevalence claim and 'no amount' wording.

### Chapter 3: Transformers

#### AS-024 · P1 · The GQA answer claims every large model uses it

**Category:** Unsupported universal and internal tension. **Locations:** 1.

- [src/content/c3/c3.2.quiz.mdx:145](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.quiz.mdx:145) — “every 70B-plus model since Llama 2 uses GQA”

**Why:** The absolute statement is already in tension with the next paragraph's different MLA mechanism. It also claims questions are always asked in one form.

**Suggested edit:** Keep the cache calculation. Describe GQA as one design choice and compare it explicitly with MHA, MQA and MLA; attach model-specific examples to their sources.

#### AS-025 · P2 · A SwiGLU subquestion tests why an answer is satisfying

**Category:** Question about interview performance. **Locations:** 2.

- [src/content/c3/c3.2.quiz.mdx:162](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.quiz.mdx:162) — “Why is this a satisfying interview answer”
- [src/content/c3/c3.2.quiz.mdx:183](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.2.quiz.mdx:183) — “Nobody wants the trivia;”

**Why:** Part (c) and its answer discuss impressing interviewers instead of testing an architectural consequence.

**Suggested edit:** Replace part (c) with a parameter-budget or alignment calculation. Keep the existing derivation; remove the imagined interviewer reaction.

#### AS-026 · P1 · The serving thesis erases compute-sensitive regimes

**Category:** Forced contrast. **Locations:** 1.

- [src/content/c3/c3.3.mdx:11](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.mdx:11) — “memory problem wearing a compute costume”

**Why:** The memory-versus-compute slogan is broader than the chapter's own separate prefill and decode discussion.

**Suggested edit:** Scope the thesis to the workload being analysed: small-batch dense decode is often limited by memory traffic; identify the other regimes before generalising.

#### AS-027 · P1 · Caching and batching are declared risk-free; routing wins by assertion

**Category:** Risk-free and winning-option rhetoric. **Locations:** 3.

- [src/content/c3/c3.3.mdx:301](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.mdx:301) — “at zero quality risk”
- [src/content/c3/c3.3.quiz.mdx:212](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.quiz.mdx:212) — “Continuous batching and prefix caching do that at zero quality risk”
- [src/content/c3/c3.3.quiz.mdx:218](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.quiz.mdx:218) — “flagged as zero-risk”

**Why:** Exact-output semantics, correct implementation and workload-level cost/latency tradeoffs are compressed into a guarantee. 'Easy 80%' is also not established by the scenario.

**Suggested edit:** Explain the conditions under which caching or batching preserve the computation. Mark traffic fractions as illustrative, validate routing quality and compare options on measured workload metrics.

#### AS-028 · P2 · Cache monitoring advice ends with 'almost nobody graphs it'

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c3/c3.3.quiz.mdx:275](/Users/rushab/Projects/life_prep/app/src/content/c3/c3.3.quiz.mdx:275) — “almost nobody graphs it.”

**Why:** The suggested metric is useful without a claim about the behaviour of the field.

**Suggested edit:** Keep 'Alert on prefix-cache hit rate' and the explanation of what the alert would catch. Delete the prevalence claim.

### Chapter 4: Agentic AI

#### AS-029 · P2 · Refusing an unnecessary agent is advertised as seniority

**Category:** Status coaching. **Locations:** 1.

- [src/content/c4/c4.1.quiz.mdx:259](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.1.quiz.mdx:259) — “Interviewers read the refusal as seniority”

**Why:** The engineering choice can be assessed by task structure, failure rate and cost without speculating about an interviewer's status judgment.

**Suggested edit:** Retain the conditions for choosing a simpler workflow. Delete the instruction to say it out loud and the seniority claim.

#### AS-030 · P1 · The ReAct answer caricatures current practice and the reader

**Category:** Gatekeeping and unsupported universal. **Locations:** 1.

- [src/content/c4/c4.1.quiz.mdx:288](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.1.quiz.mdx:288) — “signals you learned agents from a 2023 tutorial.”

**Why:** The paragraph combines 'nobody implements' with an insult about learning from a tutorial. Native tool calling does not, by itself, justify that universal claim.

**Suggested edit:** Explain which parts of ReAct correspond to the implementation being discussed. Distinguish a historical prompting format from a reasoning/action loop without policing what practitioners may call their system.

#### AS-031 · P2 · Agent questions explain what is being graded

**Category:** Imaginary grading criteria. **Locations:** 2.

- [src/content/c4/c4.2.quiz.mdx:96](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:96) — “Saying that second half unprompted is the thing being graded.”
- [src/content/c4/c4.2.quiz.mdx:326](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:326) — “Why is the labeling rule in (a) the thing being graded”

**Why:** A concrete distinction between schema validity and semantic correctness is followed by mind-reading; another subquestion asks about grading rather than diagnosis.

**Suggested edit:** Keep the schema-versus-semantics distinction. Rewrite the subquestion to ask why the first-divergence labeling rule changes the diagnosis.

#### AS-032 · P1 · Agent failures are said to happen mainly before execution

**Category:** Unsupported failure ranking. **Locations:** 3.

- [src/content/c4/c4.2.mdx:187](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.mdx:187) — “the important failure usually happens before execution.”
- [src/content/c4/c4.2.quiz.mdx:356](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:356) — “The line that lands in an interview:”
- [src/content/c4/c4.2.quiz.mdx:370](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:370) — “Says the important failure happens before execution.”

**Why:** The chapter presents several stages of failure but gives no distribution supporting which stage usually matters. The interview slogan obscures that qualification.

**Suggested edit:** Explain that decision logs and execution logs reveal different failures. Avoid ranking their frequency without trace data.

#### AS-033 · P2 · Replay is declared the most valuable debugging feature

**Category:** Unsupported return-on-effort ranking. **Locations:** 1.

- [src/content/c4/c4.2.quiz.mdx:398](/Users/rushab/Projects/life_prep/app/src/content/c4/c4.2.quiz.mdx:398) — “Nothing else on this list buys as much per unit of engineering time.”

**Why:** Replay has concrete benefits, but 'nothing else buys as much' is a universal ranking without a workload or cost comparison.

**Suggested edit:** Keep the replay and run-forking examples. State the limitations and benefit for the illustrated workflow without ranking every possible investment.

### Chapter 5: Retrieval-augmented generation

#### AS-034 · P2 · A vector-search failure is called the most common

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c5/c5.1.mdx:76](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.mdx:76) — “single most common real-world vector-search failure”

**Why:** The causal explanation is useful; its claimed real-world frequency is not established.

**Suggested edit:** Describe it as a failure mode and retain the diagnostic calculation.

#### AS-035 · P2 · Chunking evaluation advice is wrapped in grading claims

**Category:** Imaginary grading and guaranteed score. **Locations:** 1.

- [src/content/c5/c5.1.quiz.mdx:108](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.quiz.mdx:108) — “this is the part being graded”

**Why:** The passage predicts why a question is failed and gives an ungrounded 95% outcome for a poorly constructed eval set.

**Suggested edit:** Keep traffic-derived questions and labelled retrieval evaluation. Explain the leakage risk without invented pass-rate precision or interviewer behaviour.

#### AS-036 · P2 · ANN advice tells the reader to stop and implies they lack experience

**Category:** Gatekeeping. **Locations:** 1.

- [src/content/c5/c5.1.quiz.mdx:140](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.quiz.mdx:140) — “unless you actually owned vector infrastructure.”

**Why:** The tradeoff explanation is useful; the warning about sounding evasive unless one owned infrastructure adds status policing.

**Suggested edit:** State which parameters affect recall, latency and memory. Explain when more implementation detail is relevant to the question.

#### AS-037 · P2 · RRF is recommended based on what a reader can say aloud

**Category:** Performance coaching replaces a decision criterion. **Locations:** 1.

- [src/content/c5/c5.1.quiz.mdx:188](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.1.quiz.mdx:188) — “If you cannot say that out loud, use RRF”

**Why:** The engineering criterion should be availability of reliable tuning data, not the reader's ability to recite a phrase.

**Suggested edit:** Say 'Use a labelled evaluation set to tune weighted fusion; compare RRF as a baseline when score calibration or tuning data is limited.'

#### AS-038 · P1 · The RAG thesis assigns every failure to exactly one stage

**Category:** False exclusivity and unsupported prevalence. **Locations:** 1.

- [src/content/c5/c5.2.mdx:11](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.2.mdx:11) — “a wrong answer was produced by exactly one of them.”

**Why:** A stage-based diagnostic framework is turned into a claim of mutually exclusive causes and fixes. The paragraph also asserts that almost every real defect is retrieval-related without supporting data.

**Suggested edit:** Describe first-failure attribution as a debugging convention. Allow multiple contributing failures and cross-stage remedies; measure the distribution on the target workload.

### Chapter 6: Evaluation pipelines

#### AS-039 · P1 · Judge-format guidance dismisses ordinal scores across lessons and quizzes

**Category:** False definition and internal inconsistency. **Locations:** 7.

> an aggregate "quality score" is not a metric.

Locations: [src/content/c6/c6.1.mdx:34](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.1.mdx:34); [src/content/c6/c6.1.mdx:179](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.1.mdx:179); [src/content/c6/c6.2.mdx:45](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:45); [src/content/c6/c6.2.mdx:19](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:19); [src/content/c6/c6.2.mdx:177](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:177); [src/content/c6/c6.2.mdx:201](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:201); [src/content/c5/c5.2.quiz.mdx:406](/Users/rushab/Projects/life_prep/app/src/content/c5/c5.2.quiz.mdx:406).

**Why:** The prose treats an unanchored 1–5 rating and every possible 1–5 rubric as equivalent. It defines metrics by deployment gates and claims annotators cannot agree. This conflicts with c5.2's more qualified judge-format guidance.

**Suggested edit:** Distinguish an undefined overall-quality score from an anchored rubric. Justify binary checks for the named failure mode and validate whichever judge format is used; retain diagnostic metrics that do not directly gate deployment.

#### AS-040 · P1 · An evaluation is defined solely as a deployment gate

**Category:** Forced definition. **Locations:** 1.

- [src/content/c6/c6.2.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:12) — “it is a dashboard, not an eval.”

**Why:** The catchy dashboard/eval contrast excludes the chapter's own diagnostic and exploratory uses of evaluation.

**Suggested edit:** Say 'For release evaluation, connect measured outcomes to an explicit deployment decision.' Keep the infrastructure requirements without redefining all evaluation.

#### AS-041 · P1 · An illustrative failure table is introduced as a real distribution

**Category:** Unlabelled numerical scenario. **Locations:** 1.

- [src/content/c6/c6.2.mdx:34](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:34) — “A real distribution looks like this:”

**Why:** Exact counts acquire empirical authority through 'A real distribution looks like this' without provenance in the passage.

**Suggested edit:** Label the table as an illustrative sample of 100 traces or cite the dataset and collection method if it is real.

#### AS-042 · P2 · Using BLEU is treated as proof a practitioner stopped reading

**Category:** Gatekeeping. **Locations:** 1.

- [src/content/c6/c6.1.mdx:50](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.1.mdx:50) — “stopped reading the field a decade ago.”

**Why:** The limitations of overlap metrics are the substantive point. A claim about the practitioner's reading history is gratuitous and broader than the task-specific discussion supports.

**Suggested edit:** Keep the paraphrase example and task limitations; remove the judgment about practitioner competence.

#### AS-043 · P1 · Shadow deployment promises zero user risk

**Category:** Risk-free rhetoric. **Locations:** 1.

- [src/content/c6/c6.2.mdx:148](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.2.mdx:148) — “at zero user risk.”

**Why:** Discarding output is one protection, not a complete statement of isolation conditions.

**Suggested edit:** State that users do not see shadow outputs, and specify the assumptions needed to prevent side effects or resource contention from affecting them.

#### AS-044 · P2 · The statistical-rigour opening declares nearly all evals unsound

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c6/c6.3.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.3.mdx:12) — “Almost every eval number you will ever be shown”

**Why:** The confidence-interval example supplies the argument; the book does not need a claim about almost every number the reader will encounter.

**Suggested edit:** Open with the 100-example comparison, explicitly presented as an example, and then derive its uncertainty.

#### AS-045 · P2 · Nobody is said to care about input distributions

**Category:** Dismissive generalisation. **Locations:** 1.

- [src/content/c6/c6.3.mdx:235](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.3.mdx:235) — “nobody cares about the input distribution.”

**Why:** The actual point is that input drift alone does not establish performance degradation. The absolute claim obscures that distinction.

**Suggested edit:** Say 'An input-drift alert does not by itself measure a change in task performance.' Retain the distribution factorisation.

#### AS-046 · P1 · An uncertainty interval becomes a claim that every decision is a coin flip

**Category:** Statistical rhetoric outruns the calculation. **Locations:** 1.

- [src/content/c6/c6.3.mdx:285](/Users/rushab/Projects/life_prep/app/src/content/c6/c6.3.mdx:285) — “a coin flip dressed as data.”

**Why:** A wide confidence interval warrants uncertainty, but the prose asserts a universal decision probability that the shown calculation does not establish.

**Suggested edit:** State the detectable effect and uncertainty for the specified setup. Remove the coin-flip claim and the imagined failure to notice.

### Chapter 7: Probability and statistics

#### AS-047 · P2 · Four probability techniques are made to cover almost every famous problem

**Category:** Overpromised unification. **Locations:** 1.

- [src/content/c7/c7.1.mdx:14](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.1.mdx:14) — “Almost every famous problem you have heard of”

**Why:** The examples motivate a useful selection of methods, not a census of famous probability problems.

**Suggested edit:** Say 'These four techniques solve the examples in this lesson.' Preserve the mapping from each problem to its method.

#### AS-048 · P2 · Five distributions supposedly carry almost all quant interviewing

**Category:** Coverage claim and timing coaching. **Locations:** 1.

- [src/content/c7/c7.2.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.2.mdx:12) — “Five distributions carry almost all of quantitative interviewing:”

**Why:** The opening adds an unsupported coverage claim and a ten-second proficiency target to a useful list of distributions.

**Suggested edit:** Name the five distributions and the processes they model. Remove the coverage and speed claims; bound any shared derivation to its assumptions.

#### AS-049 · P2 · A probability answer warns what an interviewer might think

**Category:** Imaginary interviewer reaction. **Locations:** 1.

- [src/content/c7/c7.1.quiz.mdx:277](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.1.quiz.mdx:277) — “memorized a trick”

**Why:** Method selection and verification are useful; predicting that the interviewer will suspect memorisation is coaching filler.

**Suggested edit:** Keep the comparison of solution methods and the independent check. Remove the performance narration.

#### AS-050 · P2 · The Kelly question says nobody uses the result

**Category:** Universal in a title. **Locations:** 1.

- [src/content/c7/c7.2.quiz.mdx:202](/Users/rushab/Projects/life_prep/app/src/content/c7/c7.2.quiz.mdx:202) — “Kelly, and why nobody bets it.”

**Why:** The subsequent question already gives the substantive subject: reasons to use less than full Kelly.

**Suggested edit:** Use 'Kelly and reasons to scale the allocation down.'

### Chapter 8: Time series and strategy statistics

#### AS-051 · P1 · Missing an economic explanation proves a statistical result was coincidence

**Category:** Evidence replaced by a slogan. **Locations:** 1.

- [src/content/c8/c8.1.quiz.mdx:395](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.1.quiz.mdx:395) — “a passing ADF test was a coincidence with a p-value attached.”

**Why:** Lack of a documented mechanism is a reason to scrutinise a strategy; the sentence jumps from that concern to a conclusive explanation of the observed test result.

**Suggested edit:** Say the absent mechanism weakens the interpretation and warrants out-of-sample and stability checks. Do not claim it proves coincidence.

#### AS-052 · P2 · A track-record diagnostic is endorsed by dismissing everyone else

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c8/c8.3.mdx:104](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.3.mdx:104) — “almost nobody handed a track record runs it.”

**Why:** The autocorrelation check can be justified by its effect on annualisation without asserting that almost nobody runs it.

**Suggested edit:** Retain the calculation and diagnostic; delete the final prevalence claim.

#### AS-053 · P2 · Covariance estimation advice insists everyone wants a name and nobody a derivation

**Category:** Interview mind-reading. **Locations:** 1.

- [src/content/c8/c8.3.quiz.mdx:258](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.3.quiz.mdx:258) — “Nobody asks you to derive it; everybody expects the name.”

**Why:** The surrounding explanation already teaches the methods. The sentence is unsupported and undermines the book's derive-rather-than-recite aim.

**Suggested edit:** Remove the sentence; retain the named methods, objectives and assumptions.

#### AS-054 · P1 · A backtest is declared evidence only about search, not a strategy

**Category:** Forced contrast. **Locations:** 1.

- [src/content/c8/c8.3.mdx:12](/Users/rushab/Projects/life_prep/app/src/content/c8/c8.3.mdx:12) — “a backtest is evidence about a search procedure, not evidence about a strategy.”

**Why:** A real concern about selection is turned into an absolute exclusion, without conditioning on how the backtest was designed or held out.

**Suggested edit:** State how selection and repeated testing affect the interpretation of a backtest. Keep the uncertainty calculation and describe the evaluated procedure.

### Chapter 9: Bias, variance and estimators

#### AS-055 · P1 · MSE is defended as the loss we always use

**Category:** Convenient algebra becomes a universal objective. **Locations:** 1.

- [src/content/c9/c9.1.quiz.mdx:146](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.1.quiz.mdx:146) — “why do we always use MSE”

**Why:** A useful decomposition explains an analytical convenience, not a universal choice of loss.

**Suggested edit:** Say that squared error is used for this analysis because it permits the decomposition; connect application loss to the actual objective.

#### AS-056 · P1 · More data is said to do nothing at all for bias

**Category:** Unqualified conclusion in a summary. **Locations:** 1.

- [src/content/c9/c9.2.mdx:14](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.2.mdx:14) — “more data cures variance and does nothing at all for bias.”

**Why:** The summary omits the dependence on the learning procedure and sample-size regime that a universal statement would require.

**Suggested edit:** Bind the conclusion to the analysed model and assumptions. Ask what changes with sample size instead of presenting a general cure/no-effect split.

#### AS-057 · P1 · More forest trees are said never to hurt

**Category:** Model result presented as a guarantee. **Locations:** 1.

- [src/content/c9/c9.3.mdx:145](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.3.mdx:145) — “more trees never hurt and the only cost is compute.”

**Why:** The variance calculation concerns a stated averaging model. 'Never hurt' can be read as a guarantee for every realised validation outcome or metric.

**Suggested edit:** State the expected averaging result under the model, retain the correlation floor and compute cost, and avoid a universal claim about realised performance.

#### AS-058 · P2 · Nobody is said to tune the forest parameter

**Category:** Unsupported prevalence. **Locations:** 1.

- [src/content/c9/c9.3.mdx:201](/Users/rushab/Projects/life_prep/app/src/content/c9/c9.3.mdx:201) — “and nobody tunes it.”

**Why:** The calculation explains why changing correlation matters. The last clause adds an unsupported observation about practitioner behaviour.

**Suggested edit:** Keep the parameter's role and remove 'nobody tunes it'.

### Chapter 10: Portfolio construction

#### AS-059 · P1 · Estimated inputs supposedly invalidate all portfolio theory

**Category:** Catastrophic framing and unsupported ranking. **Locations:** 1.

- [src/content/c10/c10.1.mdx:14](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.1.mdx:14) — “None of it survives contact with estimated inputs.”

**Why:** The useful instability example is preceded by 'None of it survives' and followed by a universal ranking of fixes. Neither conclusion follows merely from the worked example.

**Suggested edit:** Explain sensitivity to estimation error in the illustrated setup. Compare remedies under stated data, constraints and objectives rather than ranking them universally.

#### AS-060 · P1 · Minimum variance is called better than anything else at surviving estimation error

**Category:** Universal superiority. **Locations:** 1.

- [src/content/c10/c10.1.quiz.mdx:79](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.1.quiz.mdx:79) — “survives estimation error better than anything on the rest of the frontier”

**Why:** Avoiding an expected-return input is a specific benefit. The passage promotes that benefit into an unrestricted comparison with every other portfolio.

**Suggested edit:** Say it avoids direct dependence on estimated expected returns while remaining sensitive to covariance estimates and constraints.

#### AS-061 · P1 · The marginal assets are assumed less liquid to force a negative conclusion

**Category:** Invented scenario properties. **Locations:** 1.

- [src/content/c10/c10.2.quiz.mdx:281](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.2.quiz.mdx:281) — “the second five hundred names are decoration.”

**Why:** The effective-breadth arithmetic does not supply the liquidity and transaction-cost premises introduced afterward.

**Suggested edit:** Keep the marginal breadth calculation. Make the cost conclusion conditional on explicitly supplied trading-cost assumptions.

#### AS-062 · P2 · Nobody is said to audit their own factor model upward

**Category:** Cynical mind-reading. **Locations:** 1.

- [src/content/c10/c10.2.quiz.mdx:334](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.2.quiz.mdx:334) — “nobody audits their own factor set upward.”

**Why:** The omitted-factor risk can be explained without claiming that all practitioners avoid an unflattering audit.

**Suggested edit:** Describe the attribution bias caused by the omission and specify a factor-audit procedure.

#### AS-063 · P1 · Backtests are said never to include impact

**Category:** Universal deficiency claim. **Locations:** 1.

- [src/content/c10/c10.3.mdx:35](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.3.mdx:35) — “This is the part backtests never have.”

**Why:** The lesson needs to explain omitted costs, not define every backtest as omitting them.

**Suggested edit:** Say 'A backtest that omits impact can overstate performance at larger trade sizes.' Then explain the impact model and its assumptions.

#### AS-064 · P1 · Close or midpoint fills are universally called impossible

**Category:** Unqualified implementation claim. **Locations:** 1.

- [src/content/c10/c10.3.mdx:216](/Users/rushab/Projects/life_prep/app/src/content/c10/c10.3.mdx:216) — “a price nobody could have transacted at”

**Why:** The failure example does not specify execution assumptions that justify the categorical claim.

**Suggested edit:** Describe the assumed fill model, order type, spread and participation constraints. Explain why those assumptions are optimistic in the particular example.

### Landing page and upstream guidance

#### AS-065 · P2 · The landing page promises uniform thirty-minute senior-level reads

**Category:** Vague promotion and stale metadata. **Locations:** 2.

- [src/app/page.tsx:51](/Users/rushab/Projects/life_prep/app/src/app/page.tsx:51) — “Staff+ lessons synthesized”
- [src/app/page.tsx:52](/Users/rushab/Projects/life_prep/app/src/app/page.tsx:52) — “lesson is a ~30-minute deep read”

**Why:** The page uses a status label instead of subject matter and makes a uniform reading-time promise that conflicts with the lesson metadata.

**Suggested edit:** Use a concrete subject description and show the individual lesson estimates already supplied by the content, without promising every lesson takes thirty minutes.

#### AS-066 · P2 · The curriculum plan turns an editorial priority into numerical coverage

**Category:** Upstream source of repeated claims. **Locations:** 2.

- [PLAN.md:68](/Users/rushab/Projects/life_prep/app/PLAN.md:68) — “**Top 5 = ~80%”
- [PLAN.md:70](/Users/rushab/Projects/life_prep/app/PLAN.md:70) — “**Top 10 = ~95%+”

**Why:** The 80%/95% claims explain the repeated quiz boilerplate. The stated rapid-fire study preference may be intentional, but it does not establish empirical coverage percentages.

**Suggested edit:** Preserve rapid-fire prioritisation as a workflow preference. Describe the first five/ten as editorial priorities, unless a defined corpus and coverage calculation support the percentages.

## What should stay

- Goal-first explanations, vocabulary primers, worked arithmetic, counterexamples and answer rubrics. These serve explicit learning preferences.
- Interview scenarios that supply real constraints or assessment criteria. Remove imagined reactions and status claims, not the interview-preparation purpose.
- Mathematical absolutes established under stated assumptions. For example, a derived variance identity or a covariance nullspace is not slop because it uses “exactly” or “zero”.
- Helpful analogies and concrete contrasts. The issue is whether the analogy replaces a qualification or is repeated after the mechanism is already clear.
- Research dates, primary-source links and notes distinguishing illustrative arithmetic from reported experimental results.

## Preventing recurrence

The authoring skill already says **“No study-coaching meta-text”** and **“No model answers, and no intro preamble”** for rapid-fire sections. Those rules support the P2 cleanup without changing the book's technical depth. Its one-organising-idea and first-person-experience guidance should be applied with care: a unifying explanation needs a scope boundary, and an anecdote should not imply an actual author experience unless there is one to attribute.

Guidance reviewed: [authoring skill](/Users/rushab/Projects/life_prep/app/.claude/skills/authoring-lessons/SKILL.md) and [curriculum plan](/Users/rushab/Projects/life_prep/app/PLAN.md). The study-order preference in PLAN.md can remain; unsupported numeric coverage claims need not accompany it.

A practical editing rule: delete a sentence if it only tells the reader how impressive, senior, obvious, honest or complete the preceding explanation was. For a universal or ranked claim, state the population and assumptions, cite supporting evidence, or narrow it to the demonstrated example.

## Files

- [Exact locations and editing suggestions, CSV](/Users/rushab/Projects/life_prep/app/research/ai-slop-locations-2026-09-27.csv)
- [Structured findings with full containing lines, JSON](/Users/rushab/Projects/life_prep/app/research/ai-slop-audit-2026-09-27.json)
- [All 66 screened files and snapshot hashes, CSV](/Users/rushab/Projects/life_prep/app/research/ai-slop-coverage-2026-09-27.csv)
