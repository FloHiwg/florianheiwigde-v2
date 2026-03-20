# Podfetcher Table + Demo Chat Style Guide

This guide captures the visual language that already exists across:

- the styled results table in the legal RAG article
- the Podfetcher demo chat in the transcript API article

The goal is not to create a second design system. The goal is to make the current style explicit and reusable so future tables, demo chats, product snapshots, and lightweight UI cards feel like part of the same family.

## 1. Style Direction

The shared design language is:

- warm, productized, and editorial rather than sterile SaaS
- precise and data-friendly without looking like a dashboard
- soft card surfaces with restrained contrast and strong content hierarchy
- human body copy supported by technical accents through mono typography

The table currently contributes the clearest sense of structure, especially through:

- small uppercase mono labels
- mono metrics and pills
- strong left-to-right reading hierarchy
- compact but deliberate spacing

That table language should be used more often in the chat component and in future product demo blocks.

## 2. Core Typography

### Primary font roles

| Role | Font | Use |
|---|---|---|
| Editorial headings | `Merriweather` | Article titles and larger section headings only |
| Interface/body | `Inter` | Paragraphs, chat bubbles, descriptive text, captions |
| Technical/data accent | `JetBrains Mono` | Eyebrows, table headers, metrics, pills, status chips, lightweight metadata |

### Typography principle

Use `JetBrains Mono` more aggressively for interface framing, not for long reading blocks.

Good candidates:

- chat header status
- chat participant labels
- episode metadata
- summary section labels
- table pills and small comparative metrics

Avoid:

- full bubble text in mono
- long captions in mono
- large headlines in mono

## 3. Font Sizes

All sizes below assume a `16px` root size.

### Shared scale

| Token intent | Rem | Px | Recommended use |
|---|---:|---:|---|
| Micro label | `0.72rem` | `11.52px` | Eyebrows, uppercase labels, table headers, speaker tags |
| Status/meta small | `0.78rem` to `0.84rem` | `12.48px` to `13.44px` | Pills, status chips, secondary interface text |
| Body compact | `0.94rem` | `15.04px` | Captions, secondary explanations, metric values |
| Body default | `0.98rem` | `15.68px` | Table content, chat bubbles, topbar title |
| Section interface emphasis | `1rem` to `1.125rem` | `16px` to `18px` | Component titles or small standalone headings |

### Current component mapping

| Element | Current size |
|---|---:|
| Table header labels | `0.72rem` |
| Table eyebrow | `0.72rem` |
| Delta pills | `0.78rem` |
| Chat status | `0.8rem` |
| Chat subtitle | `0.84rem` |
| Chat topbar title | `0.98rem` |
| Chat bubbles | `0.98rem` |
| Chat labels | `0.72rem` |
| Chat caption | `0.94rem` |

## 4. Type Rules By Component

### Table

- Use `JetBrains Mono` for eyebrow text, metrics, and delta pills.
- Keep setup names in `Inter` with semibold weight.
- Keep the summary sentence in `Inter` and reserve the accent color for the highlighted values.

### Demo chat

- Keep bubble text in `Inter`.
- Move more of the framing text toward the table language:
  - set the topbar subtitle in `JetBrains Mono`
  - set the status pill in `JetBrains Mono`
  - optionally set participant labels in `JetBrains Mono` instead of only uppercase sans
  - use mono for episode metadata if that gets added later

### Heading balance

- `Merriweather` should stay reserved for page-level editorial structure.
- Inside embedded UI cards, prefer `Inter` plus `JetBrains Mono`.
- This keeps the UI looking product-like instead of blending into article prose.

## 5. Color System

## 5.1 Shared site tokens

| Token | Light | Dark | Meaning |
|---|---|---|---|
| Background | `#F4F2EB` | `#1C1C1C` | Page background |
| Foreground | `#1A1A1A` | `#F0F0F0` | Primary text |
| Secondary surface | `#E6E4DD` | `#2C2C2C` | Soft UI background |
| Border | `#D1D1C7` | `#333333` | Neutral divider/border |
| Muted text | `#666660` | `#999999` | Secondary copy |
| Primary accent | `#D97757` | `#E08866` | Warm brand accent |

## 5.2 Table palette

### Light table surfaces

| Element | Value |
|---|---|
| Card border | `rgba(217, 119, 87, 0.18)` |
| Card radial accent | `rgba(217, 119, 87, 0.12)` |
| Card gradient start | `rgba(255, 255, 255, 0.96)` |
| Card gradient end | `rgba(230, 228, 221, 0.9)` |
| Row base | `rgba(255, 255, 255, 0.9)` |
| Baseline row | `rgba(209, 209, 199, 0.28)` |
| Best row border | `rgba(217, 119, 87, 0.22)` |
| Best row gradient | `rgba(255, 246, 241, 0.98)` to `rgba(255, 236, 228, 0.88)` |

### Dark table surfaces

| Element | Value |
|---|---|
| Card border | `rgba(224, 136, 102, 0.22)` |
| Card radial accent | `rgba(224, 136, 102, 0.14)` |
| Card gradient start | `rgba(44, 44, 44, 0.92)` |
| Card gradient end | `rgba(37, 37, 37, 0.98)` |
| Row base | `rgba(255, 255, 255, 0.03)` |
| Baseline row | `rgba(255, 255, 255, 0.05)` |
| Best row gradient | `rgba(224, 136, 102, 0.18)` to `rgba(224, 136, 102, 0.1)` |

### Delta semantic colors

| Meaning | Light | Dark |
|---|---|---|
| Neutral pill bg | `rgba(102, 102, 96, 0.12)` | `rgba(255, 255, 255, 0.08)` |
| Positive pill bg | `rgba(47, 124, 90, 0.14)` | `rgba(90, 175, 124, 0.18)` |
| Positive pill text | `#1f6a49` | `#96e1b2` |
| Negative pill bg | `rgba(165, 61, 45, 0.14)` | `rgba(196, 92, 74, 0.2)` |
| Negative pill text | `#8c372a` | `#f2a89a` |

## 5.3 Podfetcher chat palette

### Light chat surfaces

| Element | Value |
|---|---|
| Frame border | `rgba(24, 33, 38, 0.1)` |
| Frame gradient | `rgba(255, 252, 247, 0.98)` to `rgba(246, 239, 229, 0.96)` |
| Frame shadow | `rgba(43, 35, 23, 0.12)` |
| Divider | `rgba(24, 33, 38, 0.08)` |
| Title text | `#192328` |
| Muted text | `#5d6a70` |
| Status dot | `#2e9f5d` |
| User bubble | `#1f3f3f` |
| User text | `#f2f7f4` |
| Agent bubble | `#fbf5ee` |
| Agent text | `#192328` |
| Agent label | `#d85f3b` |
| Typing dot | `rgba(216, 95, 59, 0.78)` |

### Dark chat surfaces

| Element | Value |
|---|---|
| Frame border | `rgba(255, 255, 255, 0.08)` |
| Frame gradient | `rgba(43, 39, 34, 0.98)` to `rgba(30, 28, 26, 0.98)` |
| Frame shadow | `rgba(0, 0, 0, 0.34)` |
| Divider | `rgba(255, 255, 255, 0.08)` |
| Title text | `#f3eee7` |
| Muted text | `#c2b8aa` |
| Status dot | `#58c27d` |
| User bubble | `#274948` |
| User text | `#eff7f3` |
| Agent bubble | `#322d28` |
| Agent text | `#f3eee7` |
| Agent label | `#f09b73` |
| Typing dot | `rgba(240, 155, 115, 0.9)` |

## 6. Recommended Unified Palette

To make the table and chat feel more related, use the following shared accents:

| Shared role | Recommended value |
|---|---|
| Warm highlight | `#D97757` light, `#E08866` dark |
| Technical neutral text | `#666660` light, `#999999` dark |
| Success accent | `#2e9f5d` or `#58c27d` |
| Deep product green | `#1f3f3f` light use, `#274948` dark use |
| Warm surface | `#fbf5ee` or `rgba(255, 252, 247, 0.98)` |

Practical rule:

- keep the chat’s green user bubble
- keep the table’s warm orange highlight
- use the warm orange for labels and metadata more consistently across both

## 7. Spacing and Shape

### Radius scale

| Element | Radius |
|---|---:|
| Base site radius token | `0.5rem` |
| Table card | `1.25rem` |
| Chat frame | `1.6rem` |
| Bubbles and typing chips | `1.35rem` |
| Row corners | `0.95rem` |
| Message tail corner | `0.45rem` |
| Pills/status chips | `999px` |

### Padding and spacing

| Element | Value |
|---|---|
| Table card padding | `1.25rem` |
| Table cell padding | `0.95rem 1rem` |
| Table header bottom gap | `0.75rem` |
| Chat frame padding | `1rem` |
| Chat log top padding | `1rem` |
| Bubble padding | `0.95rem 1rem` |
| Typing padding | `0.8rem 0.95rem` |
| Vertical message gap | `0.8rem` |

### Shape principle

- outer containers should feel soft and productized
- inner message and row blocks should be slightly tighter than the outer frame
- pills should always be fully rounded

## 8. Motion

### Existing motion language

| Element | Motion |
|---|---|
| Chat step reveal | `420ms ease` with `translateY(18px)` entry |
| Typing dots | `1s infinite ease-in-out` bounce |
| Table row hover | `0.2s ease` lift and shadow |

### Recommended motion rules

- use reveal motion for narrative demo components
- use very restrained hover motion for data tables
- avoid bouncy motion except for typing or explicit “processing” states

## 9. Component Rules

## 9.1 Table rules

- Headers should stay small, uppercase, and preferably mono.
- Numeric columns should be right-aligned.
- Metrics should use `JetBrains Mono`.
- Use pills for deltas, statuses, or confidence values.
- Highlight only one primary row at a time.
- If there is a benchmark row, mute it instead of accenting it.

## 9.2 Demo chat rules

- Keep message content readable and sentence-first.
- Use typography to separate system framing from message content.
- Keep user bubbles darker and more saturated than agent bubbles.
- Agent bubbles should feel softer, warmer, and slightly more editorial.
- System/typing states should read as operational metadata, not as a full message.

## 9.3 Shared “embedded product demo” rules

- Top bar or eyebrow should look like interface chrome, not article copy.
- Use mono for status, labels, and metadata.
- Use Inter for explanatory and conversational text.
- Use the warm orange accent sparingly for emphasis, labels, and best-state highlighting.

## 10. Where To Use More Table Typography

This is the main recommended refinement.

### Apply `JetBrains Mono` to:

- chat subtitle under “Agent Workflow Example”
- chat status pill text
- speaker labels like “Florian” and “Paul”
- any future episode metadata line
- any future result chips inside the chat

### Keep `Inter` for:

- user and agent message bodies
- summary bullets
- captions and explanatory paragraphs

### Do not apply mono to:

- large UI headings
- paragraph-length explanations
- long list items

## 11. Suggested Token Set For Future Reuse

If these patterns get extracted later, use tokens like:

```css
--demo-accent-warm: #D97757;
--demo-accent-warm-dark: #E08866;
--demo-surface-warm: #fbf5ee;
--demo-surface-neutral: rgba(255, 255, 255, 0.9);
--demo-surface-deep: #1f3f3f;
--demo-text-strong: #192328;
--demo-text-muted: #5d6a70;
--demo-text-muted-dark: #c2b8aa;
--demo-font-body: 'Inter', system-ui, sans-serif;
--demo-font-data: 'JetBrains Mono', monospace;
--demo-font-editorial: 'Merriweather', serif;
--demo-radius-panel: 1.25rem;
--demo-radius-bubble: 1.35rem;
--demo-radius-pill: 999px;
```

## 12. Implementation Summary

If you want the easiest alignment between the table and the Podfetcher demo chat, make these changes first:

1. Use `JetBrains Mono` for chat subtitle, status, and speaker labels.
2. Reuse the table’s eyebrow pattern for small UI headers and metadata lines.
3. Reuse the table pill styling for any future chat metadata chips.
4. Keep `Inter` for chat body text so the component remains readable.
5. Keep `Merriweather` outside embedded UI components unless there is a strong editorial reason.

That gives you a clearer family resemblance without making the chat feel like a data table or making the table feel like a chat app.
