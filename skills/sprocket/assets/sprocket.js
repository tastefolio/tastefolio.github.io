/*!
 * Sprocket — film behaviours for the Tastefolio "Sprocket" skill. MIT License. Needs kit.js (window.tf).
 *   Scenes    [data-scene="peaks|sea|city|desert|forest|night|tea|pomegranate" data-tone="0-3"] → an SVG photo
 *   Likes     .act.like toggles and moves the post's [data-likes]; double-tap a .print photo to like with a heart
 *   Toggles   .act[aria-pressed] (save), .follow[aria-pressed] with data-on-fa/en and data-off-fa/en labels
 *   Comments  form.add-comment appends to its post's .post-meta
 *   Stories   .story[data-scenes="sea,city" data-name data-say-fa data-say-en] open dialog#story with timed bars
 *   Picks     .cell[data-pick="circle|cross"] get a grease-pencil mark
 *   Filters   [data-filters] buttons with data-css restyle [data-filter-target]
 *   Viewer    .cell[data-view] fills dialog#viewer (scene, tone, data-caption-fa/en, data-likes) and opens it
 */
(() => {
  'use strict';
  const d = document;
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const tf = () => window.tf;
  const still = () => tf().reduceMotion || d.documentElement.hasAttribute('data-shot');
  const fa = () => tf().lang() === 'fa';
  const pick = (el, key) => el?.dataset[key + (fa() ? 'Fa' : 'En')] || '';

  // ---------------------------------------------------------------- scenes
  const TONES = [
    { s1: '#f6b26b', s2: '#f07b5c', sun: '#ffe7a1', a: '#7b3d57', b: '#3a1d2c', c: '#f25c54' },   // dusk
    { s1: '#9fd3ee', s2: '#e8f4fa', sun: '#fff4cf', a: '#5d8a87', b: '#2c4a4a', c: '#bfe0c2' },   // morning
    { s1: '#26285a', s2: '#7a5a98', sun: '#f6e6bf', a: '#1b1c39', b: '#0d0e21', c: '#e8896a' },   // violet night
    { s1: '#f8dcc3', s2: '#e5ad97', sun: '#fffaf2', a: '#c47862', b: '#874c3d', c: '#e2402f' },   // rose desert
  ];
  const hills = (y, amp, f, ph) => { let p = `M0 ${y}`; for (let x = 0; x <= 100; x += 4) p += `L${x} ${(y - amp * (Math.sin(x * f + ph) * 0.6 + Math.sin(x * f * 2.3 + ph) * 0.4)).toFixed(1)}`; return p + 'L100 100L0 100Z'; };
  const SCENES = {
    peaks: (t) => `<rect width="100" height="100" fill="url(#g)"/><circle cx="68" cy="34" r="11" fill="${t.sun}"/><path d="M-5 78 L28 30 L40 46 L52 26 L72 52 L84 40 L110 78 Z" fill="${t.a}"/><path d="M28 30 L33 37 L30 38 L26 35 Z M52 26 L57 33 L53 33 L49 31 Z" fill="#fff" opacity=".85"/><path d="${hills(82, 5, .09, 1)}" fill="${t.b}"/>`,
    sea: (t) => `<rect width="100" height="100" fill="url(#g)"/><circle cx="50" cy="52" r="15" fill="${t.sun}"/><rect y="56" width="100" height="44" fill="${t.a}"/>${[60, 66, 73, 81, 90].map((y, i) => `<rect x="${30 - i * 6}" y="${y}" width="${40 + i * 12}" height="${1 + i * 0.4}" fill="${t.sun}" opacity="${0.55 - i * 0.08}"/>`).join('')}<path d="M0 56 H100" stroke="${t.b}" stroke-width=".6"/>`,
    city: (t) => `<rect width="100" height="100" fill="url(#g)"/><circle cx="26" cy="30" r="9" fill="${t.sun}"/>${[[4, 52, 12], [16, 44, 9], [25, 58, 14], [39, 40, 10], [49, 50, 13], [62, 36, 8], [70, 48, 12], [82, 42, 14]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${100 - y}" fill="${t.a}"/><rect x="${x + w / 2 - 1.5}" y="${y - 7}" width="3" height="7" fill="${t.a}"/>`).join('')}<rect y="78" width="100" height="22" fill="${t.b}"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${6 + i * 6.6}" y="${62 + (i % 3) * 5}" width="1.6" height="2.4" fill="${t.sun}" opacity=".8"/>`).join('')}`,
    desert: (t) => `<rect width="100" height="100" fill="url(#g)"/><circle cx="72" cy="30" r="12" fill="${t.sun}"/><path d="${hills(66, 8, .05, 2)}" fill="${t.a}"/><path d="${hills(80, 6, .07, 4)}" fill="${t.b}"/>`,
    forest: (t) => `<rect width="100" height="100" fill="url(#g)"/><path d="${hills(54, 8, .08, .5)}" fill="${t.c}" opacity=".7"/><path d="${hills(66, 9, .06, 2.5)}" fill="${t.a}"/>${Array.from({ length: 11 }, (_, i) => { const x = i * 10 + 2, h = 18 + (i % 4) * 5; return `<path d="M${x} 88 L${x + 5} ${88 - h} L${x + 10} 88 Z" fill="${t.b}"/>`; }).join('')}<rect y="86" width="100" height="14" fill="${t.b}"/>`,
    night: (t) => `<rect width="100" height="100" fill="url(#g)"/>${Array.from({ length: 34 }, (_, i) => `<circle cx="${(i * 37) % 100}" cy="${(i * 23) % 55}" r="${0.3 + (i % 3) * 0.25}" fill="#fff" opacity="${0.4 + (i % 4) * 0.15}"/>`).join('')}<circle cx="74" cy="24" r="8" fill="${t.sun}"/><circle cx="77" cy="21" r="7" fill="${t.s1}"/><path d="${hills(76, 7, .07, 3)}" fill="${t.b}"/>`,
    tea: (t) => `<rect width="100" height="100" fill="${t.s2}"/><circle cx="50" cy="56" r="34" fill="${t.sun}" opacity=".55"/><path d="M34 34 H66 L62 82 Q50 88 38 82 Z" fill="#fff" opacity=".55"/><path d="M36 46 H64 L61 80 Q50 85 39 80 Z" fill="${t.c}" opacity=".9"/><ellipse cx="50" cy="46" rx="14" ry="2.4" fill="#fff" opacity=".5"/><path d="M45 26 Q41 20 46 14 M54 26 Q50 20 55 14" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/>`,
    pomegranate: (t) => `<rect width="100" height="100" fill="${t.s1}"/><ellipse cx="50" cy="84" rx="40" ry="6" fill="${t.b}" opacity=".18"/><circle cx="36" cy="58" r="22" fill="${t.c}"/><path d="M30 37 L33 30 L36 36 L39 30 L42 37 Z" fill="${t.c}"/><ellipse cx="29" cy="50" rx="5" ry="3" fill="#fff" opacity=".3"/><circle cx="70" cy="66" r="17" fill="#fbe1d8" stroke="${t.c}" stroke-width="3"/>${Array.from({ length: 22 }, (_, i) => { const a = i * 2.4, r = 3 + (i % 5) * 2.2; return `<circle cx="${(70 + r * Math.cos(a)).toFixed(1)}" cy="${(66 + r * Math.sin(a)).toFixed(1)}" r="1.7" fill="${t.c}"/>`; }).join('')}`,
  };
  function drawScene(el) {
    const kind = SCENES[el.dataset.scene] ? el.dataset.scene : 'peaks';
    const t = TONES[Number(el.dataset.tone || 0) % TONES.length];
    const id = 'g' + Math.random().toString(36).slice(2, 7);
    const body = SCENES[kind](t).replaceAll('url(#g)', `url(#${id})`);
    const old = el.querySelector(':scope > svg');
    const svg = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.s1}"/><stop offset="1" stop-color="${t.s2}"/></linearGradient></defs>${body}</svg>`;
    if (old) old.outerHTML = svg; else el.insertAdjacentHTML('afterbegin', svg);
  }

  // ---------------------------------------------------------------- grease-pencil marks
  function roughCircle(seed) {
    let r = seed;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    let p = '';
    for (let i = 0; i <= 26; i++) {
      const a = (i / 24) * Math.PI * 2 - 0.4, k = 1 + (rnd() - 0.5) * 0.08;
      p += `${i ? 'L' : 'M'}${(50 + 47 * k * Math.cos(a)).toFixed(1)} ${(50 + 45 * k * Math.sin(a)).toFixed(1)}`;
    }
    return p;
  }
  function mark(cell, i) {
    const kind = cell.dataset.pick;
    const path = kind === 'cross' ? 'M18 18 L82 84 M84 20 L20 80' : roughCircle(17 + i * 31);
    cell.insertAdjacentHTML('beforeend', `<svg class="mark${still() ? '' : ' draw'}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${path}"/></svg>`);
  }

  // ---------------------------------------------------------------- likes, toggles, comments
  function setLiked(post, on) {
    const btn = post.querySelector('.act.like');
    if (!btn || (btn.getAttribute('aria-pressed') === 'true') === on) return;
    btn.setAttribute('aria-pressed', String(on));
    const count = post.querySelector('[data-likes]');
    if (count) { const n = Number(count.dataset.likes) + (on ? 1 : -1); count.dataset.likes = n; count.dataset.num = n; count.textContent = tf().fmt(n); }
  }
  function label(btn) {
    const on = btn.getAttribute('aria-pressed') === 'true';
    const text = pick(btn, on ? 'on' : 'off');
    if (text) btn.textContent = text;
  }

  // ---------------------------------------------------------------- stories
  let story = null;
  function showStory(i, frame = 0) {
    const dlg = d.getElementById('story');
    const list = $$('.stories .story[data-scenes]');
    if (!dlg || !list[i]) { dlg?.close(); return; }
    const s = list[i], scenes = s.dataset.scenes.split(',');
    if (frame >= scenes.length) return showStory(i + 1, 0);
    if (frame < 0) return showStory(Math.max(0, i - 1), 0);
    story = { i, frame, n: scenes.length, t0: performance.now() };
    const stage = dlg.querySelector('.scene');
    stage.dataset.scene = scenes[frame];
    stage.dataset.tone = (Number(s.dataset.tone || 0) + frame) % 4;
    drawScene(stage);
    dlg.querySelector('[data-story-name]').textContent = (s.querySelector('[data-label]') || s).textContent.trim();
    dlg.querySelector('[data-story-say]').textContent = pick(s, 'say');
    const av = dlg.querySelector('[data-story-avatar]');
    av.style.setProperty('--c', getComputedStyle(s.querySelector('.avatar')).getPropertyValue('--c'));
    av.textContent = s.querySelector('.avatar').textContent;
    dlg.querySelector('.story-bars').innerHTML = scenes.map((_, k) => `<i style="--p:${k < frame ? 100 : 0}%"></i>`).join('');
    s.querySelector('.ring')?.classList.add('seen');
    if (!dlg.open) dlg.showModal();
  }
  function tickStory() {
    const dlg = d.getElementById('story');
    if (story && dlg?.open && !still()) {
      const p = Math.min(100, ((performance.now() - story.t0) / 4500) * 100);
      dlg.querySelectorAll('.story-bars i')[story.frame]?.style.setProperty('--p', p + '%');
      if (p >= 100) showStory(story.i, story.frame + 1);
    }
    requestAnimationFrame(tickStory);
  }

  function init() {
    $$('[data-scene]').forEach(drawScene);
    $$('.follow[aria-pressed]').forEach(label); // the language may have switched before this script started
    $$('.cell[data-pick]').forEach(mark);

    d.addEventListener('click', (e) => {
      const t = e.target;
      const like = t.closest?.('.act.like');
      if (like) { const post = like.closest('.post'); setLiked(post, like.getAttribute('aria-pressed') !== 'true'); return; }
      const act = t.closest?.('.act[aria-pressed], .follow[aria-pressed]');
      if (act) {
        act.setAttribute('aria-pressed', String(act.getAttribute('aria-pressed') !== 'true'));
        if (act.classList.contains('follow')) label(act);
        if (act.dataset.toastOnFa && act.getAttribute('aria-pressed') === 'true') tf().toast(pick(act, 'toastOn'));
        return;
      }
      const st = t.closest?.('.story[data-scenes]');
      if (st) { showStory($$('.stories .story[data-scenes]').indexOf(st)); return; }
      if (t.closest?.('.story-tap.next') && story) { showStory(story.i, story.frame + 1); return; }
      if (t.closest?.('.story-tap.prev') && story) { showStory(story.i, story.frame - 1); return; }
      const f = t.closest?.('[data-filters] button');
      if (f) {
        $$('button', f.parentElement).forEach((b) => b.setAttribute('aria-pressed', String(b === f)));
        $$('[data-filter-target]').forEach((x) => { x.style.filter = f.dataset.css || 'none'; });
        return;
      }
      const cell = t.closest?.('.cell[data-view]');
      if (cell) {
        const dlg = d.getElementById('viewer');
        if (!dlg) return;
        const sc = dlg.querySelector('.scene');
        sc.dataset.scene = cell.querySelector('.scene').dataset.scene;
        sc.dataset.tone = cell.querySelector('.scene').dataset.tone;
        drawScene(sc);
        dlg.querySelector('[data-viewer-caption]').textContent = pick(cell, 'caption');
        const likes = dlg.querySelector('[data-viewer-likes]');
        if (likes) likes.textContent = tf().fmt(cell.dataset.likes || 0);
        dlg.showModal();
      }
    });
    d.addEventListener('dblclick', (e) => {
      const photo = e.target.closest?.('.print .scene');
      if (!photo) return;
      const post = photo.closest('.post');
      setLiked(post, true);
      const pop = post.querySelector('.heart-pop');
      if (pop && !still()) { pop.classList.remove('go'); void pop.offsetWidth; pop.classList.add('go'); }
    });
    d.addEventListener('input', (e) => {
      const form = e.target.closest?.('form.add-comment');
      if (form) form.querySelector('button').disabled = !e.target.value.trim();
    });
    $$('form.add-comment button').forEach((b) => { b.disabled = true; });
    d.addEventListener('submit', (e) => {
      const form = e.target.closest?.('form.add-comment');
      if (!form) return;
      e.preventDefault();
      const input = form.querySelector('input');
      const text = input.value.trim();
      if (!text) return;
      const p = d.createElement('p');
      p.className = 'comment';
      const b = d.createElement('b');
      b.textContent = form.dataset.me || 'you';
      p.append(b, d.createTextNode(text));
      form.closest('.post').querySelector('.post-meta').append(p);
      input.value = '';
      form.querySelector('button').disabled = true;
    });
    d.getElementById('story')?.addEventListener('close', () => { story = null; });
    requestAnimationFrame(tickStory);
    d.addEventListener('tf:lang', () => setTimeout(() => {
      $$('.follow[aria-pressed]').forEach(label);
    }));
  }
  if (window.tf && d.documentElement.classList.contains('tf-ready')) init();
  else d.addEventListener('tf:ready', init, { once: true });
})();
