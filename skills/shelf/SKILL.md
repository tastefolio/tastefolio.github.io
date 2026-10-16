---
name: shelf
description: Tastefolio "Shelf" design language — mobile-first consumer storefront for apps, games and media. Charcoal night canvas (light mode included), big rounded hero banners, horizontal snap shelves of squircle icons with ratings, ranked top charts with install pills, category chips, collections, an app sheet with rating bars, install buttons that become progress fills, a phone bottom tab bar, and a playful publisher console (installs, reviews with replies, release tracks, listing editor with counters). Use when the user asks for the Shelf style or builds an app/game/media store, consumer catalog or creator console — in Persian (RTL, default) and/or English (LTR).
---

# Shelf

**Consumer app-store shelves.** Browsing should feel like flipping through a toy box: rows you can swipe, bright
icons, quick installs, nothing that looks like paperwork. Content brings the color — the chrome stays charcoal and
calm; one bright blue makes every action obvious; motion has a tiny bounce.

Covers the **storefront** (banners, chips, shelves, charts, collections, item sheet, mobile tab bar) and the
**publisher console** (KPIs, install charts, reviews, releases, listing editor).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Dark default + light theme, blue brand, star yellow, rounded type, bouncy easing, Persian. |
| [assets/kit.css](assets/kit.css) | Top bar, tab bar, banners + dots, shelves/tracks, app tiles, squircle icons, chips, ranks, collections, sheet, install states, console. |
| [assets/kit.js](assets/kit.js) | Carousels (RTL-aware), groups, filters, toggles, dialogs, charts, validation, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Game & app store home with app sheet and install flow. |
| [examples/dashboard.html](examples/dashboard.html) | Publisher console: overview, reviews, releases, store listing. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&family=Vazirmatn:wght@400;500;700&display=swap">
```
Headings: **Baloo Bhaijaan 2** (rounded; covers Persian and Latin). Body: **Nunito** (Latin) / **Vazirmatn** (Persian).
Weights lean bold (600–800). Fallbacks: Fredoka / Quicksand; Lemonada for Persian display.

## Identity rules (non-negotiable)

1. **Squircle icons are the imagery.** Every item has an icon with 24% radius, two-color gradient and inner highlight. Sizes: 128 (shelf), 104 (sheet), 60 (ranks), 42–54 (lists).
2. **Shelves, not grids.** Primary browsing is horizontal snap rows with a title, "See all" and prev/next buttons (desktop). Grids are reserved for collections and settings.
3. **Pills everywhere.** Buttons, chips, search and segmented choices are fully rounded; primary = blue pill with soft colored shadow.
4. **Charcoal chrome, colorful content.** Surfaces are neutral charcoal steps; color comes from icons, banners and the one brand blue. Star ratings are always yellow.
5. **Big rounded banners.** Hero is a swipeable row of 300px banners (30px radius) with a gradient, a giant faded glyph, a small badge, a 2-line title and a pill CTA; dots below.
6. **Install is a micro-journey.** Install → progress fill with percentage → "Open"; the same component appears in tiles, ranks and sheets.
7. **Mobile first.** Under 860px: top nav collapses, search fills the bar, a 5-item bottom tab bar appears, toasts float above it.
8. **Playful motion.** `--ease` has a slight overshoot; icons lift and tilt −2° on hover; sheets rise 40px; buttons press to 96%. All disabled under reduced motion.
9. **Numbers are friendly.** Compact counts ("2.1M installs"), one-decimal ratings, sizes in MB.
10. **The console speaks the same language**: same icons, chips and pills; KPIs with faded background icons.

## Tokens

| Role | Dark (default) | Light |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` / `--surface-3` | `#0f1115` / `#181b22` / `#1f232c` / `#2a2f3a` | `#f3f5fa` / `#fff` / `#f1f3f8` / `#e5e9f2` |
| `--ink` / `--ink-2` / `--ink-3` | `#f4f6fb` / `#b2b9c8` / `#7c8496` | `#10131a` / `#4c5466` / `#8a92a5` |
| `--brand` | `#3b82ff` | `#1f6bff` |
| `--star` | `#ffc53d` | same |
| radius | 10 / 16 / 22 / 30, icons 24% | |

Type 12 / 13.5 / 15 / 18 / 22 / 28 / 38; display `clamp(30px, 4.4vw, 52px)`. Controls 40 / 50px. Tab bar 64px.

## Brand adaptation

- `--brand` can be any bright, saturated hue that holds white text (blue, pink `#ff4d6d`, green `#22c55e`, amber `#f59e0b` with dark text, purple `#a855f7`). Keep `--star` yellow unless the brand is yellow (then use orange stars).
- Icon gradient pairs come from a fixed set of ~8 hue pairs; reuse them for categories so color means something.
- The logo mark is a conic multi-color tile — swap for your own mark but keep it colorful against the charcoal.

## Website patterns

- **Top bar** (68px, translucent): logo, 4 nav pills, wide pill search, theme, language, primary "Get the app".
- **Banners** row + dots. **Category chips** with colored icons (pressed = inverted).
- **Shelves**: "Games we love", "Apps for every day"… each a `.track` of `.app` tiles (icon, name, rating ★, size). Clicking opens the **app sheet**.
- **Top charts**: three-column list of ranks (numeral, icon, name, rating + installs, install pill); Free/Paid chips.
- **Collections**: cards with overlapping icon stacks + title + one line.
- **App sheet** (dialog): close, icon 104px, name, developer, install pill + wishlist, facts row (rating, installs, size, age), screenshot strip, rating summary with yellow bars.
- **Footer**: single row; **tab bar** on phones.

## Console patterns

- **Sidebar**: logo, app switcher (icon, name, LTR package id), vertical tabs as pills (active = solid blue) with count badges.
- **Top**: greeting heading, language, theme.
- **Overview**: 4 KPI cards with faded big icons → installs area chart (blue, 28% fill) with range chips + install-source donut with legend.
- **Reviews**: star filter chips; review rows (avatar, name, yellow stars, relative time, text, "Needs a reply" badge, inline reply box toggled by Reply).
- **Releases**: tracks (production / beta / internal) with icon, version (LTR), rollout meter, status badge or action.
- **Listing**: form with live character counters, category, screenshot grid with dashed "+" tile, ads switch, save; live preview tile.

## Components

`.btn-primary | .btn-soft | .btn-ghost` (+ `-sm/-lg/-icon`), `.install(.is-busy|.is-done)`; `.topbar`, `.nav`, `.searchbox`,
`.tabbar`; `.banners`, `.banner`, `.dots`; `.shelf`, `.shelf-head`, `.see-all`, `.track`, `.app`, `.icon` (`--s`, `--c1`, `--c2`),
`.stars`; `.chips`, `.chip`; `.ranks`, `.rank`; `.collections`; `dialog.sheet`, `.app-head`, `.facts`, `.screens`, `.ratings`,
`.bars`; console: `.side`, `.app-switch`, `.kpi`, `.review`, `.reply-box`, `.release`, `.meter`, `.shots-edit`, `.counter`, `.switch`.

## Persian & RTL

- Persian source copy, casual and warm ("همین حالا بازی کن"); English mirrors.
- Baloo Bhaijaan 2 for Persian headings (rounded Naskh-Kufi feel) + Vazirmatn body at 15px / 1.9.
- Shelves scroll from the right in RTL; prev/next and "See all" chevrons use `.flip-rtl` (handled by kit.js direction logic).
- Package ids, versions and sizes stay LTR; ratings and counts use Persian digits.

## Accessibility

Tiles are real buttons (focus ring kept); icons inside have `aria-hidden`. Carousels are scrollable regions with
buttons for pointer users. Star ratings include numeric text. Install progress announces the percentage text.
Contrast: ink on charcoal ≥ 12:1; `--ink-3` ≥ 4.5:1 on `--surface`. Light theme available.

## Component library overrides (shadcn/ui etc.)

Buttons/Inputs/Badges `rounded-full`; Card radius 22px; Sheet/Dialog radius 30px with spring-in; Carousel component with
snap and RTL; Avatar → squircle (24%). Dark theme as default `:root`.

## Anti-patterns

- Square or circle app icons; dense tables on the storefront; tiny tap targets.
- Multiple competing accent colors in chrome; gray-on-gray low contrast text.
- Auto-rotating banners without controls; install buttons without feedback.

## Pre-ship checklist

- [ ] Squircle gradient icons everywhere items appear.
- [ ] Banners row + dots; at least two snap shelves with See all.
- [ ] Ranked chart with install pills; install flow shows progress → Open.
- [ ] Phone: bottom tab bar, full-width search, toasts above the tab bar, no overflow.
- [ ] Dark default and light theme both legible.
- [ ] Persian: rounded heading face, Persian digits, LTR package ids.
