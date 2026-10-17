---
name: linework
description: Tastefolio "Linework" design language — precise, monochrome, hairline-technical. A framed page ruled by 1px lines with crosshair marks at every intersection, hairline cell grids (gap-1px borders), a millimetre ruler under the header, ink as the only brand colour and green/amber/red only for ready/building/error; Inter Tight for words and Azeret Mono for labels, numbers and code. Includes command snippets with copy, a request waterfall, line diagrams, code tabs with line numbers, hairline pricing, comparison and changelog, and a developer console (production deployment, metric cells with sparklines, deployments table with filters, live logs, usage charts and quota meters, environment variables with reveal, API keys shown once, danger zone with type-to-confirm, ⌘K command palette); Radix Icons as an inline sprite. Use when the user asks for the Linework, hairline, technical, developer platform, API, infrastructure, docs, console or monochrome style — English (LTR) and Persian (RTL).
---

# Linework

**Drawn with a 0.5 mm pen.** Linework treats the page like an engineering drawing: a frame of 1px lines, sections
ruled across it, a crosshair wherever lines meet, and content set in cells that share hairline borders. There is no
shadow and almost no radius. Ink is the brand; colour exists only to say *ready*, *building* or *error*. Words are
Inter Tight at tight tracking; everything you might copy — labels, numbers, paths, code — is Azeret Mono.

Covers **developer sites** (hero with command + waterfall, stats, logos, features, code, architecture, pricing,
changelog, CTA, footer) and **consoles** (overview, deployments, logs, usage, settings, command palette).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** White/ink palette, `--line`/`--line-2`/`--cross`, state colours, Inter Tight + Azeret Mono + Vazirmatn, radii 4/6/8, no shadows; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Frame, `.sec` rules with crosshairs, `.cells` hairline grids, ruler, dot background; header; buttons, kbd, tabs, seg, chips, fields, switch, badges, status dots, meters; command snippet, code with line numbers + tokens, terminal; hero, request waterfall, line diagram, features, logos, stats, pricing cells, comparison table, changelog; console (topbar, crumbs, ⌘K button, sub-nav, boxes, production panel, key–value list, metric cells, tables, commits, logs, secrets, danger zone); modal, command palette, toast, charts. |
| [assets/kit.js](assets/kit.js) | Tabs, pressed groups, filters + search, sorting, switches, dialogs (`data-stay` keeps a dialog open after submit), validation with pattern messages, copy (keeps code line breaks), ⌘K palette, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Edge platform site: ruler, hero with command snippet and request waterfall, stat cells, logo cells, six feature cells with mini visuals, terminal + code tabs, architecture line diagram, pricing cells + comparison, changelog, CTA, footer with status. |
| [examples/dashboard.html](examples/dashboard.html) | Console: crumbs + ⌘K + sub-nav; overview (production deployment, metric cells, recent deployments, domains), deployments (status chips, branch, search, sortable, rollback/promote), live logs (level chips, search, live tail), usage (requests 7/30d, duration p50/p95, quota meters), settings (env vars with reveal/add/delete, API keys created once, danger zone), command palette. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400..700&family=Azeret+Mono:wght@400..600&family=Vazirmatn:wght@100..900&display=swap">
```
**Inter Tight** 400–700 (display 600, tracking −0.045em), **Azeret Mono** 400–600 for labels (uppercase, +0.08em),
numbers, paths and code, **Vazirmatn** for Persian (labels switch to Vazirmatn, no uppercase). Icons: **Radix Icons**
(MIT, 15×15, crisp at 1px) as an inline `<symbol>` sprite — `<svg class="ic"><use href="#i-name"/></svg>`.

## Identity rules (non-negotiable)

1. **The frame is the layout.** Content lives inside `.frame` (1px side borders); sections are `.sec` (1px top rule) and get crosshair marks where the rule meets the frame. Keep the lines continuous — no floating cards.
2. **Cells, not cards.** Group content in `.cells` (a 1px gap over `--line`), so neighbours share one hairline. No drop shadows; elevation is only for dialogs and the palette.
3. **Ink is the brand.** Primary buttons, selected tabs, pressed chips and the main chart line are `--ink`. Colour is reserved for state: green ready/2xx, amber building/4xx/limits, red error/5xx/danger, blue focus and links in code.
4. **Mono for anything machine-readable**: labels, numbers, timestamps, branches, commits, paths, keys, prices in tables, chart axes.
5. **Show the system.** Use a command snippet with copy, a request waterfall, a line diagram or a log excerpt instead of illustrations.
6. **Radii are tiny** (4 controls, 6 buttons, 8 boxes); status badges are the only pills.
7. **Density with air**: 13–15px text in consoles, but generous section padding on sites (72px) so the lines can breathe.
8. **Code stays LTR** in both directions (snippets, logs, keys, waterfalls, diagrams); prose, labels and layout mirror in Persian.
9. **Destructive actions confirm by typing** (project name pattern), secrets are masked with an explicit reveal, new keys are shown once.
10. **Dark mode is a negative print**: `#0a0a0a` paper, `#ededed` ink, lines `#222` — the same drawing, inverted.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#ffffff` / `#fafafa` / `#f1f1f1` | `#0a0a0a` / `#111111` / `#1a1a1a` |
| `--ink` / `--ink-2` / `--ink-3` | `#0a0a0a` / `#525252` / `#8f8f8f` | `#ededed` / `#a1a1a1` / `#6e6e6e` |
| `--line` / `--line-2` / `--cross` | `#e8e8e8` / `#d4d4d4` / `#a3a3a3` | `#222` / `#333` / `#555` |
| `--brand` | `#0a0a0a` (ink) | `#ededed` |
| ready / building / error / info | `#12a150` / `#c27c0e` / `#e5383b` / `#2b6cff` | lighter equivalents |

Type 11.5 / 13 / **15** / 17 / 21 / 28 / 40, display `clamp(40px, 6vw, 84px)` 600. Radius 4 / 6 / 8. Controls 38 / 46px
(30px small). Easing `cubic-bezier(.2,0,0,1)`, 120–360ms.

## Brand adaptation

- Keep ink as the base. A brand colour may replace `--brand` (buttons, selected states) via `?brand=` — cobalt `#2b6cff`, red `#e5383b`, violet `#7c3aed`, green `#0f9d76` — but never tint the lines or the canvas.
- The mark is a 1.5px square with a diagonal hairline; swap it for the product’s mark drawn at the same weight.
- Charts are ink lines with a 6% area; add a second series in `--info` only when comparing.

## Website patterns

- **Header**: wordmark · Product, Docs, Pricing, Changelog, Customers · language/theme · *Log in* (ghost) · *Deploy* (ink). A **ruler** under it.
- **Hero** (two cells): mono version label with a status dot, display headline, lead, **command snippet** with copy, two buttons | a **request waterfall** (status, method, path, region, timing rows).
- **Stats** (4 cells) and **logos** (6 cells), **features** (3×2 cells with index, title, text and a mini visual: code, deploy list, URL, sparkline, KV rows, checklist).
- **Develop**: terminal output + code card (language tabs, line numbers, highlighted line, copy that follows the tab).
- **Architecture**: client → edge → function → data nodes joined by dashed hairlines on a dot grid.
- **Pricing** cells (featured = grey cell with an ink top rule) + **comparison** table; **changelog** (mono date · badge · title · text); **CTA** with a command; **footer** cells with a live status line.

## Dashboard patterns

- **Topbar**: mark / org / project crumbs with a plan badge, ⌘K search button, language/theme, avatar; underline **sub-nav** tabs.
- **Overview**: production deployment box (preview, domains, commit, branch, regions, created; Rollback, Visit), four **metric cells** (value, delta, sparkline), recent deployments, domains with SSL state.
- **Deployments**: status chips, branch select, search, sortable duration; rows with status dot + badge, commit hash + message, branch, author, duration, age, action (rollback, promote, logs, cancel).
- **Logs**: level chips, search, **live** switch that tails new lines; mono grid (time, level, method, path + region, status, duration); errors tinted.
- **Usage**: 7d/30d seg (bar vs area), p50/p95 lines, **quota meters** (amber when near the limit, with a forecast line).
- **Settings**: env vars (masked + reveal, environments, delete; add form with `[A-Z_][A-Z0-9_]*`), API keys (create → shown once with copy), **danger zone** (type the project name).
- **⌘K palette**: grouped “Go to” and “Actions” items with shortcuts.

## Components

`.frame`, `.sec`, `.xh`, `.pad`, `.cells`, `.ruler`, `.dots-bg`, `.site-head`, `.wordmark`/`.mark`, `.nav`, `.btn` (+ `-outline`, `-ghost`, `-danger`, `-lg`, `-sm`, `-icon`), `kbd`, `.tabs`, `.seg`, `.chips`, `.field`, `.flabel`, `.input(.mono)`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.ok|.warn|.bad|.info|.ink)`, `.dot(.ready|.building|.error|.queued)`, `.status`, `.avatar`, `.meter(.warn)`;
`.label`, `.display`, `.h1`–`.h3`, `.lead`, `.link`, `.cmd`, `.code` (`.l`, `.hl`, `.k`, `.s`, `.c`, `.n`, `.f`), `.code-card`, `.copy-btn`, `.term`, `.hero`, `.trace` (`.head`, `.scale`, `.r`, `.fn`, `.db`), `.diagram`/`.node(.accent)`, `.feat`/`.viz`, `.logos`, `.stat`, `.price-cell(.featured)`, `.compare`, `.log-list`/`.log-item`, `.foot-cells`;
`.topbar`, `.crumbs`, `.search-btn`, `.subnav`, `.console`, `.box`/`.box-head`/`.box-body`, `.prod`, `.preview-shot`, `.kv`, `.mcells`, `.delta`, `.table`, `.commit`, `.logs`/`.ln`, `.secret`, `.danger-zone`, `dialog.modal`, `dialog.palette`, `.palette-label`, `.toast`.

## Interaction & motion

Almost none, all functional (120–360ms): buttons darken, tabs underline, switches slide, the building dot blinks
(static in screenshots), logs append and scroll while live. Copy buttons give a toast. No parallax, no reveal-on-scroll.

## Persian & RTL

- English-first demos with Persian via `data-alt`; in Persian the layout mirrors, labels drop uppercase and switch to Vazirmatn, numbers use Persian digits via `data-num`.
- Code, logs, commands, keys, waterfalls and diagrams keep `direction: ltr` and left alignment in both directions; crosshairs and frame mirror naturally.

## Accessibility

Ink on white 19:1; `--ink-3` labels ≥ 4.5:1 at 11.5px mono in light mode; state is always a word plus a dot/colour;
focus is a 2px blue outline; every icon button is labelled; tables use real headers; the log region is `role="log"`;
⌘K and `/`-style shortcuts never replace visible controls; secrets require an explicit reveal button with `aria-pressed`.

## Component library overrides (shadcn/ui etc.)

`--radius: 6px`; Card → `.box` (1px border, no shadow); Button default → ink, `outline` → hairline; Tabs → underline
ink; Badge → mono pill with state colours; Table → mono header on `--surface-2`; Command → `dialog.palette`;
Chart → 1.5px ink line, 6% area, mono axes; Separator → `.sec` with crosshairs.

## Anti-patterns

- Soft shadows, big radii, gradients or glass — they break the drawing.
- Brand colour on lines or backgrounds; status colours used decoratively.
- Proportional fonts for hashes, paths or numbers in tables; centred code.
- Illustrations of clouds and rockets instead of showing the real system.
- Mirroring code or logs in RTL.

## Pre-ship checklist

- [ ] Frame + section rules + crosshairs at every intersection; cells share hairlines.
- [ ] Ink for actions; green/amber/red only for state, always with a word.
- [ ] Mono for labels, numbers, code, paths and keys.
- [ ] Hero shows a real command and a request trace.
- [ ] Console: deployments with filters, live logs, quotas, env vars with reveal, keys shown once, type-to-confirm delete, ⌘K.
- [ ] Persian: mirrored layout, Vazirmatn labels, LTR code and logs.
