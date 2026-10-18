/*!
 * Passage — document behaviours for the Tastefolio "Passage" skill. MIT License. Needs kit.js (window.tf).
 *   Guilloche   [data-guilloche="waves|rosette"] → an inline SVG security pattern in currentColor (.guilloche)
 *   Points      [data-points data-max="600"]: [data-group] buttons with data-pts → [data-points-out], .gauge .fill,
 *               [data-need="420"] routes get data-ok, [data-points-count] counts the routes that fit
 *   OTP         [data-otp] > input×n: auto-advance, backspace, paste; fills [data-otp-value], enables [data-otp-submit]
 *   Upload      button[data-upload] in a row: fake progress, then the row's [data-upload-status] reads data-done
 *   Countdown   [data-countdown-in="seconds"] > [data-cd="d|h|m|s"], locale digits, still in screenshots
 *   Clock       [data-clock] → HH:MM in the page's digits
 *   Summary     [data-show="group"] mirrors the pressed button of [data-group="group"] (follows language changes)
 *   Reply       form[data-reply] appends .msg.me to its [data-thread]
 */
(() => {
  'use strict';
  const d = document;
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const tf = () => window.tf || { fmt: (n) => String(n), lang: () => d.documentElement.lang, reduceMotion: false, toast() {} };
  const NS = 'http://www.w3.org/2000/svg';
  const still = () => tf().reduceMotion || d.documentElement.hasAttribute('data-shot');

  // ---------------------------------------------------------------- guilloche
  function waves(w, h) {
    const bands = Math.max(2, Math.round(h / 150)), per = 9;
    let out = '';
    for (let b = 0; b < bands; b++) {
      const y0 = h * ((b + 0.5) / bands), amp = h / bands * 0.34, f = (2 * Math.PI * (2.5 + b * 0.75)) / w;
      for (let k = 0; k < per; k++) {
        const p = (k * Math.PI) / per;
        let path = '';
        for (let x = 0; x <= w; x += 6) {
          const y = y0 + amp * Math.sin(f * x + p) * Math.cos(f * x * 0.21 - p * 0.5);
          path += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)}`;
        }
        out += `<path d="${path}"/>`;
      }
    }
    return out;
  }
  function rosette(w, h) {
    const cx = w * 0.82, cy = h * 0.3, R = Math.min(w, h) * 0.34, r = R / 7.2, dd = r * 2.6;
    let out = '';
    for (let ring = 0; ring < 3; ring++) {
      const s = 1 - ring * 0.18;
      let path = '';
      for (let i = 0; i <= 1440; i++) {
        const t = (i / 1440) * Math.PI * 2 * 9;
        const x = cx + s * ((R + r) * Math.cos(t / 9) - dd * Math.cos(((R + r) / r) * (t / 9)));
        const y = cy + s * ((R + r) * Math.sin(t / 9) - dd * Math.sin(((R + r) / r) * (t / 9)));
        path += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      out += `<path d="${path}"/>`;
    }
    return out + waves(w, h);
  }
  function guilloche(el) {
    let box = el.querySelector(':scope > .guilloche');
    if (!box) { box = d.createElement('div'); box.className = 'guilloche'; box.setAttribute('aria-hidden', 'true'); el.prepend(box); }
    const w = Math.max(320, Math.round(el.clientWidth)), h = Math.max(160, Math.round(el.clientHeight));
    if (box._size === `${w}x${h}`) return;
    box._size = `${w}x${h}`;
    const body = el.dataset.guilloche === 'rosette' ? rosette(w, h) : waves(w, h);
    box.innerHTML = `<svg xmlns="${NS}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width=".7">${body}</svg>`;
  }

  // ---------------------------------------------------------------- points check
  function points(wrap) {
    const max = Number(wrap.dataset.max) || 600;
    const sum = $$('[data-group] [aria-pressed="true"][data-pts]', wrap).reduce((a, b) => a + Number(b.dataset.pts), 0);
    $$('[data-points-out]', wrap).forEach((o) => { o.textContent = tf().fmt(sum); });
    const fill = wrap.querySelector('.gauge .fill');
    if (fill) {
      const len = fill.getTotalLength ? fill.getTotalLength() : 1;
      fill.style.strokeDasharray = `${len}`;
      fill.style.strokeDashoffset = `${len * (1 - Math.min(sum, max) / max)}`;
    }
    let fits = 0;
    $$('[data-need]', wrap).forEach((li) => { const ok = sum >= Number(li.dataset.need); li.dataset.ok = String(ok); if (ok) fits++; });
    $$('[data-points-count]', wrap).forEach((o) => { o.textContent = tf().fmt(fits); });
  }

  // ---------------------------------------------------------------- OTP boxes
  function otp(wrap) {
    const boxes = $$('input', wrap);
    const sync = () => {
      const code = boxes.map((b) => b.value).join('');
      const hidden = wrap.parentElement.querySelector('[data-otp-value]');
      if (hidden) hidden.value = code;
      const submit = wrap.closest('form, [data-step], dialog')?.querySelector('[data-otp-submit]');
      if (submit) submit.disabled = code.length < boxes.length;
    };
    boxes.forEach((b, i) => {
      b.addEventListener('input', () => {
        b.value = b.value.replace(/[^\d۰-۹]/g, '').slice(-1).replace(/[۰-۹]/, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c));
        if (b.value && boxes[i + 1]) boxes[i + 1].focus();
        sync();
      });
      b.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) { boxes[i - 1].focus(); boxes[i - 1].value = ''; sync(); } });
      b.addEventListener('paste', (e) => {
        const digits = (e.clipboardData?.getData('text') || '').replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g, '');
        if (!digits) return;
        e.preventDefault();
        boxes.forEach((x, k) => { x.value = digits[k] || ''; });
        boxes[Math.min(digits.length, boxes.length) - 1].focus();
        sync();
      });
    });
    sync();
  }

  // ---------------------------------------------------------------- uploads
  function upload(btn) {
    const row = btn.closest('tr, li, [data-upload-row]');
    const bar = btn.parentElement.querySelector('.prog span');
    const status = row?.querySelector('[data-upload-status]');
    const finish = () => {
      if (bar) bar.style.setProperty('--v', '100%');
      btn.disabled = true;
      if (status) {
        const fa = tf().lang() === 'fa';
        status.className = 'badge ok';
        status.textContent = fa ? status.dataset.doneFa : status.dataset.doneEn;
        status.dataset.alt = fa ? status.dataset.doneEn : status.dataset.doneFa;
      }
      row?.dispatchEvent(new CustomEvent('passage:uploaded', { bubbles: true }));
    };
    if (still()) { finish(); return; }
    let v = 0;
    const tick = () => { v = Math.min(100, v + 9 + Math.random() * 14); bar?.style.setProperty('--v', v + '%'); if (v < 100) setTimeout(tick, 120); else finish(); };
    tick();
  }

  // ---------------------------------------------------------------- countdown & clock
  const t0 = Date.now();
  function countdown(el) {
    const left = Math.max(0, Number(el.dataset.countdownIn) - (still() ? 0 : Math.floor((Date.now() - t0) / 1000)));
    const parts = { d: Math.floor(left / 86400), h: Math.floor((left % 86400) / 3600), m: Math.floor((left % 3600) / 60), s: left % 60 };
    $$('[data-cd]', el).forEach((x) => { x.textContent = tf().fmt(parts[x.dataset.cd]); });
  }
  function clock(el) {
    const now = new Date();
    const p = (n) => String(n).padStart(2, '0');
    const text = `${p(now.getHours())}:${p(now.getMinutes())}`;
    el.textContent = tf().lang() === 'fa' ? text.replace(/\d/g, (c) => '۰۱۲۳۴۵۶۷۸۹'[c]) : text;
  }

  // ---------------------------------------------------------------- summaries of pressed choices
  function summaries() {
    $$('[data-show]').forEach((el) => {
      const pressed = d.querySelector(`[data-group="${el.dataset.show}"] [aria-pressed="true"]`);
      if (pressed) el.textContent = (pressed.querySelector('[data-label]') || pressed).textContent.trim();
    });
  }

  function init() {
    $$('[data-guilloche]').forEach(guilloche);
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver((es) => es.forEach((e) => guilloche(e.target)));
      $$('[data-guilloche]').forEach((el) => ro.observe(el));
    }
    $$('[data-points]').forEach((w) => { points(w); w.addEventListener('tf:change', () => points(w)); });
    $$('[data-otp]').forEach(otp);
    d.addEventListener('click', (e) => { const b = e.target.closest?.('button[data-upload]'); if (b && !b.disabled) upload(b); });
    const cds = $$('[data-countdown-in]'), clocks = $$('[data-clock]');
    const paint = () => { cds.forEach(countdown); clocks.forEach(clock); };
    paint();
    if (!still() && (cds.length || clocks.length)) setInterval(paint, 1000);
    summaries();
    d.addEventListener('tf:change', summaries);
    d.addEventListener('tf:lang', () => { setTimeout(() => { summaries(); paint(); $$('[data-points]').forEach(points); }); });
    d.addEventListener('submit', (e) => {
      const form = e.target.closest?.('form[data-reply]');
      if (!form) return;
      e.preventDefault();
      const field = form.querySelector('textarea, input');
      const text = field.value.trim();
      if (!text) { field.focus(); return; }
      const msg = d.createElement('div');
      msg.className = 'msg me';
      const p = d.createElement('p');
      p.textContent = text;
      const time = d.createElement('small');
      clock(time);
      msg.append(p, time);
      d.querySelector(form.dataset.reply)?.append(msg);
      field.value = '';
      msg.scrollIntoView({ block: 'nearest', behavior: still() ? 'auto' : 'smooth' });
    });
  }
  if (window.tf && d.documentElement.classList.contains('tf-ready')) init();
  else d.addEventListener('tf:ready', init, { once: true });
  if (d.readyState !== 'loading' && !window.tf) init();
})();
