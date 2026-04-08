---
title: "Building an LLM-Maintained AI/ML Knowledge Base"
date: 2026-04-08
draft: true
description: "A case study of an Obsidian-based AI/ML knowledge base where raw sources, generated summaries, and a concept wiki are maintained incrementally with Claude Code."
---

## Introduction

This project is an experiment in building what Andrej Karpathy called an [“LLM Knowledge Base”](https://x.com/karpathy/status/2039805659525644595).

The basic idea, in my own words, is this: instead of using an LLM only as a chatbot on top of documents, use it to maintain the knowledge base itself. Raw sources get collected locally as Markdown and images, the LLM turns them into summaries and concept pages, Obsidian becomes the frontend for browsing everything, and over time the same system can support questions, generated outputs, and maintenance workflows.

That is the workflow I am trying to build here for AI and ML topics.

What I like about this approach is that it stays local and inspectable. The whole thing is just Markdown, images, a repo, Obsidian, and an LLM workflow on top. The goal is not a polished product yet. The goal is to see whether this is a practical way to build and maintain a personal AI/ML wiki.

## What I Built So Far

So far, I have mainly built the first version of the workflow.

First, I set up article ingest with MarkSnip. That gives me local Markdown copies of web articles together with their downloaded images, which is important because I want the source material to stay local and easy for the LLM to inspect.

Second, I wrote a small Python script to fix broken local image references after clipping. Without that step, the Markdown often does not render properly in Obsidian because the image paths are URL-encoded in a messy way. The script is small, but it removes enough friction that the source folder stays usable.

Third, I created a Claude Code skill for processing new articles. The intended workflow is:

- fix the local image references if needed
- generate a summary of the article
- incorporate the new material into the wiki by updating or expanding the relevant concept pages

That is the part I care about most. I do not just want a folder of saved articles. I want a workflow where new sources gradually get compiled into a more structured wiki.

The repository already has the beginnings of that structure. There is a raw article layer, a summary layer, and a concept wiki that groups ideas into areas like training, evaluation, inference, architecture, and applications.

<div class="article-demo-cta">
  <div class="article-demo-cta__eyebrow">Source repo</div>
  <h3 class="article-demo-cta__title">Open the AI/ML knowledge base on GitHub</h3>
  <p class="article-demo-cta__copy">Browse the raw articles, generated summaries, Claude skill, and concept wiki structure directly in the repository.</p>
  <a class="article-demo-cta__button" href="https://github.com/FloHiwg/ai-ml-knowledge-base">Open repository</a>
</div>

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

Right now this is still a small system, but the basic loop exists: ingest articles, clean them up, summarize them, and start compiling them into a wiki. That is enough to make the project interesting already.

The next question is whether I can make the wiki rich enough, and the workflows strong enough, that the LLM can use it not just as a pile of notes but as a real working knowledge base.
