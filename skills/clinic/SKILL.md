---
name: clinic
description: Tastefolio "Clinic" design language — calm, trustworthy, Persian-first healthcare booking and patient portals. Cool clean white, deep blue-ink text, a cerulean brand for booking and navigation and a mint that only means “available”, set in Atkinson Hyperlegible Next (built for low-vision readers) + Vazirmatn. A search-first hero with an ECG line and a live booking preview, specialty tiles, doctor cards with council number, insurers, rating, fee and next free slot, a date strip and time-slot picker inside a three-step booking dialog, an online-visit band, and a patient panel (next appointment with countdown, medicine checklist, home blood-pressure and vitals charts, lab results with normal-range bars, prescriptions with refills, appointments, messages, family members); Font Awesome Free icons. Use when the user asks for the Clinic, medical, healthcare, doctor booking, telehealth, dental, lab, pharmacy or patient-portal style — Persian (RTL) and English (LTR).
---

# Clinic

**Care, scheduled — and impossible to misread.** Healthcare interfaces are read by tired, worried and older people, on
small phones, in waiting rooms. Clinic is calm white with deep blue-ink text, one cerulean for everything you can
book or tap, and a mint green that appears only where something is *available*. Every time, dose and lab value is set
in Atkinson Hyperlegible Next, whose distinct letterforms (slashed zero, open shapes) were designed for low vision.

Covers **booking sites** (search, specialties, doctors, booking dialog, online visits, magazine, FAQ) and **patient
panels** (overview, appointments, results, medicines, messages, family).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Clean white/blue-ink palette, cerulean `--brand`, `--mint` availability, Atkinson Hyperlegible Next / Vazirmatn at 16px body, radii 10/16/22; dark theme + Persian. |
| [assets/kit.css](assets/kit.css) | Header with emergency chip, buttons (brand, soft, mint, outline, danger), tabs, seg, chips, fields with icon errors, switch, badges, council-number chip, stars, avatars with verified tick; hero + ECG line + search panel + trust row + booking preview; specialty tiles; filters; doctor cards; date strip, time slots, legend, booking summary, stepper; online-visit band; how-it-works; magazine; reviews; FAQ; footer with seals; patient panel (profile, vertical nav, next appointment, countdown, medicine checklist, vitals, lab table with range bars, prescriptions, appointments, messages, family); modal, toast, charts. |
| [assets/kit.js](assets/kit.js) | Tabs (vertical too), pressed groups, filters (chips, select, checkbox) + search, steps, dialogs, validation with pattern messages, charts, Jalali dates, Toman, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Booking site: header, search-first hero with ECG line, trust row and a live booking preview, specialty tiles, doctor list with filters (specialty, insurer, free today, search), three-step booking dialog (day + time → patient details → confirm, tracking code), online-visit band, how it works, magazine, reviews, FAQ, footer. |
| [examples/dashboard.html](examples/dashboard.html) | Patient panel: profile with insurance, blood type and allergy; overview (next appointment, what to bring, today’s medicines, blood-pressure chart, vitals, latest results); appointments (upcoming/past/cancelled, reschedule and cancel dialogs); results with range bars and reports; prescriptions with refills and adherence chart; messages; family members. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400..800&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
```
**Atkinson Hyperlegible Next** 400–800 for all Latin text (body 16px, never below 12.5px); **Vazirmatn** for Persian
(headings 800, body 400–500, line-height 1.95). Icons: **Font Awesome Free 6** — `fa-solid` for medical glyphs
(stethoscope, tooth, heart-pulse, pills, file-medical, house-medical…), `fa-regular` for calendar, clock, bell, star.
Never rely on icon colour alone for meaning.

## Identity rules (non-negotiable)

1. **Legibility first.** Body text 16px, line-height ≥ 1.6 (1.95 in Persian); numbers that matter (times, doses, results, fees) are bold; no light weights, no text on photos.
2. **Cerulean books, mint is available.** `--brand` for search, booking, navigation and selection; `--mint` only for open slots, “free today”, “online now” and taken doses. Red only for allergies, high results, cancellation and emergency.
3. **Show the next free time.** Every doctor card ends with the next available slot (mint = today, amber = later), the fee and one primary action.
4. **Credentials are visible.** Council/licence number chip, verified tick on the avatar, insurers as badges, rating with review count.
5. **Time is picked, not typed.** A date strip (weekday, date, free-slot count) above a grid of slot chips; booked slots stay visible but struck through; a legend explains the three states.
6. **Booking in three short steps** with a progress bar: time → patient (national ID and mobile with pattern messages) → confirm (summary, cancellation policy), ending in a tracking code.
7. **Results are explained, not just listed.** Each value has its unit, its normal range and a range bar (mint zone, coloured marker) plus a worded status; add “your doctor interprets results”.
8. **Calm geometry**: radius 10 (controls) / 16 (cards) / 22 (panels), 1px `--line` borders, soft shadows only on raised booking surfaces.
9. **Emergency is never hidden**: an emergency chip in the header and a reminder near messages that they are not monitored 24/7.
10. **Dark mode keeps contrast**: cerulean lightens, mint brightens, and white surfaces become deep blue-grey — never pure black.

## Tokens

| Role | Light | Dark |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f4f7f9` / `#ffffff` / `#edf2f6` | `#0a1622` / `#10202f` / `#162a3c` |
| `--ink` / `--ink-2` / `--ink-3` | `#102a43` / `#486581` / `#7b93ab` | `#e8f0f7` / `#a3b8cc` / `#6f879e` |
| `--brand` (cerulean) / `--brand-soft` | `#0a7ea4` / brand 12% on white | `#3fb6dc` / brand 14% |
| `--mint` (available) | `#13a36e` | `#3ed49a` |
| warning / danger / info | `#a8650a` / `#d13f3f` / `#3466d1` | lighter equivalents |

Type 12.5 / 14 / **16** / 19 / 23 / 30 / 42, display `clamp(36px, 5vw, 64px)` 800. Radius 10 / 16 / 22. Controls 48 / 56px
(touch targets ≥ 44px everywhere).

## Brand adaptation

- `--brand` should be a calm, saturated mid-tone with white text ≥ 4.5:1 (blue `#2563eb`, teal `#0f766e`, violet `#7c3aed`, berry `#be185d`); `--brand-soft` and `--brand-strong` are derived.
- Keep `--mint` for availability even if the brand is green — if they clash, move mint to teal `#0d9488` and keep it exclusive.
- The logo mark is a rounded square with a white cross; replace it with the clinic’s mark but keep the square and the white symbol.

## Website patterns

- **Header**: logo · specialties, doctors, online visit, magazine, help · emergency chip · language/theme · *Patient panel* (soft).
- **Hero**: verified-doctors eyebrow, plain promise headline, lead, **search panel** (condition/doctor + city + *Find a doctor*), popular chips, trust row (doctors, rating, insurers), and a **booking preview** card (doctor, three days, six slots, *Book this time*); an ECG line traces once along the bottom.
- **Specialties**: tiles with a tinted icon square, name and doctor count.
- **Doctors**: filter bar (specialty chips, insurer select, “free today” checkbox, search) over doctor cards; empty state when nothing matches.
- **Booking dialog**: avatar + name, stepper, day strip + slot grid + legend → patient form → summary + policy checkbox → success with tracking code and calendar/panel actions.
- **Online visit band** (brand gradient, video-call mock), **how it works** (3 numbered cards), **magazine**, **reviews**, **FAQ**, deep footer with seals.

## Dashboard patterns

- **Shell**: header (logo, *New appointment*, reminders) + sidebar with the **profile** (insurance, blood type, age, allergy in red) and a vertical tab list with counts → horizontal scroller on phones.
- **Overview**: greeting with a one-line status; **next appointment** (date tile, countdown, doctor, address, directions / reschedule / cancel, what to bring); **today’s medicines** grouped by time of day with checkboxes and a running count; **blood-pressure** line chart (two series) with a worded status; vitals with sparklines; latest results.
- **Appointments**: upcoming / past / cancelled tabs; rows with a mini date, doctor, mode (in person/online), status, actions; reschedule (day strip + slots) and cancel (reason) dialogs.
- **Results**: lab table (test, abbreviation, value + unit, normal range, range bar, status), reports to download, interpretation disclaimer.
- **Medicines**: prescriptions with dose, schedule, prescriber and refills; adherence bars; SMS reminder switch.
- **Messages** with the doctor’s office (emergency reminder) and **Family** members with *Book for…* and an add-member dialog.

## Components

`.site-head`, `.logo`/`.logo-mark`, `.nav`, `.emergency`, `.btn` (+ `-soft`, `-mint`, `-outline`, `-ghost`, `-danger`, `-lg`, `-sm`, `-icon`, `-block`), `.tabs`, `.seg`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.field-error`, `.check`, `.switch`, `.badge(.ok|.warn|.bad|.info|.brand|.mint|.live)`, `.mc`, `.stars`, `.avatar(.lg)` + `.verified`, `.progress(.mint)`;
`.hero`, `.pulse-line`, `.search-panel`, `.quick`, `.trust`, `.preview`, `.specs`/`.spec`, `.filters`, `.docs`/`.doc` (+ `.info`, `.name`, `.meta`, `.book`), `.next-slot(.later)`, `.fee`, `.days`/`.day(.full)`, `.slots`/`.slot`, `.slot-legend`, `.summary`, `.stepper`, `.band` (+ `.call`), `.how`, `.posts`/`.post`, `.review`, `details.faq`, `.site-foot`, `.seals`/`.seal`;
`.p-layout`, `.p-side`, `.profile`, `.p-nav`, `.grid12` (`.c4`–`.c12`), `.card`, `.card-head`, `.next-appt`, `.date-tile`, `.countdown`, `.meds`/`.med`, `.pill-ic`, `.vital`, `.lab-wrap`/`.lab`, `.range(.high|.low)`, `.rx`, `.list-appt`/`.appt`/`.mini-date`, `.thread`/`.msg(.me)`, `.composer`, `.member`, `dialog.modal`, `.toast`.

## Interaction & motion

Quiet and fast (140–420ms): cards lift slightly on hover, the ECG line draws once, pressed days and slots fill with the
brand, checking a medicine strikes it through and tints it mint, finishing all doses confirms with a toast. Choosing a
day re-computes its free slots; the booking summary reflects the chosen day and time. No looping animation.

## Persian & RTL

- Persian is the default; English via `data-alt`. Fees `data-fmt="toman"`, dates `data-date` (Jalali), counts `data-num`, council numbers `data-fmt="plain"`.
- National IDs, mobiles, lab values, units and normal ranges are LTR (`dir="ltr"` / `.ltr`); lab range bars run low→high left to right in both languages.
- Weekday names come from `data-date data-fmt="day"`; day numbers carry both calendars via `data-alt`.

## Accessibility

Ink on white ≈ 14:1; white on cerulean ≈ 4.6:1 (bold 14px+); every status has a word as well as a colour; form errors
carry an icon and text and link via `aria-describedby`; slots and days are buttons with `aria-pressed` (booked ones
`disabled`); tabs use arrow keys; touch targets ≥ 44px; the emergency number is always visible; respects reduced motion.

## Component library overrides (shadcn/ui etc.)

`--radius: 16px` cards, 10px controls; Button default → cerulean, `secondary` → soft, `success` → mint (online);
Calendar → `.days` strip + `.slots` grid; Tabs → underline cerulean; Badge → semantic with words; Table → `.lab`
with range bars; Dialog → stepper booking; Toast → icon + text.

## Anti-patterns

- Mint or green used for decoration (it must keep meaning “available”), red for brand.
- Thin or light type, small grey text for doses or times, text over medical photos.
- Free-text time entry; hiding booked slots so the schedule looks emptier than it is.
- Raw lab numbers without units, ranges or words; diagnostic claims in the UI.
- Burying the emergency number or implying messages are monitored 24/7.

## Pre-ship checklist

- [ ] Atkinson Hyperlegible Next / Vazirmatn at 16px body; bold key numbers.
- [ ] Cerulean for booking only; mint only for availability; red only for danger.
- [ ] Doctor cards show credentials, insurers, rating, fee and next free slot.
- [ ] Booking: day strip + slots + legend → patient form with pattern messages → summary → tracking code.
- [ ] Panel: next appointment, medicine checklist, vitals chart, lab range bars, prescriptions, messages, family.
- [ ] Persian: Jalali dates, Toman, LTR IDs/values, emergency chip visible.
