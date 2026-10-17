---
name: atelier
description: Tastefolio "Atelier" design language — gallery-grade, monochrome product marketing that avoids the generic template look. Warm grain canvas, enormous tightly tracked display type with one serif-italic accent word, black pill CTAs with a highlighter dot, bento tiles, glass layers, choreographed reveal motion, and an airy studio dashboard with a floating glass dock and command palette. Use when the user asks for the Atelier style or wants a premium, editorial, "designed by a studio" landing page or calm dashboard (creative tools, agencies, AI/productivity), in English (LTR) and/or Persian (RTL).
---

# Atelier

**Gallery-grade product marketing.** Everything is monochrome and confident: warm paper, near-black ink,
headlines so large and tight they read as objects, and one word set in a serif italic like a curator's note.
Color appears only as a **highlighter** — a light accent that sits *behind* black text, never as text itself.
Motion is choreography, not decoration.

Covers **public pages** (launch/landing, features, pricing, stories) and **calm product UI** (personal/team
dashboards, project overviews, schedules, settings).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Neutrals, ink, highlighter accent, type, radii, shadows, easing; dark + Persian overrides. |
| [assets/kit.css](assets/kit.css) | Reference components: pill nav, display type, pill buttons, cmd chip, orbit, bento tiles, marquee, reveal, studio dock, KPIs, week timeline, rings, palette… |
| [assets/kit.js](assets/kit.js) | Behaviors incl. `[data-reveal]`, `[data-countup]`, ⌘K palette, tabs, dialogs, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Launch page with hero orbit, bento, steps, quote, pricing, CTA, giant footer. |
| [examples/dashboard.html](examples/dashboard.html) | Studio dashboard: dock, greeting, KPIs, week timeline, revenue chart, projects, team, palette. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Vazirmatn:wght@100..900&display=swap">
```
Latin display + UI: **Geist** (600 display, 400/500 text). Accent: **Instrument Serif italic** (one word or short phrase).
Mono: **Geist Mono** for eyebrows, kbd, numbers in tables. Persian: **Vazirmatn** only — 800 for display, and the
serif-italic accent becomes Vazirmatn 300 against the 800 display (Persian has no italic). Fallbacks: Inter Tight / Satoshi-like grotesk; Newsreader italic.

## Identity rules (non-negotiable)

1. **Monochrome first.** Ink `#0e0e0d` on warm paper `#f3f1ed`. Gray steps (`--ink-2`, `--ink-3`) do all hierarchy.
2. **Highlighter, not accent text.** `--brand` (default lime `#d6ff3d`) appears only as a fill behind black: CTA dot, `.mark` underlay, one bento tile, chips, live dots, chart highlight. Never colored text, never gradients.
3. **Display type is the hero image.** 90–124px, weight 600, line-height .92, tracking −0.055em, `text-wrap: balance`. Exactly one `<em>` per heading in Instrument Serif italic (weight 400).
4. **Pills everywhere you click.** Buttons, nav, segmented controls, inputs in inline forms are fully rounded. Primary = ink pill with a 40px highlighter dot holding the arrow.
5. **Soft, big containers.** Tiles and panels 28px radius; mocks 22px; long, low-opacity shadows (`--shadow-2/3`). Glass (`.glass`) only for floating layers: nav, dock, float cards.
6. **Asymmetry with rhythm.** Bento grids mix spans (4+2, 2+2+2) and tile colors (white / ink / lime) — never a uniform 3-up grid of identical cards.
7. **Choreographed motion.** Content enters with fade + 28px rise + blur 8→0, 900ms, `cubic-bezier(.16,1,.3,1)`, staggered 70ms. Continuous motion is limited to slow orbits/marquees. All of it disappears under `prefers-reduced-motion`.
8. **Grain.** A fixed 4.5% noise layer over the canvas (`body::before`). No other textures.
9. **Few words, big whitespace.** Section padding 112–168px. Leads ≤ 44ch. No more than one paragraph per tile.
10. **No template tells**: no purple-blue gradients, no emoji icons, no three identical feature cards, no generic stock 3D blobs, no center-aligned walls of text.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` / `--surface` / `--surface-3` | `#f3f1ed` / `#fff` / `#ebe8e2` | paper / tiles / tracks & chips |
| `--ink` / `--ink-2` / `--ink-3` | `#0e0e0d` / `#57544f` / `#96928a` | |
| `--line` / `--line-2` | 9% / 16% ink | hairlines only |
| `--brand` / `--brand-ink` | `#d6ff3d` / `#0e0e0d` | highlighter; text on it is always ink |
| `--glass` | `rgba(255,255,255,.62)` + blur 16–18px | floating layers |
| radius | 10 / 16 / 28 / 40 / pill | |
| easing | `--ease` (.16,1,.3,1), `--ease-spring` (.34,1.56,.64,1) | spring only for toasts/press |

Type scale 12 / 14 / 16 / 19 / 24 / 36 / 56 / display `clamp(48px, 8.4vw, 124px)`; h2 `clamp(36px, 5.4vw, 76px)`.

## Brand adaptation

- `--brand` must be a **light** tone that keeps ink text ≥ 4.5:1: lime, apricot `#ff8a5c`, sky `#8fd3ff`, pink `#ffb3e6`, lilac `#c9b8ff`.
- A dark brand color (navy, deep red) does not belong in `--brand`; use it only in a logo, keep the highlighter light.
- Product names, imagery subject and copy can change; the monochrome + highlighter structure cannot.

## Website patterns

- **Nav**: floating glass pill centered 16px from the top: wordmark (planet dot + name), 4 links, language, primary pill. Mobile: menu button opens a full-screen sheet with 40px links.
- **Hero** (≈100vh): 2 columns. Left: "New" badge pill → display headline with one `<em>` → lead → primary pill + glass pill → social proof (stacked avatars + one line). Right: a sculptural visual (CSS orbit, product mock stack) with 1–2 glass float cards carrying real numbers.
- **Marquee** of client wordmarks in `--ink-3`, masked at both ends.
- **Bento features**: h2 with italic phrase + lead on the opposite side; tiles = eyebrow (mono, dot) + h3 with italic phrase + a real UI fragment at the bottom.
- **Steps**: 3 columns, hairline top, big serif-italic numerals in `--ink-3`.
- **Quote**: one oversized serif quote (≤ 26ch) + avatar line.
- **Pricing**: 2 plans max; the recommended one is an ink tile with a lime chip and lime button. Billing toggle = pill segmented control.
- **CTA**: centered display line + pill inline form (input + primary) + small reassurance.
- **Footer**: hairline, 4 columns, then a **giant wordmark** cropped by the viewport.

## Dashboard patterns

- **Shell** `.studio`: floating glass **dock** (252px, 28px radius, inset 16px) with wordmark, icon+label nav (current = white pill with shadow), an upgrade tile in lime and the user. Main area has generous padding.
- **Top line**: search pill ("Search or jump to…" + `⌘K`) opening the palette, language/theme ghost buttons, primary pill ("New project").
- **Greeting**: `Good morning, <em>Leila.</em>` at 36–64px + date line; view switcher as pill segmented tabs on the end.
- **KPIs**: 4 white tiles — serif-italic label, 48px number (count-up), delta with a lime badge.
- **Panels**: week timeline (rows = people, pill slots spanning days; ink = committed, lime = highlight, gray = tentative), smooth area chart (ink line, 10% fill), project cards with conic progress rings and avatar stacks, activity feed with mono relative times.
- **Lists**: filter pill input + segmented status filter + counts; cards, not tables, unless data is tabular (then the quiet `.table`).
- **Dialogs**: 28px radius, blurred backdrop, h3 with an italic word, pill inputs, primary pill submit.

## Components

`.btn-primary` (ink pill + `.btn-dot`), `.btn-glass`, `.btn-ghost`, `.btn-icon`; `.badge-new`, `.chip / .chip-hi / .chip-ink`;
`.cmd` (dark command chip with copy); `.tile / .tile-ink / .tile-hi` in `.bento` with `.span-*`; `.glass`; `.mark`;
`.segmented`; `.inline-form`; `.ring` (`--p` percent); `.week` / `.slot`; `.kpi`; `.feed`; `dialog.palette`.
Charts: smooth curves, ink first series, gray second, highlighter for emphasis; mono axis labels; no gridline borders.

## Interaction

Hover lifts tiles 4px and deepens shadow; primary pills are magnetic on pointer devices (≤ 0.28× offset) and the dot
arrow rotates −45°. Press scales to .97. Palette: ⌘K / Ctrl+K, arrows, Enter. Count-ups run once when visible.
Never animate layout-critical content on load longer than 1s; never block interaction during reveals.

## Persian & RTL

- `lang="fa" dir="rtl"`. Vazirmatn 800 for display at `clamp(40px, 6.6vw, 96px)`, line-height 1.22, **no negative tracking**.
- The italic accent becomes **Vazirmatn 300, upright** — same role, lighter voice against the 800 display. Never fake-italicize Persian (no `font-style: italic`, no skew).
- Mono eyebrows switch to Vazirmatn 13px/600, sentence case.
- Arrows in pill dots flip (`.flip-rtl`); the hover rotation mirrors (handled). Marquees stay LTR (logos are Latin).
- Persian digits and Jalali dates via `Intl`; Persian work week (Sat–Wed) in timelines.

## Accessibility

Ink on paper is ~17:1; `--ink-3` only for supplementary text. Visible 2px ink focus ring offset 3px on pills.
Reveal/motion off under reduced motion; content is never hidden without JS (the hidden start state lives inside
`@media (scripting: enabled)`; when porting, render visible by default and animate only when JS runs). Glass layers keep ≥ 4.5:1 for text by using
`--glass` ≥ 60% opacity. Palette and dialogs are `<dialog>`; tabs are real tablists.

## Component library overrides (shadcn/ui etc.)

Button: `rounded-full`, default variant ink with an icon "dot" slot; `secondary` = white with hairline + shadow-1.
Card: `rounded-[28px]`, no border on ink/lime variants. Input: `rounded-2xl` (52px) or `rounded-full` inside inline forms.
Tabs: pill segmented. Dialog/Command: `rounded-[28px]`, backdrop blur 4px. Replace default `primary` usage with ink;
map `--accent` to the highlighter. Remove default focus rings in favor of the ink ring.

## Anti-patterns

- Colored text links or headings; gradients; neon glows; more than one accent.
- Uniform card grids; small headlines; dense tables as the first thing users see.
- Bouncy or fast motion; parallax that moves text; auto-playing carousels.
- Italicized or letter-spaced Persian; replacing the accent word with emoji.

## Pre-ship checklist

- [ ] One serif-italic (Persian: light Vazirmatn) word per major heading; display ≥ 90px on desktop.
- [ ] Highlighter appears only behind ink text; no colored text anywhere.
- [ ] Bento uses mixed spans and at least one ink and one highlighter tile.
- [ ] Reveal motion staggered and disabled for reduced motion; nothing invisible without JS.
- [ ] Mobile: pill nav → sheet; bento → single column; dock → overlay; display scales down.
- [ ] Persian: Vazirmatn only (800 display, 300 accent), no tracking, Persian digits.
- [ ] Dark mode: canvas `#0d0d0c`, ink pills flip to light, highlighter unchanged.
