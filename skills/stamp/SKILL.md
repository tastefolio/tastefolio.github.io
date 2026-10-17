---
name: stamp
description: Tastefolio "Stamp" design language — playful neo-brutalism. Cream paper, 3px ink outlines on everything, hard offset shadows that collapse when pressed, flat sticker colors (yellow primary, pink, mint, blue, lilac, orange) always with ink text, chunky display type, rotated stickers, black tape marquees, folder tabs, highlighter words, striped progress bars, and an app side with colored stat blocks, a kanban board and outlined charts. Use when the user asks for the Stamp style or wants a loud, friendly education/creative/indie SaaS/community/habit product — site and dashboard — in English (LTR) and/or Persian (RTL).
---

# Stamp

**Playful neo-brutalism.** Everything looks hand-stamped: thick ink outlines, flat colors, shadows that are
just offset ink. It is loud on purpose but never messy — the grid is clean, the palette is fixed and every
playful move (a rotated sticker, a wobble on hover) is small and deliberate.

Covers **marketing sites** (hero with sticker collage, tape marquee, colored class tiles, folder-tab explainer,
pricing, FAQ, sign-up) and **apps** (stat blocks, prompt/upload cards, kanban board, progress charts, profile).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Cream/ink, sticker palette (`--pop-*`), 3px border, hard shadows, springy easing; dark + Persian (Lalezar). |
| [assets/kit.css](assets/kit.css) | Pressable buttons, stickers, tape, boxes with colored heads, tiles, folder tabs, FAQ, chunky forms/toggles/checks, progress, app shell, stats, kanban, outlined charts. |
| [assets/kit.js](assets/kit.js) | Tabs, groups, `data-when`, dialogs, toasts, validation, charts, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Art-class platform landing page. |
| [examples/dashboard.html](examples/dashboard.html) | Student dashboard: today, kanban board, progress, profile. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@700&family=Lalezar&family=Vazirmatn:wght@500;600;700;800&display=swap">
```
Display: **Bricolage Grotesque 800** (tight, quirky). Text/UI: **Space Grotesk 500–700**. Labels: **Space Mono 700** uppercase.
Persian: **Lalezar** for display (single heavy weight) and **Vazirmatn 500–800** for text. Fallbacks: Archivo Black / Rubik; Vazirmatn 900.

## Identity rules (non-negotiable)

1. **3px ink outline** on every surface: buttons, inputs, cards, tabs, chips, avatars, chart bars, toasts, dialogs. No hairlines.
2. **Hard shadows only**: `3px 3px 0`, `6px 6px 0`, `10px 10px 0` in ink. No blur, ever. Shadows stay bottom-right in RTL too (the light source does not flip).
3. **Press physics**: hover lifts 1px (shadow grows), active translates 3px and the shadow collapses to zero. Tiles lift and tilt −0.6° on hover.
4. **Flat sticker palette** with ink text: `--brand` yellow (primary actions), pink, mint, blue (white text allowed), lilac, orange. No gradients except the striped progress fill.
5. **Color blocks, not tints**: section heads, tiles and stat blocks are filled with a sticker color; body surfaces are white or cream.
6. **Chunky type**: display 44–116px weight 800, tight (−0.03em). Highlight one or two words with `.hilite` or a wavy underline.
7. **Stickers and tape**: one rotated sticker per screen region (−4°…10°), round badges for promises, a black tape marquee with yellow text between sections.
8. **Folder tabs** for explainers; segmented pills for small choices; FAQ boxes with a square "+" that rotates.
9. **Friendly forms**: thick inputs with inset shadow, square checkboxes that fill mint, errors as small red rotated labels.
10. **Generous space**: section padding 56–104px, gaps 28px; dense UIs are out of character.

## Tokens

| Role | Value |
|---|---|
| `--canvas` / `--surface` / `--surface-3` | `#fff5e1` / `#fff` / `#f3e8d2` |
| `--ink` | `#121212` (also every border) |
| `--brand` (yellow) | `#ffd23f` with ink text |
| `--pop-pink/mint/blue/lilac/orange` | `#ff6fb5` `#3ddc97` `#5b8cff` `#b892ff` `#ff8a3d` |
| `--border-w` | 3px |
| shadows | 3 / 6 / 10px offsets, zero blur |
| radius | 8 / 12 / 18 / pill |
| `--ease` | `cubic-bezier(.3, 1.6, .5, 1)` springy |

Type 12 / 14 / 16 / 19 / 24 / 34 / 48 / display `clamp(44px, 8vw, 116px)`. Controls 44 / 56px.

## Brand adaptation

- `--brand` is the main sticker: any saturated, light-to-mid color that keeps ink text ≥ 7:1 (yellow, pink `#ff6fb5`, mint `#3ddc97`, orange `#ff8a3d`). With blue, switch `--brand-ink` to white.
- Keep the other pops as a supporting set; never introduce muted or pastel-gray tones — they kill the stamp effect.
- Logo mark: a rotated rounded square in a pop color with an ink outline and shadow.

## Website patterns

- **Header**: cream bar with 3px bottom border; logo tile rotated −6°; nav pills that gain an outline on hover and a mint fill when current; small buttons (language flat, Log in, primary Join).
- **Hero**: eyebrow pill (mono uppercase), display headline with a highlighted word, lead ≤ 52ch, two big pressable buttons, avatar stack + social proof. Right: a collage of 2 rotated boxes (class card with colored head + doodle, progress card) and one round sticker.
- **Tape** marquee (rotated −1.6°, black band, yellow uppercase words with ✶ separators).
- **Tiles**: 3 colored class tiles with icon squares, title, one sentence, tags.
- **Folder tabs**: Watch / Draw / Share with panels in different pops.
- **Pricing**: segmented billing toggle; the hot plan is yellow, tilted −1.2°, with a pink sticker.
- **FAQ**: boxes with square plus buttons.
- **Sign-up**: copy beside a box form with a pink head.
- **Footer**: ink background, yellow headings, a giant cropped word.

## App patterns

- **Shell**: cream side panel with a 3px border, tabs that become yellow outlined blocks when selected, orange streak card at the bottom.
- **Top line**: greeting with a highlighted name, language, theme, avatar.
- **Stats**: 4 colored blocks with huge numbers.
- **Prompt box**: orange head with a countdown tag, big quote, avatars, dashed upload drop.
- **Lessons**: rows with icon squares and striped progress bars, Resume buttons.
- **Kanban**: three gray columns, chunky cards (title, tag, date) that tilt on hover; add-card form above.
- **Charts**: bars outlined in ink, dashed grid, mono axis labels; donut with thick ring + square legend chips.
- **Profile**: box form with chunky toggles.

## Components

`.btn` (+ `-primary | -pink | -mint | -blue | -ink | -flat`, `-sm | -lg | -icon`), `.eyebrow`, `.hilite` (`--hl`), `.squiggle`,
`.sticker` (`--bg`, `--rot`, `.round`), `.tape-zone` > `.tape` > `.tape-track`, `.box`, `.box-head` (`--bg`), `.box-pad`, `.tile` (`--bg`), `.grid-2/3`,
`.folder` tabs, `.faq`, `.plans`, `.plan.is-hot`, `.price`, `.checks`, `.field`, `.input`, `.check`, `.toggle`, `.seg`,
`.progress` (`--w`, `--bg`), `.tag`, `.avatar(s)`, app: `.app`, `.side`, `.streak`, `.stats`, `.stat`, `.board`, `.col`, `.card`.

## Motion

Springy but short: 90–320ms. Press = translate(3px,3px) + shadow 0. Dialogs/toasts pop in from 90% scale with −2° tilt.
Tape scrolls slowly (28s). Everything stops under `prefers-reduced-motion`.

## Persian & RTL

- Lalezar for Persian display (weight 400 is its heavy cut; never fake-bold it), Vazirmatn 500–800 for text, line-height 1.9.
- Mono uppercase labels become Vazirmatn bold without uppercase or tracking.
- Stickers keep their rotation; shadows stay bottom-right; the tape stays LTR when it carries Latin words (switch to RTL for Persian-only tapes).
- Highlights wrap per line (`box-decoration-break: clone`) and work with joined Persian letters.

## Accessibility

Ink on every sticker color ≥ 7:1 (blue uses white text). Focus = 3px blue outline offset 3px (never removed by press
effects). Rotations ≤ 10° and never on long text. Toggles are `role="switch"`; checkboxes stay native inputs.
Reduced motion disables tilts, springs and the marquee.

## Component library overrides (shadcn/ui etc.)

Set `border-[3px] border-ink` and `shadow-[6px_6px_0_var(--ink)]` on Card/Button/Input/Dialog; remove blurred shadows and
ring utilities; Button `active:translate-x-[3px] active:translate-y-[3px] active:shadow-none`; Tabs → folder style;
Badge → `.tag`; Progress → striped with ink end cap. Radius 12px controls, 18px cards.

## Anti-patterns

- Thin borders, soft blurred shadows, glassmorphism, gradients, gray-on-gray.
- More than ~4 pop colors on one screen; color without ink outline.
- Tilting paragraphs or forms; wobble animations on loop.
- Dense tables; tiny 12px UI text everywhere.

## Pre-ship checklist

- [ ] Every surface has the 3px ink outline and a hard shadow (or none).
- [ ] Buttons press (shadow collapses) and show a visible focus ring.
- [ ] One yellow primary per view; other pops used as blocks/tiles.
- [ ] At least one sticker, one highlighted word and the tape marquee on marketing pages.
- [ ] Kanban/stat blocks in the app; charts outlined.
- [ ] Mobile: nav collapses, collage still readable, no overflow.
- [ ] Persian: Lalezar + Vazirmatn, no tracking/uppercase, digits in Persian.
