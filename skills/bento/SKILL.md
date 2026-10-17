---
name: bento
description: Tastefolio "Bento" design language — modular modern UI built from rounded tiles on one grid. A calm grey canvas with white 28px-radius tiles and one shared gap, one idea per tile, one dark tile and one raspberry accent tile per group, condensed Instrument Sans numerals for stats, a header made of three tiles, corner arrows on linked tiles, option tiles for choices, and dashboards with a Customize mode that resizes widgets in place; dark theme and Persian (Vazirmatn) included. Use when the user asks for the Bento, bento-grid, modular, tile, widget or modern-minimal style, or builds a hardware/app product page, SaaS feature overview, portfolio, link page or a widget dashboard — in English (LTR) and/or Persian (RTL).
---

# Bento

**Every idea in its own tile.** The page is a grid; the grid is filled with rounded tiles that share one gap; each
tile says one thing — a stat, a feature, a form, a chart. Composition comes from tile sizes (1–6 columns × 1–4 rows),
not from decoration. The canvas is a calm grey, tiles are white, one tile per group goes dark and one takes the accent.

Covers **public sites** (product pages, feature overviews, pricing/order, reviews, FAQ) and **dashboards** (widget
homes, collections, devices, settings) with the same tile vocabulary.

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Grey canvas, white tiles, raspberry accent, Instrument Sans (variable width) / Vazirmatn, 28px tile radius, `--gap`, `--row`; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | `.bento` grid + `.w-1…6` / `.h-1…4` spans, `.tile` (+ `.ink`, `.brand`, `.soft`, `.flush`), `.tile-label`, `.tile-title`, `.tile-foot`, `.corner`, `.big`/`.kpi` numerals, three-tile header, pill buttons, segmented tabs, chips, filled fields, checks, `.options` tiles, swatches, switch, qty, badges, progress, lists, tables, edit mode (`.tile-tools`), dialogs, toasts, charts, `.ic` icons. |
| [assets/kit.js](assets/kit.js) | Tabs, pressed groups, filters, steppers, dialogs, validation, charts (`tf.drawCharts` after a tile resizes), fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | E-ink notebook: hero tile + stat + accent tile, feature bento, spec tabs, order bento with live total and colour preview, review tiles, FAQ, footer tiles. |
| [examples/dashboard.html](examples/dashboard.html) | Notes cloud: widget home with Customize (S/M/L/XL), quick note, chart, recent notes search; notebooks with filters and a create dialog; devices with a simulated update; settings tiles. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=Vazirmatn:wght@100..900&display=swap">
```
**Instrument Sans** 400–600 for everything; stats use its condensed width (`font-stretch: 75%`). Persian: **Vazirmatn**
(600–700 for titles, 400–500 for text). Icons: a small inline SVG sprite (24px, 1.8 stroke, round caps) — see `.ic`.

## Identity rules (non-negotiable)

1. **One grid, one gap.** Everything sits in `.bento` (6 → 4 → 2 columns) with `--gap`; never place loose elements between tiles.
2. **Tiles, not cards.** 28px radius, no borders, no shadows at rest; padding 24–40px. A tile lifts slightly only when it is a link.
3. **One idea per tile.** If a tile needs a heading *and* a list *and* a chart, split it.
4. **Size is hierarchy.** The most important idea gets the biggest span (e.g. `w-4 h-3`); stats get `w-2`; small facts `w-2 h-1`.
5. **One dark tile and one accent tile per group** (`.tile.ink`, `.tile.brand`); the rest are white or `.soft`.
6. **Numbers are condensed and huge** (`.big`, `.kpi`) with a small unit beside them.
7. **Linked tiles carry a corner arrow** (`.corner`), which turns 45° on hover.
8. **Choices are tiles too:** radios/checkboxes become `.options` / `.swatches`; tabs are a grey track with a white chosen chip.
9. **The header is three tiles** (logo · nav · actions), sticky and translucent.
10. **Dashboards can be rearranged:** a Customize button toggles `[data-editing]`; `.tile-tools` swap span classes.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#eeeef0` / `#ffffff` / `#f5f5f7` | `#0b0b0d` / `#17171a` / `#1f1f23` |
| `--surface-ink` (dark tile) | `#121214` | `#f4f4f6` (inverts) |
| `--ink` / `--ink-2` / `--ink-3` | `#121214` / `#56565e` / `#85858e` | `#f4f4f6` / `#a9a9b2` / `#75757e` |
| `--brand` | `#df1c71` raspberry | `#ff4f96` |
| `--gap` / `--row` / tile radius | `clamp(10px, 1.1vw, 16px)` / `132px` / `28px` | same |

Type 12 / 14 / **16** / 19 / 24 / 34 / 48, display `clamp(46px, 6.6vw, 104px)` 600, tracking −0.035em. Controls 44 / 52px, pills.

## Brand adaptation

- `--brand` can be any saturated colour that holds white text at ≥ 4.5:1 (cobalt `#2f6fd6`, green `#1f9d55`, orange `#ff6a1a` with dark ink, violet `#7c3aed`). It appears on one tile per group, the primary button and active markers only.
- Product imagery sits inside tiles, bleeding off an edge (`.tile-art` is absolutely positioned behind the copy).
- Keep the canvas neutral grey; tint it only very slightly toward the brand if needed.

## Website patterns

- **Header**: three translucent tiles — logo · centered nav (current = grey pill) · language/theme/accent CTA; on phones nav moves into a dropdown tile.
- **Hero bento**: a `w-4 h-3` hero tile (badge, display, lead, two pills, product art bleeding off the corner) + a dark `w-2 h-2` stat + an accent `w-2 h-1` link tile.
- **Features**: section head + a bento of `w-2`/`w-3` tiles, one dark, one soft; each with a label icon and one visual (scribble, template grid, profile bar).
- **Specs**: segmented tabs above a full-width tile with a two-column definition list.
- **Order**: a form bento — option tiles for model, swatches for colour, stepper, add-on checks, email — beside a dark summary tile with the live total.
- **Reviews**: three quote tiles. **FAQ**: an accent title tile + a tile of `<details>`. **Footer**: small tiles, newsletter in one.

## Dashboard patterns

- **Header**: logo tile · tabs tile · actions tile (language, theme, avatar).
- **Home**: greeting + Customize; widgets: storage donut, device status with battery and sync, KPI tile, accent quick-note form, bar chart, searchable recent list, small stat tiles. Each widget has S/M/L(/XL) sizes in edit mode; charts redraw after resizing.
- **Collections**: chips filter + accent "New" button; tiles with patterned covers, counts, avatars, corner arrows; create dialog with option tiles and swatches.
- **Devices**: device tile, dark update tile with a progress bar, sessions table tile.
- **Settings**: a form made of tiles (account, switches, export option tiles, danger tile) with one save row.

## Components

`.bento`, `.w-1…6`, `.h-1…4`, `.tile` (`.ink`, `.brand`, `.soft`, `.flush`, `.center`, `.lift`), `.tile-label`, `.tile-title`, `.tile-foot`, `.tile-art`, `.corner`;
`.display`, `.h1–.h3`, `.lead`, `.big`, `.kpi`, `.delta`; `.site-head` + `.head-tile`, `.logo`, `.nav`, `.mnav`, `.app-head`, `.page-head`;
`.btn` (+ `-brand`, `-soft`, `-ghost`, `-sm`, `-lg`, `-icon`, `-block`), `.seg`, `.tabs`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.options`/`.option`, `.swatches`, `.switch`, `.qty`;
`.badge`, `.progress`, `.avatar(s)`, `.list`, `.table`, `.legend`, `.tile-tools` + `[data-editing]`, `dialog.modal`, `.toast`, `.ic`.

## Interaction & motion

Calm and quick: 160–300ms with a soft ease-out. Linked tiles lift 3px and turn their corner arrow; buttons rise 1px;
progress bars glide. Edit mode outlines tiles with a dashed line and shows size buttons. Reduced motion removes lifts.

## Persian & RTL

- Vazirmatn throughout; condensed width does not apply to Persian — numbers stay Vazirmatn 600–700 with Persian digits.
- The grid, corner arrows (mirrored), header tiles and switch knobs flip automatically; art bleeds off the inline-end edge.
- Weekday/date labels via `data-date`, relative times via `data-ago`, prices via `data-fmt="usd"`.

## Accessibility

Ink on white ≈ 18:1, white on raspberry ≈ 4.6:1. Focus ring is a 3px accent halo on every control. Tiles that are links
contain real text; decorative art is `aria-hidden`; option tiles keep native radios; edit-mode buttons are `aria-pressed`
and grouped with a label; charts carry labels.

## Component library overrides (shadcn/ui etc.)

`--radius: 28px` for Card (→ tile, no border/shadow), 999px for Button/Input pills; Tabs → grey track with white active;
RadioGroup → option tiles; Badge → soft pill; Dialog → tile-shaped; Chart → smooth lines, rounded bars, black + accent.

## Anti-patterns

- Uneven gaps, borders around tiles, drop shadows everywhere.
- Several ideas crammed into one tile; text floating outside tiles.
- More than one accent colour; more than one dark tile per group.
- Rigid tiles that clip their content on phones (use `minmax(var(--row), auto)` rows).

## Pre-ship checklist

- [ ] Every element lives in a tile on one grid with one gap.
- [ ] One idea per tile; sizes express priority.
- [ ] One dark and one accent tile per group; stats in condensed numerals.
- [ ] Linked tiles have corner arrows; choices are option tiles.
- [ ] Dashboard Customize works; charts redraw on resize.
- [ ] Phones: 2 columns, wide tiles go full width, nothing clips.
- [ ] Persian: Vazirmatn, Persian digits, mirrored arrows.
