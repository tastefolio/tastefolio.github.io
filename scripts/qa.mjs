// Visual QA helper: full-page captures of each demo plus every dashboard tab, at desktop and mobile,
// in both languages. Writes JPEGs to .qa/<skill>/ for review (not published).
// Usage: node scripts/qa.mjs --only=a,b [--lang=fa] [--demo=site] [--vp=mobile] [--tabs] [--dark]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { startServer } from './serve.mjs';
import { listSkills } from './sync.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];
const flag = (k) => process.argv.includes(`--${k}`);
const only = arg('only')?.split(',');
const langs = arg('lang') ? [arg('lang')] : ['en', 'fa'];
const demos = arg('demo') ? [arg('demo')] : ['site', 'dashboard'];
const vps = arg('vp') ? [arg('vp')] : ['desktop', 'mobile'];
const OUT = join(ROOT, '.qa');
const PORT = 4400 + Math.floor(Math.random() * 300);
const VIEW = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
};

const server = await startServer(ROOT, PORT);
const browser = await chromium.launch();
const skills = (await listSkills()).filter((s) => !only || only.includes(s));
const notes = [];
try {
  for (const vp of vps) {
    const ctx = await browser.newContext({ ...VIEW[vp], reducedMotion: 'reduce' });
    for (const slug of skills) for (const demo of demos) for (const lang of langs) {
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
      await page.goto(`http://localhost:${PORT}/skills/${slug}/examples/${demo}.html?lang=${lang}&shot=1${flag('dark') ? '&theme=dark' : ''}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const dir = join(OUT, slug);
      await mkdir(dir, { recursive: true });
      const save = async (name, full = true) => {
        const buf = await page.screenshot({ fullPage: full, type: 'png' });
        const meta = await sharp(buf).metadata();
        const w = vp === 'desktop' ? 1100 : 390;
        let img = sharp(buf).resize({ width: Math.min(w, meta.width) });
        await img.jpeg({ quality: 70 }).toFile(join(dir, `${name}.jpg`));
      };
      const overflow = await page.evaluate((W) => {
        if (document.documentElement.scrollWidth > W + 1) return [`document ${document.documentElement.scrollWidth}px > ${W}px`];
        return [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > W + 1 || r.left < -1) && getComputedStyle(e).position !== 'fixed'; })
          .filter((e) => !e.closest('[data-track], .table-wrap, .table-scroll, [role=tablist], .chip-group, .mono-feed, .scroll-x, .feature-tabs, .marquee, .aura, .cat-bar, .track, .catnav, .pills, .shots, .banners, .screens, .sections, .ticker-strip, .window-body, .log, .code, .install, .side:not([data-open]), .tape'))
          // ignore anything clipped by an ancestor that hides or scrolls its overflow
          .filter((e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') return false; } return true; })
          .slice(0, 5).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`);
      }, VIEW[vp].viewport.width);
      if (overflow.length) notes.push(`${slug}/${demo} ${lang} ${vp}: overflow → ${overflow.join(', ')}`);
      await save(`${demo}-${lang}-${vp}`);
      if (flag('tabs') && demo === 'dashboard') {
        const list = await page.$('[role="tablist"]');
        const tabs = list ? await list.$$('[role="tab"]') : [];
        for (let i = 1; i < tabs.length; i++) {
          await tabs[i].evaluate((el) => el.click());
          await page.waitForTimeout(250);
          await page.evaluate(() => scrollTo(0, 0));
          await save(`${demo}-${lang}-${vp}-tab${i}`);
        }
      }
      if (errs.length) notes.push(`${slug}/${demo} ${lang} ${vp}: ${errs.slice(0, 3).join(' | ')}`);
      await page.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(notes.length ? notes.join('\n') : 'no console errors or overflow');
