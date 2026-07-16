# Project Brief — Randall Fryer for Oregon House District 28

## What this is

Campaign website for **Randall Fryer**, Republican nominee for **Oregon House District 28**.
General election: **Tuesday, November 3, 2026**.

Randall is a retired physician (D.O., Family Medicine, rural emergency medicine), former
software professional, and former enlisted member of the Army Medical Corps. The site
positions him around five priorities: educational excellence, lower burden on working
families, a stronger business climate, safer communities, and government accountability.

**Tagline:** "A Stronger Oregon. A Better Tomorrow."

## Goals

1. Introduce the candidate and his record (About, Platform).
2. Convert visitors — volunteer sign-ups, donations, event RSVPs, newsletter/updates.
3. Field questions and issue reports from constituents (Ask Randall).
4. Distribute campaign creative (social media post gallery).

## Tech stack

| Layer      | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Framework  | Next.js 16.2.6 (App Router, JavaScript, `src/` layout)              |
| Styling    | Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)          |
| Motion     | GSAP 3.15 (+ SplitText, ScrollTrigger) and `motion/react` (Framer)  |
| Fonts      | `next/font` — Google + self-hosted (see Typography)                 |
| CRM/Forms  | GoHighLevel via API routes (`src/app/api/*`), SMS consent handling  |

> ⚠️ This Next.js version has breaking changes vs. older conventions — read
> `node_modules/next/dist/docs/` before writing framework code (see `AGENTS.md`).

## Brand system (Op1776 CI-0216)

### Palette

| Token         | Hex       | Role                                        |
| ------------- | --------- | ------------------------------------------- |
| `bone`        | `#f6f5f4` | Page background (off-white paper)           |
| `bone-soft`   | `#eceae8` | Card / alt-surface tint                     |
| `ink`         | `#0d1528` | Primary — midnight navy (headings, dark UI) |
| `ink-soft`    | `#1b2740` | Card surface on dark sections               |
| `signal`      | `#781830` | Campaign crimson (CTAs, accents)            |
| `signal-deep` | `#5e1326` | Crimson hover / duotone depths              |
| `ochre`       | `#d4a418` | Gold accent (dark-surface icons, dashes)    |
| `sage`        | `#304860` | Steel blue highlight (rarely used)          |
| `text`        | `#303030` | Warm charcoal body text                     |

**Color usage rules**

- Light sections: crimson is the accent (label dots, card icons, italic headline words).
- Dark (`ink`) sections: gold is the accent; text is `bone` at 55–75% opacity.
- Crimson (`signal`) band: used for the closing CTA section (Countdown); photo backdrops
  get a crimson duotone; buttons on it use the `bone` variant.
- Gold is never used for body text on cream (contrast) — only for marks, dashes, icons.

### Typography

| Role     | Face                 | Loaded via                                  |
| -------- | -------------------- | ------------------------------------------- |
| Headings | **Plus Jakarta Sans**| `next/font/google` → `--font-display`       |
| Body     | **Figtree**          | `next/font/google` → `--font-sans`          |
| Labels   | **Switzer**          | self-hosted variable woff2 in `src/assets/fonts/` → `--font-mono` |

- The `font-mono` Tailwind class is the **eyebrow/micro-label style** (11px, uppercase,
  `tracking-[0.28em]`) — it maps to Switzer, not an actual monospace.
- `.display-serif` is the heading utility (name is legacy; it maps to `--font-display`
  with tight tracking).

### Visual language

- Editorial/print aesthetic: fixed SVG paper-grain overlay, hairline rules at 10–18%
  ink opacity, corner-frame lines, duotone photo overlays, italic slogan marquee.
- Icons are **hand-drawn inline SVGs** (no icon library): 1.5 stroke, square caps,
  `currentColor`, usually set in an `h-11 w-11` hairline circle. See
  `src/sections/Endorsements.jsx` and `src/sections/pages/AboutPage.jsx`.
- Section labels carry a small brand dot (crimson on light, gold on dark/signal).

### Motion

- Signature ease: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out); variants in
  `src/animations/motion-variants.js`.
- Headings reveal via GSAP SplitText masks (`SplitReveal` component / Hero). Masks stay
  in the DOM; `globals.css` pads the clip windows (`.split-line-mask`, `.hero-word-mask`)
  so descenders and italic overshoot never clip — rising text starts at `yPercent: 130`
  to stay hidden under the enlarged window. Don't reintroduce `overflow-hidden` on
  heading line wrappers.
- Buttons are magnetic pills (cursor-follow spring + vertical word-wipe). Variants:
  `primary` (ink), `signal` (crimson), `outline`, `ghost`, `bone` (for dark surfaces).

## Site map

| Route                        | Purpose                                     |
| ---------------------------- | ------------------------------------------- |
| `/`                          | Hero → Why Running → Platform → Approach → Countdown (crimson CTA) |
| `/about`                     | Bio blocks, agenda cards, career timeline   |
| `/platform`                  | Full platform detail                        |
| `/events`, `/events/[slug]`  | Event calendar + RSVP                       |
| `/volunteer`                 | Volunteer sign-up (GHL)                     |
| `/donate`                    | Donation page                               |
| `/contact`                   | Contact form (GHL)                          |
| `/ask`                       | "Ask Randall" issue reports (categorized)   |
| `/faq`                       | FAQ                                         |
| `/social-media-posts[/slug]` | Gallery of 20 campaign creatives            |
| `/privacy`, `/terms`         | Legal                                       |

Shared shells: `SectionFrame` (tones: `light` / `dark` / `signal`), `PageHero`
(inner-page top), `Navbar`, `Footer`.

## Campaign creative

`campaign/feed/` (10 × 1080×1080) and `campaign/story/` (10 × 1080×1920) are standalone
HTML artboards rendered live in the browser. **Note:** they still use the older
template palette/typography (Fraunces + parchment tones) and have not been rebranded
to match the current site system.

## Working conventions

- Verify UI changes in a real browser (Playwright skill) — screenshots at desktop
  width minimum; animations are viewport-triggered, so scroll and settle before capture.
- Temporary QA artifacts live in `campaign/navbar-qa/` and `campaign/page-previews/`
  (older captures still show placeholder "CapitalWatch / Adrian Vale" branding).
- Client feedback drives styling passes; latest direction: **use the brand colors
  more** — color is applied structurally (dark/crimson sections, colored icons, label
  dots), not just on hover.
