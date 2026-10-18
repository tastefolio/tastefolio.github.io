---
name: passage
description: Tastefolio "Passage" design language — travel documents as an interface, Persian-first, for immigration, visa, residency and study-abroad advisories, travel agencies and relocation services. Warm security paper with guilloche drawn in code, passport navy as the only action colour, rubber-stamp inks only for milestones; boarding-pass program cards with a perforated stub, OCR mono codes and a barcode; bilingual passport labels and a machine-readable line; DM Serif Display + Red Hat Text + Share Tech Mono with Vazirmatn; route finder, destinations by goal, points check with a live gauge, journey, departures board, advisors, booking with a Toman deposit and SMS sign-in; a client portal built as a passport (data page, stamped stages, documents, countdown, tickets, instalments). Use when the user asks for the Passage, immigration, visa, travel-document, boarding-pass or consultancy-portal style — Persian (RTL) and English (LTR).
---

# Passage

**Every step is a document you can hold.** Passage turns the paperwork of moving countries into the thing people
trust most about it: a passport. Warm security paper carries fine guilloche, programs read like boarding passes,
labels are bilingual the way a data page is, and progress is stamped — never animated confetti. One passport navy
does every action; the stamp inks belong to milestones and nothing else. It is calm, official and a little romantic,
because a visa is both a form and a promise.

Covers **advisory sites** (route finder, destinations, programs, points check, journey, intakes board, advisors,
videos, testimonials, booking, SMS sign-in) and **client portals** (case file, stages, documents, appointments,
tickets, payments).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Security-paper palette, passport navy `--brand`, stamp inks `--stamp-red/green/violet/blue`, `--guilloche`, departures `--board*`, DM Serif Display + Red Hat Text + Share Tech Mono + Vazirmatn; dark “night flight” theme; Persian overrides. |
| [assets/kit.css](assets/kit.css) | Header, buttons, fields, `.seg`, chips, badges, `.dual` labels, `.kicker`; `.stamp` (red/green/violet/blue, round, pending, press); `.pass` boarding pass with notched perforation and stub; `.mrz`, `.route`, `.guilloche`; hero + `.planner`, `.dests`, `.passes`, `.calc` + `.gauge` + `.routes`, `.journey`, `.board` with flaps, `.advisors`, `.shorts`, `.postcards`, `.faq`, `.cta-band`, footer; dialogs, steps, `.slots`, `.otp`; portal: `.app` shell, `.datapage`, `.visa-pages`, `.meter`, `.countdown`, `.feed`, `.table`, `.upload`, `.tickets` + `.thread`, `.installments`, `.kpis`. |
| [assets/kit.js](assets/kit.js) | Shared runtime: language swap, theme, tabs, pressed groups, dialogs, steps, validation, filters, sorting, toasts, charts, Persian digits, Jalali dates. |
| [assets/passage.js](assets/passage.js) | Guilloche (`data-guilloche="waves|rosette"`), points check (`data-points`, `data-pts`, `data-need`), OTP boxes (`data-otp`), simulated uploads (`data-upload`), countdown (`data-countdown-in`), board clock (`data-clock`), choice summaries (`data-show`), ticket replies (`form[data-reply]`). |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Advisory site: route-finder hero with two passes and stamps, destinations by goal, program passes, points check, journey, departures board, advisors, short videos, postcards, FAQ, call band, MRZ footer; booking wizard (topic, time, contact, deposit) and SMS sign-in dialogs. |
| [examples/dashboard.html](examples/dashboard.html) | Client portal: data page with MRZ, stamped visa pages, next appointment countdown, document meter, activity; documents checklist with uploads and filters; appointments; tickets with a thread and reply; payments with instalments and a chart. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Red+Hat+Text:wght@400..700&family=Share+Tech+Mono&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300..500,0..1,0&icon_names=…&display=block">
```
**DM Serif Display** for display and headings (the engraved, official voice; italic only for one emphasised phrase),
**Red Hat Text** 400–700 for the interface, **Share Tech Mono** for everything a machine would read: route codes,
program codes, case numbers, stamps, the MRZ, countdowns. **Vazirmatn** for all Persian — display 900, headings
800, stamps 900 — never another Persian face. Icons: **Material Symbols Outlined** (Apache 2.0) as ligatures,
`<span class="ms" aria-hidden="true">flight</span>`; list the `icon_names` you use, sorted alphabetically, to keep
the font small. Icons that point (arrows) take `.flip-rtl`.

## Identity rules (non-negotiable)

1. **Paper, not cards.** The canvas is warm security paper; hero, call band, data page and points check carry guilloche (`data-guilloche`), at most one pattern per view, always faint (`--guilloche` ≈ 16% navy).
2. **Navy acts, stamps record.** `--brand` (passport navy) is every button, link and selected state. Stamp inks mark only finished or confirmed milestones: approved, booked, entry, a stage done. Never use a stamp as a button or decoration without meaning.
3. **Programs are boarding passes.** Route codes (IATA-style) in OCR mono, a dotted line with a plane, three bilingual fields (processing, requirement, success/status), a perforated stub with the program code and barcode.
4. **Bilingual labels.** Field labels on passes, forms and the data page show the page language and the other language beside it (`.dual`), the way a passport does. Body copy stays in one language.
5. **Machines read mono.** Codes, case numbers, times on the board, countdowns and the MRZ are Share Tech Mono and always LTR; everything people read is serif or sans.
6. **Progress is stamped.** The journey has five stops; the portal’s visa pages hold one stamp per finished stage, a dashed outline for the next one. Stamps land with a short press (480ms) and stay still under reduced motion.
7. **Honest numbers.** Points and processing times are guides with a visible note; money is in Toman with Persian digits; nothing promises a visa.
8. **Quiet chrome.** Radius 6–18, hairlines and dashed perforations, shadows only on passes, dialogs and the board.
9. **The portal is the passport.** It opens on the data page (photo initials, case, program, advisor, MRZ) and the stamped stages, then documents, appointments, tickets and payments.
10. **One night band.** The departures board (and footer) use the night `--surface-ink`; its status lights are the only glowing colours on the page.

## Tokens

| Role | Light | Dark (night flight) |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f5f2ea` / `#fffdf8` / `#ede8db` | `#0b1322` / `#111b2e` / `#17243a` |
| `--ink` / `--ink-2` / `--ink-3` | `#14203a` / `#4a5468` / `#646c7d` | `#e9edf5` / `#aab3c5` / `#8790a4` |
| `--brand` (passport navy) | `#1f3c73` | `#93b4ff` |
| stamps red / green / violet / blue | `#b3392d` / `#2a7448` / `#5a4aa8` / `#1f6c8f` | `#f08a7c` / `#7dd3a0` / `#b3a6ff` / `#7cc7e8` |
| board / ink / amber | `#13213b` / `#f4e9c8` / `#f2b33d` | `#070d18` |

Type 12 / 14 / 16 / 18.5 / 23 / 30 / 42, display `clamp(40px, 5.6vw, 76px)` (Persian 34–62, weight 900). Radius
6 / 12 / 18. Controls 46 / 54px. Pass stub 132px (96px on phones), notch 13px.

## Brand adaptation

- `--brand` may be any deep, trustworthy ink with white text ≥ 4.5:1 (oxblood `#7a2f27`, petrol `#1f6c8f`, forest `#2a5d45`, violet `#4b3f8f`); `--brand-soft`/`--brand-strong` and the guilloche follow it.
- Keep the stamp inks distinct from the brand; if the brand is red, use green for “approved” and violet for “entry”.
- The logo mark is a double-ruled circle (a stamp) around one glyph; a real logotype can replace it if it stays one colour.
- Photography is optional; when used, keep it inside a pass or postcard frame, never full-bleed behind text.

## Website patterns

- **Header**: stamp logo · destinations, programs, points check, how it works, advisors, videos, questions · language/theme · *Sign in* (SMS) · *My file* · *Book a consultation* (navy). Menu button below 1100px.
- **Hero** (`data-guilloche="rosette"`): kicker, display title with one italic phrase, lead, a **route finder** (goal, from, language → *Show my routes* filters destinations), trust figures; on the end side two passes, a dotted route arc and two stamps.
- **Destinations**: goal chips (all, work, study, family, invest) filtering cards with a rotated ISO stamp, tags and a typical duration.
- **Programs**: boarding passes with status badges and a *Plan* button in the stub.
- **Points check**: pressed groups with `data-pts` (age, language, education, experience, extras) → gauge, total and the routes it opens (`data-need`), a disclaimer and a call to review with an advisor.
- **Journey**: five numbered stops on a dashed line (vertical on phones).
- **Departures board**: night band, flap codes, program, processing, next intake, glowing status; rows flip in once.
- **Advisors**: initials, licence badge, spoken languages in mono, specialty, next free time, book button.
- **Shorts** (9:16 cards, horizontal scroll), **postcards** (stamp and postmark), **FAQ**, **call band** with guilloche, footer with an MRZ line.
- **Booking**: four steps (topic and advisor → day, time and kind → contact with validation → summary with a Toman deposit) ending in a pressed *Booked* stamp. **SMS sign-in**: phone, then five code boxes (paste fills all).

## Dashboard patterns

- **Shell**: side navigation (overview, documents, appointments, tickets, payments) with counts and a help card; on tablets it becomes a scrolling tab row. Top bar with the case title, language/theme, notifications, avatar.
- **Overview**: data page (photo initials, surname, given names, nationality, case number, program, advisor, opened date, guilloche rosette, MRZ, an *In progress* stamp); visa pages with stamps for done stages and a dashed outline for the current one; next appointment with a live countdown; document meter; recent activity.
- **Documents**: status chips (all, needs action, done), table of documents with translation and certification state, *Upload* buttons with progress that turn the status into *Received*.
- **Appointments**, **tickets** (list as tabs + thread + reply), **payments** (KPIs, instalments with paid stamps, a payment chart, *Pay now*).

## Components

`.site-head`, `.logo` + `.logo-mark`, `.nav`, `.menu-btn`, `.btn` (+ `-outline`, `-ghost`, `-soft`, `-sm`, `-lg`, `-icon`, `-block`), `.link`, `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.seg`, `.chips`, `.badge(.ok|.warn|.bad|.info|.brand|.plain)`, `.avatar(.lg)`, `.kicker`, `.dual`;
`.stamp(.green|.violet|.blue|.round|.pending|.press)`, `.pass` (`.pass-main`, `.pass-head`, `.pass-route` with `.code`/`.city`/`.line`, `.pass-fields`, `.pass-stub`, `.barcode`), `.mrz`, `.route`, `.guilloche`;
`.hero`, `.planner`, `.trust`, `.hero-art`, `.dests`/`.dest` (`.iso`), `.passes`, `.calc` (`.calc-form`, `.calc-q`, `.calc-result`), `.gauge`, `.routes`, `.journey`, `.board` (`.flap`, `.st.open|.soon|.wait`), `.advisors`/`.advisor`, `.langs`, `.shorts`/`.short`, `.postcards`/`.postcard`, `.faq`, `.cta-band`, `.site-foot`, `.foot-grid`;
`dialog.modal` (`.modal-head`, `.modal-body`, `.modal-foot`), `.steps-ind`, `.slots`, `.otp`, `.summary-pass`;
`.app`, `.side`, `.side-nav`, `.side-card`, `.topbar`, `.page`, `.panel`, `.grid-2`, `.grid-3`, `.datapage`, `.visa-pages`, `.meter`, `.countdown`, `.feed`, `.table-wrap`, `.table`, `.doc-name`, `.upload`, `.tickets`, `.ticket-list`, `.thread`, `.msg(.me|.them)`, `.composer`, `.installments`, `.kpis`/`.kpi`.

## Interaction & motion

Measured and physical (140–520ms). Stamps press in once; board rows flip down once when the board appears; the
gauge sweeps to the new total; uploads fill a thin green line and then stamp the row *Received*; the countdown ticks
every second. Under reduced motion (and in screenshots) everything lands in its final state. No parallax, no
looping animation.

## Persian & RTL

- Persian is the default; English via `data-alt`. Passes keep their route LTR (origin → destination) in both languages; the stub sits on the end side.
- Vazirmatn only; stamps in Vazirmatn 900 in Persian, Share Tech Mono in English. Persian digits everywhere people read, Latin digits in codes and the MRZ.
- `.dual` labels show both languages; dates via `data-date` (Jalali in Persian), money with `data-fmt="toman"`, phone numbers and emails `dir="ltr"`.

## Accessibility

Ink on paper ≈ 15:1, navy on paper ≈ 10:1, white on navy ≈ 11:1, `--ink-3` ≥ 4.5:1. Stamps are text, not images,
and never the only signal (the stage label and a badge say it too). Pressed groups, tabs, steps and dialogs come
from the kit with keyboard support; OTP boxes have labels and accept paste; the countdown is not live-announced; the
points result is a polite live region; the board is a real table that scrolls sideways on phones.

## Component library overrides (shadcn/ui etc.)

`--radius: 6px` controls, 12–18px cards and dialogs; Button primary → navy; Badge → `.badge` dot style; Card → a
`.pass` for programs and a `.panel` elsewhere; Tabs → side navigation in the portal; Progress → `.meter`; Toast →
night chip with a check; add a `Stamp` component instead of success illustrations.

## Anti-patterns

- Flags, airplanes or globes as decoration everywhere; stock photos of passports or smiling families at airports.
- Stamps on buttons, confetti, or stamp colours used as brand accents.
- Promising outcomes (“guaranteed visa”) or hiding fees; prices without Toman and Persian digits.
- Heavy guilloche behind text, or more than one pattern on screen.
- Persian set in anything but Vazirmatn; codes in proportional type; MRZ that wraps.

## Pre-ship checklist

- [ ] Navy for every action, stamps only for milestones, one guilloche per view.
- [ ] Programs as passes: codes in mono, three bilingual fields, stub with code and barcode.
- [ ] Points check with live gauge, routes and a disclaimer; booking with deposit and SMS sign-in.
- [ ] Portal: data page with MRZ, stamped stages, documents with uploads, countdown, tickets, instalments.
- [ ] Persian: Vazirmatn only, Persian digits, Jalali dates, LTR codes; dark theme checked.
