---
name: brief
description: Tastefolio "Brief" design language — a confident, work-first, Persian-first look for design and web studios, freelancers and other project-selling businesses. Soft paper pages, an ink "stage" that holds the work, one orchid accent for the next step and feedback pins, wide Syne display type with inline image pills, numbered services that open like a brief, case cards whose tall pages scroll inside browser frames, a challenge–approach–outcome spotlight with big metrics, a three-step project-brief wizard, a floating consult widget, and a client portal (phases, Gantt timeline with a today line, approvals with click-to-pin notes and versions, files with upload, instalment invoices, messages); Syne + Figtree + Vazirmatn, Iconoir icons as an inline sprite. Use when the user asks for the Brief, agency, studio, portfolio, case-study, freelancer or client-portal style — Persian (RTL) and English (LTR).
---

# Brief

**The work speaks first; the process is never a mystery.** Pages are soft paper with wide, confident type. The
work sits on an ink stage, inside browser frames whose tall pages scroll when you point at them. Everything a client
needs to decide is numbered — services, steps, case studies, instalments — and every piece of feedback is a pin on
the design itself. One orchid accent marks the next step: start a project, approve, pay, send.

Covers **studio sites** (hero, services, work, process, case study, testimonials, brief wizard, FAQ, contact) and
**client portals** (overview, timeline, approvals, files, invoices, messages).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/ink/orchid palette, `--stage`, Syne / Figtree / Vazirmatn, radii 8/16/28; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Header with availability, pill buttons with arrow discs, tabs, seg, chips, fields, switch, badges, code chips, progress, avatars; inline headline pills; browser frames + mock-page modules; hero, showcase, marquee; numbered services; work grid; process; spotlight + metrics; quote slider; brief wizard (picks, radio chips, step bar); FAQ; ink footer with a giant CTA; consult widget; portal (sidebar, project head, phases, KPI cards, waiting list, feed, Gantt, pins + notes, files, dropzone, tables, thread, composer); modal, toast, charts. |
| [assets/kit.js](assets/kit.js) | Toggles, tabs (vertical too), pressed groups, filters + search, sorting, steps, dialogs, validation, carousel, copy, charts, Jalali dates, Toman, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Studio home: header with availability, wide headline with inline pills, ink showcase of three tilted browser frames, client marquee, numbered services accordion, filterable work grid with scrolling frames, process, case-study spotlight, testimonials, three-step brief wizard, FAQ, “Let’s talk” footer, consult widget. |
| [examples/dashboard.html](examples/dashboard.html) | Client portal: ink sidebar (project switcher, sections, project lead), project head with phases; overview (KPIs, waiting on you, activity, team hours, next check-in), Gantt timeline, approvals (versions, click-to-pin notes, approve / request changes), files (folders, search, list/grid, upload), instalments + payment dialog, messages. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@500..800&family=Figtree:wght@400..800&family=Vazirmatn:wght@100..900&display=swap">
```
**Syne** 700–800 for display (wide, tight tracking), **Figtree** 400–700 for text, **Vazirmatn** for Persian
(display 900, body 400–700). Mono labels (`.eyebrow`, `.idx`, codes) use the system mono stack; in Persian they switch
to Vazirmatn so word spacing stays natural.

Icons: **Iconoir** (MIT, 1.5px stroke) as an inline sprite — put `<symbol id="i-name">` elements in a hidden
`<svg class="sprite">` and use `<svg class="ic"><use href="#i-name"/></svg>`. Only ship the icons you use (the full
Iconoir CSS is ~3 MB). Directional icons get `.flip-rtl`.

## Identity rules (non-negotiable)

1. **Paper and a stage.** Pages are `--canvas` paper; the work (showcase, case study), the portal sidebar and the footer sit on the ink `--stage` with a faint 18px dot grid. Never put the work on plain white.
2. **One orchid action.** `--brand` is for the next step (start a project, approve, pay, send), the active pin and selection. Everything else is ink, paper and greys.
3. **Wide display type.** Headlines are Syne 700–800 with `-0.035em` tracking (Vazirmatn 900 in Persian); at most one inline `.ipill` (a tiny site or the team’s faces) per headline.
4. **Work lives in browser frames.** Case thumbnails are `.browser` frames with a URL bar; the tall page inside scrolls to its end on hover/focus. Use real screenshots (a tall `<img>` inside `.page`) or the abstract mock modules — never cropped flat images.
5. **Numbers lead.** Services, process steps, case-study columns, sections (`01 — Services`), instalments and project codes are numbered; results are big Syne metrics.
6. **Pills and discs.** Buttons are pills; primary calls to action carry a round arrow disc that turns 45° on hover. Radii: 8 (small), 16 (cards), 28 (stage panels).
7. **Feedback is spatial.** Comments on designs are numbered pins on the design (click to drop one), mirrored by a list of notes; resolved pins turn grey.
8. **The portal mirrors the process.** The same four phases appear in the project head, the Gantt and the invoices (one instalment per milestone).
9. **Status colours are semantic**: success = done/paid/approved, warning = waiting/due, info = in review, danger = overdue/failed; the orchid is never a status.
10. **Calm motion**: frames lift and scroll slowly (3.6s), service titles slide 8px, the marquee pauses on hover; everything stops under reduced motion.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f2f2ef` / `#ffffff` / `#ebebe7` | `#0f0e11` / `#18171b` / `#212024` |
| `--stage` / `--stage-2` | `#141316` / `#1f1e22` | `#08080a` / `#141317` |
| `--ink` / `--ink-2` / `--ink-3` | `#141316` / `#55545a` / `#8b8a90` | `#f2f1f4` / `#afaeb4` / `#7d7c83` |
| `--brand` (orchid) / `--brand-ink` | `#b13cdb` / `#ffffff` | `#c86bea` / `#160a1b` |
| success / warning / danger / info | `#1d9a56` / `#b26b00` / `#df3b3b` / `#2b6ee0` | lighter equivalents |

Type 12 / 13.5 / **15.5** / 18 / 23 / 32 / 46, display `clamp(44px, 7.2vw, 112px)` (Persian `clamp(38px, 6vw, 92px)`,
900, line-height 1.3). Radius 8 / 16 / 28 / pill. Controls 46 / 56px. Container 1320px.

## Brand adaptation

- `--brand` can be any saturated colour (vermilion `#ff5a1f`, cobalt `#1f6feb`, green `#0f9d76`, raspberry `#e11d74`); `?brand=` picks a readable `--brand-ink`, and `--brand-soft` / `--brand-strong` follow.
- Keep the stage dark even for light brands; a studio’s own colour belongs in its case studies (`--m1/--m2/--m3` on each frame), not in the chrome.
- The wordmark is lowercase Syne 800 with a brand-coloured full stop; replace it with the studio’s logo but keep the dot as the accent device.

## Website patterns

- **Header**: wordmark · nav (Work, Services, Process, FAQ, Client portal) · availability pill (“2 slots open for November”, live dot) · language/theme · *Start a project* (primary with arrow disc).
- **Hero**: mono eyebrow + “since” line, wide headline with inline pills, lead + two CTAs, three stats, then the **showcase** — an ink stage with three browser frames (sides tilted, the centre one slowly auto-scrolling) and two floating result chips; a **marquee** of client wordmarks below.
- **Services**: `details.svc` rows — number, big title, tags, round +/× toggle; open rows show a description, deliverable chips and a “from …” price.
- **Work**: filter chips with counts, a two-column staggered grid of `.case` cards (frame, title, type · year, tags, one result metric).
- **Process** (four numbered cards with durations), **spotlight** (stage: challenge / approach / outcome, frames, three metrics), **testimonials** slider, **brief wizard** (needs → budget & timing → contact; success panel with a reference code), **FAQ**, ink **footer** with a giant “Let’s talk”.
- **Consult widget**: fixed pill at the inline-end corner (avatar with online dot); opens a panel with time-slot chips and *Book the call*.

## Dashboard patterns

- **Shell**: ink sidebar (wordmark, project switcher, vertical section tabs with counts, project-lead card) → off-canvas drawer with a top bar under 960px.
- **Project head**: crumbs, Syne title, code chip, phase badge, launch date, team faces, share; a four-segment **phase bar** (done = ink, current = brand fill).
- **Overview**: four KPI cards, an ink “waiting on you” list (approve, pay), activity feed, stacked hours chart, next check-in with agenda.
- **Timeline**: Gantt grid (label column + week columns, done/now/next bars, diamond milestones, a brand *today* line) in a horizontal scroller.
- **Approvals**: one tab per deliverable; versions seg, the design in a frame with numbered pins (click to add), notes list, *Approve* / *Request changes* (dialog); approved history below.
- **Files**: folder chips, search, list/grid seg, typed file tiles, drag-and-drop zone. **Invoices**: four sums (compact Toman), instalment table (sortable), payment dialog (demo — no card fields). **Messages**: bubbles (yours in ink), attachments that jump to their section, composer.

## Components

`.site-head`, `.wordmark`, `.nav`, `.avail`, `.btn` (+ `-primary`, `-outline`, `-ghost`, `-light`, `-sm`, `-lg`, `-icon`, `-block`, `.arrow`), `.tabs`, `.seg`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.ok|.warn|.bad|.info|.brand|.ink|.plain)`, `.code`, `.progress(.brand)`, `.avatar(.sm|.online)`, `.faces`;
`.display`, `.h1`–`.h3`, `.eyebrow`, `.idx`, `.lead`, `.outline`, `.ipill(.shot|.team)`, `.stage`, `.dots`;
`.browser` (+ `.bar`, `.view`, `.page`, `.scroll`, `.autoscroll`), mock modules `.m-nav`, `.m-hero`, `.m-img`, `.m-title`, `.m-cards`, `.m-band`, `.m-table`, `.m-cal`, `.m-chart`, `.m-split`, `.m-foot`, `.mock-phone`;
`.hero`, `.hero-top`, `.hero-foot`, `.hero-stats`, `.showcase` (+ `.float`), `.marquee`, `.logo-word`, `.services`/`.svc`, `.work-grid`, `.case`, `.process`, `.spotlight`, `.brief-cols`, `.metrics`/`.metric`, `.slider`/`.quote-slide`, `.brief`, `.brief-card`, `.step-ind`, `.picks`/`.pick`, `.radio-chips`, `.done-panel`, `details.faq`, `.site-foot`, `.big-cta`, `.foot-grid`, `.consult`;
`.portal`, `.side`/`.side-in`, `.proj`, `.side-nav`, `.side-foot`, `.topbar`, `.main`, `.proj-head`, `.phases`, `.grid12` (`.c3`–`.c12`), `.card`, `.card-head`, `.kpi`, `.waiting`, `.feed`, `.gantt` (+ `.wk`, `.task`, `.bar.done|.now|.next`, `.ms`, `.today`), `.legend`, `.review`, `.canvas-pins`, `.pin(.resolved|.draft)`, `.comments`/`.comment`, `.files(.grid)`/`.file`/`.ft`, `.dropzone`, `.table`, `.thread`/`.msg(.me)`, `.attach`, `.composer`, `dialog.modal`, `.toast`.

## Interaction & motion

Unhurried and precise (160–520ms; frame scroll 3.6s): frames lift and scroll on hover/focus, the showcase centre frame
auto-scrolls back and forth, arrow discs rotate 45°, service titles slide, toggles turn + into ×, the marquee pauses on
hover. In the portal: clicking a design drops a draft pin and focuses the note field; notes and pins highlight each
other; approving or requesting changes updates badges and sidebar counts; uploads and messages appear instantly.

## Persian & RTL

- Persian is the default; English via `data-alt`. Prices `data-fmt="toman"` (compact in summary cards), dates `data-date` (Jalali), relative times `data-ago`.
- Pins use logical insets so they move with the mirrored design; showcase tilts mirror; arrows use `.flip-rtl`.
- Signed results (`+38%`, `−41%`) sit in `.ltr` isolates; multipliers are spelled out in Persian (`۲٫۴ برابر`). URLs, codes, file sizes and emails are LTR.

## Accessibility

Ink on paper ≈ 17:1; white on orchid ≈ 4.6:1 (large/bold text and icons); the stage text ≥ 12:1. Frames are links
with an accessible name and scroll on keyboard focus; the design canvas is focusable and every pin is a labelled
button; tabs (vertical sidebar too) use arrow keys; the wizard validates per step with inline messages; the payment
dialog collects no card data; focus rings are a 3px orchid halo.

## Component library overrides (shadcn/ui etc.)

`--radius: 16px` (cards), pills for buttons/badges; Button default → ink pill, `primary` → orchid pill with arrow
disc; Tabs → ink underline (content) or vertical sidebar; Accordion → numbered services; Card → frame + meta;
Sheet → portal sidebar on mobile; Dialog → 16px modal; Progress → 6px pill.

## Anti-patterns

- Orchid on everything (or as a status colour); several accents at once.
- Flat cropped screenshots instead of frames; carousels of logos without real work.
- Unnumbered, vague services (“we do everything”); hidden prices and timelines.
- Feedback by email threads instead of pins; invoices that don’t match the phases.
- Thin, airy serif headlines (that’s another language) or neon gradients.

## Pre-ship checklist

- [ ] Paper pages, ink stage for the work, sidebar and footer; one orchid action per view.
- [ ] Wide display headline (≤ 1 inline pill); numbered sections.
- [ ] Every case in a scrolling browser frame with one result metric.
- [ ] Brief wizard validates per step and ends with a reference code.
- [ ] Portal: phases, Gantt with today line, approvals with pins, files, invoices per milestone, messages.
- [ ] Persian: Jalali dates, Toman, LTR isolates for signed numbers and codes, mirrored pins and tilts.
