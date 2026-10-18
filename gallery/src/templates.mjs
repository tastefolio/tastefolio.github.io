// HTML templates for the Tastefolio gallery. Pure functions: data in, HTML string out.
import { T, LANGS, CATS, MODES, DENSITY } from './i18n.mjs';
import { guideBody } from './guide.mjs';

export const SITE = 'https://tastefolio.github.io';
export const REPO = 'tastefolio/tastefolio.github.io';
export const GH = `https://github.com/${REPO}`;
// Votes and comments live in GitHub Discussions through giscus (giscus.app): one thread per skill, titled
// "skills/<slug>", in this category. The build counts each thread's 👍 (scripts/votes.mjs) for the Top rated order.
export const GISCUS = { repo: REPO, repoId: 'R_kgDOVMtElw', category: 'Announcements', categoryId: 'DIC_kwDOVMtEl84DIyal' };

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fill = (s, vars) => s.replace(/\{(\w)\}/g, (_, k) => vars[k] ?? '');
const digits = (lang, n) => new Intl.NumberFormat(LANGS[lang].locale).format(n);
const pad2 = (lang, n) => (lang === 'fa' ? digits(lang, n).padStart(2, '۰') : String(n).padStart(2, '0'));
const href = (lang, path) => `${LANGS[lang].prefix}${path}`;

const ICON = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
  arrow: '<svg class="i-dir" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  ext: '<svg class="i-dir" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16 8M9 8h7v7"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 2.5a9.7 9.7 0 0 0-3.07 18.9c.49.09.66-.21.66-.47v-1.7c-2.7.59-3.27-1.15-3.27-1.15-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .87 1.48 2.28 1.05 2.83.8.09-.63.34-1.05.62-1.29-2.15-.25-4.42-1.08-4.42-4.8 0-1.06.38-1.93 1-2.6-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.67 1a9.2 9.2 0 0 1 4.86 0c1.85-1.26 2.67-1 2.67-1 .53 1.34.2 2.33.1 2.58.62.67 1 1.54 1 2.6 0 3.73-2.27 4.55-4.43 4.79.35.3.66.89.66 1.8v2.66c0 .26.17.57.67.47A9.7 9.7 0 0 0 12 2.5Z"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  thumb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 10.5v9h-3v-9h3Z"/><path d="M7.5 10.5 11 4a1.8 1.8 0 0 1 3 1.4V9h4.6a2 2 0 0 1 2 2.4l-1.3 6.4a2 2 0 0 1-2 1.7H7.5"/></svg>',
};

const LOGO = `<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
  <rect x="3" y="9" width="17" height="20" rx="3" fill="var(--logo-3)" transform="rotate(-12 11 19)"/>
  <rect x="8" y="6" width="17" height="20" rx="3" fill="var(--logo-2)" transform="rotate(-3 16 16)"/>
  <rect x="12" y="3" width="17" height="20" rx="3" fill="var(--logo-1)" transform="rotate(8 20 13)"/>
</svg>`;

function shotUrl(ctx, slug, demo, lang, vp) {
  const key = `${slug}/${demo}-${lang}-${vp}`;
  return ctx.shots.has(key) ? `/shots/${key}.webp` : null;
}
const voteLabel = (lang, n) => fill(n === 1 ? T[lang].voteOne : T[lang].votes, { n: digits(lang, n) });
// a giscus box: "page" loads as it scrolls near on skill pages; "dialog" is the home page's vote dialog, filled per skill
const giscusBox = (lang, kind, { id = '', term = '' } = {}) => `<div class="giscus"${id ? ` id="${id}"` : ''} data-giscus="${kind}" data-repo="${GISCUS.repo}" data-repo-id="${GISCUS.repoId}" data-category="${GISCUS.category}" data-category-id="${GISCUS.categoryId}"${term ? ` data-term="${term}"` : ''} data-lang="${lang}"></div>`;
export const demoUrl = (slug, demo, lang, extra = '') => `/skills/${slug}/examples/${demo}.html?lang=${lang}${extra}`;

function swatches(meta, cls = 'swatches') {
  return `<span class="${cls}" aria-hidden="true">${meta.swatches.map((c) => `<i style="background:${c}"></i>`).join('')}</span>`;
}

function shotImg(ctx, s, demo, lang, vp, { cls = '', lazy = true, alt = '' } = {}) {
  const url = shotUrl(ctx, s.slug, demo, lang, vp);
  const [w, h] = vp === 'thumb' ? [720, 450] : vp === 'desktop' ? [1440, 900] : [520, 1125];
  if (!url) {
    return `<div class="shot-ph ${cls}" style="--ph-a:${s.meta.swatches[0]};--ph-b:${s.meta.swatches[s.meta.swatches.length - 1]}"><span>${esc(T[lang].placeholder)}</span></div>`;
  }
  return `<img class="${cls}" src="${url}" width="${w}" height="${h}" ${lazy ? 'loading="lazy" decoding="async"' : 'fetchpriority="high"'} alt="${esc(alt)}">`;
}

// ------------------------------------------------------------------ layout
export function layout(ctx, { lang, title, desc, path, body, ogImage, bodyClass = '' }) {
  const t = T[lang];
  const L = LANGS[lang];
  const altPath = href(L.other, path === '/404.html' ? '/' : path);
  const canonical = SITE + href(lang, path);
  return `<!doctype html>
<html lang="${lang}" dir="${L.dir}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${SITE}${href('en', path)}">
<link rel="alternate" hreflang="fa" href="${SITE}${href('fa', path)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}${ogImage || '/og.png'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f3f1ec">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Gloock&family=Fragment+Mono&family=Vazirmatn:wght@400;500;700;800;900&display=swap">
<link rel="stylesheet" href="/assets/gallery.css?v=${ctx.version}">
<script>try{var m=localStorage.getItem('tastefolio:theme');if(m)document.documentElement.dataset.theme=m;else if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.theme='dark'}catch(e){}</script>
<script src="/assets/gallery.js?v=${ctx.version}" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${t.skip}</a>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="logo" href="${href(lang, '/')}" aria-label="${t.siteName}">${LOGO}<span class="logo-word">Tastefolio</span></a>
    <nav class="topnav" id="topnav" aria-label="Primary">
      <a href="${href(lang, '/')}#skills">${t.navSkills}</a>
      <a href="${href(lang, '/guide/')}">${t.navGuide}</a>
      <a href="${GH}" rel="noopener">${ICON.github}<span>${t.navGithub}</span></a>
    </nav>
    <div class="topbar-tools">
      <a class="lang-switch" href="${altPath}" hreflang="${L.other}" lang="${L.other}" data-set-lang="${L.other}">${L.otherLabel}</a>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="${t.theme}">${ICON.moon}</button>
      <button class="icon-btn menu-btn" type="button" data-menu aria-controls="topnav" aria-expanded="false" aria-label="${t.menu}">${ICON.menu}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap footer-in">
    <a class="logo" href="${href(lang, '/')}">${LOGO}<span class="logo-word">Tastefolio</span></a>
    <p>${t.footer}</p>
    <nav aria-label="Footer">
      <a href="${GH}">${t.navGithub}</a>
      <a href="${href(lang, '/guide/')}">${t.navGuide}</a>
      <a href="/catalog.json">${t.catalog}</a>
      <a href="/llms.txt">${t.llms}</a>
    </nav>
  </div>
</footer>
</body>
</html>
`;
}

// ------------------------------------------------------------------ home
function card(ctx, s, lang, i) {
  const t = T[lang];
  const m = s.meta;
  const keywords = [m.name, m.tagline.en, m.tagline.fa, ...(m.tags || []), ...m.bestFor.en, ...m.bestFor.fa, CATS[m.category].en, CATS[m.category].fa].join(' ');
  const detail = href(lang, `/skills/${s.slug}/`);
  const votes = ctx.votes[s.slug] || 0;
  return `<article class="card" data-item data-slug="${s.slug}" data-category="${m.category}" data-mode="${m.mode}" data-density="${m.density}" data-persian="${m.persianFirst ? 'yes' : 'no'}" data-order="${m.order}" data-votes="${votes}" data-name="${esc(m.name)}" data-keywords="${esc(keywords.toLowerCase())}">
  <a class="card-media" href="${detail}" tabindex="-1" aria-hidden="true">
    <span class="chrome"><i></i><i></i><i></i><b>${esc(m.demos.site.host)}</b></span>
    <span class="frame">
      ${shotImg(ctx, s, 'site', lang, 'thumb', { cls: 'shot-site', alt: '' })}
      ${shotImg(ctx, s, 'dashboard', lang, 'thumb', { cls: 'shot-dash', alt: '' })}
    </span>
  </a>
  <div class="card-body">
    <div class="card-head">
      <span class="card-no">${pad2(lang, m.order)}</span>
      <h3 class="card-title"><a href="${detail}">${esc(m.name)}</a></h3>
      <button type="button" class="vote" data-vote aria-haspopup="dialog" aria-label="${esc(fill(t.voteOpen, { s: m.name, v: voteLabel(lang, votes) }))}">${ICON.thumb}<span data-vote-count>${digits(lang, votes)}</span></button>
      ${swatches(m)}
    </div>
    <p class="card-tag">${esc(m.tagline[lang])}</p>
    <ul class="chips-static">
      <li>${esc(CATS[m.category][lang])}</li><li>${esc(MODES[m.mode][lang])}</li><li>${esc(DENSITY[m.density][lang])}</li>${m.persianFirst ? `<li>${t.persianFirst}</li>` : ''}
    </ul>
    <div class="card-links">
      <a href="${demoUrl(s.slug, 'site', lang)}">${t.openSite}${ICON.ext}</a>
      <a href="${demoUrl(s.slug, 'dashboard', lang)}">${t.openDash}${ICON.ext}</a>
      <a class="card-more" href="${detail}">${t.details}${ICON.arrow}</a>
    </div>
  </div>
</article>`;
}

function chipGroup(name, label, options, lang, { all = true } = {}) {
  const t = T[lang];
  const opts = (all ? [['all', t.all]] : []).concat(options);
  return `<div class="chip-group" role="group" aria-label="${esc(label)}" data-key="${name}">
  ${opts.map(([v, l, n], i) => `<button type="button" class="chip" data-value="${v}" aria-pressed="${i === 0}">${esc(l)}${n !== undefined ? `<span class="chip-n">${digits(lang, n)}</span>` : ''}</button>`).join('')}
</div>`;
}

export function home(ctx, lang) {
  const t = T[lang];
  const skills = ctx.skills;
  const n = skills.length;
  const fan = [skills[2], skills[0], skills[1]].filter(Boolean);
  const pick = skills[0]?.meta.name || 'Switchboard';
  // once anyone has voted, Top rated (most 👍 first, ties in curated order) is the default order
  const votesOf = (s) => ctx.votes[s.slug] || 0;
  const sortBy = skills.some(votesOf) ? 'top' : 'curated';
  const ordered = sortBy === 'top' ? [...skills].sort((a, b) => votesOf(b) - votesOf(a) || a.meta.order - b.meta.order) : skills;
  const catCounts = Object.keys(CATS).map((c) => [c, CATS[c][lang], skills.filter((s) => s.meta.category === c).length]).filter((x) => x[2]);
  const body = `
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="kicker">${t.heroKicker}</p>
      <h1 class="display">${t.heroTitle}</h1>
      <p class="lead">${fill(t.heroLead, { n: digits(lang, n) })}</p>
      <div class="hero-cta">
        <a class="btn btn-ink" href="#skills">${t.heroBrowse}${ICON.arrow}</a>
        <a class="btn btn-line" href="${href(lang, '/guide/')}">${t.heroGuide}</a>
      </div>
      <ul class="stats">${t.stats.map((x) => `<li>${esc(fill(x, { n: digits(lang, n), d: digits(lang, n * 2) }))}</li>`).join('')}</ul>
    </div>
    <div class="hero-fan" aria-hidden="true">
      ${fan.map((s, i) => `<a class="fan-card fan-${i}" href="${href(lang, `/skills/${s.slug}/`)}" tabindex="-1">${shotImg(ctx, s, i === 1 ? 'site' : 'dashboard', lang, 'thumb', { lazy: false })}<span class="fan-label">${esc(s.meta.name)}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="browse" id="skills" aria-labelledby="browse-title">
  <div class="wrap">
    <div class="section-head">
      <h2 id="browse-title" class="h2">${t.browseTitle}</h2>
      <p class="muted">${t.browseLead}</p>
    </div>
  </div>
  <div class="toolbar" data-toolbar>
    <div class="wrap toolbar-in">
      <label class="search">
        ${ICON.search}
        <span class="sr">${t.searchLabel}</span>
        <input type="search" id="q" placeholder="${t.search}" autocomplete="off" data-search>
        <kbd aria-hidden="true">/</kbd>
      </label>
      ${chipGroup('category', t.category, catCounts, lang)}
      <div class="toolbar-row">
        ${chipGroup('mode', t.mode, Object.entries(MODES).map(([k, v]) => [k, v[lang], skills.filter((s) => s.meta.mode === k).length]), lang)}
        ${chipGroup('density', t.density, Object.entries(DENSITY).map(([k, v]) => [k, v[lang], skills.filter((s) => s.meta.density === k).length]), lang)}
        <label class="check"><input type="checkbox" data-persian> <span>${t.persianFirst}</span></label>
        <div class="toolbar-end">
        <div class="seg" role="group" aria-label="${t.preview}" data-preview>
          <button type="button" aria-pressed="true" data-value="site">${t.site}</button>
          <button type="button" aria-pressed="false" data-value="dashboard">${t.dashboard}</button>
        </div>
        <label class="select"><span class="sr">${t.sort}</span>
          <select data-sort data-default="${sortBy}" aria-label="${t.sort}">
            ${[['top', t.sortTop], ['curated', t.sortCurated], ['az', t.sortAZ], ['dense', t.sortDense], ['airy', t.sortAiry]].map(([v, l]) => `<option value="${v}"${v === sortBy ? ' selected' : ''}>${l}</option>`).join('')}
          </select>
        </label>
        <div class="seg seg-icons" role="group" aria-label="${t.view}" data-view>
          <button type="button" aria-pressed="true" data-value="grid" aria-label="${t.grid}">${ICON.grid}</button>
          <button type="button" aria-pressed="false" data-value="list" aria-label="${t.list}">${ICON.list}</button>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap">
    <div class="results-bar"><p class="results" aria-live="polite" data-results data-tpl="${esc(t.results)}" data-tpl-one="${esc(t.resultsOne)}">${esc(fill(t.results, { n: digits(lang, n) }))}</p><button type="button" class="link-btn" data-clear hidden>${t.clear}</button></div>
    <div class="cards" data-cards data-preview-mode="site" data-view-mode="grid">
      ${ordered.map((s, i) => card(ctx, s, lang, i)).join('\n')}
    </div>
    <div class="empty" data-empty hidden><p>${t.empty}</p><button type="button" class="btn btn-line" data-clear>${t.clear}</button></div>
    <dialog class="vote-dialog" data-vote-dialog aria-labelledby="vote-title" data-tpl-title="${esc(t.voteTitle)}" data-tpl-label="${esc(t.voteOpen)}" data-tpl-votes="${esc(t.votes)}" data-tpl-vote-one="${esc(t.voteOne)}"><div class="vote-in">
      <div class="vote-head">
        <h2 id="vote-title" class="h3" data-vote-title></h2>
        <button type="button" class="icon-btn" data-vote-close aria-label="${t.close}">${ICON.close}</button>
      </div>
      <p class="muted">${esc(t.voteLead)}</p>
      ${giscusBox(lang, 'dialog')}
      <a class="vote-page" data-vote-page href="${href(lang, '/')}">${t.votePage}${ICON.arrow}</a>
    </div></dialog>
  </div>
</section>

<section class="how" aria-labelledby="how-title">
  <div class="wrap">
    <h2 id="how-title" class="h2">${t.howTitle}</h2>
    <ol class="steps">
      <li><span class="step-no">${digits(lang, 1)}</span><h3>${t.how1t}</h3><p>${t.how1}</p>${codeBlock(`/plugin marketplace add ${REPO}\n/plugin install ${skills[0]?.slug || 'switchboard'}@tastefolio`, lang)}</li>
      <li><span class="step-no">${digits(lang, 2)}</span><h3>${t.how2t}</h3><p>${t.how2}</p>${codeBlock(fill(t.how2code, { s: pick }), lang)}</li>
      <li><span class="step-no">${digits(lang, 3)}</span><h3>${t.how3t}</h3><p>${t.how3}</p>${codeBlock(fill(t.how3code, { s: pick }), lang)}</li>
    </ol>
    <div class="inside">
      <h3 class="h3">${t.insideTitle}</h3>
      <dl>${t.inside.map(([k, v]) => `<div><dt><code>${esc(k)}</code></dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <a class="btn btn-line" href="${href(lang, '/guide/')}">${t.guideCta}${ICON.arrow}</a>
    </div>
  </div>
</section>`;
  return layout(ctx, { lang, title: `${t.siteName} — ${t.heroKicker}`, desc: t.metaDesc, path: '/', body, bodyClass: 'page-home' });
}

export function codeBlock(code, lang = 'en') {
  const id = 'c' + Math.random().toString(36).slice(2, 8);
  return `<div class="code"><pre id="${id}" dir="${/[؀-ۿ]/.test(code) ? 'auto' : 'ltr'}"><code>${esc(code)}</code></pre><button type="button" class="copy" data-copy="#${id}" aria-label="${esc((T[lang] || T.en).copy)}">${ICON.copy}</button></div>`;
}

// ------------------------------------------------------------------ detail
export function detail(ctx, s, lang) {
  const t = T[lang];
  const m = s.meta;
  const i = ctx.skills.indexOf(s);
  const prev = ctx.skills[(i - 1 + ctx.skills.length) % ctx.skills.length];
  const next = ctx.skills[(i + 1) % ctx.skills.length];
  const brands = m.brandTrials || ['e8590c', '0f766e', '7c3aed', 'db2777'];
  const install = installTabs(s.slug, lang);
  const votes = ctx.votes[s.slug] || 0;
  const viewer = ['site', 'dashboard'].map((demo) => ['en', 'fa'].map((l) => `
    <div class="viewer-pane" data-pane="${demo}-${l}" ${demo === 'site' && l === lang ? '' : 'hidden'}>
      <figure class="v-desktop"><span class="chrome"><i></i><i></i><i></i><b>${esc(m.demos[demo].host)}</b></span>${shotImg(ctx, s, demo, l, 'desktop', { alt: `${m.name} — ${t[demo === 'site' ? 'site' : 'dashboard']} (${l === 'fa' ? 'فارسی' : 'English'}, ${t.desktop})`, lazy: !(demo === 'site' && l === lang) })}</figure>
      <figure class="v-mobile">${shotImg(ctx, s, demo, l, 'mobile', { alt: `${m.name} — ${t[demo === 'site' ? 'site' : 'dashboard']} (${l === 'fa' ? 'فارسی' : 'English'}, ${t.mobile})`, lazy: !(demo === 'site' && l === lang) })}</figure>
    </div>`).join('')).join('');
  const body = `
<article class="detail" style="--s1:${m.swatches[0]};--s2:${m.swatches[1] || m.swatches[0]};--s3:${m.swatches[m.swatches.length - 1]}">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${href(lang, '/')}#skills">${t.back}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(m.name)}</span></nav>
    <header class="detail-head">
      <div>
        <p class="kicker"><span class="mono">No. ${pad2(lang, m.order)}</span> · ${esc(CATS[m.category][lang])} · <a class="kicker-votes" href="#rate">${ICON.thumb}${votes ? esc(voteLabel(lang, votes)) : t.rate}</a></p>
        <h1 class="display detail-title">${esc(m.name)}</h1>
        <p class="detail-tag">${esc(m.tagline[lang])}</p>
        <p class="lead">${esc(m.summary[lang])}</p>
        <div class="hero-cta">
          <a class="btn btn-ink" href="${demoUrl(s.slug, 'site', lang)}">${t.openSite}${ICON.ext}</a>
          <a class="btn btn-ink" href="${demoUrl(s.slug, 'dashboard', lang)}">${t.openDash}${ICON.ext}</a>
          <a class="btn btn-line" href="/downloads/${s.slug}.zip" download>${ICON.download}${t.download}</a>
          <a class="btn btn-line" href="${GH}/blob/main/skills/${s.slug}/SKILL.md">${t.viewSkill}</a>
        </div>
      </div>
      <aside class="spec">
        <h2 class="spec-h">${t.palette}</h2>
        <ul class="palette">${m.swatches.map((c) => `<li><i style="background:${c}"></i><code>${c}</code></li>`).join('')}</ul>
        <h2 class="spec-h">${t.type}</h2>
        <dl class="spec-dl">
          <div><dt>${t.latin}</dt><dd>${esc(m.fonts.latin)}</dd></div>
          <div><dt>${t.persian}</dt><dd>${esc(m.fonts.persian)}</dd></div>
          ${m.fonts.mono ? `<div><dt>${t.mono}</dt><dd>${esc(m.fonts.mono)}</dd></div>` : ''}
          ${m.icons ? `<div><dt>${t.icons}</dt><dd>${esc(m.icons)}</dd></div>` : ''}
        </dl>
        <h2 class="spec-h">${t.traits}</h2>
        <ul class="chips-static"><li>${esc(MODES[m.mode][lang])}</li><li>${esc(DENSITY[m.density][lang])}</li>${m.persianFirst ? `<li>${t.persianFirst}</li>` : ''}${(m.tags || []).slice(0, 4).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </aside>
    </header>

    <section class="viewer" aria-labelledby="screens-h" data-viewer data-lang="${lang}" data-demo="site">
      <div class="viewer-bar">
        <h2 id="screens-h" class="h3">${t.screens}</h2>
        <div class="seg" role="group" aria-label="${t.screens}" data-viewer-demo>
          <button type="button" aria-pressed="true" data-value="site">${t.site}</button>
          <button type="button" aria-pressed="false" data-value="dashboard">${t.dashboard}</button>
        </div>
        <div class="seg" role="group" aria-label="Language" data-viewer-lang>
          <button type="button" aria-pressed="${lang === 'en'}" data-value="en" lang="en">English</button>
          <button type="button" aria-pressed="${lang === 'fa'}" data-value="fa" lang="fa">فارسی</button>
        </div>
      </div>
      <div class="viewer-stage">${viewer}</div>
    </section>

    <div class="detail-grid">
      <section><h2 class="h3">${t.bestFor}</h2><ul class="ticks">${m.bestFor[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
      <section><h2 class="h3">${t.avoidFor}</h2><ul class="ticks ticks-x">${m.avoidFor[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
      <section class="span2"><h2 class="h3">${t.signature}</h2><ol class="moves">${m.signature[lang].map((x) => `<li>${esc(x)}</li>`).join('')}</ol></section>
    </div>

    <section class="brand-try" aria-labelledby="brand-h">
      <h2 id="brand-h" class="h3">${t.brandTry}</h2>
      <p class="muted">${esc(fill(t.brandLead, { s: m.name }))}</p>
      <ul class="brand-list">${brands.map((b) => `<li><span class="brand-dot" style="background:#${b}"></span><code>#${b}</code><a href="${demoUrl(s.slug, 'site', lang, `&brand=${b}`)}">${t.site}${ICON.ext}</a><a href="${demoUrl(s.slug, 'dashboard', lang, `&brand=${b}`)}">${t.dashboard}${ICON.ext}</a></li>`).join('')}</ul>
    </section>

    <section class="install" aria-labelledby="install-h">
      <h2 id="install-h" class="h3">${t.install}</h2>
      ${install}
      <h3 class="spec-h">${t.files}</h3>
      <ul class="files">${s.files.map((f) => `<li><a href="${GH}/blob/main/skills/${s.slug}/${f}"><code>${esc(f)}</code></a></li>`).join('')}</ul>
    </section>

    <section class="rate" id="rate" aria-labelledby="rate-h">
      <h2 id="rate-h" class="h3">${t.rateTitle}</h2>
      <p class="muted">${esc(t.rateLead)}</p>
      ${giscusBox(lang, 'page', { id: 'rate-thread', term: `skills/${s.slug}` })}
    </section>

    <nav class="pager" aria-label="Skills">
      <a href="${href(lang, `/skills/${prev.slug}/`)}"><small>${t.prev}</small><span>${esc(prev.meta.name)}</span></a>
      <a href="${href(lang, `/skills/${next.slug}/`)}"><small>${t.next}</small><span>${esc(next.meta.name)}</span></a>
    </nav>
  </div>
</article>`;
  return layout(ctx, {
    lang, title: `${m.name} — ${m.tagline[lang]} · ${t.siteName}`, desc: m.summary[lang], path: `/skills/${s.slug}/`, body,
    ogImage: shotUrl(ctx, s.slug, 'site', lang, 'desktop') || undefined, bodyClass: 'page-detail',
  });
}

export function installTabs(slug, lang) {
  const t = T[lang];
  const id = 'it-' + slug;
  const tabs = [
    ['plugin', t.installPlugin, `/plugin marketplace add ${REPO}\n/plugin install ${slug}@tastefolio`],
    ['cli', t.installCli, `npx skills add ${REPO} --skill ${slug}`],
    ['manual', t.installManual, `curl -L ${SITE}/downloads/${slug}.zip -o ${slug}.zip\nunzip ${slug}.zip -d .claude/skills/`],
    ['other', t.installOther, fill(t.otherAgents, { s: slug })],
  ];
  return `<div class="tabs" data-tabs>
  <div class="tablist" role="tablist" aria-label="${t.install}">
    ${tabs.map(([k, l], i) => `<button type="button" role="tab" id="${id}-${k}-t" aria-controls="${id}-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(l)}</button>`).join('')}
  </div>
  ${tabs.map(([k, , code], i) => `<div role="tabpanel" id="${id}-${k}" aria-labelledby="${id}-${k}-t" ${i ? 'hidden' : ''}>${codeBlock(code, lang)}</div>`).join('')}
</div>`;
}

// ------------------------------------------------------------------ guide & 404
export function guide(ctx, lang) {
  const t = T[lang];
  const body = `<article class="guide"><div class="wrap guide-in">${guideBody(ctx, lang, { codeBlock: (code, l = lang) => codeBlock(code, l), installTabs, href, esc, digits })}</div></article>`;
  return layout(ctx, { lang, title: `${t.guideTitle} · ${t.siteName}`, desc: t.metaDesc, path: '/guide/', body, bodyClass: 'page-guide' });
}

export function notFound(ctx) {
  const body = `<section class="nf"><div class="wrap"><p class="kicker mono">404</p><h1 class="display">This page is not in the folio.</h1><p class="lead" lang="fa" dir="rtl">این صفحه در مجموعه نیست.</p><div class="hero-cta"><a class="btn btn-ink" href="/">Tastefolio</a><a class="btn btn-line" href="/fa/">تیست‌فولیو</a></div></div></section>`;
  return layout(ctx, { lang: 'en', title: 'Not found · Tastefolio', desc: T.en.metaDesc, path: '/404.html', body, bodyClass: 'page-404' });
}
