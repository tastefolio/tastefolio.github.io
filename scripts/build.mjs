// Builds the static gallery into dist/: gallery pages (en + fa), skill folders with live demos,
// screenshots, per-skill zip downloads, catalog.json, llms.txt, sitemap and OG image.
import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { zipSync, strToU8 } from 'fflate';
import sharp from 'sharp';
import { listSkills, sync } from './sync.mjs';
import { frontmatterOf } from './lib.mjs';
import * as tpl from '../gallery/src/templates.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SHOTS = join(ROOT, 'gallery', 'shots');

async function walk(dir, base = dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === '.DS_Store') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, base, out); else out.push(relative(base, p));
  }
  return out;
}
const write = async (p, data) => { await mkdir(join(p, '..'), { recursive: true }); await writeFile(p, data); };

await sync({ quiet: true });
const slugs = await listSkills();
const skills = [];
for (const slug of slugs) {
  const dir = join(ROOT, 'skills', slug);
  const meta = JSON.parse(await readFile(join(dir, 'meta.json'), 'utf8'));
  const fm = frontmatterOf(await readFile(join(dir, 'SKILL.md'), 'utf8'));
  const files = (await walk(dir)).filter((f) => f !== 'meta.json').sort((a, b) => (a === 'SKILL.md' ? -1 : b === 'SKILL.md' ? 1 : a.localeCompare(b)));
  skills.push({ slug, meta, description: fm.description, files, dir });
}
skills.sort((a, b) => a.meta.order - b.meta.order);

const shots = new Set();
if (existsSync(SHOTS)) for (const f of await walk(SHOTS)) if (f.endsWith('.webp')) shots.add(f.replace(/\.webp$/, ''));
const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
const ctx = { skills, shots, version: Date.now().toString(36) };

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(join(ROOT, 'gallery', 'assets'), join(DIST, 'assets'), { recursive: true });
if (existsSync(SHOTS)) await cp(SHOTS, join(DIST, 'shots'), { recursive: true });
await cp(join(ROOT, 'skills'), join(DIST, 'skills'), { recursive: true });

// Pages
for (const lang of ['en', 'fa']) {
  const pre = lang === 'en' ? '' : 'fa';
  await write(join(DIST, pre, 'index.html'), tpl.home(ctx, lang));
  await write(join(DIST, pre, 'guide', 'index.html'), tpl.guide(ctx, lang));
  for (const s of skills) await write(join(DIST, pre, 'skills', s.slug, 'index.html'), tpl.detail(ctx, s, lang));
}
await write(join(DIST, '404.html'), tpl.notFound(ctx));
await write(join(DIST, '.nojekyll'), '');

// Downloads: one zip per skill (folder at the zip root) + everything.
const all = {};
for (const s of skills) {
  const entry = {};
  for (const f of s.files) entry[`${s.slug}/${f}`] = new Uint8Array(await readFile(join(s.dir, f)));
  Object.assign(all, entry);
  await write(join(DIST, 'downloads', `${s.slug}.zip`), zipSync(entry, { level: 9 }));
}
all['README.txt'] = strToU8('Tastefolio skills. Copy any folder into .claude/skills/ (project) or ~/.claude/skills/ (personal).\nhttps://tastefolio.github.io\n');
await write(join(DIST, 'downloads', 'tastefolio-skills.zip'), zipSync(all, { level: 9 }));

// Machine-readable catalog + llms.txt
const catalog = {
  name: 'Tastefolio', version: pkg.version, url: tpl.SITE, repository: `https://github.com/${tpl.REPO}`,
  skills: skills.map((s) => ({
    name: s.slug, title: s.meta.name, description: s.description, tagline: s.meta.tagline, category: s.meta.category,
    mode: s.meta.mode, density: s.meta.density, persianFirst: !!s.meta.persianFirst, tags: s.meta.tags || [],
    bestFor: s.meta.bestFor, page: `${tpl.SITE}/skills/${s.slug}/`, zip: `${tpl.SITE}/downloads/${s.slug}.zip`,
    skillMd: `https://raw.githubusercontent.com/${tpl.REPO}/main/skills/${s.slug}/SKILL.md`,
    demos: { site: `${tpl.SITE}${tpl.demoUrl(s.slug, 'site', 'en')}`, dashboard: `${tpl.SITE}${tpl.demoUrl(s.slug, 'dashboard', 'en')}` },
  })),
};
await write(join(DIST, 'catalog.json'), JSON.stringify(catalog, null, 2));
await write(join(DIST, 'llms.txt'), `# Tastefolio

> Distinct design-language skills (SKILL.md) for AI coding agents. Each skill is a standalone folder with tokens, a reference kit, stack adapters and two demos (website + dashboard), supporting English/LTR and Persian/RTL.

Install one skill into a project: download ${tpl.SITE}/downloads/<name>.zip and unzip into .claude/skills/, or run \`npx skills add ${tpl.REPO} --skill <name>\`.
Use one style per project. Read SKILL.md first; it links to its assets and references.

## Skills
${skills.map((s) => `- [${s.meta.name}](https://raw.githubusercontent.com/${tpl.REPO}/main/skills/${s.slug}/SKILL.md): ${s.meta.tagline.en}. Best for ${s.meta.bestFor.en.slice(0, 3).join(', ')}. (${s.meta.category}, ${s.meta.mode}, ${s.meta.density})`).join('\n')}

## Optional
- [Catalog JSON](${tpl.SITE}/catalog.json)
- [Guide](${tpl.SITE}/guide/)
`);
const urls = ['/', '/guide/', ...skills.map((s) => `/skills/${s.slug}/`)].flatMap((p) => [p, `/fa${p}`]);
await write(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${tpl.SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
await write(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${tpl.SITE}/sitemap.xml\n`);

// Open Graph collage from real screenshots.
const thumbs = skills.map((s) => join(SHOTS, s.slug, 'site-en-thumb.webp')).filter((p) => existsSync(p)).slice(0, 6);
if (thumbs.length >= 3) {
  const W = 1200, H = 630, tw = 372, th = 233;
  const tiles = await Promise.all(thumbs.map((p) => sharp(p).resize(tw, th).png().toBuffer()));
  const comps = tiles.map((input, i) => ({ input, left: 24 + (i % 3) * (tw + 18), top: 140 + Math.floor(i / 3) * (th + 18) }));
  const title = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><text x="24" y="92" font-family="Georgia, serif" font-size="64" fill="#151412">Tastefolio</text><text x="${W - 24}" y="88" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#57534c">${skills.length} design-language skills · site + dashboard demos</text></svg>`);
  await sharp({ create: { width: W, height: H, channels: 3, background: '#f3f1ec' } })
    .composite([{ input: title, left: 0, top: 0 }, ...comps]).png().toFile(join(DIST, 'og.png'));
} else {
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#f3f1ec' } }).png().toFile(join(DIST, 'og.png'));
}

const size = (await walk(DIST)).length;
console.log(`✓ built ${skills.length} skills, ${shots.size} screenshots → dist/ (${size} files)`);
