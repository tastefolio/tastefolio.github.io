// Behaviour test for the built gallery in dist/ (run `npm run build` first). Drives the real pages in
// Chromium and checks what a visitor sees on screen, not only what the scripts set:
//   home      en + fa at 1440px and 390px: facet chips, the Persian-first box and search hide cards, the
//             result count matches the cards on screen, chip counts and data-zero follow the other
//             filters, filters round-trip through the URL, one result reads "1 style", and Top rated
//             orders by 👍 (curated order on ties)
//   viewer    en + fa at 1440px and 390px: one screenshot pane at a time, switched by the viewer
//             buttons; install tabs switch their panels by click and keyboard; the giscus vote box loads
//             for the right thread and theme (giscus.app itself is blocked, so no test depends on it)
//   votes     en + fa: the home page rendered with known 👍 counts defaults to Top rated, is served in
//             that order, and keeps the sort in the URL only when it is not the default; every card's
//             vote button opens that skill's giscus box in a dialog, its count follows what giscus reports,
//             Top rated re-sorts on close, and the dialog reopens after GitHub sign-in
//   menu      the phone menu opens, closes on Escape and on an outside click, and is gone on desktop
//   overflow  no page (home, guide, 404, every skill page, both languages) is wider than a 320px or
//             390px phone, and each starts with one screenshot pane and one panel per tab list
// Usage: node scripts/gallery-test.mjs [--only=home,viewer,votes,menu,overflow]
import { chromium } from 'playwright';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { startServer } from './serve.mjs';
import * as tpl from '../gallery/src/templates.mjs';

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
// card order in the HTML as served, before the page script re-sorts anything
const htmlOrder = (html) => [...html.matchAll(/data-item data-slug="([^"]+)"/g)].map((m) => m[1]);
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
  const cards = await page.$$eval('[data-item]', (els) => els.map((c) => ({ slug: c.dataset.slug, keywords: c.dataset.keywords, persian: c.dataset.persian, category: c.dataset.category, mode: c.dataset.mode, density: c.dataset.density, order: Number(c.dataset.order), votes: Number(c.dataset.votes) })));
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

  // Top rated: most 👍 first, curated order on ties. Once anyone has voted it is the default and the HTML
  // already comes in that order. Known votes are then set on the cards to check the order itself.
  const order = () => page.$$eval('[data-item]', (cs) => cs.map((c) => c.dataset.slug));
  const byVotes = (v) => [...cards].sort((a, b) => v[b.slug] - v[a.slug] || a.order - b.order).map((c) => c.slug);
  const curated = [...cards].sort((a, b) => a.order - b.order).map((c) => c.slug);
  const sortDefault = cards.some((c) => c.votes > 0) ? 'top' : 'curated';
  const onLoad = sortDefault === 'top' ? byVotes(Object.fromEntries(cards.map((c) => [c.slug, c.votes]))) : curated;
  eq(await page.$eval('[data-sort]', (el) => el.value), sortDefault, `${label}: default sort`);
  await visit(page, `${PREFIX[lang]}/`);
  eq([htmlOrder(await (await page.request.get(`${base}${PREFIX[lang]}/`)).text()), await order()], [onLoad, onLoad], `${label}: card order in the HTML and on load`);
  const votes = Object.fromEntries(cards.map((c, i) => [c.slug, (i * 7) % 4]));
  await page.$$eval('[data-item]', (cs, v) => cs.forEach((c) => { c.dataset.votes = v[c.dataset.slug]; }), votes);
  for (const [value, expectedOrder] of [['top', byVotes(votes)], ['curated', curated]]) {
    await page.selectOption('[data-sort]', value);
    eq(await order(), expectedOrder, `${label}: card order for sort=${value}`);
    eq((await readHome(page)).params, value === sortDefault ? {} : { sort: value }, `${label}: URL query for sort=${value}`);
  }

  // filters in the URL are restored on load
  await visit(page, `${PREFIX[lang]}/?category=content&density=airy`);
  await step('loaded with ?category=content&density=airy', { ...ALL, category: 'content', density: 'airy' });
}));

// ------------------------------------------------------------------ home once people have voted
// Real votes may not exist yet, so the home page is rendered from the templates with known counts and
// served in place of the built one.
const votedSuite = (lang) => suite('votes', `home with votes ${lang} 1440px`, (label) => withPage(desktop(1440), async (page) => {
  const skills = await Promise.all(SLUGS.map(async (slug) => ({ slug, meta: JSON.parse(await readFile(join(DIST, 'skills', slug, 'meta.json'), 'utf8')) })));
  skills.sort((a, b) => a.meta.order - b.meta.order);
  const votes = Object.fromEntries(skills.map((s, i) => [s.slug, (i * 7) % 4]));
  const html = tpl.home({ skills, shots: new Set(), votes, version: 'test' }, lang);
  await page.route((url) => url.pathname === `${PREFIX[lang]}/`, (r) => r.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
  await page.route('https://giscus.app/**', (r) => r.abort());
  const order = () => page.$$eval('[data-item]', (cs) => cs.map((c) => c.dataset.slug));
  const top = [...skills].sort((a, b) => votes[b.slug] - votes[a.slug] || a.meta.order - b.meta.order).map((s) => s.slug);
  const curated = skills.map((s) => s.slug);
  const name = (slug) => skills.find((s) => s.slug === slug).meta.name;
  const num = (x) => (lang === 'fa' ? faNum.format(x) : String(x));
  const button = (slug) => `[data-item][data-slug="${slug}"] [data-vote]`;
  const card = (slug) => page.$eval(button(slug), (b) => ({ count: b.querySelector('[data-vote-count]').textContent, label: b.getAttribute('aria-label'), votes: b.closest('[data-item]').dataset.votes }));
  const dialog = () => page.$eval('[data-vote-dialog]', (dl) => ({ open: dl.open, title: dl.querySelector('[data-vote-title]').textContent, page: dl.querySelector('[data-vote-page]').getAttribute('href'), thread: dl.querySelector('.giscus').id }));

  await visit(page, `${PREFIX[lang]}/`);
  eq(await page.$eval('[data-sort]', (el) => el.value), 'top', `${label}: default sort`);
  eq([htmlOrder(html), await order()], [top, top], `${label}: card order in the HTML and on load`);
  eq(await page.$$eval('[data-item]', (cs) => cs.map((c) => c.querySelector('[data-vote] [data-vote-count]')?.textContent)), top.map((s) => num(votes[s])), `${label}: vote buttons and counts on every card, zero included`);
  const first = await card(top[0]);
  check(first.label.includes(name(top[0])) && first.label.includes(lang === 'fa' ? `${num(3)} رأی` : '3 votes'), `${label}: vote button label "${first.label}"`);
  await page.selectOption('[data-sort]', 'curated');
  eq([await order(), (await readHome(page)).params], [curated, { sort: 'curated' }], `${label}: curated order and URL`);
  await page.selectOption('[data-sort]', 'top');
  eq([await order(), (await readHome(page)).params], [top, {}], `${label}: Top rated order and URL`);

  // a card's 👍 opens that skill's vote box right here; the count follows giscus; Top rated re-sorts on close
  const last = top[top.length - 1];
  await page.click(button(last));
  eq(await dialog(), { open: true, title: lang === 'fa' ? `به ${name(last)} امتیاز بدهید` : `Rate ${name(last)}`, page: `${base}${PREFIX[lang]}/skills/${last}/`, thread: `vote-${last}` }, `${label}: vote dialog`);
  const giscus = await page.waitForSelector('script[src="https://giscus.app/client.js"]', { state: 'attached' }).then((el) => el.evaluate((x) => ({ ...x.dataset })));
  eq({ term: giscus.term, lang: giscus.lang, emitMetadata: giscus.emitMetadata, backlink: await page.$eval('meta[name="giscus:backlink"]', (m) => m.content) },
    { term: `skills/${last}`, lang, emitMetadata: '1', backlink: `${base}${PREFIX[lang]}/skills/${last}/` }, `${label}: giscus in the vote dialog`);
  const report = (origin, count) => page.evaluate(([o, c]) => dispatchEvent(new MessageEvent('message', { origin: o, data: { giscus: { discussion: { reactions: { THUMBS_UP: { count: c, viewerHasReacted: true } } } } } })), [origin, count]);
  await report('https://giscus.app', 9);
  await report('https://example.com', 1);
  const now = await card(last);
  eq([now.count, now.votes, now.label.includes(lang === 'fa' ? `${num(9)} رأی` : '9 votes')], [num(9), '9', true], `${label}: card count after giscus reports 9 (another origin is ignored)`);
  await page.keyboard.press('Escape');
  eq([(await dialog()).open, (await order())[0], await page.evaluate(() => document.activeElement?.closest('[data-item]')?.dataset.slug)], [false, last, last],
    `${label}: after Escape (dialog open, first card, focus)`);
  await page.click(button(top[1]));
  await page.mouse.click(5, 5);
  eq((await dialog()).open, false, `${label}: a click outside the dialog closes it`);

  await visit(page, `${PREFIX[lang]}/?sort=curated`);
  eq([await page.$eval('[data-sort]', (el) => el.value), await order()], ['curated', curated], `${label}: loaded with ?sort=curated`);
  // back from GitHub sign-in: giscus gets the session, the URL is cleaned up, and the same vote box reopens
  await visit(page, `${PREFIX[lang]}/?giscus=test-session#vote-${top[2]}`);
  eq([await page.evaluate(() => localStorage.getItem('giscus-session')), await page.evaluate(() => location.search + location.hash), (await dialog()).thread, (await dialog()).open],
    ['"test-session"', `#vote-${top[2]}`, `vote-${top[2]}`, true], `${label}: back from sign-in (session, URL, thread, open)`);
}));

// ------------------------------------------------------------------ skill page: screenshot viewer, install tabs
const viewerSuite = (lang, width, slug) => suite('viewer', `skills/${slug} ${lang} ${width}px`, (label) => withPage(device(width), async (page) => {
  // only these pages scroll to the vote box; block giscus here (routing turns the HTTP cache off, so not everywhere)
  await page.route('https://giscus.app/**', (r) => r.abort());
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

  // the vote box: giscus loads when it comes near, for this skill's thread, in the page language and theme
  await page.locator('[data-giscus]').scrollIntoViewIfNeeded();
  const giscus = await page.waitForSelector('script[src="https://giscus.app/client.js"]', { state: 'attached' }).then((el) => el.evaluate((x) => ({ ...x.dataset })));
  eq({ term: giscus.term, lang: giscus.lang, repo: giscus.repo, mapping: giscus.mapping, strict: giscus.strict, reactions: giscus.reactionsEnabled, theme: giscus.theme?.replace(base, '') },
    { term: `skills/${slug}`, lang, repo: 'tastefolio/tastefolio.github.io', mapping: 'specific', strict: '1', reactions: '1', theme: '/assets/giscus-light.css' }, `${label}: giscus settings`);
  for (const mode of ['light', 'dark']) eq((await page.request.get(`${base}/assets/giscus-${mode}.css`)).status(), 200, `${label}: giscus ${mode} theme served`);
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
  for (const lang of ['en', 'fa']) await votedSuite(lang);
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
