---
name: teletype
description: Tastefolio "Teletype" design language — terminal-native, keyboard-first UI for developer products. One monospace family (JetBrains Mono, with Vazirmatn for Persian) on a character grid, phosphor ink on near-black with one amber signal and the six ANSI colors for status/data, box-drawn panes with titles on the border, [ bracketed ] buttons that invert on hover, [x] checkboxes, tmux-style numbered tabs, block-cell meters, step charts, numbered log viewers, a vim-style command line and a status bar; light "printout" theme with green-bar tables. Use when the user asks for the Teletype, terminal, TUI, CLI or hacker style, or builds a CLI/devtool/CI/API/database product site, docs or changelog, or a developer console — in English (LTR) and/or Persian (RTL).
---

# Teletype

**Terminal-native UI.** The screen is a character grid: one monospace face, text-drawn controls, panes framed by thin
rules with their title sitting on the border, and a status bar that always tells you the mode. Color is phosphor ink,
one amber signal for "you are here / do this", and the six ANSI colors for status and data — nothing else.

Covers **public sites** (CLI/devtool landing pages, docs, changelogs, pricing) and **consoles** (CI/CD, runners, logs,
settings) with the same vocabulary.

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Dark-first palette, ANSI set, mono type scale, row-based spacing, zero radius; light "printout" theme + Persian. |
| [assets/kit.css](assets/kit.css) | Panes (`.panel` + `.ptitle`/`.pkeys`), terminal window, header/nav, `[ ]` buttons, inputs, `.cmd` prompt input, `[x]` checks, switches, tmux tabs, `.seg` flags, tables, `.kv` leaders, block meters, gantt rows, log viewer, code, man pages, app shell, status bar, dialogs, command line, toasts, charts. |
| [assets/kit.js](assets/kit.js) | Tabs, number hotkeys (`data-hotkey`), command palette (`dialog[data-palette]`, `:` / mod+K), filters, sorting, dialogs, copy, validation, charts, `dur` number format, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | CLI build tool: hero + typed terminal session, install tabs, man-page features, benchmark meters, config tabs, pricing, changelog filter, FAQ, subscribe. |
| [examples/dashboard.html](examples/dashboard.html) | CI console: overview (runner meters, kv stats, step charts, runs table), run detail (gantt + log), runners, settings, command line. |

## Fonts

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Vazirmatn:wght@100..900&display=swap">
```
**JetBrains Mono** 400–800 for everything — body, display, numbers. Persian: **Vazirmatn** as the fallback in
the same stack, so Latin and code keep JetBrains Mono and Persian script falls through to Vazirmatn. Alternatives:
IBM Plex Mono, Commit Mono, Berkeley-style monos; never mix in a proportional sans.

## Identity rules (non-negotiable)

1. **One monospace family, everywhere.** Headlines are 800 weight mono with tight tracking; widths use `ch`. No proportional type.
2. **Panes, not cards.** `.panel` = 1px rule box, title on the top border (`.ptitle`), key hints on the bottom border (`.pkeys`). The focused pane (`:focus-within` / `.is-focus`) turns amber.
3. **Controls are text.** Buttons are `[ label ]` and invert (reverse video) on hover/focus; primary is a solid amber block. Checkboxes `[x]`, radios `(•)`, switches `● on / ○ off`.
4. **Keyboard-first.** Every view has a number hotkey (tmux tabs `1:overview*`), `/` focuses filter, `:` opens the command line, hints are shown as `b key` + label.
5. **One signal color.** Amber `--brand` = cursor, prompt, active tab, focused pane, primary action. Status and data use only the ANSI set: green ok, red fail, yellow running/warn, cyan info/cache, blue/magenta for extra series.
6. **Glyphs instead of icons.** `✓ ✗ ● ◌ – ○`, an ASCII spinner, `▾`, `→`, box-drawing. No icon font, no illustrations.
7. **Data looks like output.** Tables with dashed header rules and reverse-video selection; `key ....... value` leaders; block-cell meters; step-curve charts with dashed grids; logs numbered, timestamped, level-colored.
8. **Code and logs are always LTR** (`.ltr`, `.log`, `.code`, `.install`) even inside RTL pages.
9. **No radius, no shadow, no gradient** — except the dialog drop shadow and an optional CRT scanline on marketing terminals.
10. **Status bar.** Apps end with a status bar: mode block, context (repo, branch), live counts, clock, `?` help.

## Tokens

| Role | Dark (default) | Light "printout" |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#0f0f0d` / `#141412` / `#1b1b18` | `#f3f0e4` / `#f8f6ed` / `#e9e5d6` |
| `--ink` / `--ink-2` / `--ink-3` | `#e8e5d8` / `#aaa797` / `#77746a` | `#1c1b17` / `#4b483f` / `#6f6b5f` |
| `--line` / `--line-2` | `#2c2b27` / `#45433c` | `#cfc9b4` / `#a9a28a` |
| `--brand` | `#ffaf38` amber | `#b35900` |
| ANSI | red `#ff6e5e` green `#93d46b` yellow `#f2d06b` blue `#73b6ff` magenta `#d796ff` cyan `#62d8c9` | darker equivalents |
| `--band` | — | green-bar table bands |

Type 11 / 12 / **14** / 16 / 20 / 28 / 40, display `clamp(34px, 5.4vw, 76px)`; line-height 1.6 (one terminal row).
Spacing 4 / 8 / 12 / 16 / 22 / 32 / 44 / 66; controls 32 / 40px. Motion is frame-stepped (`steps(3)`, 60–200ms).

## Brand adaptation

- `--brand` should read as a phosphor/LED color on near-black: amber (default), green `#93d46b`, cyan `#62d8c9`, magenta `#d796ff`. Avoid dark brand colors in the dark theme; give the light theme a darker shade.
- If the brand color is one of the ANSI hues, shift that ANSI token slightly so status colors stay distinguishable.
- Logos become a lowercase wordmark followed by the blinking block cursor.

## Website patterns

- **Header**: `wordmark▌`, nav as `./docs ./pricing` (current = amber, underlined), `[ fa ]` `[ theme ]` `[ sign in ]`, solid primary.
- **Hero**: `# eyebrow` comment, huge mono headline, dim lead (≤ 58ch), install command with underline tabs (curl/brew/npm/docker) and `[ copy ]`, primary + bracket CTA; a terminal window with a typed session (`.typed` + `data-reveal-stagger`) and optional `.crt` scanlines.
- **Stats strip**: ruled cells with big mono numerals.
- **Features as man pages**: panes titled `tool-cmd(1)` with `name / synopsis / description`.
- **Benchmark**: block-cell meters, brand only for your own bars.
- **Config**: underline tabs over `.code` with ANSI syntax tokens (`.tk-k/.tk-s/.tk-n/.tk-c/.tk-f/.tk-p`).
- **Pricing**: `.seg` flags `--monthly / --yearly`, plans as panes, the recommended one `is-focus`; feature lists `[x] / [ ]`.
- **Changelog**: `/` search + `.seg` type filter, rows `version · date · [tag] · text`.
- **FAQ**: `<details>` with `[+]/[-]`. **Footer**: directories `docs/`, ending in a status bar.

## Dashboard patterns

- **Top bar**: wordmark, `repo@branch`, tmux tabs with `data-hotkey="1…4"`, `[ :command ]`, language, theme.
- **Overview**: runner meters (red over 90%) + `.kv` stats with leaders; two step charts (`--chart-curve: step`) with `━━` legends; a filterable/sortable runs table with status glyphs, durations (`data-fmt="dur"`) and relative times.
- **Detail**: title with spinner, action buttons with key hints, steps table with `.gantt` timeline, log viewer (`.log`, `.is-err`, `.is-hl`).
- **Lists**: region `select` + state `.seg` filters, inline cell meters, row switches.
- **Settings**: panes for general/cache/notify/danger zone; `.qty`, switches, `(•)` radios, `[x]` checks, URL validation; save with mod+S.
- **Command line**: `dialog.palette[data-palette]` anchored to the bottom (`:` prefix), opened by `:` or mod+K; unknown → friendly error line.
- **Status bar**: `NORMAL` mode block, context, live counts, clock, `? help`.

## Components

`.panel` (+ `.ptitle`, `.pkeys`, `.is-focus`, `.raised`, `.double`), `.window` (+ `.window-bar`, `.window-body`, `.typed`, `.crt`),
`.site-head`, `.wordmark`, `.cursor`, `.nav`; `.display`, `.h1–.h3`, `.eyebrow`, `.comment`, `.lead`, `.prompt`, `.big`, `.fg-*`;
`.btn` (+ `-primary`, `-danger`, `-sm`, `-lg`, `-text`, `.k`), `kbd`, `.keys`, `.tag`, `.st(.ok|.fail|.warn|.run|.queue|.skip|.off)`;
`.field`, `.flabel`, `.hint`, `.input`, `.select` in `.select-wrap`, `.textarea`, `.cmd`, `.check` + `.box`, `.switch`, `.qty`;
`.tabs` (tmux) / `.tabs.line`, `.seg`; `.table` (+ `.num`, `.is-sel`), `.kv`, `.meter` + `.bar(.ok|.warn|.hot|.cyan|.ink|.thin)`,
`.gantt`, `.log`, `.code`, `.install`, `.man`, `.legend`, `.empty`; `.app`, `.app-top`, `.app-main`, `.statusbar`;
`dialog.modal` (+ `.modal-title`, `.modal-body`, `.modal-foot`), `dialog.palette` (+ `.cmdline`), `.toast`.

## Interaction & motion

Stepped, instant-feeling: hover = reverse video, focus moves the amber frame, the block cursor blinks (`steps(1)`), the
spinner cycles `| / - \`, typed sessions print line by line. All of it stops under `prefers-reduced-motion`.
Hotkeys: `1–4` views, `/` filter, `:` or mod+K commands, `r` rerun, `?` help, mod+S save; arrows move between tabs.

## Persian & RTL

- Persian UI text leads with **Vazirmatn** (a monospace space glyph would gape between Persian words); code, logs, commands and `.ltr` tokens keep JetBrains Mono via `--font-mono`. Body 15px, line-height 1.95, no tracking; tmux tab numbers use `counter(tab, persian)`.
- Panes, tabs, meters (`--dir` flips) and status bars mirror; **code, logs, commands, branch names stay LTR** with `.ltr`.
- Switch text and field errors are localized in CSS (`روشن / خاموش`, `خطا:`). Durations via `data-fmt="dur"` give `۲د ۰۸ث`.
- Keep Persian copy short: monospace Persian is for UI labels, not long reading.

## Accessibility

Ink on canvas ≈ 15:1; amber on black ≈ 10:1; ANSI colors ≥ 4.5:1 on both themes. Focus is always visible (reverse video
or amber outline). Glyph statuses always come with words; the spinner has text next to it. Native inputs stay in the
DOM behind `[x]` glyphs; switches are `role="switch"` with a label. Hotkeys never fire while typing. Logs are focusable
scroll regions with a label.

## Component library overrides (shadcn/ui etc.)

`--radius: 0`; font-family mono on `body`; Button: transparent with `[`/`]` pseudo-elements, hover = inverted; primary =
solid brand; Card → pane with border title; Tabs → numbered tmux list; Checkbox → `[x]` glyph label; Switch → text
switch; Badge → `[tag]`; Command (cmdk) → bottom command line; Toast → `[ ok ]` line; Charts → step curves, dashed grid.

## Anti-patterns

- Proportional fonts, rounded corners, soft shadows, gradients, glassmorphism.
- Icon fonts and illustrations; emoji as status.
- Neon rainbow "hacker" palettes, green-on-black Matrix rain, glitch effects.
- Right-aligned code/logs in RTL; Persian long-form text in mono.
- Hotkeys without visible hints.

## Pre-ship checklist

- [ ] Only one monospace family; headings 800, body 400/500.
- [ ] Panes have border titles; focused pane amber.
- [ ] Buttons bracketed/inverted; checks `[x]`; switches labelled.
- [ ] Number hotkeys for views, `/` filter, `:` command line work and are hinted.
- [ ] Status colors only from the ANSI set, always with words.
- [ ] Code/logs LTR inside RTL; durations and dates localized.
- [ ] Light "printout" theme readable; green bands on tables.
- [ ] Mobile: panes stack, tables and logs scroll, status bar trims.
