---
name: syllabus
description: Tastefolio "Syllabus" design language — a clear, encouraging, Persian-first online academy and learning platform. Cool paper surfaces with a navy structure (hero, lesson player, footer) on a faint graph-paper grid, a highlighter-orange brand that always carries dark text, marker-yellow strokes under key words, course cards with one anatomy (length, instructor, level, rating, price), dotted learning-path steps, a curriculum accordion with free previews and locks beside a sticky buy card, and a student panel with a navy welcome band and folder tabs, weekly goal ring and streak, agenda, a working lesson player (chapter ticks, speed, captions, time-stamped notes, Q&A, files) and verifiable certificates; Lexend + Vazirmatn, Tabler Icons. Use when the user asks for the Syllabus, online course, academy, e-learning, LMS, bootcamp, tutoring or student-panel style — Persian (RTL) and English (LTR).
---

# Syllabus

**A school that wants you to finish.** Paper-white pages, a navy frame for the moments that matter (the promise in
the hero, the lesson you are watching, the footer), and one bright highlighter colour for the next step — enrol,
resume, save. Key words get a yellow marker stroke, the way a student would underline a textbook. Every screen
answers "what do I learn next, and how far along am I?".

Covers **public academies** (catalogue, course page, learning paths, instructors, membership) and **student panels**
(overview, my courses, classroom with player, certificates).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/navy palette, highlighter `--brand` with dark `--brand-ink`, `--marker`, Lexend / Vazirmatn, radii 10/14/20; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Header with courses dropdown, buttons, tabs, seg, chips, fields, switch, badges, levels, progress; navy graph hero, course search, float cards; course cards, learning paths, curriculum + lessons, sticky buy card, instructors, quotes, plans, FAQ; welcome band + folder tabs, panels, continue card, agenda, week strip, lesson player, notes, certificates; modal, toast, charts, footer. |
| [assets/kit.js](assets/kit.js) | Toggles, tabs, pressed groups, filters + search, dialogs, validation, copy, charts, `clock` / `dur` time formats, Jalali dates, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Academy home: header with courses dropdown, navy graph hero with marker headline, search and popular topics, filterable course grid (topic chips, level, search), learning paths, course spotlight with curriculum + sticky buy card, instructors, testimonials, membership with monthly/yearly switch, FAQ, CTA band, footer. |
| [examples/dashboard.html](examples/dashboard.html) | Student panel: navy welcome band with goal and folder tabs; overview (continue card, weekly goal ring + streak, study-time chart, agenda, path progress, recommendations), my courses with status filters and search, classroom (player, lesson switching, mark as finished, notes, Q&A, files, curriculum sidebar), certificates + verification form, goal dialog. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300..800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css">
```
**Lexend** 400–800 (Latin, designed for reading ease), **Vazirmatn** (Persian, 400–900; display 800). Icons: **Tabler
Icons** webfont, `<i class="ti ti-name" aria-hidden="true"></i>`; filled variants (`ti-player-play-filled`,
`ti-star-filled`) only for play buttons and ratings. Course thumbnails are gradient tiles with a faint grid and one
large icon (or a real still from the lesson) — never stock photos of people pointing at laptops.

## Identity rules (non-negotiable)

1. **Navy is the frame, paper is the page.** Navy (`--navy`) is reserved for the hero band, the welcome band, the lesson player, the footer and primary dark buttons; everything else sits on paper (`--canvas`, `--surface`). Navy bands carry a faint 32px graph-paper grid.
2. **The highlighter is the next step.** `--brand` fills the one primary action per view (enrol, resume, save goal), progress bars, the current lesson and the current path step — always with dark `--brand-ink` text. No second accent.
3. **Marker stroke on key words.** One phrase per heading gets `.marker` (a yellow band across the lower half of the text); on navy it becomes a translucent brand band. Never a whole sentence.
4. **One course-card anatomy.** Gradient thumbnail (icon, length pill, optional tag, play on hover) → kicker → 2-line title → instructor → meta (lessons · level dot · learners) → dashed divider → rating + price (old price struck, or "Free" in success green).
5. **Progress is always visible**: per course (bar + "27 of 42"), per path (dotted steps with done/now nodes), per week (goal ring + streak strip), per lesson (player track with chapter ticks).
6. **Curricula are honest.** Chapters are an accordion with lesson count and total time; free previews carry a badge, the rest a lock until bought; the buy card stays sticky beside it.
7. **Levels have fixed colours**: beginner = success green, intermediate = info blue, advanced = violet — as a dot plus a word, never colour alone.
8. **Rounded and calm**: cards 20px, inputs/buttons 10px, chapters 14px; 1px `--line` borders; shadows only on hover, floating cards and overlays.
9. **The panel is the same school**: a navy welcome band whose folder tabs open onto the paper below, the same course cards with progress instead of price, the same curriculum as a sidebar.
10. **Media timelines stay LTR** (track, time, controls) in both directions; everything around the player follows the page direction.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f6f7fb` / `#ffffff` / `#eef1f7` | `#0a1125` / `#111a34` / `#17223f` |
| `--navy` / `--navy-2` | `#0f1b3d` / `#1a2a57` | `#060b1b` / `#0f1a38` |
| `--ink` / `--ink-2` / `--ink-3` | `#111a33` / `#4a5574` / `#8590ab` | `#edf1fc` / `#a9b3cf` / `#7480a0` |
| `--brand` (highlighter) / `--brand-ink` | `#ff8c1a` / `#1b1204` | `#ffa040` / `#1b1204` |
| `--brand-soft` / `--brand-strong` | brand 12% on white / brand 70% + black | brand 14% / brand 70% + white |
| `--marker` | `#ffe27a` | `rgba(255, 210, 90, .32)` |
| success / warning / danger / info | `#15994b` / `#b45309` / `#d92d2d` / `#2a62e8` | lighter equivalents |

Type 12 / 13.5 / **15.5** / 18 / 22 / 30 / 40, display `clamp(34px, 4.6vw, 62px)` 700 (Persian 800, line-height 1.5).
Radius 10 / 14 / 20. Controls 44 / 52px. Container 1240px.

## Brand adaptation

- `--brand` should be a bright mid-tone that carries dark text at ≥ 4.5:1 (sky `#38bdf8`, lime `#84cc16`, pink `#f472b6`, lavender `#a78bfa`, yellow `#facc15`). `?brand=` sets it and picks `--brand-ink` automatically; `--brand-soft` and `--brand-strong` are derived from it.
- If the brand is dark (deep blue, maroon), use it as `--navy` instead and keep a bright highlighter as `--brand`.
- The logo mark is a navy rounded square with a three-step stair in the brand colour; replace the stair with the school's own mark, keep the square.

## Website patterns

- **Header** (sticky, translucent paper): logo · courses dropdown (2-column panel of categories with tinted icon tiles and counts) · paths · instructors · membership · help · language/theme · log in (outline) · start free (brand).
- **Hero** (navy graph): eyebrow, display headline with one marker phrase, lead, white search box with brand button, popular-topic pills, three stats; on the end side, floating white cards (a course in progress, a live session, a certificate) — slightly tilted, never more than three.
- **Catalogue**: topic chips (navy when pressed), level select and search filter one card grid; an empty state when nothing matches.
- **Learning paths**: cards with a dotted step track, total hours and an outline button.
- **Course spotlight**: curriculum accordion (chapter number tile, title, lessons · time) with free/locked lessons + sticky buy card (preview, price, old price, deal badge, what's included, enrol, gift).
- **Instructors**, **testimonials** (quote mark in brand), **membership** with a monthly/yearly segmented switch, **FAQ** (+/− tiles), **CTA band** (navy graph) and a **navy footer**.

## Dashboard patterns

- **Welcome band** (navy graph): date, greeting with a marker phrase (the streak), minutes left this week, a goal pill with "change goal", and **folder tabs** — the selected tab takes the canvas colour so it opens into the page.
- **Overview**: continue card (thumbnail, chapter · lesson, course, instructor, progress, resume + notes), weekly goal ring + 7-day streak strip, study-time bars (7/30 days), agenda (date tiles: live class, quiz, project), path progress, recommendations with save.
- **My courses**: status chips with counts (all, in progress, finished, saved) + search; cards show progress, last opened, resume / view certificate / start.
- **Classroom**: player (big play, caption line, track with chapter ticks, play, ±10s, time, speed, captions, full screen) → lesson title with previous/next → "I've finished this lesson" → tabs (overview, notes with time stamps, Q&A with instructor answers, files) + curriculum sidebar (done, now, upcoming, locked).
- **Certificates**: paper certificate cards (logo, name, course, score, date, LTR ID, brand seal) with PDF, copy link and LinkedIn; a locked one shows what is left; a public verification form.

## Components

`.site-head`, `.logo`/`.logo-mark`, `.nav`, `.drop`/`.drop-panel(.end)`, `.btn` (+ `-primary`, `-outline`, `-ghost`, `-white`, `-sm`, `-lg`, `-icon`, `-block`), `.tabs`, `.seg`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.ok|.warn|.bad|.info|.brand|.navy)`, `.level.l1|l2|l3`, `.progress(.done)`, `.avatar`;
`.on-navy`, `.graph`, `.marker`, `.eyebrow`, `.hero`, `.course-search`, `.popular`, `.hero-stats`, `.float-card(.tilt)`;
`.course` (+ `.thumb`, `.tag`, `.len`, `.play`, `.body`, `.kicker`, `.title`, `.teacher`, `.meta`, `.foot`, `.stars`, `.cost`), `.cgrid`, `.path`, `.steps` (`li.done|.now`, `.node`), `.curriculum`, `.chapter`, `.lesson(.free|.done|.now|.locked)`, `.buy`, `.instructor`, `.quote`, `.plan(.featured)`, `details.faq`;
`.welcome`, `.pill-tabs`, `.panel`, `.panel-head`, `.continue`, `.agenda`/`.when`, `.week` (`b.on|.today`), `.player` (+ `.slide`, `.caption`, `.big-play`, `.bar`, `.track`, `.tick`, `.controls`, `.time`), `.lesson-layout`, `.note-list`, `.stamp-time`, `.cert(.locked)`/`.seal`, `dialog.modal`, `.toast`, `.site-foot`.

## Interaction & motion

Gentle and quick (150–460ms): cards lift 3px with a shadow and reveal the play button; progress bars ease to their
value; the chapter chevron rotates. The player advances once a second while playing (static under reduced motion and
screenshots); clicking or arrowing the track seeks; switching lessons resets the player and updates the title, chapter
and counters everywhere; finishing a lesson updates every progress bar and confirms with a toast.

## Persian & RTL

- Persian is the default; English via `data-alt`. Counts and prices `data-num` (Toman with Persian separators), dates `data-date` (Jalali), percentages `data-fmt="pct"`, lesson lengths and stamps `data-fmt="clock"` (۱۶:۳۰ / 16:30), relative times `data-ago`.
- Chevrons for next/previous use `.flip-rtl`; the stair logo mirrors; the player bar, track, IDs and file sizes stay LTR.
- Persian headings use weight 800 and line-height ≥ 1.5 so the marker band sits under the letters, not through them.

## Accessibility

Ink on paper ≈ 16:1; dark ink on the highlighter ≈ 9:1; white on navy ≈ 16:1; `--brand-strong` text on white ≥ 4.5:1.
Tabs are real tablists (arrow keys), the player track is a `role="slider"` with value text, play/captions are
`aria-pressed` toggles, every icon-only button has a label, locked lessons are `aria-disabled` with an explanation,
the streak strip has a text alternative, focus rings are a 3px brand halo.

## Component library overrides (shadcn/ui etc.)

`--radius: 20px` (cards), 10px (buttons/inputs); Button default → navy, `primary` → highlighter with dark text;
Tabs → underline in brand (content) or folder tabs on navy (panel); Accordion → curriculum chapters; Progress →
8px pill in brand; Badge → pill; Card → course card anatomy; Dialog → 20px modal.

## Anti-patterns

- Navy everywhere (dark mode is a theme, not the identity) or the highlighter on every button.
- White text on the highlighter; marker strokes on whole paragraphs.
- Course cards with different anatomies, missing lengths or prices that appear only after a click.
- Fake scarcity (countdowns that reset), hidden curricula, progress you cannot see.
- Mirroring the video timeline in RTL.

## Pre-ship checklist

- [ ] Navy only on hero, welcome band, player, footer, dark buttons; one highlighter action per view.
- [ ] One marker phrase per heading; dark ink on every brand fill.
- [ ] Course cards share one anatomy; levels use dot + word.
- [ ] Curriculum shows counts, time, free previews and locks; buy card is sticky on desktop.
- [ ] Panel: folder tabs, goal ring + streak, continue card, working player and lesson switching.
- [ ] Persian: Jalali dates, Persian digits, LTR timeline and IDs, 800 headings.
