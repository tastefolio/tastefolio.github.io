---
name: aisle
description: Tastefolio "Aisle" design language — a clean, modern, Persian-first online store and marketplace. White shelves and soft grey bands, an indigo brand for navigation and actions, a coral reserved for discounts/countdowns/deal bands, a big search with recent and trending suggestions, a category mega menu, banner carousel, category circles, a deal rail with a live countdown and stock meters, rounded product cards whose “+” becomes a quantity stepper, a cart drawer with a free-delivery meter, a mobile bottom bar and a full customer account (tracking, orders, wishlist, addresses, wallet, details); DM Sans + Vazirmatn, Material Symbols Rounded. Use when the user asks for the Aisle, online store, e-commerce, shop, marketplace, supermarket or customer-account style — Persian (RTL) and English (LTR).
---

# Aisle

**A modern store that sells.** Shelves are white, sections sit on soft grey bands, products live in rounded cards.
Indigo does the navigating — search focus, tabs, add-to-cart, links — and coral does only one job: it marks money
you save (discount badges, the deal rail, countdowns). Everything a shopper reaches for is one tap away: search,
categories, cart, account.

Covers **public stores** (home, category navigation, deals, product grids, cart) and **customer accounts**
(overview with live tracking, orders, wishlist, addresses, wallet, details).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** White/grey/indigo palette, `--deal` coral, `--star`, DM Sans / Vazirmatn, radii 10/16/24; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Promo strip, sticky store header, search + suggestion panel, category bar, mega menu, buttons, tabs, pills, fields, switch, qty, badges, hero carousel + banners, mini banners, category circles, deal rail + countdown, product cards (`.pcard`, `.add`, `.fav`, `.stock`), brands, perks, cart drawer + free-delivery meter, modal, bottom bar, account (`.acct`, `.side-card`, `.side-menu`, `.counters`, `.track`, `.order-card`, `.addr-card`, `.wallet-hero`), tables, charts, footer. |
| [assets/kit.js](assets/kit.js) | Toggles (mega menu), carousel, tabs (vertical too), pressed groups, filters, sorting, steppers, dialogs/drawer, validation, copy, charts, Toman/Jalali formatting, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Store home: promo strip, header with search suggestions, mega menu, banner carousel + side banners, category circles, deal rail with countdown, promo tiles, best sellers with tabs, brands, perks, app band, footer, cart drawer, bottom bar. |
| [examples/dashboard.html](examples/dashboard.html) | Customer account: profile + wallet + club points, overview (status counters, live tracking, club progress, spending chart, recently viewed), orders with filters, wishlist, addresses + add dialog, wallet top-up + transactions, account details. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,0&icon_names=add,search,shopping_cart&display=block">
```
**DM Sans** 400–800 (Latin), **Vazirmatn** (Persian, 400–900; titles 800). Icons: **Material Symbols Rounded**
via `<span class="ms">name</span>` (`.ms.fill` for the filled variant). List every icon you use in `icon_names`
(alphabetical) to load a small subset. Product imagery: photos on a light grey well, or simple flat illustrations.

## Identity rules (non-negotiable)

1. **Two colours, two jobs.** Indigo `--brand` = navigation, focus, add-to-cart, links, selection. Coral `--deal` = discount %, deal bands, countdowns, sold-out pressure. Never swap them, never use coral as decoration.
2. **Search is the hero of the header**: wide, filled, with a category select and a suggestion panel (recent chips + trending list) on focus; `/` focuses it.
3. **Every product card has the same anatomy**: grey photo well, discount badge (start corner), wishlist heart (end corner), 2-line title, rating + colours, old price struck, new price bold + "Toman", and a round indigo `+` that becomes a stepper.
4. **Categories are reachable two ways**: the mega menu (vertical list + columns + promo tile) and a row of category circles; new categories get a coral ring.
5. **Deals look urgent but honest**: a coral rail with a live countdown and a sold-percentage bar per item; real old prices only.
6. **Rounded and soft**: cards 16px, banners/panels 24px, buttons 10px; borders are 1px `--line`; shadows only on hover and overlays.
7. **Money is always formatted**: Persian digits with separators and "تومان" in Persian, `1,234 Toman` in English; instalments shown next to totals.
8. **Mobile is a store too**: search drops under the logo, category bar collapses into a bottom bar (Home, Categories, Cart, Account) and the mega menu becomes a bottom sheet.
9. **The account mirrors the shop**: same cards, same badges; status colours are semantic (info = in transit, success = delivered, warning = processing/returned, danger = cancelled/failed).
10. **Trust is visible**: delivery, returns, originality and instalments as a perks row; free-delivery progress in the cart.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#ffffff` / `#f3f4f7` / `#e8eaf0` | `#0f1017` / `#1e2130` / `#292d3f` |
| `--ink` / `--ink-2` / `--ink-3` | `#1b1d2a` / `#5c6072` / `#8b8fa0` | `#eef0f7` / `#a9adbf` / `#7a7f94` |
| `--brand` (indigo) | `#5b3df5` | `#8b78ff` |
| `--deal` (coral) | `#ff3b5c` | `#ff5c78` |
| `--star` / success / warning / danger / info | `#f5a524` / `#12a150` / `#c27803` / `#e5383b` / `#2f7ded` | lighter equivalents |

Type 11.5 / 13 / **15** / 17 / 20 / 26 / 34, display `clamp(28px, 3.4vw, 46px)` 800. Radius 10 / 16 / 24. Controls 44 / 52px.

## Brand adaptation

- `--brand` may be any colour with white text ≥ 4.5:1 (green `#0e9f6e`, orange `#e65c00`, blue `#1f6feb`, magenta `#c026d3`). If the brand itself is red or pink, move `--deal` to amber `#f59e0b` so deals stay distinct.
- The logo sits in a rounded square mark with a bag glyph or the brand's own mark.
- Banners use the brand's campaign colours as gradients with one product cut-out; text stays white on them.

## Website patterns

- **Promo strip** (dark, one line). **Header**: logo · search with suggestions · theme/language · sign-in (outline) · cart with coral count. **Category bar**: mega trigger, flash deals (coral), best sellers, gift cards, instalments, delivery city.
- **Mega menu**: vertical category tabs (start), three link columns with brand-coloured markers, promo tile (end).
- **Hero**: banner carousel (snap, prev/next) + two stacked mini banners.
- **Category circles** row with coral rings on new ones.
- **Deal rail**: coral band, title + live countdown + "see all" on the start side, horizontally scrolling cards with stock bars.
- **Promo tiles** (four), **best sellers** with tabs, **brands** strip, **perks** row, **app/newsletter** band, **footer** with app buttons.
- **Cart drawer** from the inline-end side with a free-delivery meter, steppers and an instalment note. **Bottom bar** on phones.

## Dashboard patterns

- **Account shell**: header with search; a side card (avatar, masked phone, edit; wallet + club points; vertical tablist with counts) → horizontal scroll on phones.
- **Overview**: four status counters, live tracking stepper with ETA and copyable tracking code, club progress with a redeem action, 6-month spending bars, recently viewed cards.
- **Orders**: status pills filter; order cards (number, Jalali date, total, status badge, thumbnails, actions: track, invoice, buy again, cancel, rate).
- **Wishlist**: product cards with filled hearts. **Addresses**: cards with a default ring, add/edit dialog (province, city, address, plate, 10-digit postal code, receiver, mobile).
- **Wallet**: gradient balance card, top-up with amount pills + custom amount, sortable transactions table.
- **Details**: two-column form, read-only login mobile, birthday, notification switches, sign out.

## Components

`.promo-strip`, `.store-head`, `.logo`/`.logo-mark`, `.search`/`.search-box`/`.suggest`, `.catbar`, `.mega` (+ `.mega-cats`, `.mega-cols`, `.mega-promo`);
`.btn` (+ `-outline`, `-soft`, `-ghost`, `-deal`, `-sm`, `-lg`, `-icon`, `-block`), `.tabs`, `.pills`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.qty`, `.badge(.ok|.warn|.bad|.info|.brand|.deal)`;
`.hero`, `.slider`, `.banner`, `.mini-banner`, `.cats`/`.cat(.new)`, `.deal-rail`/`.deal-head`/`.deal-track`, `.countdown`, `.pgrid`, `.pcard` (+ `.media`, `.off`, `.fav`, `.title`, `.meta`, `.rating`, `.dots`, `.price`, `.add`, `.stock`), `.brands`, `.perks`;
`dialog.sheet` (+ `.ship-meter`, `.line-item`), `dialog.modal`, `.bottom-nav`, `.toast`; `.acct`, `.side-card`, `.profile`, `.wallet-mini`, `.side-menu`, `.panel`, `.counters`/`.counter`, `.track`, `.order-card`, `.addr-card`, `.wallet-hero`, `.table`, `.ms`.

## Interaction & motion

Snappy (140–240ms): cards lift their shadow and zoom the product 5%, category circles rise, buttons press to 98%.
The countdown ticks every second (static under reduced motion/screenshots). Adding to cart swaps `+` for a stepper,
updates every cart badge and confirms with a toast; reaching 0 brings the `+` back.

## Persian & RTL

- Persian is the default; English via `data-alt`. Prices `data-num` with Persian separators, dates `data-date` (Jalali), percentages `data-fmt="pct"`.
- Chevrons use `.flip-rtl`; the cart drawer opens from the inline-end; numbered trending list uses `counter(t, persian)`.
- Postal codes, phones and tracking codes are `dir="ltr"`.

## Accessibility

Ink on white ≈ 16:1; white on indigo ≈ 6:1; white on coral ≈ 3.6:1 → coral badges are bold and large, or carry ink text in
dark mode. Every icon-only button has a label; hearts are `aria-pressed`; steppers keep labelled controls; the carousel is
labelled; the countdown has an accessible name; focus rings are a 4px indigo halo.

## Component library overrides (shadcn/ui etc.)

`--radius: 16px` (cards), 10px (buttons/inputs); Button default → indigo filled; Badge → pill, `destructive` → coral deal;
Command → header search with suggestion panel; NavigationMenu → mega menu; Sheet → cart drawer; Tabs → underline indigo;
Carousel → snap track with round prev/next.

## Anti-patterns

- Coral (or red) used for brand decoration, making real deals invisible.
- Fake urgency: countdowns that reset, invented old prices.
- Product cards with different anatomies on one page; text over busy product photos.
- Hiding the cart or search on mobile; forms that ask for more than delivery needs.

## Pre-ship checklist

- [ ] Indigo for actions, coral only for deals/countdowns.
- [ ] Search with suggestions; mega menu and category circles both work.
- [ ] Product cards share one anatomy; `+` → stepper updates every cart badge.
- [ ] Deal rail countdown ticks; stock bars honest.
- [ ] Cart drawer shows the free-delivery meter and instalments.
- [ ] Phones: bottom bar, bottom-sheet mega menu, 2-column grid.
- [ ] Persian: Toman with Persian digits, Jalali dates, LTR codes.
