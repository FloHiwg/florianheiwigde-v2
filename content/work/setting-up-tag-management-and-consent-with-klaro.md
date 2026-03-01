---
title: "Setting Up Tag Management and Consent with GTM, Klaro, and GA4"
date: 2026-03-01
description: "A practical setup for managing consent and tracking with Google Tag Manager, Klaro, GA4, and additional providers without blocking engineering workflows."
---

## Introduction

When teams hardcode tracking directly into the website, every small change becomes an engineering task. That slows down campaigns, creates handoff friction, and turns basic tracking updates into deployment work.

This setup moves operational tracking work into Google Tag Manager. Marketing and other non-engineering teams can update tags and logic directly, while engineering keeps ownership of the core platform. In practice, that means faster iteration and fewer bottlenecks.

It is also easier to maintain. GTM gives you a clear debugging workflow for tags, triggers, variables, and data layer events, so problems can be verified quickly instead of guessed.

In this guide, I document the complete flow step by step:

- Google Tag Manager (first)
- Website integration
- Google Analytics setup
- Additional tracking providers
- Klaro free consent banner as the central consent layer

## Who This Is For

This guide is for founders, marketers, and developers who want a consent-aware setup that is easy to operate without constant engineering support.

## Prerequisites

- Access to your Google Tag Manager container
- Access to website templates/layouts to place GTM snippets
- Klaro script access via CDN
- A published privacy policy page (used in Klaro translations)

## Architecture Overview

High-level flow:

1. Klaro is loaded via GTM as early as possible.
2. Consent choices are stored in the Klaro cookie.
3. GTM variables read that cookie and convert values to consent mode signals.
4. Consent Mode updates what can fire (analytics, ads, personalization, etc.).
5. Custom consent events update tag behavior without forcing a page reload.

## Step 1: Configure GTM and Klaro

First, create a GTM `Custom HTML` tag that loads the consent banner.

- Tag name: `Klaro - Consent Banner`
- Tag type: `Custom HTML`
- Trigger: `Consent Initialization - All Pages` (this should be the only trigger)

Use this stripped setup (Google Analytics only), with styling aligned to the website design tokens:

```html
<link rel="stylesheet" href="https://cdn.kiprotect.com/klaro/v0.7.18/klaro.min.css" />

<style>
  #klaro .cookie-notice {
    background: var(--card, #ffffff);
    color: var(--foreground, #1a1a1a);
    border: 1px solid var(--border, #d1d1c7);
    border-radius: calc(var(--radius, 0.5rem) + 0.25rem);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    padding: 1rem;
    max-width: 380px;
  }

  #klaro .cookie-modal .cm-modal {
    background: var(--card, #ffffff);
    color: var(--foreground, #1a1a1a);
    border: 1px solid var(--border, #d1d1c7);
    border-radius: calc(var(--radius, 0.5rem) + 0.25rem);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
  }

  #klaro h3 {
    margin: 0 0 0.75rem;
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 600;
  }

  #klaro p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  .klaro .cookie-modal a,
  .klaro .context-notice a,
  .klaro .cookie-notice a,
  .cm-link {
    color: var(--primary, #d97757) !important;
  }

  .cm-btn {
    border-radius: var(--radius, 0.5rem) !important;
    padding: 0.6rem 1rem !important;
    font-weight: 600 !important;
    border: 1px solid var(--border, #d1d1c7) !important;
  }

  .cm-btn-success {
    background: var(--primary, #d97757) !important;
    border-color: var(--primary, #d97757) !important;
    color: var(--primary-foreground, #ffffff) !important;
  }

  .cm-btn-danger {
    background: var(--card, #ffffff) !important;
    color: var(--foreground, #1a1a1a) !important;
  }

  .cm-link.cn-learn-more {
    background: var(--secondary, #e6e4dd) !important;
    border: 1px solid var(--border, #d1d1c7) !important;
    border-radius: var(--radius, 0.5rem) !important;
    padding: 0.6rem 1rem !important;
    color: var(--foreground, #1a1a1a) !important;
  }

  .klaro .cookie-modal .cm-list-input:checked + .cm-list-label .slider,
  .klaro .context-notice .cm-list-input:checked + .cm-list-label .slider,
  .klaro .cookie-notice .cm-list-input:checked + .cm-list-label .slider {
    background: var(--primary, #d97757) !important;
  }

  @media (max-width: 1024px) {
    #klaro .cookie-notice {
      max-width: calc(100vw - 2rem);
    }
  }
</style>

<script>
  var klaroConfig = {
    testing: false,
    elementID: "klaro",
    styling: {
      theme: ["light", "bottom", "left"]
    },
    storageMethod: "cookie",
    storageName: "klaro",
    htmlTexts: true,
    cookieExpiresAfterDays: 365,
    default: false,
    cookieDomain: ".florianheiwig.de",
    mustConsent: false,
    acceptAll: true,
    hideDeclineAll: true,
    hideLearnMore: false,
    noticeAsModal: false,
    translations: {
      de: {
        privacyPolicyUrl: "/privacy",
        consentNotice: {
          description: "Wir verwenden Cookies, um die Website zu verbessern. Details findest du in der Datenschutzerklarung.",
          learnMore: "Auswahlen"
        },
        ok: "Alles klar",
        consentModal: {
          title: "Cookie Einstellungen",
          description: "Hier kannst du einsehen und anpassen, welche Informationen wir sammeln."
        },
        purposes: {
          analytics: {
            title: "Besucher Statistiken"
          }
        }
      },
      en: {
        privacyPolicyUrl: "/privacy",
        consentNotice: {
          title: "Cookie Settings",
          description: "We use cookies to improve the website. Details are available in our privacy policy.",
          learnMore: "Select"
        },
        ok: "Accept all",
        consentModal: {
          title: "Consent Settings",
          description: "Here you can review and manage which information we collect."
        },
        purposes: {
          analytics: {
            title: "Analytics"
          }
        }
      }
    },
    services: [
      {
        name: "Google Analytics",
        default: false,
        translations: {
          de: {
            title: "Google Analytics",
            description: "Google Analytics ist ein Webanalyse Dienst der Google LLC."
          },
          en: {
            title: "Google Analytics",
            description: "Google Analytics is a web analytics service provided by Google LLC."
          }
        },
        purposes: ["analytics"]
      }
    ]
  };
</script>

<script defer src="https://cdn.kiprotect.com/klaro/v0.7.18/klaro.js"></script>
```

Implementation notes:

- Replace `cookieDomain` with your production root domain if needed.
- If your privacy page slug is not `/privacy`, update `privacyPolicyUrl`.
- Keep this tag as the consent gate before any GA4 page view or event tags fire.
- In GTM, open `Advanced Settings` -> `Consent Settings` and set this tag to `No additional consent required` (this banner tag itself must always load to collect consent).

### Create custom triggers

After creating the banner tag, add the following triggers in GTM:

1. `Consent - Update Click`
Type: `Click - All Elements`
Condition: `Click Classes` `contains` `cm-btn`

2. `Custom - Consent Updated`
Type: `Custom Event`
Event name: `consentUpdated`

3. `Custom - Consent Choice`
Type: `Custom Event`
Event name: `consentChoice`

### Create variables

Add these GTM variables:

1. `Cookie - Klaro`
Type: `1st Party Cookie`
Cookie Name: `klaro`

2. `GTM Consent State`
Type: `Variable Template` (from Gallery)
Template Name: `GTM Consent State`
Purpose: Store/read the current consent state.

3. `cjs - Analytics Consent`
Type: `Custom JavaScript`
Code:

```javascript
function () {
  var cookie = {{Cookie - Klaro}};
  if (!cookie) return "denied";

  var json = JSON.parse(cookie);
  if (json["Google Analytics"]) {
    return "granted";
  } else {
    return "denied";
  }
}
```

If you plan to use additional consent types (for example marketing/ad storage), create equivalent `cjs` variables for each consent mode signal you need.

### Add the Consent Mode template tag

Add a new tag from the GTM Gallery:

- Tag template: `Consent Mode (Google + Microsoft tags)`
- Purpose: Propagate the `cjs` variable values into GTM consent mode, so tags can be allow-listed or blocked automatically.

Map your `cjs` variables to the corresponding consent fields:

- Analytics fields: map to `cjs - Analytics Consent` if you only use analytics.
- Ads/personalization fields: map only if you actually collect those categories.
- Functionality/security: usually `granted`, but you can also bind them to variables if required by your policy setup.

Trigger this tag on:

1. `Initialization - All Pages`
2. `Custom - Consent Choice`

### Add the dataLayer push tag

Create another GTM `Custom HTML` tag:

- Tag name: `Consent cHTML - Datalayer push`
- HTML:

```html
<script>
  (function () {
    window.setTimeout(function () {
      window.dataLayer.push({ event: "consentChoice" });
    }, 500);
    window.setTimeout(function () {
      window.dataLayer.push({ event: "consentUpdated" });
    }, 1000);
  })();
</script>
```

- Consent setting: `No additional consent required`
- Trigger: `Consent - Update Click`

### Enable no-reload tracking updates

To avoid requiring a page reload after consent changes, add `Custom - Consent Updated` as an additional trigger to key pageview-related tags. This is exactly what the `consentUpdated` event is for.

## Step 2: Website Integration

Add GTM snippets in your website templates once, then keep ongoing tracking logic in GTM.

### Notes

- Place GTM `<script>` in `<head>` and GTM `<noscript>` right after opening `<body>`.
- Keep container IDs environment-specific (staging vs production) if needed.
- Avoid hardcoded analytics scripts in page templates when GTM is the source of truth.

## Step 3: Google Analytics (GA4) Setup

Configure GA4 through GTM and bind GA4 tags to consent mode behavior.

### Notes

- Create GA4 Configuration and event tags in GTM.
- Ensure analytics tags respect consent signals.
- Use GTM Preview plus GA4 DebugView to validate events and parameters.

## Step 4: Additional Tracking Providers

Add additional vendors (for example Meta, LinkedIn, TikTok) only after consent mapping is defined.

### Notes

- Map each provider to a clear consent category.
- Use the same trigger/event model (`consentChoice`, `consentUpdated`) for consistency.
- Confirm denied consent paths actually block tag firing.

## Step 5: Klaro Free Consent Banner Setup

Klaro is the consent interface and source of consent state in this setup.

### Notes

- Keep service definitions aligned with the tools you actually run.
- Keep translation text and privacy links up to date.
- Keep defaults conservative and explicit.

## Verification Checklist

- Confirm `Klaro - Consent Banner` fires on `Consent Initialization - All Pages`.
- Confirm `Consent Mode (Google + Microsoft tags)` fires on initialization and `consentChoice`.
- Confirm `Consent cHTML - Datalayer push` fires on `Consent - Update Click`.
- Confirm `consentChoice` and `consentUpdated` appear in `dataLayer`.
- Confirm analytics tags fire only when expected after consent changes.

## Troubleshooting

- No consent events in preview: verify `Consent cHTML - Datalayer push` trigger and click selector (`cm-btn`).
- Consent state not changing: verify `Cookie - Klaro` value and `cjs` variable parsing.
- Tags still blocked: verify Consent Mode template mapping and trigger execution order.
- Duplicate pageviews: verify pageview tags are not firing on both page load and consent update unintentionally.

## Wrap-Up

This approach keeps implementation flexible and reduces day-to-day coordination overhead between marketing and engineering. You can ship tracking changes faster, while still keeping consent control structured and auditable.

For validation, use GTM Preview/Debugger. It is straightforward to inspect which tags fired, which data layer events were pushed, and which consent states were active at each step. That visibility is the main reason this setup is practical to maintain.

## Change Log

- 2026-03-01: Initial placeholder structure created.
- 2026-03-01: Style and narrative aligned with other `work` articles.
