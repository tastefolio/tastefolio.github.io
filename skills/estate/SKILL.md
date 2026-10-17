---
name: estate
description: Tastefolio "Estate" design language — a warm, architectural, Persian-first look for property portals, agencies and developers. Stone paper and charcoal ink, a moss green for searching and contacting, sun-amber reserved for new/featured/price cuts, Young Serif for prices, places and headings with Albert Sans + Vazirmatn; drawn CSS "architectural photos", one listing-card anatomy (price + price per m², title, address, spec row: area, bedrooms, year, parking, elevator, storage), a list + map split with price pins that highlight their cards, a featured home (gallery, facts, amenities, loan calculator, sticky agent card with visit booking), neighbourhood scores, and an agent panel (KPIs, views chart, best performers with boosts, listings table, lead pipeline board, visit schedule, saved-search alerts, three-step listing wizard); Material Symbols Sharp icons. Use when the user asks for the Estate, real-estate, property, listings, rentals, agency, developer or agent-CRM style — Persian (RTL) and English (LTR).
---

# Estate

**Homes, drawn with care.** Estate feels like an architect’s presentation board: warm stone paper, charcoal ink with
a hint of green, prices and place names in a soft serif, and a moss green for the two things people come to do —
search and get in touch. Sun-amber appears only when something is new, featured or cheaper than yesterday. Every
listing answers the same questions in the same order, and every result has a place on the map.

Covers **property sites** (search, results with map, featured home, neighbourhoods, owner CTA, FAQ) and **agent
panels** (overview, listings, leads, visits, saved searches, listing wizard).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Stone/charcoal palette, moss `--brand`, `--sun`, map colours (`--map-water`, `--map-park`, `--map-road`, `--map-block`), Young Serif + Albert Sans + Vazirmatn, radii 8/14/20; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Header with roof mark; buttons (moss, ink, outline, soft), tabs, seg, chips, fields, switch, badges (sun, glass); CSS architectural `.photo` (6 variants + tree, badges, favourite, dots); hero + search card; results bar; list + map split, listing cards, spec rows, map with parks/water/labels and price pins; gallery, fact grid, amenities, loan calculator, agent card + visit slots; neighbourhood cards with score bars and trends; CTA band; FAQ; footer; agent panel (profile, nav, KPIs, tables with mini photos, lead board, visit days, alert rows, wizard dropzone + steps); modal, toast, charts. |
| [assets/kit.js](assets/kit.js) | Tabs (vertical too), pressed groups, filters (chips, checkboxes) + search, sorting, steps, dialogs, validation, charts, compact Toman, Jalali dates, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Property portal: header, two-column hero with a drawn building, search card (buy / rent / deposit lease / off-plan, where, type, budget, bedrooms), results with bedroom chips, parking/elevator checkboxes, sort and map toggle, six listing cards beside a map with price pins, featured penthouse (gallery, facts, description, amenities, loan calculator, agent card with visit booking), neighbourhoods, owner CTA, FAQ, footer. |
| [examples/dashboard.html](examples/dashboard.html) | Agent panel: profile with rating and boost credits; overview (KPIs, views chart, today’s visits, best performers with boost, call-backs), listings table (status chips, search, sortable), lead pipeline (four lanes, move forward), visit schedule (+ add dialog), saved-search alerts, three-step listing wizard. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Albert+Sans:wght@400..800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,300..500,0..1,0&icon_names=bed,elevator,garage,square_foot,warehouse&display=block">
```
**Young Serif** (400 only) for prices, place names and headings; **Albert Sans** 400–800 for text and UI;
**Vazirmatn** for Persian (headings 800). Icons: **Material Symbols Sharp** via `<span class="ms">name</span>` — the
squared corners suit the architecture; list every icon in `icon_names` (alphabetical) to load a small subset.
`.ms.fill` for filled stars and saved hearts.

## Identity rules (non-negotiable)

1. **Stone, charcoal, moss.** Paper is `--canvas`; text is charcoal; `--brand` (moss) is for search, contact, booking and selection. `--sun` is only for new, featured and price-cut labels and the new-listing pin ring.
2. **Prices speak serif.** Prices, the price per m², place names and section titles use Young Serif (Vazirmatn 800 in Persian); the price per m² always sits next to the price.
3. **One listing anatomy.** Photo (badges at the start corner, save at the end corner, slide dots) → price row → title → address → spec row (area, bedrooms, year, then parking, elevator, storage icons; missing amenities struck through) → foot (age, agency).
4. **Everything has a place on the map.** Results sit beside a map with price pins; hovering a card lifts its pin and vice versa; pressing a pin scrolls to its card; filtering hides both. The map never mirrors in RTL.
5. **Honest facts first.** Fact grid (area, bedrooms, floor, year, parking, elevator, storage, deed), then description, then amenities with what is missing.
6. **Talk to a person.** The featured home has a sticky agent card (rating, phone reveal, day + time slots, name and mobile) — booking a visit is the primary action, not “contact us”.
7. **Drawn imagery.** Without real photos, use the `.photo` drawings (sky, blocks with soft window panes, a tree); never stock interiors. With real photos, keep the same badges, save button and dots.
8. **Calm geometry**: radius 14 for cards, 20 for panels, 8 for controls; 1px warm lines; shadows only on lift and floating search.
9. **Money in Persian terms**: compact Toman (`۱۰٫۹ میلیارد`), price per m² in millions, deposit/rent shown separately for leases.
10. **The panel is the same office**: same cards and photos; KPIs in serif numbers; leads move through visible lanes.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f6f4ef` / `#ffffff` / `#efece5` | `#12140f` / `#1a1d17` / `#22261e` |
| `--ink` / `--ink-2` / `--ink-3` | `#1d211c` / `#545a50` / `#868b80` | `#eeede6` / `#b2b5aa` / `#80857a` |
| `--brand` (moss) | `#55702b` | `#9cbc5f` |
| `--sun` (new, featured, price cut) | `#d99a2b` | `#f0b94e` |
| map water / park / road / block | `#cfe0e3` / `#dce6c8` / `#ffffff` / `#ebe7dd` | dark equivalents |

Type 12 / 13.5 / **15.5** / 18 / 22 / 30 / 42, display `clamp(38px, 5.4vw, 76px)` Young Serif. Radius 8 / 14 / 20.
Controls 46 / 54px.

## Brand adaptation

- `--brand` may be any deep, natural colour with white text ≥ 4.5:1 (teal `#1f6f8b`, brick `#8c3b2e`, slate `#2f4858`, plum `#6b4ea0`); `--brand-soft`/`--brand-strong` are derived. Keep `--sun` for “new”.
- The roof mark (chevron + box) can become the agency’s mark; keep it line-drawn in ink with the roof in the brand colour.
- With real photography, warm-grade images slightly and keep the stone paper around them.

## Website patterns

- **Header**: roof logo · buy, rent, new builds, neighbourhoods, guides · language/theme · saved count · *List a property* (outline) · *Sign in* (ink); on phones the nav holds sign-in.
- **Hero**: eyebrow with listing count, serif headline, lead | drawn building at sunset with a “photos checked on site” badge; the **search card** overlaps the hero bottom (deal seg + where/type/budget/bedrooms + *Search*), quick stats below.
- **Results**: sort, bedroom chips, parking/elevator checkboxes, map/grid seg; **list + map split** (cards 2-up beside a sticky map; map off → 3-up).
- **Featured home**: gallery (1 + 4), price line, fact grid, description, amenities, loan calculator (down payment slider, years, rate → monthly instalment + cash/loan bar), sticky agent card with phone reveal, day/time slots and request form.
- **Neighbourhoods** (drawn photo, average price per m², trend, transit/green/schools/quiet bars), **owner CTA** band, **FAQ**, charcoal footer.

## Dashboard patterns

- **Shell**: header (logo, *Agent panel* badge, *New listing*), sidebar with a charcoal profile card (rating, boost credits) and a vertical tab list with counts → horizontal scroller on phones.
- **Overview**: KPI cards (active listings, views, calls, visits), views chart (7/30 days), today’s visits, best performers with *Boost*, call-backs with call buttons.
- **Listings**: status chips, search, sortable price/views, rows with mini photo, price, views, calls, status, boost/edit.
- **Leads**: four lanes (new → contacted → visit set → offer) with cards that move forward and update lane counts.
- **Visits**: days with date tiles and timed items (+ add dialog). **Saved searches**: alert rows with switches.
- **Listing wizard**: deal type, type, area, address → area, bedrooms, year, floor, amenities → price with a local price hint and photo upload.

## Components

`.site-head`, `.logo`/`.roof`, `.nav(.m-only)`, `.btn` (+ `-ink`, `-outline`, `-ghost`, `-soft`, `-lg`, `-sm`, `-icon`, `-block`), `.tabs`, `.seg`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.sun|.ok|.warn|.bad|.info|.brand|.glass)`, `.avatar(.lg)`, `.progress`, `.ms(.fill)`;
`.photo` (`data-v="2…6"`, `.tree`, `.badges`, `.fav`, `.dots`, `.count`), `.hero`, `.hero-copy`, `.search-card`, `.search-grid`, `.in-ic`, `.quick-stats`, `.results-bar`, `.split-view(.map-off)`, `.list-grid`, `.listing(.hot)` (`.body`, `.price-row`, `.title`, `.addr`, `.foot`), `.price`, `.per`, `.specs` (`.no`), `.map` (`.park`, `.water`, `.lbl`, `.map-ctrl`, `.map-note`), `.pin(.new|.hot)`;
`.gallery`, `.detail`, `.facts`, `.amenities` (`li.no`), `.calc` (`.out`, `.split-bar`), `.range-input`, `.agent-card`, `.slots`, `.hood`, `.scores`, `.trend(.up|.down)`, `.cta-band`, `details.faq`, `.site-foot`;
`.d-layout`, `.d-side`, `.me-card`, `.d-nav`, `.grid12`, `.card`, `.card-head`, `.kpi`, `.table`, `.mini`, `.board`/`.lane`/`.lead-card`, `.visits`/`.vday`/`.vitem`, `.alert-row`, `.dropzone`, `.step-ind`, `dialog.modal`, `.toast`.

## Interaction & motion

Unhurried (150–480ms): cards lift 2px with a shadow and outline their pin; pins grow and turn ink on hover; the save
heart fills; the loan calculator updates on every slider step; boosting decrements credits; lead cards jump to the
next lane. Nothing loops.

## Persian & RTL

- Persian is the default; English via `data-alt`. Prices `data-fmt="compact"` + “تومان/Toman”, years as Jalali in Persian (`۱۴۰۱`) with Gregorian in `data-alt`, dates `data-date`, ages `data-ago`.
- The map, price pins and chart axes stay geographic/LTR; the layout, cards, sliders and score bars mirror.
- Mobile numbers and postal details are `dir="ltr"`.

## Accessibility

Charcoal on stone ≈ 15:1; white on moss ≈ 5.4:1; sun badges carry dark text. Map pins are buttons with prices as
labels and `aria-pressed`; amenity icons have titles and a struck-through state; the save button is `aria-pressed`;
the wizard validates per step; tabs use arrow keys; focus is a moss halo.

## Component library overrides (shadcn/ui etc.)

`--radius: 14px` cards, 8px controls; Button default → moss, `secondary` → ink; Card → `.listing`; Tabs → underline
moss; Slider → `.range-input`; Badge → square-ish 6px with sun/glass variants; Sheet/Dialog → wizard; headings in
the serif.

## Anti-patterns

- Sun-amber used as decoration (it must keep meaning “new/featured/cheaper”); bright blue map pins.
- Listing cards without price per m² or with amenities only in prose; prices that appear only after a click.
- Stock interior photos with text over them; mirrored maps.
- Lead lists without stages; “contact us” forms instead of a named agent with times.

## Pre-ship checklist

- [ ] Moss for actions, sun only for new/featured/price cut; serif prices with price per m².
- [ ] Every card has the same anatomy and a pin; hover/press links them.
- [ ] Featured home: facts, amenities (with missing ones), loan calculator, agent card with visit slots.
- [ ] Panel: KPIs, listings with boost, lead lanes, visits, alerts, wizard.
- [ ] Persian: compact Toman, Jalali years, LTR map and phones.
