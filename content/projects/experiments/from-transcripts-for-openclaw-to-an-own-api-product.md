---
title: "Giving OpenClaw Podcast Transcript Access"
date: 2026-03-02
draft: false
description: "How I ended up building an own API to give my OpenClaw agent access to transcript for my morning briefing."
---

## Introduction

After getting email into my OpenClaw workflow, I wanted to add one more signal I care about: podcasts.

The goal was simple. I do not have time to listen to every new episode of the podcasts I follow, so I want an overview of
- What is discussed?
- Who is the guest and what does they discuss about?
- Is it worth my time today?

To answer all these questions I wanted to give my OpenClaw agent transcript access.

This was planned as a short article about how I was building a quick wrapper around some APIs out there to gve my Agent access to podcast transcripts. 

Unfortunately this was harder than expected since all APIs i tested (Podfetcher and Taddy) were not really end customer focused in their pricing and the free tier was not delivering any transcripts and subscribing a service for a fix amount per month just for getting transcripts seemed to be not feasible. The other options I saw a lot out there in the ClawHub was people using the agent to fetch the URL get the mp3 and put this into an API like Assembly API. Which is cool but also a lot of tokens burned by a deterministic approach and especially transcribing something so highly generic like a podcats on a custom and individual level didn't really make sense to me.

So this article becomes an article about my journey building Podfetcher and using this opportunity to build an E2E product with landing page payment and thir party integration solely vibe coded. 


## Why none of the existing APIs?

- Dont seem to be focused on agents and on consumers which just need some transcripts per month
- Everyone transcreibing the same mp3 files of the top 500 podcasts out there seem a waste of resources
- Same for letting the agent figure out the process or writing a script that is maybe error prone instead of just following a fixed process

## Implement the backend 

- Simple wrapper for podcast index, assembly AI with stripe payment integration and caching 

## Implement a landing page 

- Experimenting with perplexity for writing the content 
- Using the claude frontend design skill for coming up with the landing page 
- Polishing the legal pages and the content with gemini and codex
- Also adding a documentation that should be agent first
- Added lightweight user portal for doing payments and checking on usage 

## Building a SDK and CLI

Building and exporting a CLI and MCP wrapper of an SDK so it is easy to use by an agent.

## What I Learned

It is always nice using all the tools out there for a real end 2 end scenario to test them in something close to an real world example and see if the agents can really do what they promise to build. 

Improving your own workflow of building with these models. In terms of how to plan a feature what to challenge what to keep. Seeing things the agents tend to do and how to steer them to come to a good and reliable solution that can really put out there.

Next, I will likely releae the API product and a skill on the clawhub to see if people are willing to use it and maybe even pay some many for this. The platform will just charge the costs for aseembly and will most likely earn money but reusing the same transcript twice. On some podcasts i can also imagine prefetching the transcript and selling it cheapter than it would be doing it your self. This seems to be a nice chance to earn some money while providing a cost benefit to the end user. 
