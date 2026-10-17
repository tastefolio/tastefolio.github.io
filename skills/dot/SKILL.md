---
name: dot
description: Tastefolio "Dot" design language — a minimal, industrial, Persian-first look for hardware brands, smart devices and companion apps. Off-white paper (or pure black) with a dot grid, ink capsule controls, dotted rules, Geist Mono micro-labels and one LED red for light, live state and the single action; display type made of dots (Doto in Latin, Vazirmatn Black behind a dot mask in Persian) with Host Grotesk text; a drawn device with a working 15×15 LED face (assets/matrix.js: clock, timer, music, weather, alerts, battery, custom glyphs), launch hero with callouts, face switcher, dotted spec sheet, store configurator (model, finish, quantity, Toman or dollars), black-glass sign-up band; plus a device app (device sidebar, live preview, brightness, night mode, dot meters, dot bar charts, keyboard-friendly glyph composer, routines, firmware updates); Pixelarticons. Use when the user asks for the Dot, dot-matrix, LED, hardware, gadget, IoT, smart-home or companion-app style — Persian (RTL) and English (LTR).
---

# Dot

**Everything that lights up is a dot.** Dot is the language of a small, honest piece of hardware: paper-white (or
black) surfaces with a faint dot grid, ink controls shaped like capsules, rules drawn as dotted lines, tiny mono
labels, and one LED red that only ever means *light*, *live* or *do this*. Headlines and big numbers are made of
dots; the product itself is drawn in CSS with a 15×15 LED face that really works.

Covers **hardware sites** (launch hero, faces, features, specs, store, questions, sign-up) and **device apps**
(devices, live preview and controls, glyph composer, routines, updates).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Paper/ink palette, LED `--brand`, `--glass`, `--led`, `--led-white`, `--led-off`, `--dot` grid colour, Doto + Host Grotesk + Geist Mono + Vazirmatn, `--dot-mask` (Persian dot tile), radii 10/16/24 + capsules; dark theme (pure black) + Persian. |
| [assets/kit.css](assets/kit.css) | Dot type (`.display`, `.dots`, `.dots.big`, `.dot-end`), `.micro` labels, `.led` status dots, `.dotgrid`, dotted `.rule`; header with LED logo and cart count; capsule buttons (ink, outline, ghost, red), seg, LED tabs, chips, fields, LED switch, badges, dot `.meter`, `.range`; the `.matrix` (lit, red, asleep, flash, editor), `.dotbars`; the drawn `.device` (paper / ink / signal finishes, mini) with `.callout` leaders; hero, numbers row, face switcher, features, spec sheet, store (swatches, qty), FAQ with LED markers, black-glass `.band`, footer wordmark; app shell (device sidebar, topbar, 12-col grid, panels, controls, app rows, composer, glyph cards, routines with day dots, LED steps, changes, tables); modal, toast, dotted charts. |
| [assets/matrix.js](assets/matrix.js) | The LED matrix: built-in faces (`clock`, `timer`, `eq`, `weather`, `bell`, `battery`, `wink`, `heart`, `coffee`, `moon`), `data-bits` glyphs, 9×9 mini, one visibility-aware animation loop (still under reduced motion), the dot editor (arrows, Space, drag, `dot:change`), `.dotbars` charts; `window.dotMatrix` API. |
| [assets/kit.js](assets/kit.js) | Tabs (vertical too), pressed groups, switches, toggles, dialogs, validation, charts, Persian digits, Jalali dates, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Hardware launch: LED logo, nav, cart; dot-grid hero with dotted headline, the device winking, callouts, pre-order and price; numbers row; six faces in a vertical switcher; four feature tiles; dotted spec sheet for two models; store configurator (model, finish, quantity, live price, add to cart); FAQ; black-glass sign-up band; footer with a giant dotted wordmark. |
| [examples/dashboard.html](examples/dashboard.html) | Device app: sidebar of devices with LED status; overview (live preview, face chips, brightness, volume, night mode, find, restart; battery with dot meter and dotted line chart; four stats; glances per hour as dot bars; what can light it up), glyph composer (pen/eraser, white/red, presets, clear, invert, save with name + trigger, send to device, your glyphs), routines (day dots, switches, new-routine dialog), updates (changelog, dot progress with LED steps, auto-update switches, history). |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Doto:wght,ROND@100..900,0..100&family=Host+Grotesk:wght@300..800&family=Geist+Mono:wght@400..600&family=Vazirmatn:wght@100..900&display=swap">
```
**Doto** (weight 800–900, `"ROND" 100` for round dots) only for display type and big numbers — never for text or
anything with a period at bold weights (its dot cluster reads as a plus); **Host Grotesk** 400–650 for text and UI;
**Geist Mono** for micro-labels, tabs and table heads (uppercase, +0.1em). **Persian is Vazirmatn only**: text and
labels in Vazirmatn; display type and numbers ≥ ~40px in Vazirmatn 900 behind the dot mask (`.display`, `.dots.big`);
smaller Persian numbers stay solid. Icons: **Pixelarticons** (MIT) as an inline SVG sprite at 24px (their pixel
grid), `<svg class="ic"><use href="#i-name"/></svg>`.

## Identity rules (non-negotiable)

1. **One light.** `--brand` is an LED: the logo dot, live/now indicators, lit switches, the selected tab dot, the hover state of ink buttons, the current hour, the red pixels. Everything else is ink on paper. Never two accent colours.
2. **Dots, not lines.** Display type is dots; rules are 2px dotted; meters are rows of dots; bar charts are columns of dots; line charts are dotted strokes. Solid lines only for hairline panel borders.
3. **The device is real.** Show the product as the drawn `.device` with a working `.matrix`; faces animate only while visible and stand still under reduced motion; the matrix never mirrors in RTL.
4. **Capsules and squircles.** Buttons, chips, segs and tabs are capsules; panels radius 24; the device ≈ 23% squircle with four screws, a crown and a pinhole LED.
5. **Mono for the machine, grotesk for people.** Labels, tabs, units and table heads in Geist Mono uppercase; sentences in Host Grotesk; Persian in Vazirmatn without uppercase or tracking.
6. **Paper or black, nothing between.** Light mode is `#f2f2f0` paper with a `--dot` grid; dark mode is pure black glass. The device stays paper-white in both unless a finish is chosen.
7. **Quiet motion.** LEDs blink in steps, switches slide, the device scales between models; no bouncing, no parallax. Only the matrix animates on its own, and only when seen.
8. **Numbers are hardware.** Specs, prices and stats are Doto (Latin) or dotted Vazirmatn (Persian) with a mono unit label beside them.
9. **Accessible light.** Every matrix has `role="img"` and a label; the editor is real buttons; red is never the only signal (labels, icons and states carry meaning too).

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f2f2f0` / `#ffffff` / `#e9e9e6` | `#000000` / `#0e0e0e` / `#161616` |
| `--ink` / `--ink-2` / `--ink-3` | `#0d0d0d` / `#474745` / `#666663` | `#f2f2f0` / `#b0b0ab` / `#8a8a86` |
| `--brand` (LED) / `--brand-ink` | `#cf2f17` / `#ffffff` | `#ff4a2e` / `#000000` |
| `--glass` / `--led-off` / `--led-white` | `#0b0b0b` / `#1f1f1e` / `#f4f4f1` | `#050505` / `#191918` / `#f4f4f1` |
| `--dot` (grid) / `--line-2` (dotted rules) | `#c4c4bf` / `#c5c5c0` | `#2a2a29` / `#343432` |

Type 12 / 13.5 / 15 / 17 / 22 / 30 / 44, display `clamp(46px, 7.4vw, 108px)` (Persian `clamp(52px, 6.8vw, 100px)`).
Radius 10 / 16 / 24 + capsules. Controls 42 / 52px. Dot grid 18px.

## Brand adaptation

- `--brand` may be any saturated "LED" colour with white text ≥ 4.5:1 and ≥ 4.5:1 on paper (teal `#1f6f8b`, green `#2f5d46`, violet `#5b4a8a`, amber-brown `#b0461a`); `--led`, `--led-glow`, `--brand-soft` and `--brand-strong` are derived, so the matrix, switches and glows follow.
- Keep the device paper-white or ink; the *signal* finish uses the brand colour.
- The logo is the wordmark in Doto plus one LED dot; a real logotype can replace it if it keeps the dot.

## Website patterns

- **Header**: LED logo · product, faces, specs, store, support, app · language/theme · cart with count · *Pre-order* (ink capsule with LED); nav folds behind a menu on tablets.
- **Hero** on dot grid: micro label with a glowing LED, dotted headline ending in a red `.dot-end`, lead, *Pre-order* + *See the faces* + "from" price, shipping/warranty notes; the device with `wink` and mono callouts with dotted leaders; a numbers row (dots, hours, grams, years).
- **Faces**: a vertical tablist (LED dot, name, index) beside a large matrix and a short description; horizontal pills on phones.
- **Features**: four tiles with pixel icons on a dot tile. **Specs**: a dotted table comparing models.
- **Store**: device preview on dot grid (finish and model change it) beside a configurator — live price (Toman in millions for Persian, USD for English), model seg, finish swatches, quantity, what's in the box, add to cart (count + toast).
- **Questions** with LED markers; a **black-glass band** with a dotted headline and email sign-up; footer with columns and a giant dotted wordmark.

## Dashboard patterns

- **Shell**: sidebar (LED logo, devices with thumbs and LED status, add device, account) → horizontal device strip on phones; topbar with device name/status, LED tabs, language/theme.
- **Overview**: live preview (device + matrix) with face chips, brightness (dims the LEDs), volume, night mode (dims to almost off), find (matrix flashes red), restart; battery (dotted number, dot meter, dotted line); four stats; glances per hour as `.dotbars` with the current hour red; *what can light it up* rows with switches.
- **Glyphs**: 15×15 editor (pen/eraser, white/red, presets, clear, invert, lit-dot count) + save form (name, trigger) + send to device; saved glyphs as small matrices that load back into the editor.
- **Routines**: rows with icon tile, time range, seven day dots and a switch; *New routine* dialog (name, face, from/to, day toggles, hold notifications).
- **Updates**: version, changelog, dot progress bar with LED steps (download, install, restart), auto-update switches, history table.

## Components

`.logo`, `.nav`, `.head-end`, `.menu-btn`, `.cart-btn .count`, `.btn` (+ `-outline`, `-ghost`, `-red`, `-sm`, `-lg`, `-icon`, `-block`), `.seg`, `.tabs`, `.chips`, `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.badge(.red|.ok|.warn|.ink)`, `.avatar`, `.led(.ok|.warn|.off|.glow|.blink)`, `.meter(.red|.lg)`, `.range`, `.micro`, `.display`, `.dots(.big)`, `.dot-end`, `.dotgrid`, `.rule`;
`.matrix(.sm|.asleep|.flash|.is-edit)`, `.dotbars` + `.dotbars-axis`, `.device` (`data-finish="paper|ink|signal"`, `data-model="mini"`, `.sm`), `.stage`, `.callout(.c-end)`;
`.hero`, `.hero-grid`, `.hero-copy`, `.hero-note`, `.numbers`, `.faces`, `.face-list`, `.face-panel`, `.features`/`.feature` (`.tile`), `.spec`/`.spec-wrap`, `.buy`, `.buy-stage`, `.buy-panel`, `.price-big`, `.swatches`, `.qty`, `.ticks`, `.faq-list`, `details.faq`, `.band`, `.site-foot`, `.foot-grid`, `.foot-word`;
`.app`, `.side`, `.dev-list`, `.dev-thumb(.ink)`, `.side-foot`, `.main`, `.topbar`, `.page`, `.grid12` + `.span-*`, `.panel`, `.panel-head`, `.now`, `.ctrl`, `.stat`, `.num`, `.app-rows`/`.app-row`, `.composer`, `.tool-row`, `.glyph-grid`/`.glyph-card`, `.routine`, `.days`, `.steps-led`, `.changes`, `.table-wrap`, `.table`, `dialog.modal`, `.toast`.

## The matrix

```html
<div class="device" data-finish="paper"><div class="matrix" data-matrix="clock" role="img" aria-label="Clock face"></div></div>
<div class="matrix" data-matrix="timer" data-value="25/60" role="img" aria-label="Timer: 25 of 60 minutes"></div>
<div class="matrix sm" data-bits="000…" aria-hidden="true"></div>               <!-- 225 digits: 0 off, 1 white, 2 red -->
<div class="matrix" data-matrix-edit aria-label="Glyph editor"></div>           <!-- fires dot:change -->
<div class="dotbars" data-dotbars="0,2,5,9,…" data-hl="14" data-rows="8" role="img" aria-label="…"></div>
```
`dotMatrix.render(el)` after changing `data-matrix`, `data-value`, `data-bits` or `data-n`;
`dotMatrix.editor.get/set/clear/invert(el)`; `dotMatrix.glyph(name, value)` returns a grid; `dotMatrix.bits(grid)`.

## Interaction & motion

Ink buttons light up red on hover; tab and switch LEDs glow when on; status LEDs blink in two steps; the wink face
winks every few seconds, music bars move, the timer's next dot blinks — only while visible, never under reduced
motion or in screenshots; *Find* flashes the matrix red four times; the device scales to the mini; the update
progress fills dot by dot.

## Persian & RTL

- Persian is the default; English via `data-alt`. Layout, tabs, meters, dot bars and charts mirror; the LED matrix, the editor grid and the device do not.
- Display type and large numbers are dotted Vazirmatn Black (`.display`, `.dots.big`); Persian digits everywhere (`data-num`), Jalali dates, Toman in millions for prices, Persian day initials (ش ی د س چ پ ج) starting Saturday.
- Micro-labels lose uppercase and tracking in Persian; times and emails stay `dir="ltr"`.

## Accessibility

Ink on paper ≈ 17:1, `--ink-3` ≈ 5.1:1, LED red on paper ≈ 4.6:1, white on red ≈ 5.2:1 (dark: red on black ≈ 6.3:1).
Matrices are images with labels; animation stops under `prefers-reduced-motion`; the editor is a group of real
toggle buttons with row/column labels (localised), arrow-key movement, Home/End and Space; switches are
`role="switch"`; progress is `role="progressbar"`; colour is never the only signal.

## Component library overrides (shadcn/ui etc.)

`--radius: 24px` cards, capsules for Button/Badge/Tabs/Toggle; Button default → ink with red hover, `destructive` →
`.btn-red`; Switch → LED switch; Progress → dot `.meter`; Tabs → mono labels with an LED dot; Charts → dotted
strokes and dot bars; fonts Doto (display only) + Host Grotesk + Geist Mono.

## Anti-patterns

- A second accent colour, red used for decoration or large fills, gradients on the paper.
- Doto for body text, labels or long numbers with periods; dotted Persian below ~40px; any Persian font but Vazirmatn.
- Stock product photos instead of the drawn device; mirrored LED faces; matrices that animate off-screen or under reduced motion.
- Solid heavy rules, drop shadows on everything, square buttons.

## Pre-ship checklist

- [ ] One LED red; dotted rules, dot meters, dot charts.
- [ ] Display type in dots (Doto / dotted Vazirmatn ≥ 40px); text in Host Grotesk / Vazirmatn; labels in Geist Mono.
- [ ] The device with a working, labelled matrix; reduced motion stops it.
- [ ] Store: model, finish, quantity, live price in Toman/USD, cart count.
- [ ] App: devices, live preview + controls, glyph composer (keyboard works), routines dialog, update steps.
- [ ] Persian: Vazirmatn only, Persian digits and day initials, LTR matrix and times.
