---
name: rack
description: Tastefolio "Rack" design language — servers you can almost touch, dark-first and Persian-first, for cloud and VPS providers, domain registrars, DNS/CDN services and their control panels. Graphite rack-unit faceplates with ears and screws, one meaning per status LED, recessed VFD windows for prices, IPs and hostnames, one power-button orange for the action; Saira + Onest + Spline Sans Mono with Vazirmatn; a server builder of mixing-desk faders (CPU, RAM, NVMe, traffic) with LED meters, OS and location keys and a live hourly or monthly Toman price; rack-elevation hero, ready units, datacenters with ping, domain search with availability lights, uptime strip, deploy dialog; a panel with power keys, live graphs, web console, snapshots, firewall, domains with auto-renew, a DNS zone editor and a wallet. Boxicons. Use when the user asks for the Rack, VPS, cloud hosting, server control panel, domain or DNS style — Persian (RTL) and English (LTR).
---

# Rack

**Infrastructure should feel like hardware you trust.** Rack builds hosting interfaces out of the things people
picture when they think of a server: brushed faceplates bolted into a rack, LEDs that tell you the state at a glance,
recessed fluorescent displays that show the numbers that matter, and one orange power button. Nothing is abstract:
you build a server by pushing faders, you see your datacenter by its ping, and a domain is free when its light is
green. Dark by default because rooms full of servers are; a brushed-steel light theme for the cold aisle.

Covers **provider sites** (builder, ready units, datacenters, domain search, features, status, FAQ) and **control
panels** (servers, power, graphs, console, snapshots, firewall, domains, DNS, billing).

## Files

| File | Use |
|---|---|
| [assets/tokens.css](assets/tokens.css) | **Required.** Graphite palette with `--faceplate` and `--brushed`, power orange `--brand`, `--vfd` display, LED colours, Saira + Onest + Spline Sans Mono + Vazirmatn, `--u` (one rack unit); light “cold aisle” theme; Persian overrides. |
| [assets/kit.css](assets/kit.css) | `.unit` faceplate (ears, screws, `.u-tag`, `.flat`), `.led` (amber/red/blue/off, blink, pulse), `.vfd` (`.big`), `.screw`, `.plate` labels, `.btn` (orange, `-key`, `-ghost`), `.power`, fields, `.switch`, `.keys`, badges; header; hero with `.rack` + `.srv`; builder (`.mixer`, `.channel`, `.fader`, `.meter-led`, `.os-grid`, `.order`); `.dcs`/`.dc`, `.presets`, `.domain-box`, `.tld-row`, `.tld-prices`, `.uptime`, `.feature-grid`, `.faq`, footer; dialogs, toast, `.console`; panel (`.panel-app`, `.panel-top`, `.tabs`, `.page`, `.srv-row`, `.stat-cells`, `.table`, `.snap`). |
| [assets/kit.js](assets/kit.js) | Shared runtime: language swap, theme, tabs, pressed groups, switches, dialogs, toasts, copy, sorting, charts, Persian digits, Jalali dates. |
| [assets/rack.js](assets/rack.js) | Builder faders and live price (`data-builder`, `input.fader`), ping (`data-ping`), domain search (`form[data-domain]`), uptime bars (`data-uptime`), web console (`data-console`), power keys (`data-server`, `data-power`), server selection (`data-current`), snapshots (`data-snapshot`), DNS records (`form[data-add-record]`). |
| [references/adapters.md](references/adapters.md) | Tailwind v3/v4 + shadcn/ui mapping. |
| [examples/site.html](examples/site.html) | Provider site: rack hero with power button and VFD specs, fader builder with OS, location, monthly/hourly price and summary, ready units, datacenters with ping, domain search and extension prices, feature units, 90-day status, FAQ, closing unit, deploy dialog. |
| [examples/dashboard.html](examples/dashboard.html) | Control panel: server rows with power keys and states, selected server stats, CPU and network graphs, web console, snapshots, firewall; domains with auto-renew and a DNS zone with an add-record dialog; billing with daily spend, wallet top-up and invoices. |

## Fonts & icons

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@75..125,300..800&family=Onest:wght@400..700&family=Spline+Sans+Mono:wght@400..600&family=Vazirmatn:wght@100..900&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css">
```
**Saira** (wide, 112–115% stretch, uppercase) for display, headings and the logo — the stencilled voice of
equipment; **Onest** for the interface; **Spline Sans Mono** for everything a machine prints: prices on the VFD,
IPs, hostnames, specs, DNS records, the console. **Vazirmatn** for all Persian, display 900, never another Persian
face. Icons: **Boxicons** (MIT) webfont, `<i class="bx bx-server" aria-hidden="true"></i>`; use generic glyphs
(`bxl-tux`, `bxl-windows`) rather than vendor logos.

## Identity rules (non-negotiable)

1. **Every container is a unit.** Cards are `.unit` faceplates: brushed gradient, ears with two screws on each side, a mono `U` tag. Use `.unit.flat` (no ears) only for wide tables.
2. **One LED, one meaning.** Green = running/available/healthy, amber = working/pending, red = stopped/taken/failed, blue = traffic. Never decorative, never a different meaning; always paired with a text label or badge.
3. **Numbers live on displays.** Prices, IPs, hostnames, specs and pings sit in recessed `.vfd` windows (cyan-green glow, LTR mono). Displays stay dark in the light theme, like real panels.
4. **Orange is power.** `--brand` is the power button and the primary action (deploy, add, top up); keys (`.btn-key`) do everything else.
5. **Build with faders.** Resources are vertical faders with an LED meter and a VFD readout; OS and location are pressed keys; the price updates live in Toman per month or per hour.
6. **Physical controls.** Keys press down 2px and light their LED when selected; switches are hardware toggles; the power button has an orange ring.
7. **Honest operations.** Ping is labelled as an estimate; uptime shows the last 90 days with incidents; prices include what a stopped server costs.
8. **Quiet surfaces, loud states.** Graphite and steel only; colour comes from LEDs, the VFD and the one orange.
9. **The panel is the rack.** Servers are rows of units with power keys; selecting one fills the detail displays; graphs are thin lines on the dark display palette.
10. **LTR for machines.** Hostnames, IPs, DNS values, console and specs are always LTR inside RTL pages.

## Tokens

| Role | Dark (default) | Light (cold aisle) |
|---|---|---|
| `--canvas` / `--surface` / `--surface-2` | `#121417` / `#1a1d21` / `#22262b` | `#e9ecef` / `#f7f8f9` / `#e1e5e9` |
| `--ink` / `--ink-2` / `--ink-3` | `#e7eaee` / `#a8b0ba` / `#828b97` | `#15181c` / `#4b535d` / `#5f6873` |
| `--brand` (power) / `--brand-ink` | `#ff6a1a` / `#1a0c04` | `#f25c0e` / `#1a0c04` |
| `--vfd` on `--vfd-bg` | `#6ff5d2` on `#071210` | same |
| LEDs green / amber / red / blue | `#3ddc84` / `#ffb020` / `#ff4d4f` / `#4da3ff` | same |

Type 12 / 13.5 / 15.5 / 18 / 22 / 30 / 40, display `clamp(40px, 5.8vw, 82px)` uppercase (Persian 34–66, 900).
Radius 4 / 8 / 12. Controls 44 / 54px. `--u: 44px`.

## Brand adaptation

- `--brand` may be any saturated signal colour that keeps dark text ≥ 4.5:1 on it (coral `#ff4f6d`, electric blue `#3d8bff`, mint `#2bd4a0`, amber `#ffc23d`); keep `--brand-ink` dark. Avoid green or red brands — they collide with the LEDs.
- Swap `--vfd` only for another display phosphor (amber `#ffb35c`, green `#8dff7a`) and keep it on `--vfd-bg`.
- The logo mark is three stacked units with LEDs; a real logotype goes in stencil-like uppercase.

## Website patterns

- **Header**: rack logo · cloud servers, ready units, datacenters, domains, status · language/theme · *Control panel* (key) · *Build a server* (orange). Menu below 1080px.
- **Hero**: kicker with a pulsing LED, uppercase display with one orange phrase, lead, a `.power` button with the time-to-SSH on a VFD, three VFD specs; on the end side a rack elevation of `.srv` units with LEDs, drive bays and U tags.
- **Builder** (`data-builder`): four channels (CPU, RAM, NVMe, traffic) — each a VFD readout, a vertical `.fader` with `data-values`/`data-prices` and a 12-segment `.meter-led`; OS tiles and location keys with `data-price`; an order unit with monthly/hourly keys, a big VFD price, a mono summary and *Deploy now* → deploy dialog (LED checklist, SSH command, copy).
- **Ready units**: rows with a `1U/2U/4U` tag, name, mono specs and VFD price.
- **Datacenters**: pressed `.dc` buttons with LED, city, zones and a live-ish ping VFD.
- **Domains**: a mono search field, result rows (LED, name, VFD price, add or taken) and an extension price grid.
- **Features** as units with icons, **status** with a 90-day uptime strip and legend, **FAQ** with LED markers, a closing unit with the power button.

## Dashboard patterns

- **Top bar**: logo, underline tabs (servers, domains & DNS, billing), wallet VFD, language/theme, *New server*.
- **Servers**: `.srv-row` units with a power LED, hostname + location/OS, IP VFD, state badge and start/reboot/stop keys (`data-power`, the row goes amber while working); clicking a row fills the detail head (`data-current`), stat displays (CPU, RAM, disk, traffic), CPU area and network line charts, a web console, snapshots with restore and *Take snapshot*, firewall rules.
- **Domains & DNS**: domains with sortable expiry and auto-renew switches; a zone table (type, name, value, TTL, shield LED) and an add-record dialog.
- **Billing**: daily spend bars, wallet VFD with top-up keys, invoices with sortable amounts.

## Components

`.unit(.flat)`, `.unit-head`, `.u-tag`, `.screw`, `.led(.amber|.red|.blue|.off|.blink|.pulse)`, `.vfd(.big)`, `.plate`, `.kicker`, `.btn(-key|-ghost|-sm|-lg|-icon|-block)`, `.power`, `.link`, `.field`, `.label`, `.hint`, `.input`, `.select`, `.textarea`, `.switch`, `.keys`, `.badge(.ok|.warn|.bad|.info|.brand)`;
`.site-head`, `.logo` + `.logo-mark`, `.nav`, `.menu-btn`, `.hero`, `.hero-cta`, `.specs-row`, `.rack`, `.srv(.u2|.blank)` (`.bays`, `.name`), `.builder`, `.mixer`, `.channel`, `.fader-wrap`, `.fader`, `.meter-led`, `.os-grid`, `.order`, `.price-display`, `.presets`/`.preset`, `.dcs`/`.dc`, `.domain-box`, `.domain-form`, `.tld-list`, `.tld-row`, `.tld-prices`, `.uptime`, `.feature-grid`, `.faq`, `.site-foot`, `.foot-grid`;
`dialog.modal` (`.modal-head`, `.modal-body`, `.modal-foot`), `.tf-toast`, `.console` (`.console-bar`, `.console-out`, `.console-in`);
`.panel-app`, `.panel-top`, `.tabs`, `.wallet`, `.page`, `.grid-2`, `.grid-3`, `.servers`, `.srv-row` (`.leds`, `.host`, `.power-keys`), `.stat-cells`, `.table-wrap`, `.table`, `.snap`, `.empty`.

## Interaction & motion

Mechanical and quick (120–480ms). Keys travel 2px; LEDs pulse when running and blink amber while working; the fader
meter lights segment by segment (amber near the top, red at the peak); the price display updates instantly; pings
refresh every couple of seconds; power keys put a row in an amber working state before it settles; console output
scrolls. Under reduced motion and in screenshots LEDs hold steady and nothing loops.

## Persian & RTL

- Persian is the default; English via `data-alt`. Faders stay vertical (min at the bottom) in both directions; the meter sits on the end side.
- Vazirmatn only; display 900 without uppercase. Units on displays follow the language (`data-unit-fa`/`-en`, `data-month-fa`/`-en`); hostnames, IPs, DNS records and console stay LTR mono.
- Toman with Persian digits (`data-fmt="toman"`), Jalali dates for expiry and invoices, ping in Persian digits.

## Accessibility

Ink on graphite ≈ 14:1, VFD on its window ≈ 13:1, dark ink on orange ≈ 7:1, `--ink-3` ≥ 4.5:1 in both themes.
Faders are real range inputs with `aria-valuetext` (“4 vCPU”); LEDs are `aria-hidden` and always sit next to a text
state; keys are pressed groups; the rack hero is one labelled image; the domain results and the price are polite live
regions; the console input is labelled and its output is text; tables sort with buttons in headers.

## Component library overrides (shadcn/ui etc.)

`--radius: 4px` controls, 8–12px units and dialogs; Button primary → orange with dark text, secondary → key; Card →
`.unit` faceplate; Badge → square badge; Switch → hardware toggle; Slider → vertical fader with an LED meter;
Progress → LED segments; Toast → dark chip with a green LED.

## Anti-patterns

- Glowing gradients, glassmorphism or neon everywhere — the glow belongs to LEDs and displays only.
- LEDs as decoration, or green/red used for anything but state.
- Prices in proportional type, hidden hourly costs, or vendor logos as decoration.
- Plan cards with ribbons and comparison tables as the main way to choose — build with faders, show ready units.
- Persian set in anything but Vazirmatn; IPs or commands that flip direction in RTL.

## Pre-ship checklist

- [ ] Units with ears and U tags; one orange action; keys for the rest.
- [ ] LEDs: green/amber/red/blue only for state, always with text.
- [ ] Builder: four faders with meters and readouts, OS + location keys, monthly/hourly, live Toman price.
- [ ] Datacenters with ping, domain search with lights, 90-day uptime.
- [ ] Panel: power keys with states, graphs, console, snapshots, firewall, DNS zone, wallet; light theme checked.
