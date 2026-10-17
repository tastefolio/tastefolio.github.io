// Tastefolio gallery behaviors: search + facets with URL state, preview/view switches, sorting,
// screenshot viewer, tabs, copy buttons, votes and comments (giscus), theme and language preference.
(() => {
  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const store = {
    get: (k) => { try { return localStorage.getItem('tastefolio:' + k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem('tastefolio:' + k, v); } catch { /* ignore */ } },
  };
  const lang = root.lang;
  const nf = new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US');
  const COPY = lang === 'fa' ? { copy: 'کپی', copied: 'کپی شد' } : { copy: 'Copy', copied: 'Copied' };

  // Language preference: remember explicit choices, honor them on the English home page.
  $$('[data-set-lang]').forEach((a) => a.addEventListener('click', () => store.set('lang', a.dataset.setLang)));
  if (lang === 'en' && location.pathname === '/' && store.get('lang') === 'fa' && !location.search.includes('lang=')) {
    location.replace('/fa/' + location.search + location.hash);
    return;
  }

  // Theme
  $$('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    b.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      store.set('theme', next);
      b.setAttribute('aria-pressed', String(next === 'dark'));
      $('iframe.giscus-frame')?.contentWindow.postMessage({ giscus: { setConfig: { theme: giscusTheme() } } }, 'https://giscus.app');
    });
  });

  // Phone menu: the top nav folds under the bar
  const menuBtn = $('[data-menu]'), topnav = $('#topnav');
  if (menuBtn && topnav) {
    const setMenu = (open) => { menuBtn.setAttribute('aria-expanded', String(open)); topnav.toggleAttribute('data-open', open); };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    topnav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('click', (e) => { if (!e.target.closest('#topnav, [data-menu]')) setMenu(false); });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && topnav.hasAttribute('data-open')) { setMenu(false); menuBtn.focus(); } });
    matchMedia('(min-width: 641px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  // Copy buttons (labels follow the page language)
  $$('[data-copy]').forEach((b) => b.setAttribute('aria-label', COPY.copy));
  d.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const text = $(b.dataset.copy)?.innerText.trim() || '';
    try { await navigator.clipboard.writeText(text); } catch { /* blocked */ }
    b.classList.add('is-done');
    b.setAttribute('aria-label', COPY.copied);
    setTimeout(() => { b.classList.remove('is-done'); b.setAttribute('aria-label', COPY.copy); }, 1400);
  });

  // Rows that scroll sideways (chip groups, tab lists) fade at the far edge until you reach it
  const scrollers = $$('.chip-group, .tablist');
  const markScroll = (el) => {
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) { delete el.dataset.scroll; return; }
    el.dataset.scroll = Math.abs(el.scrollLeft) >= max - 1 ? 'end' : 'more';
  };
  scrollers.forEach((el) => el.addEventListener('scroll', () => markScroll(el), { passive: true }));
  const markAll = () => scrollers.forEach(markScroll);
  markAll();
  addEventListener('resize', markAll);
  addEventListener('load', markAll);

  // Tabs (install methods)
  $$('[role="tablist"]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const select = (t, focus) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        d.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const rtl = root.dir === 'rtl';
        const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
        if (next) { e.preventDefault(); select(tabs[(i + next + tabs.length) % tabs.length], true); }
        if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
        if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });

  // Segmented controls helper
  const segValue = (el) => $('[aria-pressed="true"]', el)?.dataset.value;
  const segSet = (el, v) => $$('button', el).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === v)));

  // Screenshot viewer on detail pages
  const viewer = $('[data-viewer]');
  if (viewer) {
    const paint = () => {
      const key = `${segValue($('[data-viewer-demo]', viewer))}-${segValue($('[data-viewer-lang]', viewer))}`;
      $$('[data-pane]', viewer).forEach((p) => { p.hidden = p.dataset.pane !== key; });
    };
    $$('[data-viewer-demo] button, [data-viewer-lang] button', viewer).forEach((b) => b.addEventListener('click', () => {
      segSet(b.parentElement, b.dataset.value);
      paint();
    }));
  }

  // Votes and comments: giscus (GitHub Discussions) loads as its section comes near, in the gallery's theme.
  // Back from GitHub sign-in the URL carries ?giscus=…, which giscus has to read right away.
  function giscusTheme() { return `${location.origin}/assets/giscus-${root.dataset.theme === 'dark' ? 'dark' : 'light'}.css`; }
  const giscusBox = $('[data-giscus]');
  if (giscusBox) {
    const load = () => {
      const s = d.createElement('script');
      const { giscus, ...thread } = giscusBox.dataset; // the box's data-* (repo, category, term, lang) minus its own marker
      Object.assign(s.dataset, thread, { mapping: 'specific', strict: '1', reactionsEnabled: '1', emitMetadata: '0', inputPosition: 'top', theme: giscusTheme(), loading: 'lazy' });
      s.src = 'https://giscus.app/client.js';
      s.crossOrigin = 'anonymous';
      s.async = true;
      giscusBox.after(s);
    };
    if (/[?&]giscus=/.test(location.search) || !('IntersectionObserver' in window)) load();
    else {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: '600px 0px' });
      io.observe(giscusBox);
    }
  }

  // Browser: search + facets
  const cardsEl = $('[data-cards]');
  if (!cardsEl) return;
  const cards = $$('[data-item]', cardsEl);
  const search = $('[data-search]');
  const persian = $('[data-persian]');
  const groups = $$('.chip-group[data-key]');
  const preview = $('[data-preview]');
  const view = $('[data-view]');
  const sort = $('[data-sort]');
  const sortDefault = sort.dataset.default || 'curated';
  const results = $('[data-results]');
  const clears = $$('[data-clear]');
  const empty = $('[data-empty]');
  const dens = { airy: 0, balanced: 1, dense: 2 };
  const norm = (s) => (s || '').toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ');
  cards.forEach((c) => { c._hay = norm(c.dataset.keywords); });

  function readUrl() {
    const p = new URLSearchParams(location.search);
    if (p.get('q')) search.value = p.get('q');
    groups.forEach((g) => { const v = p.get(g.dataset.key); if (v && $(`[data-value="${CSS.escape(v)}"]`, g)) segSet(g, v); });
    if (p.get('fa') === '1') persian.checked = true;
    const pv = p.get('preview') || store.get('preview');
    if (pv) segSet(preview, pv);
    const vw = p.get('view') || store.get('view');
    if (vw) segSet(view, vw);
    if (p.get('sort') && $(`option[value="${CSS.escape(p.get('sort'))}"]`, sort)) sort.value = p.get('sort');
  }
  function writeUrl() {
    const p = new URLSearchParams();
    if (search.value.trim()) p.set('q', search.value.trim());
    groups.forEach((g) => { const v = segValue(g); if (v && v !== 'all') p.set(g.dataset.key, v); });
    if (persian.checked) p.set('fa', '1');
    if (segValue(preview) !== 'site') p.set('preview', segValue(preview));
    if (segValue(view) !== 'grid') p.set('view', segValue(view));
    if (sort.value !== sortDefault) p.set('sort', sort.value);
    const qs = p.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
  }
  function apply() {
    const q = norm(search.value.trim());
    const terms = q.split(/\s+/).filter(Boolean);
    const want = Object.fromEntries(groups.map((g) => [g.dataset.key, segValue(g)]));
    // a card matches when it passes the search, the Persian-first box and every facet (optionally ignoring one)
    const match = (c, skip) => {
      if (!terms.every((t) => c._hay.includes(t))) return false;
      if (persian.checked && c.dataset.persian !== 'yes') return false;
      for (const [k, v] of Object.entries(want)) if (k !== skip && v && v !== 'all' && c.dataset[k] !== v) return false;
      return true;
    };
    let n = 0;
    for (const c of cards) {
      const ok = match(c);
      c.hidden = !ok;
      if (ok) n++;
    }
    // facet counts answer "how many would I see if I picked this?", given everything else that is set
    for (const g of groups) {
      const key = g.dataset.key, pool = cards.filter((c) => match(c, key));
      for (const b of $$('button[data-value]', g)) {
        const v = b.dataset.value, cnt = v === 'all' ? pool.length : pool.filter((c) => c.dataset[key] === v).length;
        const out = $('.chip-n', b);
        if (out) out.textContent = nf.format(cnt);
        b.toggleAttribute('data-zero', cnt === 0);
      }
    }
    const by = {
      top: (a, b) => b.dataset.votes - a.dataset.votes || a.dataset.order - b.dataset.order,
      curated: (a, b) => a.dataset.order - b.dataset.order,
      az: (a, b) => a.dataset.name.localeCompare(b.dataset.name),
      dense: (a, b) => dens[b.dataset.density] - dens[a.dataset.density] || a.dataset.order - b.dataset.order,
      airy: (a, b) => dens[a.dataset.density] - dens[b.dataset.density] || a.dataset.order - b.dataset.order,
    }[sort.value];
    cardsEl.append(...cards.slice().sort(by));
    results.textContent = (n === 1 && results.dataset.tplOne ? results.dataset.tplOne : results.dataset.tpl).replace('{n}', nf.format(n));
    empty.hidden = n > 0;
    const dirty = !!q || persian.checked || Object.values(want).some((v) => v && v !== 'all');
    clears.forEach((b) => { if (b.closest('.results-bar')) b.hidden = !dirty; });
    cardsEl.dataset.previewMode = segValue(preview);
    cardsEl.dataset.viewMode = segValue(view);
    writeUrl();
  }
  readUrl();
  apply();
  search.addEventListener('input', apply);
  persian.addEventListener('change', apply);
  sort.addEventListener('change', apply);
  [...groups, preview, view].forEach((g) => g.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-value]');
    if (!b) return;
    segSet(g, b.dataset.value);
    if (g === preview) store.set('preview', b.dataset.value);
    if (g === view) store.set('view', b.dataset.value);
    apply();
  }));
  clears.forEach((b) => b.addEventListener('click', () => {
    search.value = '';
    persian.checked = false;
    groups.forEach((g) => segSet(g, 'all'));
    apply();
    search.focus();
  }));
  d.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(d.activeElement?.tagName)) {
      e.preventDefault();
      search.focus();
      search.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (e.key === 'Escape' && d.activeElement === search && search.value) { search.value = ''; apply(); }
  });
})();
