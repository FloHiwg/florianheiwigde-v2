---
title: "Building an LLM-Maintained AI/ML Knowledge Base"
date: 2026-04-08
description: "A case study of an Obsidian-based AI/ML knowledge base where raw sources, generated summaries, and a concept wiki are maintained incrementally with Claude Code."
---

## Introduction

This project is an experiment in building what Andrej Karpathy called an [“LLM Knowledge Base”](https://x.com/karpathy/status/2039805659525644595).

The starting idea is simple:

What happens if the LLM is not just the thing that answers questions, but the thing that maintains the knowledge base itself?

That is the framing I took from Karpathy's post. Raw sources get collected locally as Markdown and images. The LLM turns them into summaries and concept pages. Obsidian becomes the frontend for browsing everything. Over time, the same setup can support Q&A, generated outputs, search, and maintenance workflows.

That is the workflow I am trying to build here for AI and ML topics.

What I like about this approach is that it stays local and inspectable. The whole thing is just Markdown, images, a repo, Obsidian, and an LLM workflow on top. The goal is not to build a polished product yet. The goal is to see whether this is a practical way to build and maintain a personal AI/ML wiki.

## Project Snapshot

At a high level, this experiment currently combines three pieces:

- an ingest flow that clips AI/ML web articles into local Markdown with images
- a cleanup step that fixes broken local image references so the raw source remains readable in Obsidian
- a Claude Code skill that processes new articles into summaries and folds them into a growing wiki

The current system is still small, but the core loop already exists. There is a raw article layer, a summary layer, and a concept wiki that groups material into areas like training, evaluation, inference, architecture, and applications.

<div class="article-demo-cta">
  <div class="article-demo-cta__eyebrow">Source repo</div>
  <h3 class="article-demo-cta__title">Open the AI/ML knowledge base on GitHub</h3>
  <p class="article-demo-cta__copy">Browse the raw articles, generated summaries, Claude skill, and concept wiki structure directly in the repository.</p>
  <a class="article-demo-cta__button" href="https://github.com/FloHiwg/ai-ml-knowledge-base">Open repository</a>
</div>

## Why This Experiment Exists

I have been collecting technical material for a while, but the usual problem with that habit is obvious: collecting articles is easy, turning them into a usable system is not.

A folder of saved links or clipped markdown can be useful for a while, but it does not automatically become a knowledge base. It only becomes one if the material is summarized, cross-linked, grouped into concepts, and kept in a form that is easy to revisit later.

That is the part of Karpathy's framing I found most compelling. The LLM is not only there for question answering. It is there to do the maintenance work that usually never happens consistently: summarizing, linking, updating concept pages, and gradually turning a pile of source material into something more structured.

So this project is less about building a chatbot over documents and more about building a workflow that compiles raw reading material into a wiki.

## What I Built So Far

So far, I have mainly built the first version of that workflow.

### Ingest Layer

I set up article ingest with MarkSnip. That gives me local Markdown copies of web articles together with their downloaded images.

That matters because I want the source material to stay local, browsable in Obsidian, and easy for the LLM to inspect directly. I do not want the workflow to depend on a live website still being available later.

### Cleanup Layer

After clipping, local image references are often broken because the paths are URL-encoded in a messy way. To fix that, I wrote a small Python script that rewrites those references to the correct local files.

This is a small part of the system, but it is an important one. If the raw source layer is annoying to use, the whole workflow breaks down very quickly. Fixing the article render quality keeps the input layer usable.

### Processing Layer

The main piece so far is a Claude Code skill for processing new articles.

The intended flow is simple:

- fix local image references if needed
- generate a summary of the article
- incorporate the article into the wiki by updating or expanding the relevant concept pages

That is the part I care about most. I do not just want a folder of saved articles. I want a repeatable process where new sources gradually get compiled into a more structured wiki.

## Next Steps

The next steps are mostly about making the wiki easier for the LLM to use and easier to grow:

- keep growing the wiki with more source articles
- add an index for the summaries so the LLM can find cross-references more easily
- build a rough search engine over the wiki
- add linting and health checks
- build a process that incorporates the output of my own queries back into the wiki

That last point is especially important to me. I want a harness that forces the LLM to answer by writing a Markdown file into an `output/` folder, with references back to existing articles or wiki pages. Then I want a second process that takes those outputs and folds the useful parts back into the wiki itself.

If that works well, then my own queries and explorations start compounding inside the knowledge base instead of disappearing into chat history.

## Current State

Right now this is still a small system, but the basic loop exists: ingest articles, clean them up, summarize them, and start compiling them into a wiki.

That is enough to make the project interesting already. The next question is whether I can grow the wiki far enough, and tighten the workflows enough, that the LLM can use it not just as a pile of notes but as a real working knowledge base.
