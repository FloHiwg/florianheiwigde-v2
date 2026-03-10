# Article Outline: Building a German Legal REC/RAG Pipeline From Sparse Public Data

## 1. Working Title Ideas

- From SEO Pages to Legal Retrieval: Building a German Legal Knowledge Pipeline End-to-End
- What We Learned Building a German Legal REC Pipeline With Limited Public Data
- Benchmark vs RAG in German Legal QA: Why an End-to-End Pipeline Matters Even Without Early Lift

## 2. Core Thesis (What This Article Should Say)

- The main challenge is not only model quality, but data availability and data logistics in German legal domains.
- Publicly available legal content (especially high-value commentary and judgments) is limited or fragmented.
- A scalable SEO-first ingestion strategy is a practical foundation to bootstrap a retrieval pipeline.
- Early evaluation did not show clear RAG lift over benchmark, but we now have a full end-to-end cycle that can be tuned.
- This foundation enables the next phase: judgments integration and commentary-knowledge experiments.

## 3. Context and Problem Framing

- Goal: answer German legal questions with retrieval support in an agent workflow.
- Constraint: relevant legal commentary is often behind paywalls, and open datasets are incomplete.
- Constraint: judgments are valuable but harder to ingest and normalize at scale.
- Implication: before “smart” modeling, we need a robust data pipeline that can continuously collect, normalize, retrieve, and evaluate.

## 4. What Was Built (Your Contribution)

- Designed and implemented a full data-to-evaluation pipeline:
- Bronze: source registry, sitemap/search-intent/direct URL/S3 ingestion, crawl, raw extraction.
- Silver: normalization/chunking pipeline for retrieval-ready documents.
- Retrieval: vector/BM25/hybrid retrieval paths.
- Evaluation: benchmark-only and benchmark-vs-RAG runs (CLI + notebook support).
- Operationalized this as a repeatable cycle (from ingest to evaluation), not isolated experiments.
- Cleaned and simplified the repository so the pipeline is easier to run and extend.

## 5. Architecture Narrative for the Reader

- Bronze (data acquisition layer):
- Why SEO direction was chosen first: easiest to scale, low friction to expand source coverage, easy to tweak.
- Ingestion channels used: sitemaps, search-intent URL discovery, direct URLs, and S3 document dropzones.
- Silver (normalization layer):
- Turning raw scraped documents into structured, chunked, retrieval-ready assets.
- Retrieval layer:
- Hybrid retrieval setup as a practical baseline (vector + lexical/BM25).
- Evaluation layer:
- Consistent benchmark-vs-RAG framing to measure whether retrieval actually helps.

## 6. Project Evolution (What Changed Over Time)

- Phase 1: exploratory setup and multiple evaluation directions.
- Phase 2: trying different evaluation methods and discovering weak signal / low differentiation.
- Phase 3: consolidation into one stable end-to-end workflow and cleaner repo structure.
- Current state: benchmark and REC/RAG results are often similar, but the system is now measurable and extensible.

## 7. Evaluation Story (Honest and Specific)

- What was tried:
- Different evaluation methods and execution paths (notebooks and scripted runs).
- Benchmark-only generation vs retrieval-augmented generation.
- What happened:
- Results are currently not very promising; RAG/REC does not yet clearly outperform benchmark.
- Why this is still useful:
- You now have a reproducible baseline and a full loop to test improvements rigorously.
- Why current results are expected:
- Retrieval is not tuned yet.
- Data collection is not tuned yet.
- Corpus composition is still early-stage (limited judgments/commentary coverage).

## 8. Why SEO-First Was the Right First Bet

- It creates a fast path to corpus growth.
- It gives immediate control knobs (source config, crawl cadence, search-intent queries).
- It is operationally scalable and easier to automate than many legal-data alternatives.
- It establishes the ingestion mechanics needed before adding harder sources like judgments and commentary proxies.

## 9. Limits and Open Questions

- Corpus quality/coverage may be the bottleneck, not generation alone.
- Missing judgments likely limits legal depth and case-law grounding.
- Missing paywalled commentary limits practical quality for nuanced legal answers.
- Open question: how much commentary is already latent in foundation models, and when is retrieval still necessary?

## 10. Next Steps Section (Future Work in This Series)

- Judgments track:
- Add judgments as a first-class source type in the ingestion + normalization flow.
- Evaluate impact on answer grounding, citation quality, and difficult legal queries.
- Commentary track:
- Map which commentary is paywalled and what can be legally/technically used in retrieval.
- Design experiments to estimate “model prior knowledge” of commentary vs explicit retrieval context.
- REC/RAG quality track:
- Tune retrieval parameters (`top-k`, alpha, candidate set, reranking strategy).
- Improve document quality controls (dedupe, relevance filtering, structure extraction).
- Improve query generation/search-intent strategy for higher-signal documents.
- Agent-flow track:
- Integrate commentary/judgment-aware retrieval behavior directly in the agent graph.
- Compare answer behavior with and without retrieval at graph-node level.

## 11. Suggested Evidence and Artifacts to Include

- A pipeline diagram (Bronze -> Silver -> Retrieval -> Evaluation).
- A short timeline of project phases and major decisions.
- One table with benchmark vs RAG scores (even if delta is small/flat).
- A failure-analysis table: where retrieval fails today (coverage, ranking, chunk quality).
- One source-coverage table: SEO docs vs judgments vs commentary availability.

## 12. Proposed Section-by-Section Skeleton

1. Introduction: Why German legal QA is a data problem first
2. Initial hypothesis: retrieval should help
3. Building the pipeline foundation end-to-end
4. Why we started with SEO ingestion
5. Evaluation evolution: what we tried and what did not work
6. Current result: limited uplift, but reproducible system
7. Lessons learned
8. Next exploration:
9. Adding judgments
10. Commentary/paywall + model-knowledge experiments
11. Retrieval and pipeline tuning roadmap
12. Conclusion: foundation first, optimization second

## 13. Tone and Positioning Guidance (for drafting later)

- Be explicit about what did not work yet.
- Frame “no clear uplift yet” as a result, not a failure.
- Emphasize engineering value: a repeatable full cycle is now in place.
- Keep claims narrow and evidence-backed.
- End with concrete experiments, not abstract optimism.
