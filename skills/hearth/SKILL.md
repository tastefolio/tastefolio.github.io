---
name: hearth
description: Tastefolio "Hearth" design language — warm technical clarity. Warm off-white paper canvas, near-black ink buttons, uppercase monospace labels, two-tone headlines, one warm accent that only fills the active feature card, dense honest data tables with status dots, copyable mono identifiers, row menus and side drawers. Use when the user asks for the Hearth style, or wants a networking / IoT / infrastructure / developer product that feels human — marketing site and admin console — in English (LTR) and/or Persian (RTL), light or dark.
---

# Hearth

**Warm technical clarity.** Infrastructure that talks like a person. The page is warm paper, the type is ink,
labels whisper in uppercase monospace, and a single warm accent marks *where you are* — never *what to click*.
Primary actions are ink-black buttons. The product is one big, honest, sortable table.

Covers the **public site** (hero, capability tabs, diagrams, stats, pricing, contact) and the **console**
(device/resource tables, drawers, alerts, audit log, settings).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Warm neutrals, ink, accent, status, type, spacing; dark and Persian overrides. |
| [assets/kit.css](assets/kit.css) | Reference components: announce bar, mega menu, feature tabs, panels, diagram, stats, dense table, drawer… |
| [assets/kit.js](assets/kit.js) | Optional behaviors (tabs, menus, drawers, filters, sorting, copy, charts, validation, fa/en). |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Full marketing page. |
| [examples/dashboard.html](examples/dashboard.html) | Full console: devices table + drawer, sites with charts, alerts, audit log, settings. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>@font-face{font-family:"Estedad";src:url("https://cdn.jsdelivr.net/gh/aminabedi68/Estedad@8.5/fonts/Estedad%5Bwght%5D.woff2") format("woff2");font-weight:100 900;font-display:swap}</style>
```
Latin: Hanken Grotesk (400/500/600). Mono: IBM Plex Mono (labels, identifiers, code, table headers).
Persian: Estedad (variable) for everything including labels. Fallbacks: Instrument Sans / Inter; JetBrains Mono; Vazirmatn.

## Identity rules (non-negotiable)

1. **Paper, not white.** Page background is `--canvas` `#f6f4f1`; white (`--surface`) is reserved for panels, cards, tables and the app bars.
2. **Ink is the action color.** Primary buttons: `.btn-ink` (near-black, 8px radius). The accent (`--brand`, warm coral) is **never** a button fill.
3. **Accent marks state, not action.** It fills the selected feature card, colors bullet dots, live diagram edges and small "update" badges. One accent per screen region.
4. **Mono labels.** Eyebrows, table headers, plan names, badges and footer headings are `IBM Plex Mono` 11–12px uppercase, tracking `.07em`, `--ink-3`.
5. **Two-tone headings.** Long headings split into a gray first clause (`.dim`) and an ink second clause. Weight 600, tracking −0.035em. No gradients.
6. **Big soft containers, small sharp controls.** Panels/cards 16–24px radius; buttons/inputs 8px; tags pill.
7. **No decoration shadows.** Separation comes from paper vs. white and 1px warm lines. Shadows only for floating layers (menus, drawers, dialogs).
8. **Identifiers are mono and copyable.** Hostnames, IPs, versions, keys: mono, LTR, with a copy button that appears on row hover/focus.
9. **The console is a table.** Lists of resources are dense tables (56px two-line rows), not card grids. Details open in a side drawer; actions live in a `⋯` row menu.
10. **Diagrams over stock art.** Explain with product diagrams (nodes, dashed edges, mono labels), terminals and real UI fragments.

## Tokens

| Role | Light | Notes |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` / `--surface-3` | `#f6f4f1` / `#fff` / `#faf8f6` / `#efebe6` | paper → panel → table header → hover |
| `--surface-ink` | `#1c1a17` | announcement bar, ink buttons, code, tooltips (flips to light in dark mode) |
| `--ink` / `--ink-2` / `--ink-3` | `#1c1a17` / `#5e5852` / `#8f877e` | warm, never blue-gray |
| `--line` / `--line-2` | `#e7e2db` / `#d6cfc5` | |
| `--brand` | `#e5533d` warm coral | `--brand-soft` badge bg, `--brand-strong` text on soft |
| status | `#2f8f5b` ok · `#b7791f` warn · `#c8412f` bad | earthy, low saturation |

Type scale 12 / 13.5 / 15 / 18 / 22 / 32 / 48 / display `clamp(40px, 5.6vw, 72px)`; stat numerals 48–72px weight 500.
Spacing 4px base up to 112px; section padding 64–120px. Controls 34px (app) / 44px (site).

## Brand adaptation

- `--brand` may be any mid-to-dark, warm or cool saturated hue (coral, blue `#2f6fed`, teal `#0f766e`, violet, amber `#d97706`). It must carry white text at ≥ 4.5:1 because the active feature card uses `--brand-ink` on it.
- Do not move the brand into buttons when rebranding — the ink button is what makes this Hearth.
- Keep the neutrals warm. A cool-gray canvas turns this into a generic SaaS style.

## Website patterns

- **Announcement bar**: 38px, ink background, mono uppercase 11.5px ("New · … →"), end-aligned utility links.
- **Header**: logo (3×3 dot-grid mark + wordmark 700), nav items that open **mega dropdowns** marked with a `+` that becomes `−`; end: ghost "Log in", ink "Start free". Below 900px: menu button, accordion-style nav.
- **Hero**: centered; mono eyebrow → display heading (≤ 18ch) → lead (≤ 60ch) → ink CTA + underlined text link. No hero image; the capability tabs follow immediately.
- **Capability tabs**: 5 equal cards in a row (icon in accent, title, one-line description); selected card fills with `--brand`. Below: one large white panel (24px radius) per tab — text column (mono label, two-tone h2, accent dot list, ink button) + visual column (diagram, terminal, rollout bars, alert list, policy code). On mobile the cards become a horizontal snap scroller.
- **Proof**: two-tone heading ("4,200 teams / run their fleet on …"), 3 stat cards with huge numerals and one sentence each, then a text-logo strip.
- **Pricing**: 3 white plan cards; featured gets a 2px ink outline (not color). Plan names are mono labels.
- **Contact**: two columns; form in a white card with 44px inputs, ink submit.
- **Footer**: 5 columns, mono uppercase headings, muted links.

## Console patterns

- **Shell**: white app bar (56px): dot-grid logo, org switcher in mono (`northwind-farms ⌄`), spacer, language, theme, help, accent avatar. Below: white tab bar with underline tabs (2px ink indicator). Page body on `--surface-2`.
- **Page header**: 30px/600 title + one-line description; primary ink button at the end ("Add device").
- **Summary line**: inline counts ("14 devices · 11 connected · 3 need an update") instead of KPI cards.
- **Toolbar**: search ("Search by name, owner, tag, version…", `/` shortcut) + compact select filters + "Clear".
- **Table** (`.data-table` in `.table-card`): mono uppercase headers on `--surface-2`; first column = bold mono name + owner below; tags as mono pills; address mono with hover copy button; version with accent "Update" badge when outdated; status dot ("Connected" or relative time in `--ink-3`); last column `⋯` menu. Rows open a **drawer** (440px, from inline-end) with a key/value list, a small chart and actions.
- **Secondary pages**: Sites = small cards with status + meter + two charts (ink and accent lines; second series dashed). Alerts = list with square severity markers, mono times, inline actions. Audit log = mono timestamps table + Export. Settings = white cards with field grid and switch rows; destructive card last.
- **Feedback**: ink toasts bottom-end; confirmations in a modal with ink/danger buttons.

## Components

Buttons `.btn-ink | .btn-outline | .btn-ghost | .btn-danger`, `.btn-lg`, `.btn-icon`; `.text-link` (underline 1px, offset 4px).
Inputs 44px site / 34px toolbar, 8px radius, focus = ink border + soft accent ring.
Toggle 34×20, ink when on. Badges are mono uppercase 11px on soft fills. Tags are outlined mono pills.
Menus 12px radius, shadow-2. Drawer slides 24px with fade. Charts: ink first series, accent second, 1.75px lines, mono axis labels, no fills heavier than 8%.

## Motion

Short and mechanical: 120–360ms, `cubic-bezier(.25,.8,.25,1)`. Mega menus and drawers fade/slide; the `+` rotates into `−`.
No parallax, no scroll-jacking, no bouncing. Respect reduced motion.

## Voice

Plain, specific, a little warm: "No VPN, no open ports." "Only when it matters." Numbers with units ("38 ms", "4 min").
Persian copy keeps the same brevity; technical identifiers stay Latin.

## Persian & RTL

- `lang="fa" dir="rtl"`; logical properties mirror layout. Mirror arrows with `.flip-rtl`. Drawer enters from the left in RTL (handled).
- Estedad replaces both Hanken Grotesk *and* the mono labels in Persian text: labels become 13px/600 sentence-case (never uppercase, never tracked).
- Identifiers (`soil-north-07`, IPs, versions, `tag:pumps`) remain mono LTR inside RTL rows (`direction:ltr` on `.tag`, `.addr`).
- Persian digits via `Intl.NumberFormat('fa-IR')`; relative times via `Intl.RelativeTimeFormat('fa')`; Jalali dates.
- Two-tone headings work in Persian too: gray first clause, ink second.

## Accessibility

AA contrast (ink-3 only for secondary text ≥ 12px). Ink focus outline 2px offset 2px everywhere.
Tables use `th scope`, `aria-sort` on sortable headers; copy buttons have labels and appear on focus, not only hover.
Feature tabs and app tabs are real `tablist`s with arrow keys. Drawers/dialogs use `<dialog>` (focus trap, Esc).
Status = dot + text. Charts carry `aria-label`; the same numbers exist in text.

## Component library overrides (shadcn/ui etc.)

Map tokens via `references/adapters.md`, then: `Button` default variant = ink (`bg-surface-ink text-ink-inverse`), never `bg-primary`;
`primary` token = accent only for selected/active states. Card radius 16px, no shadow. Table header = mono uppercase 11px.
Tabs = underline variant. Sheet (drawer) from the inline-end, 440px. Badge = mono uppercase. Remove default blue focus rings.

## Anti-patterns

- Accent-colored primary buttons, gradients, glow, glass.
- Cool gray or pure-white page backgrounds.
- KPI card grids as the first thing in the console — lead with the table.
- Card grids for long resource lists; modals for read-only details (use the drawer).
- Proportional fonts for IPs/keys; uppercase or letter-spaced Persian.

## Pre-ship checklist

- [ ] Canvas is warm paper; panels white; no decorative shadows.
- [ ] Every primary action is an ink button; accent appears only as state/marker.
- [ ] Headings are two-tone where long; eyebrows/headers are mono uppercase (Latin only).
- [ ] Console leads with a dense table: mono identifiers, status dots, copy, `⋯` menus, drawer.
- [ ] Mobile: mega menu becomes accordion; feature cards scroll; tables scroll inside their card; low-priority columns hide.
- [ ] Persian: Estedad, no uppercase/tracking, LTR identifiers, Persian digits.
- [ ] Dark mode keeps warmth (`#161513` canvas) and ink buttons flip to light.
