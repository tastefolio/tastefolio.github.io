---
name: datasheet
description: Tastefolio "Datasheet" design language — dense engineering catalog for technical commerce. White paper with blueprint grids and schematic traces, graphite ink with one signal red, condensed industrial headings with red index numbers, monospace part numbers and spec chips, LED-style stock dots, price-break tables, faceted parametric tables with quantity steppers and compare, seven-segment readouts, and a B2B procurement panel with BOM upload/matching and order tracking. Use when the user asks for the Datasheet style or builds an electronics/industrial/lab/spare-parts store, a B2B catalog with many specs, or procurement/inventory tools — in Persian (RTL, default) and/or English (LTR).
---

# Datasheet

**Engineering catalog.** Built for people who search by value, package and tolerance, not by mood. The page reads
like a well-typeset datasheet: hairline grids, monospace identifiers, exact numbers, one red signal for action. Density
is a feature — every row should answer "what is it, is it in stock, what does it cost at my quantity?"

Covers the **storefront** (search-first header, category tree, featured parts, parametric listing, compare) and the
**B2B panel** (instrument KPIs, BOM tool, orders, saved lists, watchlists).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/graphite neutrals, signal red, LED status colors, condensed + mono + readout fonts, dark + Persian. |
| [assets/kit.css](assets/kit.css) | Blueprint/traces, index titles, LED dots, 7-segment readouts, joined search bar, category menu/tree, part cards, facets, parametric table, price breaks, qty stepper, compare bar, procurement app. Loads the DSEG7 font. |
| [assets/kit.js](assets/kit.js) | Filters, sorting, qty steppers, tabs, dialogs, toasts, charts (step lines with dots), fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Component store with parametric resistor table and compare dialog. |
| [examples/dashboard.html](examples/dashboard.html) | Procurement panel: readouts, BOM matching, orders, saved lists. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&family=Roboto+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css">
<!-- kit.css declares the DSEG7 Classic face (OFL) for readouts -->
```
UI: **Barlow**; headings: **Barlow Condensed** (uppercase in Latin); identifiers/specs/prices in tables: **Roboto Mono**;
readouts: **DSEG7 Classic**. Persian: **Sahel** for UI and headings. Fallbacks: IBM Plex Sans Condensed; Vazirmatn.

## Identity rules (non-negotiable)

1. **Signal red only for action and attention**: primary buttons, active tabs, hot trace, index numbers, deal tags, cart count. Everything else is graphite and gray.
2. **Identifiers are monospace and LTR.** Part numbers, values (10kΩ, 470µF, 25V), packages and quantities use mono — even inside Persian text.
3. **Spec chips, not sentences.** Key parameters render as small mono chips with hairline borders; descriptions come second.
4. **Stock is an LED.** Green glowing dot + count when in stock, amber + "N left" when low, gray + restock date when out. Never stock as plain text alone.
5. **Price depends on quantity.** Show price breaks (1+ / 100+ / 1k+) beside a quantity stepper; the add button sits at the row end.
6. **Search is the header.** A 2px-ink-bordered search bar joins category select + input + dark button; it is the widest element in the masthead.
7. **Hairlines and grids.** 1px `--line` dividers, 2px ink rule under section bars and table headers, 20px blueprint grid on heroes and empty states, schematic trace art with one red path.
8. **Small radii, flat surfaces.** 3–8px radii; shadows only on hover cards, menus and dialogs.
9. **Dense by default.** 13.5–14.5px text, 48px rows, zebra tint, sticky table headers, facets always visible on desktop.
10. **Readouts for headline numbers.** KPI numbers sit in dark seven-segment readouts (with ghost "8" segments). They are instruments: LTR, Latin digits.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#fff` / `#f6f7f8` / `#eceef0` | |
| `--surface-ink` / `--ink` | `#15171a` | utility bar, dark buttons, app header |
| `--ink-2` / `--ink-3` | `#4f555c` / `#8b9198` | |
| `--line` / `--line-2` / `--grid` | `#e3e5e8` / `#cdd1d6` / 4.5% ink | |
| `--brand` | `#d7263d` signal red | |
| LED | success `#1a9f53`, warning `#cc8a00`, off `--ink-3` | with soft halos |

Type 11.5 / 13 / 14.5 / 16 / 20 / 28 / 40; display `clamp(34px, 5vw, 64px)` condensed uppercase. Radius 3 / 5 / 8.
Controls 36px (46px large); rows 48px; facets column 260px; container 1320px.

## Brand adaptation

- `--brand` should be a saturated signal color legible on white with white text: red (default), blue `#0b6bcb`, orange `#e07a00`, teal `#0f766e`, violet `#6d28d9`.
- Keep LED colors semantic (green/amber/gray) regardless of brand. If the brand is green, shift "in stock" to a different green shade and rely on the "N in stock" text.
- Readouts keep their instrument colors (red/green on near-black); they do not follow the brand.

## Website patterns

- **Utility bar** (ink, 32px): shipping promise, phone (LTR), order tracking, B2B sign-in, language.
- **Masthead**: logo (red square + resistor glyph), joined search bar, account, cart with mono count. **Nav row**: dark "All categories" button opening a category menu (icon, name, mono count) + text links.
- **Hero** (3 columns): category tree | blueprint banner with schematic traces, red tag, condensed display headline, lead, 2 readouts (stock, shipped today), primary "Parametric search" + outline "Upload BOM" | two promo blocks (ink and red).
- **Category tiles**: 8-up hairline grid with red icons and mono counts.
- **Featured parts**: 5-up cards — drawn component symbol on gray, mono MPN, manufacturer · package, spec chips, LED stock, price per piece.
- **Parametric listing**: index section bar → facets (range inputs, package/tolerance/manufacturer checkboxes with counts, "in stock only" switch, reset) + results bar (mono count, filter-in-results, VAT note) + table (compare checkbox, thumbnail, MPN + maker, value chip, package chip, specs chips, LED stock, price-break mini table, qty stepper, add) → sticky dark compare bar → compare dialog table.
- **Footer**: 2px ink top rule, mono uppercase headings.

## B2B panel patterns

- **Header**: ink bar with logo, underline tabs (red indicator), language/theme/sign-out.
- **Overview**: section bar with primary action → 4 instruments (label, readout, delta) → spend bar chart (step style, dots) + low-stock watchlist with LED rows and Reserve/Notify actions.
- **BOM tool**: dashed dropzone → result panel with file name, export + "Add matched to cart", tri-color match progress (matched/alternative/not found) with legend, table of lines (ref, your query, matched part or alternative select, qty, status tag, line total or "Ask sourcing").
- **Orders**: filterable list with 4-segment progress, mono order numbers, status tags.
- **Saved lists**: panels with mono part lists and "Add list to cart".

## Components

`.btn-primary | .btn-dark | .btn-outline | .btn-ghost` (+ `-sm`, `-lg`, `-icon`); `.searchbar`; `.allcats` + `.cat-menu`; `.tree`;
`.banner.blueprint` + `.traces`; `.readout(.green)` + `.readout-label`; `.led(.low|.out)`; `.spec`, `.specs`; `.tag-*`;
`.part-card`, `.part-img`, `.mpn`, `.mfr`, `.price`; `.catalog`, `.filters`, `.facet`, `.range`, `.check .n`, `.toggle`;
`.results-bar`, `.parts`, `.breaks`, `.qty`, `.compare-bar`, `.compare-table`; app: `.app-head`, `.app-tabs`, `.instrument`,
`.panel`, `.dropzone`, `.bom-progress`, `.order-line`, `.steps-mini`.
Charts: step curves with point markers, red first series, ink second; mono axis labels.

## Interaction

Facets filter instantly (no Apply button) and show counts; applied filters can be cleared at once. Table headers sort.
Quantity steppers move in sensible pack sizes (10s). Compare collects up to ~4 rows into a sticky bar → dialog.
Hover rows tint red-soft; cards lift with a shadow. No decorative animation besides LED glow.

## Persian & RTL

- Persian source copy; technical tokens (MPNs, units, packages, ohm/µ symbols) remain Latin, mono, LTR-isolated.
- Prices in Persian digits with Toman; readouts intentionally stay Latin-digit instruments (state this in UI labels).
- Condensed uppercase headings become Sahel bold (no uppercase in Persian). Mono uppercase table headers become Sahel 12px/700.
- Facet panel stays on the inline-start side (right in RTL); compare bar and steppers mirror automatically.

## Accessibility

Signal red on white ≥ 4.6:1; LEDs always paired with text. Tables: `th scope`, `aria-sort`, labelled checkboxes and steppers.
Readouts are decorative containers around real text digits (screen readers read the number); ghost segments are `<s>`
elements hidden from meaning by repetition — keep a visible label above every readout. Focus 2px red outline.

## Component library overrides (shadcn/ui etc.)

Radius 5px; Card without shadow, 1px border; Table with sticky header, zebra, 2px ink header rule, mono cells; Badge → `.tag`
(square-ish); Checkbox accent red; Command/Combobox for part search with mono results. Do not use rounded-full pills
except LEDs and counts.

## Anti-patterns

- Big rounded cards with one product each and lots of whitespace; lifestyle photography.
- Hiding specs behind "details" pages; prices without quantity breaks; stock as plain text.
- Proportional fonts for part numbers; Persian digits inside part numbers.
- Multiple accent colors; gradients; playful illustrations.

## Pre-ship checklist

- [ ] Search bar dominates the header; category menu reachable everywhere.
- [ ] Every part row shows MPN (mono), key spec chips, LED stock, price breaks, qty, add.
- [ ] Facets update results instantly with counts; compare works.
- [ ] Section bars use red index + condensed title + 2px rule.
- [ ] Readouts labelled; LEDs paired with text; red used only for action/attention.
- [ ] Mobile: search wraps to full width, facets stack above results, tables scroll inside their frame.
- [ ] Persian: Sahel, Toman with Persian digits, LTR technical tokens.
