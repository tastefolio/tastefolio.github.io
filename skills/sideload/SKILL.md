---
name: sideload
description: Tastefolio "Sideload" design language — friendly, information-rich content and downloads portal. Fresh green on a light gray page, white post cards with gradient covers and app-style icons, meta rows (date, size, downloads), a featured mosaic, numbered popular lists and sidebar widgets, a signature download box (info grid, mirrors, versions/changelog accordions), comments, and an author CMS (posts table, editor with link repeater, moderation queue). Use when the user asks for the Sideload style or builds a software/asset download site, tutorial blog, knowledge base or community portal and its author back office — in Persian (RTL, default) and/or English (LTR).
---

# Sideload

**Content & downloads hub.** A portal people visit daily to see what's new, grab a file, and leave a comment.
It is busy on purpose — but organized: every item has the same card anatomy, every block has the same green start
bar, every download has the same box. Friendly rounded type, fresh green, white cards on light gray.

Covers the **public portal** (home with featured mosaic, latest grid with type filters, item page with download box,
comments, sidebar widgets, newsletter) and the **author panel** (stats, posts, editor, moderation).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Greens, gray page, amber "hot", rounded type sizes; dark + Persian. |
| [assets/kit.css](assets/kit.css) | Header + category nav, featured mosaic, post cards/rows, covers & app icons, pills, widgets (popular, categories, tags, newsletter), download box, comments, author CMS. |
| [assets/kit.js](assets/kit.js) | Filters, groups, relative dates, validation, tabs, charts, toasts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Resource portal home with editor's-pick download box and comments. |
| [examples/dashboard.html](examples/dashboard.html) | Author panel: overview charts, posts, editor, moderation queue. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/samim-font@v4.0.5/dist/font-face.css">
```
Latin: **Rubik** (soft, friendly). Persian: **Samim** (regular/bold). Fallbacks: Nunito Sans; Vazirmatn / Shabnam.

## Identity rules (non-negotiable)

1. **One card anatomy.** Cover (16:9 gradient + glyph or real image) → category dot label → 2-line title → meta row (icon + date, icon + downloads/size). Same order everywhere.
2. **Green start bar.** Every block header and section title starts with a 4px rounded green bar.
3. **Two-column portal.** Main column + 320px sidebar of widgets on desktop; sidebar becomes a stack below on tablet.
4. **Meta is always visible.** Dates are relative ("2 hours ago"), counts compact ("27K"), sizes and versions mono/LTR.
5. **The download box is sacred.** Icon + title + rating, a 4-cell info grid (version, size, requires, updated), short description, screenshots strip, mirror rows (platform icon, name, source + size, button), version/changelog accordions, "report broken link".
6. **Amber means hot.** `--hot` marks trending/editor's pick only; green marks new/primary. No other badge colors for promotion.
7. **Numbered popularity.** Popular lists use large counters (top 3 green) with app icons.
8. **Rounded and soft.** 12–22px radii, light shadows on hover, gradient covers with a soft highlight.
9. **Community is part of the page.** Comments use speech bubbles; staff replies are indented with a green-tinted bubble; a comment form follows.
10. **Back office in the same family**: deep green sidebar, same cards, amber queue counts.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f2f4f3` / `#fff` / `#f7f9f8` | gray page, white blocks |
| `--ink` / `--ink-2` / `--ink-3` | `#14211b` / `#4b5a53` / `#87958e` | green-tinted neutrals |
| `--brand` / `--brand-deep` | `#12a36b` / derived dark green | top line, footer, CMS sidebar use deep |
| `--hot` | `#f59e0b` | trending / editor's pick |
| status | ok green, warning amber, danger red, info blue | soft fills for badges |

Type 12 / 13 / 15 / 17 / 20 / 26 / 34; display `clamp(26px, 3.4vw, 40px)`; body line-height 1.75 (2 in Persian).
Radius 8 / 12 / 16 / 22. Controls 40px (50 large). Sidebar 320px, CMS sidebar 240px.

## Brand adaptation

- Any friendly mid-tone works for `--brand` (blue `#2563eb`, red `#dc2626`, violet `#7c3aed`, cyan `#0891b2`) as long as white text on it is ≥ 4.5:1. The deep variant derives automatically.
- Keep `--hot` amber unless the brand itself is amber/orange — then switch hot to pink or red.
- Cover gradients should use 6–8 hues from a defined set (per category), not random colors.

## Website patterns

- **Top line** (deep green, 34px): tagline + about/contact/language.
- **Header**: logo tile (with a small subtitle under the name), pill search (dominant), outline Sign in + primary "Submit a resource"; mobile shows a search toggle that opens a full-width search row.
- **Category nav**: sticky, icon + label links, active = green text + 3px bottom bar; horizontally scrollable.
- **Featured mosaic**: one big tile (editor's pick, amber badge, big title, meta) + two stacked tiles (new, tutorial).
- **Latest**: section title with green bar + pill type filters; 3-column grid of post cards (2 on tablet, 1 on phone).
- **Item / download box** inside a block with a "Virus-checked" badge.
- **Comments** block + form. **Sidebar**: popular (numbered), categories with counts, tag cloud, newsletter on deep green.
- **Footer**: deep ink-green, 4 columns.

## Author panel patterns

- **Shell**: deep green sidebar with vertical tabs (active = solid green), amber count on the moderation tab, author footer; white top bar with title, language, theme, "View site".
- **Overview**: 4 KPI blocks (label, big number, delta) → downloads area chart (green + amber series) + category donut → top posts rows with badges.
- **Posts**: pill status filter + title search + table (icon + title + category, status badge, downloads, updated date, Edit).
- **Editor**: two columns — title, slug (LTR, pattern), description; download links repeater (label + URL + remove, add button) | publish card (status badge, category, version, size, comments switch, submit) + cover upload drop area.
- **Moderation**: queue rows with avatar, context ("Reza on …"), excerpt, Approve / Reply / Spam actions.

## Components

`.btn-primary | .btn-soft | .btn-outline | .btn-ghost | .btn-danger`; `.badge-new | -hot | -brand | -info | -warn | -bad`;
`.cat`; `.tags`; `.cover` (+ `--c1/--c2`), `.app-icon` (+ `--s`); `.post`, `.post-grid`, `.post-row`; `.meta`; `.featured`,
`.feature-big`, `.feature-small`; `.pills`; `.block`, `.block-head`; `.popular`, `.cat-list`, `.newsletter`; `.dl-box`,
`.info-table`, `.shots`, `.mirrors`, `.mirror`, `.versions`; `.comments`, `.comment(.reply)`; `.upload`; `.switch`;
CMS: `.cms`, `.cms-side`, `.cms-top`, `.kpis`, `.kpi`, `.table`, `.title-cell`, `.editor`, `.links-repeater`, `.mod`.

## Interaction

Cards lift 2px on hover. Pills filter the grid instantly. Download buttons confirm with a toast. Accordions for versions.
Relative dates update with language. Moderation actions remove the row and confirm. No auto-advancing sliders.

## Persian & RTL

- Persian source copy in a warm, helpful tone ("هر روز منابع رایگان تازه…"); English mirrors it.
- Samim at 15px / line-height 2. Popular counters use Persian numerals (`counter(p, persian)`).
- Versions, sizes, URLs, slugs and file names are LTR (`.ltr`/`dir="ltr"`); dates relative via `Intl.RelativeTimeFormat('fa')` ("پریروز").
- Comment bubbles flip their pointed corner automatically (logical radii).

## Accessibility

Green on white ≥ 3:1 for large UI, text uses `--brand-strong` where needed; amber badges use dark text. All icon buttons
labelled; ratings have `aria-label`. Filters are buttons with `aria-pressed`; accordions are native `<details>`.
Mobile: no horizontal overflow; category nav scrolls; sidebar moves below content.

## Component library overrides (shadcn/ui etc.)

Card radius 16px, 1px border, hover shadow. Tabs → pill toggle group in green. Badge variants new/hot. Accordion for versions.
Sidebar (CMS) in `--brand-deep` with solid active item. Add a block-header pattern with the green start bar.

## Anti-patterns

- Inconsistent card layouts; hiding file size/version; ads-like flashing banners.
- More than two promotional colors; neon gradients; serif editorial headlines.
- Download buttons without platform/size context; comment sections without moderation states.

## Pre-ship checklist

- [ ] Every item card follows cover → category → title → meta.
- [ ] Block and section headers carry the green start bar.
- [ ] Download box has info grid, mirrors with sizes, changelog accordion and report link.
- [ ] Sidebar widgets: popular (numbered), categories with counts, tags, newsletter.
- [ ] Author panel: KPIs, posts filter, editor with link repeater, moderation queue.
- [ ] Mobile: sidebar below content, nav scrolls, grid single column, no overflow.
- [ ] Persian: Samim, Persian numerals, LTR versions/URLs, relative dates in Persian.
