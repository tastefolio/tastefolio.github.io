// Validates every skill folder: SKILL.md frontmatter, metadata, required files, demo wiring,
// relative links inside SKILL.md, and the plugin marketplace manifest.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { listSkills } from './sync.mjs';
import { frontmatterOf as frontmatter } from './lib.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const errors = [];
const warn = [];
const err = (s, m) => errors.push(`✗ ${s}: ${m}`);


const REQUIRED = ['SKILL.md', 'meta.json', 'assets/tokens.css', 'assets/kit.css', 'assets/kit.js', 'references/adapters.md', 'examples/site.html', 'examples/dashboard.html'];
const CATEGORIES = ['product', 'infra', 'commerce', 'content', 'brand', 'devdata'];

const skills = await listSkills();
const names = new Set();
for (const s of skills) {
  const dir = join(ROOT, 'skills', s);
  for (const f of REQUIRED) if (!existsSync(join(dir, f))) err(s, `missing ${f}`);
  if (!existsSync(join(dir, 'SKILL.md'))) continue;
  const md = await readFile(join(dir, 'SKILL.md'), 'utf8');
  const fm = frontmatter(md);
  if (!fm) { err(s, 'SKILL.md has no YAML frontmatter'); continue; }
  if (fm.name !== s) err(s, `frontmatter name "${fm.name}" must equal folder name`);
  if (!/^[a-z0-9-]{1,64}$/.test(fm.name || '')) err(s, 'name must be lowercase letters, digits, hyphens (≤64)');
  if (!fm.description || fm.description.length < 80) err(s, 'description missing or too short');
  if (fm.description && fm.description.length > 1024) err(s, `description is ${fm.description.length} chars (max 1024)`);
  const lines = md.split('\n').length;
  if (lines > 500) warn.push(`! ${s}: SKILL.md has ${lines} lines (aim for < 500; move detail to references/)`);
  for (const [, link] of md.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) {
    if (!existsSync(join(dir, link.split('#')[0]))) err(s, `SKILL.md links to missing file ${link}`);
  }
  if (existsSync(join(dir, 'meta.json'))) {
    let meta;
    try { meta = JSON.parse(await readFile(join(dir, 'meta.json'), 'utf8')); } catch (e) { err(s, 'meta.json is not valid JSON'); continue; }
    for (const k of ['name', 'tagline', 'summary', 'bestFor', 'avoidFor', 'category', 'density', 'mode', 'swatches', 'fonts', 'signature', 'demos', 'order']) {
      if (meta[k] === undefined) err(s, `meta.json missing "${k}"`);
    }
    for (const k of ['tagline', 'summary', 'bestFor', 'avoidFor', 'signature']) {
      if (meta[k] && (!meta[k].en || !meta[k].fa)) err(s, `meta.json "${k}" needs en and fa`);
    }
    if (meta.category && !CATEGORIES.includes(meta.category)) err(s, `unknown category ${meta.category}`);
    if (names.has(meta.name)) err(s, `duplicate display name ${meta.name}`);
    names.add(meta.name);
  }
  for (const demo of ['site', 'dashboard']) {
    const p = join(dir, 'examples', `${demo}.html`);
    if (!existsSync(p)) continue;
    const html = await readFile(p, 'utf8');
    if (!new RegExp(`data-demo="${demo}"`).test(html)) err(s, `${demo}.html needs data-demo="${demo}" on <html>`);
    if (!/<html[^>]+lang="(fa|en)"/.test(html)) err(s, `${demo}.html needs lang`);
    if (!/data-alt-lang="(fa|en)"/.test(html)) err(s, `${demo}.html needs data-alt-lang for the bilingual toggle`);
    if (!/<meta name="viewport"/.test(html)) err(s, `${demo}.html needs a viewport meta`);
    if (!/\.\.\/assets\/tokens\.css/.test(html) || !/\.\.\/assets\/kit\.css/.test(html)) err(s, `${demo}.html must load ../assets/tokens.css and ../assets/kit.css`);
    for (const [, ref] of html.matchAll(/(?:href|src)="(?!https?:|#|data:|mailto:|tel:|javascript:)([^"?#]+)/g)) {
      if (!existsSync(join(dirname(p), ref))) err(s, `${demo}.html references missing ${ref}`);
    }
    const alts = (html.match(/data-alt="/g) || []).length;
    if (alts < 20) warn.push(`! ${s}/${demo}: only ${alts} translated strings`);
  }
}

const mp = join(ROOT, '.claude-plugin', 'marketplace.json');
if (existsSync(mp)) {
  const m = JSON.parse(await readFile(mp, 'utf8'));
  const listed = new Set(m.plugins.flatMap((p) => p.skills || []).map((x) => x.replace(/^\.\/skills\//, '')));
  if (!m.name || !m.owner?.name || !Array.isArray(m.plugins)) err('marketplace', 'manifest needs name, owner.name and plugins[]');
  for (const s of skills) if (!listed.has(s)) err('marketplace', `skill ${s} is not listed in .claude-plugin/marketplace.json`);
  for (const p of m.plugins) for (const sk of p.skills || []) if (!existsSync(join(ROOT, sk, 'SKILL.md'))) err('marketplace', `${p.name} points to missing ${sk}`);
} else err('marketplace', '.claude-plugin/marketplace.json missing');

for (const w of warn) console.warn(w);
if (errors.length) {
  for (const e of errors) console.error(e);
  console.error(`\n${errors.length} problem(s) in ${skills.length} skills`);
  process.exit(1);
}
console.log(`✓ ${skills.length} skills valid`);
