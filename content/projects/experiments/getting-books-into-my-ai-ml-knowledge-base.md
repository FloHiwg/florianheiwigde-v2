---
title: "Getting Books into My AI/ML Knowledge Base"
date: 2026-04-21
description: "A practical workflow note on turning books into chapter-sized inputs, summarizing them incrementally, and folding the result into my AI/ML wiki without burning too many tokens."
tags:
  - "AI/ML knowledge base"
  - "Wiki workflows"
---

## Introduction

One thing I also wanted to make work in this project was getting books into the wiki, not just web articles and podcasts.

That turned out to be a bit more manual, but still very workable.

The main reason is simple: books are big, and pushing a whole PDF through one model call is usually not the most practical way to handle them. It costs more tokens, it is harder to control the output quality, and it becomes difficult to see where a summary actually came from.

So instead of treating a book as one giant source, I started treating it as a series of smaller chapter-sized sources.

## The Workflow I Used

### 1. Split the book into chapters

The first step was breaking the PDF into separate chapter files.

Sometimes I did that manually, and sometimes I used a PDF splitter to speed it up. In practice, I often still preferred doing the chapter boundaries manually because that gave me cleaner chunks and made it easier to keep the structure aligned with the actual book.

That part is not very sophisticated, but it matters. If the input chunks are messy, the downstream summaries usually get messy too.

### 2. Summarize each chapter on its own

Once the book was split up, I summarized each chapter PDF separately instead of asking for one book-level summary first.

This works with different models, but I often preferred using `NotebookLM` for this step because it felt convenient for working through the material chapter by chapter.

The important part was not the exact model choice. The important part was keeping the unit of work small enough that each summary stayed grounded in one chapter.

### 3. Write the summaries into the wiki

After that, I took those chapter summaries and added them into the wiki as structured notes.

That gave me something much more useful than a single compressed summary of the whole book. I could keep the progression of ideas, preserve chapter-level distinctions, and fold the material into the existing concept pages more gradually.

It also made the result easier to cross-link later, because specific chapters often map more cleanly to wiki topics than an entire book does.

## Why This Approach Worked Well

The biggest practical benefit was token efficiency.

By splitting the book into chapters and summarizing those pieces separately, I did not have to spend a large context window on the whole book at once. The work became incremental, and the summaries were easier to review before I merged them into the wiki.

It also made the whole process feel more inspectable. I could see which chapter produced which summary, where a point came from, and where I still needed to clean something up manually.

So even though the workflow is a bit manual today, I actually like that it slows the process down in a useful way. It keeps the ingest step cheap enough, and it forces a more deliberate pass over the material before it becomes part of the wiki.

## Current State

Right now, this is still closer to a practical routine than a polished pipeline.

I am not automatically turning entire books into neatly structured wiki pages yet. What I do have is a workflow that already works reliably enough:

- split the PDF into chapter-sized files
- summarize each chapter separately
- review the summaries
- move the useful parts into the wiki

For long-form material, that is currently the best tradeoff I have found between effort, quality, and token cost.

## AI/ML Knowledge Base Series

- Part 1: [Building an LLM-Maintained AI/ML Knowledge Base](/projects/experiments/building-an-llm-maintained-ai-ml-knowledge-base/)
- Part 2: [Using My Knowledge Base to Build a Harness Engineering Podcast](/projects/experiments/using-my-knowledge-base-to-build-a-harness-engineering-podcast/)
- Part 3: Getting Books into My AI/ML Knowledge Base
