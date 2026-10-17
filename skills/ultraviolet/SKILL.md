---
name: ultraviolet
description: Tastefolio "Ultraviolet" design language — dark-first infrastructure/AI style. Near-black indigo canvas, grid-line backdrops fading into violet auras, tiles with light-catching gradient borders, one gradient stat tile, isometric CSS hardware, violet-gradient glowing buttons, monospace numbers, and a dark console with glowing active states, telemetry charts and utilization meters. Use when the user asks for the Ultraviolet style, or wants a GPU / cloud / AI / developer / monitoring product site and console with a night look, in Persian (RTL, default) and/or English (LTR).
---

# Ultraviolet

**Dark-first infrastructure for AI.** Space is indigo-black; light is violet; edges glow where light would hit them.
It should feel engineered and powerful, never like a neon arcade. Numbers are monospace, copy is short, and every
glow has a job: focus, state or the one thing to click.

Covers the **launch/marketing site** (hero with isometric hardware, bento platform tour, steps, pricing, CTA) and the
**console** (sidebar, KPIs, telemetry charts, node tables, job progress, launch dialog).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Dark default (`:root, [data-theme=dark]`), light variant, glow tokens, type, Persian overrides. |
| [assets/kit.css](assets/kit.css) | Grid backdrop, auras, glow tiles, gradient tile, iso stack, terminal, bento, pricing, GPU option cards, console shell, meters, states. |
| [assets/kit.js](assets/kit.js) | Tabs, menus, filters, dialogs, charts (glowing lines), validation, fa/en toggle. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | GPU-cloud launch page (Persian source). |
| [examples/dashboard.html](examples/dashboard.html) | Cluster console with telemetry, nodes, jobs and a launch dialog. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Martian+Mono:wght@400;500;600;700&family=Vazirmatn:wght@100..900&display=swap">
```
Latin: **Sora** (geometric). Numbers, labels, code: **Martian Mono**. Persian: **Vazirmatn** — its geometric construction keeps
the engineered voice; use 700–800 for headings and 400 for reading.

## Identity rules (non-negotiable)

1. **Dark is the default.** Ship `data-theme="dark"`; the light theme exists for docs/print but is never the hero.
2. **Light has a source.** Glows come from: auras behind the hero, the top-left corner of tile borders, the primary button, active nav, focus, live dots, chart lines. No uniform outer glows on everything.
3. **Grid-line backdrop.** Hero/CTA sit on a 64px line grid masked with a radial fade from the top center.
4. **Tiles catch light.** `.tile` = dark surface + 1px gradient border (brand 45% → line) from one corner; hover adds an outer violet halo and lifts 2px.
5. **One gradient tile per screen.** The `.tile-gradient` (violet → blue) carries a single hero number (SLA, GPUs, savings). Never gradient text.
6. **Monospace numbers.** Prices, KPIs, IDs, percentages and code use Martian Mono (Latin) — Persian digits use the Kufi face.
7. **Hardware as illustration.** Use the CSS isometric stack, terminals, dot maps and live charts. No photos, no generic 3D blobs, no robots.
8. **Highlighted phrase, not gradient headline.** Headlines are white with one phrase in `--brand-light` (`.lit`).
9. **Rounded, not bubbly.** 12px controls, 20px tiles, 28px CTA containers.
10. **Restraint.** Max two auras per viewport; no animated gradients; motion is ease-out 300–600ms.

## Tokens

| Role | Dark | Notes |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` / `--surface-3` | `#07060e` / `#0e0c1a` / `#141127` / `#1c1834` | depth through lightness, not borders |
| `--ink` / `--ink-2` / `--ink-3` | `#f4f1ff` / `#b6aed2` / `#7d7499` | violet-tinted neutrals |
| `--line` / `--line-2` | violet 13% / 24% | |
| `--brand` / `--brand-2` / `--brand-light` | `#8b5cf6` / brand→blue / brand→white | gradient partner and highlight derive from brand |
| `--glow` | brand 55% transparent | used in shadows, drop-shadows, auras |
| status | `#34d399` `#fbbf24` `#f87171` `#60a5fa` | with 14% soft fills; status dots glow in their own color |

Type 12 / 13 / 15 / 17 / 21 / 30 / 44 / display `clamp(38px, 6vw, 84px)`, weight 700, tracking −0.04em.
Radius 8 / 12 / 20 / 28. Controls 40 / 50px. Sidebar 248px.

## Brand adaptation

- `--brand` should be a saturated, luminous hue that reads on black: violet (default), cyan `#22d3ee`, rose `#f43f5e`, emerald `#10b981`, amber `#f59e0b`. `--brand-2`, `--brand-light`, `--glow` derive automatically; check the gradient tile still has white text ≥ 4.5:1.
- Never pick a dark brand (navy, maroon) — it disappears on the canvas. Put it in the logo only.

## Website patterns

- **Promo strip**: brand gradient, one sentence + underlined link.
- **Header**: sticky, translucent canvas with blur; gradient logo square with glow; 4 links; language; outline "Console" + primary "Get started".
- **Hero**: grid backdrop + two auras; eyebrow pill ("New" badge + sentence); centered display headline (≤ 15ch) with `.lit` phrase; lead; primary + outline large buttons; **isometric stack** of 3 layers (top layer lit) with 2 glass chips showing live numbers.
- **Proof**: muted text logos row.
- **Bento** (6 columns): wide tile with terminal session, gradient tile with the big number, dot-map regions tile, sparkline telemetry tile, short benefit tiles — each with a glowing icon square.
- **Steps**: three dashed-border tiles with mono step numbers.
- **Pricing**: three tiles; featured gets `--shadow-glow`; prices in mono with small unit.
- **CTA**: big rounded tile on grid backdrop with an aura; inline email form.
- **Footer**: mono uppercase headings, muted links.

## Console patterns

- **Shell**: dark sidebar (logo, icon+label nav with grouped mono headings, active item = brand-soft gradient + 2px inner start bar + lit icon, credit meter card at the bottom) + translucent top bar (project pill with live dot, language, theme, account menu). Below 960px the sidebar becomes an overlay drawer.
- **Page title**: mono label above a 26px heading; range segmented control + primary "New cluster".
- **KPIs**: 4 tiles — mono label, big mono value (Persian digits in Kufi), colored delta.
- **Telemetry**: area chart with luminous lines (`drop-shadow` glow) and 45% gradient fill fading to transparent; legend dots glow.
- **Capacity**: region list with gradient meters (hot = amber→red), plus a donut with the free/used split.
- **Tables**: mono uppercase headers, LTR mono node IDs, inline utilization meters, glowing state pills (run / queue / fail / done).
- **Jobs**: progress meters with mono percentages and ETA lines.
- **Launch dialog**: name with pattern validation, GPU option cards (selected = brand border + glow), count select, auto-stop switch, primary Launch.

## Components

`.btn-primary` (gradient + glow), `.btn-outline` (translucent), `.btn-ghost`, `.btn-icon`; `.eyebrow`, `.label`, `.lit`;
`.tile`, `.tile-gradient`, `.bento .b-*`; `.iso`, `.iso-stack`, `.iso-layer.is-lit`, `.iso-chip`; `.term`; `.dots-map`;
`.gpu` option cards; `.switch` (glowing knob); `.meter i(.hot)`; `.state.run|queue|fail|done`; `.seg`; `.side`, `.topbar`, `.kpi`.

## Interaction & motion

Hover: tiles lift 2px with halo; buttons intensify glow. Focus: 4px brand-soft ring + glow. Dialogs blur the backdrop.
Charts reveal on load only through their gradient fill; no looping animations except the live dot. Respect reduced motion.

## Persian & RTL

- Persian is the default source; English is the alternate. Vazirmatn at 14px / line-height 2; headings 1.45–1.6.
- Mono labels become Kufi 12.5px, no uppercase, no tracking. Technical IDs, CLI commands and terminals stay LTR (`.ltr`, `.term`).
- The isometric stack mirrors its X offset in RTL (handled); gradient meters reverse direction in RTL.
- Persian digits for all UI numbers; Toman for prices; Solar Hijri dates; English model names (HX-80) stay Latin.

## Accessibility

Body text ≥ 7:1 on canvas; `--ink-3` only for meta. Never rely on glow alone: states always have text. Focus is visible
(ring + glow). Light theme provided for users who need it (`data-theme="light"`). Reduced motion removes lifts and transitions.

## Component library overrides (shadcn/ui etc.)

Force dark: put tokens on `:root`. Card → `.tile` gradient border (use `background: padding-box/border-box` trick).
Button default → gradient + glow; outline → translucent with `--line-2`. Inputs on `--surface-2`. Dialog with blurred
overlay and `--shadow-glow`. Badge → glowing dot pill. Chart lines get `filter: drop-shadow(0 0 6px var(--glow))`.

## Anti-patterns

- Pure black `#000`, neon green-on-black terminals, rainbow gradients, gradient-filled headlines.
- Glow on every element; multiple competing auras; glassmorphism everywhere.
- Light-mode-first screenshots; gray text below 4.5:1.
- Stock photos of servers or abstract AI brains.

## Pre-ship checklist

- [ ] Dark theme default; light theme works.
- [ ] Hero: grid backdrop, ≤ 2 auras, `.lit` phrase, isometric stack with real numbers.
- [ ] Exactly one gradient tile per screen; tiles use the corner-lit border.
- [ ] Numbers/IDs in mono; states have glowing dot + text.
- [ ] Mobile: sidebar drawer, bento single column, iso scaled down, no horizontal scroll.
- [ ] Persian: Kufi, no tracking/uppercase, LTR IDs/commands, Persian digits.
