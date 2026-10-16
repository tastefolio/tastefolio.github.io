// Minimal static file server for local preview (no dependencies).
// Usage: node scripts/serve.mjs [root=.] [port=4173]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, normalize } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || process.argv[3] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.zip': 'application/zip', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml'
};

export function startServer(dir = root, p = port) {
  dir = resolve(dir);
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      let file = normalize(join(dir, decodeURIComponent(url.pathname)));
      if (!file.startsWith(dir)) { res.writeHead(403).end(); return; }
      let s = await stat(file).catch(() => null);
      if (s?.isDirectory()) { file = join(file, 'index.html'); s = await stat(file).catch(() => null); }
      if (!s) {
        const nf = await readFile(join(dir, '404.html')).catch(() => null);
        res.writeHead(404, { 'content-type': types['.html'] }).end(nf || 'Not found');
        return;
      }
      res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(await readFile(file));
    } catch (e) { res.writeHead(500).end(String(e)); }
  });
  return new Promise((ok) => server.listen(p, () => ok(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await startServer();
  console.log(`Serving ${root} at http://localhost:${port}`);
}
