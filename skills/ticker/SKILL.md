---
name: ticker
description: Tastefolio "Ticker" design language — a dense, calm market workspace for fintech. Graphite dark-first panes tiled into hairline mosaics, monospace tabular numbers (DM Mono) for every changing value, green/red reserved strictly for up/down and buy/sell, one cobalt brand for selection and primary actions; ticker tape, ▲▼ deltas, flash-on-tick cells, sparklines in rows, depth-bar order books, sector heatmaps, candlestick charts with volume, buy/sell order tickets with live fees; light "statement" theme. Use when the user asks for the Ticker, trading, fintech, banking, exchange or data-terminal style, or builds a brokerage/exchange/wallet/banking site, market data pages, or a trading/portfolio/analytics dashboard — Persian (RTL) and English (LTR).
---

# Ticker

**A market workspace.** Numbers are the interface: they sit in a monospace tabular face, align to the end of their
column and flash when they change. Panes tile edge to edge with 1px hairlines like a trading terminal — no floating
cards, no shadows inside the workspace. Green and red mean only *up/down* and *buy/sell*; everything that is
selected, focused or primary is cobalt. The result is dense but quiet.

Covers **public sites** (brokerage/bank/exchange marketing, market tables, heatmaps, fee calculators, sign-up) and
**dashboards** (trading desk, portfolio, orders, alerts, analytics).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Graphite dark + light "statement" palettes, `--up/--down`, chart tokens incl. `--chart-up/--chart-down`, Manrope / DM Mono / Vazirmatn, 30px rows. |
| [assets/kit.css](assets/kit.css) | Numbers (`.num`, `.price`, `.chg`, flashes), ticker tape, header, buttons (`-buy`, `-sell`), tabs, `.seg`, `.side-tabs`, `.affix` inputs with steppers/units, switches, badges, dense tables with sticky heads, `.sym`, sparkline cells, stats, heatmap, order book, trades, mosaic/pane workspace, app bar, dialogs, toasts, charts, footer. |
| [assets/kit.js](assets/kit.js) | Charts incl. **candlesticks** (`data-chart="candle"` + `data-ohlc` + `data-volume`) and sparklines, tabs, pressed groups, filters, sorting, steppers, conditional fields (`data-when`), validation, fa/en numbers & dates. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Brokerage: ticker tape, hero with live mini-desk, stats, filterable market table, sector heatmap, features, fee calculator, sign-up + FAQ. |
| [examples/dashboard.html](examples/dashboard.html) | Trading desk: watchlist, candle chart, order ticket, order book, time & sales; portfolio; orders; alerts. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@500;600;700;800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@0.460.0/font/lucide.css">
```
**Manrope** 500–800 for UI and headings, **DM Mono** for all values (prices, sizes, %, times, IDs), **Vazirmatn** for
Persian (Persian digits fall through from DM Mono to Vazirmatn). Icons: Lucide, used sparingly in buttons and features.

## Identity rules (non-negotiable)

1. **Numbers are mono and tabular**, end-aligned in tables; never proportional digits for changing values.
2. **Green/red are semantic only**: up/down, buy/sell, P&L. Never for branding, decoration or success toasts unrelated to money.
3. **Cobalt `--brand` is the only accent** for selection, focus, primary actions and links.
4. **Deltas carry arrows**: `.chg.up` ▲ / `.chg.down` ▼ with absolute values; color is never the only signal.
5. **Hairline mosaics** for workspaces: `.mosaic` of `.pane`s with 1px gaps; panes have compact `.pane-head`s with uppercase micro-titles.
6. **Dense rows** (30px), sticky table headers, 12–14px UI text; whitespace comes from structure, not padding.
7. **Live, not loud**: flash a cell for 700ms on change, pulsing dot for "live"; no animated counters or confetti. Everything stops under reduced motion.
8. **Charts are instruments**: candles with volume, thin lines, no smoothing, no dots; tooltips in mono.
9. **Money flows are explicit**: tickets always show value, fee and total before submit.
10. **Sample data is labeled** as sample/not advice on public pages.

## Tokens

| Role | Dark (default) | Light "statement" |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` / `--surface-3` | `#0a0d12` / `#10141b` / `#161b24` / `#1f2632` | `#f5f6f8` / `#fff` / `#f0f2f5` / `#e5e9ef` |
| `--ink` / `--ink-2` / `--ink-3` | `#e6ebf2` / `#9aa6b8` / `#69758c` | `#0d1420` / `#4a5568` / `#747f92` |
| `--line` / `--line-2` | `#1b222d` / `#2a3342` | `#e3e7ed` / `#cfd6e0` |
| `--brand` | `#4d7cff` cobalt | `#2f5bea` |
| `--up` / `--down` | `#22c983` / `#ff4d61` | `#0c9a5f` / `#dc2f46` |

Type 11 / 12 / **14** / 16 / 20 / 28 / 40, display `clamp(38px, 5vw, 68px)` weight 800, tracking −0.04em. Radius 4 / 6 / 10.
Controls 34 / 42px; rows 30px.

## Brand adaptation

- `--brand` may be any hue that is **not** green or red: cobalt (default), violet `#7c5cff`, teal `#00b3a4`, amber `#f2b441`, or neutral `#e2e8f0` for monochrome brands.
- If a brand insists on green, keep `--up` green and move the brand to its secondary color; never let brand and "up" share a color.
- Logos: small square mark + wordmark; the mark can live inside `.logo-mark`.

## Website patterns

- **Ticker tape** on top (`.tape > .tape-track`, items duplicated with `aria-hidden` for the loop; pauses on hover).
- **Header**: logo, 4 links, language/theme, ghost "log in", primary "open account".
- **Hero**: eyebrow, 800-weight display, lead, primary + outline CTA, sample-data note; a mini-desk mosaic (index area chart + 4-row watchlist with sparklines and live flashes).
- **Stats strip** with mono values. **Market table**: search (`/`), market `.seg` filter, sortable columns, sparkline column, trade buttons.
- **Heatmap**: `.heatmap` tiles with `--w/--h` spans and `--i` intensity, legend.
- **Features** as a 3-pane mosaic. **Fee calculator**: inputs left, computed `dl` right (updates on input/side change).
- **Sign-up**: FAQ + short form (phone pattern, risk acknowledgement). **Footer** with disclaimer.

## Dashboard patterns

- **App bar**: logo, index chip, market status pill with live dot and time, tabs, buying power, language/theme.
- **Desk mosaic**: `watch | chart | ticket` over `watch | book + trades | ticket`; collapses to `chart, ticket, watch, lower` on phones.
- **Watchlist**: filter input (`/`), selectable rows (`aria-selected`) that retitle the quote and ticket, live flashes.
- **Chart pane**: symbol, price, delta pill, timeframe `.seg`, candle chart with volume, OHLC/volume stats row.
- **Ticket**: `.side-tabs` buy/sell (`data-group="side"`), order type select, price/qty `.affix` steppers, % of buying power `.seg`, value/fee/total, side-colored submit via `data-when`.
- **Order book** (`.book` asks/bids with `--d` depth), **time & sales** (`.trades`).
- **Portfolio**: KPI mosaic, performance vs index (dashed second series), allocation donut, holdings with P&L.
- **Orders**: status filter, side badges, partial fills, cancel. **Alerts**: create form + list with switches.

## Components

`.num`, `.mono`, `.price`, `.chg(.up|.down|.pill)`, `.up/.down/.flat`, `.flash-up/.flash-down`, `.dot-live`, `.tape`/`.tape-track`/`.tape-item`;
`.site-head`, `.logo`/`.logo-mark`, `.nav`; `.btn` (+ `-primary`, `-buy`, `-sell`, `-ghost`, `-outline`, `-sm`, `-lg`, `-icon`, `-block`), `.tabs`, `.seg`, `.side-tabs`;
`.field`, `.label`, `.hint`, `.input(.num)`, `.select`, `.affix` (+ `.unit`, steppers via `data-qty`), `.check`, `.switch`, `.badge(.up|.down|.warn|.info)`, `.kbd`;
`.table` (sticky head, `.end`), `.sym` (+ `.av`), `.spark-cell`, `.stat` (+ `.v`, `.big`), `.heatmap`/`.t`, `.book` (+ `.bh`, `.br.ask|.bid`, `.spread`), `.trades`;
`.mosaic`, `.pane`, `.pane-head`, `.pane-body(.flush)`, `.panel`, `.app-top`, `.app-main`, `.index-chip`, `.market-status`, `.legend`; `dialog.modal`, `.toast`.

## Interaction & motion

Fast and exact: 90–160ms color transitions, 700ms tick flashes, tape at a slow constant speed, no easing theatrics.
Keyboard: `/` focuses search/filter, arrows move tabs, steppers are buttons. Live updates never move layout.

## Persian & RTL

- Persian default works with mirrored mosaics; numbers use Persian digits via `data-num` (Vazirmatn fallback inside the mono stack).
- Show deltas as **absolute values + ▲/▼** to avoid sign-placement issues in RTL; percentages via `pct2`.
- Symbols stay Latin (`KVR`); names localized. Times via `data-date … data-fmt="time"`; dates Jalali.
- Charts mirror the time axis in RTL; candles follow it.

## Accessibility

Ink on canvas ≈ 15:1; up/down colors ≥ 4.5:1 on panes in both themes and always paired with ▲▼ or words. Tables have
headers and sortable buttons; live cells don't announce every tick (no `aria-live` on prices). Tape items are
duplicated with `aria-hidden`. Focus ring is cobalt. Charts expose `aria-label`s with what they show.

## Component library overrides (shadcn/ui etc.)

`--radius: 6px`; Card → `.pane` inside a `.mosaic` (no shadow); Table → dense with sticky head and mono numeric cells;
Tabs → underline; ToggleGroup → `.seg`; Badge → square-ish 4px with soft semantic fills; Input → `.affix` with unit and
steppers; Chart (Recharts etc.) → linear curves, no dots, mono axes, candles for prices.

## Anti-patterns

- Using green for "brand" or red for "delete" next to price data.
- Proportional digits, centered numbers, numbers that jump width on update.
- Big rounded cards with drop shadows inside a workspace; gradients on data.
- Count-up animations on money; celebratory motion.
- Hiding fees until after submit.

## Pre-ship checklist

- [ ] Every changing value is mono + tabular and end-aligned.
- [ ] Up/down use color **and** arrow; brand is not green/red.
- [ ] Workspace is a hairline mosaic; panes have micro-titles.
- [ ] Ticket shows value, fee, total; side switch recolors submit.
- [ ] Flashes and tape stop under reduced motion; tape loop duplicated `aria-hidden`.
- [ ] fa: Persian digits, Jalali dates, absolute deltas, mirrored layout.
- [ ] Phones: desk stacks, tables scroll, app bar wraps.
