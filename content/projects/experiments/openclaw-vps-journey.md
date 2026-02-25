---
title: "My OpenClaw Journey (So Far): Starting Late, Choosing a VPS, and Switching to AWS"
date: 2026-02-25
draft: false
description: "A practical write-up of setting up OpenClaw on a low-cost AWS EC2 instance, fixing memory issues, and shaping it into an AI morning briefing workflow."
---

## Introduction

I wanted to document my journey with OpenClaw while I build, test, and learn along the way, with one concrete goal in mind: turning it into a useful filter for tech news, new models, papers, and podcasts.

I am writing this as the project evolves instead of pretending I had a clean plan from day one.

The first feeling I had was simple: I felt like I was already joining the party late.

That usually creates a weird kind of pressure. You see other people already experimenting, shipping things, or posting demos, and you immediately start comparing your "day one" to their "month one."

Still, I decided to start anyway and keep things practical.

The practical version of that decision was: get OpenClaw running on a VPS first, then shape it into something I would actually use.

## The First Goal: Run It on a VPS

Since I am still sane, I did not want to let this work on my local setup and access all my files. I wanted to install OpenClaw on a VPS and keep the environment predictable and isolated.

My first step was to look for the cheapest reasonable option.

I initially picked Hetzner.

On paper, it was the obvious choice for what I wanted at that stage: affordable, simple enough, and commonly recommended.

## Why I Switched Away From Hetzner

During the exploration, Hetzner stopped offering the VPS option I wanted (or at least the one I had in mind while I was setting things up).

That pushed me to reevaluate the setup instead of forcing it.

I ended up switching to AWS.

Honestly, I am fine with that outcome. I tend to prefer AWS anyway, and I am not the biggest fan of Hetzner's resource management UI. I find it frustrating to work with, especially when I want to move quickly and make small infrastructure changes without fighting the interface.

So the setup direction became:

- Skip Hetzner
- Move the OpenClaw setup to AWS
- Continue from there

## Starting on AWS: Free Tier EC2 (Ubuntu Defaults)

The next step was straightforward: I created a free tier EC2 instance on AWS and kept basically everything on the default settings.

One important exception: I increased the storage from the default 8 GB to 30 GB during instance creation.

I chose Ubuntu for the instance, connected via SSH, and started with the installation command from the OpenClaw website:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

This was the exact kind of start I wanted for the first attempt: no over-optimization, no custom infra setup, just a clean machine and the official installation path.

Using the default AWS setup also helped me keep the early setup focused on one question:

"Can I get OpenClaw running first?" instead of "Can I design the perfect server setup?"

## Early Server Fixes: Swap Space and Git

One practical issue showed up quickly: during startup, the app needed a bit more than the roughly 1 GB RAM available on the small free-tier instance.

So I had to set up swap space to avoid running into memory problems during startup.

I created a 4 GB swap file:

```bash
# Create a 4GB swap file
sudo fallocate -l 4G /swapfile

# Set the correct permissions
sudo chmod 600 /swapfile

# Tell the system this is a swap area
sudo mkswap /swapfile

# Turn it on
sudo swapon /swapfile

# Make it permanent so it works after a reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

I also needed to update package lists and install Git:

```bash
sudo apt update && sudo apt install git -y
```

I also had to tell Node to use more memory during startup so it could actually benefit from the extra swap-backed headroom:

```bash
export NODE_OPTIONS="--max-old-space-size=2048"
```

Without that, the instance still felt too constrained during startup.

That was a good reminder that "default Ubuntu image" does not always mean "everything I need is already there," especially when following an install path that expects a few basics to exist.

## What I Actually Want OpenClaw to Do

The goal is not just "run OpenClaw on a server" for the sake of it.

I want to use it as a filter for tech information overload.

The idea is to have OpenClaw regularly look at sources like:

- The New York Times (for broader tech coverage)
- Reddit (for fast-moving discussion and early signals)
- YouTube (for hype topics, interviews, podcasts, and explainers)

And then summarize the things that matter to me, especially:

- New models
- New papers
- New hype topics
- Interviews and podcast episodes worth listening to

What I want in the end is a quick overview that helps me decide:

- What to watch
- What to listen to
- What to read in more depth
- What to ignore

Basically, I want a strong starting point for my daily or weekly tech scanning so I do not miss important developments, but also do not waste time chasing low-value noise.

## Setup Guide I Followed (Mostly)

For the setup itself, I mostly followed this guide:

- [Painless OpenClaw setup (Tim Kleyersburg)](https://tim-kleyersburg.de/articles/painless-openclaw-setup)

I did not follow it blindly end to end, but it was a very helpful baseline, especially for getting the overall setup moving without wasting time on avoidable trial and error.

I also configured the Telegram bot as part of the setup, since that is the interface I want to use for quick summaries and updates.

Compared to the setup in the blog post, I also enabled `boot.md` and session memory.

Those two changes fit my use case better because I want OpenClaw to keep more context and behave more consistently across repeated interactions instead of treating every run like a completely fresh start.

I also decided to use OpenRouter as the provider for my first round of testing.

Part of that was just flexibility, but the bigger reason is that I want to try different models, especially open-weight models, and compare how well they work for this kind of "tech signal filtering" workflow.

## Fixing Provider Setup and Re-Running Onboarding

I ran into an issue with the OpenRouter configuration and had to redo the onboarding.

The fix was simply to run onboarding again:

```bash
openclaw onboard
```

That solved the broken config state and let me continue without trying to manually patch everything.

For the AI model itself, I initially started with Gemini 2.5 and I am now testing Gemini 3.0 Flash.

This is still part of the experimentation phase for me, so I am less focused on "the best model" and more focused on finding a good balance between speed, usefulness, and cost for the kind of summaries I want.

## Accessing the OpenClaw UI via SSH Tunnel

To access the OpenClaw UI running on the EC2 instance, I used an SSH tunnel instead of exposing the port directly.

This is the command I used:

```bash
ssh -i ~/.ssh/vps_key -L 18789:localhost:18789 ubuntu@your_ec2_ip
```

That forwards the OpenClaw UI port from the server to my local machine, so I can open it locally in the browser while keeping the service private on the instance.

## First Real Configuration Attempt: AI Morning Briefing

After getting the setup running, I made my first real attempt to configure something genuinely useful for my daily workflow.

I asked OpenClaw to look through a list of podcasts and news articles, identify what is new in AI, and also surface newcomers I might not already be following.

I also wanted it to expand the source mix by adding relevant Substacks and news outlets, so the end result could become a morning briefing for "what happened in AI."

The rough idea was:

- Scan a curated set of podcasts and news sources
- Summarize what is new in AI
- Highlight emerging people/projects/sources worth tracking
- Add strong additional sources (for example Substacks and AI-focused outlets)
- Return a concise briefing that helps me decide what to read or listen to

This was the first point where the project started to feel less like "server setup" and more like the actual product I want for myself.

## What I Learned So Far

The setup itself was not hard in the "deep infrastructure" sense, but it was full of small practical details:

- Navigate all the hostinger advertisements and videos (creazy amount of noise there)
- Increase EC2 storage up front (30 GB instead of 8 GB)
- Get the openrouter config right and re-run onboarding when it broke

So far, the most valuable part of this experiment is not the server configuration. It is getting closer to a workflow that helps me decide where to spend attention each day.

That is the part I care about most, and it is also the part I want to keep improving next: better source selection, better prompts, and better summaries that are actually worth reading.
