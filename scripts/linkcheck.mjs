// Crawls dist/ and reports internal links/assets that do not resolve to a file.
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const resolveTarget = async (from, ref) => {
  const clean = decodeURIComponent(ref.split('#')[0].split('?')[0]);
  if (!clean) return true;
  let p = clean.startsWith('/') ? join(DIST, clean) : join(dirname(from), clean);
  if (existsSync(p) && (await stat(p)).isDirectory()) p = join(p, 'index.html');
  return existsSync(p);
};

const files = await walk(DIST);
const broken = [];
let checked = 0;
for (const f of files) {
  const html = await readFile(f, 'utf8');
  for (const [, attr, ref] of html.matchAll(/\b(href|src|srcset|poster)="([^"]+)"/g)) {
    // only srcset is a comma-separated list; commas inside other URLs (e.g. font axis lists) are literal
    const refs = attr === 'srcset' ? ref.split(',').map((x) => x.trim().split(/\s+/)[0]) : [ref.trim()];
    for (const one of refs) {
      if (!one || /^(https?:|mailto:|tel:|data:|javascript:|#)/.test(one) || one.includes('${')) continue;
      checked++;
      if (!(await resolveTarget(f, one))) broken.push(`${relative(DIST, f)} → ${one}`);
    }
  }
}
if (broken.length) {
  console.error(`✗ ${broken.length} broken internal link(s):\n  ` + [...new Set(broken)].join('\n  '));
  process.exit(1);
}
console.log(`✓ ${checked} internal links/assets resolve across ${files.length} pages`);
