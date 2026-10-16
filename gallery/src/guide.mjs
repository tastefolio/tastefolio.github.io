// Long-form guide page (install, choose, use, customize, RTL) in English and Persian.
import { CATS, DENSITY, MODES } from './i18n.mjs';

export function guideBody(ctx, lang, { codeBlock, installTabs, href, esc }) {
  const skills = ctx.skills;
  const first = skills[0]?.slug || 'switchboard';
  const table = `<div class="table-wrap"><table class="choose">
<thead><tr><th scope="col">${lang === 'fa' ? 'سبک' : 'Style'}</th><th scope="col">${lang === 'fa' ? 'بهترین کاربرد' : 'Reach for it when'}</th><th scope="col">${lang === 'fa' ? 'دسته' : 'Category'}</th><th scope="col">${lang === 'fa' ? 'حالت / تراکم' : 'Mode / density'}</th></tr></thead>
<tbody>${skills.map((s) => `<tr><th scope="row"><a href="${href(lang, `/skills/${s.slug}/`)}">${esc(s.meta.name)}</a></th><td>${esc(s.meta.bestFor[lang].slice(0, 2).join(lang === 'fa' ? '، ' : ', '))}</td><td>${esc(CATS[s.meta.category][lang])}</td><td>${esc(MODES[s.meta.mode][lang])} · ${esc(DENSITY[s.meta.density][lang])}</td></tr>`).join('')}</tbody></table></div>`;

  if (lang === 'fa') {
    return `
<aside class="toc" aria-label="فهرست">
  <p class="kicker">راهنما</p>
  <ol><li><a href="#install">نصب</a></li><li><a href="#choose">انتخاب سبک</a></li><li><a href="#use">استفاده</a></li><li><a href="#customize">شخصی‌سازی</a></li><li><a href="#rtl">فارسی و RTL</a></li><li><a href="#stack">فریم‌ورک‌ها</a></li><li><a href="#contribute">افزودن سبک تازه</a></li></ol>
</aside>
<div class="prose">
<p class="kicker">راهنما</p>
<h1 class="display">نصب، انتخاب و استفاده</h1>
<p class="lead">هر اسکیل تیست‌فولیو یک پوشهٔ مستقل با فایل <code>SKILL.md</code> است. دستیار کدنویسی پیش از ساختن رابط کاربری آن را می‌خواند و از توکن‌ها، قواعد چیدمان، مشخصات کامپوننت‌ها و چک‌لیست همان سبک پیروی می‌کند.</p>

<h2 id="install">۱. نصب</h2>
<p>یکی از روش‌های زیر را انتخاب کنید. نام هر اسکیل همان نام پوشهٔ آن است (مثلاً <code>${first}</code>).</p>
${installTabs(first, 'fa')}
<ul>
<li><strong>فقط برای یک پروژه:</strong> پوشه را در <code>.claude/skills/&lt;name&gt;</code> داخل همان پروژه بگذارید و کامیت کنید تا هم‌تیمی‌ها هم داشته باشند.</li>
<li><strong>برای همهٔ پروژه‌ها:</strong> پوشه را در <code>~/.claude/skills/&lt;name&gt;</code> بگذارید.</li>
<li><strong>همه با هم:</strong> <code>/plugin install tastefolio-all@tastefolio</code> همهٔ سبک‌ها را نصب می‌کند؛ اما در هر پروژه فقط یکی را به کار ببرید.</li>
</ul>

<h2 id="choose">۲. انتخاب سبک</h2>
<p>از نوع محصول شروع کنید، نه از رنگ. رنگ برند در همهٔ سبک‌ها قابل تغییر است؛ چیزی که سبک‌ها را از هم جدا می‌کند منطق چیدمان، تراکم اطلاعات، تایپوگرافی، ناوبری و رفتار تعامل‌هاست.</p>
${table}

<h2 id="use">۳. استفاده</h2>
<p>سبک را در درخواست نام ببرید یا در <code>CLAUDE.md</code> ثبت کنید تا در همهٔ گفتگوها رعایت شود:</p>
${codeBlock(`# CLAUDE.md\n## Design\nUse the Tastefolio "${first}" skill for every UI change.\nBrand color: #0f766e\nLanguages: fa (RTL, default) and en (LTR)\nStack: Next.js + Tailwind v4 + shadcn/ui`)}
<p>نمونهٔ درخواست‌ها:</p>
${codeBlock(`با سبک ${first} یک صفحهٔ فرود برای اپ رزرو کلاس بساز: هیرو، ویژگی‌ها، قیمت‌ها، سؤال‌های متداول و فرم ثبت‌نام.\n\nبرای همین محصول یک داشبورد کاربر بساز: خلاصهٔ آمار، جدول رزروها با فیلتر، تنظیمات حساب.`)}
<p>اسکیل‌ها برای هر دو نوع خروجی نوشته شده‌اند: سایت عمومی (لندینگ، قیمت‌ها، بلاگ، فروشگاه) و محصول (داشبورد، پنل کاربری، تنظیمات، فرم‌های طولانی).</p>

<h2 id="customize">۴. شخصی‌سازی بدون از دست دادن سبک</h2>
<ul>
<li><strong>رنگ برند:</strong> فقط <code>--brand</code> را عوض کنید؛ <code>--brand-soft</code> و <code>--brand-strong</code> با <code>color-mix()</code> از آن ساخته می‌شوند. هر اسکیل محدودهٔ مجاز رنگ برند را (مثلاً حداقل کنتراست) گفته است. در صفحهٔ هر اسکیل می‌توانید دمو را با رنگ برند دیگری ببینید.</li>
<li><strong>محتوا و نام برند:</strong> آزادانه تغییر کند؛ قواعد سبک به محتوای دموها وابسته نیست.</li>
<li><strong>حالت تیره:</strong> با <code>&lt;html data-theme="dark"&gt;</code>. سبک‌های تیره‌محور حالت روشن هم دارند و برعکس.</li>
<li><strong>فونت:</strong> اگر مجبور به تعویض فونت هستید، از جایگزین‌های همان بخش در <code>SKILL.md</code> استفاده کنید.</li>
</ul>

<h2 id="rtl">۵. فارسی و راست‌به‌چپ</h2>
<ul>
<li><code>&lt;html lang="fa" dir="rtl"&gt;</code> را تنظیم کنید؛ همهٔ کیت‌ها با ویژگی‌های منطقی CSS (مثل <code>margin-inline-start</code>) نوشته شده‌اند و خودبه‌خود آینه می‌شوند.</li>
<li>هر سبک فونت فارسی مخصوص خودش را دارد و ارتفاع خط و اندازه را برای فارسی تنظیم می‌کند.</li>
<li>روی متن فارسی هیچ‌وقت <code>letter-spacing</code> نگذارید؛ اتصال حروف را می‌شکند. ایتالیک هم نداریم؛ برای تأکید از وزن یا رنگ استفاده کنید.</li>
<li>اعداد را با <code>Intl.NumberFormat('fa-IR')</code> به رقم فارسی نمایش دهید و تاریخ را با تقویم شمسی (<code>Intl.DateTimeFormat('fa-IR')</code>).</li>
<li>آیکن‌های جهت‌دار (فلش، شِورون) را آینه کنید؛ آیکن‌های غیرجهت‌دار (جست‌وجو، ساعت) را نه.</li>
<li>از نیم‌فاصله در متن استفاده کنید: «می‌شود»، «داشبوردها».</li>
</ul>

<h2 id="stack">۶. React، Tailwind و shadcn/ui</h2>
<p>فایل <code>references/adapters.md</code> در هر اسکیل بلوک‌های آمادهٔ Tailwind نسخهٔ ۳ و ۴ و نگاشت متغیرهای shadcn/ui را دارد. <code>kit.css</code> پیاده‌سازی مرجع است: در پروژه‌های React آن را به کامپوننت تبدیل کنید و نام توکن‌ها را نگه دارید. استفاده از shadcn آزاد است، به شرط اعمال بخش «Component library overrides» در هر اسکیل؛ وگرنه خروجی شبیه پیش‌فرض shadcn می‌شود، نه شبیه آن سبک.</p>

<h2 id="contribute">۷. افزودن سبک تازه</h2>
${codeBlock(`skills/<name>/\n  SKILL.md              # frontmatter: name, description\n  meta.json             # gallery metadata (en + fa)\n  assets/tokens.css     # light, dark, fa overrides\n  assets/kit.css        # reference components\n  assets/kit.js         # synced from shared/kit.js\n  references/           # adapters.md (generated) + patterns\n  examples/site.html\n  examples/dashboard.html`)}
${codeBlock(`npm install\nnpm run sync      # copy runtime, regenerate adapters + marketplace\nnpm run check     # validate every skill\nnpm run shots     # real screenshots of every demo\nnpm run build     # gallery → dist/\nnpm run serve     # preview dist on :4174`)}
<p>پس از push به شاخهٔ <code>main</code>، گیت‌هاب اکشنز همهٔ اسکرین‌شات‌ها را از نو می‌گیرد، گالری را می‌سازد، لینک‌ها را بررسی می‌کند و روی GitHub Pages منتشر می‌کند.</p>
</div>`;
  }

  return `
<aside class="toc" aria-label="Contents">
  <p class="kicker">Guide</p>
  <ol><li><a href="#install">Install</a></li><li><a href="#choose">Choose a style</a></li><li><a href="#use">Use it</a></li><li><a href="#customize">Customize</a></li><li><a href="#rtl">Persian &amp; RTL</a></li><li><a href="#stack">Frameworks</a></li><li><a href="#contribute">Add a style</a></li></ol>
</aside>
<div class="prose">
<p class="kicker">Guide</p>
<h1 class="display">Install, choose, use</h1>
<p class="lead">Every Tastefolio skill is a standalone folder with a <code>SKILL.md</code>. Your coding agent reads it before touching UI and follows that style's tokens, layout rules, component specs and pre-ship checklist.</p>

<h2 id="install">1. Install</h2>
<p>Pick one method. A skill's name is its folder name (for example <code>${first}</code>).</p>
${installTabs(first, 'en')}
<ul>
<li><strong>One project:</strong> put the folder at <code>.claude/skills/&lt;name&gt;</code> inside the repo and commit it so teammates get it too.</li>
<li><strong>All your projects:</strong> put it at <code>~/.claude/skills/&lt;name&gt;</code>.</li>
<li><strong>Everything:</strong> <code>/plugin install tastefolio-all@tastefolio</code> installs every style — still use only one per project.</li>
</ul>

<h2 id="choose">2. Choose a style</h2>
<p>Start from what you are building, not from a color. Brand color is swappable in every skill; what separates the styles is layout logic, information density, typography, navigation and interaction behavior.</p>
${table}

<h2 id="use">3. Use it</h2>
<p>Name the style in your request, or record it in <code>CLAUDE.md</code> so every session follows it:</p>
${codeBlock(`# CLAUDE.md\n## Design\nUse the Tastefolio "${first}" skill for every UI change.\nBrand color: #0f766e\nLanguages: en (LTR, default) and fa (RTL)\nStack: Next.js + Tailwind v4 + shadcn/ui`)}
<p>Example requests:</p>
${codeBlock(`Using the ${first} style, build a landing page for a class-booking app:\nhero, features, pricing, FAQ and a sign-up form.\n\nNow build the signed-in dashboard for the same product:\nstats summary, bookings table with filters, account settings.`)}
<p>Every skill covers both kinds of output: public websites (landing, pricing, blog, store) and product UI (dashboards, user panels, settings, long forms).</p>

<h2 id="customize">4. Customize without losing the style</h2>
<ul>
<li><strong>Brand color:</strong> change only <code>--brand</code>; <code>--brand-soft</code> and <code>--brand-strong</code> derive from it with <code>color-mix()</code>. Each skill states the allowed range (e.g. minimum contrast). Every skill page lets you open the demos with a different brand color.</li>
<li><strong>Content and names:</strong> change freely — the rules never depend on demo content.</li>
<li><strong>Dark mode:</strong> <code>&lt;html data-theme="dark"&gt;</code>. Dark-first styles also define a light mode and vice versa.</li>
<li><strong>Fonts:</strong> if you must swap, use the fallbacks listed in that skill's <code>SKILL.md</code>.</li>
</ul>

<h2 id="rtl">5. Persian &amp; right-to-left</h2>
<ul>
<li>Set <code>&lt;html lang="fa" dir="rtl"&gt;</code>. Every kit uses CSS logical properties (<code>margin-inline-start</code>, <code>inset-inline-end</code>…) and mirrors automatically.</li>
<li>Each style ships its own Persian typeface pairing and adjusts size and line height for Persian.</li>
<li>Never apply <code>letter-spacing</code> to Persian text — it breaks letter joining. There is no italic; emphasize with weight or color.</li>
<li>Show numbers with Persian digits via <code>Intl.NumberFormat('fa-IR')</code> and dates in the Solar Hijri calendar via <code>Intl.DateTimeFormat('fa-IR')</code>.</li>
<li>Mirror directional icons (arrows, chevrons); never mirror non-directional ones (search, clock).</li>
</ul>

<h2 id="stack">6. React, Tailwind and shadcn/ui</h2>
<p><code>references/adapters.md</code> in every skill contains ready Tailwind v3/v4 blocks and a shadcn/ui variable mapping. <code>kit.css</code> is a reference implementation: port it to components in React projects and keep the token names. shadcn is welcome as long as you apply the skill's <em>Component library overrides</em> — otherwise you get default shadcn with new colors, not the style.</p>

<h2 id="contribute">7. Add a style</h2>
${codeBlock(`skills/<name>/\n  SKILL.md              # frontmatter: name, description\n  meta.json             # gallery metadata (en + fa)\n  assets/tokens.css     # light, dark, fa overrides\n  assets/kit.css        # reference components\n  assets/kit.js         # synced from shared/kit.js\n  references/           # adapters.md (generated) + patterns\n  examples/site.html\n  examples/dashboard.html`)}
${codeBlock(`npm install\nnpm run sync      # copy runtime, regenerate adapters + marketplace\nnpm run check     # validate every skill\nnpm run shots     # real screenshots of every demo\nnpm run build     # gallery → dist/\nnpm run serve     # preview dist on :4174`)}
<p>On every push to <code>main</code>, GitHub Actions re-captures all screenshots, builds the gallery, checks links and deploys to GitHub Pages.</p>
</div>`;
}
