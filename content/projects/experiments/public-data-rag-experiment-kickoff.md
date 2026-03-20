---
title: "Building a Public-Data RAG System for German Legal QA"
date: 2026-03-09
draft: false
description: "An engineering case study of my German legal RAG project: building the ingestion, retrieval, and evaluation pipeline end-to-end with public data, measuring the baseline honestly, and outlining the next iteration path."
---

## Introduction

This project started with a practical question:

How far can I get in German legal QA with only publicly available data?

I built this as an end-to-end RAG system, not just a retrieval prototype. The scope includes source discovery, ingestion, normalization, chunking, retrieval, and evaluation. My goal was to understand where quality actually breaks in a hard domain with fragmented public data, not to produce an inflated demo.

Another goal was to design a workflow that is measurable and easy to iterate on. I used a medallion-style structure to separate raw ingestion, structured processing, retrieval, and evaluation so that each layer can be improved independently.

The current benchmark vs RAG deltas are still weak, which is an important result in itself. What this project already demonstrates is the kind of engineering work I want to showcase: building real pipelines around messy data, making tradeoffs explicit, and evaluating systems honestly instead of treating early output as proof.

## Project Snapshot

At a high level, this experiment combines four pieces:

- a public-data ingestion layer built around sitemaps, direct URLs, search-intent discovery, and raw document intake
- a normalization and chunking pipeline that turns mixed legal content into retrieval-ready documents
- a retrieval setup with vector, BM25, and hybrid modes
- an evaluation workflow that compares benchmark-only generation against retrieval-augmented generation across correctness, completeness, structure, and grounding

The current state is promising but still early. The full loop is running end to end, and the system is now structured well enough to make targeted improvements and measure whether they actually help.

## Why This Experiment Exists

The starting hypothesis was simple: retrieval should improve answer quality for legal questions.

The reality is less simple. In German legal domains, high-value data is unevenly accessible:

- A lot of detailed commentary is paywalled.
- Public datasets are fragmented.
- Judgments are hard to get and either paywalled or harshly protected.

That means model choice is only one part of the problem. The bigger constraint is data logistics: sourcing, structuring, retrieval quality, and evaluation discipline.

So I approached the problem from both sides: build the pipeline end-to-end while exploring different evaluation designs and document sourcing strategies.

## What I Built End-to-End

I implemented an end-to-end flow from source discovery and ingestion to benchmark comparison, organized into clear layers.

{{< figure src="/images/legal-rag-pipeline-overview.svg" alt="Overview diagram of the public-data legal RAG pipeline from Bronze to Evaluation" caption="End-to-end structure of the experiment: Bronze discovery/ingestion, Silver normalization/chunking, retrieval, and benchmark comparison." class="blog-post-figure" >}}

### Bronze: Discovery, Ingestion, and Raw Collection

The Bronze layer exists because legal public data is not available through one clean, structured channel. The first design decision was therefore to treat ingestion as a multi-path acquisition problem instead of assuming one canonical feed.

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

{{< figure src="/images/legal-rag-ingestion-stream-fusion.svg" alt="Diagram showing multiple ingestion input streams merging into one unified document pool" caption="Ingestion stream fusion: sitemaps, direct URLs, search-intent discovery, and S3/PDF drops converge through one refresh-aware ingestion layer into a single canonical document pool." class="blog-post-figure" >}}

### Silver: Normalization and Chunking

The Silver layer turns noisy raw text into a retrieval asset. Its job is not just cleanup. It is the point where the corpus becomes structured enough to support ranking, filtering, and later diagnosis.

The current transformation includes:

- normalization
- metadata shaping
- chunk generation

I deliberately put metadata extraction and chunk generation in the same stage because legal retrieval depends heavily on structure. It is not enough to store text embeddings alone. I want the system to know, where possible, which legal paragraphs are mentioned, which keywords characterize the chunk, and which quality issues appeared during parsing.

The main tradeoff here is cost versus coherence. I chose LLM-based semantic chunking instead of naive token windows because legal explanations often break badly when split mechanically. The more coherent chunk boundaries are worth the added cost at this phase because retrieval quality is still a larger bottleneck than processing efficiency.

The next Silver iteration is to tighten chunk and metadata quality. That includes better handling of noisy page structure, stronger paragraph-reference extraction, and more explicit quality flags for weak documents before they distort retrieval results.

### Retrieval Layer

For retrieval, I wanted a baseline that is broad enough to compare approaches without pretending that one method already won. That is why I implemented vector, lexical (BM25), and hybrid retrieval paths instead of optimizing one retrieval mode too early.

This matters in legal QA because lexical overlap still carries real signal for statute names, paragraph references, and recurring legal terminology, while semantic retrieval helps when the query and source use different wording. Hybrid retrieval is the practical compromise, not a theoretical preference.

The current tradeoff is simplicity versus ranking quality. The system can already compare modes and parameters, but ranking is still intentionally basic. I have not yet added the deeper reranking and filtering logic that would be needed to claim retrieval is fully tuned.

The next retrieval work is straightforward: tune `top-k`, tune the hybrid weighting, improve candidate filtering, and introduce reranking once the corpus quality is stable enough that those changes are worth measuring.

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

The most useful current option came from a Hugging Face dataset a former colleague pointed me to: [DomainLLM/gerlayqa-bgb-paraphrased](https://huggingface.co/datasets/DomainLLM/gerlayqa-bgb-paraphrased). It contains a large set of practical legal Q&A pairs across domains, often with law references, and is a better fit for this use case than academic exam-style prompts.

The next evaluation improvement is not mainly about more runs. It is about better benchmark hygiene: reducing leakage risk further, segmenting results by question type, and making failure analysis easier to inspect than a single aggregate score.

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

- which retrieval mode returns the most useful context for legal questions
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

I now have a first stable comparison on a fixed 20-question GerLayQA sample. The benchmark-only setup reached a weighted total of `3.15`. The best RAG configuration was hybrid retrieval with `top_k=6` and `alpha=0.7`, which reached `3.275` for a `+0.125` improvement.

That is not a dramatic jump, but it is enough to show that retrieval can help in this setup when it is tuned carefully. Just turning retrieval on is not sufficient.

Here is the current comparison:

<div class="table-card table-card--results">
  <div class="table-card__header">
    <div class="table-card__eyebrow">GerLayQA sample · 20 questions</div>
    <p class="table-card__summary">
      Best run: <strong>Hybrid (`top_k=6`, `alpha=0.7`)</strong> with a <strong>+0.125</strong> weighted lift over the benchmark.
    </p>
  </div>
  <div class="table-card__scroller">
    <table>
      <thead>
        <tr>
          <th>Setup</th>
          <th>Weighted total</th>
          <th>Delta vs benchmark</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-card__row table-card__row--baseline">
          <td><span class="table-card__setup">Benchmark only</span></td>
          <td><span class="table-card__metric">3.150</span></td>
          <td><span class="delta-pill delta-pill--neutral">0.000</span></td>
        </tr>
        <tr class="table-card__row table-card__row--best">
          <td><span class="table-card__setup">Hybrid (`top_k=6`, `alpha=0.7`)</span></td>
          <td><span class="table-card__metric">3.275</span></td>
          <td><span class="delta-pill delta-pill--positive">+0.125</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">Hybrid (`top_k=4`, `alpha=0.7`)</span></td>
          <td><span class="table-card__metric">3.225</span></td>
          <td><span class="delta-pill delta-pill--positive">+0.075</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">Hybrid (`top_k=8`, `alpha=0.7`)</span></td>
          <td><span class="table-card__metric">3.125</span></td>
          <td><span class="delta-pill delta-pill--negative">-0.025</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">Hybrid (`top_k=6`, `alpha=0.5`)</span></td>
          <td><span class="table-card__metric">3.212</span></td>
          <td><span class="delta-pill delta-pill--positive">+0.062</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">Hybrid (`top_k=6`, `alpha=0.85`)</span></td>
          <td><span class="table-card__metric">3.138</span></td>
          <td><span class="delta-pill delta-pill--negative">-0.012</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">Vector only</span></td>
          <td><span class="table-card__metric">3.087</span></td>
          <td><span class="delta-pill delta-pill--negative">-0.062</span></td>
        </tr>
        <tr class="table-card__row">
          <td><span class="table-card__setup">BM25 only</span></td>
          <td><span class="table-card__metric">3.075</span></td>
          <td><span class="delta-pill delta-pill--negative">-0.075</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

Three things stand out from this result set:

1. **Hybrid retrieval is the only configuration that produced a reliable lift.** Both vector-only and BM25-only runs underperformed the benchmark. That suggests the useful signal is distributed across both lexical and semantic retrieval, and neither one is strong enough alone yet.
2. **More context is not automatically better.** Increasing `top_k` from `6` to `8` pushed the score below the benchmark, which is a strong sign that additional retrieved context introduced noise rather than grounding.
3. **The blend weight matters.** `alpha=0.7` outperformed both `alpha=0.5` and `alpha=0.85`, which suggests the current system benefits from a balanced hybrid merge rather than strongly favoring vector retrieval.

Looking at the dimensions, the best hybrid setup improved correctness, completeness, structure, and grounding at the same time, but only by small margins. That is useful because it suggests the gain is not a scoring artifact concentrated in one dimension.

The practical interpretation is straightforward: retrieval quality matters more than the mere presence of retrieval. The current evidence does not support a broad claim that "RAG beats the benchmark" in this domain by default. It does support the narrower claim that tuned hybrid retrieval can produce a measurable, if still modest, improvement.

## What Is Already Valuable

Even with limited uplift so far, this phase produced durable value:

- A complete and reproducible data-to-evaluation loop now exists.
- Experiment cycles are faster because ingestion, retrieval, and eval are connected.
- The repository and workflow are cleaner and easier to extend.
- I can now isolate bottlenecks instead of guessing where quality breaks.

In other words: I now have a real system, not disconnected notebooks and one-off scripts.

## How This Series Will Be Structured

This kickoff is the first post in a sequence. The next experiments will follow a consistent structure so comparisons stay meaningful.

{{< figure src="/images/legal-rag-experiment-roadmap.svg" alt="Roadmap diagram showing four next experiment tracks for the legal RAG project" caption="Roadmap for the next phase: judgments integration, commentary reproducibility tests, agent workflow optimization, and retrieval tuning." class="blog-post-figure" >}}

### 1. Judgments Track

Goal: integrate judgments as a first-class source type and measure impact on grounding and difficult legal questions.

### 2. Commentary Reproducibility Track

Goal: evaluate how much proprietary commentary current models can already reproduce from pretraining and memorization, and how this can be used safely in the pipeline. I plan to test a dedicated sub-agent that prepares these reconstructed commentary notes and stores them over time as a cached internal reference set.

### 3. Agent Workflow Optimization Track

Goal: evolve the current baseline agent into a multi-tool workflow. The next version should include:

- a commentary sub-agent (as described above)
- a second retrieval pass using metadata filters (for example mentioned legal paragraphs)
- a direct legal-code lookup step for cited paragraphs
- a reviewer loop with a second agent to harden final answers and compare quality with and without RAG

### 4. Retrieval Quality Track

Goal: tune the retrieval stack directly through focused hyperparameter and quality optimization:

- top-k and alpha settings
- candidate generation and reranking
- deduplication and relevance filtering
- chunk and metadata quality

## Final Thought

The core takeaway from this kickoff is straightforward:

I did not prove that public-data RAG out of the box beats the benchmark in this domain right away. I did prove that I can run a full, repeatable RAG cycle and now improve it systematically.

That is the right starting point for the next experiments.
