---
name: kashi
description: Tastefolio "Kashi" design language — Persian heritage and tilework for the web. Plaster-ivory grounds, lajevard (lapis) structure, firouzeh turquoise as the brand glaze, saffron and pomegranate accents; symmetric layouts on a central axis, pointed-arch image frames, recolorable girih star patterns and tile friezes (CSS masks), double gilded frames with corner stars, cartouche labels, glazed buttons, Cormorant Garamond + Alegreya Sans for Latin and Vazirmatn (light display, regular text) for Persian. Use when the user asks for the Kashi, Persian, Iranian-heritage, tilework or ornamental style, or builds a restaurant/tea house/hotel, museum, festival, handicraft or cultural site or its staff panel — Persian-first (RTL) with English (LTR).
---

# Kashi

**Persian tilework, translated to interface.** Everything sits on a central axis; imagery lives inside pointed arches;
sections are separated by tile friezes; panels are double gilded frames with small stars in their corners. Lajevard
blue carries structure and headings, firouzeh turquoise is the glaze that marks actions, saffron is for ornament and
"reserved", pomegranate for alerts. Ornament is drawn with CSS masks, so it always takes the token colors.

Covers **public sites** (hospitality, culture, crafts: menus, events, stories, booking) and **staff panels** (floor
plans, reservations, menu & stock, settings).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Ivory/lajevard/firouzeh/saffron/anar palette, Cormorant + Alegreya Sans / Vazirmatn; dark "lajevard night" + Persian. |
| [assets/kit.css](assets/kit.css) | Ornament masks (`--star`, `--girih`, `--girih-fill`, `--arch`), `.girih`, `.frieze`, `.arch`/`.arch-frame`, `.framed`, `.cartouche`, `.ornament`, symmetric header, glazed buttons, diamond tabs, pills, forms, star switch, menu leaders, badges, tables, sidebar shell, KPI tiles, floor plan, meters, feed, dialogs, toasts, charts, footer. |
| [assets/kit.js](assets/kit.js) | Tabs (incl. vertical sidebar tablist), filters, sorting, dialogs, qty, validation, charts, Jalali dates and Persian digits, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Tea house: arch triptych hero, tabbed menu with leaders, filterable evenings, story with verse, reservation form. |
| [examples/dashboard.html](examples/dashboard.html) | Staff panel: KPI tiles, takht floor plan with dialog, arrivals feed, sales charts, reservations, menu & stock, settings. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/light/style.css">
```
Persian: **Vazirmatn** only — 300 for display and verses (an inscription-like light voice in lajevard), 600 for
headings, 400–500 for text. Latin: **Cormorant Garamond** 600 for display (italic for emphasis), **Alegreya Sans**
for text. Icons: Phosphor light, sparingly; illustrations are line drawings.

## Identity rules (non-negotiable)

1. **Central axis.** Section heads, heroes, dialogs and footers are centered; the header is symmetric (`nav | emblem | nav`). Data views may be start-aligned but stay inside frames.
2. **Arches frame images.** Every picture/illustration sits in `.arch-frame > .arch` (pointed arch, gilded edge). Never rounded rectangles for imagery.
3. **Ornament is a mask.** Use `.girih` (pattern layer), `.frieze` (band), `.ornament` (divider), `.star`; colors come from tokens so brand changes recolor everything.
4. **Double frames.** Content panels are `.framed`: outer gilded rule, inner rule, saffron stars in the corners; titles in a `.cartouche` on the top edge when centered.
5. **Color roles.** Lajevard = structure & headings; `--brand` firouzeh = primary actions, active/seated; saffron = ornament, highlight, reserved; anar = alerts/full; ivory grounds; one patterned dark band (sidebar, footer).
6. **Glazed buttons.** Primary buttons are solid glaze with an inner white hairline; secondary are ivory with gilded borders; small radius (4px).
7. **Light for voice, regular for work.** Persian display and verses in Vazirmatn 300, headings 600, UI 400–500; Latin display in Cormorant. No other Persian faces.
8. **Diamonds, not underlines.** Active tabs and current nav get a small saffron diamond; lists use star bullets; badges have diamond dots.
9. **Persian-first.** Design in RTL, Jalali dates and Persian digits; English is the alternate.
10. **Calm motion.** Slow, soft transitions (280–520ms); no bouncing.

## Tokens

| Role | Light | Dark "lajevard night" |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f5eedf` / `#fbf7ee` / `#efe5d0` | `#0e1631` / `#142047` / `#1a2857` |
| `--ink` / `--ink-2` / `--ink-3` | `#1b1d33` / `#4a4a5e` / `#75707c` | `#f3ead6` / `#c9c0ad` / `#9590a0` |
| `--line` / `--line-2` | `#dfd1b3` / `#c5ae84` gilded | gold at 18% / 38% |
| `--brand` firouzeh | `#0c7c7a` | `#37bdb6` |
| `--lajevard` / `--lajevard-deep` | `#1d3f8f` / `#13285c` | `#8fb0f2` |
| `--saffron` / `--anar` / `--gilt` | `#dc9a22` / `#b3362d` / `#b8902f` | `#f0b545` / `#ef6b5f` |

Type 12 / 14 / 17 / 20 / 26 / 34 / 46, display `clamp(46px, 7vw, 100px)` (fa `clamp(40px, 5.6vw, 80px)`, line-height 1.9).
Spacing 4 → 144; radius 4 / 8 / 14; controls 42 / 52px.

## Brand adaptation

- `--brand` replaces firouzeh: good alternatives are lajevard `#1d3f8f`, aubergine `#8a3b8f`, garden green `#2e7d4f`, pomegranate `#b3362d`. Keep lajevard as structure unless the brand *is* blue — then use teal or saffron for structure accents.
- Logos sit on the axis with the two-star emblem (`.emblem .mark`) or their own mark inside an arch.
- Photos: crop to the arch; warm, daylight, textured subjects (tiles, wood, textiles). Avoid cool stock imagery.

## Website patterns

- **Header**: symmetric — three links, emblem (name + small caps descriptor), two links + language/theme + primary; on mobile `menu | emblem | tools` with a drawer.
- **Hero**: `arch | centered text | arch` (second arch dropped lower); cartouche eyebrow, light display, `.ornament`, lead, two centered buttons; faint `.girih` behind.
- **Frieze** between major sections.
- **Menu**: centered section head, diamond tabs, `.framed` panel with two columns of `.menu-list` (name, note, dotted leader, price).
- **Events**: chip filter; arch cards (5:4) with date, display title, note, badge + small action.
- **Story**: arch + text, a `.verse`, three facts split by rules.
- **Booking**: framed two-column form (name, phone with pattern, date, time, qty, seating radios, notes, consent), centered submit.
- **Footer**: lajevard band with saffron girih, emblem, address, hours, links.

## Dashboard patterns

- **Shell**: lajevard sidebar (girih at 7%), emblem, vertical tablist with brand icons, counts as saffron pills, shift info + action in the foot; off-canvas on mobile.
- **Header**: Jalali date eyebrow, display greeting, language/theme, primary "new" button.
- **KPI tiles**: four `.framed.kpi` centered, display numerals, delta line.
- **Floor plan**: `.floor` of `.takht` buttons (free / reserved saffron / seated glaze / bill anar), round and wide variants, legend; clicking opens a centered framed dialog.
- **Feed**: star-bulleted arrivals with times. **Charts**: smooth area (today vs. dashed comparison), donut with centered label.
- **Tables**: lajevard small-caps headers with gilded rule, badges, icon actions; search + pill filter.
- **Menu & stock**: chip filter, star switches for availability, gradient meters (anar when low).
- **Settings**: framed form, switch rows with explanations, radios, textarea template, save + reset.

## Components

`.girih` (`--pattern`, `--pattern-o`, `--tile`), `.frieze`, `.arch`, `.arch-frame`, `.star`, `.ornament`, `.cartouche(.glaze|.saffron)`,
`.framed(.tight)`, `.emblem`, `.site-head`, `.nav(.a)`, `.mnav`; `.display`, `.h1–.h3`, `.em`, `.eyebrow`, `.lead`, `.verse`;
`.btn` (+ `-primary`, `-lajevard`, `-ghost`, `-danger`, `-sm`, `-lg`, `-icon`), `.link`, `.tabs(.start)`, `.seg`, `.chips`;
`.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.qty`; `.menu-list`, `.badge(.glaze|.saffron|.anar|.lajevard)`,
`.table`, `.empty`; `.shell`, `.side`, `.side-nav`, `.app-head`, `.app-body`, `.kpis`/`.kpi`, `.floor`/`.takht(.reserved|.seated|.bill|.round|.wide)`,
`.legend`, `.meter`, `.feed`; `dialog.modal > .framed`, `.toast`, `.site-foot`.

## Interaction & motion

Soft and unhurried: color transitions 160ms, drawers 280ms, nothing springy. The star switch knob rotates 45° when on.
Tabs move a diamond; hover on links turns lajevard. Respect `prefers-reduced-motion`.

## Persian & RTL

- Persian is the default (`lang="fa" dir="rtl"`); English via `data-alt`. Dates through `data-date` → Jalali; numbers through `data-num` → Persian digits; prices `data-fmt="toman"`.
- Persian display is Vazirmatn 300 at line-height ≈ 1.45, headings 600; keep display headings to one or two lines.
- Ornaments are symmetric so they need no mirroring; sidebar markers and drawer directions flip automatically.
- Phone/URL inputs are `dir="ltr"`.

## Accessibility

Ink on ivory ≈ 15:1; lajevard on ivory ≈ 9:1; firouzeh on ivory ≈ 5:1 (text) and white on firouzeh ≈ 5:1. Saffron is
ornament or background only — never text on ivory. Focus ring is lajevard (saffron in dark). Arches and patterns are
`aria-hidden`; floor-plan buttons have full `aria-label`s (state, party, time); badges use words.

## Component library overrides (shadcn/ui etc.)

`--radius: 4px`; Card → `.framed` (double rule + corner stars), CardTitle → cartouche or display h2; Button default →
glaze with inner hairline; Tabs → centered with diamond indicator; Switch → star knob; Avatar/Image → arch mask;
Separator → `.ornament`; Sidebar → lajevard with girih; Badge → diamond dot pill.

## Anti-patterns

- Random "oriental" clichés: lamps, camels, calligraphy as wallpaper, gold gradients everywhere.
- Calligraphic or decorative Persian fonts — Persian is set in Vazirmatn only.
- Asymmetric heroes; rounded-rectangle photos; heavy drop shadows.
- More than one patterned band per screen besides the footer; patterns over text.
- Saffron text on ivory.

## Pre-ship checklist

- [ ] Central axis respected; header symmetric.
- [ ] Every image is an arch; at least one frieze on long pages.
- [ ] Panels framed with corner stars; cartouche labels where centered.
- [ ] Brand change recolors glaze, patterns stay tokenized.
- [ ] Persian only in Vazirmatn (300 display/verse, 600 headings, 400 text).
- [ ] Jalali dates, Persian digits, toman prices in fa; clean English alternates.
- [ ] Mobile: arches scale, sidebar is a drawer, tables scroll.
