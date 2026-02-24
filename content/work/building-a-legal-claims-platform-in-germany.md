---
title: "Building a Legal Claims Platform in Germany (2021–2026): Product, Growth, and Hard Lessons"
date: 2026-02-24
description: "How I co-founded and later sold a legal claims platform in Germany: from scrappy landing pages and manual operations during Corona to a scaled case-processing platform, a seven-digit settlement payout, and the hard constraints of regulated markets."
---

## Introduction

From 2021 to 2026, I spent a large part of my time building a company that tried to help consumers in Germany get money back through legal claims they would usually never pursue on their own.

At a high level, the idea was simple:

Take a process that feels intimidating, slow, and legal-heavy, and turn it into something a normal person can actually complete.

In practice, that meant building much more than a website. We built landing pages, intake flows, internal tooling, customer portals, document generation, case tracking, and a messy-but-effective operational engine behind it all.

This post is not a sales story. The company was sold in 2024. I am writing this as an honest build log and portfolio artifact: what we built, how we grew, what worked, what broke, and what I learned about product, operations, and regulated markets.

## The Starting Point: A Real Problem, Bad UX, and a Timing Window

The company started in early 2021, around the Corona period, when a lot of consumer pain points became more visible and more urgent.

The pattern we saw was consistent:

- People had legitimate claims.
- The legal path felt too complicated or too slow.
- Most people gave up before even starting.

That gap looked like a product problem as much as a legal one.

Our thesis was that we could translate legal complexity into a guided digital process:

- clear entry points (landing pages),
- simple intake flows,
- transparent case status,
- and operational execution in the background.

We focused heavily on gambling-related claims later, but that was not where the story started.

The first topic we explored was false or illegitimate fee increases in private health insurance. We never ended up processing a single case there, but the early signals were still important: customers clearly wanted help and were actively looking for solutions to recover money.

The blocker was not demand. It was feasibility.

At the time, customers needed an actuarial assessment to calculate the legitimate fee increase and compare it against the incorrect one. Those assessments were rare and expensive. One assessment could cost around 10,000 EUR, which was not realistic for us in the very early stage.

That experience shaped our thinking early: a promising claim category is not enough. The economics and execution prerequisites have to work too.

## Phase 1: Scrappy Validation (Landing Pages + Manual Work)

The first version was not a platform in the modern sense. It was a set of focused landing pages, simple forms, and a lot of manual execution.

That was intentional.

We did not start by building a perfect system. We started by trying to answer a practical question:

Would people actually trust a new company enough to submit a legal claim online?

The answer was yes, but only if the entry point was extremely clear.

One of the biggest early advantages came later from distribution timing in the gambling claims category. We were effectively one of the first dedicated websites in Germany for this specific topic. When media outlets started covering it, people searched for the issue and found us.

That produced our best customers.

We tested other channels over time:

- lead partners,
- paid search,
- paid social,
- and other distribution arrangements.

But in this category, high-intent organic traffic consistently performed better than traffic we could buy. People arriving from search already understood the problem and were actively looking for help. That changed everything for conversion quality and case quality.

## A Surprising Early Case: Gym Lockdown Refunds

One of the most operationally intense early cases had nothing to do with gambling.

During the lockdowns, many gyms were closed while customers were still being charged membership fees. People realized they might be able to reclaim those fees.

We built a flow around that and helped customers generate and send claims letters to their gyms.

The business model was simple: a fixed fee (around 20 EUR per customer).

What made it interesting was not the pricing. It was the volume.

We processed this for hundreds of customers, eventually around the low-thousands range, and it worked surprisingly well with the early tooling we had built ourselves.

This was one of the first moments where I saw how much leverage software gives you in an operations-heavy business.

Once the intake data was structured, we could generate letters in batches, print them, prepare envelopes, and send large weekly mail drops. There were Fridays where the workflow looked less like a startup and more like a micro fulfillment operation: stacks of letters, envelopes everywhere, and repeated trips to the post office.

It was chaotic, but it worked.

It also generated meaningful early revenue and gave us confidence that we could turn legal/administrative workflows into software-supported processes.

Just as important, this case gave us the opportunity to build one of the most valuable technical capabilities in the whole company: document generation.

The gym refunds workflow depended on generating large numbers of customer-specific letters reliably. Building that pipeline forced us to think about structured input data, templates, variable mapping, formatting edge cases, and batch operations much earlier than we otherwise would have.

That investment paid off far beyond this one claim type. Document generation became a core building block we reused across later cases and internal processes.

This was also a branding milestone for us.

Before that, we had mostly used cheap Webflow templates and case-specific domains like `pkv-cashback.de` and `glueckzurueck.de`. For the gym topic, we published a landing page under our company brand for the first time and presented the service as **Fine Legal**.

That sounds like a small change, but it mattered. It was the point where the project started to feel less like a set of experiments and more like an actual company with a recognizable identity.

{{< figure src="/images/fine-legal-platform-evolution-2021-2023.webp" alt="Early evolution of the Fine Legal website and platform" caption="Early evolution of our website and platform: from case-specific landing pages and simple flows to a more cohesive product and customer portal experience." class="blog-post-figure" >}}

## Phase 2: From Service to Platform

As volume increased, the constraints became obvious.

The hard part was no longer "Can we get users?" It was:

- How do we process cases reliably?
- How do we keep customers informed?
- How do we reduce manual work without losing quality?
- How do we coordinate with legal and financing partners?

That is where the product shifted from simple acquisition flows to a real platform.

Over time, we built tooling for:

- intake and case qualification,
- document generation,
- case operations and status handling,
- customer communication,
- partner handoffs,
- and internal visibility into where cases were stuck.

The most important product decision was transparency.

Legal processes are slow, and customers get anxious when nothing appears to happen. A customer portal with status tracking was not just a "nice feature." It was part of the core product because it reduced support load and increased trust at the same time.

## Distribution: Why Organic Search Won

I learned more about growth from this company than from most "growth advice" online.

We tested multiple acquisition channels, but the strongest pattern stayed the same:

Organic search brought the highest-intent users and the best-performing cases.

The reason seems obvious in hindsight. In a category like legal claims, intent matters more than reach.

A person who searches for a specific legal issue after reading a news article is already trying to solve a problem. They are not browsing. They are not "top of funnel." They need help now.

That meant our landing pages were not just marketing assets. They were product surfaces. Their job was to:

- explain the claim in plain language,
- build credibility quickly,
- show what happens next,
- and make the first step feel safe.

This also influenced roadmap decisions. Improvements to copy, structure, and onboarding UX often had the same impact as "growth work," "product work," and "ops work" at once.

## The Partner Ecosystem (And Why It Mattered)

Another big part of the story was the ecosystem around the product.

We were not operating in isolation. Claims businesses like this sit between multiple players:

- consumers,
- law firms,
- litigation finance companies,
- and lead or matching partners.

In the early phase, we also worked as an operating layer for a litigation finance company. In practice, that meant we handled customer support and case operations while they financed cases and paid a law firm.

That relationship did two important things for us:

1. It generated revenue that helped sustain our company.
2. It taught us how the full process worked end-to-end in the real world.

It also helped us build the network we later needed for our own core cases, including law firm relationships and litigation finance partners.

Later, we also generated revenue by providing leads to third parties (for example litigation finance or matching companies), depending on the claim type and market conditions.

From a product perspective, this created a constant integration challenge: different workflows, different requirements, different handoff points. Building a system that could support that variability without collapsing into manual chaos was one of the hardest parts.

Over time, we also broadened the range of services we offered. By the later stages of the company, this included claim or legal-support offerings such as:

- passenger rights,
- Ruerup cashback,
- nursing law,
- severance pay,
- and termination of ordinary consumer products.

This expansion reinforced the same product lesson again: once the operational core is flexible enough, new claim categories become less about rebuilding from scratch and more about adapting workflows, documents, and partner processes.

## Peak Milestone: The 2022 Mass Settlement Before Christmas

The most meaningful moment of the whole journey happened in late 2022.

In November/December 2022, right before Christmas, we closed the biggest mass settlement we had achieved up to that point (and ultimately the biggest one we ever handled) against a large casino operator with headquarters in Malta.

We paid out a seven-digit total amount to consumers in Germany right before Christmas.

The financial milestone mattered, of course. But what stayed with me were the customer messages.

Many of the people behind these claims were not just "users" in the usual startup sense. A lot of them had lost significant money, were in debt, felt ashamed, and had gone through isolation during the Corona period. Some wrote to us around Christmas to say thank you, not just because of the payout, but because they felt a sense of justice.

That was the strongest validation of the original thesis:

If you make a difficult legal process accessible and operationally reliable, you can create real impact for people who would otherwise never see that outcome.

## Market Reality: Enforceability Is a Product Constraint

After that peak, the market became much harder.

Several things changed at the same time:

- tighter regulation,
- Malta-related protection and enforceability issues,
- and slower court throughput in Germany due to heavy system load and other mass claims.

The practical result was that even if demand existed, execution became less predictable and less scalable. In a regulated market, it is not enough to have a good user experience and a good intake funnel. If claims become harder to enforce, the product itself becomes less viable.

This was one of the hardest lessons in the entire company:

In some categories, legal enforceability is not a backend detail. It is a core product dependency.

## Exit and Market Shift

We sold the company in 2024.

After the sale, the market conditions and enforcement dynamics had changed significantly from the window where we had our strongest traction.

I am including this part because it matters.

It is easy to write startup stories that end at the peak milestone and stop there. But a complete build story includes the changing constraints, the timing, and the parts that are no longer controllable through product execution alone.

## What I Personally Owned

One reason I wanted to write this post is that the company will disappear as a public artifact, but the work and lessons should not.

The parts I personally drove included:

- **Product discovery and prioritization**  
  Translating legal/operational friction into product requirements, defining MVP scope, and iterating based on real case throughput.

- **Landing pages and onboarding flows**  
  Building and improving the entry points that converted high-intent organic traffic into qualified case intake.

- **Platform and internal tooling**  
  Designing and building workflows for intake, tracking, document generation, case handling, and partner coordination.

- **Customer transparency features**  
  Building portal and tracking experiences that reduced support pressure and increased trust in slow-moving processes.

- **Operations scaling**  
  Turning repeatable manual tasks (like high-volume document and letter workflows) into semi-automated or automated processes.

- **Partner process integration**  
  Adapting product and ops flows to work with law firms, litigation finance companies, and lead/matching partners.

## Later Product Maturity (Portal, AI Features, and Case Discovery)

Over time, the platform became much more than intake + status tracking.

We built more advanced portal capabilities, including features like:

- document analysis support,
- questionnaires to profile customers and identify additional relevant cases,
- discovery/explore surfaces,
- and more detailed case tracking across process stages.

These features came from the same core principle as the early product: reduce friction, increase clarity, and make complex processes feel understandable.

One area I am particularly proud of was the introduction of customer-facing AI features, especially around document analysis and guidance.

Instead of using AI only internally, we integrated generative AI-powered functionality directly into the customer experience. The goal was practical, not flashy: help users understand legal documents faster, reduce confusion, and guide them toward the next useful step in the process.

For customers, legal paperwork is often where momentum dies. Documents are long, technical, and emotionally loaded. By adding AI-assisted analysis and explanations, we tried to lower that barrier and make the portal feel more like a guided process than a static case dashboard.

At the time, this was still very early for the German market, especially in a customer-facing legal-service context. To the best of my knowledge, this was one of the first customer-facing generative AI-powered features in this space in Germany.

That mattered to me for two reasons:

- It created real user value in a high-friction moment.
- It showed that we could adopt new technology pragmatically and ship it inside a regulated, trust-sensitive product.

The important lesson was not just "AI is useful." It was that AI works best when it is embedded into a concrete workflow with a clear user job, clear boundaries, and a visible next action.

{{< figure src="/images/fine-legal-landing-pages-portfolio.webp" alt="Landing pages used across claim categories" caption="A showcase of landing pages across different claim categories. These pages were a core part of our product system because they combined education, trust-building, and conversion for high-intent users." class="blog-post-figure" >}}

{{< figure src="/images/fine-legal-platform-final-showcase.webp" alt="Final showcase of the Fine Legal platform" caption="Final showcase of the platform: a more mature customer experience built from years of iterating on intake, case workflows, transparency, and guidance." class="blog-post-figure" >}}

## Hard Lessons (That Still Apply Outside Legal Tech)

A few lessons from this company now feel portable to almost any product role:

- **High-intent organic traffic can outperform paid channels by a lot**  
  Especially when users are actively searching for a solution to a painful, specific problem.

- **Operations becomes your product much faster than you expect**  
  If the workflow is high-volume and repeatable, software leverage comes from turning operational steps into systems.

- **Trust is a feature**  
  In slow or complex processes, transparency and clear status communication are core product functionality.

- **Partnerships can accelerate you and constrain you**  
  They bring distribution, financing, and execution capacity, but they also introduce dependency and complexity.

- **Regulatory and enforceability risk is not "external"**  
  In regulated markets, those constraints shape the product roadmap, economics, and long-term viability.

## Final Thoughts

This company was one of the most formative things I have built.

It forced me to work across product, engineering, operations, growth, and partnerships at the same time, with real users and real consequences. It also taught me that timing and market structure matter just as much as execution.

I am proud of what we built, especially the periods where the product actually helped people get money back and feel that they had been treated fairly.

And I am equally glad to document it honestly, including the parts that got harder later.

## Thank You

This company was never a solo effort.

I am deeply thankful to the team members, partners, and everyone who supported us over the years and throughout the whole journey.

Building in a complex market with real customer impact required trust, resilience, and a lot of effort from many people behind the scenes. I learned a lot from working with you.

I also want to thank my wife for her support, patience, and encouragement throughout the ups and downs of building the company.

If you are reading this because you are evaluating my background for a product or technical role, this is the kind of work I enjoy most: building end-to-end systems in messy domains, turning ambiguity into workflows, and improving outcomes for real users under real constraints.

{{< figure src="/images/fine-legal-customer-facing-ai-features.webp" alt="Customer-facing AI features in the Fine Legal portal" caption="One of our early customer-facing generative AI-powered features in the German market: AI-assisted document analysis and guidance inside the customer portal." class="blog-post-figure" >}}
