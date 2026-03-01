---
title: "Set Up Tag Management and Consent the Stable, Secure Way (GTM, GA, and More) with Klaro Free"
date: 2026-03-01
description: "Draft guide for a stable and privacy-focused tracking setup using Google Tag Manager, Google Analytics, additional tracking providers, and a free Klaro consent banner."
---

## Introduction

This is a working draft article.

I will document the full setup step by step:

- Google Tag Manager (first)
- Website integration
- Google Analytics setup
- Additional tracking providers
- Klaro free consent banner as the central consent layer

## Who This Guide Is For

Placeholder text: Define the target audience (e.g., founders, marketers, developers, agencies).

## Prerequisites

Placeholder text: List required accounts, access rights, and technical prerequisites.

## Architecture Overview (Stable + Secure Tracking Stack)

Placeholder text: Add a simple overview of how GTM, consent mode, GA, and other providers interact through Klaro.

## Step 1: Google Tag Manager Setup

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

### Create Custom Triggers

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

### Create Variables

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

### Add Consent Mode Template Tag

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

### Add dataLayer Push Tag

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

### No Reload Tracking Behavior

To avoid requiring a page reload after consent changes, add `Custom - Consent Updated` as an additional trigger to key pageview-related tags. This is exactly what the `consentUpdated` event is for.

## Step 2: Website Integration

Placeholder text: Add script placement and implementation details for the website.

### Notes

- TODO: Add header/body insertion points
- TODO: Add CMS/framework-specific notes
- TODO: Add staging vs production handling

## Step 3: Google Analytics (GA4) Setup

Placeholder text: Add GA4 property, stream, and event configuration details.

### Notes

- TODO: Add basic events and conversions
- TODO: Add debug and validation flow
- TODO: Add data retention and privacy settings

## Step 4: Additional Tracking Providers

Placeholder text: Add Meta Pixel, LinkedIn, TikTok, or other providers as needed.

### Notes

- TODO: Add provider-by-provider setup checklist
- TODO: Add consent category mapping
- TODO: Add fallback behavior if consent is denied

## Step 5: Klaro Free Consent Banner Setup

Placeholder text: Add Klaro setup, configuration, and GTM/Consent Mode integration.

### Notes

- TODO: Add installation steps for free version
- TODO: Add consent categories and default states
- TODO: Add callback/event hooks to control tags

## Verification Checklist

Placeholder text: Add final QA checklist for correctness and compliance.

## Troubleshooting

Placeholder text: Add common issues and fixes (tag not firing, consent mismatch, duplicate pageviews, etc.).

## Change Log

- 2026-03-01: Initial placeholder structure created.
