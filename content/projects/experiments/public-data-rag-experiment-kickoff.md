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

The short version: I now have a full end-to-end RAG pipeline running. The current benchmark vs RAG deltas are still weak. But the system is reproducible, measurable, and ready for targeted iteration.

## Why This Experiment Exists

The starting hypothesis was simple: retrieval should improve answer quality for legal questions.

The reality is less simple. In German legal domains, high-value data is unevenly accessible:

- A lot of detailed commentary is paywalled.
- Public datasets are fragmented.
- Judgments are hard to get and either paywalled or harshly protected.

That means model choice is only one part of the problem. The bigger constraint is data logistics: sourcing, structuring, retrieval quality, and evaluation discipline.

So I decided to treat this as an engineering problem first and built the pipeline before chasing model tuning.

## What I Built End-to-End

I implemented an end-to-end flow from source ingestion to benchmark comparison, organized into clear layers.

### Bronze: Ingestion and Raw Collection

The Bronze layer handles source intake and raw extraction. It currently supports multiple entry paths:

- sitemap ingestion
- search-intent URL discovery
- direct URL ingestion
- S3-based document drop flows

I chose this because I need to use what I can get and the data is in different formats and can be obtained on different ways. 
I first tried to find blogs and pages with a lot of informnation from trusted sources added their sitemaps and checked if they allow crawling in general and if they have a lot of content. This was the fastest way to get a large volume of data and also to have control over source growth. I can easily add more sources by adding their sitemaps or finding more URLs.

But a lot of the pages are paywalled or just have a fraction of data publicly available and another part behind a sign up wall where you need to confirm based on their ToS that you want use the data for things like the things i want to do with this experiment.

So as a next step i looked for publilcly availabnle and more traditional sources of legal data like unioversityt scripts and informantion for students. I found some sources that have a lot of content and are not behind paywalls. I added these mostly via PDFs and thjerefore added the S3 based document drop flow to the pipeline.

The SEO-first direction was added as last and looks like a practical choice to quickly build volume based on a certain domain of questions and user intents. It is quiet easy to expand by adding search queeries and I used mostly SEO tools to find relevant queries and sources. This is a good way to get a lot of data quickly and also to have control over the growth of the corpus.

### Silver: Normalization and Chunking

The Silver layer converts scraped raw material into structured, retrieval-ready documents:

- normalization
- metadata shaping
- chunk generation

This is where noisy web data gets transformed into something usable for retrieval and later analysis.

### Retrieval Layer

I set up vector, lexical (BM25), and hybrid retrieval paths. The goal was to establish a practical baseline rather than prematurely overfit one method.

### Evaluation Layer

I added repeatable benchmark workflows to compare:

- benchmark-only generation
- retrieval-augmented generation

Both notebook and scripted execution paths exist, so experiments can be run quickly but still reviewed in detail.

## Why SEO-First Was the Right First Move

A recurring question is why I started with SEO-heavy public sources instead of trying to ingest deeper legal material first.

The answer is speed and leverage.

SEO-first ingestion gave me:

- a fast way to build corpus volume
- controllable knobs for source growth
- a repeatable acquisition mechanism for ongoing collection

It also forced me to solve operational basics early: source registry, crawl logic, normalization, chunking, and retrieval wiring. Those pieces are required anyway if I later add harder sources like judgments.

## Current Result: No Clear RAG Lift Yet

The current baseline is honest: benchmark and RAG results are often close, and in several runs there is no clear, reliable uplift.

That is not the outcome I ultimately want, but it is still useful.

A flat early result in this setup usually points to one or more of these issues:

- retrieval not tuned yet
- corpus quality or coverage limits
- chunking and ranking quality gaps
- benchmark design not yet discriminative enough

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

### 1. Judgments Track

Goal: integrate judgments as a first-class source type and measure impact on grounding and difficult legal questions.

### 2. Commentary and Paywall Track

Goal: map what is legally and technically usable from commentary-like sources, and test where model prior knowledge ends and retrieval context becomes necessary.

### 3. Retrieval Quality Track

Goal: tune the retrieval stack directly:

- top-k and alpha settings
- candidate generation and reranking
- deduplication and relevance filtering
- chunk and metadata quality

### 4. Agent Workflow Track

Goal: connect retrieval behavior to agent graph decisions and compare output quality with and without retrieval at node level.

## Proposed Article Outline for the Full Deep-Dive Version

For the full follow-up article, I will use this structure:

1. Introduction: legal QA is a data logistics problem first
2. Initial hypothesis: retrieval should help
3. Pipeline architecture: Bronze, Silver, Retrieval, Evaluation
4. Why SEO-first ingestion was chosen
5. Evaluation history: what I tried and what did not separate well
6. Baseline result: weak uplift, strong reproducibility
7. Lessons learned so far
8. Next experiments: judgments, commentary, and retrieval tuning
9. Conclusion: foundation first, optimization second

## Final Thought

The core takeaway from this kickoff is straightforward:

I did not prove that public-data RAG already beats the benchmark in this domain. I did prove that I can run a full, repeatable REC/RAG cycle and now improve it systematically.

That is the right starting point for the next experiments.
