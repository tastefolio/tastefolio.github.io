---
name: sprocket
description: Tastefolio "Sprocket" design language — a social photo and short-video network made of analog film, Persian-first. Posts as photo prints with a thick white caption edge and an orange date imprint; story avatars with an exposure ring (one dash per unseen story); reels on a sprocket film strip with edge numbers; profiles, explore and top posts as contact sheets with grease-pencil circles and crosses; highlights as film canisters; one safelight red for love and the action and a darkroom dark theme; Unbounded + Urbanist + Overpass Mono with Vazirmatn; rail app shell with a phone tab bar, timed story viewer, double-tap likes, comments, post viewer with exposure data, create dialog with film-stock filters; creator studio with KPIs, followers chart, top-post contact sheet, best-time heatmap, audience, messages and a weekly schedule. Phosphor icons. Use when the user asks for the Sprocket, social feed, photo sharing, stories/reels, creator studio or film-photo style — Persian (RTL) and English (LTR).
---

# Sprocket

**Every photo deserves to be held.** Sprocket builds a social photo app out of the objects photography was made of:
a photo print you pass around, a strip of film you hold up to the light, a contact sheet marked up with a grease
pencil, a canister in your pocket. The feed feels tactile and warm instead of glossy; the creator tools feel like a
photographer's desk. One safelight red carries love (likes, unseen stories) and the single action; the dark theme is
the darkroom where that light comes from.

Covers **the app** (feed, stories, reels, explore, profile, viewer, create) and **the creator studio** (insights,
content, audience, messages, schedule).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Photo-paper palette, safelight `--brand`, `--grease`, `--edge` (film-edge amber), `--frame-shadow`, Unbounded + Urbanist + Overpass Mono + Vazirmatn; the darkroom dark theme; Persian overrides. |
| [assets/kit.css](assets/kit.css) | Buttons, fields, chips, badges, `.edge` labels; `.avatar` + `.ring` (exposure ring, `.seen`, `.live`); `.scene` + `.datestamp`; `.post`, `.print` (tilt, caption edge), `.heart-pop`, `.actions`/`.act`, `.post-meta`, `.add-comment`; `.strip` + `.frame`; `.contact` + `.cell` (`.no`, `.stat`, `.kind`, `.mark`); app shell (`.app`, `.rail`, `.nav-item`, `.main`, `.feed`, `.side`, `.stories`, `.suggest`, `.topbar-m`, `.tabbar`); profile (`.profile-head`, `.highlights`, `.canister`, `.grid-tabs`); dialogs (`.viewer`, `.exif`, `.story-dlg`, `.filters`); studio (`.studio`, `.kpis`, `.heat`, `.inbox`, `.bubble`, `.week`, `.table`). |
| [assets/kit.js](assets/kit.js) | Shared runtime: language swap, theme, tabs, pressed groups, dialogs, validation, toasts, sorting, charts, Persian digits, Jalali dates. |
| [assets/sprocket.js](assets/sprocket.js) | Photo scenes drawn as SVG (`data-scene`, `data-tone`), likes and double-tap hearts, saves and follows, comments, the timed story viewer, grease-pencil marks (`data-pick`), film filters (`data-filters`), the post viewer (`.cell[data-view]`). |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | The app: rail, stories, three photo-print posts (one sponsored), a reels film strip, explore contact sheet, profile with canisters and tabs, suggestions; story, viewer and create dialogs; phone top bar and tab bar. |
| [examples/dashboard.html](examples/dashboard.html) | Creator studio: KPIs with sparklines, followers area chart, top posts contact sheet, best-time heatmap, reach by format; content table; audience age and cities; messages with photo bubbles and quick replies; weekly schedule; plan-a-post dialog. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300..800&family=Urbanist:wght@400..800&family=Overpass+Mono:wght@400..600&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css">
```
**Unbounded** for the wordmark, headings and big numbers (round, wide, friendly); **Urbanist** for the interface;
**Overpass Mono** for what the camera and the film print: date imprints, frame numbers, edge codes, exposure data.
**Vazirmatn** for all Persian, headings 900 — never another Persian face. Handles stay Latin. Icons: **Phosphor**
(MIT), outline by default and the filled glyph for an active state (liked heart, saved bookmark, current tab).

## Identity rules (non-negotiable)

1. **A post is a print.** Photo inside a white frame with a thick bottom edge for the caption and exposure line; a tiny tilt (−0.6° to 0.6°); the orange date imprint sits on the photo's end corner.
2. **Safelight red means love.** `--brand` is likes, unseen story rings, notification dots, counts and the one primary action. Never decoration, never for errors.
3. **Stories count exposures.** The ring has one dash per unseen story; seen rings go grey; live gets a small LIVE tag.
4. **Motion lives on a film strip.** Reels sit on black film base with sprocket holes above and below and amber edge numbers (`12`, `12A`).
5. **Grids are contact sheets.** Profile, explore and top posts are frames on film base with frame numbers; the best are circled in grease pencil, rejects crossed — only when it means something (picks, top performers).
6. **Film vocabulary, not app chrome.** Highlights are canisters with an ISO, filters are named like film stocks (Warm 400, Mono 3200), exposure data appears in the viewer.
7. **Warm paper, real shadows.** Canvas is photo paper; prints carry a soft frame shadow; no glass, no gradients on UI.
8. **The darkroom.** Dark mode is near-black with a red cast and keeps prints paper-white.
9. **Phone first.** Below 900px the rail becomes a top bar and a five-icon tab bar; feed media go edge to edge.
10. **Honest numbers.** Likes and views in compact form with Persian digits; sponsored posts are labelled.

## Tokens

| Role | Light (photo paper) | Dark (darkroom) |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#f4f2ed` / `#ffffff` / `#ebe8e1` | `#120c0b` / `#1c1412` / `#261b18` |
| `--ink` / `--ink-2` / `--ink-3` | `#1b1a17` / `#57534b` / `#6f6a61` | `#f4e8e3` / `#c2aca4` / `#9d867d` |
| `--brand` (safelight) | `#e2402f` | `#ff6a55` |
| `--grease` / `--edge` / film base | `#f0561d` / `#f2b13d` / `#171513` | `#ff8a4c` / same / `#070504` |

Type 12 / 14 / 15.5 / 18 / 22 / 28 / 38, display `clamp(34px, 4.6vw, 64px)`. Radius 8 / 14 / 22; prints 4.
Controls 44 / 52px. Feed column 560px, side 300px, rail 244px.

## Brand adaptation

- `--brand` can be any warm or saturated signal (cobalt `#2f6fb3`, green `#2f8a57`, violet `#8a3ffc`, amber `#f2b13d`) with white text ≥ 4.5:1; keep the grease pencil orange-red and the film edge amber.
- The wordmark is a dark tile with a red frame inside (a print); replace with a logotype set in Unbounded or Vazirmatn 900.
- With real photos, keep the print frame, the date imprint and the contact-sheet frame numbers — they are the identity, not the placeholders.

## Website patterns (the app)

- **Rail**: wordmark · home, explore, reels, messages (count), notifications (dot), create, profile · creator studio · language/theme. Phones: top bar (wordmark, language, theme, messages) and a tab bar (home, explore, create, reels, profile).
- **Stories**: a scrolling row of rings; tapping opens a full-height viewer with timed bars (4.5s each), tap zones for previous/next, and a reply pill.
- **Post**: head (ring avatar, handle, place · time, follow or sponsored), print with date imprint, caption and exposure line, actions (like, comment, send, save), likes, comments, add-comment. Double-tap the photo to like with a heart burst.
- **Reels strip**, **explore** (topic chips + contact sheet with stats, kinds and picks), **profile** (ring avatar, stats, bio, canisters, posts/reels/tagged tabs as contact sheets), **side** (me card, suggestions with follow buttons, fine print).
- **Viewer**: photo + comments + exposure data + likes. **Create**: preview with date imprint, film-stock filters, caption, share.

## Dashboard patterns (creator studio)

- **Shell**: rail tabs (overview, content, audience, messages, schedule); phones get a chip row; top bar with period chips (7/28/90 days).
- **Overview**: four KPIs (reach, profile visits, new followers, engagement) with deltas and sparklines; followers area chart; top posts contact sheet with grease circles; best-time heatmap (days × hours, red intensity); reach by format donut.
- **Content** table with thumbnails and sortable reach, likes, saves; **audience** age bars and cities donut; **messages** inbox with photo bubbles, quick replies and composer; **schedule** week with print slots and *Plan a post*.

## Components

`.btn(-ink|-soft|-ghost|-line|-sm|-icon|-block)`, `.link`, `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.chips`, `.badge(.brand|.ok|.warn|.info)`, `.edge`, `.avatar`, `.ring(.seen|.live)`;
`.scene`, `.datestamp`, `.post`, `.post-head`, `.print`, `.print-foot`, `.heart-pop`, `.actions`, `.act(.like)`, `.post-meta`, `.add-comment`, `.strip`, `.strip-head`, `.frame`, `.contact`, `.cell` (`.no`, `.stat`, `.kind`, `.mark`);
`.app`, `.rail`, `.wordmark`, `.mark-logo`, `.nav-item` (`.dot`, `.count`), `.main`, `.feed`, `.side`, `.stories`, `.story`, `.me-card`, `.suggest`, `.follow`, `.fine`, `.topbar-m`, `.tabbar`, `.profile-head`, `.highlights`, `.canister`, `.grid-tabs`;
`dialog.modal(.wide)`, `.viewer`, `.viewer-side`, `.exif`, `.story-dlg`, `.story-stage`, `.story-bars`, `.story-tap`, `.filters`, `.tf-toast`;
`.studio`, `.studio-top`, `.page`, `.panel`, `.grid-2`, `.kpis`/`.kpi`, `.heat`, `.inbox`, `.convos`, `.chat`, `.bubble(.me|.photo)`, `.quick`, `.composer`, `.week`, `.day(.today)`, `.slot`, `.table`.

## Interaction & motion

Springy and short (140–460ms): a like bumps the heart; double-tap bursts a white heart over the photo; grease marks
draw themselves once; story bars fill over 4.5s; filters swap at once on the preview. Reduced motion (and
screenshots) keep marks drawn, bars static and hearts still.

## Persian & RTL

- Persian is the default; English via `data-alt`. Handles, date imprints, frame numbers and exposure data stay LTR.
- Vazirmatn only, headings 900. Story bars always run left to right like a timeline of film; arrows and send icons flip.
- Counts with `data-num` (compact, Persian digits), dates with `data-date` (Jalali).

## Accessibility

Ink on paper ≈ 16:1, red on white ≈ 4.6:1 (used large or with icons), white on red ≈ 4.6:1. Like and save are toggle
buttons with `aria-pressed`; double-tap is a shortcut, never the only way. Story taps are labelled buttons; the story
dialog closes with Escape. Every photo in a contact sheet has a text name; grease marks are decoration paired with
stats. Charts carry text labels; the heatmap is one labelled image.

## Component library overrides (shadcn/ui etc.)

`--radius: 8px` controls, 14–22px dialogs, 4px prints; Card → `.print` for media, `.panel` elsewhere; Avatar →
`.avatar` inside `.ring`; Toggle → `.act`; Carousel → `.strip`; Tabs → `.grid-tabs` underline; Toast → ink pill.

## Anti-patterns

- Gradient logos, rainbow rings or glassy chrome; copying any existing network's marks, colours or layout.
- Square photos with no frame, stats without context, or grease marks on everything.
- Red used for errors or decoration; filters named after real film brands.
- Persian set in anything but Vazirmatn; handles or numbers that flip in RTL.

## Pre-ship checklist

- [ ] Prints with caption edge and date imprint; actions with toggles; double-tap like.
- [ ] Story rings with dashes and a timed viewer; reels strip with sprocket holes; contact sheets with frame numbers.
- [ ] Profile with canisters and tabs; viewer with exposure data; create with film filters.
- [ ] Studio: KPIs, followers, top posts, heatmap, audience, messages, schedule.
- [ ] Phone tab bar; darkroom theme; Persian with Vazirmatn and Persian digits.
