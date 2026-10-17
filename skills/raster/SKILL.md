---
name: raster
description: Tastefolio "Raster" design language — the Swiss / International Typographic Style for the web. Pure white, black rules, one signal red, a strict 12-column grid that can be revealed with a keystroke, huge flush-left grotesk headlines, label/content splits, giant numerals, geometric poster compositions, square rule-based controls, and an operations dashboard with timed-entry slot grids, ruled tables and straight-line charts. Use when the user asks for the Raster or Swiss style, or builds a museum/gallery/festival/cultural program, architecture or design studio site, schedules/timetables, or an at-a-glance operations dashboard — in English (LTR) and/or Persian (RTL).
---

# Raster

**Swiss grid system.** The grid is the design. Every edge lands on a column line, type does all the expressing,
and color is reduced to black, white and one red that marks what matters right now. No ornaments, no rounded
corners, no shadows — clarity through alignment, scale contrast and rules.

Covers **public sites** (exhibition/program pages, schedules, collections, booking) and **operations dashboards**
(numbers, capacity, timetables, tables).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** White/black/red, Archivo type scale with tight display tracking, 8-pt spacing, zero radius; dark + Persian. |
| [assets/kit.css](assets/kit.css) | 12-col grid (`.grid`, `.c-*`, `.g4`, `.g9`), grid overlay, `.split`, lists, header, posters, square buttons/inputs/qty/switch, tabs, tables, flags, KPI numerals, slot grid, meters. |
| [assets/kit.js](assets/kit.js) | `[data-grid-toggle]` (+ `data-hotkey="g"`), tabs, filters, qty, sorting, dialogs, validation, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Exhibition hall: hero, exhibitions, program, posters, ticket booking. |
| [examples/dashboard.html](examples/dashboard.html) | Operations: today, tickets, exhibitions. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;500;700&display=swap">
```
One grotesk family, two or three weights: **Archivo** 400/500/700 with tabular figures. Persian: **Noto Sans Arabic**
400/500/700 (neutral, rational). Fallbacks: Helvetica Neue / Inter Tight / Arial; Vazirmatn.

## Identity rules (non-negotiable)

1. **12-column grid, always.** Layout spans whole columns (`.c-3`, `.c-9`…), gutters 24px; it collapses to 6 then 1 columns. Ship the overlay (`.grid-overlay` + `[data-grid-toggle]`, key **G**) so alignment can be checked.
2. **Flush-left, ragged-right** (flush-start in RTL). Never center body copy or headlines.
3. **Scale contrast instead of decoration.** Display 56–168px weight 700, line-height .88, tracking −0.045em next to 13–16px text. Two weights per screen.
4. **Black rules structure the page**: 2px rules above every section/split, 6px under the header area; tables use 2px header rules and light row lines.
5. **Label / content split.** Sections are a 3-column label (h3 + note) and a 9-column content area.
6. **One red.** `--brand` marks the current item, key numerals, the primary action and "attention" flags. Everything else is black, white and gray.
7. **Numbers are display type.** Dates and KPIs as giant tabular numerals; units small beside them.
8. **Imagery is geometry.** Posters built from discs, bars and type; real photos (if any) are cropped to grid ratios, never rounded.
9. **Square controls.** 2px black borders, zero radius, no shadows; hover inverts (black fill, white text); primary is red.
10. **Status = square flags + words** (green on, red soon/attention, black done, gray other).

## Tokens

| Role | Value |
|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#fff` / `#f2f2f0` / `#e4e4e1` |
| `--ink` / `--ink-2` / `--ink-3` | `#0a0a0a` / `#3d3d3b` / `#7a7a76` |
| `--line` / `--line-2` | black rules / `#c9c9c5` row lines |
| `--brand` | `#e4002b` signal red |
| radius / shadow | 0 / none |

Type 11 / 13 / 16 / 21 / 28 / 40 / 64 / display `clamp(56px, 10vw, 168px)`. Spacing 8-pt (4…144). Controls 40 / 52px.

## Brand adaptation

- `--brand` must be a pure, saturated signal hue: red (default), cobalt `#0047bb`, green `#007a3d`, orange `#ff6a00`, or black-only (`#0a0a0a`) for monochrome identities.
- Never add a second accent; tints of the brand are allowed only for the grid overlay and error fields.
- If the brand typeface is a grotesk (Helvetica-like), it may replace Archivo; avoid humanist or geometric-rounded faces.

## Website patterns

- **Header**: 12-col bar — wordmark with a red square (3 cols), nav (6 cols, current item red), tools (3 cols: Grid (G), language, red "Tickets").
- **Hero**: 8 cols of stacked display words (one word per line) + giant red date numeral; 4 cols with a geometric poster, lead (≤ 36ch) and a red primary button with an arrow pushed to the end.
- **Exhibitions**: split with underline filter tabs and a ruled list (room label / big title / dates).
- **Program**: split with a select filter and a table whose date column uses big numerals (red for the next event).
- **Collection**: 4-up poster grid (2-up on phones).
- **Visit/booking**: split — hours as ruled rows; form on a 9-col sub-grid: date, email, quantity steppers with prices, total in display numerals, black submit.
- **Footer**: 6px rule, 4 columns.

## Dashboard patterns

- **Header**: wordmark, giant red day numeral + long date + status line, tools (Grid, language, dark), red-underline tabs.
- **KPIs**: 4 columns, each under a 2px rule: label, giant numeral (red for the critical one), one-line context.
- **Charts**: straight lines with square-ish point markers, black for actual and red for comparison; bars without radius; axis labels bold 11px.
- **Timed entry**: slot grid (rows = rooms, columns = hours), squares filling from the bottom, red when full.
- **Meters**: thin bars with tabular percentages; red when over threshold.
- **Tables**: sortable headers with red arrows; flags for status; inverted-on-hover square buttons.
- **Dialogs**: 2px black frame, square fields, switch as a sliding square.

## Components

`.grid` + `.c-1…12` + `.start-*` + `.g4/.g9`; `.grid-overlay`; `.split`; `.list`; `.display`, `.h1–.h3`, `.label`, `.meta`, `.lead`,
`.numeral`, `.red`; `.rule`, `.rule-heavy`; `.poster` (+ `.disc`, `.bar`, `.poster-text`, `--bg/--fg/--fg2/--pt`); `.btn`,
`.btn-primary`, `.btn-ink`, `.btn-text`, `.arrow`; `.tabs`; `.field`, `.flabel`, `.input`, `.select`, `.qty`, `.check`, `.switch`;
`.table`, `.flag(.on|.soon|.done)`; `.kpis`, `.slots`/`.slot(.full)`, `.meter`.

## Interaction & motion

Instant and mechanical (100–280ms): hover inverts, tabs swap, overlay toggles. No easing flourishes, no scroll animation.
Keyboard: G toggles the grid; arrows move between tabs.

## Persian & RTL

- Noto Sans Arabic for everything; display sizes slightly smaller (`clamp(48px, 8.4vw, 140px)`), line-height 1.2, zero tracking.
- Flush-start becomes flush-right automatically; the grid mirrors; arrows (`.arrow`) flip.
- Numerals in Persian digits are fine as display type; keep them tabular-like by right-aligning in tables.
- Dates in Solar Hijri; Latin poster titles (historical) may stay Latin with `lang` set.

## Accessibility

Black/white 21:1; red on white 4.9:1 (bold or large text only). Focus: 2px red outline. Status flags always include text.
Posters are `role="img"` with labels. The grid overlay is `aria-hidden` and pointer-events none. Tables keep `th scope`.

## Component library overrides (shadcn/ui etc.)

Global `--radius: 0`; remove all shadows and rings; Button: 2px border, invert on hover, primary red; Input: 2px black border,
red on focus; Tabs: text with 4px red underline; Card → no background, a 2px top rule; Table: 2px header rule, gray rows;
Badge → square flag + text.

## Anti-patterns

- Rounded corners, shadows, gradients, icons as decoration, centered layouts.
- More than one accent; colored backgrounds for sections.
- Arbitrary widths that don't snap to columns; many font weights.
- Illustrations or photos with soft edges; emoji.

## Pre-ship checklist

- [ ] Every block spans whole grid columns; overlay toggles with G.
- [ ] Headlines huge, tight, flush-start; ≤ 2 weights on screen.
- [ ] Sections use 2px rules and label/content splits.
- [ ] Red only for current/primary/attention and key numerals.
- [ ] Controls square; hover inverts; focus visible.
- [ ] Mobile: grid → 1 column (posters 2-up); tables scroll.
- [ ] Persian: Noto Sans Arabic, no tracking, flush-right, Persian digits.
