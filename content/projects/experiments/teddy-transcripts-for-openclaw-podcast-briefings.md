---
title: "Giving OpenClaw Podcast Transcript Access: Teddy API, a Tiny CLI, and Morning Relevance Checks"
date: 2026-03-02
draft: false
description: "How I added podcast transcript access to my OpenClaw morning briefing with a small CLI wrapper around the Teddy API and a simple 'new episode + is it interesting?' workflow."
---

## Introduction

After getting email into my OpenClaw workflow, I wanted to add one more signal I care about: podcasts.

The problem is simple. I do not have time to listen to every new episode, but I still want a fast answer to:

- Is there a new episode?
- What is discussed?
- Is it worth my time today?

So I gave my OpenClaw agent transcript access.

## Why Transcripts Instead of Audio

For a morning briefing workflow, transcripts are just more practical than raw audio.

I do not need full media processing in this step. I only need enough context for a quick decision.

A transcript gives the agent something it can scan, summarize, and classify fast, without adding a heavy pipeline.

## Choosing Teddy API

I used Teddy API for this experiment.

The API can provide transcripts directly and can also fetch transcripts when available, which matched exactly what I needed.

I also started with their free tier because this is still in the "prove it is useful first" phase.

## Implementation: A Small CLI Wrapper

Like with my Agentmail integration, I built a small CLI wrapper instead of over-engineering the first version.

The CLI handles:

- Listing or checking tracked podcasts
- Fetching the newest available episode transcript
- Returning structured output OpenClaw can consume
- Storing a small "last processed episode" state

That state tracking is important, because my agent should only brief me when there is actually something new.

## Briefing Logic

The daily behavior is intentionally simple:

1. Every morning, OpenClaw checks each tracked podcast.
2. It compares the newest episode against the last one already processed.
3. If there is no new episode, it skips.
4. If there is a new episode, it fetches the transcript via the CLI.
5. It returns two outputs in the briefing:
   - A short "what was discussed" summary
   - A quick "interesting for Florian or not?" decision

This turns podcasts into a decision layer, not another inbox I need to manually process.

## Why This Helps

This setup gives me a lightweight filter for long-form content:

- I do not miss new episodes from my favorite shows
- I do not waste time listening blindly
- I get a consistent format inside the same morning briefing I already use

The key is not perfect summarization. The key is faster prioritization.

## What I Learned

The most useful pattern so far is building tiny, focused CLIs around APIs and plugging them into OpenClaw as capabilities.

For this use case, Teddy + a small wrapper was enough to turn podcasts from "I should listen later" into a daily yes/no signal with context.

Next, I will likely add simple topic tagging so the briefing can say not just "interesting or not," but also why (for example: AI agents, model releases, infra, or policy).
