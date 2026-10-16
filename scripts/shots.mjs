// Captures real screenshots of every demo (site + dashboard × en + fa × desktop + mobile)
// straight from the implemented pages, and writes optimized WebP files to gallery/shots/<skill>/.
// Usage: node scripts/shots.mjs [--only=a,b] [--out=dir]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { startServer } from './serve.mjs';
import { listSkills } from './sync.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];
const only = arg('only')?.split(',');
const OUT = arg('out') || join(ROOT, 'gallery', 'shots');
const PORT = 4180 + Math.floor(Math.random() * 200);

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const server = await startServer(ROOT, PORT);
const browser = await chromium.launch();
const skills = (await listSkills()).filter((s) => !only || only.includes(s));
const problems = [];
let count = 0;

async function capture(ctx, slug, demo, lang, vp) {
  const page = await ctx.newPage();
  const bad = [];
  page.on('pageerror', (e) => bad.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') bad.push(`console: ${m.text()}`); });
  page.on('requestfailed', (r) => bad.push(`failed: ${r.url()}`));
  const url = `http://localhost:${PORT}/skills/${slug}/examples/${demo}.html?lang=${lang}&shot=1`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(350);
  const overflow = await page.evaluate((w) => document.documentElement.scrollWidth - w, VIEWPORTS[vp].viewport.width);
  if (overflow > 1) bad.push(`horizontal overflow ${overflow}px`);
  const png = await page.screenshot({ type: 'png' });
  await page.close();
  const dir = join(OUT, slug);
  await mkdir(dir, { recursive: true });
  const base = `${demo}-${lang}-${vp}`;
  if (vp === 'desktop') {
    await sharp(png).webp({ quality: 82 }).toFile(join(dir, `${base}.webp`));
    await sharp(png).resize({ width: 720 }).webp({ quality: 80 }).toFile(join(dir, `${demo}-${lang}-thumb.webp`));
  } else {
    await sharp(png).resize({ width: 520 }).webp({ quality: 82 }).toFile(join(dir, `${base}.webp`));
  }
  count++;
  if (bad.length) problems.push(`${slug}/${demo} ${lang} ${vp}:\n    ${bad.slice(0, 6).join('\n    ')}`);
}

try {
  for (const vp of Object.keys(VIEWPORTS)) {
    const ctx = await browser.newContext({ ...VIEWPORTS[vp], reducedMotion: 'reduce', colorScheme: 'light' });
    for (const slug of skills) {
      for (const demo of ['site', 'dashboard']) {
        for (const lang of ['en', 'fa']) {
          await capture(ctx, slug, demo, lang, vp);
          process.stdout.write('.');
        }
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`\ncaptured ${count} screenshots for ${skills.length} skills → ${OUT}`);
if (problems.length) {
  console.warn(`\n${problems.length} capture(s) reported problems:\n  ${problems.join('\n  ')}`);
  await writeFile(join(OUT, '..', 'shots-report.txt'), problems.join('\n') + '\n').catch(() => {});
}
