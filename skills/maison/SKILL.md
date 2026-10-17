---
name: maison
description: Tastefolio "Maison" design language — quiet luxury for premium commerce and client accounts. Ivory and ink, Bodoni Moda Didone display at whisper weights with italic accents, Jost labels in widely spaced small capitals, hairline rules, underlined fields, text-first buttons, still-life product imagery on soft backdrops, asymmetric editorial spreads with huge margins, a full-screen menu, quick-view dialog, bag side sheet, black membership card and order timelines; one bronze accent used almost never; Persian in Vazirmatn at light weights. Use when the user asks for the Maison, luxury, premium, minimal-editorial, fashion or fragrance style, or builds a fashion/beauty/jewellery/perfume/design-objects/boutique-hotel site or its client account — English (LTR) and/or Persian (RTL).
---

# Maison

**Quiet luxury.** Everything is ivory, ink and air. Headlines are Didone at whisper weights with one italic word;
every label is a small capital with wide tracking; rules are hairlines; fields are a single underline; buttons are
words, or a black rectangle when it truly matters. Products appear as still lifes on soft backdrops. The bronze accent
appears once per page, at most.

Covers **public sites** (collections, product quick view, editorial stories, appointments, bag) and **client
accounts** (overview, orders, wishlist, appointments, preferences, details).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Ivory/ink/stone palette, backdrops (`--sand`, `--smoke`, `--blush`, `--sage`, `--night`), bronze accent, Bodoni Moda + Jost / Vazirmatn, wide caps tracking, slow easing; "noir" dark + Persian. |
| [assets/kit.css](assets/kit.css) | Type (`.display`, `.caps`, `.seal`), header + subnav, full-screen `.menu-panel`, buttons (`.btn`, `.btn-solid`, `.u-link`, `.text-btn`), tabs/filters, underlined fields, checks, `.sizes`, switch, qty, range, `.status`, still-life imagery (`.still` + `.bottle` / `.candle` / `.vase`), product cards, bag `dialog.sheet`, quick-view `dialog.modal`, tables, `.timeline`, account layout, `.cercle` card, facts, note chips, toast, charts, giant footer. |
| [assets/kit.js](assets/kit.js) | Toggles (menu), dialogs (quick view, bag), filters, tabs (vertical account nav), sorting, steppers, validation, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Fragrance house: editorial hero, statement, filterable collection with quick view, atelier story, consultation booking, letters, bag sheet. |
| [examples/dashboard.html](examples/dashboard.html) | Client account: membership card, next consultation, order timeline; orders; wishlist; appointments; scent profile; details. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600&family=Jost:wght@300;400;500&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/thin/style.css">
```
**Bodoni Moda** 400 (+ italic) for display and product names; **Jost** 300/400 for text and small caps. Persian:
**Vazirmatn** only — 100–300 for display (the Persian equivalent of a whisper Didone), 300–500 for text. Icons: Phosphor
thin, only for menu, search, bag, close.

## Identity rules (non-negotiable)

1. **Whisper display.** Bodoni Moda 400 at 52–150px, tight leading; one italic word per headline (Persian: Vazirmatn 100–200, the key word in bronze instead of italic).
2. **Small caps everywhere.** Labels, nav, buttons, prices' units, table heads: 11px Jost, uppercase, tracking 0.28em.
3. **Hairlines only.** 1px `--line` dividers; the black `--line-2` rule only for headers of tables/sections and field underlines.
4. **Fields are underlines**; focus thickens the line, never a glow.
5. **Text-first actions.** `.u-link` / `.text-btn` for most; `.btn` outlined for secondary; `.btn-solid` black for the one purchase/booking action.
6. **Still-life imagery**: objects centered on soft backdrops (`.still.sand/.smoke/.blush/.sage/.night`), generous crop; real photography should follow the same: single object, soft shadow, no props clutter.
7. **Air.** Section padding 112–160px, huge gutters, asymmetric 7/5 spreads; never more than 4 products per row.
8. **No radius, no shadows** (except overlays); no badges, no colored pills, no icons in content.
9. **Bronze `--accent` once per page** — a seal, a price note or a membership line.
10. **Slow motion**: 240–900ms fades, objects lift 6px on hover; nothing bounces.

## Tokens

| Role | Light | Dark "noir" |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f7f4ef` / `#fbf9f5` / `#efebe4` | `#0f0e0d` / `#161513` / `#1d1b19` |
| `--ink` / `--ink-2` / `--ink-3` | `#111110` / `#4c4a46` / `#7b7770` | `#f2ede4` / `#bdb6aa` / `#8a8378` |
| `--line` / `--line-2` | `#dcd6cc` / `#111110` | `#2e2b27` / `#f2ede4` |
| `--brand` | the ink itself (`#111110`) | ivory |
| `--accent` | bronze `#8e7146` | `#c2a271` |
| backdrops | sand `#e9dfcf`, smoke `#d9d6d1`, blush `#ecd8d0`, sage `#d7dccf`, night `#2a2724` | darkened |

Type 11 / 13 / 16 / 19 / 24 / 34 / 52, display `clamp(52px, 9vw, 150px)`; caps tracking .28em; line-height 1.75.
Spacing 4 → 220; radius 0; controls 48 / 56px; easing `cubic-bezier(.22,.61,.36,1)`.

## Brand adaptation

- The brand color is the ink. If a house has a signature color, use it as `--accent` (bronze default; ink-blue `#4a5a6e`, moss `#5c6b5a`, oxblood `#8f3a32`) — still once per page.
- A house wordmark replaces `.wordmark`; keep it letter-spaced and centered.
- Swap backdrops for the house palette (stone, linen, plaster); keep them desaturated.

## Website patterns

- **Header**: `Menu` + `Search` | centered spaced wordmark | language, account, `Bag (n)`; a subnav row of small caps. `Menu` opens a full-screen panel with large italic links.
- **Hero**: 7/5 spread — a tall still life and a text column (caps eyebrow, display with italic word, lead, solid button + underline link).
- **Statement**: centered italic quote with a bronze seal and caps signature, between hairlines.
- **Collection**: centered title, caps text filters, count; 4-column products (still, name in Bodoni, price, notes in caps) with a quick-view button revealed on hover/focus.
- **Quick view**: dialog with still + name, notes, description, size selector (`.sizes`), price, solid "Add to bag".
- **Story**: still + text + three facts. **Consultation**: underlined form, time slots as `.sizes`, consent, solid submit.
- **Letters** sign-up as a single underline with a text submit. **Footer**: four caps columns + a giant wordmark.
- **Bag**: side sheet with line items (mini stills, qty), subtotal, note, solid checkout.

## Dashboard patterns

- **Account layout**: caps vertical nav with a growing hairline marker (horizontal scroll tabs on phones); wide content.
- **Overview**: date in caps, `Good evening, <i>Name</i>`, black `.cercle` membership card with bronze tier and a hairline progress, next appointment card, three facts, latest order with `.timeline`.
- **Orders**: hairline table with sortable date/total, `.status` dots, text actions.
- **Wishlist**: four stills with "Move to bag / Remove" text links.
- **Appointments**: upcoming and past cards, booking form with time slots.
- **Scent profile**: multi-select note chips, hairline range sliders with caps ends, a thin donut.
- **Details**: two-column underlined form, preference switches in hairline rows.

## Components

`.display`, `.h1–.h3`, `.caps`, `.lead`, `.accent`, `.rule(.ink)`, `.seal`; `.site-head .top`, `.wordmark`, `.text-btn`, `.subnav`, `.menu-panel`;
`.btn(.btn-solid|.btn-lg|.btn-sm|.btn-block)`, `.u-link`, `.tabs`, `.filters`; `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.sizes`, `.switch`, `.qty`, `.range`, `.status(.done|.moving|.held)`;
`.still(.sand|.smoke|.blush|.sage|.night)` + `.obj.bottle` (`.cap`, `.neck`, `.glass`, `.tag`) / `.obj.candle` (`.wick`, `.vessel`) / `.obj.vase`;
`.product` (+ `.quick`, `.name`, `.notes`, `.price`), `.price-line`, `dialog.sheet` (+ `.sheet-head/-body/-foot`, `.line-item`), `dialog.modal` + `.quickview`, `.close-x`;
`.table`, `.timeline` (`li.done`, `li.now`), `.account`, `.acct-nav`, `.panel`, `.panel-head`, `.cercle`, `.facts`, `.note-chips`, `.toast`, `.site-foot`, `.giant`.

## Interaction & motion

Fades and slow lifts only: menu and sheet fade in (480ms), objects lift 6px over 900ms on hover, underline links
contract on hover, the account marker grows. Quick view fills from the card's data. Reduced motion removes lifts and fades.

## Persian & RTL

- **Vazirmatn only.** Display 100–200 (`--fw-display: 200`), headings 300, text 300–400; no letter-spacing; italic emphasis becomes bronze color.
- Small caps have no Persian equivalent: labels become 12px Vazirmatn 500 without tracking.
- Prices keep their currency format via `data-fmt="eur"`; dates are Jalali via `data-date`.
- Still lifes and the giant wordmark are symmetric; nav marker, sheet side and arrows mirror automatically.

## Accessibility

Ink on ivory ≈ 18:1; `--ink-3` ≈ 4.6:1 for secondary text. Underlined fields keep a visible label; focus is a bronze
1px outline offset 4px. Quick-view buttons remain reachable by keyboard (product name is a button); stills are
`aria-hidden` in grids and `role="img"` with a description in heroes. The full-screen menu is dismissable with Esc.

## Component library overrides (shadcn/ui etc.)

`--radius: 0`; no shadows; Button default → outlined caps, `variant="link"` → `.u-link`, primary → solid ink; Input →
underline only; Card → no border, image + text; Tabs → caps with hairline underline; Sheet → bag; Dialog → quick view
with image half; Badge → avoid (use `.status` text); Toast → black caps bar.

## Anti-patterns

- Rounded corners, drop shadows, gradients on UI, colored badges, emoji.
- Busy grids (5+ per row), dense copy, all-caps headlines in the Didone.
- Bronze/gold everywhere; "luxury" gold gradients and script fonts.
- Fast animation, parallax circus, autoplay carousels.
- Persian set in any face other than Vazirmatn; fake italics in Persian.

## Pre-ship checklist

- [ ] Display is Didone at 400 with one italic word; Persian Vazirmatn 100–200.
- [ ] Every label is small caps with wide tracking (none in Persian).
- [ ] Hairlines only; underlined fields; one solid button per view.
- [ ] Imagery is still life on soft backdrops; ≤ 4 per row.
- [ ] Bronze appears at most once per page.
- [ ] Menu, quick view and bag work by keyboard; Esc closes.
- [ ] Phones: hero stacks, account nav scrolls horizontally, nothing overflows.
