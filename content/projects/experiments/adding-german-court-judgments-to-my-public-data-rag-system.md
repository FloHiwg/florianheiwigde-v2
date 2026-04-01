---
title: "Adding German Court Judgments to My Public-Data Legal RAG System"
date: 2026-03-31
draft: true
description: "A follow-up to my public-data legal RAG kickoff: why I added German court judgments, why I replaced LLM chunking with a deterministic pipeline, and what broke once the corpus reached real scale."
---

## Introduction

In the first write-up on this project, I focused on the end-to-end foundation: ingestion, normalization, retrieval, and evaluation for a public-data legal RAG system.

Before getting into the pipeline changes, one quick shout-out: [Open Legal Data](https://openlegaldata.io/) is an excellent project and made this entire iteration much easier to explore in a realistic way.

The next obvious question was whether I could make the corpus materially stronger by adding case law.

That meant moving beyond legal guides, blog posts, and commentaries into a very different source type: German court judgments.

This step mattered for a simple reason. If the system is supposed to answer practical legal questions in a grounded way, then access to actual judicial reasoning is much more valuable than relying only on secondary explanations. The challenge was not whether judgments were useful. The challenge was whether I could ingest and structure them cheaply enough to keep the project practical.

I ended up adding more than 50,000 judgments from Open Legal Data, building a deterministic chunking pipeline for them, and then reworking parts of the retrieval stack that immediately became bottlenecks at this scale.

## Why Judgments Changed the Problem

The original corpus was built around a search-intent discovery workflow. That source type was messy, uneven, and full of documents with inconsistent structure. For that setup, LLM-based normalization and chunking made sense. The document count was still manageable, and the gain in coherence justified the processing cost.

Court judgments are different.

They are more formal, more repetitive in structure, and much higher in volume. Open Legal Data exposes a large public dump of German judgments, which made it the natural next source to test. But once I looked at the numbers, it was clear that I could not just run the same LLM-heavy Silver pipeline and pretend the cost profile would stay reasonable.

On a rough estimate, processing the full judgment corpus with the existing pipeline would have pushed the chunking stage into the range of billions of tokens and hundreds of dollars in API cost. For a source that follows a legally enforced document structure, paying an LLM to rediscover section boundaries felt like the wrong tradeoff.

That changed the design question from "how do I reuse the existing pipeline?" to "which parts of this source can be handled deterministically without losing retrieval quality?"

## The Key Insight: Judgments Are Structured Enough for Rules

German court judgments are not arbitrary prose. They usually follow a recognizable structure with recurring sections such as the header, headnotes, operative part, statement of facts, reasoning, and legal-remedy notice.

That predictability made a rule-based approach viable.

Instead of sending each judgment through an LLM, I built a deterministic chunker that classifies section headers through normalization and keyword matching. The important part was not just matching clean labels like `Tenor` or `Tatbestand`. It also had to survive real OCR noise and formatting artifacts such as spaced letters, all-caps variants, numbering prefixes, and page-number contamination inside headings.

So the pipeline first normalizes candidate headings aggressively:

- remove trailing punctuation
- strip numbering and Roman-numeral prefixes
- collapse spaced-letter OCR artifacts
- lowercase the result and match it against a flat keyword dictionary

I also added transition patterns for decisions that begin with a recognizable judicial formula even when no explicit `Tenor` heading is present. That extra fallback mattered because court data is structured, but not perfectly clean.

Once sections are identified, the chunker groups text by paragraph blocks up to a target size instead of cutting through paragraphs mechanically. That preserves legal arguments better than token-window chunking, because a paragraph in a judgment often contains one self-contained piece of reasoning.

The result is a much cheaper transformation path that still produces the same downstream document and chunk objects as the original Silver layer. In other words, the ingestion logic changed, but the retrieval interface stayed shared.

## What Changed in the Pipeline

This is the main architectural shift compared to the earlier source pipeline:

- search-intent documents still use LLM-based normalization and chunking
- court judgments now use deterministic section detection and paragraph-aware chunking
- both source types still land in the same Silver schema and retrieval layer

That was an important design constraint for me. I did not want "judgments" to become a special-case retrieval system with its own custom query path. I wanted a new source-specific transformation strategy that could plug into the existing vector, full-text, and hybrid retrieval stack with minimal downstream changes.

At the same time, the judgment pipeline adds source-specific metadata that is especially useful for legal retrieval:

- detected section type
- court and jurisdiction metadata
- cited legal provisions extracted with regex patterns

This gave me a better metadata surface without making the retrieval API more complex.

{{< legal-rag-judgment-bronze-silver-flow >}}

## Scaling the Judgment Pipeline Exposed New Bottlenecks

The deterministic chunker solved the processing-cost problem, but it immediately created a scale problem elsewhere.

I filtered the judgment set to roughly the last ten years and processed around 53,000 documents. That produced about 427,000 chunks.

At that point, the expensive part was no longer chunking. It was everything that happened after chunking.

The first bottleneck showed up in embedding generation. The original implementation wrote embeddings back to the database one chunk at a time, opening a fresh connection for each write. That was tolerable on small corpora and completely wrong for hundreds of thousands of chunks. Throughput collapsed immediately.

The fix was straightforward in hindsight: batch writes, keep transactions coarse enough to matter, and parallelize the embedding calls in controlled worker pools. The lesson was less about any one optimization and more about the danger of trusting small-scale smoke tests too much. A design that feels fine at ten thousand chunks can fail hard at forty times that size.

## Moving Vector Search Into Postgres

The second bottleneck was retrieval.

Embeddings were initially stored as JSON arrays. That was convenient early on, but it meant similarity search still depended on pulling vectors into Python and scanning them outside the database. With a few thousand chunks, that is annoying. With 427,000 chunks, it becomes the system.

So I migrated the embedding storage to `pgvector` and moved vector search into Postgres with an HNSW index.

The migration itself was more painful than the end result. My first attempt treated the backfill as one large transaction, which turned out to be too fragile for a long-running update on a real dataset. My second attempt surfaced a more serious sequencing problem: a finalize step could remove the old column before the backfill had safely completed.

That forced me to make the migration process more defensive:

- add the new vector column first
- backfill in resumable batches with frequent commits
- block the finalize step unless the backfill is complete

That sequence is less elegant than a one-shot migration, but much safer. It also reflects the actual constraint of this kind of project: long-running data work gets interrupted, and the pipeline needs to survive that without gambling on perfect execution conditions.

The infrastructure lesson was similar. Building the HNSW index on a small database instance was unrealistic, so I temporarily scaled the RDS instance up, built the index, and then scaled it back down. That cost a little money and saved a lot of wasted waiting.

## Replacing Python BM25 With Postgres Full-Text Search

The judgment corpus also broke my lexical retrieval path.

In the original setup, BM25 scoring happened in Python over the loaded chunk set. That was acceptable while the corpus was still small enough to brute-force. It stopped being acceptable as soon as the judgment source expanded the chunk count by hundreds of thousands.

The proper fix was to move lexical retrieval into Postgres as well.

I added a generated German `tsvector` column and a GIN index so that full-text matching and ranking could happen where the data already lives. That changed the hybrid setup in an important way. Instead of combining two brute-force Python passes, the system now asks Postgres for a small vector candidate set and a small full-text candidate set, then merges those in Python.

That is a much better shape for the retrieval layer. Python still does the final hybrid merge logic, but the expensive candidate generation steps are pushed down into indexed database queries.

## What This Added to Retrieval Quality

The most important outcome is not just that the system got faster. It is that the corpus is now qualitatively more useful.

With judgments included, the retrieval system can return not only explanatory secondary content but also actual reasoning from courts across different years and jurisdictions. For legal questions where grounding matters, that is a meaningful improvement in source quality even before I rerun the full benchmark suite at larger scale.

The retrieval architecture also held up the way I hoped:

- vector retrieval still works against the shared chunk store
- lexical retrieval now scales through Postgres full-text search
- hybrid retrieval still combines both signals behind the same interface

That shared design matters because it keeps future source expansion cheap. I can change ingestion and chunking strategies per source type without rebuilding the entire retrieval layer every time.

## What I Learned From This Iteration

This phase of the project reinforced a few practical lessons.

First, structured documents should not automatically go through an LLM just because an LLM pipeline already exists. If the source has stable formatting rules, deterministic processing can be faster, cheaper, and easier to debug.

Second, scale changes which part of the system is "the hard part." Early on, the interesting problem looked like chunk quality. Once the corpus got bigger, the harder problems were embedding throughput, schema migration safety, and indexed retrieval.

Third, migration design deserves as much care as retrieval design. It is easy to think of schema changes as a mechanical task until one failed sequence forces a restore.

## Next Steps

This sequel closes one of the concrete follow-ups from the kickoff article, but the original roadmap is still mostly intact.

<div class="next-steps-checklist">
  <div class="next-step-card">
    <span class="next-step-box next-step-box--done" aria-hidden="true"></span>
    <div class="next-step-content">
      <strong>Integrate judgments</strong> as a first-class source type and measure their impact on grounding and harder legal questions.
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
      <strong>Extend the judgment corpus</strong> beyond the current Open Legal Data base. The existing coverage is already very strong, but some years and courts still have noticeable gaps, so the next expansion step is to add more judgment sources while keeping Open Legal Data as the backbone.
    </div>
  </div>
</div>

## Where This Leaves the Project

The first article established the baseline and showed that the public-data legal RAG loop could run end to end.

This iteration makes the project more serious.

The corpus now includes a large judgment source, the Silver layer can adapt processing strategy to source structure, and the retrieval stack is much closer to something that can support larger-scale evaluation without collapsing under its own plumbing.

The next step is to measure how much this corpus expansion actually improves answer quality on harder legal questions, especially where judgments should contribute better grounding than commentary-style sources alone.

That is the part I care about most. Adding more data is easy to celebrate too early. The useful result will be showing whether this particular data, processed in this particular way, produces a better legal QA system in practice.
