---
name: broadsheet
description: Tastefolio "Broadsheet" design language — newspaper editorial built from typography and rules instead of cards. Newsprint paper, black ink, hairline column rules on a 12-column grid, centered serif nameplate with dateline, red kickers above tight serif headlines, italic decks, small-caps bylines, drop caps, CSS halftone image plates, numbered most-read lists, pull quotes, and a newsroom desk (story budget ledger, editorial calendar, readership charts). Use when the user asks for the Broadsheet style or builds a news site, magazine, long-form publication, research/report portal, newsletter page or editorial CMS — in English (LTR) and/or Persian (RTL).
---

# Broadsheet

**Newspaper editorial.** The page is paper; everything else is ink. Hierarchy comes only from type size, weight,
italics and rules — never from cards, shadows or colored backgrounds. One red does the job of a highlighter pen:
kickers, live marks, late items. Dense, but calm, because the grid is strict.

Covers **publication sites** (front pages, section fronts, article pages, newsletters) and **editorial tools**
(story budget, calendar, readership).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/ink neutrals, kicker red, serif/sans/mono roles, reading sizes; dark + Persian (Naskh). |
| [assets/kit.css](assets/kit.css) | Masthead (top strip, nameplate, dateline, sections), front grid with column rules, story/kicker/hed/dek/byline, plates, briefs, most-read, opinion, ticker, restrained buttons/forms, desk (figures, ledger, status, week). |
| [assets/kit.js](assets/kit.js) | Tabs, filters, sorting, dialog, validation, charts (straight lines with point markers), fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Front page with lead story, columns, markets strip, business section, briefs, newsletter. |
| [examples/dashboard.html](examples/dashboard.html) | Newsroom desk: figures, budget ledger, week calendar, readership. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Libre+Franklin:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Markazi+Text:wght@500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap">
```
Three roles: **serif display + text** (Newsreader, optical sizes), **sans for labels/UI** (Libre Franklin), **mono for slugs/data**
(IBM Plex Mono). Persian: **Markazi Text** headlines, **Noto Naskh Arabic** body, **Vazirmatn** labels.
Fallbacks: Source Serif 4 / Georgia; Inter / Arial; Amiri for Persian text.

## Identity rules (non-negotiable)

1. **No cards.** Content sits directly on paper. Separate with 1px hairlines, 3px heavy rules (section heads, table heads) and 4px double rules (masthead bottom, boxes, footer).
2. **Strict grid.** 12 columns, 28px gutters; column rules sit in the middle of gutters (`.col-ruled`). Stories stack with hairlines between them.
3. **Story anatomy**: red uppercase kicker (11px sans, tracked) → serif headline (weight 600, tight) → italic deck → small-caps byline + read time → plate + caption → body.
4. **Headlines carry size.** Lead 48–70px; secondary 26–46px; list items 18px. Never more than three headline sizes on one screen.
5. **Ink and one red.** Red (`--brand`) only for kickers, live/breaking marks, late items, links on hover in tools. Up/down market colors are the only other hues.
6. **Images are plates.** Grayscale with a halftone dot screen (`.plate`) and a caption with photographer credit — even with real photos.
7. **Reading comfort.** Body 17px serif, 1.55 line-height (2 in Persian), measure 60–75ch, optional 2 columns with a rule for longer excerpts, drop cap on lead paragraphs (Latin only).
8. **Restrained controls.** Buttons are outlined ink rectangles with small-caps labels; inputs are underlined fields. No rounded pills.
9. **Numbers are typeset**: lining tabular figures, en-dashes for ranges, small caps for units.
10. **Tools speak newspaper**: ledgers instead of data cards; square status marks; mono slugs.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` = `--surface` | `#faf8f3` | the page is the surface |
| `--surface-2` / `-3` | `#f1eee6` / `#e6e1d6` | hover rows, plate backdrops |
| `--ink` / `--ink-2` / `--ink-3` | `#121110` / `#3f3c37` / `#78736b` | |
| `--line` / `--line-2` | `#d9d3c7` hairline / ink heavy | |
| `--brand` | `#a3211c` kicker red | |
| radius | 0 (2px max) | |

Type 11 / 13 / 17 / 20 / 26 / 34 / 46 / display `clamp(40px, 5.8vw, 82px)`. Gutter 28px. Controls 36/44px.

## Brand adaptation

- `--brand` is the publication's ink color for kickers: deep red (default), navy `#1f4e79`, forest `#2e6b3f`, plum `#7a3e9d`, burnt orange `#c2410c`. Keep it dark enough for 11px text (≥ 5:1 on paper).
- Nameplate font can change to a licensed brand face; keep it centered and framed by rules.
- Never add a second brand color; use the ink scale for everything else.

## Website patterns

- **Top strip**: date (`Intl` long), weather/location, language, night mode, sign in, outlined "Subscribe".
- **Nameplate**: centered name (38–92px serif), motto below; **dateline** between heavy rules (volume/number, edition, page count).
- **Sections**: centered uppercase sans links; sticky; current section underlined with 3px ink.
- **Front**: lead story (span 6) with plate and 2-column excerpt; middle column (span 3) of stacked secondary stories; right column (span 3) with "Most read / Latest" tabs and an opinion item with a halftone portrait.
- **Markets strip** (LTR): mono-ish sans figures with ▲/▼ in green/red.
- **Section front**: heavy-rule section head with "All … →"; three columns with plates; a pull quote between double rules.
- **Briefs**: red category label + one sentence each, hairline separated.
- **Newsletter box**: double-rule frame, kicker, serif title, underlined email field, solid ink button.
- **Footer**: double rule, 5 columns, small-caps headings.

## Newsroom patterns

- **Header**: nameplate small, "The Desk" label, date, language, night, solid "New assignment".
- **Tabs**: small-caps underline tabs (Story budget / Calendar / Readership).
- **Figures**: 4 numbers in a ruled row (no boxes), big serif numerals, red for "late".
- **Budget ledger**: mono slug, serif headline, writer, words, status with square marks (planned gray, filed green, editing amber, late red, published ink), due time; desk filters as underlined text buttons; sortable columns.
- **Calendar**: 5 ruled day columns; items with a 3px start bar (red for specials).
- **Readership**: straight-line chart with point markers and a dashed comparison series; top stories with sparklines.
- **Dialogs**: double-rule frame, kicker + serif title, underlined fields.

## Components

`.topstrip`, `.nameplate`, `.dateline`, `.sections`, `.navlink`; `.front`, `.span-*`, `.col-ruled`; `.story`, `.kicker`, `.hed(-xl|-l|-m|-s)`,
`.dek`, `.byline`, `.dropcap`, `.columns-2`; `.plate` (`--scene`, `--ratio`), `.caption`; `.briefs`, `.mostread`, `.opinion`,
`.portrait`, `.quote-pull`, `.ticker-strip`; `.rule`, `.rule-heavy`, `.rule-double`, `.section-head`; `.btn`, `.btn-solid`,
`.btn-text`; `.input` (underlined), `.subscribe`; desk: `.desk-head`, `.desk-tabs`, `.figures`, `.ledger`, `.slug`, `.status.*`,
`.filters`, `.week`, `.spark-list`.

## Interaction

Underline on hover (thicker for headlines). Tabs and filters are text with an ink underline. No animation beyond quick
fades; nothing moves on scroll. Night mode swaps paper and ink (keep rules visible).

## Persian & RTL

- Headlines in Markazi Text 600 (no tracking, line-height 1.3), body in Noto Naskh Arabic 17px / line-height 2, labels in Vazirmatn.
- Italic decks become upright regular (Persian has no italic); small caps and uppercase become plain bold labels.
- Drop caps are disabled in Persian (joined letters cannot be dropped).
- Dates in Solar Hijri, numbers in Persian digits; market tickers stay LTR with Latin symbols.
- Column rules and the grid mirror automatically.

## Accessibility

Ink on paper ≈ 17:1; red kickers ≥ 5:1. Plates have `role="img"` + `aria-label` (or real `<img alt>`). Tabs are real
tablists; sortable headers use `aria-sort`. Never convey status by the square color alone — labels are always present.
Reading width capped; zoom to 200% keeps the single-column flow.

## Component library overrides (shadcn/ui etc.)

Remove card backgrounds/shadows/radii; use `border-t` rules. Button: outlined rectangle, uppercase small label; Input:
underline only. Tabs: underline. Table: heavy header rule, hairline rows, serif cells, mono slugs. Typography plugin
(`prose`) with Newsreader, 17px, 1.55, red links on hover.

## Anti-patterns

- Rounded cards, drop shadows, colored panels, gradient buttons, emoji.
- Sans-serif headlines; more than one accent color; color-coded categories everywhere.
- Full-bleed hero videos; carousels; infinite scroll without section structure.

## Pre-ship checklist

- [ ] Nameplate + dateline + section nav present and ruled.
- [ ] Every story: kicker → headline → deck → byline; plates have captions.
- [ ] Column rules visible on desktop; single column with hairlines on phones.
- [ ] Only ink + one red; market up/down colors excepted.
- [ ] Desk uses ledgers and figures, not cards.
- [ ] Persian: Markazi/Naskh/Vazirmatn, no italics/tracking/drop caps, Persian digits, Jalali dates.
