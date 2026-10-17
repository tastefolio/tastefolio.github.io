// Behaviour test for the built gallery in dist/ (run `npm run build` first). Drives the real pages in
// Chromium and checks what a visitor sees on screen, not only what the scripts set:
//   home      en + fa at 1440px and 390px: facet chips, the Persian-first box and search hide cards, the
//             result count matches the cards on screen, chip counts and data-zero follow the other
//             filters, filters round-trip through the URL, and one result reads "1 style"
//   viewer    en + fa at 1440px and 390px: one screenshot pane at a time, switched by the viewer
//             buttons; install tabs switch their panels by click and keyboard
//   menu      the phone menu opens, closes on Escape and on an outside click, and is gone on desktop
//   overflow  no page (home, guide, 404, every skill page, both languages) is wider than a 320px or
//             390px phone, and each starts with one screenshot pane and one panel per tab list
// Usage: node scripts/gallery-test.mjs [--only=home,viewer,menu,overflow]
import { chromium } from 'playwright';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { startServer } from './serve.mjs';

const DIST = new URL('../dist', import.meta.url).pathname;
const only = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1].split(',');
if (!existsSync(join(DIST, 'catalog.json'))) {
  console.error('✗ dist/ is not built: run `npm run build` first');
  process.exit(1);
}

const SLUGS = JSON.parse(await readFile(join(DIST, 'catalog.json'), 'utf8')).skills.map((s) => s.name);
const PREFIX = { en: '', fa: '/fa' };
const FACETS = ['category', 'mode', 'density'];
const ALL = { q: '', category: 'all', mode: 'all', density: 'all', persian: false };
const faNum = new Intl.NumberFormat('fa-IR');
// English is singular for one result: "1 style", never "1 styles"
const resultsLabel = (lang, n) => (lang === 'fa' ? `${faNum.format(n)} سبک` : `${n} ${n === 1 ? 'style' : 'styles'}`);
const desktop = (width) => ({ viewport: { width, height: 900 } });
// Under mobile emulation innerWidth grows with content that overflows, so page widths are checked against
// the fixed screen width instead.
const phone =(width) => ({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
const device = (width) => (width < 700 ? phone(width) : desktop(width));

// Every gallery page in dist/, as URL paths; the skills' own files (demos, references) are not gallery pages.
const PAGES = (await readdir(DIST, { recursive: true }))
  .filter((f) => f.endsWith('.html') && !/(^|\/)skills\/[^/]+\/[^/]+\//.test(f))
  .map((f) => '/' + f.replace(/(^|\/)index\.html$/, '$1'))
  .sort();

// ------------------------------------------------------------------ harness
const failures = [];
let passed = 0;
const stable = (v) => JSON.stringify(v, (k, x) => (x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort()) : x));
const check = (ok, what) => { if (ok) passed++; else failures.push(what); return ok; };
const eq = (actual, expected, what) => check(stable(actual) === stable(expected), `${what}: expected ${stable(expected)}, got ${stable(actual)}`);

const server = await startServer(DIST, 0);
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();

async function withPage(options, fn) {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', colorScheme: 'light', ...options });
  ctx.setDefaultTimeout(10_000);
  ctx.setDefaultNavigationTimeout(30_000);
  const page = await ctx.newPage();
  const where = () => page.url().replace(base, '');
  page.on('pageerror', (e) => failures.push(`${where()}: uncaught ${e.message}`));
  page.on('response', (r) => { if (r.url().startsWith(base) && r.status() >= 400) failures.push(`${where()}: HTTP ${r.status()} for ${r.url().slice(base.length)}`); });
  try { await fn(page); } finally { await ctx.close(); }
}
async function visit(page, path) {
  await page.goto(base + path, { waitUntil: 'load' });
  // lay the page out first so every web font it needs has started loading, then wait for them
  await page.evaluate(async () => { document.body.getBoundingClientRect(); await document.fonts.ready; });
}
async function suite(name, label, fn) {
  if (only && !only.includes(name)) return;
  const [f0, p0] = [failures.length, passed];
  try { await fn(label); } catch (e) { failures.push(`${label}: ${e.message.split('\n')[0]}`); }
  const [bad, good] = [failures.length - f0, passed - p0];
  console.log(`${bad ? '✗' : '✓'} ${label}: ${good} check${good === 1 ? '' : 's'} passed${bad ? `, ${bad} failed` : ''}`);
}

// ------------------------------------------------------------------ home: facets, search, counts, URL state
const readHome = (page) => page.evaluate(() => {
  const num = (s) => Number(s.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/\D/g, ''));
  const onScreen = (el) => el.getClientRects().length > 0;
  const cards = [...document.querySelectorAll('[data-item]')];
  const results = document.querySelector('[data-results]').textContent.trim();
  return {
    shown: cards.filter(onScreen).map((c) => c.dataset.slug).sort(),
    leaked: cards.filter((c) => c.hidden && onScreen(c)).map((c) => c.dataset.slug),
    results, count: num(results),
    empty: onScreen(document.querySelector('[data-empty]')),
    clearBar: onScreen(document.querySelector('.results-bar [data-clear]')),
    params: Object.fromEntries(new URLSearchParams(location.search)),
    pressed: Object.fromEntries([...document.querySelectorAll('.chip-group[data-key]')].map((g) => [g.dataset.key, [...g.querySelectorAll('[aria-pressed="true"]')].map((b) => b.dataset.value).join()])),
    chips: [...document.querySelectorAll('.chip-group[data-key] button[data-value]')].map((b) => {
      const n = b.querySelector('.chip-n');
      return { key: b.closest('[data-key]').dataset.key, value: b.dataset.value, n: n ? num(n.textContent) : null, zero: b.hasAttribute('data-zero') };
    }),
  };
});

// What the page should show for a filter state, worked out from the cards' data attributes.
function expected(cards, f) {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  const passes = (c, skip) => terms.every((t) => c.keywords.includes(t)) && (!f.persian || c.persian === 'yes')
    && FACETS.every((k) => k === skip || f[k] === 'all' || c[k] === f[k]);
  // a chip counts the cards you would see by picking it, given every other active filter
  const count = (key, value) => cards.filter((c) => passes(c, key) && (value === 'all' || c[key] === value)).length;
  const params = {};
  if (f.q) params.q = f.q;
  for (const k of FACETS) if (f[k] !== 'all') params[k] = f[k];
  if (f.persian) params.fa = '1';
  return { shown: cards.filter((c) => passes(c)).map((c) => c.slug).sort(), count, params };
}

function verifyHome(s, cards, f, lang, what) {
  const x = expected(cards, f);
  eq(s.leaked, [], `${what}: cards marked hidden but still on screen`);
  eq(s.shown, x.shown, `${what}: cards on screen`);
  eq(s.count, s.shown.length, `${what}: [data-results] count vs cards on screen`);
  eq(s.results, resultsLabel(lang, s.shown.length), `${what}: results label`);
  eq(s.empty, s.shown.length === 0, `${what}: empty state shown`);
  eq(s.clearBar, Object.keys(x.params).length > 0, `${what}: results-bar "Clear filters" shown`);
  eq(s.pressed, { category: f.category, mode: f.mode, density: f.density }, `${what}: pressed chips`);
  eq(s.params, x.params, `${what}: URL query`);
  const off = s.chips.filter((c) => { const n = x.count(c.key, c.value); return (c.n !== null && c.n !== n) || c.zero !== (n === 0); });
  eq(off.map((c) => `${c.key}=${c.value} ${c.n ?? '-'}${c.zero ? ' zero' : ''}`), [], `${what}: chips whose count or data-zero is off (expected ${off.map((c) => x.count(c.key, c.value)).join(', ')})`);
}

const homeSuite = (lang, width) => suite('home', `home ${lang} ${width}px`, (label) => withPage(device(width), async (page) => {
  await visit(page, `${PREFIX[lang]}/`);
  const cards = await page.$$eval('[data-item]', (els) => els.map((c) => ({ slug: c.dataset.slug, keywords: c.dataset.keywords, persian: c.dataset.persian, category: c.dataset.category, mode: c.dataset.mode, density: c.dataset.density })));
  eq(cards.map((c) => c.slug).sort(), [...SLUGS].sort(), `${label}: one card per skill`);
  let f = { ...ALL };
  const step = async (what, change) => {
    f = { ...f, ...change };
    const s = await readHome(page);
    verifyHome(s, cards, f, lang, `${label}: ${what}`);
    return s;
  };
  const chip = (key, value) => page.click(`.chip-group[data-key="${key}"] button[data-value="${value}"]`);
  const start = await step('on load');

  // every chip of every facet on its own, then back to "all"
  for (const key of FACETS) {
    const values = await page.$$eval(`.chip-group[data-key="${key}"] button[data-value]`, (bs) => bs.map((b) => b.dataset.value));
    for (const value of [...values.filter((v) => v !== 'all'), 'all']) {
      await chip(key, value);
      await step(`${key}=${value}`, { [key]: value });
    }
  }
  // a second facet narrows the first, and the other facets recount
  await chip('category', 'commerce');
  const narrowed = await step('category=commerce', { category: 'commerce' });
  const recounted = narrowed.chips.filter((c) => c.key !== 'category' && c.n !== start.chips.find((x) => x.key === c.key && x.value === c.value).n);
  check(recounted.length > 0, `${label}: mode and density chip counts did not change after picking a category`);
  await chip('mode', 'dark');
  await step('category=commerce + mode=dark', { mode: 'dark' });
  await page.click('.results-bar [data-clear]');
  await step('results-bar "Clear filters"', ALL);

  await page.check('[data-persian]');
  await step('Persian-first', { persian: true });
  await page.uncheck('[data-persian]');
  await step('Persian-first off', { persian: false });

  await page.fill('[data-search]', 'music');
  const music = await step('search "music"', { q: 'music' });
  eq(music.count, 1, `${label}: results for "music"`);
  if (lang === 'en') eq(music.results, '1 style', `${label}: label for one result`);
  await page.fill('[data-search]', 'qzxvj');
  const none = await step('nonsense search', { q: 'qzxvj' });
  check(none.empty, `${label}: [data-empty] not shown for a nonsense search`);
  await page.click('[data-empty] [data-clear]');
  const cleared = await step('empty-state "Clear filters"', ALL);
  eq(cleared.count, SLUGS.length, `${label}: results after "Clear filters"`);

  // filters in the URL are restored on load
  await visit(page, `${PREFIX[lang]}/?category=content&density=airy`);
  await step('loaded with ?category=content&density=airy', { ...ALL, category: 'content', density: 'airy' });
}));

// ------------------------------------------------------------------ skill page: screenshot viewer, install tabs
const viewerSuite = (lang, width, slug) => suite('viewer', `skills/${slug} ${lang} ${width}px`, (label) => withPage(device(width), async (page) => {
  await visit(page, `${PREFIX[lang]}/skills/${slug}/`);
  const panes = () => page.$$eval('[data-pane]', (ps) => ps.filter((p) => p.getClientRects().length > 0).map((p) => p.dataset.pane));
  eq(await panes(), [`site-${lang}`], `${label}: panes on screen on load`);
  const other = lang === 'en' ? 'fa' : 'en';
  for (const [group, value, pane] of [['demo', 'dashboard', `dashboard-${lang}`], ['lang', other, `dashboard-${other}`], ['demo', 'site', `site-${other}`], ['lang', lang, `site-${lang}`]]) {
    const button = `[data-viewer-${group}] button[data-value="${value}"]`;
    await page.click(button);
    eq(await panes(), [pane], `${label}: panes on screen after ${group} → ${value}`);
    eq(await page.getAttribute(button, 'aria-pressed'), 'true', `${label}: ${group} → ${value} pressed`);
  }

  const tabs = await page.$$eval('.install [role="tab"]', (ts) => ts.map((t) => t.id));
  check(tabs.length > 1, `${label}: install tabs missing`);
  const controls = (id) => page.getAttribute(`[id="${id}"]`, 'aria-controls');
  const shows = async (id, what) => {
    eq(await page.$$eval('.install [role="tab"][aria-selected="true"]', (ts) => ts.map((t) => t.id)), [id], `${label}: selected tab after ${what}`);
    eq(await page.$$eval('.install [role="tabpanel"]', (ps) => ps.filter((p) => p.getClientRects().length > 0).map((p) => p.id)), [await controls(id)], `${label}: tab panels on screen after ${what}`);
  };
  for (const id of [...tabs.slice(1), tabs[0]]) {
    await page.click(`[id="${id}"]`);
    await shows(id, `clicking ${id}`);
  }
  // arrows follow the reading direction; Home and End jump to the ends
  await page.focus(`[id="${tabs[0]}"]`);
  for (const [key, i] of [[lang === 'fa' ? 'ArrowLeft' : 'ArrowRight', 1], ['End', tabs.length - 1], ['Home', 0]]) {
    await page.keyboard.press(key);
    await shows(tabs[i], key);
  }
}));

// ------------------------------------------------------------------ phone menu
const readMenu = (page, W) => page.evaluate((W) => {
  const button = document.querySelector('[data-menu]');
  const links = [...document.querySelectorAll('#topnav a')].filter((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= W; });
  return { button: button.getClientRects().length > 0, expanded: button.getAttribute('aria-expanded'), links: links.length, focusOnButton: document.activeElement === button };
}, W);

const menuSuite = (lang) => suite('menu', `phone menu ${lang} 390px`, (label) => withPage(phone(390), async (page) => {
  await visit(page, `${PREFIX[lang]}/`);
  let m = await readMenu(page, 390);
  check(m.button, `${label}: menu button not on screen`);
  eq([m.expanded, m.links], ['false', 0], `${label}: closed on load (aria-expanded, links on screen)`);
  await page.click('[data-menu]');
  m = await readMenu(page, 390);
  eq([m.expanded, m.links], ['true', 3], `${label}: open (aria-expanded, links on screen)`);
  await page.focus('#topnav a');
  await page.keyboard.press('Escape');
  m = await readMenu(page, 390);
  eq([m.expanded, m.links, m.focusOnButton], ['false', 0, true], `${label}: after Escape (aria-expanded, links on screen, focus back on the button)`);
  await page.click('[data-menu]');
  eq((await readMenu(page, 390)).links, 3, `${label}: links on screen after reopening`);
  // a plain heading, not a raw point: the hero cards move on hover, so a point next to them can land on a link
  await page.click('#browse-title');
  m = await readMenu(page, 390);
  eq([m.expanded, m.links], ['false', 0], `${label}: after an outside click (aria-expanded, links on screen)`);
}));
const menuDesktopSuite = (lang) => suite('menu', `desktop nav ${lang} 1280px`, (label) => withPage(desktop(1280), async (page) => {
  await visit(page, `${PREFIX[lang]}/`);
  const m = await readMenu(page, 1280);
  eq([m.button, m.links], [false, 3], `${label}: desktop header (menu button on screen, links on screen)`);
}));

// ------------------------------------------------------------------ every page at phone widths
// Runs in the page: the screenshot panes on screen, tab lists whose visible panels are not exactly the
// selected tab's, and the document width (with the elements that force it, when too wide).
function measure(W) {
  const onScreen = (el) => !!el && el.getClientRects().length > 0;
  const panes = [...document.querySelectorAll('[data-pane]')].filter(onScreen).map((p) => p.dataset.pane);
  const tabs = [...document.querySelectorAll('[role="tablist"]')].map((list) => {
    const ts = [...list.querySelectorAll('[role="tab"]')];
    const shown = ts.map((t) => document.getElementById(t.getAttribute('aria-controls'))).filter(onScreen).map((p) => p.id);
    const selected = ts.filter((t) => t.getAttribute('aria-selected') === 'true').map((t) => t.getAttribute('aria-controls'));
    return selected.length === 1 && shown.join() === selected.join() ? null : `${list.getAttribute('aria-label')}: shows ${shown.join(', ') || 'nothing'}`;
  }).filter(Boolean);
  const width = document.documentElement.scrollWidth;
  let culprits = [];
  if (width > W) {
    // Pin the root to the screen width: full-width blocks then fit, and only what forces the overflow sticks out.
    document.documentElement.style.width = `${W}px`;
    const R = document.documentElement.getBoundingClientRect();
    const clipped = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false; };
    const out = [...document.body.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > R.right + 0.5 || r.left < R.left - 0.5) && !clipped(e); });
    const name = (e) => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : '');
    culprits = out.filter((e) => !out.some((o) => o !== e && e.contains(o))).slice(0, 3).map((e) => {
      const path = [];
      for (let x = e; x && x !== document.body; x = x.parentElement) path.unshift(name(x));
      return `${path.slice(-3).join(' > ')} (${Math.round(e.getBoundingClientRect().width)}px)`;
    });
  }
  return { width, culprits, panes, tabs };
}

const overflowSuite = (width) => suite('overflow', `${PAGES.length} pages at ${width}px`, (label) => withPage(phone(width), async (page) => {
  for (const path of PAGES) {
    await visit(page, path);
    const r = await page.evaluate(measure, width);
    check(r.width <= width, `${path} at ${width}px: page is ${r.width}px wide, sticking out: ${r.culprits.join(' | ') || 'unknown'}`);
    const skill = path.match(/^(\/fa)?\/skills\/[^/]+\/$/);
    eq(r.panes, skill ? [`site-${skill[1] ? 'fa' : 'en'}`] : [], `${path} at ${width}px: screenshot panes on screen`);
    eq(r.tabs, [], `${path} at ${width}px: tab lists showing other than the selected panel`);
  }
}));

// ------------------------------------------------------------------ run
const started = Date.now();
try {
  const missing = ['/', '/fa/', '/guide/', '/fa/guide/', '/404.html', ...SLUGS.flatMap((s) => [`/skills/${s}/`, `/fa/skills/${s}/`])].filter((p) => !PAGES.includes(p));
  eq(missing, [], 'gallery pages missing from dist/');
  for (const lang of ['en', 'fa']) for (const width of [1440, 390]) await homeSuite(lang, width);
  for (const lang of ['en', 'fa']) for (const width of [1440, 390]) await viewerSuite(lang, width, SLUGS[0]);
  for (const lang of ['en', 'fa']) { await menuSuite(lang); await menuDesktopSuite(lang); }
  for (const width of [320, 390]) await overflowSuite(width);
} finally {
  await browser.close();
  server.close();
}
const secs = ((Date.now() - started) / 1000).toFixed(1);
if (failures.length) {
  console.error(`\n✗ ${failures.length} gallery check(s) failed (${passed} passed, ${secs}s):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`\n✓ ${passed} gallery checks passed in ${secs}s`);
