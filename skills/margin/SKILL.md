---
name: margin
description: Tastefolio "Margin" design language — a literary, Persian-first look for essays, magazines, newsletters and long reports. Warm paper and soft black ink, one plum ink for note numbers, links and the single action, a pale reader's highlighter; Literata (optical sizes) for a ~66-character reading column with Inter + Vazirmatn; a grid page with contents on the start side and numbered sidenotes, margin notes and figure captions in the end margin (note numbers open notes inline on phones), dropcap, pull quote, reading-progress hairline, reader controls (size, paper white/sepia/night), a selection toolbar (highlight, copy quote, note), issue list, subscribe and letters; plus a writer studio (drafts, calm editor with sidenote chips, live word count, outline, pre-publish checklist, scheduling dialog, library, read-through stats, readers); Heroicons outline. Use when the user asks for the Margin, editorial, long-form, essay, magazine, newsletter, blog, sidenote or writer-studio style — Persian (RTL) and English (LTR).
---

# Margin

**The page has room to think.** Margin is a well-made book on a screen: warm paper, soft black ink, a narrow serif
column you can read for twenty minutes, and wide margins that carry the notes, the sources and the captions — the
way readers have always written beside the text. One plum ink marks everything that belongs to the conversation
around the text (note numbers, links, the one action); a pale highlighter belongs to the reader. The interface
stays quiet and small so the words stay large.

Covers **reading sites** (essay page, issue, subscribe, letters) and **writer studios** (drafts, editor, library,
stats, readers).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/ink palette, plum `--brand`, `--highlight`, Literata + Inter + Vazirmatn, `--fs-lg` (article text 19px), `--lh-read`, `--measure` (40rem; 42rem and a looser line in Persian); dark theme, `[data-paper="sepia"]`. |
| [assets/kit.css](assets/kit.css) | Masthead with wordmark, progress hairline, buttons (ink, plum, outline, ghost), seg, tabs, chips, fields, switch, badges; the `.read` grid (text column, note margin ≥1100px, contents column ≥1320px); `.prose` (dropcap, indents, highlighter `mark`), sidenotes `.sn`/`.mn` with inline toggles below 1100px, figures with captions in the margin, pull quote, contents list, reader bar, selection bar; author box, issue list, subscribe, letters, footer; writer studio (drafts, editor, toolbar, doc with note chips, aside with counts/outline/notes/checklist), panel pages, stat cells, tables; modal, toast, charts. |
| [assets/kit.js](assets/kit.js) | Tabs, pressed groups, toggles, filters + search, sorting, dialogs, validation, charts, Persian digits, Jalali dates, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Essay page: masthead, progress hairline, contents column with the current section, article head (kicker, title, dek, byline, read time), reader bar (A− / A+, paper white / sepia / night), prose with dropcap, four sidenotes, a margin note, a figure with its caption in the margin, section break, pull quote, selection toolbar, author box, issue list, subscribe form, letters, footer. |
| [examples/dashboard.html](examples/dashboard.html) | Writer studio: drafts list; editor (title, subtitle, formatting toolbar, document with sidenote chips added at the caret), aside (live words/minutes/notes, outline from headings, note list, pre-publish checklist, schedule dialog, send to editor); library (status chips, search, sortable words/reads); stats (reads, read-to-the-end, average time, subscribers, reads chart, best read-through); readers (subscriber growth, where they read, reader table, export). |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300..800;1,7..72,300..800&family=Inter:wght@400..700&family=Vazirmatn:wght@100..900&display=swap">
```
**Literata** with optical sizes (`font-variation-settings: "opsz" 18` for text, 32–72 for headings and display) for
everything that is read; **Inter** 400–700 for the interface, notes and captions; **Vazirmatn** for all Persian —
reading text at 18.5px with line-height 2.05, headings 800, no synthesized italics (Persian emphasis is weight, not
slant). Icons: **Heroicons** outline (MIT) as an inline SVG sprite, `<svg class="ic"><use href="#i-name"/></svg>`,
used sparingly — the reading page needs almost none.

## Identity rules (non-negotiable)

1. **One column, wide margins.** The text column is `--measure` (≈ 66 Latin characters, 42rem in Persian) and never stretches; the space beside it is used, not wasted.
2. **Notes live in the margin.** Sidenotes (numbered) and margin notes (unnumbered) float into the end margin next to their line; figure captions sit there too. Below 1100px every note number becomes a toggle that opens its note inline — never a footnote list at the bottom.
3. **Plum is the conversation.** `--brand` marks note numbers, links, the active note and the single primary action; everything else is ink. The highlighter (`--highlight`) is only for the reader's marks and selection.
4. **Serif to read, sans to operate.** Literata for titles, prose, pull quotes, numbers in stats; Inter at small sizes for UI, notes, captions and tables.
5. **The reader is in control.** Size steps, paper (white, sepia, night) and the theme apply instantly without moving the reader's place (remember them per reader in a real product); a 2px progress hairline shows how far you are; the contents list marks the current section.
6. **Selection is a feature.** Selecting prose offers highlight, copy as a quote (with the title) and add a note — a small ink toolbar above the selection.
7. **Book typography.** Indented paragraphs after the first, a dropcap in Latin only, ornaments for section breaks, balanced headings, pretty wrapping, hanging punctuation, small caps for abbreviations.
8. **Quiet chrome.** Hairline rules, radius 4–12, almost no shadows (only floating toolbars and dialogs), no cards around text.
9. **The studio feels like the page.** The editor uses the same reading column and type; counts, outline, notes and the checklist sit in the aside like margin notes.
10. **Numbers are read, not decorated.** Stats are large serif figures in ruled cells; charts are thin plum lines on paper.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#fbf9f4` / `#ffffff` / `#f3f0e8` | `#161513` / `#1d1c19` / `#24221f` |
| `--ink` / `--ink-2` / `--ink-3` | `#1c1b19` / `#57544e` / `#6e6a62` | `#ece7dd` / `#b4ada1` / `#918a7e` |
| `--brand` (plum ink) | `#7a3b69` | `#d79bc4` |
| `--highlight` | `#fbefa4` | `rgba(240, 214, 90, .3)` |
| sepia paper (`[data-paper="sepia"]`) | `#f4ecd8` canvas, `#3a2f20` ink | — |

Type 12 / 13.5 / 15 / **19 (article)** / 24 / 32 / 44, display `clamp(36px, 5vw, 64px)`; reading line-height 1.72
(Persian 2.05). Radius 4 / 8 / 12. Controls 40 / 48px. Margin column 14rem with a 3rem gap.

## Brand adaptation

- `--brand` may be any deep ink with white text ≥ 4.5:1 (oxblood `#8a2c2c`, ink blue `#27467a`, forest `#2f5d46`, violet `#5b4a8a`); `--brand-soft`/`--brand-strong` are derived. Keep the highlighter pale yellow — it is the reader's, not the brand's.
- The wordmark is set in the display serif with a small sans label (issue number, “Studio”); a real logotype can replace it if it stays one colour.
- With real illustrations or photos, keep them inside the text column (or `.wide`) and the caption in the margin.

## Website patterns

- **Masthead**: wordmark + issue number · essays, this issue, letters, write for us · language/theme · *Subscribe* (plum); on phones the nav folds behind a menu button. A 2px progress hairline above it.
- **Article head**: kicker (section · topic), display title, italic dek (upright in Persian), byline (avatar, author, date, read time).
- **Reader bar**: text size (A− / A+), paper (white / sepia / night), share; ruled above and below.
- **Body**: `.read` grid — contents column (≥1320px, sticky, marks the current section), prose column, note margin (≥1100px). Dropcap on the first paragraph (Latin), sidenotes and a margin note, a figure with its caption beside it, an ornament section break, a pull quote.
- **End matter**: author box, issue list (numbered essays with read times), subscribe card, letters to the editor, footer with columns.

## Dashboard patterns

- **Shell**: masthead with wordmark + “Studio”, underline tabs (write, library, stats, readers), save state dot, language/theme, avatar.
- **Write**: drafts list (start) · editor (title and subtitle inputs, sticky toolbar: bold, italic, heading, quote, sidenote, link; the document in the reading face) · aside (words / minutes / notes counts, outline from headings, sidenote list, pre-publish checklist, *Schedule…* dialog with day, time and send-to-subscribers switch, *Send to editor*).
- **Library**: status chips (all, drafts, scheduled, published), search, sortable words and reads, serif titles.
- **Stats**: four ruled stat cells (reads, read to the end, average time, new subscribers), reads-per-day line, best read-through bars.
- **Readers**: subscriber growth area chart, where-they-read donut, reader table with masked emails and open rates, export.

## Components

`.masthead`, `.wordmark`, `.nav`, `.head-end`, `.menu-btn`, `.progress-line`, `.btn` (+ `-plum`, `-outline`, `-ghost`, `-sm`, `-lg`, `-icon`), `.seg`, `.tabs`, `.chips`, `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.plum|.ok|.warn|.bad)`, `.avatar(.lg)`;
`.read` (`.wide`, `.bleed`, `.toc-col`), `.article-head`, `.kicker`, `.display`, `.dek`, `.byline`, `.reader-bar`, `.prose` (`.dropcap`, `mark`, `.sc`), `.sn-ref` + `.sn-toggle` + `.sn`, `.mn-ref` + `.mn`, `.fig` (`.plate`, `figcaption`), `.orn`, `.pull`, `.toc`, `.sel-bar`, `.author-box`, `.essays`/`.essay`, `.subscribe`, `.letters`/`.letter`, `.site-foot`, `.foot-grid`;
`.studio`, `.drafts`, `.editor` (`.title-in`, `.dek-in`), `.toolbar` (`.sep`), `.doc` (`.note-chip`), `.aside`, `.counts`, `.outline`, `.note-list`, `.checklist`, `.panel-page`, `.stat-cells`, `.table-wrap`, `.table`, `dialog.modal`, `.toast`, `.empty`.

## Interaction & motion

Almost still (150–480ms). Pressing a note number lights its note with a plum rule (on phones it opens the note inline); the contents list
follows the scroll; the progress hairline grows; paper and size changes apply without layout jumps; the selection
toolbar appears above a selection and highlights with a soft marker; the save dot turns amber while typing and
green when saved; toasts carry a pilcrow. Nothing loops or bounces.

## Persian & RTL

- Persian is the default; English via `data-alt`. The margin is on the end side (left in RTL), the contents on the start side; sidenote numbers use Persian digits (`counter(sn, persian)`).
- Vazirmatn only for Persian, with a looser reading line (2.05) and a slightly wider measure; no dropcap, no italics — emphasis by weight; pull quotes bold and upright.
- Dates `data-date` (Jalali in Persian), ages `data-ago`, counts `data-num`; emails and times stay `dir="ltr"`.

## Accessibility

Ink on paper ≈ 16:1, plum on paper ≈ 7.5:1, white on plum ≈ 7.9:1, muted `--ink-3` ≥ 4.5:1 on every paper. Note
numbers are labels for real checkboxes that stay focusable on phones (Space opens the note) and every note sits in
the DOM next to its reference; the selection toolbar is real buttons and also follows keyboard selections; reader
controls are pressed groups; tabs use arrow keys; the editor is a labelled multi-line textbox; reduced motion removes
the hairline animation. Text size changes never break the column.

## Component library overrides (shadcn/ui etc.)

`--radius: 4px` controls, 8–12px dialogs; Button default → ink, primary action → plum; Tabs → underline; Card →
no card (use rules and whitespace); Tooltip/Popover → ink chip like `.sel-bar`; Typography → Literata with
`--measure`, Inter for UI; Sonner toast → ink with a pilcrow.

## Anti-patterns

- Full-width text lines, centred body text, or notes collected as footnotes at the bottom.
- Coloured cards around paragraphs, gradient heroes, big shadows, stock photos with text over them.
- Plum used for decoration or many colours for state; the highlighter used as a brand colour.
- Faux-italic or decorative fonts for Persian; Persian set in anything but Vazirmatn.
- An editor that looks like a form instead of the page it will become.

## Pre-ship checklist

- [ ] Reading column at `--measure`; notes and captions in the margin ≥1100px, inline toggles below.
- [ ] Plum only for notes, links and the one action; highlighter only for the reader.
- [ ] Reader bar (size, paper), progress hairline, contents with the current section.
- [ ] Selection toolbar: highlight, copy quote, note.
- [ ] Studio: drafts, editor with sidenote chips, live counts, outline, checklist, schedule; library, stats, readers.
- [ ] Persian: Vazirmatn, looser line, Persian note digits, no italics or dropcap, Jalali dates.
