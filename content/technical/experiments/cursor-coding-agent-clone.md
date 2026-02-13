---
title: "Building a Tiny Coding Agent – Plan, Edit, Verify, Repeat"
date: 2026-01-31
description: "A small local coding agent that safely edits files using a simple plan–act–observe loop, diff previews, and optional test verification."
tags: ["AI", "LLM", "Agents", "Python", "Tooling"]
---

## Introduction

I recently started a small side project where I tried to build a simple IDE-like environment for Google Drive documents, inspired by tools like Cursor.

While working on that idea, I spent a lot of time thinking about flow:

- How do the different components interact?
- How do you prepare context properly for the model?
- How do you inject third-party knowledge safely?
- How do you handle change requests?
- And most importantly — how do you let an LLM change things without breaking everything?

(There will be a separate post about that experiment and the current state of the project.)

During this research phase, I stumbled across an article from ByteByteGo about building a coding agent with GPT and LangChain. My first reaction was simple: How hard could it be to build something like this myself?

It looked like a minimal and practical foundation — something small enough to understand, but powerful enough to build on later.

So instead of pulling in a huge framework, I built a tiny version from scratch.

Nothing fully autonomous.  
Nothing overly clever and some parts particularly dumb.
Just a small coding agent that can safely modify files in a local repository using a **plan → act → observe** loop.

This post walks through that experiment. Focusing on the high-level architecture, the flow of a single run, and the responsibilities of each component.

Think of it as an architecture tour, not a deep code walkthrough.

## What This Agent Actually Does

At a high level, the agent can:

- Read your repository
- Plan changes using an LLM
- Edit files through small, controlled tools
- Show diffs before applying changes
- Repeat until the task is complete

Everything runs locally.

No hidden services.  
No background magic.  
No “AI refactored your entire repo while you blinked.”

You run:

```bash
uv run main.py "Add logging to main.py"
```

And the agent works through the task step by step.

The Core Idea: One Small Loop

The entire system revolves around one simple loop:
	1.	Plan what to do
	2.	Use tools to apply changes
	3.	Show the diff
    4. Run tests
    5. Decide whether to continue

This structure turned out to be more important than any prompt trick or model tweak.

Because every step is visible:
- I see the plan
- I see the proposed edits
- I approve changes

That visibility is what makes the system trustworthy.

## High-Level Architecture

Instead of one big script, the system is split into small components with clear responsibilities:
- Entry point
- Router
- Context engine
- Orchestrator
- Tools
- Verification
- Observation

Each part does one thing.

None of them are particularly smart on their own — but together they create a structured workflow.

Let’s go through them.

### Entry Point – main.py

The entry point is intentionally simple.

It:
- Parses CLI arguments
- Loads the workspace
- Initialises graph
- Passes in your prompt

It doesn't contain any real intelligence. Just kick off things.

### The Brain – Orchestrator

This is where the actual agent behaviour lives.
The orchestrator wires everything into a structured loop.
```python
plan -> tools -> verify -> observe -> repeat or stop
```

It’s essentially a controlled state machine.

The shared state object carries everything across steps:
```python
initial = {
    "user_request": args.request,
    "workspace_path": str(workspace_path),
    "messages": [HumanMessage(content=args.request)],
    "loop_count": 0,
    "current_phase": "plan",
    "context_snippets": [],
    "verification_result": {},
    "trajectory": [],
    "edit_attempts": 0,
    "edit_applied": 0,
    "latency_breakdown": {},
}
```

Think of it as short-term memory.

Without structured state, the agent would just be a stateless chatbot making isolated guesses.

### Routing & Context

Before planning, the agent makes two decisions.

#### 1. Which model should be used?

Simple tasks don’t need a heavy model.
More complex prompts might.

Right now this decision is heuristic-based or triggered by a keyword "complex". Nothing sophisticated.

Short prompt? → fast model.
Complex or long prompt? → stronger model.

#### 2. Which files are relevant?

Instead of sending the entire repository to the model, the context engine retrieves only relevant snippets.

The current approach is intentionally simple:
- Extract keywords from the request
- Score files based on matches
- Select the top candidates

It’s essentially a lightweight search mechanism.

For the test this is more than enough.

For larger projects, we could use:
- Embedding-based retrieval
- Vector search
- AST-aware chunking
- Repository maps
- Context caching

### Tools: The Agent’s Hands

The agent cannot directly modify files.
It must go through tools.

Current tools are:
- Read file
- Write file
- Search & replace
- Grep
- Execute shell commands

The most important design decision:

Every write operation generates a diff and requires your approval before applying changes.

This makes the system closer to Cursor and the other IDEs and also easier to debug.

Without it → risky.  
With it → collaborative.

A really interesting behaviour is that the agent has a hard time not to touch files entriely but to ask questions about the changes to make or to ask for more context.

### Verification & Observation

After edits are applied, the agent can run tests.

Currently, this means executing something like pytest.

If tests fail → loop continues.
If tests pass → task completes.

Instead of guessing whether a change works, the system validates it.

The observe step then decides:
- Retry
- Adjust strategy
- Or terminate

### Example Run: A Small Change

Let’s say the request is:

“Add logging to main.py”

A typical run looks like this:
1.	Router selects the fast model
2.	Context engine retrieves main.py
3.	Plan step suggests reading and modifying the file
4.	A diff is generated
5.	You review and approve
6.	Tests execute
7.	Task completes

And that’s enough.

## Final Thoughts

One thing I learned from this experiment is that with agent-style systems, structure matters more than cleverness and that tings like generating the diff and asking the agent to not do any changes is the hardest part.

Next steps might include:
- Playing around with retrieval and indexing of the repository
- More robust verification
- Different modes to answer questions about the changes
- More reliable diffs (sometimes the files looked interestng after a change)

Or I might just leave it as-is and work on the Google Drive Cursor project.