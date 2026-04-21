---
title: "Using My Knowledge Base to Build a Harness Engineering Podcast"
date: 2026-04-14
description: "A practical workflow note on using my AI/ML knowledge base to turn podcast references, related sources, and wiki context into a new 60-minute NotebookLM podcast on harness engineering."
tags:
  - "AI/ML knowledge base"
  - "Wiki workflows"
---

## Introduction

This was a practical use of the AI/ML knowledge base: taking one podcast episode, extracting the sources it mentioned, expanding that source list, and then processing the full set into the wiki.

The topic this time was harness engineering.

I listened to a podcast in the morning that touched on the topic and mentioned a number of sources along the way. Instead of leaving that as a one-off listening session, I used it as the starting point for a small ingestion and synthesis workflow.

What I wanted to test here was fairly simple: can I go from one episode to a usable source list, process that into the wiki, and then reuse the result in another format afterward?

## Listen to the Podcast

<audio controls preload="none" style="width: 100%;">
  <source src="https://d10eypv18nvdpn.cloudfront.net/Harness_Engineering_for_Autonomous_AI_Agents.m4a" type="audio/mp4">
  Your browser does not support the audio element.
</audio>

## The Workflow I Used

The workflow was simple, but it captured a lot of what I want this system to do over time.

### 1. Start from a live source trail

The first input was a podcast episode.

For this step I used the Podfetcher API workflow I described in [the Podfetcher article](/projects/experiments/from-transcripts-for-openclaw-to-an-own-api-product/) together with my own OpenClaw agent. I gave the agent the episode, let it access the transcript, and asked it to extract the resources mentioned in the conversation.

That gave me an initial source list tied to one concrete topic instead of having to collect links manually while listening.

### 2. Expand the source set with Perplexity

After that, I took that initial list and expanded it with Perplexity. I checked the mentioned resources, verified them, and added some additional related material around the same topic.

That was mainly a way to compile a fuller list of articles and sources I wanted to add to the knowledge base, instead of relying only on what happened to be mentioned in the episode itself.

### 3. Run the sources through the established pipeline

Once I had the source set, I added it to the knowledge base and let it go through the process I already built:

- ingest the raw sources as Markdown
- process them into summaries
- fold the new information into the wiki
- update the structured view of the topic inside the vault

That step matters because it turns a temporary source list into something that becomes part of the existing wiki instead of sitting next to it.

### 4. Move the wiki context into NotebookLM

After the wiki was updated, I put the Markdown files into a NotebookLM notebook.

That is probably an extra step in the workflow, and it is also not very easy to automate cleanly in the current form. When I changed something in the wiki, I had to replace the affected Markdown files in NotebookLM again so the notebook stayed in sync.

Even with that friction, I still wanted to use it here because I like the podcast functionality in NotebookLM and it was a practical way to test the result.

### 5. Generate a new podcast from the processed material

Then I asked NotebookLM to create a new podcast focused more deeply on harness engineering.

What I liked here is that the input was no longer just the original podcast and a few manually gathered sources. The material had already been processed through the wiki first, so the generated podcast was working from a broader and more structured topic set.

## Current Situation

The result was a generated podcast of about 60 minutes focused on harness engineering.

It covered the different articles and sources in a form that was more consolidated and easier to revisit. More importantly for me, it showed that the workflow already works in a simple practical loop:

- start from a podcast episode
- extract and expand the mentioned sources
- process them into the wiki
- reuse the resulting topic bundle in another format

The main limitation right now is that the last step is still a bit manual because the `NotebookLM` notebook has to be kept in sync when the underlying wiki files change. But even with that, it is already a useful way to turn one source trail into a structured set of notes and then into a second-pass audio briefing.

## AI/ML Knowledge Base Series

- Part 1: [Building an LLM-Maintained AI/ML Knowledge Base](/projects/experiments/building-an-llm-maintained-ai-ml-knowledge-base/)
- Part 2: Using My Knowledge Base to Build a Harness Engineering Podcast
- Part 3: [Getting Books into My AI/ML Knowledge Base](/projects/experiments/getting-books-into-my-ai-ml-knowledge-base/)
