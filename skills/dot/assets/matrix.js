/* Dot — LED matrix (Tastefolio). A 15×15 dot display, a dot editor and dot bar charts; no dependencies.
 *
 *   <div class="matrix" data-matrix="clock" role="img" aria-label="…"></div>
 *     faces: clock (data-value="10:09", otherwise the real time), timer (data-value="25/60"), eq, weather,
 *            bell (data-value = unread count), battery (data-value = percent), wink, heart, coffee, moon;
 *     or data-bits="225 digits (0 off · 1 white · 2 red)" for your own glyph. data-n="9" draws the 9×9 wink.
 *   <div class="matrix" data-matrix-edit aria-label="…"></div>
 *     a grid of toggle buttons: arrow keys move, Space/Enter toggles, drag paints; data-tool="pen|erase",
 *     data-ink="1|2"; fires "dot:change" with { bits }.
 *   <div class="dotbars" data-dotbars="3,5,8,…" data-hl="14" data-rows="7" role="img" aria-label="…"></div>
 *
 *   window.dotMatrix = { N, glyph(name, value, t), paint(el, grid), render(el), bits(grid), parse(bits),
 *                        editor: { get(el), set(el, grid), clear(el), invert(el) }, bars(el) }
 * Animated faces (clock, timer, eq, wink) run only while visible and hold still under prefers-reduced-motion
 * (and in ?shot=1 captures). The matrix is a display, not text: it never mirrors in RTL. */
(() => {
  'use strict';
  const N = 15, C = 7, AREA = N * N;
  const shot = new URLSearchParams(location.search).has('shot');
  const still = () => shot || (window.tf && tf.reduceMotion) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = (n = N) => new Uint8Array(n * n);
  // round half away from the centre so glyphs stay symmetric
  const rnd = (v) => (v >= C ? Math.floor(v + 0.5) : Math.ceil(v - 0.5));
  const set = (g, x, y, v = 1) => { x = rnd(x); y = rnd(y); if (x >= 0 && x < N && y >= 0 && y < N) g[y * N + x] = v; };
  const line = (g, x0, y0, x1, y1, v = 1) => { const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2) || 1; for (let i = 0; i <= n; i++) set(g, x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, v); };
  const sprite = (g, rows, n = N) => rows.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') g[y * n + x] = 1; else if (c === 'o') g[y * n + x] = 2; }));

  const RING = ['.....#####.....', '...##.....##...', '..#.........#..', '.#...........#.', '.#...........#.', '#.............#', '#.............#', '#.............#', '#.............#', '#.............#', '.#...........#.', '.#...........#.', '..#.........#..', '...##.....##...', '.....#####.....'];
  const SPRITES = {
    heart: ['...............', '...............', '..ooo.....ooo..', '.ooooo...ooooo.', 'ooooooooooooooo', 'ooooooooooooooo', 'ooooooooooooooo', '.ooooooooooooo.', '..ooooooooooo..', '...ooooooooo...', '....ooooooo....', '.....ooooo.....', '......ooo......', '.......o.......', '...............'],
    coffee: ['...............', '....o...o......', '.....o...o.....', '....o...o......', '...............', '..#########....', '..#.......###..', '..#.......#.#..', '..#.......#.#..', '..#.......###..', '..#.......#....', '...#.....#.....', '....#####......', '...............', '.#############.'],
    bell: ['...............', '.......#.......', '......###......', '.....#...#.....', '....#.....#....', '....#.....#....', '....#.....#....', '...#.......#...', '...#.......#...', '..#.........#..', '.#############.', '...............', '......###......', '...............', '...............'],
    battery: ['...............', '...............', '...............', '...............', '.###########...', '.#.........#...', '.#.........###.', '.#.........#.#.', '.#.........###.', '.#.........#...', '.###########...', '...............', '...............', '...............', '...............'],
    wink9: ['..#####..', '.#.....#.', '#.......#', '#.#...#.#', '#.......#', '#.#...#.#', '#..###..#', '.#.....#.', '..#####..'],
  };
  const PERIMETER = (() => { const p = []; for (let x = C; x < N; x++) p.push([x, 0]); for (let y = 1; y < N; y++) p.push([N - 1, y]); for (let x = N - 2; x >= 0; x--) p.push([x, N - 1]); for (let y = N - 2; y >= 0; y--) p.push([0, y]); for (let x = 1; x < C; x++) p.push([x, 0]); return p; })();

  const faces = {
    clock(v) {
      let h, m;
      if (/^\d{1,2}:\d{2}$/.test(v || '')) [h, m] = v.split(':').map(Number);
      else if (shot) [h, m] = [10, 9];
      else { const d = new Date(); h = d.getHours(); m = d.getMinutes(); }
      const g = G();
      for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; set(g, C + 7 * Math.sin(a), C - 7 * Math.cos(a), k === 0 ? 2 : 1); }
      const am = m / 60 * 2 * Math.PI, ah = ((h % 12) + m / 60) / 12 * 2 * Math.PI;
      line(g, C, C, C + 5.4 * Math.sin(am), C - 5.4 * Math.cos(am));
      line(g, C, C, C + 3.6 * Math.sin(ah), C - 3.6 * Math.cos(ah));
      set(g, C, C, 2);
      return g;
    },
    timer(v, t) {
      const [a, b] = String(v || '25/60').split('/').map(Number);
      const frac = Math.max(0, Math.min(1, b ? a / b : a)), lit = Math.round(PERIMETER.length * frac);
      const g = G();
      PERIMETER.forEach(([x, y], i) => { if (i < lit) set(g, x, y, 2); });
      if (t !== undefined && lit < PERIMETER.length && Math.floor(t * 2) % 2) { const [x, y] = PERIMETER[lit]; set(g, x, y, 2); }
      sprite(g, ['...............', '...............', '...............', '...............', '....#######....', '.....#...#.....', '......#.#......', '.......#.......', '......#.#......', '.....#.#.#.....', '....#######....']);
      return g;
    },
    eq(v, t) {
      const g = G(), still = [5, 9, 12, 7, 10, 6, 3];
      for (let i = 0; i < 7; i++) {
        const h = t === undefined ? still[i] : 2 + Math.round(10.5 * Math.abs(Math.sin(t * (1.3 + i * .17) + i * .9) * Math.cos(t * .55 + i * .4)));
        const x = 1 + i * 2;
        for (let k = 0; k < h; k++) set(g, x, 13 - k, k === h - 1 ? 2 : 1);
      }
      return g;
    },
    weather() {
      const g = G(), inCloud = (x, y) => y <= 11.6 && (Math.hypot(x - 6.6, y - 9.4) <= 2.6 || Math.hypot(x - 9.6, y - 7.9) <= 3.3 || Math.hypot(x - 12.1, y - 9.7) <= 2.2 || (y >= 9.4 && x >= 6 && x <= 12.4));
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (Math.hypot(x - 4, y - 4) <= 2.3 && !inCloud(x, y)) g[y * N + x] = 2;
      [[4, 0], [0, 4], [8, 4], [1, 1], [7, 1], [1, 7]].forEach(([x, y]) => { if (!inCloud(x, y)) set(g, x, y, 2); });
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (inCloud(x, y) && (!inCloud(x + 1, y) || !inCloud(x - 1, y) || !inCloud(x, y + 1) || !inCloud(x, y - 1))) g[y * N + x] = 1;
      return g;
    },
    bell(v) { const g = G(); sprite(g, SPRITES.bell); if (Number(v) > 0) [[11, 1], [12, 1], [11, 2], [12, 2]].forEach(([x, y]) => set(g, x, y, 2)); return g; },
    battery(v) {
      const p = Math.max(0, Math.min(100, Number(v ?? 72))), cols = Math.round(p / 100 * 8), g = G();
      sprite(g, SPRITES.battery);
      for (let y = 6; y <= 8; y++) for (let x = 0; x < cols; x++) set(g, 3 + x, y, p <= 20 ? 2 : 1);
      return g;
    },
    wink(v, t, n = N) {
      if (n === 9) { const g = G(9); sprite(g, SPRITES.wink9, 9); if (t === undefined || t % 4.2 < .5) [5, 6, 7].forEach((x) => { g[3 * 9 + x] = 2; }); return g; }
      const g = G(); sprite(g, RING);
      [[4, 4], [4, 5]].forEach(([x, y]) => set(g, x, y));
      if (t === undefined || t % 4.2 < .5) [[9, 5], [10, 5], [11, 5]].forEach(([x, y]) => set(g, x, y, 2));
      else [[10, 4], [10, 5]].forEach(([x, y]) => set(g, x, y));
      [[3, 8], [11, 8], [4, 9], [10, 9], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10]].forEach(([x, y]) => set(g, x, y));
      return g;
    },
    heart() { const g = G(); sprite(g, SPRITES.heart); return g; },
    coffee() { const g = G(); sprite(g, SPRITES.coffee); return g; },
    moon() { const g = G(); for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (Math.hypot(x - 7, y - 7) <= 6.4 && Math.hypot(x - 10.6, y - 5.6) > 5.8) g[y * N + x] = 1; set(g, 11, 4, 2); set(g, 13, 8, 1); return g; },
  };
  const ANIMATED = new Set(['clock', 'timer', 'eq', 'wink']);

  const glyph = (name, value, t, n = N) => (faces[name] ? faces[name](value, t, n) : G(n));
  const bits = (g) => Array.from(g).join('');
  const parse = (s, n = N) => { const g = G(n); [...String(s || '').replace(/[^012]/g, '')].slice(0, n * n).forEach((c, i) => { g[i] = +c; }); return g; };
  const dots = (el, n) => {
    if (el._n !== n) { el._n = n; el.style.setProperty('--cols', n); el.replaceChildren(...Array.from({ length: n * n }, () => document.createElement('i'))); }
    return el.children;
  };
  const paint = (el, g) => {
    const n = Math.round(Math.sqrt(g.length)), d = dots(el, n);
    for (let i = 0; i < g.length; i++) { const c = g[i] === 2 ? 'red' : g[i] ? 'on' : ''; if (d[i].className !== c) d[i].className = c; }
  };
  const render = (el, t) => {
    const n = Number(el.dataset.n) || N;
    paint(el, el.dataset.bits ? parse(el.dataset.bits, n) : glyph(el.dataset.matrix, el.dataset.value, t, n));
  };

  // ---------------------------------------------------------------- editor
  const fa = () => (document.documentElement.lang || '').startsWith('fa');
  const num = (v) => (fa() ? new Intl.NumberFormat('fa-IR').format(v) : String(v));
  const cellLabel = (i) => { const r = Math.floor(i / N) + 1, c = (i % N) + 1; return fa() ? `ردیف ${num(r)}، ستون ${num(c)}` : `Row ${r}, column ${c}`; };
  const setCell = (b, v) => { b.dataset.v = v; b.className = v === 2 ? 'red' : v ? 'on' : ''; b.setAttribute('aria-pressed', String(v > 0)); };
  const editor = {
    init(el) {
      el.classList.add('matrix', 'is-edit');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'group');
      el.style.setProperty('--cols', N);
      el.replaceChildren(...Array.from({ length: AREA }, (_, i) => { const b = document.createElement('button'); b.type = 'button'; b.tabIndex = i === 0 ? 0 : -1; b.setAttribute('aria-label', cellLabel(i)); setCell(b, 0); return b; }));
      const cells = el.children, idx = (b) => Array.prototype.indexOf.call(cells, b);
      const changed = () => el.dispatchEvent(new CustomEvent('dot:change', { bubbles: true, detail: { bits: bits(editor.get(el)) } }));
      const next = (b) => { const ink = Number(el.dataset.ink) || 1; if (el.dataset.tool === 'erase') return 0; return Number(b.dataset.v) === ink ? 0 : ink; };
      const focusAt = (j) => { Array.prototype.forEach.call(cells, (c) => { c.tabIndex = -1; }); cells[j].tabIndex = 0; cells[j].focus(); };
      el.addEventListener('keydown', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const i = idx(b), col = i % N;
        const to = { ArrowRight: col < N - 1 ? i + 1 : -1, ArrowLeft: col > 0 ? i - 1 : -1, ArrowDown: i + N < AREA ? i + N : -1, ArrowUp: i - N, Home: i - col, End: i - col + N - 1 }[e.key];
        if (to === undefined) return;
        e.preventDefault();
        if (to >= 0) focusAt(to);
      });
      // keyboard and assistive-tech activation arrive as clicks with detail 0; pointers paint on pointerdown
      el.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b && e.detail === 0) { setCell(b, next(b)); changed(); } });
      let paintV = null;
      el.addEventListener('pointerdown', (e) => {
        const b = e.target.closest('button'); if (!b || e.button) return;
        e.preventDefault(); focusAt(idx(b)); paintV = next(b); setCell(b, paintV);
      });
      el.addEventListener('pointermove', (e) => {
        if (paintV === null) return;
        const b = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('button');
        if (b && b.parentElement === el && Number(b.dataset.v) !== paintV) setCell(b, paintV);
      });
      const end = () => { if (paintV !== null) { paintV = null; changed(); } };
      addEventListener('pointerup', end); addEventListener('pointercancel', end);
      document.addEventListener('tf:lang', () => Array.prototype.forEach.call(cells, (b, i) => b.setAttribute('aria-label', cellLabel(i))));
      el._changed = changed;
    },
    get: (el) => Uint8Array.from(el.children, (b) => Number(b.dataset.v) || 0),
    set(el, g) { Array.prototype.forEach.call(el.children, (b, i) => setCell(b, g[i] || 0)); el._changed?.(); },
    clear(el) { editor.set(el, G()); },
    invert(el) { editor.set(el, editor.get(el).map((v) => (v ? 0 : 1))); },
  };

  // ---------------------------------------------------------------- dot bars
  const bars = (el) => {
    const vals = el.dataset.dotbars.split(',').map(Number), rows = Number(el.dataset.rows) || 7, hl = Number(el.dataset.hl ?? -1);
    const max = Math.max(...vals) || 1, lit = vals.map((v) => Math.round(v / max * rows));
    el.style.setProperty('--cols', vals.length);
    const out = [];
    for (let r = rows - 1; r >= 0; r--) vals.forEach((_, c) => { const i = document.createElement('i'); if (lit[c] > r) i.className = c === hl ? 'red' : 'on'; out.push(i); });
    el.replaceChildren(...out);
  };

  // ---------------------------------------------------------------- boot + one quiet animation loop
  const visible = new Set();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))) : null;
  const t0 = performance.now();
  const init = () => {
    document.querySelectorAll('[data-matrix]').forEach((el) => { render(el, still() ? undefined : 0); io ? io.observe(el) : visible.add(el); });
    document.querySelectorAll('[data-matrix-edit]').forEach((el) => editor.init(el));
    document.querySelectorAll('[data-dotbars]').forEach(bars);
    setInterval(() => {
      if (still()) return;
      const t = (performance.now() - t0) / 1000;
      visible.forEach((el) => { if (ANIMATED.has(el.dataset.matrix) && !el.dataset.bits && !el.closest('[hidden]')) render(el, t); });
    }, 140);
  };
  window.dotMatrix = { N, faces, glyph, paint, render: (el) => render(el, still() ? undefined : (performance.now() - t0) / 1000), bits, parse, editor, bars };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
