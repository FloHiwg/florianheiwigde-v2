---
title: "Building a Public-Data RAG System End-to-End"
date: 2026-04-17
draft: true
description: "An engineering case study of an end-to-end public-data RAG system: using legal research as the example workflow to showcase ingestion, retrieval, evaluation, and the next iteration path."
---

## Introduction

This project started with a practical question:

How far can I get in a legal research workflow with only publicly available data?

I built this as an end-to-end RAG system, not just a retrieval prototype. The scope includes source discovery, ingestion, normalization, chunking, retrieval, and evaluation. The legal sphere is an example domain here, not the core point of the article. What I want to showcase is the full RAG workflow, the techniques involved, and where quality actually breaks once you move beyond a narrow demo.

I picked legal as the example because I have worked in this sphere for the last five years. That gave me a rough understanding of the data available, the research needs of legal professionals, and the constraints that make this kind of public-data setup interesting to test.

The concrete first legal area is still evolving. I am currently adapting the experiments away from a tenant-law-style example and toward professional legal research questions, and I will add the exact first domain later once that part of the setup is finalized.

Another goal was to design a workflow that is measurable and easy to iterate on. I used a medallion-style structure to separate raw ingestion, structured processing, retrieval, and evaluation so that each layer can be improved independently.

The current benchmark vs RAG deltas are still weak, which is an important result in itself. What this project already demonstrates is the kind of engineering work I want to showcase: building real pipelines around messy data, making tradeoffs explicit, and evaluating systems honestly instead of treating early output as proof.

## Project Snapshot

At a high level, this experiment combines four pieces:

- a public-data ingestion layer built around sitemaps, direct URLs, search-intent discovery, and raw document intake
- a normalization and chunking pipeline that turns mixed legal content into retrieval-ready documents
- a retrieval setup with vector, BM25, and hybrid modes
- an evaluation workflow that compares benchmark-only generation against retrieval-augmented generation across correctness, completeness, structure, and grounding

The current state is promising but still early. The full loop is running end to end, and the system is now structured well enough to make targeted improvements and measure whether they actually help.

<div class="article-demo-cta">
  <div class="article-demo-cta__eyebrow">Interactive demo</div>
  <h3 class="article-demo-cta__title">Open the Legal RAG chat explorer</h3>
  <p class="article-demo-cta__copy">Inspect one saved legal research question across benchmark, vector, BM25, and hybrid retrieval and compare the answer with the quoted evidence trail.</p>
  <a class="article-demo-cta__button" href="/projects/experiments/legal-rag-chat-explorer/">Open retrieval explorer</a>
</div>

## Why This Experiment Exists

The starting hypothesis was simple: retrieval should improve answer quality for a domain with fragmented public knowledge.

I used legal research for professionals as the concrete end-to-end use case because it is a domain I know reasonably well and because it makes the retrieval problem very visible. The exact first legal area will be added later, but the workflow focus is already clear: support research-oriented questions where source quality, grounding, and traceability matter. High-value public data is unevenly accessible:

- A lot of detailed commentary is paywalled.
- Public datasets are fragmented.
- Judgments are hard to get and either paywalled or harshly protected.

That makes it a useful case study for RAG techniques. Model choice is only one part of the problem. The bigger constraint is data logistics: sourcing, structuring, retrieval quality, and evaluation discipline.

So I approached the problem from both sides: build the pipeline end-to-end while exploring different retrieval and evaluation techniques against one realistic example use case.

## What I Built End-to-End

I implemented an end-to-end flow from source discovery and ingestion to benchmark comparison, organized into clear layers.

### Bronze: Discovery, Ingestion, and Raw Collection

The Bronze layer exists because legal public data is not available through one clean, structured channel. The first design decision was therefore to treat ingestion as a multi-path acquisition problem instead of assuming one canonical feed.

{{< legal-rag-bronze-silver-flow >}}

It currently supports multiple entry paths:

- sitemap ingestion
- search-intent URL discovery
- direct URL ingestion
- S3-based document drop flows

I chose this setup because the corpus has to be assembled opportunistically. Some useful sources expose clean sitemaps. Others are only reachable through targeted search queries. Some materials are available only as raw PDFs or manually collected files. A single ingestion strategy would have made corpus growth too brittle.

The first priority was to make source expansion cheap. Sitemaps and direct URLs gave me a reliable base of trusted, crawlable sources. PDF and raw-file intake covered the document types that are common in legal education and public reference material. Search-intent discovery became the scaling mechanism once the initial source pool was in place.

The main tradeoff in Bronze is breadth versus noise. SEO-driven discovery scales well and keeps the corpus closer to real user phrasing, but it also brings in weaker sources and more irrelevant pages. That is acceptable at this stage because I would rather have a pipeline that can grow and then be filtered than a narrow corpus that looks clean but cannot expand.

Beyond source intake, Bronze also handles the regular crawler lifecycle:

- track the last refresh timestamp per source so recrawls can be scheduled incrementally
- skip unnecessary fetches when a source was refreshed recently or no change is detected
- download source content and clean it into normalized Markdown files
- persist a content hash so changes can be detected quickly and only updated documents move forward

That part of the design matters because iteration speed is part of the product here. If ingestion is too expensive or too manual, evaluation loops slow down and retrieval tuning becomes guesswork.

The next Bronze improvements are mostly about source quality control: tighter domain filtering, better source scoring, and stronger rules for deciding which discovered documents are worth carrying into Silver.

### Silver: Normalization and Chunking

The Silver layer turns noisy raw text into a retrieval asset. Its job is not just cleanup. It is the point where the corpus becomes structured enough to support ranking, filtering, and later diagnosis.

The current transformation includes:

- normalization
- metadata shaping
- chunk generation

{{< legal-rag-silver-flow >}}

I deliberately put metadata extraction and chunk generation in the same stage because legal retrieval depends heavily on structure. It is not enough to store text embeddings alone. I want the system to know, where possible, which legal paragraphs are mentioned, which keywords characterize the chunk, and which quality issues appeared during parsing.

The main tradeoff here is cost versus coherence. I chose LLM-based semantic chunking instead of naive token windows because legal explanations often break badly when split mechanically. The more coherent chunk boundaries are worth the added cost at this phase because retrieval quality is still a larger bottleneck than processing efficiency.

The next Silver iteration is to tighten chunk and metadata quality. That includes better handling of noisy page structure, stronger paragraph-reference extraction, and more explicit quality flags for weak documents before they distort retrieval results.

### Retrieval Layer

For retrieval, I wanted a baseline that is broad enough to compare approaches without pretending that one method already won. That is why I implemented vector, lexical (BM25), and hybrid retrieval paths instead of optimizing one retrieval mode too early.

This matters in legal research because lexical overlap still carries real signal for statute names, paragraph references, and recurring legal terminology, while semantic retrieval helps when the query and source use different wording. Hybrid retrieval is the practical compromise, not a theoretical preference.

The current tradeoff is simplicity versus ranking quality. The system can already compare modes and parameters, but ranking is still intentionally basic. I have not yet added the deeper reranking and filtering logic that would be needed to claim retrieval is fully tuned.

The next retrieval work is straightforward: tune `top-k`, tune the hybrid weighting, improve candidate filtering, and introduce reranking once the corpus quality is stable enough that those changes are worth measuring.

{{< legal-rag-retrieval-options >}}

### Evaluation Layer

The evaluation layer is where I wanted the project to be stricter than a normal prototype. A legal AI system is easy to overstate if the benchmark design is weak, so I built evaluation in from the start instead of treating it as documentation after the fact.

I added repeatable workflows to compare:

- benchmark-only generation
- retrieval-augmented generation

Both notebook and scripted execution paths exist. That is deliberate: notebooks are useful for close inspection, while scripted runs are necessary if I want repeated comparisons to stay consistent.

I also push experiments and datasets to LangSmith so runs can be inspected at trace level. That makes it easier to see not just whether RAG won or lost, but where the failure happened: retrieval, generation, or the benchmark setup itself.

The biggest tradeoff in evaluation has been realism versus cleanliness. I tested different dataset options and evaluation paths:

- Legal blog/forum QA looked promising at first, but collecting high-quality labels and validating correctness at scale was too costly for this phase.
- Law-student exam questions provided clear target answers, but benchmark-only runs reached near-100% performance, a strong sign of leakage or memorization effects from public training data.
- That result reinforced an important follow-up question: how much proprietary legal commentary can models already reproduce without explicit retrieval context? I will tackle this in a separate experiment.

The most useful current option came from a Hugging Face datasetit : [DomainLLM/gerlayqa-bgb-paraphrased](https://huggingface.co/datasets/DomainLLM/gerlayqa-bgb-paraphrased). It contains a large set of practical legal Q&A pairs across domains, often with law references, and is a better fit for this use case than academic exam-style prompts.

The next evaluation improvement is not mainly about more runs. It is about better benchmark hygiene: reducing leakage risk further, segmenting results by question type, and making failure analysis easier to inspect than a single aggregate score.

{{< legal-rag-evaluation-options >}}

## How I Measure Progress

One thing I wanted to avoid in this project was vague progress reporting. The pipeline is set up so I can inspect improvement at three levels instead of relying on a single impressionistic demo.

### 1. Corpus and pipeline quality

At the ingestion and normalization level, I care about whether the corpus is actually becoming more useful:

- how many sources and documents are available per ingestion path
- how many documents make it successfully into the normalized Silver layer
- how many chunks contain useful metadata such as keywords or legal paragraph references

These metrics matter because retrieval quality in this domain is heavily constrained by source coverage and document quality long before model choice becomes the main factor.

### 2. Retrieval quality

At the retrieval level, I compare vector, BM25, and hybrid retrieval rather than assuming semantic search is automatically better.

The core questions are:

- which retrieval mode returns the most useful context for legal research questions
- whether hybrid retrieval improves grounding without adding too much noise
- how sensitive the system is to `top-k`, candidate limits, and hybrid weighting
- whether metadata such as paragraph mentions can be used to filter or rerank results more effectively

This is the layer where I expect a lot of the eventual quality lift to come from, so I want the article to show retrieval behavior directly, not just final answer scores.

### 3. Answer quality

At the answer layer, I compare benchmark-only generation against retrieval-augmented generation across four dimensions:

- correctness
- completeness
- structure
- grounding

Those dimensions are scored consistently across runs so I can compare benchmark and RAG outputs on the same task set instead of relying on anecdotal examples.

The evaluation entrypoint is simple enough to rerun with fixed settings, which makes it practical to publish comparable snapshots later:

```bash
python scripts/run_gerlayqa_evaluation.py \
  --include-rag \
  --rag-retrieval-mode hybrid \
  --rag-source-id search_intent_discovery \
  --rag-top-k 6 \
  --rag-alpha 0.7
```

I also log runs to LangSmith so I can inspect traces, retrieved chunks, and answer behavior at the individual-question level when an aggregate score changes.

## Why I Still Favor the SEO-First Approach

Even with only modest gains so far, I still consider SEO-first ingestion a valuable strategy for this stage. It gives me a clear growth path and high control over corpus expansion, which matters in a domain where public data is scarce and fragmented.

It is easy to automate, easy to scale, and easy to adjust based on observed relevance. Most importantly, it keeps the ingestion loop aligned with real user-intent queries, which is likely to matter for retrieval quality over time.

## Current Results: Small But Real RAG Lift

I now have three stable 10-question comparisons on fixed GerLayQA slices: Werkvertrag, Schuldrecht B2B, and GBR. The results diverge enough that averaging them into one number hides the useful story, so I now show them separately instead of squashing them together.

That is still not a dramatic jump overall, but it is enough to show that retrieval can help in this setup when it is tuned carefully. Just turning retrieval on is not sufficient, and the best settings are not equally portable across slices.

Here is the current comparison:

{{< legal-rag-results-tabs >}}

Three things stand out from this split view:

1. **Werkvertrag is where hybrid retrieval currently helps most.** The best run there is hybrid at `k=6` and `alpha=0.7`, with a `+0.335` weighted lift over the benchmark.
2. **Schuldrecht B2B is much flatter.** The best run there is hybrid at `k=8` and `alpha=0.7`, but the gain is only `+0.040`, and several nearby settings regress below the benchmark.
3. **GBR shifts the picture again.** Its best run is `vector only` at `+0.120`, which suggests the best retrieval mode is still slice-specific rather than stable across the whole benchmark.

Looking at the dimensions, Werkvertrag improves across correctness, completeness, normalized precision, structure, and grounding. Schuldrecht B2B is much more mixed: its best run improves correctness, completeness, and normalized precision slightly, keeps structure flat, and gives back a bit of grounding. GBR sits in between: the best vector run improves correctness, completeness, and normalized precision, keeps structure flat, and sacrifices a bit of grounding.

The practical interpretation is straightforward: retrieval quality matters more than the mere presence of retrieval. The current evidence does not support a broad claim that "RAG beats the benchmark" in this domain by default. It does support the narrower claim that tuned hybrid retrieval can produce a measurable, if still modest, improvement.

## What Is Already Valuable

Even with limited uplift so far, this phase produced durable value:

- A complete and reproducible data-to-evaluation loop now exists.
- Experiment cycles are faster because ingestion, retrieval, and eval are connected.
- The repository and workflow are cleaner and easier to extend.
- I can now isolate bottlenecks instead of guessing where quality breaks.

In other words: I now have a real system, not disconnected notebooks and one-off scripts.

## What Are The Next Steps

This kickoff established the baseline. The next work is straightforward and can now be tracked as a concrete todo list for the next iteration of the end-to-end RAG setup.

<div class="next-steps-checklist">
  <div class="next-step-card">
    <span class="next-step-box" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Integrate judgments</strong> as a first-class source type and measure their impact on grounding and harder legal research questions.
    </div>
  </div>
  <div class="next-step-card">
    <span class="next-step-box" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Test commentary reproducibility</strong> to evaluate how much proprietary commentary current models can already reproduce from pretraining and memorization, and how that can be used safely in the pipeline.
    </div>
  </div>
  <div class="next-step-card">
    <span class="next-step-box" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Build a stronger agent workflow</strong>: add a commentary sub-agent, a second retrieval pass using metadata filters, a direct legal-code lookup step for cited paragraphs, and a reviewer loop to compare answer quality with and without RAG.
    </div>
  </div>
  <div class="next-step-card">
    <span class="next-step-box" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Tune retrieval quality</strong>: focus on top-k and alpha settings, candidate generation and reranking, deduplication and relevance filtering, and chunk / metadata quality.
    </div>
  </div>
  <div class="next-step-card">
    <span class="next-step-box" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Explore reranking more explicitly</strong>: compare lightweight and stronger reranking approaches after initial retrieval to see whether candidate ordering, grounding, and final answer quality improve measurably.
    </div>
  </div>
</div>

## Final Thought

The core takeaway from this kickoff is straightforward:

I did not prove that public-data RAG out of the box beats the benchmark right away. I did prove that I can run a full, repeatable RAG cycle on a realistic end-to-end use case and now improve it systematically.

That is the right starting point for the next experiments.
