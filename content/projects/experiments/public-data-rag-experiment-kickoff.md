---
title: "Public Data RAG in German Legal AI: Kickoff, Baseline, and What Comes Next"
date: 2026-03-09
draft: false
description: "A kickoff write-up of my German legal RAG experiment: what I built end-to-end with public data, what worked, what did not, and how the next experiments will be structured."
---

## Introduction

I started a new experiment to answer a practical question:

How far can I get in German legal QA with only publicly available data?

This post is the kickoff. It is not a polished success story. It is a build log of what I have implemented so far, what the baseline results look like, and how I will structure the next rounds of experiments.

Another goal for this project was to deepen my understanding of the medallion architecture and build a full data-to-evaluation pipeline that can be iterated on quickly.

The short version: I now have a full end-to-end RAG pipeline running. The current benchmark vs RAG deltas are still weak. But the system is reproducible, measurable, and ready for targeted iteration.

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

The Bronze layer handles source discovery, intake, and raw extraction. It currently supports multiple entry paths:

- sitemap ingestion
- search-intent URL discovery
- direct URL ingestion
- S3-based document drop flows

I chose this setup because public legal data is scarce, fragmented, and spread across different formats and channels. I wanted an ingestion layer that can handle multiple acquisition paths without major rework.

The fastest first move was to collect trusted, crawlable sources through sitemaps and direct URLs.

Many high-value pages are still paywalled or only partially public, so I also added traditional open sources such as university scripts and student-oriented legal material. A lot of those came as PDFs, which is why the S3 document-drop flow became part of the ingestion layer early.

After these two tracks, I added SEO-driven discovery as a third source expansion strategy. The idea was simple: use Google ranking as a first-pass preselector, then expand coverage through search-intent queries and long-tail keywords. I implemented this with SERP API calls and used returned URLs as ingestion candidates. It scales well, but it also introduces noise, so better filtering and source-vetting logic is part of the next iteration.

Beyond source intake, Bronze also handles the regular crawler lifecycle:

- track the last refresh timestamp per source so recrawls can be scheduled incrementally
- skip unnecessary fetches when a source was refreshed recently or no change is detected
- download source content and clean it into normalized Markdown files
- persist a content hash so changes can be detected quickly and only updated documents move forward

This keeps crawling efficient and makes downstream processing faster because unchanged documents do not need full reprocessing.

{{< figure src="/images/legal-rag-ingestion-stream-fusion.svg" alt="Diagram showing multiple ingestion input streams merging into one unified document pool" caption="Ingestion stream fusion: sitemaps, direct URLs, search-intent discovery, and S3/PDF drops converge through one refresh-aware ingestion layer into a single canonical document pool." class="blog-post-figure" >}}

### Silver: Normalization and Chunking

The Silver layer converts scraped raw material into structured, retrieval-ready documents:

- normalization
- metadata shaping
- chunk generation

This is where noisy web data gets transformed into something usable for retrieval and later analysis.

Another important function of Silver is metadata enrichment for filtering and relevance signals during retrieval. For example, I add general content tags and references to mentioned legal paragraphs where available.

Chunking is done semantically through an LLM-based step. This is more expensive than naive token chunking, but it produces more coherent chunks, which is important for downstream retrieval quality. I run chunking and metadata extraction in one pass to keep processing efficient.

### Retrieval Layer

I set up vector, lexical (BM25), and hybrid retrieval paths. The goal was to establish a practical baseline rather than prematurely overfit one method.

### Evaluation Layer

I added repeatable benchmark workflows to compare:

- benchmark-only generation
- retrieval-augmented generation

Both notebook and scripted execution paths exist, so experiments can be run quickly but still reviewed in detail.

I also push experiments and datasets to LangSmith, which gives me trace-level visibility across runs. This is especially useful for structured benchmark-only vs RAG comparisons, including retrieval and inference details.

I tested different dataset options and evaluation paths:

- Legal blog/forum QA looked promising at first, but collecting high-quality labels and validating correctness at scale was too costly for this phase.
- Law-student exam questions provided clear target answers, but benchmark-only runs reached near-100% performance, a strong sign of leakage or memorization effects from public training data.
- That result reinforced an important follow-up question: how much proprietary legal commentary can models already reproduce without explicit retrieval context? I will tackle this in a separate experiment.

The most useful current option came from a Hugging Face dataset a former colleague pointed me to: [DomainLLM/gerlayqa-bgb-paraphrased](https://huggingface.co/datasets/DomainLLM/gerlayqa-bgb-paraphrased). It contains a large set of practical legal Q&A pairs across domains, often with law references, and is a better fit for this use case than academic exam-style prompts.

## Why I Still Favor the SEO-First Approach

Even though the current results are not yet showing a clear RAG lift, I still consider SEO-first ingestion a valuable strategy for this stage. It gives me a clear growth path and high control over corpus expansion, which matters in a domain where public data is scarce and fragmented.

It is easy to automate, easy to scale, and easy to adjust based on observed relevance. Most importantly, it keeps the ingestion loop aligned with real user-intent queries, which is likely to matter for retrieval quality over time.

## Current Result: No Clear RAG Lift Yet

The current baseline is honest: benchmark and RAG results are often close, and in several runs there is no clear, reliable uplift.

That is not the outcome I ultimately want, but it is still useful.

A flat early result in this setup usually points to one or more of these issues:

- retrieval is not tuned yet
- corpus quality and coverage are still limited
- chunking and ranking quality still need iteration
- evaluation data is still being hardened against leakage

Instead of treating this as failure, I treat it as the first measurable checkpoint.

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
