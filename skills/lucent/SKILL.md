---
name: lucent
description: Tastefolio "Lucent" design language — liquid glass, Persian-first. Translucent cards and floating capsules with a refracting rim, a top sheen and a readability tint, over an "aurora" of four colours that changes with the current track (registered custom properties morph smoothly); concentric corners, light large numbers in Outfit, generative album art, synced lyrics that brighten line by line, an equaliser that moves only while playing, a floating capsule nav, player bar and mobile tab bar, plus a web player (listen now, library with filters and sort, listening stats with charts, account settings, devices, now-playing panel with lyrics and queue). Dark-first with a frosted light theme and a solid fallback for reduced transparency; Outfit + Vazirmatn, Ionicons as an inline sprite. Use when the user asks for the Lucent, liquid glass, glassmorphism, music player, streaming, media or premium consumer-app style — Persian (RTL) and English (LTR).
---

# Lucent

**Glass that takes its colour from the music.** Every surface is a pane of liquid glass — blurred, saturated, lit
from the top-left with a bright rim — floating over an aurora of four colours. When the song changes, the aurora
morphs to the new artwork's palette and the whole interface follows. Controls are capsules and circles, numbers are
large and light, and nothing moves unless the music does.

Covers **product sites** (hero with a live now-playing card, mixes, features bento, charts, plans, download, FAQ) and
**app panels** (web player: listen now, library, stats, account, now playing, player bar).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Dark canvas, glass recipe (`--glass`, `--rim`, `--sheen`, `--edge`, `--tint`, `--blur`, `--sat`), aurora `--a1…--a4`, brand pink, Outfit / Vazirmatn, radii 14/24/34; frosted light theme + Persian. |
| [assets/kit.css](assets/kit.css) | `@property` aurora colours, `.aurora`, `.glass` (+ `.strong`, `.pill`), capsule nav, buttons (glass, primary white, brand, round, play), icon buttons, seg, tabs, chips, fields, iOS-style switch, range sliders, badges (live, Lossless), generative `.art` (sun, rings, wave, grid, moon, dunes), now-playing card, synced lyrics, equaliser, rails/tiles, bento, track list, plans, FAQ, phone, footer; web player shell (`.app`, side nav, main, now-playing panel, floating `.player`, `.mtabs`), stats, devices; modal, toast, charts. |
| [assets/kit.js](assets/kit.js) | Tabs (vertical too), pressed groups, toggles, filters + search, dialogs, validation, charts, `clock` times, Jalali dates, Toman, fa/en. |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Streaming service: floating capsule nav, aurora hero with a working now-playing card and floating lyrics, mixes rail, features bento, top charts (tapping a song re-colours the page), plans with a monthly/yearly switch, devices, FAQ, footer. |
| [examples/dashboard.html](examples/dashboard.html) | Web player: glass sidebar (sections, playlists, downloads), listen now (rails, top songs), library (kind chips, search, A–Z sort), stats (minutes area chart, genres donut, top artists, streak), account (plan, audio quality, switches, crossfade, devices, profile form, cancel dialog), now-playing panel (lyrics, up next), floating player bar, mobile tab bar. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Vazirmatn:wght@100..900&display=swap">
```
**Outfit** — 600 for headings (tracking −0.04em), 200–300 for big numbers, 400–500 for text; **Vazirmatn** for Persian
(headings 700–800, numbers 300). Icons: **Ionicons** (MIT) as an inline `<symbol>` sprite — filled glyphs for
transport controls and hearts, outline glyphs elsewhere; `<svg class="ic"><use href="#i-play"/></svg>`.

## Identity rules (non-negotiable)

1. **Everything is glass, nothing is opaque.** Panels, toolbars and controls use `.glass`: blurred + saturated backdrop, the `--glass` gradient over a `--tint`, a refracting `--rim`, a top-left `--sheen` and an inner `--edge` highlight. Opaque fills only for the primary white button, the play button and text inputs’ focus.
2. **Colour comes from the content.** The canvas is near-black; colour lives in the aurora (`--a1…--a4`), which is set from the current artwork. Change the track → the aurora morphs over ~1.2s. `--a1` defaults to `--brand`.
3. **Float, don’t dock.** Navigation, the player bar and the mobile tab bar are floating capsules with a gap to every edge.
4. **Concentric, soft geometry.** Radii 14 / 24 / 34 / pill; an inner element’s radius = outer radius − padding. Circles for play and avatars.
5. **Light numbers, firm words.** Big figures are Outfit 200–300 with tight tracking; headings 600; never bold numbers.
6. **One accent for love and live.** `--brand` (pink) marks likes, the live badge, the playing equaliser and the current track — not buttons.
7. **Media stays LTR.** Scrubbers, time codes, transport controls and volume are LTR in both directions; lists, labels and lyrics follow the page.
8. **Motion follows the music.** Equalisers, auto-advancing progress and lyric highlighting run only while playing; the aurora drifts slowly; all of it stops under reduced motion and in screenshots.
9. **Readable glass.** Keep body text ≥ 4.5:1 against the darkest likely aurora point; the `--tint` layer exists for that — don’t remove it to “see more colour”.
10. **Respect reduced transparency**: `.glass` falls back to `--solid` with no blur.

## Tokens

| Role | Dark (default) | Light |
|---|---|---|
| `--canvas` | `#07070c` | `#eef0f6` |
| glass surface / tint | `rgba(255,255,255,.08–.18)` / `rgba(8,8,16,.34)` | `rgba(255,255,255,.52–.8)` / `rgba(255,255,255,.25)` |
| `--ink` / `--ink-2` / `--ink-3` | `#f5f5f8` / 74% / 52% | `#10101a` / 72% / 52% |
| `--brand` (likes, live) | `#ff4d8d` | `#e8336f` |
| aurora `--a1…--a4` | brand / `#7b5cff` / `#ff9f43` / `#22c3ff` | same, softer opacity |
| `--blur` / `--sat` | `26px` / `180%` | same |

Type 12 / 13.5 / **15.5** / 18 / 22 / 30 / 44, display `clamp(46px, 7vw, 104px)` 600 (Persian 800, line-height 1.3).
Radius 14 / 24 / 34 / pill. Controls 46 / 56px; play 64px (46px in the player bar). Easing `cubic-bezier(.32,.72,0,1)`.

## Brand adaptation

- `--brand` can be any vivid colour (sky `#2ec5ff`, amber `#ffb547`, mint `#3ddc97`, lavender `#b388ff`); it seeds `--a1`, so the default aurora follows the brand until a track sets its own colours.
- Album art can be real images inside `.art` (keep the inset rim); the generative shapes are placeholders for artwork you don’t have.
- The logo mark is a small conic “disc” of the aurora colours; replace with the brand mark but keep it round.

## Website patterns

- **Capsule nav** (sticky, 14px from the top): logo · links · language/theme · *Open player* (glass) · *Try free* (white).
- **Hero**: aurora behind; eyebrow with a *Lossless* badge; display headline with one gradient word; lead; white + glass CTAs; a working **now-playing card** (art, title, like, scrubber, transport) with floating glass lyrics and a “listening together” chip.
- **Mixes** rail of tiles (art lifts and glows in its own colour on hover).
- **Features bento** (glass tiles: lossless with live bars, synced lyrics, offline count, listen together, Persian archive).
- **Charts**: glass track list; tapping a row loads it into the hero card and re-colours the page.
- **Plans** (monthly/yearly seg; featured plan with an aurora-coloured ring), **devices** with a glass phone, **FAQ** in glass, quiet footer.

## Dashboard patterns

- **Shell**: `.app` grid (sidebar 250px · main · now-playing 330px) at full viewport height with internal scrolling; the floating **player bar** sits over the bottom; under 1180px the now-playing panel becomes a sheet opened from the player; under 820px a floating **tab bar** replaces the sidebar.
- **Listen now**: greeting, kind chips, recently played rail, top songs list (current row shows a live equaliser).
- **Library**: kind chips (playlists, albums, artists, downloaded), search, A–Z / recent sort, tile grid (artists round).
- **Stats**: minutes listened (huge light number + area chart), genres donut, top artists with gradient meters, listening streak.
- **Account**: plan card tinted by the aurora, audio quality seg with data-use hints, switches, crossfade slider, devices with sign-out, profile form, cancel dialog.
- **Now playing**: large art, title, like, tabs for synced lyrics (tap a line to seek) and up next.

## Components

`.aurora(.fixed)`, `.glass(.strong|.pill)`, `.capsule-nav`, `.logo`/`.logo-mark`, `.nav`, `.btn` (+ `-primary`, `-brand`, `-ghost`, `-lg`, `-sm`, `-round`, `-play`, `-block`), `.icon-btn`, `.like`, `.seg`, `.tabs`, `.chips`, `.field`, `.label`, `.input`, `.select`, `.textarea`, `.check`, `.switch`, `.range`, `.badge(.brand|.live|.ok|.warn|.hq)`, `.avatar`/`.avatars`, `.progress(.brand)`;
`.art` (`data-shape="sun|rings|wave|grid|moon|dunes"`, `--c1…--c4`, `.label`), `.hero`, `.np-card`, `.np-meta`, `.scrub`, `.controls`, `.float-stack`/`.float`, `.lyrics`/`.line(.now|.past)`, `.eq`, `.rail`, `.tile`, `.bento` (`.w2–.w4`, `.h2r`, `.big`), `.bars`, `.tracks`/`.track(.on)`, `.plans`/`.plan(.featured)`, `details.faq`, `.phone`, `.site-foot`;
`.app`, `.app-side`, `.side-nav`, `.side-label`, `.pl-list`, `.app-main`, `.app-np`, `.player` (`.now`, `.mid`, `.seek`, `.end`), `.mtabs`, `.stat-big`, `.rank`, `.device`, `dialog.modal`, `.toast`.

## Interaction & motion

Springy and soft (180–700ms, `cubic-bezier(.32,.72,0,1)`): buttons press to 96%, tiles lift with a coloured glow, the
seg pill slides, lyric lines scale up as they become current. The aurora drifts over 26–38s and morphs colours when a
track loads. Equalisers bounce only while playing. Under reduced motion or `?shot=1`, everything holds still.

## Persian & RTL

- Persian is the default; English via `data-alt`. Durations `data-fmt="clock"` (۳:۴۲), counts `compact`, prices `toman`, dates `data-date`.
- The scrubber, times and transport row stay LTR (`direction: ltr`); lyric lines scale from the inline-start edge; chevrons use `.flip-rtl`.
- Fictional Persian artists and lyrics are written in Persian first; English lines are translations, not transliterations.

## Accessibility

White text on the tinted glass ≥ 7:1 on the default aurora; primary buttons are white on black (≥ 15:1). Every
control has a label; play/like/shuffle/repeat are `aria-pressed` toggles; ranges are labelled; track rows are
keyboard-activatable (Enter/Space); tabs use arrow keys; focus rings are a white 2px outline offset 3px; reduced
motion and reduced transparency are honoured.

## Component library overrides (shadcn/ui etc.)

Card/Popover/Sheet/Toolbar → `.glass` (blur + saturate + rim); `--radius: 24px` cards, pills for buttons and tabs;
Button default → glass capsule, `primary` → white; Slider → `.range` (thumb on hover/focus); Switch → iOS green;
Tabs → glass capsule with a lifted selected pill; Sheet → now-playing panel on mobile.

## Anti-patterns

- Opaque cards on a flat background (that is not glass), or glass over plain black (nothing to refract).
- Removing the tint for more colour and losing text contrast; white text on bright yellow auroras without the tint.
- Brand pink on every button; bold heavy numbers; square corners.
- Animations that run when nothing is playing; mirrored timelines in RTL.

## Pre-ship checklist

- [ ] Every panel and toolbar is `.glass`; the canvas only shows through the aurora.
- [ ] Track change → aurora colours, art, titles and lyrics update together.
- [ ] Floating capsules for nav, player and mobile tabs.
- [ ] Media controls LTR; lyrics and lists RTL in Persian.
- [ ] Reduced motion and reduced transparency fallbacks work.
- [ ] Persian: Vazirmatn, Persian digits in times, Jalali dates, Toman prices.
