---
title: "Building a Tiny Coding Agent – Plan, Edit, Verify, Repeat"
date: 2026-01-31
description: "A small local coding agent that safely edits files using a simple plan–act–observe loop, diff previews, and optional test verification."
---

## Introduction

I recently started a small side project where I tried to build a simple IDE-like environment for Google Drive documents, inspired by tools like Cursor.

While working on that idea, I kept coming back to one question:

How do you let an LLM change real code without turning your repository into a crime scene?

During that research phase, I stumbled across a ByteByteGo post that broke down Cursor's coding agent loop:

[How Cursor Shipped its Coding Agent to Production (ByteByteGo)](https://blog.bytebytego.com/p/how-cursor-shipped-its-coding-agent)

The core idea looked almost suspiciously reasonable:

Plan something.  
Make a small change.  
Verify it.  
Repeat until it is done.

So I built a tiny version of that from scratch.

Nothing fully autonomous.  
Nothing "AI refactored my repo while I blinked."  
Just a small coding agent that can safely modify files in a local workspace using a **Plan -> Act -> Observe** loop and a very important guardrail: **no silent writes**.

The code for this experiment lives in a separate repository.
<!-- TODO: add repository URL once available -->

This post is an architecture tour, not a deep code walkthrough. The goal is that you can read this once and understand how the whole thing works.

## What This Agent Actually Does

At a high level, the agent can:

- Read files in a workspace
- Plan changes using an LLM (via tool calls)
- Edit files through small, controlled tools
- Show a diff before applying changes
- Run a verification command (pytest)
- Repeat until the task looks "done"

Everything runs locally.

No hidden services.  
No background magic.  
No "AI refactored your entire repo while you blinked."

You run:

```bash
uv run main.py "Add logging to main.py"
```

And the agent works through the task step by step.

## The Core Idea: One Small Loop

The entire system revolves around one loop:

1. Plan what to do
2. Use tools to apply changes
3. Show the diff and ask for approval
4. Run verification
5. Decide whether to continue

This structure turned out to matter more than any prompt trick or model tweak.

Because every step is visible:

- I see the plan
- I see the proposed edits
- I approve changes (or reject them)
- I see the verification output

That visibility is what makes the system feel trustworthy.

## The High-Level Architecture

Instead of one big script, the system is split into small components with clear responsibilities:

- Entry point (CLI)
- Router (choose model tier)
- Context engine (pick relevant files/snippets)
- Orchestrator (the loop wiring)
- Plan node (LLM call with tools)
- Tools node (do the reads/writes/commands)
- Verify node (run pytest)
- Observe node (continue or stop)

Each part does one thing. None of them are particularly smart on their own. Together they create a workflow that is predictable and debuggable.

Here is the pipeline in one glance:

```
User request
  -> Router (model tier)
  -> Context engine (snippets)
  -> Plan (LLM with tools)
  -> Tools (diff + approval)
  -> Verify (pytest)
  -> Observe (loop or stop)
```

## Entry Point: `main.py`

The entry point is intentionally boring.

It:

- Parses CLI arguments
- Creates (or selects) a workspace directory
- Builds the LangGraph state machine
- Initializes the shared state (messages, counters, snippets, metrics)
- Invokes the graph

It does not contain any "agent logic". It just kicks things off and prints a summary at the end.

## The Orchestrator: A Small State Machine

The orchestrator wires the nodes into a controlled loop:

```
plan -> tools -> plan -> ... -> verify -> observe -> stop (or loop)
```

Under the hood it is a LangGraph state machine. The important part is not the framework, it is the shape:

- The agent always has explicit phases.
- The agent always carries explicit state.
- The loop is allowed, but controlled (max loops / recursion limit).

That state object is the agent's short-term memory: user request, messages, which phase it is in, what context was retrieved, how many loops happened, and what verification returned.

## Router: Picking a Model Tier

Before planning, the router picks a model tier.

This is intentionally simple: if the request is long (or contains a keyword like "complex"), it uses a stronger model. Otherwise it uses a cheaper/faster one.

The plan node can run against Google Gemini (if `GOOGLE_API_KEY` is set) or OpenAI (fallback).

## Context Engine: "Relevant Enough" Snippets

The context engine does not build an embedding index. It does not parse ASTs. It does not build a repository map.

It does something much dumber, and good enough for a first version:

- Take keywords from the user request
- Scan the workspace for matches
- Return the top snippets (small excerpts)

The purpose is not to be perfect. It is to keep the prompt small while giving the model a fighting chance to pick the right files.

## Plan Node: The LLM Call

This is where the model decides what to do next.

The important design choice is the contract:

The model is not allowed to respond with "here is what I would do". It must call tools.

That sounds strict, but it solves a real problem. Without it, you get a polite essay instead of a change.

## Tools: The Agent's Hands

The agent cannot modify files directly. It must go through tools.

The tool suite is small on purpose:

- Read file
- Write file
- Search & replace
- Grep
- Run shell commands

The most important guardrail:

Every write operation generates a diff and requires your approval before applying changes.

That single decision makes debugging easier, builds trust, and prevents "oops, I rewrote half the repo" accidents.

## Verify and Observe: Did It Work, and Are We Done?

After an edit, the agent runs verification.

Right now verification is a pytest command. In the current PoC it is intentionally forgiving (it uses `|| true`), which means it is closer to a placeholder smoke check than a strict gate.

Observation is the decision point: continue the loop or stop.

If nothing happened, or verification looked bad, it can go back to planning. If everything looks good (or the loop limit is reached), it stops and prints a summary.

## Example Run: "Add Logging to main.py"

If the request is:

"Add logging to main.py"

A typical run looks like this:

1. Router selects the fast tier
2. Context engine pulls a snippet from `main.py`
3. Plan node calls `read_file`
4. Plan node calls `search_replace` (or `write_file`)
5. Tools show a diff and ask for approval
6. Verify runs pytest
7. Observe stops (or loops if needed)

It is not magical.

But it is structured, and that is the point.

## Final Thoughts

The main thing I learned from this experiment is that in agent-style systems, structure matters more than cleverness.

Getting a reliable "show diff, ask approval, then write" loop was harder than getting the model to write code.

Next steps, if I keep pushing this:

- Make verification a real gate (no `|| true`)
- Improve context retrieval (embeddings, AST-aware chunks, repository maps)
- Add git-aware tools (branch, commit, rollback)
- Add an "ask" mode for clarification instead of forcing edits

Or I might leave it as-is and go back to the Google Drive Cursor project, which is where this whole rabbit hole started.
