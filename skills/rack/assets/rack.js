/*!
 * Rack — hardware behaviours for the Tastefolio "Rack" skill. MIT License. Needs kit.js (window.tf).
 *   Builder   [data-builder]: input.fader[data-key][data-values="1,2,4"][data-prices="…"][data-unit] → [data-out=key],
 *             .meter-led beside each fader, [data-sum=key]; pressed groups with data-price add to the month;
 *             [data-group="bill"] month|hour → [data-total] (Toman) and [data-total-unit]
 *   Ping      [data-ping="38"] → live-ish milliseconds and the LED next to it (green < 60, amber < 140, red)
 *   Domains   form[data-domain] + [data-tld-list data-tlds='[{"tld":".ir","price":95000}]'] → rows with LED, price, add
 *   Uptime    [data-uptime data-incidents="23:amber,61:red"] → 90 day bars
 *   Console   [data-console] with .console-out and .console-in input: help, uptime, free, df, ping, whoami, clear
 *   Power     [data-server] rows: button[data-power="start|stop|reboot"] drive the row's .led[data-led] and [data-state-label]
 *   Select    [data-server] click → aria-current, [data-current="host|ip|plan"] mirrors its data-host/ip/plan
 *   Records   form[data-add-record="#tbody"] appends a DNS row; [data-snapshot="#list"] adds a snapshot line
 */
(() => {
  'use strict';
  const d = document;
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const tf = () => window.tf;
  const still = () => tf().reduceMotion || d.documentElement.hasAttribute('data-shot');
  const fa = () => tf().lang() === 'fa';
  const pick = (el, key) => el.dataset[key + (fa() ? 'Fa' : 'En')] || '';
  const num = (n, f) => tf().fmt(n, f);

  // ---------------------------------------------------------------- builder (faders)
  function builder(root) {
    let month = 0;
    const lines = {};
    $$('input.fader', root).forEach((f) => {
      const values = f.dataset.values.split(',');
      const prices = f.dataset.prices.split(',').map(Number);
      const i = Number(f.value);
      const unit = pick(f, 'unit') || f.dataset.unit || '';
      const text = `${num(values[i])} ${unit}`.trim();
      month += prices[i];
      lines[f.dataset.key] = text;
      $$(`[data-out="${f.dataset.key}"]`, root).forEach((o) => { o.textContent = text; });
      f.setAttribute('aria-valuetext', text);
      const meter = f.parentElement.querySelector('.meter-led');
      if (meter) {
        const lit = Math.round(((i + 1) / values.length) * 12);
        $$('i', meter).reverse().forEach((led, k) => { led.className = k < lit ? (k >= 10 ? 'on peak' : k >= 8 ? 'on hot' : 'on') : ''; });
      }
    });
    $$('[data-group] [aria-pressed="true"][data-price]', root).forEach((b) => {
      month += Number(b.dataset.price);
      lines[b.closest('[data-group]').dataset.group] = (b.querySelector('[data-label]') || b).textContent.trim();
    });
    for (const [k, v] of Object.entries(lines)) $$(`[data-sum="${k}"]`, root).forEach((o) => { o.textContent = v; });
    const hourly = root.querySelector('[data-group="bill"] [aria-pressed="true"]')?.dataset.value === 'hour';
    const total = hourly ? Math.round(month / 720) : month;
    $$('[data-total]', root).forEach((o) => { o.textContent = num(total); });
    $$('[data-total-unit]', root).forEach((o) => { o.textContent = pick(o, hourly ? 'hour' : 'month'); });
    $$('[data-total-month]', root).forEach((o) => { o.textContent = num(month, 'toman'); });
  }

  // ---------------------------------------------------------------- ping
  function ping(el) {
    const base = Number(el.dataset.ping);
    const ms = still() ? base : Math.max(1, Math.round(base + (Math.random() - 0.5) * Math.max(4, base * 0.12)));
    el.textContent = num(ms);
    const led = el.closest('[data-ping-row]')?.querySelector('.led') || el.parentElement.querySelector('.led');
    if (led) led.className = 'led ' + (ms < 60 ? '' : ms < 140 ? 'amber' : 'red');
  }

  // ---------------------------------------------------------------- domains
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  function domains(form) {
    const list = d.querySelector(form.dataset.domain);
    if (!list) return;
    const tlds = JSON.parse(list.dataset.tlds);
    const render = () => {
      const raw = form.querySelector('input').value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\..*$/, '').replace(/[^a-z0-9-]/g, '');
      const name = raw || 'rakhsh';
      list.replaceChildren(...tlds.map(({ tld, price }) => {
        const taken = hash(name + tld) % 3 === 0;
        const row = d.createElement('li');
        row.className = 'tld-row';
        row.dataset.state = taken ? 'taken' : 'free';
        row.innerHTML = `<span class="led ${taken ? 'red' : ''}" aria-hidden="true"></span><span class="dn"></span><span class="vfd"></span><button class="btn btn-sm ${taken ? 'btn-ghost' : 'btn-key'}" type="button"></button>`;
        row.querySelector('.dn').textContent = name + tld;
        row.querySelector('.vfd').innerHTML = taken ? '—' : `${num(price)} <small>${fa() ? 'تومان/سال' : 'T/yr'}</small>`;
        const b = row.querySelector('button');
        b.textContent = taken ? pick(list, 'taken') : pick(list, 'add');
        if (taken) b.disabled = true;
        else b.addEventListener('click', () => { tf().toast(`${name + tld} — ${pick(list, 'added')}`, { tone: 'success' }); b.disabled = true; });
        return row;
      }));
      $$('[data-domain-count]').forEach((o) => { o.textContent = num(tlds.filter(({ tld }) => hash(name + tld) % 3 !== 0).length); });
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); render(); });
    form._render = render;
    render();
  }

  // ---------------------------------------------------------------- uptime
  function uptime(el) {
    const marks = Object.fromEntries((el.dataset.incidents || '').split(',').filter(Boolean).map((x) => x.split(':')));
    el.replaceChildren(...Array.from({ length: 90 }, (_, i) => {
      const bar = d.createElement('i');
      if (marks[i]) bar.className = marks[i];
      bar.title = `${fa() ? 'روز' : 'Day'} ${num(i + 1)}${marks[i] ? (fa() ? ' — رخداد' : ' — incident') : ''}`;
      return bar;
    }));
  }

  // ---------------------------------------------------------------- console
  function consoleBox(box) {
    const out = box.querySelector('.console-out');
    const input = box.querySelector('.console-in input');
    const host = box.dataset.host || 'server';
    const say = (html) => { out.insertAdjacentHTML('beforeend', html + '\n'); out.scrollTop = out.scrollHeight; };
    const cmds = {
      help: () => 'help  uptime  free  df  ping  whoami  clear',
      uptime: () => ' 14:02:11 up 41 days,  3:12,  1 user,  load average: 0.21, 0.18, 0.15',
      free: () => '              total     used     free   shared  buff/cache\nMem:           7.8G     2.1G     4.2G     12M       1.5G\nSwap:          2.0G       0B     2.0G',
      df: () => 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/vda1       160G   38G  122G  24% /',
      ping: () => 'PING 1.1.1.1: 64 bytes  time=2.1 ms\nPING 1.1.1.1: 64 bytes  time=2.0 ms\n--- 2 packets, 0% loss',
      whoami: () => 'root',
    };
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      input.value = '';
      say(`<span class="p">root@${host}:~#</span> ${cmd.replace(/[<>&]/g, '')}`);
      if (!cmd) return;
      if (cmd === 'clear') { out.textContent = ''; return; }
      const run = cmds[cmd.split(/\s+/)[0]];
      say(run ? run().replace(/[<>&]/g, '') : `<span class="dim">${cmd.split(/\s+/)[0].replace(/[<>&]/g, '')}: command not found — try help</span>`);
    });
  }

  // ---------------------------------------------------------------- power & selection
  function setState(row, state) {
    row.dataset.state = state;
    const led = row.querySelector('[data-led]');
    if (led) led.className = 'led ' + ({ running: 'pulse', stopped: 'red', busy: 'amber blink' }[state] || '');
    const label = row.querySelector('[data-state-label]');
    if (label) {
      label.classList.remove('ok', 'bad', 'warn');
      label.classList.add({ running: 'ok', stopped: 'bad', busy: 'warn' }[state] || 'info');
      label.textContent = pick(label, state);
    }
    $$('[data-power]', row).forEach((b) => { b.disabled = state === 'busy' || (b.dataset.power === 'start' ? state === 'running' : state === 'stopped'); });
  }
  d.addEventListener('click', (e) => {
    const p = e.target.closest?.('[data-power]');
    if (p) {
      const row = p.closest('[data-server]');
      const target = p.dataset.power === 'stop' ? 'stopped' : 'running';
      setState(row, 'busy');
      tf().toast(pick(p, 'toast'), { tone: 'neutral' });
      setTimeout(() => setState(row, target), still() ? 0 : 1600);
      return;
    }
    const row = e.target.closest?.('[data-server]');
    if (row && !e.target.closest('button, a, input')) {
      $$('[data-server]').forEach((r) => r.removeAttribute('aria-current'));
      row.setAttribute('aria-current', 'true');
      $$('[data-current]').forEach((o) => { o.textContent = row.dataset[o.dataset.current]; });
    }
    const snap = e.target.closest?.('[data-snapshot]');
    if (snap) {
      const list = d.querySelector(snap.dataset.snapshot);
      const first = list?.firstElementChild;
      if (first) {
        const copy = first.cloneNode(true);
        copy.querySelector('[data-snap-name]').textContent = `snap-${new Date().toISOString().slice(0, 10)}-manual`;
        copy.querySelector('[data-snap-when]').textContent = fa() ? 'همین الان' : 'just now';
        list.prepend(copy);
        tf().toast(pick(snap, 'toast'), { tone: 'success' });
      }
    }
  });

  function init() {
    $$('[data-builder]').forEach((b) => {
      builder(b);
      b.addEventListener('input', (e) => { if (e.target.matches('input.fader')) builder(b); });
      b.addEventListener('tf:change', () => builder(b));
    });
    const pings = $$('[data-ping]');
    pings.forEach(ping);
    if (!still() && pings.length) setInterval(() => pings.forEach(ping), 2200);
    $$('form[data-domain]').forEach(domains);
    $$('[data-uptime]').forEach(uptime);
    $$('[data-console]').forEach(consoleBox);
    $$('[data-server][data-state]').forEach((r) => setState(r, r.dataset.state));
    d.addEventListener('submit', (e) => {
      const form = e.target.closest?.('form[data-add-record]');
      if (!form || !form.checkValidity()) return;
      e.preventDefault();
      const f = new FormData(form);
      const tr = d.createElement('tr');
      for (const v of [f.get('type'), f.get('name') || '@', f.get('value'), f.get('ttl')]) { const td = d.createElement('td'); td.className = 'mono'; td.textContent = v; tr.append(td); }
      tr.append(d.createElement('td'));
      d.querySelector(form.dataset.addRecord)?.append(tr);
      form.reset();
      form.closest('dialog')?.close();
      tf().toast(fa() ? 'رکورد اضافه شد؛ تا چند ثانیه منتشر می‌شود.' : 'Record added — live in a few seconds.', { tone: 'success' });
    }, true);
    d.addEventListener('tf:lang', () => setTimeout(() => {
      $$('[data-builder]').forEach(builder);
      pings.forEach(ping);
      $$('form[data-domain]').forEach((f) => f._render?.());
      $$('[data-uptime]').forEach(uptime);
      $$('[data-server][data-state]').forEach((r) => setState(r, r.dataset.state));
    }));
  }
  if (window.tf && d.documentElement.classList.contains('tf-ready')) init();
  else d.addEventListener('tf:ready', init, { once: true });
})();
