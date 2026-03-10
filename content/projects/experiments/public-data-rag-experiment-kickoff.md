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

Another goal for this project was getting deepening my understanding of the medaillon structure and how to build a full data-to-evaluation pipeline that can be iterated on quickly. 

The short version: I now have a full end-to-end RAG pipeline running. The current benchmark vs RAG deltas are still weak. But the system is reproducible, measurable, and ready for targeted iteration.

## Why This Experiment Exists

The starting hypothesis was simple: retrieval should improve answer quality for legal questions.

The reality is less simple. In German legal domains, high-value data is unevenly accessible:

- A lot of detailed commentary is paywalled.
- Public datasets are fragmented.
- Judgments are hard to get and either paywalled or harshly protected.

That means model choice is only one part of the problem. The bigger constraint is data logistics: sourcing, structuring, retrieval quality, and evaluation discipline.

So I planned to get closer to a solution from both sides and build the pipeline while exploring different evaluration options and source options for getting the documents.

## What I Built End-to-End

I implemented an end-to-end flow from source discovery and ingestion to benchmark comparison, organized into clear layers.

### Bronze: Discovery, Ingestion, and Raw Collection

The Bronze layer handles source discovery and intake and raw extraction. It currently supports multiple entry paths:

- sitemap ingestion
- search-intent URL discovery
- direct URL ingestion
- S3-based document drop flows

I chose this setup because public legal data comes in different formats and through different channels and since it is the scarced resource I wanted to handle as many different options as possible. 

The fastest first move was to collect trusted, crawlable sources through sitemaps and direct URLs.

Many high-value pages are still paywalled or only partially public, so I also added traditional open sources such as university scripts and student-oriented legal material. A lot of those came as PDFs, which is why the S3 document-drop flow became part of the ingestion layer early.

After I did these two strategies I was wodnering, why not take the Google ranking algorithm as my preselector for pages and  expand coverage with search-intent discovery. So collecting a list of search terms following the regular SEO process to find long tail keywords and then using those to discover more URLs through Google search results was the next step. I did this by implementing SERP API calls and just taking all of these URLs as candidates for ingestion. This is a more scalable way to expand coverage, but it also adds more noise, so I plan to add more filtering and source vetting logic in the future.

Beyond source intake, Bronze also handles the regular crawler lifecycle:

- track the last refresh timestamp per source so recrawls can be scheduled incrementally
- skip unnecessary fetches when a source was refreshed recently or no change is detected
- download source content and clean it into normalized Markdown files
- persist a content hash so changes can be detected quickly and only updated documents move forward

This keeps crawling efficient and makes downstream processing faster because unchanged documents do not need full reprocessing.

### Silver: Normalization and Chunking

The Silver layer converts scraped raw material into structured, retrieval-ready documents:

- normalization
- metadata shaping
- chunk generation

This is where noisy web data gets transformed into something usable for retrieval and later analysis.
Another important function of Silver is to add metadata that can be used for filtering and relevance signals in retrieval. For example, I added general tags about the content as well as paragraphs that are mentioned in the chunk.

The chunking is happening based on a semantic chunking via an LLM model, which is more expensive than a simple token-based chunking, but it also produces more coherent and semantically meaningful chunks, which is important for retrieval quality later on. I did the chunking and the metadata extraction in one step, which is more efficient than doing them separately.

### Retrieval Layer

I set up vector, lexical (BM25), and hybrid retrieval paths. The goal was to establish a practical baseline rather than prematurely overfit one method.

### Evaluation Layer

I added repeatable benchmark workflows to compare:

- benchmark-only generation
- retrieval-augmented generation

Both notebook and scripted execution paths exist, so experiments can be run quickly but still reviewed in detail.
The experiments as well as the data sets are pushed into LangSmith and traces can be used to track the different runs and compare them in a structured way. This is especially useful to compare the benchmark-only runs with the RAG runs and seeing all the details from retrieval and inference.

I tested different approaches for the dataset and how to evaluate the results. 
First I was thinking about using questions and answers from legal blogs and forums, but gathering the data and evaluating the correctness of the answers was difficult and therefore I moved this aside and focused on the other options.

First other options I could think about was using exam questions for law students, which are publicly available and have a clear expected answer, but after running the first test with the benchmark setup (no RAG) I found a near 100% test result which was a clear indication of data leakage. Which is kinda obvious since the data is publicly available and the model was trained on a lot of public data, but it was still a good reminder to be careful with evaluation data in this domain. It also remind that the models are really good at memorizing and reproducing the content they were trained on. This was also the spark for the idea of evaluating how good the models can reproduce the propertery commentary that is behind paywalls, so do i need this content or do I just need the model to actively reproduce and remember it. This is something I will explore in spinoff experiment.

The second option was a data set from hugging face I got made aware of by a former colleague of mine. It is a collection of a huge amount of legal questions with answers for all different legal areas. The questions are more practical and less academic than the exam questions, which is a better fit for my use case. The answers also contain laws that are applicable and refrences. 
https://huggingface.co/datasets/DomainLLM/gerlayqa-bgb-paraphrased


## Why I'm found to the SEO-First approach

Even though the current results are not yet showing a clear RAG lift, I am still confident that the SEO-first ingestion strategy is a valuable approach to experiment with. It gives a really nice growth path and a lot of control over the data collection process, which is crucial in this domain where data is scarce and fragmented.

It can be easily automated and scaled, and it allows for quick adjustments based on what is found to be most relevant and useful for the task at hand. It also helps to ensure that the data being ingested is actually relevant to the legal questions being asked, which is a key factor in improving retrieval quality and ultimately answer quality.

## Current Result: No Clear RAG Lift Yet

The current baseline is honest: benchmark and RAG results are often close, and in several runs there is no clear, reliable uplift.

That is not the outcome I ultimately want, but it is still useful.

A flat early result in this setup usually points to one or more of these issues:



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
