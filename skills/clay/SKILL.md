---
name: clay
description: Tastefolio "Clay" design language — soft, tactile claymorphism for wellness and personal products. Cream ground, pastel clay tiles (peach, sage, lavender, butter, sky, rose), one terracotta brand; surfaces lit from above (inner highlight + inner shade + warm cast shadow), inputs/tab bars as wells pressed into the page with the chosen option popping out, pills, blobs and pebbles instead of boxes, Fraunces soft-axis serif with Nunito Sans (Vazirmatn in Persian), slow springy motion, a breathing orb, choice-card wizards and a floating dock on phones. Use when the user asks for the Clay, soft, claymorphism, pastel, calm or wellness style, or builds a meditation/sleep/health/habit/journaling/kids/family site or personal dashboard — English (LTR) and/or Persian (RTL).
---

# Clay

**Soft clay under warm light.** Every surface has a little volume: a highlight on its top edge, a shade at its
bottom and a soft warm shadow on the cream ground. Things you *type into or choose from* are pressed into the
surface; the thing you chose pops back out. Color comes from pastel tiles that code moods and categories, and a
single terracotta for action. Nothing is sharp, nothing is loud, nothing moves fast.

Covers **public sites** (app landing pages, libraries, pricing, stories, multi-step sign-up) and **personal
dashboards** (today, journal, progress, settings).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Cream/pastel/terracotta palette, `--clay`, `--clay-sm`, `--press` shadows, Fraunces SOFT + Nunito Sans / Vazirmatn, big radii, springy easing; "evening" dark + Persian. |
| [assets/kit.css](assets/kit.css) | `.clay`, `.well`, `.blob`, `.pebble`, breathing `.orb`, pill header + pressed nav, buttons, tabs/seg wells, chips, wells for inputs, custom checks/radios, `.choice` cards, switch, `.range`, qty, badges, progress, wizard dots, session cards, quotes, carousel, app shell → dock, tiles, week pebbles, mood buttons, activity calendar, dialogs, toasts, charts, footer, tone utilities. |
| [assets/kit.js](assets/kit.js) | Wizards (`data-steps`), pressed groups (incl. `data-multi`), conditional content, filters, carousel, validation, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Breathwork app: live breathing orb with patterns, filterable session library, how-it-works, stories carousel, pricing toggle, 3-step choice-card wizard. |
| [examples/dashboard.html](examples/dashboard.html) | Personal space: practice ring, week pebbles, mood check-in, continue card, charts; journal; progress calendar + badges; reminder/sound settings. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..700,100&family=Nunito+Sans:wght@400;600;700;800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css">
```
**Fraunces** with `SOFT=100` (rounded serif) 600 for display; **Nunito Sans** 400–800 for UI. Persian: **Vazirmatn** only —
700 for display, 400–600 for text. Icons: Phosphor regular, sat inside pebbles. Never use thin hairline icons.

## Identity rules (non-negotiable)

1. **Volume, not borders.** Surfaces get `--clay` / `--clay-sm`; there are no 1px borders anywhere except dashed dividers.
2. **Pressed in to choose, popped out when chosen.** Inputs, tab bars, segmented controls, tracks and empty states use `--press`; the selected tab/segment is a raised chip; pressed chips sink in.
3. **Round everything.** Pills for controls (999px), 22–34px radii for tiles, blobs/pebbles (`border-radius` with uneven percentages) for art and icons.
4. **Pastel tiles code meaning** (mood, category, day); one terracotta `--brand` for primary actions, progress and "on".
5. **Ink is plum-brown**, never black; the evening theme is warm plum, never blue-black.
6. **Soft serif headlines** (Fraunces SOFT / Vazirmatn 700), generous size, short lines; body 17px.
7. **Slow & springy.** Hover lifts 2–4px with a spring; presses sink 1px; the orb breathes on a 4–6s rhythm. All of it stops under reduced motion.
8. **One thing per tile**: a ring, a week, a mood row, a chart. Air between tiles (24px+).
9. **Wizards over long forms**: choice cards with icons, 3 steps max, dot indicator, Back/Next.
10. **Phones get a dock**: the sidebar becomes a floating pill dock at the bottom.

## Tokens

| Role | Light | Dark "evening" |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f6efe7` / `#fdf9f4` / `#f1e7dc` (wells) | `#221c27` / `#2c2532` / `#1c1720` |
| `--ink` / `--ink-2` / `--ink-3` | `#2d2433` / `#5d5263` / `#7f7385` | `#f6efe7` / `#d2c5cd` / `#a5979f` |
| `--brand` | `#bf4f37` terracotta | `#ee8a6e` |
| tiles | peach `#ffd8c2` · sage `#cfe2cc` · lavender `#ddd3f4` · butter `#f9e6a6` · sky `#cde4f1` · rose `#f7cfd6` | dimmed equivalents |
| shadows | `--clay`, `--clay-sm`, `--press` | deeper, cooler |

Type 12 / 14 / **17** / 20 / 25 / 32 / 44, display `clamp(44px, 6.6vw, 92px)`. Radius 14 / 22 / 34 / pill. Controls 46 / 58px.
Easing `cubic-bezier(.34, 1.4, .64, 1)`; durations 180 / 320 / 600ms.

## Brand adaptation

- `--brand` should be a fired, earthy or berry tone that reads on cream with white text ≥ 4.5:1: terracotta (default), plum `#7d6bd1`, moss `#3e7d55`, lake `#3f6c9a`, rosehip `#d9788a` (use dark ink on it).
- Map brand illustrations into pastel tiles; keep blobs and pebbles as the shape vocabulary.
- Logos sit beside a pebble mark (`.logo-mark`), never in a hard square.

## Website patterns

- **Header**: floating pill bar (sticky, blurred) with logo, a pressed-in nav well whose current link is raised, language/theme, primary CTA.
- **Hero**: eyebrow pill, soft-serif display, lead, primary + secondary, social proof avatars; an interactive **breathing orb** with pattern segments and pause.
- **Library**: mood chips + length segment filters; session cards with pastel art (blob + pebble icon), badges and a round play button.
- **How it works**: three pastel tiles with numbered pebbles. **Stories**: colored quote tiles in a carousel.
- **Pricing**: billing segment; the recommended plan is a raised peach tile.
- **Sign-up wizard**: choice cards (`.choice` with radio), dots indicator, Back/Next, success tile.
- **Footer**: one big clay slab with columns and a dashed divider.

## Dashboard patterns

- **Shell**: floating clay sidebar (logo, vertical tablist, "for tonight" tile) → bottom dock on phones.
- **Today**: practice ring (donut with center label), week pebbles (`.week i.on/.today`), mood buttons (`.moods` group), continue card with progress, suggestions list, soft area + bar charts.
- **Journal**: mood row, textarea, multi-select tag chips, recent entries with mood pebbles.
- **Progress**: four pastel stat tiles, 35-day activity calendar (`.cal .l1–l3`), badges as pebbles (locked = pressed in).
- **Settings**: switch rows with time inputs, day chips (multi), voice choice cards, `.range` sliders with outputs.

## Components

`.clay(.pad|.sm)`, `.well`, `.blob`, `.pebble`, `.orb-wrap` + `.orb` (+ `.phase.in|hold|out`, `.count`), tone classes `.peach .sage .lavender .butter .sky .rose`;
`.site-head .bar`, `.logo`/`.logo-mark`, `.nav`; `.display`, `.h1–.h3`, `.eyebrow`, `.lead`, `.mark`; `.btn` (+ `-primary`, `-ghost`, `-sm`, `-lg`, `-icon`, `-block`), `.link`;
`.tabs`, `.seg(.sm)`, `.chips`; `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.check`, `.choice`, `.switch`, `.range`, `.qty`, `.badge(.tone)`, `.progress`;
`.wizard`, `.step-dots`; `.session` (+ `.art`, `.meta`), `.quote`, `.avatar`, `.carousel`; `.shell`, `.side`, `.side-nav`, `.side-card`, `.main`, `.app-head`,
`.grid-a`, `.tile`, `.tile-head`, `.big-num`, `.week`, `.moods`, `.cal`, `.legend`, `.list`; `dialog.modal`, `.toast`, `.site-foot`.

## Interaction & motion

Spring on hover (lift) and selection (pop), sink on press. Breathing orb: in 4s → hold → out 6s with a soft ease,
labels and countdown follow; patterns switch live; pause button. Wizard steps cross-fade; the dot stretches into a
pill. Toasts are clay pills. Reduced motion: orb static, no lifts.

## Persian & RTL

- Vazirmatn 700 for display (line-height ≥ 1.5), Vazirmatn 400–600 for text (≈16px, 1.9); no letter-spacing.
- Weekday pebbles use single-letter labels (`ش ی د س چ پ ج`); dates through `data-date` (Jalali).
- Dock, sidebar and arrows (`.flip-rtl`) mirror; blobs need no mirroring.

## Accessibility

Ink on cream ≈ 13:1; white on terracotta ≈ 4.8:1; pastel tiles carry dark ink only. Focus is a soft but clear 3px
terracotta ring. Mood buttons have labels; the orb region is `aria-live="polite"` for phase changes; progress bars
have values; calendar has a summary label. Wells are not the only signal — selected items also change color.

## Component library overrides (shadcn/ui etc.)

`--radius: 22px`; remove borders; Card → `.clay`; Input/Select/Textarea → wells (`--press`, pill); Tabs/ToggleGroup →
pressed track with raised active; Checkbox/Radio → custom clay; Switch → pill well + clay knob; Slider → `.range`;
Badge → pastel pill; Dialog → clay slab with blurred backdrop; Sidebar → floating clay panel + mobile dock.

## Anti-patterns

- Hard 1px borders, sharp corners, pure black text or backgrounds.
- Neon, saturated gradients; glassmorphism blur on everything.
- Dense tables, tiny text, many controls per tile.
- Fast or bouncy-cartoon animation; gamified streak shaming.
- Shadows so strong they look like floating cards from a different style.

## Pre-ship checklist

- [ ] Surfaces use clay shadows; no borders.
- [ ] Inputs/tabs are wells; selected items pop out.
- [ ] Pastels code meaning; terracotta only for action/progress.
- [ ] Soft serif headlines; generous spacing.
- [ ] Orb and lifts respect reduced motion.
- [ ] Wizard ≤ 3 steps with Back/Next and validation.
- [ ] Phones: dock nav, tiles stack, nothing overflows.
- [ ] Persian: Vazirmatn only, Jalali dates, mirrored dock.
