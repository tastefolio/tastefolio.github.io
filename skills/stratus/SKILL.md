---
name: stratus
description: Tastefolio "Stratus" design language — Persian-first (RTL-native) enterprise platform style. White pages with cool-gray UI stages, a deep teal brand, two-line split headlines (bold ink line + lighter brand line), a categorized product mega menu, vertical solution tabs, a dark brand band for numbers, and consoles built from a dark icon rail + contextual sub-navigation, breadcrumbs, status-pill tables and multi-step wizards with a live summary. Use when the user asks for the Stratus style, or for a cloud / logistics / B2B / banking / government platform site and console, especially in Persian or Arabic (also works LTR).
---

# Stratus

**Persian-first enterprise platform.** The tone of an organization that runs infrastructure for other organizations:
calm, structured, exhaustive without being noisy. Pages are white; product is shown as real UI windows on cool-gray
stages; one deep teal does the talking. Written right-to-left first — English is the mirror, not the other way round.

Covers **marketing sites with many products** (mega menu, product grid, solution tabs, contact/sales forms) and
**multi-product consoles** (icon rail, sub-nav, breadcrumbs, lists, wizards, reports).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Neutrals, teal brand (+ derived `--brand-deep`, `--brand-tint`), status, IBM Plex type, spacing; dark + Persian. |
| [assets/kit.css](assets/kit.css) | Utility bar, masthead + mega menu, split headline, UI stages, feature rows, vertical tabs, band, option cards, stepper/wizard, rail + sub-nav app shell, tables, tracking timeline. |
| [assets/kit.js](assets/kit.js) | Tabs (horizontal + vertical), menus, steps, filters, sorting, validation, charts, fa/en toggle. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Logistics platform site (Persian source, English alternate). |
| [examples/dashboard.html](examples/dashboard.html) | Console: shipments list, 4-step creation wizard, performance reports. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
```
Persian: **IBM Plex Sans Arabic** (primary). Latin: **IBM Plex Sans**. Mono: **IBM Plex Mono** for codes/IDs.
One superfamily keeps both scripts on the same rhythm. Fallbacks: Vazirmatn / Noto Sans Arabic; Inter.

## Identity rules (non-negotiable)

1. **RTL is the default.** Design and review in Persian first; check LTR second. All layout uses logical properties.
2. **One deep brand.** `--brand` teal `#0f6b66` for primary buttons, active navigation, links, kickers and the second headline line. `--brand-deep` (derived) for the icon rail and the stats band. No second accent.
3. **Split headline.** Line 1: ink, weight 700. Line 2: brand, weight 500, 78% size. Never a single-color hero headline.
4. **Kickers have a bar.** Section labels = 13px/600 brand text led by a 22×3px brand bar.
5. **Show the product, not art.** Marketing visuals are white UI windows (tables, maps, bars) on `--surface-2` stages with 18px radius. No stock photos, no 3D, no mascots.
6. **Catalog navigation.** Products live in a full-width mega menu: 3 titled columns of icon-tile links (title + one-line description) + a highlighted aside.
7. **Two-level app navigation.** Dark 64px icon rail (products) + 232px white sub-nav (sections of the current product, grouped with small headings, counts at the end). Active sub-item = brand-soft fill, brand text, 3px start-edge bar. Breadcrumbs in the top bar always.
8. **Structured density.** 14–14.5px body, 38px controls, 12px card radius, 1px lines, shadow only for overlays. Comfortable, not cramped.
9. **Status = soft pill with dot + word.** Info (blue) in transit, success delivered, warning delayed, danger failed.
10. **Long tasks are wizards.** ≥ 3 related form sections become a stepper wizard with a sticky summary aside showing live totals.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#fff` / `#f5f7f8` / `#eceff1` | page / app bg & stages / hover |
| `--ink` / `--ink-2` / `--ink-3` | `#10181b` / `#4e5b61` / `#85939a` | cool neutrals |
| `--line` / `--line-2` | `#e3e8eb` / `#cfd7dc` | |
| `--brand` | `#0f6b66` | + `--brand-soft` (9%), `--brand-strong`, `--brand-deep` (rail/band), `--brand-tint` |
| status | success `#17895a`, warning `#b8740a`, danger `#c4373c`, info `#2a6fb5` | each with `-soft` |

Type: 12 / 13 / 14(.5 fa) / 16 / 20 / 26 / 36 / display `clamp(32px, 4.4vw, 54px)`; line-height 1.95 body in Persian.
Spacing 4px base to 96px. Radius 6 / 8 / 12. Controls 38px, large 46px. Rail 64px, sub-nav 232px, top bar 60px.

## Brand adaptation

- `--brand` should be deep and slightly desaturated (teal, navy `#1d4ed8`, violet `#6d28d9`, amber-brown `#b45309`, crimson `#be123c`) with ≥ 4.5:1 on white. `--brand-deep` and `--brand-tint` derive automatically — check the band and rail still read as "dark brand".
- Avoid neon or pastel brands; the style relies on a sober color carrying white text.
- Logo mark: a rounded 32px square in brand with a white glyph.

## Website patterns

- **Utility bar** (34px, gray): news, blog, docs, contact; end: language, console link.
- **Masthead** (64px, sticky): logo, main nav (first item opens the mega menu, chevron rotates), end: outline "Sign in" + primary "Get started". ≤1000px: menu button; mega menu collapses into the drawer.
- **Hero**: 2 columns — kicker, split headline, lead (≤ 60ch), primary + outline large buttons | UI stage with mini stat tiles above a white window (table of records with status pills).
- **Products grid**: 3×2 cards, each icon tile + h3 + one sentence; hover = brand border + shadow.
- **Feature rows**: alternating text (kicker, h2, checklist with brand check icons, arrow link) and UI stage (map route, stock bars…).
- **Solutions**: vertical tabs (title + subtitle per tab, start-edge marker) beside a card panel with mini stats; becomes horizontal scroll tabs on mobile.
- **Band**: `--brand-deep` background, 4 big white numbers with captions.
- **Logos**: bordered 6-cell grid with text wordmarks.
- **Sales form**: two columns; required marks `*` in danger color; Iranian mobile pattern; consent checkbox.
- **Footer**: gray, 5 columns, bottom row with © and cities.

## Console patterns

- **Shell**: `.app` = `.rail` + `.subnav` + `.app-main`. Rail tooltips on hover/focus. ≤1100px sub-nav becomes a drawer (menu button in top bar); ≤640px rail becomes a bottom tab bar.
- **Top bar**: section menu button (small screens), breadcrumbs, spacer, search (`/`), language, theme, notifications menu (red dot), avatar initials.
- **List page**: page head (title + updated time | quiet Export + primary New) → 4 stat cards (label + icon tile, value, trend) → card with status filter tabs (underline), toolbar (search, carrier select, result count), table (mono LTR codes, route "from → to", status pill, ETA date, `⋯` action) → detail modal with a vertical tracking timeline.
- **Wizard**: stepper (numbered circles, connecting lines, done = check), one card per step, footer with Back/Continue (Submit on last step), sticky summary aside with live totals (shipping, insurance, VAT, total). Option cards for choices with icon, title, description and price; selected = brand ring + soft fill + check badge. Success replaces the form with a confirmation card.
- **Reports**: area chart with dashed target series, bar chart by category, donut + legend with percentages.

## Components

Buttons `.btn-primary | .btn-outline | .btn-quiet | .btn-ghost | .btn-danger`, `.btn-lg`, `.btn-icon`; `.link-arrow`.
Forms: label 13px/600 above, required `*`, help 12px below, 38px inputs, `.addon` units (kg, Toman), `.option` radio cards.
`.pill` variants; `.stat` with icon tile; `.table` with gray header; `.tabs-line`; `.stepper`; `.track` timeline; `.menu`.
Charts: smooth brand line with 14% area, second series muted teal dashed, bars 4px radius, donut 16px thick; Persian digits.

## Interaction & motion

Functional and brief (120–300ms). Mega menu drops 6px with fade. Tabs, steps and filters switch instantly. Toasts carry
a 4px start-edge color. No decorative animation.

## Persian & RTL specifics

- Persian is the source language: write copy natively, then translate to English. Formal-polite register (شما, «کنید»).
- IBM Plex Sans Arabic at 14.5px body / line-height 1.95; headlines 1.5; zero letter-spacing.
- Persian digits everywhere (`Intl.NumberFormat('fa-IR')`), Solar Hijri dates, Toman currency suffix («تومان»).
- Codes, phone numbers, emails, postal codes, URLs: `dir="ltr"` inputs and `.ltr` spans (`unicode-bidi: isolate`).
- Directional icons: use the "forward" glyph (`arrow-right`, `chevron-right`) with `.flip-rtl`; the stepper connector and breadcrumbs then read correctly in both directions.
- Week starts Saturday; working days Sat–Wed in schedules.

## Accessibility

Teal on white ≥ 5:1; pills pair color with text. Visible 2px brand outline focus. Vertical tabs use `aria-orientation`.
Required fields marked visually and with `required`; errors under fields with `aria-describedby`. Rail icons have
`aria-label` and visible tooltip on focus. Tables keep `th scope`; long tables scroll inside their card.

## Component library overrides (shadcn/ui etc.)

Radius 8px controls / 12px cards. Button default = brand; outline variant = brand border + brand text.
Sidebar component: split into an icon rail (`--brand-deep`) and a sub-nav panel; active item uses start-edge bar.
Tabs: underline variant in brand. Badge → soft pill with dot. Table header gray background. Set `dir="rtl"` on the
root provider (Radix `DirectionProvider`) so menus and sheets open on the correct side.

## Anti-patterns

- Left-aligned English-first layouts mirrored as an afterthought; Latin fonts rendering Persian.
- Gradients, glassmorphism, illustrations of people, emoji.
- Single-level sidebars with 20 items; hiding breadcrumbs.
- Long single-page forms for multi-part tasks; prices that update only after submit.

## Pre-ship checklist

- [ ] Reviewed in Persian RTL first, then English LTR.
- [ ] Hero uses the split headline; sections use bar kickers.
- [ ] Mega menu has titled columns with icon tiles and descriptions.
- [ ] Console shows rail + sub-nav + breadcrumbs; active states use brand-soft + start bar.
- [ ] Wizard has stepper, per-step validation, sticky live summary, success state.
- [ ] Persian digits, Jalali dates, Toman, LTR-isolated codes/phones.
- [ ] ≤640px: rail becomes bottom bar; tables scroll in-card; no horizontal page scroll.
