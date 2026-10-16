---
name: tier
description: Tastefolio "Tier" design language — plan-driven commerce for subscriptions and services. Trustworthy blue actions plus a warm orange reserved for deals, a navy promo bar with countdown, an icon category bar, a hero with an overlapping domain/product search card, billing-period toggles with savings badges, plan cards with a best-value ribbon, comparison tables, testimonials carousel, FAQ, and a client area with renewal meters, unpaid invoices, tickets and a wallet. Use when the user asks for the Tier style or needs a pricing-heavy storefront (hosting, domains, VPN, telecom, insurance, SaaS tiers) and its customer portal, in Persian (RTL, default) and/or English (LTR).
---

# Tier

**Plan-driven commerce.** The job of every screen is to help someone pick a plan with confidence and come back to
renew it. Blue says *trust and act*, orange says *deal* — never the other way round. Prices are the largest numbers
on the page; savings are always visible; nothing about renewal is hidden.

Covers the **storefront** (promo, categories, search, services, plans, comparison, social proof, FAQ, contact) and
the **client area** (overview, services, invoices, tickets, wallet, renew flow).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Blue brand, orange `--accent` for deals, tinted surfaces, price size, dark + Persian. |
| [assets/kit.css](assets/kit.css) | Promo/countdown, header + category bar, hero + domain search, trust strip, service tiles, billing toggle, plans, comparison, carousel, FAQ, client area. |
| [assets/kit.js](assets/kit.js) | `data-when` price switching, groups, carousels, tabs, filters, dialogs, validation, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Hosting storefront (Persian source). |
| [examples/dashboard.html](examples/dashboard.html) | Client area with renew dialog, invoices, tickets, wallet. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css">
```
Persian: **Shabnam** (friendly, commercial; regular/bold). Latin: **Plus Jakarta Sans** 400–800.
Fallbacks: Vazirmatn; Manrope / Inter.

## Identity rules (non-negotiable)

1. **Two colors, two jobs.** `--brand` (blue) for primary actions, links, selected states, icons. `--accent` (orange) only for discounts, countdowns, ribbons, "save" badges and urgent renew buttons. Never accent for navigation.
2. **Price is the hero of a card.** 34–40px weight 800, unit small and muted after it, old price struck through above it.
3. **Periods change prices, not pages.** A pill billing toggle (Monthly / Quarterly / Yearly + "−20%" badge) switches all plan prices in place (`data-when`).
4. **One best-value plan.** Exactly one plan gets the blue border, elevated shadow and orange ribbon on its top edge.
5. **Specs are rows.** Plan features are label–value rows separated by a dashed line, then a full-width button pinned to the bottom.
6. **Category bar under the header.** All service families as icon + label links, horizontally scrollable; new ones flagged with an orange "New" pill.
7. **Search first.** The hero carries a floating search card (domain/product) overlapping its bottom edge, with quick price chips.
8. **Soft blue world.** Sections alternate white and `--surface-2` (#f3f6fd); cards 18px radius with blue-tinted shadows; the footer and promo are deep navy.
9. **Reassurance everywhere.** Trust strip (uptime, 24/7 support, refund, free SSL) near the top; renewal prices visible; FAQ on every pricing page.
10. **Client area = what needs attention.** Expiring services with colored renewal meters, unpaid invoices highlighted, wallet balance always in the top bar.

## Tokens

| Role | Value | Notes |
|---|---|---|
| `--canvas` / `--surface-2` / `--surface-3` | `#fff` / `#f3f6fd` / `#e8eefb` | white + blue-tinted sections |
| `--surface-ink` | `#0b1b4a` | promo bar, footer, help card |
| `--ink` / `--ink-2` / `--ink-3` | `#101a33` / `#4d5a78` / `#8a96b3` | |
| `--brand` | `#1d5bff` | + `-soft`, `-strong`, `-deep` |
| `--accent` | `#ff7a1a` | deals only; `--accent-soft` for deal tags |
| status | `#12a150` ok · `#d98b00` soon · `#e5383b` overdue | renewal meters use brand → accent → danger |

Type 12 / 13 / 15 / 17 / 21 / 28 / 38; display `clamp(30px, 4.6vw, 56px)`; price 40px (34px fa).
Radius 8 / 12 / 18 / 26. Controls 42px, large 54px. Shadows tinted `rgba(29,64,160,…)`.

## Brand adaptation

- `--brand` must stay a confident mid-dark color for white text (blue, green `#0e9f6e`, violet `#7c3aed`, crimson `#d9254f`, ink `#0f172a`).
- `--accent` must contrast with `--brand` (warm vs. cool). If the brand is warm (red/orange), switch accent to a cool deal color (e.g. emerald) — the rule is *different job, different hue*.
- Keep the blue-tinted neutrals when the brand changes; shift them toward the new hue only slightly.

## Website patterns

- **Promo bar** (navy, 44px): deal text with orange emphasis, live countdown boxes (LTR), link.
- **Header** (70px, sticky): gradient logo tile, wide search field, language, outline "Sign in / Register", cart icon. **Category bar** below.
- **Hero**: tinted background with a soft brand radial; deal tag; display headline with blue phrase; lead. Then a **search card** pulled up (negative margin) with tabs (Register / Transfer), big input + primary button, availability result (green/red strip with action) and extension price chips (old price struck).
- **Trust strip**: 4 icon tiles.
- **Services**: 3×2 tiles — icon square, name, one line, "from X / month".
- **Pricing**: centered heading with blue phrase, billing toggle, 4 plan cards (Enterprise last with "Custom quote"), "Compare all features" button revealing a comparison table (grouped rows, check/close icons, best column tinted).
- **Testimonials**: snap carousel with star ratings and prev/next buttons.
- **FAQ**: bordered accordions; open item gets a blue border.
- **CTA band**: deep brand block with phone button in accent.
- **Footer**: navy, 5 columns, © and VAT note.

## Client area patterns

- **Shell**: white sidebar with vertical tablist (active = solid brand pill with soft shadow, unread counts in red) and a navy help card; top bar with wallet chip ("Wallet: X Toman" + Top up), language, theme, notifications, sign-out.
- **Overview**: brand gradient welcome banner with the one most useful action ("Renew now") → 4 summary tiles (icon squares; warning/danger tints) → service cards (icon, name, LTR identifier, days-to-expiry text, status badge, renewal meter colored by urgency, contextual button) → unpaid invoices table (rows tinted red) + recent tickets.
- **Lists**: chips filter services/invoices; counts shown; download icon for paid invoices.
- **Tickets**: form card (department, service, subject, message) beside the ticket list with colored status dots.
- **Wallet**: balance in 40px, amount chips that fill the input, primary pay button; spending bar chart.
- **Renew dialog**: period radio cards (save badge on yearly), discount code field, total strip, primary pay.

## Components

`.btn-primary | .btn-accent | .btn-outline | .btn-soft | .btn-ghost`, sizes `.btn-sm/.btn-lg`, `.btn-block`; `.tag-deal`;
`.countdown`; `.cat-bar`; `.domain-search`, `.tld`, `.ds-result`; `.trust`; `.service`; `.billing` (+`.save`); `.plan.is-best` +
`.ribbon`, `.price`, `.price-old`, `.specs`; `.compare`; `.track` carousel; `.faq`; `.chip`; `.period`; client: `.side`,
`.wallet-chip`, `.welcome`, `.s-tile`, `.svc` + `.expiry .bar i(.soon|.late)`, `.badge-*`, `.table tr.is-unpaid`, `.ticket`.

## Interaction & motion

Hover lifts service tiles 4px; buttons darken; carousels snap. Countdown ticks every second (static in reduced motion).
Billing toggle swaps prices instantly — no page reloads, no layout shift (reserve height for old-price lines).
Toasts slide up with a colored start edge.

## Persian & RTL

- Persian source copy, polite and concrete ("همین حالا سفارش دهید", "تمدید سریع"); prices in Toman with Persian digits.
- Ribbons centered with mirrored transform (handled); carousel arrows use `.flip-rtl` on both prev/next glyphs.
- Domains, IPs, invoice numbers, discount codes and phone numbers are LTR-isolated (`.ltr`, `dir="ltr"`).
- Dates in Solar Hijri (`data-date` + `Intl`); weekdays/months in Persian.
- "−20%" badges are written as «۲۰٪−» in Persian.

## Accessibility

Blue on white ≥ 5.5:1; orange used with white bold text at ≥ 14px (or on `--accent-soft` with accent text).
Billing toggle buttons expose `aria-pressed`; prices that change are plain text (no images). Comparison table uses
`th scope` and labelled check icons. Carousel has keyboard-reachable buttons and native scroll. Focus ring 3px soft blue.

## Component library overrides (shadcn/ui etc.)

Map `--primary` to brand and add an `accent`/`deal` button variant mapped to `--accent`. Card radius 18px with tinted
shadow on hover. Tabs: pill toggle for billing. Badge variants for ok/soon/overdue. RadioGroup → `.period` cards.
Table: tint unpaid rows; numbers right-aligned in LTR, start-aligned in RTL.

## Anti-patterns

- Orange primary buttons everywhere (kills the deal signal); more than one highlighted plan.
- Hidden renewal prices, "contact us for pricing" on standard plans.
- Pages per billing period; prices rendered in images.
- Dark, moody hero sections; editorial serif typography.

## Pre-ship checklist

- [ ] Blue for actions, orange only for deals/urgency.
- [ ] Billing toggle updates every price in place; one best-value plan.
- [ ] Search card overlaps the hero; extension/price chips visible.
- [ ] Trust strip + FAQ present on pricing pages.
- [ ] Client area: wallet chip, renewal meters, unpaid invoices highlighted, renew dialog with totals.
- [ ] Mobile: category bar scrolls, plans stack, comparison scrolls inside its box, no page overflow.
- [ ] Persian: Shabnam, Persian digits, Toman, LTR identifiers.
