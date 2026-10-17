/*!
 * Tastefolio kit runtime — framework-free behaviors shared by every Tastefolio skill.
 * MIT License. Source of truth: shared/kit.js (copied into skills/<name>/assets/kit.js by `npm run sync`).
 *
 * Declarative hooks (all optional):
 *   Language   <html lang="fa" data-alt-lang="en">, [data-alt]="other-language text",
 *              [data-alt-placeholder|aria-label|title|alt|content|value|label], [data-lang-toggle], ?lang=en
 *   Theme      <html data-theme="light|dark">, [data-theme-toggle], ?theme=dark
 *   Brand      ?brand=ff5a36  → sets --brand and a readable --brand-ink
 *   Numbers    [data-num="12840" data-fmt="int|dec1|dec2|pct|pct1|pct2|compact|usd|eur|toman|signed|signedpct|dur"], [data-ago="120"], [data-date="2026-10-12" data-fmt="short|long|day|time"]
 *   Toggles    [data-toggle="#id"] → target[data-open]; target[data-dismissable] closes on outside click / Esc
 *   Tabs       [role=tablist] > [role=tab][aria-controls] with [role=tabpanel]
 *   Pressed    [data-group] > button[aria-pressed]   (radio-like button groups, segmented controls)
 *   Switch     button[role=switch][aria-checked]
 *   Dialogs    [data-dialog="#dialogId"], [data-close], <dialog>
 *   Toasts     tf.toast(text, {tone}), [data-toast="text" data-toast-alt="…"]
 *   Filters    [data-filter-scope] with [data-filter-search], [data-filter="key"] (buttons/select/checkbox),
 *              [data-filter-item data-key="a b"], [data-filter-count], [data-filter-empty]
 *   Sorting    th > button[data-sort="text|num|date"]
 *   Forms      form[data-validate data-success="…" data-success-alt="…"]
 *   Steps      [data-steps] > [data-step], [data-next], [data-prev], [data-step-indicator] > *
 *   When       [data-when="fieldName:value"] shown only while that field has that value
 *   Carousel   [data-carousel] > [data-track], [data-prev-slide], [data-next-slide]
 *   Charts     [data-chart="line|area|bar|stacked|spark|donut|candle"] (data-min/data-max fix the y range; candle: data-ohlc + optional data-volume)
 *   Palette    <dialog data-palette> with input + [data-palette-item]; opens with mod+K or [data-palette-open]
 *   Hotkeys    [data-hotkey="/"] focuses/clicks the element
 *   Reveal     [data-reveal] gets .is-in when visible; [data-countup] animates numbers
 *   Copy       [data-copy="text" | "#selector"]
 *   Grid       [data-grid-toggle] toggles <html data-grid> (for visible layout-grid overlays)
 *   Quantity   [data-qty] > button[data-step="-1|1"] + input
 */
(() => {
  'use strict';
  const d = document;
  const root = d.documentElement;
  const params = new URLSearchParams(location.search);
  const tf = (window.tf = window.tf || {});
  const LOCALES = { fa: 'fa-IR', en: 'en-US', ar: 'ar' };
  const RTL = new Set(['fa', 'ar', 'he', 'ur']);
  const shot = params.has('shot');
  const reduce = shot || matchMedia('(prefers-reduced-motion: reduce)').matches;
  tf.reduceMotion = reduce;
  if (shot) root.setAttribute('data-shot', '');

  const store = {
    get(k) { try { return localStorage.getItem('tf:' + k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem('tf:' + k, v); } catch { /* storage unavailable */ } },
  };
  const $$ = (sel, scope = d) => Array.from(scope.querySelectorAll(sel));
  const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const on = (type, sel, fn) => d.addEventListener(type, (e) => {
    const el = e.target instanceof Element ? e.target.closest(sel) : null;
    if (el) fn(e, el);
  });

  // ---------------------------------------------------------------- base styles (structure only)
  const base = d.createElement('style');
  base.textContent = `
[hidden]{display:none!important}
.tf-toasts{position:fixed;inset-block-end:16px;inset-inline-end:16px;display:grid;gap:8px;z-index:9999;pointer-events:none;max-inline-size:min(92vw,380px)}
.tf-toast{pointer-events:auto}
.tf-chart{position:relative}
.tf-chart{min-inline-size:0}
.tf-chart svg{display:block;inline-size:100%;max-inline-size:100%;overflow:visible}
.tf-tip{position:absolute;pointer-events:none;z-index:5;white-space:nowrap;transform:translate(-50%,calc(-100% - 10px))}
.tf-sr{position:absolute!important;inline-size:1px;block-size:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
[data-shot] *,[data-shot] *::before,[data-shot] *::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;caret-color:transparent!important}
.tf-demo-bar{position:fixed;inset-block-end:14px;inset-inline-start:14px;z-index:9998;display:flex;gap:2px;padding:3px;border-radius:999px;background:rgba(18,18,18,.88);backdrop-filter:blur(8px);font:500 12px/1 system-ui,-apple-system,"Segoe UI",Roboto,Vazirmatn,sans-serif;letter-spacing:0;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.tf-demo-bar a,.tf-demo-bar button{all:unset;cursor:pointer;color:#f4f4f4;padding:8px 11px;border-radius:999px}
.tf-demo-bar a:hover,.tf-demo-bar button:hover{background:rgba(255,255,255,.14)}
.tf-demo-bar a:focus-visible,.tf-demo-bar button:focus-visible{outline:2px solid #fff;outline-offset:1px}
.tf-demo-bar [aria-current]{background:#f4f4f4;color:#111}
[data-shot] .tf-demo-bar{display:none}`;
  d.head.prepend(base);

  // ---------------------------------------------------------------- i18n
  const MSG = {
    en: { copied: 'Copied to clipboard', saved: 'Saved', required: 'This field is required.', email: 'Enter a valid email address.',
      url: 'Enter a valid URL.', short: 'Too short — at least {n} characters.', long: 'Too long — at most {n} characters.',
      pattern: 'Use the requested format.', min: 'Must be {n} or more.', max: 'Must be {n} or less.', number: 'Enter a number.',
      sent: 'Done — submitted successfully.', o: 'Open', h: 'High', l: 'Low', c: 'Close', v: 'Volume', gallery: 'Tastefolio', site: 'Site', dashboard: 'Dashboard', other: 'فارسی' },
    fa: { copied: 'در کلیپ‌بورد کپی شد', saved: 'ذخیره شد', required: 'پر کردن این فیلد لازم است.', email: 'یک ایمیل معتبر وارد کنید.',
      url: 'یک نشانی معتبر وارد کنید.', short: 'کوتاه است — دست‌کم {n} نویسه.', long: 'بلند است — حداکثر {n} نویسه.',
      pattern: 'قالب خواسته‌شده را رعایت کنید.', min: 'باید {n} یا بیشتر باشد.', max: 'باید {n} یا کمتر باشد.', number: 'یک عدد وارد کنید.',
      sent: 'انجام شد — با موفقیت ثبت شد.', o: 'باز', h: 'سقف', l: 'کف', c: 'پایانی', v: 'حجم', gallery: 'تیست‌فولیو', site: 'سایت', dashboard: 'داشبورد', other: 'English' },
  };
  tf.lang = () => (root.lang || 'en').slice(0, 2);
  tf.locale = () => LOCALES[tf.lang()] || tf.lang();
  tf.isRTL = () => root.dir === 'rtl';
  tf.t = (key, vars = {}) => {
    const s = (MSG[tf.lang()] || MSG.en)[key] || MSG.en[key] || key;
    return s.replace(/\{(\w+)\}/g, (_, k) => tf.fmt(vars[k], 'int'));
  };
  /** Pick a value from {en:…, fa:…} objects or return plain values as-is. */
  tf.pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[tf.lang()] ?? v.en ?? Object.values(v)[0]) : v);

  const ALT_ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content', 'value', 'label'];
  function swapLang() {
    const next = root.dataset.altLang;
    if (!next) return;
    root.dataset.altLang = root.lang;
    root.lang = next;
    root.dir = RTL.has(next.slice(0, 2)) ? 'rtl' : 'ltr';
    $$('[data-alt]').forEach((el) => { const cur = el.textContent; el.textContent = el.dataset.alt; el.dataset.alt = cur; });
    for (const a of ALT_ATTRS) {
      const key = 'alt' + cap(camel(a));
      $$(`[data-alt-${a}]`).forEach((el) => {
        const cur = el.getAttribute(a) ?? '';
        el.setAttribute(a, el.dataset[key]);
        el.dataset[key] = cur;
        if (a === 'value' && 'value' in el) el.value = el.getAttribute('value');
      });
    }
    $$('[data-toast-alt]').forEach((el) => { const cur = el.dataset.toast; el.dataset.toast = el.dataset.toastAlt; el.dataset.toastAlt = cur; });
    $$('[data-success-alt]').forEach((el) => { const cur = el.dataset.success; el.dataset.success = el.dataset.successAlt; el.dataset.successAlt = cur; });
    $$('[data-pattern-msg-alt]').forEach((el) => { const cur = el.dataset.patternMsg; el.dataset.patternMsg = el.dataset.patternMsgAlt; el.dataset.patternMsgAlt = cur; });
    renderValues();
    d.dispatchEvent(new CustomEvent('tf:lang', { detail: { lang: tf.lang() } }));
  }
  tf.setLang = (lang) => {
    if (tf.lang() !== lang && root.dataset.altLang && root.dataset.altLang.slice(0, 2) === lang) swapLang();
    syncUrl('lang', tf.lang());
  };
  on('click', '[data-lang-toggle]', () => { swapLang(); syncUrl('lang', tf.lang()); });

  function syncUrl(key, value) {
    try {
      const u = new URL(location.href);
      u.searchParams.set(key, value);
      history.replaceState(history.state, '', u);
    } catch { /* file:// or sandboxed */ }
  }

  // ---------------------------------------------------------------- formatting
  const NF = {};
  const nf = (opts) => {
    const k = tf.locale() + JSON.stringify(opts);
    return (NF[k] ||= new Intl.NumberFormat(tf.locale(), opts));
  };
  tf.fmt = (n, fmt = 'int') => {
    if (n === undefined || n === null || n === '') return '';
    const v = Number(n);
    if (Number.isNaN(v)) return String(n);
    switch (fmt) {
      case 'dec1': return nf({ minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v);
      case 'dec2': return nf({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
      case 'pct': return nf({ style: 'percent', maximumFractionDigits: 0 }).format(v / 100);
      case 'pct1': return nf({ style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(v / 100);
      case 'pct2': return nf({ style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v / 100);
      case 'compact': return nf({ notation: 'compact', maximumFractionDigits: 1 }).format(v);
      case 'usd': return nf({ style: 'currency', currency: 'USD', maximumFractionDigits: v % 1 ? 2 : 0 }).format(v);
      case 'eur': return nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: v % 1 ? 2 : 0 }).format(v);
      case 'toman': return nf({ maximumFractionDigits: 0 }).format(v) + (tf.lang() === 'fa' ? ' تومان' : ' Toman');
      case 'plain': return nf({ useGrouping: false, maximumFractionDigits: 2 }).format(v);
      case 'signed': return (v > 0 ? '+' : '') + nf({ maximumFractionDigits: 2 }).format(v);
      case 'dur': { // seconds → 2m 08s / ۲د ۰۸ث
        const t = Math.round(Math.abs(v)), h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sec = t % 60;
        const u = tf.lang() === 'fa' ? ['س', 'د', 'ث'] : ['h', 'm', 's'];
        const p = (x) => nf({}).format(x), p2 = (x) => nf({ minimumIntegerDigits: 2 }).format(x);
        return h ? `${p(h)}${u[0]} ${p2(m)}${u[1]}` : m ? `${p(m)}${u[1]} ${p2(sec)}${u[2]}` : `${p(sec)}${u[2]}`;
      }
      case 'signedpct': return (v > 0 ? '+' : '') + nf({ style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(v / 100);
      default: return nf({ maximumFractionDigits: 0 }).format(v);
    }
  };
  const DF = {
    short: { month: 'short', day: 'numeric' }, long: { year: 'numeric', month: 'long', day: 'numeric' },
    day: { weekday: 'short' }, month: { month: 'short' }, monthyear: { month: 'short', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' }, datetime: { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  };
  tf.date = (date, fmt = 'short') => new Intl.DateTimeFormat(tf.locale(), DF[fmt] || DF.short).format(new Date(date));
  tf.ago = (seconds) => {
    const rtf = new Intl.RelativeTimeFormat(tf.locale(), { numeric: 'auto', style: 'short' });
    const s = Number(seconds);
    if (s < 60) return rtf.format(-Math.round(s), 'second');
    if (s < 3600) return rtf.format(-Math.round(s / 60), 'minute');
    if (s < 86400) return rtf.format(-Math.round(s / 3600), 'hour');
    return rtf.format(-Math.round(s / 86400), 'day');
  };
  function renderValues(scope = d) {
    $$('[data-num]', scope).forEach((el) => { el.textContent = tf.fmt(el.dataset.num, el.dataset.fmt); });
    $$('[data-date]', scope).forEach((el) => { el.textContent = tf.date(el.dataset.date, el.dataset.fmt); });
    $$('[data-ago]', scope).forEach((el) => { el.textContent = tf.ago(el.dataset.ago); });
  }
  tf.renderValues = renderValues;

  // ---------------------------------------------------------------- theme & brand
  const themeParam = params.get('theme');
  if (themeParam === 'dark' || themeParam === 'light') root.dataset.theme = themeParam;
  on('click', '[data-theme-toggle]', (e, btn) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    btn.setAttribute('aria-pressed', String(next === 'dark'));
    syncUrl('theme', next);
    d.dispatchEvent(new CustomEvent('tf:theme', { detail: { theme: next } }));
  });
  const brand = params.get('brand');
  if (brand && /^[0-9a-f]{3,8}$/i.test(brand)) {
    const hex = '#' + brand;
    root.style.setProperty('--brand', hex);
    const full = brand.length === 3 ? brand.split('').map((c) => c + c).join('') : brand.slice(0, 6);
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
      .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    root.style.setProperty('--brand-ink', (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) ? '#ffffff' : '#111111');
  }

  // ---------------------------------------------------------------- layout grid overlay ([data-grid-toggle] → <html data-grid>)
  on('click', '[data-grid-toggle]', (e, btn) => {
    const onNow = !root.hasAttribute('data-grid');
    root.toggleAttribute('data-grid', onNow);
    btn.setAttribute('aria-pressed', String(onNow));
  });

  // ---------------------------------------------------------------- toggles (menus, drawers, mobile nav)
  const openToggles = new Set();
  function setOpen(target, open, trigger) {
    if (open) target.setAttribute('data-open', ''); else target.removeAttribute('data-open');
    $$(`[data-toggle="#${target.id}"]`).forEach((t) => t.setAttribute('aria-expanded', String(open)));
    if (open) openToggles.add(target); else openToggles.delete(target);
    if (open && target.hasAttribute('data-focus-first')) target.querySelector('a,button,input,select,textarea')?.focus();
    if (!open && trigger === 'esc') d.querySelector(`[data-toggle="#${target.id}"]`)?.focus();
    target.dispatchEvent(new CustomEvent('tf:toggle', { detail: { open } }));
  }
  tf.setOpen = setOpen;
  on('click', '[data-toggle]', (e, btn) => {
    const target = d.querySelector(btn.dataset.toggle);
    if (!target) return;
    e.preventDefault();
    setOpen(target, !target.hasAttribute('data-open'));
  });
  on('click', '[data-dismiss]', (e, btn) => {
    const target = d.querySelector(btn.dataset.dismiss) || btn.closest('[data-open]');
    if (target) setOpen(target, false);
  });
  d.addEventListener('click', (e) => {
    for (const t of openToggles) {
      if (!t.hasAttribute('data-dismissable')) continue;
      const trigger = e.target.closest?.(`[data-toggle="#${t.id}"]`);
      if (!t.contains(e.target) && !trigger) setOpen(t, false);
    }
  });
  d.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const t of openToggles) setOpen(t, false, 'esc');
  });

  // ---------------------------------------------------------------- tabs
  function selectTab(tab, focus) {
    const list = tab?.closest('[role="tablist"]');
    if (!list) return;
    $$('[role="tab"]', list).forEach((t) => {
      const sel = t === tab;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      const panel = d.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !sel;
    });
    if (focus) tab.focus();
    tab.dispatchEvent(new CustomEvent('tf:tab', { bubbles: true, detail: { id: tab.getAttribute('aria-controls') } }));
    requestAnimationFrame(() => drawCharts(d.getElementById(tab.getAttribute('aria-controls')) || d));
  }
  tf.selectTab = selectTab;
  on('click', '[role="tab"]', (e, tab) => { e.preventDefault(); selectTab(tab); });
  on('keydown', '[role="tab"]', (e, tab) => {
    if (!tab.closest('[role="tablist"]')) return;
    const tabs = $$('[role="tab"]', tab.closest('[role="tablist"]'));
    const i = tabs.indexOf(tab);
    const vertical = tab.closest('[role="tablist"]').getAttribute('aria-orientation') === 'vertical';
    const fwd = vertical ? 'ArrowDown' : (tf.isRTL() ? 'ArrowLeft' : 'ArrowRight');
    const back = vertical ? 'ArrowUp' : (tf.isRTL() ? 'ArrowRight' : 'ArrowLeft');
    let n = null;
    if (e.key === fwd) n = tabs[(i + 1) % tabs.length];
    else if (e.key === back) n = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') n = tabs[0];
    else if (e.key === 'End') n = tabs[tabs.length - 1];
    if (n) { e.preventDefault(); selectTab(n, true); }
  });
  function initTabs() {
    $$('[role="tablist"]').forEach((list) => {
      const tabs = $$('[role="tab"]', list);
      const sel = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
      if (sel) selectTab(sel);
    });
  }

  // ---------------------------------------------------------------- pressed groups & switches
  on('click', '[data-group] > [aria-pressed], [data-group] [aria-pressed][data-in-group]', (e, btn) => {
    const group = btn.closest('[data-group]');
    if (group.hasAttribute('data-multi')) btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true'));
    else $$('[aria-pressed]', group).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    group.dispatchEvent(new CustomEvent('tf:change', { bubbles: true, detail: { value: btn.dataset.value } }));
  });
  on('click', 'button[role="switch"]', (e, sw) => {
    const next = sw.getAttribute('aria-checked') !== 'true';
    sw.setAttribute('aria-checked', String(next));
    sw.dispatchEvent(new CustomEvent('tf:switch', { bubbles: true, detail: { checked: next } }));
  });

  // ---------------------------------------------------------------- dialogs
  on('click', '[data-dialog]', (e, btn) => {
    const dlg = d.querySelector(btn.dataset.dialog);
    if (!(dlg instanceof HTMLDialogElement)) return;
    e.preventDefault();
    dlg.showModal();
    dlg.dispatchEvent(new CustomEvent('tf:dialog', { detail: { open: true, trigger: btn } }));
  });
  on('click', '[data-close]', (e, btn) => { btn.closest('dialog')?.close(); });
  d.addEventListener('click', (e) => {
    if (e.target instanceof HTMLDialogElement && e.target.open) {
      const r = e.target.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) e.target.close();
    }
  });

  // ---------------------------------------------------------------- toasts
  let toastBox;
  tf.toast = (text, { tone = 'neutral', timeout = 3200 } = {}) => {
    if (!toastBox) {
      toastBox = d.createElement('div');
      toastBox.className = 'tf-toasts';
      toastBox.setAttribute('role', 'status');
      toastBox.setAttribute('aria-live', 'polite');
      d.body.append(toastBox);
    }
    const t = d.createElement('div');
    t.className = 'tf-toast toast';
    t.dataset.tone = tone;
    t.textContent = text;
    toastBox.append(t);
    setTimeout(() => { t.classList.add('is-out'); setTimeout(() => t.remove(), 250); }, timeout);
    return t;
  };
  on('click', '[data-toast]', (e, el) => {
    if (el.matches('form')) return;
    tf.toast(el.dataset.toast, { tone: el.dataset.tone });
  });

  // ---------------------------------------------------------------- filters & search
  const norm = (s) => (s || '').toLowerCase()
    .replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ')
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0)).replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660));
  function applyFilter(scope) {
    const q = norm(scope.querySelector('[data-filter-search]')?.value.trim());
    const active = {};
    $$('[data-filter]', scope).forEach((c) => {
      const key = c.dataset.filter;
      if (c.matches('button')) {
        if (c.getAttribute('aria-pressed') === 'true' && c.dataset.value && c.dataset.value !== 'all') (active[key] ||= []).push(c.dataset.value);
      } else if (c.matches('input[type="checkbox"], input[type="radio"]')) {
        if (c.checked && c.value !== 'all') (active[key] ||= []).push(c.value);
      } else if (c.value && c.value !== 'all') (active[key] ||= []).push(c.value);
    });
    let n = 0;
    $$('[data-filter-item]', scope).forEach((item) => {
      let ok = !q || norm(item.textContent + ' ' + (item.dataset.keywords || '')).includes(q);
      for (const [key, vals] of Object.entries(active)) {
        const have = (item.dataset[camel(key)] || '').split(/\s+/);
        if (!vals.some((v) => have.includes(v))) ok = false;
      }
      item.hidden = !ok;
      if (ok) n++;
    });
    $$('[data-filter-count]', scope).forEach((el) => { el.dataset.num = n; el.textContent = tf.fmt(n); });
    $$('[data-filter-empty]', scope).forEach((el) => { el.hidden = n > 0; });
    scope.dispatchEvent(new CustomEvent('tf:filter', { detail: { count: n } }));
  }
  tf.applyFilter = applyFilter;
  const filterScopeOf = (el) => el.closest('[data-filter-scope]');
  d.addEventListener('input', (e) => { const s = e.target.closest?.('[data-filter-scope]'); if (s && e.target.matches('[data-filter-search], [data-filter]')) applyFilter(s); });
  d.addEventListener('change', (e) => { const s = e.target.closest?.('[data-filter-scope]'); if (s && e.target.matches('[data-filter]')) applyFilter(s); });
  d.addEventListener('tf:change', (e) => { const s = filterScopeOf(e.target); if (s) applyFilter(s); });
  on('click', '[data-filter-reset]', (e, btn) => {
    const s = filterScopeOf(btn);
    if (!s) return;
    $$('[data-filter-search]', s).forEach((i) => { i.value = ''; });
    $$('select[data-filter]', s).forEach((i) => { i.selectedIndex = 0; });
    $$('input[data-filter]', s).forEach((i) => { i.checked = i.value === 'all'; });
    $$('[data-group]', s).forEach((g) => {
      const btns = $$('[aria-pressed][data-filter]', g);
      btns.forEach((b, i) => b.setAttribute('aria-pressed', String(g.hasAttribute('data-multi') ? false : (b.dataset.value === 'all' || (i === 0 && !btns.some((x) => x.dataset.value === 'all'))))));
    });
    applyFilter(s);
  });

  // ---------------------------------------------------------------- table sorting
  on('click', 'th button[data-sort]', (e, btn) => {
    const th = btn.closest('th');
    const table = th.closest('table');
    const idx = Array.from(th.parentElement.children).indexOf(th);
    const dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
    $$('th[aria-sort]', table).forEach((h) => h.setAttribute('aria-sort', 'none'));
    th.setAttribute('aria-sort', dir);
    const type = btn.dataset.sort;
    const body = table.tBodies[0];
    const val = (row) => {
      const cell = row.children[idx];
      const raw = cell?.dataset.value ?? cell?.textContent.trim() ?? '';
      if (type === 'num') return parseFloat(norm(raw).replace(/[^\d.-]/g, '')) || 0;
      if (type === 'date') return new Date(raw).getTime() || 0;
      return norm(raw);
    };
    const rows = Array.from(body.rows).sort((a, b) => {
      const A = val(a), B = val(b);
      const c = typeof A === 'number' ? A - B : String(A).localeCompare(String(B), tf.locale());
      return dir === 'ascending' ? c : -c;
    });
    body.append(...rows);
  });

  // ---------------------------------------------------------------- forms
  function fieldMessage(f) {
    const v = f.validity;
    if (v.valueMissing) return tf.t('required');
    if (v.typeMismatch) return f.type === 'email' ? tf.t('email') : tf.t('url');
    if (v.tooShort) return tf.t('short', { n: f.minLength });
    if (v.tooLong) return tf.t('long', { n: f.maxLength });
    if (v.rangeUnderflow) return tf.t('min', { n: f.min });
    if (v.rangeOverflow) return tf.t('max', { n: f.max });
    if (v.badInput) return tf.t('number');
    if (v.patternMismatch) return f.dataset.patternMsg || tf.t('pattern');
    return f.validationMessage;
  }
  function showError(f) {
    const wrap = f.closest('.field, [data-field]') || f.parentElement;
    let err = wrap.querySelector('[data-error]');
    if (!err) {
      err = d.createElement('p');
      err.className = 'field-error';
      err.dataset.error = '';
      err.id = (f.id || f.name || 'f') + '-error-' + Math.random().toString(36).slice(2, 6);
      wrap.append(err);
    }
    if (!err.id) err.id = (f.id || f.name || 'f') + '-error';
    const ok = f.checkValidity();
    f.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : fieldMessage(f);
    err.hidden = ok;
    const ids = new Set((f.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    if (ok) ids.delete(err.id); else ids.add(err.id);
    if (ids.size) f.setAttribute('aria-describedby', [...ids].join(' ')); else f.removeAttribute('aria-describedby');
    return ok;
  }
  const fieldsOf = (scope) => $$('input, select, textarea', scope).filter((f) => f.willValidate && !f.closest('[hidden]'));
  tf.validate = (scope) => {
    let first = null;
    for (const f of fieldsOf(scope)) if (!showError(f) && !first) first = f;
    first?.focus();
    return !first;
  };
  d.addEventListener('submit', (e) => {
    const form = e.target;
    if (!form.matches('form[data-validate]')) return;
    e.preventDefault();
    form.dataset.touched = '';
    if (!tf.validate(form)) return;
    const msg = form.dataset.success || tf.t('sent');
    const panel = form.querySelector('[data-success-panel]') || (form.dataset.successPanel && d.querySelector(form.dataset.successPanel));
    if (panel) panel.hidden = false; else tf.toast(msg, { tone: 'success' });
    form.dispatchEvent(new CustomEvent('tf:submit', { bubbles: true, detail: Object.fromEntries(new FormData(form)) }));
    if (!form.hasAttribute('data-keep')) {
      form.reset();
      delete form.dataset.touched;
      $$('[aria-invalid]', form).forEach((f) => f.removeAttribute('aria-invalid'));
    }
    form.closest('dialog')?.close();
  }, true);
  d.addEventListener('input', (e) => {
    const f = e.target;
    if (f.closest?.('form[data-touched]') && f.willValidate) showError(f);
  });

  // ---------------------------------------------------------------- steps (wizards)
  function showStep(wrap, i) {
    const steps = $$('[data-step]', wrap);
    i = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach((s, k) => { s.hidden = k !== i; });
    wrap.dataset.current = i;
    $$('[data-step-indicator] > *', wrap).forEach((el, k) => {
      el.dataset.state = k < i ? 'done' : k === i ? 'current' : 'todo';
      if (k === i) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
    });
    $$('[data-prev]', wrap).forEach((b) => { b.disabled = i === 0; });
    $$('[data-step-count]', wrap).forEach((el) => { el.textContent = tf.fmt(i + 1); });
    wrap.dispatchEvent(new CustomEvent('tf:step', { detail: { index: i } }));
  }
  on('click', '[data-next]', (e, b) => {
    const wrap = b.closest('[data-steps]');
    const i = Number(wrap.dataset.current || 0);
    const cur = $$('[data-step]', wrap)[i];
    if (!tf.validate(cur)) return;
    showStep(wrap, i + 1);
    $$('[data-step]', wrap)[i + 1]?.querySelector('input, select, textarea, button')?.focus();
  });
  on('click', '[data-prev]', (e, b) => { const wrap = b.closest('[data-steps]'); showStep(wrap, Number(wrap.dataset.current || 0) - 1); });
  on('click', '[data-goto-step]', (e, b) => { const wrap = b.closest('[data-steps]'); showStep(wrap, Number(b.dataset.gotoStep)); });
  tf.showStep = showStep;

  // ---------------------------------------------------------------- conditional visibility
  function updateWhen() {
    $$('[data-when]').forEach((el) => {
      const [name, want] = el.dataset.when.split(':');
      if (!want) return; // not a conditional-visibility rule
      const field = d.querySelector(`[name="${name}"]:checked`) || d.querySelector(`select[name="${name}"], input[name="${name}"]:not([type="radio"]):not([type="checkbox"])`);
      const group = d.querySelector(`[data-group="${name}"] [aria-pressed="true"]`);
      let val = group?.dataset.value ?? (field ? (field.type === 'checkbox' ? String(field.checked) : field.value) : '');
      const box = d.querySelector(`input[type="checkbox"][name="${name}"]`);
      if (box) val = String(box.checked);
      el.hidden = !want.split('|').includes(val);
    });
  }
  d.addEventListener('change', updateWhen);
  d.addEventListener('tf:change', updateWhen);
  tf.updateWhen = updateWhen;

  // ---------------------------------------------------------------- quantity steppers
  on('click', '[data-qty] button[data-step]', (e, b) => {
    const input = b.closest('[data-qty]').querySelector('input');
    const min = Number(input.min || 0), max = Number(input.max || Infinity);
    input.value = Math.max(min, Math.min(max, Number(input.value || 0) + Number(b.dataset.step)));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // ---------------------------------------------------------------- carousels
  on('click', '[data-prev-slide], [data-next-slide]', (e, b) => {
    const track = b.closest('[data-carousel]').querySelector('[data-track]');
    const item = track.firstElementChild;
    const step = item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth * 0.8;
    const dir = (b.hasAttribute('data-next-slide') ? 1 : -1) * (getComputedStyle(track).direction === 'rtl' ? -1 : 1);
    track.scrollBy({ left: dir * step * (Number(b.dataset.by) || 1), behavior: reduce ? 'auto' : 'smooth' });
  });

  // ---------------------------------------------------------------- copy
  on('click', '[data-copy]', async (e, b) => {
    const src = b.dataset.copy;
    const text = src.startsWith('#') ? d.querySelector(src)?.textContent.trim() : src;
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard blocked */ }
    tf.toast(b.dataset.copied || tf.t('copied'), { tone: 'success' });
  });

  // ---------------------------------------------------------------- hotkeys & command palette
  const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  d.addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') {
      const pal = d.querySelector('dialog[data-palette]');
      if (pal) { e.preventDefault(); openPalette(pal); return; }
    }
    if (mod || e.altKey || typing(d.activeElement)) return;
    const el = d.querySelector(`[data-hotkey="${CSS.escape(e.key)}"]`);
    if (el) {
      e.preventDefault();
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) el.focus(); else el.click();
    }
  });
  function openPalette(pal) {
    if (!pal.open) pal.showModal();
    const input = pal.querySelector('input');
    input.value = '';
    filterPalette(pal);
    input.focus();
  }
  function filterPalette(pal) {
    const q = norm(pal.querySelector('input').value);
    const items = $$('[data-palette-item]', pal);
    let first = null;
    items.forEach((it) => {
      const ok = !q || norm(it.textContent + ' ' + (it.dataset.keywords || '')).includes(q);
      it.hidden = !ok;
      it.setAttribute('aria-selected', 'false');
      if (ok && !first) first = it;
    });
    first?.setAttribute('aria-selected', 'true');
    $$('[data-palette-empty]', pal).forEach((el) => { el.hidden = !!first; });
  }
  on('click', '[data-palette-open]', (e) => { const pal = d.querySelector('dialog[data-palette]'); if (pal) openPalette(pal); });
  d.addEventListener('input', (e) => { const pal = e.target.closest?.('dialog[data-palette]'); if (pal) filterPalette(pal); });
  d.addEventListener('keydown', (e) => {
    const pal = e.target.closest?.('dialog[data-palette]');
    if (!pal) return;
    const items = $$('[data-palette-item]:not([hidden])', pal);
    let i = items.findIndex((it) => it.getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      i = (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((it, k) => it.setAttribute('aria-selected', String(k === i)));
      items[i]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && items[i]) {
      e.preventDefault();
      pal.close();
      items[i].click();
    }
  });
  on('click', '[data-palette-item]', (e, it) => { it.closest('dialog')?.close(); });

  // ---------------------------------------------------------------- reveal & count-up
  function countUp(el) {
    const to = Number(el.dataset.countup);
    const fmt = el.dataset.fmt;
    if (reduce) { el.textContent = tf.fmt(to, fmt); return; }
    const t0 = performance.now(), dur = Number(el.dataset.duration || 1200);
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = tf.fmt(fmt && fmt.startsWith('dec') ? to * eased : Math.round(to * eased), fmt);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function initReveal() {
    $$('[data-reveal-stagger]').forEach((p) => Array.from(p.children).forEach((c, i) => c.style.setProperty('--i', i)));
    const els = $$('[data-reveal], [data-countup]');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => { el.classList.add('is-in'); if (el.dataset.countup) countUp(el); });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add('is-in');
        if (en.target.dataset.countup) countUp(en.target);
        io.unobserve(en.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    d.addEventListener('tf:lang', () => $$('[data-countup]').forEach((el) => { el.textContent = tf.fmt(el.dataset.countup, el.dataset.fmt); }));
  }

  // ---------------------------------------------------------------- charts
  const cssVar = (el, name, fb) => (getComputedStyle(el).getPropertyValue(name).trim() || fb);
  const parseJSON = (s, fb) => { try { return JSON.parse(s); } catch { return fb; } };
  function niceMax(v) {
    if (v <= 0) return 1;
    const p = 10 ** Math.floor(Math.log10(v));
    const m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
  }
  function labelsOf(el, n) {
    if (el.dataset.dates) {
      const [start, count, unit = 'month', fmt] = el.dataset.dates.split(',');
      const s = new Date(start.includes('T') ? start : start + 'T12:00:00');
      return Array.from({ length: Number(count) || n }, (_, i) => {
        const dt = new Date(s);
        if (unit === 'day') dt.setDate(dt.getDate() + i);
        else if (unit === 'week') dt.setDate(dt.getDate() + i * 7);
        else if (unit === 'hour') dt.setHours(dt.getHours() + i);
        else dt.setMonth(dt.getMonth() + i);
        return tf.date(dt, fmt || (unit === 'month' ? 'month' : unit === 'hour' ? 'time' : unit === 'day' ? 'short' : 'short'));
      });
    }
    const raw = el.dataset.labels;
    if (!raw) return Array.from({ length: n }, (_, i) => tf.fmt(i + 1));
    const parsed = raw.trim().startsWith('{') || raw.trim().startsWith('[') ? tf.pick(parseJSON(raw, [])) : raw.split(',');
    return parsed.map((x) => (/^\d+$/.test(String(x)) ? tf.fmt(x) : x));
  }
  function seriesOf(el) {
    if (el.dataset.series) return parseJSON(el.dataset.series, []).map((s, i) => ({ ...s, name: tf.pick(s.name) || '', color: s.color || `var(--chart-${i + 1})` }));
    const vals = (el.dataset.values || '').split(',').map(Number);
    return [{ name: tf.pick(parseJSON(el.dataset.name || '""', el.dataset.name)) || '', values: vals, color: 'var(--chart-1)' }];
  }
  function path(points, curve) {
    if (!points.length) return '';
    if (curve === 'step') {
      let p = `M${points[0][0]},${points[0][1]}`;
      for (let i = 1; i < points.length; i++) p += `H${(points[i - 1][0] + points[i][0]) / 2}V${points[i][1]}H${points[i][0]}`;
      return p;
    }
    if (curve !== 'smooth' || points.length < 3) return 'M' + points.map((p) => p.join(',')).join('L');
    let p = `M${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      p += `C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
    }
    return p;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function drawChart(el) {
    const type = el.dataset.chart;
    el.classList.add('tf-chart');
    const series = seriesOf(el);
    const fmt = el.dataset.fmt || 'compact';
    const W = Math.max(120, el.clientWidth || 600);
    const H = Number(el.dataset.height) || el.clientHeight || (type === 'spark' ? 40 : 220);
    const rtl = tf.isRTL();
    const curve = el.dataset.curve || cssVar(el, '--chart-curve', 'linear');
    const sw = Number(el.dataset.stroke || cssVar(el, '--chart-stroke', '2')) || 2;
    const label = tf.pick(parseJSON(el.dataset.label || '""', el.dataset.label)) || series.map((s) => s.name).join(', ');
    let svg = '';

    if (type === 'donut') {
      const vals = series[0].values;
      const total = vals.reduce((a, b) => a + b, 0) || 1;
      const thick = Number(el.dataset.thickness || cssVar(el, '--chart-donut', '14'));
      const size = Math.min(W, H);
      const r = size / 2 - thick / 2 - 1, c = 2 * Math.PI * r;
      const gap = Number(cssVar(el, '--chart-gap', '2'));
      let acc = 0;
      const names = labelsOf(el, vals.length);
      const segs = vals.map((v, i) => {
        const len = Math.max(0, (v / total) * c - gap);
        const s = `<circle class="c-seg" r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke-width="${thick}" style="stroke:var(--chart-${i + 1})" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-acc}" transform="rotate(-90 ${size / 2} ${size / 2})${rtl ? ` scale(-1 1) translate(${-size} 0)` : ''}"><title>${esc(names[i])}: ${tf.fmt(v, fmt)}</title></circle>`;
        acc += (v / total) * c;
        return s;
      }).join('');
      svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(label)}" style="inline-size:${size}px;margin-inline:auto"><circle class="c-track" r="${r}" cx="${size / 2}" cy="${size / 2}" fill="none" stroke-width="${thick}"/>${segs}</svg>`;
      if (el.dataset.center) svg += `<div class="c-center">${esc(tf.pick(parseJSON(el.dataset.center, el.dataset.center)))}</div>`;
      el.innerHTML = svg;
      return;
    }

    // candlesticks: data-ohlc='[[open,high,low,close],…]' (+ optional data-volume='[…]')
    const candle = type === 'candle';
    const ohlc = candle ? parseJSON(el.dataset.ohlc || '[]', []) : [];
    const vol = candle ? parseJSON(el.dataset.volume || '[]', []) : [];
    const n = candle ? ohlc.length : Math.max(...series.map((s) => s.values.length));
    const labels = labelsOf(el, n);
    const axis = type !== 'spark' && el.dataset.axis !== 'none';
    const stacked = type === 'stacked';
    let max, min, ticks = Number(el.dataset.ticks || 4);
    if (candle) {
      const lo = Math.min(...ohlc.map((c) => c[2])), hi = Math.max(...ohlc.map((c) => c[1]));
      const st = niceMax((hi - lo) / ticks || 1);
      min = Math.floor(lo / st) * st;
      max = Math.ceil(hi / st) * st;
      ticks = Math.max(1, Math.round((max - min) / st));
    } else {
      const maxRaw = stacked
        ? Math.max(...Array.from({ length: n }, (_, i) => series.reduce((a, s) => a + (s.values[i] || 0), 0)))
        : Math.max(...series.flatMap((s) => s.values));
      max = Number(el.dataset.max) || (type === 'spark' ? maxRaw : niceMax(maxRaw));
      min = el.dataset.min !== undefined ? Number(el.dataset.min) : type === 'spark' ? Math.min(...series.flatMap((s) => s.values)) : Math.min(0, ...series.flatMap((s) => s.values));
    }
    const pad = axis ? { t: 10, b: 26, s: Number(el.dataset.yWidth || 40), e: 8 } : { t: 3, b: 3, s: 2, e: 2 };
    const iw = W - pad.s - pad.e, ih = H - pad.t - pad.b;
    const bars = type === 'bar' || stacked || candle;
    const xAt = (i) => {
      const t = bars ? (i + 0.5) / n : (n === 1 ? 0.5 : i / (n - 1));
      return rtl ? W - pad.s - t * iw : pad.s + t * iw;
    };
    const ihP = candle && vol.length ? ih * 0.76 : ih; // candles with volume keep the bottom band for volume bars
    const yAt = (v) => pad.t + ihP - ((v - min) / (max - min || 1)) * ihP;
    let g = '';
    const left = rtl ? pad.e : pad.s, right = rtl ? W - pad.s : W - pad.e;
    if (axis) {
      for (let k = 0; k <= ticks; k++) {
        const v = min + ((max - min) * k) / ticks;
        const y = yAt(v);
        g += `<line class="c-grid" x1="${left}" x2="${right}" y1="${y}" y2="${y}"/>`;
        // text-anchor "start" follows the inherited direction: left edge in LTR, right edge in RTL.
        g += `<text class="c-axis" x="${rtl ? W - 2 : 2}" y="${y + 4}" text-anchor="start">${esc(tf.fmt(v, fmt))}</text>`;
      }
      const every = Math.ceil(n / Math.max(2, Math.floor(iw / 64)));
      labels.forEach((lb, i) => {
        if (i % every) return;
        g += `<text class="c-axis c-x" x="${xAt(i)}" y="${H - 6}" text-anchor="middle">${esc(lb)}</text>`;
      });
    }
    let marks = '';
    if (candle) {
      const slot = iw / n, bw = Math.max(1, slot * (1 - Number(cssVar(el, '--chart-bar-gap', '0.32'))));
      const maxV = vol.length ? Math.max(...vol) : 0;
      ohlc.forEach(([o, h, l, c], i) => {
        const x = xAt(i), up = c >= o, col = up ? 'var(--chart-up, var(--success))' : 'var(--chart-down, var(--danger))';
        if (maxV) { const vh = (vol[i] / maxV) * ih * 0.2; marks += `<rect class="c-vol" x="${x - bw / 2}" y="${pad.t + ih - vh}" width="${bw}" height="${vh}" style="fill:${col}"/>`; }
        marks += `<line class="c-wick" x1="${x}" x2="${x}" y1="${yAt(h)}" y2="${yAt(l)}" style="stroke:${col}"/>`;
        const y1 = yAt(Math.max(o, c)), y2 = yAt(Math.min(o, c));
        marks += `<rect class="c-candle ${up ? 'up' : 'down'}" x="${x - bw / 2}" y="${y1}" width="${bw}" height="${Math.max(1, y2 - y1)}" style="fill:${col};stroke:${col}"/>`;
      });
    } else if (bars) {
      const slot = iw / n;
      const gapRatio = Number(cssVar(el, '--chart-bar-gap', '0.32'));
      const bw = stacked ? slot * (1 - gapRatio) : (slot * (1 - gapRatio)) / series.length;
      const rad = Number(cssVar(el, '--chart-radius', '2'));
      const base = Array(n).fill(0);
      series.forEach((s, si) => {
        s.values.forEach((v, i) => {
          const x0 = xAt(i) - (stacked ? bw / 2 : (slot * (1 - gapRatio)) / 2 - si * bw) * (rtl ? -1 : 1) - (rtl ? bw : 0);
          const y1 = yAt(stacked ? base[i] + v : v), y0 = yAt(stacked ? base[i] : 0);
          const h = Math.max(0, y0 - y1);
          marks += `<rect class="c-bar" x="${x0}" y="${y1}" width="${Math.max(1, bw - (stacked ? 0 : 1))}" height="${h}" rx="${Math.min(rad, bw / 2)}" style="fill:${s.color}"/>`;
          if (stacked) base[i] += v;
        });
      });
    } else {
      series.forEach((s, si) => {
        const pts = s.values.map((v, i) => [Number(xAt(i).toFixed(2)), Number(yAt(v).toFixed(2))]);
        const dPath = path(pts, curve);
        if (type === 'area' || (type === 'spark' && el.dataset.fill !== 'none')) {
          const id = 'g' + Math.random().toString(36).slice(2, 8);
          const op = cssVar(el, '--chart-area', '0.18');
          marks += `<defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" style="stop-color:${s.color};stop-opacity:${op}"/><stop offset="1" style="stop-color:${s.color};stop-opacity:0"/></linearGradient></defs>`;
          marks += `<path class="c-area" d="${dPath}L${pts[pts.length - 1][0]},${pad.t + ih}L${pts[0][0]},${pad.t + ih}Z" fill="url(#${id})"/>`;
        }
        marks += `<path class="c-line" d="${dPath}" fill="none" stroke-width="${sw}" style="stroke:${s.color}" ${si && el.dataset.dashSecond !== undefined ? 'stroke-dasharray="4 4"' : ''}/>`;
        if (cssVar(el, '--chart-dots', '0') === '1' && type !== 'spark') pts.forEach((p) => { marks += `<circle class="c-dot" cx="${p[0]}" cy="${p[1]}" r="${sw + 1}" style="stroke:${s.color}"/>`; });
      });
    }
    const guide = axis ? `<line class="c-guide" x1="0" x2="0" y1="${pad.t}" y2="${pad.t + ih}" visibility="hidden"/>` : '';
    // No width attribute: the SVG must never impose its own min-content width on grid/flex parents.
    svg = `<svg viewBox="0 0 ${W} ${H}" height="${H}" role="img" aria-label="${esc(label)}">${g}${marks}${guide}</svg>`;
    el.innerHTML = svg + (axis ? '<div class="tf-tip chart-tip" hidden></div>' : '');
    el.style.minBlockSize = H + 'px';
    if (!axis) return;
    const svgEl = el.querySelector('svg'), tip = el.querySelector('.tf-tip'), gl = el.querySelector('.c-guide');
    const move = (ev) => {
      const r = svgEl.getBoundingClientRect();
      const x = ((ev.clientX - r.left) / r.width) * W;
      let best = 0, bd = Infinity;
      for (let i = 0; i < n; i++) { const dd = Math.abs(xAt(i) - x); if (dd < bd) { bd = dd; best = i; } }
      const gx = xAt(best);
      gl.setAttribute('x1', gx); gl.setAttribute('x2', gx); gl.setAttribute('visibility', 'visible');
      const tfmt = el.dataset.tipFmt || (fmt === 'compact' ? 'int' : fmt);
      let top;
      if (candle) {
        const [o, h, l, c] = ohlc[best];
        top = yAt(h);
        tip.innerHTML = `<strong>${esc(labels[best] ?? '')}</strong>` + [['o', o], ['h', h], ['l', l], ['c', c]].map(([k, v]) => `<span>${esc(tf.t(k))} ${esc(tf.fmt(v, tfmt))}</span>`).join('') + (vol.length ? `<span>${esc(tf.t('v'))} ${esc(tf.fmt(vol[best], 'compact'))}</span>` : '');
      } else {
        top = Math.min(...series.map((s) => yAt(stacked ? series.reduce((a, ss) => a + (ss.values[best] || 0), 0) : s.values[best] || 0)));
        tip.innerHTML = `<strong>${esc(labels[best] ?? '')}</strong>` + series.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.name)} ${esc(tf.fmt(s.values[best], tfmt))}</span>`).join('');
      }
      tip.hidden = false;
      tip.style.left = (gx / W) * 100 + '%';
      tip.style.top = (top / H) * r.height + 'px';
    };
    svgEl.addEventListener('pointermove', move);
    svgEl.addEventListener('pointerleave', () => { tip.hidden = true; gl.setAttribute('visibility', 'hidden'); });
  }
  tf.chart = drawChart;
  function drawCharts(scope = d) {
    $$('[data-chart]', scope).forEach((el) => { if (el.offsetParent !== null || el.getClientRects().length) drawChart(el); });
  }
  tf.drawCharts = drawCharts;
  let rz;
  const ro = 'ResizeObserver' in window ? new ResizeObserver((entries) => {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(() => entries.forEach((en) => {
      const w = Math.round(en.contentRect.width);
      if (en.target._w !== w) { en.target._w = w; drawChart(en.target); }
    }));
  }) : null;
  d.addEventListener('tf:lang', () => drawCharts());
  d.addEventListener('tf:theme', () => drawCharts());

  // ---------------------------------------------------------------- demo bar (only on Tastefolio demo pages)
  function demoBar() {
    const kind = root.dataset.demo;
    if (!kind) return;
    const bar = d.createElement('nav');
    bar.className = 'tf-demo-bar';
    bar.setAttribute('aria-label', 'Tastefolio demo');
    bar.innerHTML = `<a href="../" data-l="gallery"></a><a href="site.html" data-l="site"></a><a href="dashboard.html" data-l="dashboard"></a><button type="button" data-lang-toggle data-l="other"></button>`;
    const paint = () => {
      bar.querySelectorAll('[data-l]').forEach((el) => { el.textContent = (el.dataset.l === 'gallery' ? '← ' : '') + tf.t(el.dataset.l); });
      bar.querySelectorAll('a[href$=".html"]').forEach((a) => {
        const u = new URL(a.getAttribute('href'), location.href);
        u.search = location.search;
        a.href = u.href;
        if (a.getAttribute('href').startsWith(kind) || u.pathname.endsWith(kind + '.html')) a.setAttribute('aria-current', 'page');
      });
    };
    paint();
    d.addEventListener('tf:lang', () => setTimeout(paint));
    d.body.append(bar);
  }

  // ---------------------------------------------------------------- init
  function init() {
    const want = params.get('lang');
    if (want && want !== tf.lang() && root.dataset.altLang?.slice(0, 2) === want) swapLang();
    renderValues();
    initTabs();
    $$('[data-steps]').forEach((w) => showStep(w, 0));
    updateWhen();
    $$('[data-filter-scope]').forEach(applyFilter);
    initReveal();
    drawCharts();
    if (ro) $$('[data-chart]').forEach((el) => ro.observe(el));
    demoBar();
    root.classList.add('tf-ready');
    d.dispatchEvent(new CustomEvent('tf:ready'));
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
