---
name: switchboard
description: Tastefolio "Switchboard" design language — calm, settings-first utility UI. White cards on a cool gray canvas, one saturated brand color for action and state, native system type, top bar plus tab strip, setting rows with instant-save switches, live log streams. Use when the user asks for the Switchboard style, or wants a trustworthy privacy/security/filtering product, preference center or settings-heavy SaaS — both its marketing site and its dashboard — in English (LTR) and/or Persian (RTL), light or dark.
---

# Switchboard

**Calm control-panel utility.** Software people configure once and then trust. Every option is a plain-language
sentence with one switch beside it; the interface is quiet so that state — on, off, blocked, allowed — is the
loudest thing on screen.

Use this skill for both surfaces of a product: the **public website** (landing, pricing, setup guides, FAQ) and the
**signed-in app** (overview, settings, rules, logs, account).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Colors, type, spacing, radius, shadow, motion; light, dark (`[data-theme="dark"]`) and Persian (`:lang(fa)`) overrides. |
| [assets/kit.css](assets/kit.css) | Reference components (framework-free, RTL-safe). Copy as-is for plain HTML, or port to components. |
| [assets/kit.js](assets/kit.js) | Optional behaviors: tabs, menus, switches, dialogs, toasts, filters, sorting, form validation, charts, fa/en toggle. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 and shadcn/ui mappings for these tokens. |
| [examples/site.html](examples/site.html) | Complete marketing page. Read it before building a public page. |
| [examples/dashboard.html](examples/dashboard.html) | Complete console (overview, settings, rules, logs, account). Read it before building app screens. |

Workflow: load `tokens.css` → decide surface (site or app) → follow the matching pattern below → reuse kit classes
or port them → run the checklist at the end.

## Identity rules (non-negotiable)

1. **One accent.** `--brand` is used for primary actions, active/on state, links and highlighted headline words. Never for decoration, backgrounds of large areas, or icons that are not interactive.
2. **Black headlines, brand-colored phrases.** Marketing headlines are near-black, weight 800, tight tracking; 1–2 key phrases inside them use `.hl` (brand color). Never gradient text.
3. **Plain-language options.** Each setting = title (verb phrase, ≤ 6 words) + one-line description that says the consequence. No jargon without explanation.
4. **Switches, not forms.** Binary options are `role="switch"` toggles that save immediately and confirm with a toast ("Saved"). Only multi-field edits get a Save button.
5. **No sidebar.** The app shell is a white top bar + a horizontal tab strip (underline indicator, 2px brand). Content sits in one centered column (`--column: 960px`); wide data may use `--container: 1120px`.
6. **Cards are flat.** White surface, 1px `--line` border, 12px radius, shadow-1 at most. No colored card backgrounds, no gradients inside the app.
7. **State uses color + text + shape.** Status = colored dot or start-edge bar **and** a label (Blocked / Allowed). Never color alone.
8. **Native type.** System UI stack in Latin; Vazirmatn in Persian. No decorative display font.
9. **Monospace for identifiers.** Domains, emails, IPs, keys, IDs render in `--font-mono`, LTR-isolated even inside RTL text.
10. **Calm motion.** 120–320ms, ease-out, opacity/translate only. The only perpetual motion allowed is a live indicator dot or the marketing mono feed.

## Tokens (from tokens.css)

| Role | Light | Dark | Notes |
|---|---|---|---|
| `--canvas` | `#f4f6f9` | `#0b0e13` | Cool gray page background. Marketing hero may use `--canvas` too. |
| `--surface` | `#ffffff` | `#12171f` | Cards, top bar, tab strip, menus. |
| `--ink` / `--ink-2` / `--ink-3` | `#0e1116` / `#4a5462` / `#8691a1` | light equivalents | Heading / body-secondary / meta & placeholders. |
| `--line` / `--line-2` | `#e3e7ee` / `#cdd4df` | | Card borders, row dividers / input borders. |
| `--brand` | `#1f6bff` | `#4b8bff` | The only accent. `--brand-soft` (tint), `--brand-strong` (hover/pressed text) derive via `color-mix`. |
| status | success `#15924a`, warning `#c27806`, danger `#dc3545` | brighter in dark | Each has a `-soft` background for badges. |

Type scale: 12 / 13 / **15 (app body)** / 17 / 20 / 28 / 40 / display `clamp(40px, 6.2vw, 76px)`.
Weights: 400 body, 600 labels & titles, 800 headlines. Line-height 1.55 body (1.85 in Persian).
Spacing: 4px base (`--space-1…10` = 4, 8, 12, 16, 20, 24, 32, 48, 64, 96). Radius: 6 / 8 / 12 / pill.
Controls: 36px in the app, 48px for marketing CTAs. Setting rows: min 64px tall, 24px side padding.

## Brand adaptation

- Swap only `--brand` (and its dark-mode value). Pick a saturated mid-tone: contrast ≥ 4.5:1 against white for text links and ≥ 3:1 for the switch track. Good: azure, emerald `#0f9d58`, violet `#7c3aed`, vermilion `#e8590c`, ink `#111827`.
- Avoid pastel or neon brands — the style depends on the accent reading as *the* action color. If the brand color is pale, use a darker shade of it as `--brand` and keep the pale tone for illustrations only.
- `--brand-2` (used only in the marketing ribbon gradient) mixes the brand toward cyan; set it manually if the result clashes.
- Content, product name, logo glyph and copy are free to change. The layout logic above is not.

## Website patterns

- **Ribbon** (optional): 36px brand-gradient strip at the very top, end-aligned link to the app ("Open the console →").
- **Header**: logo (28px rounded square in brand color + wordmark 800), 4–6 text links, language toggle, secondary "Sign in"; collapses into a menu button below 820px. Sticky with blurred canvas background; hairline appears after scroll.
- **Hero**: centered, generous (`padding-block` ~150px desktop). Headline ≤ 15ch per line with `.hl` phrases; lead ≤ 58ch; one pill CTA (`.btn-primary.btn-lg.btn-pill`) with a two-line note under it (reassurance in `--ink-2`, detail in `--ink-3`); a small "Learn more ↓" cue. No hero image.
- **Feature sections**: two columns (text 1.1fr / visual 0.9fr), alternating with `.is-reversed`. Text = eyebrow + `.h2` + 2 short paragraphs + optional black `.chips` listing capabilities. Visual = a real UI fragment (a preview setting card, a mono feed of identifiers, a small chart) — never stock art.
- **Numbers**: one strip of 4 stats in a bordered card, dividers between cells.
- **Setup**: segmented-control tabs (Personal / Team / API) with numbered steps or a dark code block.
- **Pricing**: 3 equal cards; featured card gets a 1px brand ring and a "Popular" brand badge; monthly/yearly segmented toggle above.
- **FAQ**: hairline-separated `<details>` with a `+` that rotates 45°.
- **Sign-up**: two columns — pitch on one side, a single card form on the other (email, plan, consent, one primary button).
- **Footer**: logo + one-line description, three link columns, small text.

## Dashboard patterns

- **Shell**: `.app-header` (56px: logo, workspace switcher with email under the name, spacer, language, theme, avatar menu) + `.tab-strip` (46px, sticky, horizontally scrollable on mobile). No sidebar, no breadcrumbs for first-level pages.
- **Page head**: title (28px/800) + one-line description; range or primary action aligned to the end.
- **Overview**: 4 stat cards (label, big tabular number, delta, sparkline) → one wide area chart card (2 series max, legend in the card header) → 2-up row (top list with proportional brand-soft bars; donut + legend) → a sortable table card.
- **Settings pages**: stack of cards; each card = header (title + description) + `.setting-list` of `.setting-row`s. Group by consequence (Threats, Privacy, Retention), 3–6 rows per card. Non-binary choices use a segmented control in the row's end slot.
- **Lists (allow/deny, members, keys)**: card with an `.input-group` (input + Add) above an `.entry-list`; each entry is mono text + an icon-only remove button with an accessible label.
- **Logs**: card with toolbar (search, status filter chips, live switch with pulsing dot) → `.log` rows: time (mono 12px), favicon letter tile, identifier + reason, device, status badge; start edge 3px red/amber for blocked/held. New rows flash `--brand-soft` for 1.4s.
- **Account/settings form**: 2-column grid of fields inside one card; footer bar with "Last changed …" and the Save button. Destructive actions live in a separate card with a danger-tinted border and open a confirmation dialog that requires typing the name.
- **Empty / loading / error**: centered icon (28px, `--ink-3`) + one sentence + optional action. Loading = skeleton rows in `--surface-3`, never spinners over content.

## Components (see kit.css for exact values)

- Buttons: `.btn` + `.btn-primary | .btn-secondary | .btn-ghost | .btn-danger | .btn-danger-ghost`, sizes `.btn-lg`, `.btn-icon`, shape `.btn-pill` (marketing only). 14px/600, 8px radius.
- Inputs: 36px, 1px `--line-2`, focus = brand border + 3px `--focus` ring. Labels 13px/600 above. Errors: red border + 12px message below, `aria-invalid`.
- Switch: 40×24 track, 18px knob, brand when on; always paired with visible text (the row title) and an `aria-label`.
- Segmented control: gray track, white pressed segment with shadow-1.
- Badges: 22px pill, soft background + strong text per status; brand badge for "Recommended/Popular".
- Filter chips: outlined pills; pressed = solid ink.
- Menus: 220px min, 12px radius, shadow-2, 6px padding, 8px item radius.
- Tables: header 12px/600 `--ink-3`, row dividers only, numbers tabular, sort buttons in headers with ↑/↓.
- Toast: ink background, white text, green dot; bottom-end corner; auto-dismiss 3s.
- Dialog: 480px, 12px radius, footer actions on `--surface-2`.
- Charts: brand first series, gray second, status colors for status series; 1px `--chart-grid` lines, 11px axis labels, no chart borders; tooltip = ink box.

## Interaction & motion

Switch/segmented changes save instantly → toast. Tabs switch without page reload and support arrow keys.
Live data appends at the top with a brief flash. Hover = background shift to `--surface-3` or border darkening, never lift/scale.
Respect `prefers-reduced-motion` (stop the feed, the pulse and the flash).

## Icons & imagery

Bootstrap Icons (outline variants, 16–18px) next to text only; icons never carry meaning alone.
Favicons of senders/sites are letter tiles (20px, 5px radius, muted hue). No photography, no illustrations — product
fragments are the imagery.

## Voice

Short, literal, reassuring. "Block lookalike domains", "Changes are saved instantly", "No card required."
Numbers over adjectives ("checked in 38 ms"). Persian copy is equally direct; avoid literal calques.

## Persian & RTL

- `<html lang="fa" dir="rtl">`; the kit uses logical properties so layout mirrors automatically. Flip directional icons with `.flip-rtl`.
- Font: Vazirmatn 400/600/800 (Google Fonts). `:lang(fa)` raises line-height (1.85 body, 1.35 headlines) and removes all letter-spacing; never letter-space or uppercase Persian.
- Eyebrows stay in brand color but use 13px, no tracking.
- Format numbers with `Intl.NumberFormat('fa-IR')` (Persian digits) and dates with `Intl.DateTimeFormat('fa-IR')` (Solar Hijri). Times in logs too.
- Identifiers (domains, emails, code) stay LTR: wrap in `.mono` with `dir="ltr"` or `unicode-bidi: plaintext`.
- Switch knob travels toward the inline-end in both directions (handled in kit.css). Charts mirror their time axis in RTL.
- Use ZWNJ (نیم‌فاصله) correctly: «تنظیم‌ها»، «می‌شود».

## Accessibility

AA contrast for all text (ink-3 only for non-essential meta ≥ 13px). Visible focus ring on every interactive element.
Tabs use `role="tablist/tab/tabpanel"` with arrow-key support. Switches use `role="switch"` + `aria-checked`.
Menus close on Esc and outside click and return focus. Live regions: toasts are polite; the log stream is `aria-live="off"`.
Touch targets ≥ 40px on mobile; tab strip scrolls horizontally rather than wrapping. Charts have an `aria-label` and the
same numbers appear in text (legend, stat cards).

## Component library overrides (shadcn/ui, Radix, MUI…)

Map tokens with `references/adapters.md`, then: radius 8px controls / 12px cards; remove default card shadows beyond
`shadow-1`; Switch = 40×24 brand track; Tabs = underline style (not pill/boxed); Buttons 36px, weight 600; no ring-offset
focus (use the 3px soft ring); Toaster = ink background bottom-end; Table without zebra stripes. Do not use the library's
default gray palette — only tokens.

## Anti-patterns

- Sidebars, mega-menus, or nested navigation more than one level deep in the app.
- Save buttons for single toggles; confirmation dialogs for reversible switches.
- Gradients, glassmorphism, illustrations or emoji in the product UI.
- More than one accent hue; brand-colored body text; colored card backgrounds.
- Icon-only status; hiding the description of a setting in a tooltip.
- Dense 28px rows — this style breathes (64px setting rows).

## Pre-ship checklist

- [ ] Only `--brand` carries color; status colors appear only with labels.
- [ ] Headline has black text with ≤ 2 `.hl` phrases; eyebrow above each section.
- [ ] App uses top bar + tab strip + centered column; no sidebar.
- [ ] Every setting row has title + consequence + switch, and saves with a toast.
- [ ] Identifiers are monospace and LTR-isolated.
- [ ] Works at 360px: menu button, scrollable tab strip, single-column cards, logs collapse to 3 columns.
- [ ] `lang`/`dir` set; Persian uses Vazirmatn, Persian digits, Jalali dates, no letter-spacing.
- [ ] Dark mode checked (`data-theme="dark"`): borders visible, brand still ≥ 3:1.
- [ ] Keyboard: tab order, focus ring, Esc closes menus/dialogs, arrows move between tabs.
