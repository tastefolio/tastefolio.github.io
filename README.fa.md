<div dir="rtl">

# تیست‌فولیو

**مجموعه‌ای از اسکیل‌های زبان طراحی، متمایز و آمادهٔ استفاده برای عامل‌های هوش مصنوعیِ برنامه‌نویس.**
هر اسکیل یک پوشهٔ مستقل با `SKILL.md` است که یک زبان بصری کامل را به عامل یاد می‌دهد: توکن‌ها، منطق چیدمان،
تایپوگرافی، اجزا، رفتار تعاملی و چک‌لیست پیش از انتشار. هر اسکیل هم برای **سایت‌های عمومی** و هم برای
**داشبورد و پنل کاربری** به کار می‌آید و **فارسی (راست‌به‌چپ)** و **انگلیسی (چپ‌به‌راست)** را پشتیبانی می‌کند.

**گالری:** https://tastefolio.github.io/fa/ · **English:** https://tastefolio.github.io · **راهنما:** https://tastefolio.github.io/fa/guide/ · [English README](README.md)

- **۲۸ سبک** که در منطق چیدمان، تراکم، تایپوگرافی، ناوبری و تعامل با هم فرق دارند، نه فقط در رنگ.
- **۵۶ دموی کارکرده** (برای هر سبک یک سایت و یک داشبورد) با منو، تب، فیلتر، فرم، دیالوگ و نمودار واقعی؛ همه قابل جابه‌جایی بین فارسی و انگلیسی، روشن و تیره و هر رنگ برندی.
- **تصویر واقعی** از همهٔ دموها در گالری که با هر انتشار خودکار گرفته می‌شود.
- **بدون فریم‌ورک**: HTML و CSS ساده و یک اسکریپت کوچک مشترک، به‌همراه نگاشت Tailwind نسخهٔ ۳ و ۴ و shadcn/ui برای هر سبک.

## سبک‌ها

<!-- styles:start -->
| # | سبک | دسته | پیش‌فرض | تراکم | حال‌وهوا | دموها |
|---|---|---|---|---|---|---|
| 1 | [**Switchboard**](skills/switchboard/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/switchboard/) | محصول | روشن | متعادل | رابط کاربردی و آرام که هر گزینه در آن یک کلید روشن و ساده است | [سایت](https://tastefolio.github.io/skills/switchboard/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/switchboard/examples/dashboard.html?lang=fa) |
| 2 | [**Hearth**](skills/hearth/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/hearth/) | محصول | روشن | فشرده | شفافیت فنی و گرم — زمینهٔ کاغذی، دکمه‌های مشکی، برچسب‌های مونو و جدول‌های صادق | [سایت](https://tastefolio.github.io/skills/hearth/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/hearth/examples/dashboard.html?lang=fa) |
| 3 | [**Atelier**](skills/atelier/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/atelier/) | برند و فرهنگ | روشن | باز | معرفی محصول در حد گالری — تایپ عظیم و فشرده، تأکیدهای سریف، شیشه و حرکت | [سایت](https://tastefolio.github.io/skills/atelier/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/atelier/examples/dashboard.html?lang=fa) |
| 4 | [**Stratus**](skills/stratus/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/stratus/) | زیرساخت و ابر | روشن، فارسی‌محور | متعادل | پلتفرم سازمانی فارسی‌محور — منوی بزرگ محصولات، تیتر دوخطی و کنسول با ریل و زیرمنو | [سایت](https://tastefolio.github.io/skills/stratus/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/stratus/examples/dashboard.html?lang=fa) |
| 5 | [**Ultraviolet**](skills/ultraviolet/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/ultraviolet/) | زیرساخت و ابر | تیره، فارسی‌محور | متعادل | زیرساخت تیره‌محور برای هوش مصنوعی — فضای نیلی، نور بنفش، لبه‌های درخشان و سخت‌افزار ایزومتریک | [سایت](https://tastefolio.github.io/skills/ultraviolet/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/ultraviolet/examples/dashboard.html?lang=fa) |
| 6 | [**Tier**](skills/tier/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/tier/) | فروش | روشن، فارسی‌محور | متعادل | فروش پلن‌محور — جست‌وجوی دامنه، انتخاب دورهٔ پرداخت، نوار تخفیف و ناحیهٔ کاربری مرتب | [سایت](https://tastefolio.github.io/skills/tier/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/tier/examples/dashboard.html?lang=fa) |
| 7 | [**Datasheet**](skills/datasheet/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/datasheet/) | فروش | روشن، فارسی‌محور | فشرده | کاتالوگ مهندسی — فیلتر پارامتری، شمارهٔ قطعهٔ مونو، نقطهٔ LED موجودی و نمایشگر هفت‌قسمتی | [سایت](https://tastefolio.github.io/skills/datasheet/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/datasheet/examples/dashboard.html?lang=fa) |
| 8 | [**Sideload**](skills/sideload/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/sideload/) | محتوا و رسانه | روشن، فارسی‌محور | فشرده | پایگاه محتوا و دانلود — کارت مطلب، ویجت کناری و باکس دانلود با سرورها و نسخه‌ها | [سایت](https://tastefolio.github.io/skills/sideload/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/sideload/examples/dashboard.html?lang=fa) |
| 9 | [**Shelf**](skills/shelf/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/shelf/) | فروش | تیره، فارسی‌محور | متعادل | قفسه‌های فروشگاه اپ — آیکن‌های گرد، اسلایدرهای افقی، دکمه‌های کپسولی و زمینهٔ شبانهٔ بازیگوش | [سایت](https://tastefolio.github.io/skills/shelf/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/shelf/examples/dashboard.html?lang=fa) |
| 10 | [**Broadsheet**](skills/broadsheet/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/broadsheet/) | محتوا و رسانه | روشن | فشرده | سبک روزنامه — نام‌نشان، خطوط ستون، روتیتر و لید، و اتاق خبری که با تایپوگرافی ساخته شده | [سایت](https://tastefolio.github.io/skills/broadsheet/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/broadsheet/examples/dashboard.html?lang=fa) |
| 11 | [**Stamp**](skills/stamp/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/stamp/) | محصول | روشن | باز | نئوبروتالیسم بازیگوش — خط دور ضخیم، سایه‌های سختی که فشرده می‌شوند، رنگ‌های تخت برچسبی | [سایت](https://tastefolio.github.io/skills/stamp/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/stamp/examples/dashboard.html?lang=fa) |
| 12 | [**Raster**](skills/raster/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/raster/) | محتوا و رسانه | روشن | متعادل | نظام شبکهٔ سوئیسی — سیاه، سفید، یک قرمز، اعداد عظیم گروتسک و شبکهٔ ۱۲ستونه که دیده می‌شود | [سایت](https://tastefolio.github.io/skills/raster/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/raster/examples/dashboard.html?lang=fa) |
| 13 | [**Teletype**](skills/teletype/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/teletype/) | توسعه و داده | تیره | فشرده | رابط ترمینال‌محور — یک فونت تک‌فاصله، پنل‌های قاب‌کشیده، کنترل‌های [ کروشه‌دار ] و نوار وضعیت | [سایت](https://tastefolio.github.io/skills/teletype/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/teletype/examples/dashboard.html?lang=fa) |
| 14 | [**Kashi**](skills/kashi/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/kashi/) | برند و فرهنگ | روشن، فارسی‌محور | باز | میراث ایرانی — ستارهٔ گره، طاق جناغی، کتیبهٔ کاشی و عنوان‌های کتیبه‌وار روی گچ عاجی | [سایت](https://tastefolio.github.io/skills/kashi/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/kashi/examples/dashboard.html?lang=fa) |
| 15 | [**Ticker**](skills/ticker/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/ticker/) | توسعه و داده | تیره، فارسی‌محور | فشرده | میز کار بازار — موزاییک پنل‌ها با خط مویی، اعداد تک‌فاصلهٔ جدولی، سبز و قرمز فقط برای بالا و پایین | [سایت](https://tastefolio.github.io/skills/ticker/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/ticker/examples/dashboard.html?lang=fa) |
| 16 | [**Clay**](skills/clay/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/clay/) | محصول | روشن | باز | سلامت نرم و لمسی — سطح‌های پف‌دار گِلی، کاشی‌های پاستلی، کنترل‌هایی که در صفحه فرو رفته‌اند | [سایت](https://tastefolio.github.io/skills/clay/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/clay/examples/dashboard.html?lang=fa) |
| 17 | [**Maison**](skills/maison/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/maison/) | فروش | روشن | باز | لوکس آرام — تیتر دیدون، حروف کوچکِ فاصله‌دار، خطوط مویی و فضای سفید فراوان | [سایت](https://tastefolio.github.io/skills/maison/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/maison/examples/dashboard.html?lang=fa) |
| 18 | [**Bento**](skills/bento/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/bento/) | محصول | روشن | متعادل | مدرن و ماژولار — هر ایده در کاشی گرد خودش، روی یک شبکهٔ آرام | [سایت](https://tastefolio.github.io/skills/bento/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/bento/examples/dashboard.html?lang=fa) |
| 19 | [**Aisle**](skills/aisle/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/aisle/) | فروش | روشن، فارسی‌محور | فشرده | فروشگاه مدرن — جست‌وجوی بزرگ، مگامنو، ریل پیشنهاد مرجانی و کارت محصولی که به شمارنده تبدیل می‌شود | [سایت](https://tastefolio.github.io/skills/aisle/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/aisle/examples/dashboard.html?lang=fa) |
| 20 | [**Syllabus**](skills/syllabus/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/syllabus/) | محتوا و رسانه | روشن، فارسی‌محور | متعادل | آکادمی آنلاین — هیرو سرمه‌ای با کاغذ شطرنجی، اقدام‌های ماژیکی، سرفصل با پیش‌نمایش رایگان و پخش‌کنندهٔ واقعی درس | [سایت](https://tastefolio.github.io/skills/syllabus/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/syllabus/examples/dashboard.html?lang=fa) |
| 21 | [**Brief**](skills/brief/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/brief/) | برند و فرهنگ | روشن، فارسی‌محور | متعادل | استودیوی طراحی و ساخت — تیترهای پهن، صحنهٔ جوهری برای نمونه‌کار، قاب‌های مرورگر با پیمایش و پنل مشتری با بازخورد پین‌شده | [سایت](https://tastefolio.github.io/skills/brief/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/brief/examples/dashboard.html?lang=fa) |
| 22 | [**Lucent**](skills/lucent/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/lucent/) | محصول | تیره، فارسی‌محور | متعادل | شیشهٔ مایع — کپسول‌های شیشه‌ای شکست‌دهندهٔ نور روی شفقی که رنگش را از آهنگ در حال پخش می‌گیرد | [سایت](https://tastefolio.github.io/skills/lucent/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/lucent/examples/dashboard.html?lang=fa) |
| 23 | [**Clinic**](skills/clinic/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/clinic/) | محصول | روشن، فارسی‌محور | متعادل | نوبت‌دهی پزشکی — هیروی جست‌وجومحور، کارت پزشک با زمان خالی، انتخاب‌گر ساعت و پنل بیمار با حروفی بسیار خوانا | [سایت](https://tastefolio.github.io/skills/clinic/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/clinic/examples/dashboard.html?lang=fa) |
| 24 | [**Linework**](skills/linework/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/linework/) | توسعه و داده | روشن | فشرده | خط‌کشی فنی — صفحه‌ای با خطوط یک‌پیکسلی و علامت‌های تقاطع، جوهر سیاه به‌عنوان تنها رنگ برند، برچسب‌های تک‌فاصله و کنسول توسعه‌دهنده | [سایت](https://tastefolio.github.io/skills/linework/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/linework/examples/dashboard.html?lang=fa) |
| 25 | [**Estate**](skills/estate/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/estate/) | فروش | روشن، فارسی‌محور | متعادل | آگهی ملک — کاغذ سنگی، اقدام‌های سبز خزه‌ای، قیمت با حروف سریف، فهرست کنار نقشه با پین قیمت و پنل مشاور با قیف مشتری | [سایت](https://tastefolio.github.io/skills/estate/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/estate/examples/dashboard.html?lang=fa) |
| 26 | [**Margin**](skills/margin/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/margin/) | محتوا و رسانه | روشن، فارسی‌محور | باز | خواندن طولانی — کاغذ گرم، ستون باریک متن، یادداشت‌های شماره‌دار در حاشیهٔ پهن، ماژیک خواننده و میز آرام نویسنده | [سایت](https://tastefolio.github.io/skills/margin/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/margin/examples/dashboard.html?lang=fa) |
| 27 | [**Dot**](skills/dot/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/dot/) | برند و فرهنگ | روشن، فارسی‌محور | متعادل | سخت‌افزار نقطه‌ای — کاغذی یا سیاه، یک قرمز LED، حروف نمایشی از نقطه، دستگاه طراحی‌شده با صفحهٔ زندهٔ ۱۵×۱۵ و اپ دستگاه با سازندهٔ نشانه | [سایت](https://tastefolio.github.io/skills/dot/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/dot/examples/dashboard.html?lang=fa) |
| 28 | [**Passage**](skills/passage/SKILL.md) · [صفحه](https://tastefolio.github.io/fa/skills/passage/) | محصول | روشن، فارسی‌محور | متعادل | اسناد سفر در قالب رابط کاربری — کاغذ امنیتی با نقش گیوشه، کارت پرواز برای برنامه‌ها، مهر لاستیکی برای هر مرحله، سنجش امتیاز و پنلی که مثل گذرنامه ساخته شده | [سایت](https://tastefolio.github.io/skills/passage/examples/site.html?lang=fa) · [داشبورد](https://tastefolio.github.io/skills/passage/examples/dashboard.html?lang=fa) |
<!-- styles:end -->

دموها پارامترهای `?lang=en`، `?theme=dark` و `?brand=ff5a36` (هر کد رنگ) را می‌پذیرند تا سبک را با برند خودتان امتحان کنید.

## نصب

یکی از روش‌ها را انتخاب کنید. نام هر اسکیل همان نام پوشه‌اش است (مثلاً `kashi`). در هر پروژه **فقط یک سبک** به کار ببرید.

**بازارچهٔ پلاگین Claude Code**

<div dir="ltr">

```
/plugin marketplace add tastefolio/tastefolio.github.io
/plugin install kashi@tastefolio
```

</div>

دستور `/plugin install tastefolio-all@tastefolio` همهٔ سبک‌ها را یک‌جا نصب می‌کند.

**ابزار skills** (برای عامل‌هایی که قالب باز `SKILL.md` را می‌شناسند)

<div dir="ltr">

```bash
npx skills add tastefolio/tastefolio.github.io --skill kashi
```

</div>

**نصب دستی**

پوشهٔ `skills/<name>/` را در `.claude/skills/<name>/` داخل مخزن پروژه (برای همهٔ اعضای تیم) یا در
`~/.claude/skills/<name>/` (برای همهٔ پروژه‌های خودتان) کپی کنید. فایل فشردهٔ هر سبک در
`https://tastefolio.github.io/downloads/<name>.zip` و همهٔ سبک‌ها با هم در
[`tastefolio-skills.zip`](https://tastefolio.github.io/downloads/tastefolio-skills.zip) منتشر شده‌اند. اگر ابزارتان
اسکیل را نمی‌شناسد، `SKILL.md` را به قوانین پروژه اضافه کنید یا عامل را به آن ارجاع دهید.

## انتخاب سبک

از چیزی که می‌سازید شروع کنید، نه از رنگ؛ هر سبکی رنگ برند شما را می‌پذیرد.

| اگر این را می‌سازید… | از این شروع کنید |
|---|---|
| محصول SaaS یا ابزار کاربردی با تنظیمات زیاد | Switchboard |
| زیرساخت توسعه‌دهنده با لحن فنی و صادق | Hearth · Teletype |
| معرفی محصولی که باید در حد گالری دیده شود | Atelier |
| پلتفرم سازمانی یا ابری فارسی‌محور | Stratus |
| هوش مصنوعی، GPU یا زیرساخت با هویت تیره | Ultraviolet |
| هاستینگ، پلن‌ها و ناحیهٔ کاربری | Tier |
| کاتالوگ مهندسی و قطعات | Datasheet |
| پایگاه محتوا، دانلود یا منابع | Sideload |
| فروشگاه اپ، بازی یا قفسه‌های رسانه | Shelf |
| خبر، مجله و محصولات سردبیری | Broadsheet |
| آموزش، جامعه یا برند بازیگوش | Stamp |
| فرهنگ، معماری، برنامه‌ها و جدول زمانی | Raster |
| پذیرایی، میراث و صنایع‌دستی با صدای ایرانی | Kashi |
| معامله، بانکداری و تحلیل | Ticker |
| سلامت، عادت، کودک و خانواده | Clay |
| مد، عطر، اشیای لوکس و خدمات بوتیک | Maison |
| صفحهٔ محصول مدرن یا داشبوردی از ابزارک‌ها | Bento |
| فروشگاه اینترنتی بزرگ، سوپرمارکت یا بازارگاه | Aisle |
| دوره‌های آنلاین، آکادمی و پنل دانشجو | Syllabus |
| استودیوی طراحی، آژانس یا فریلنسر با پنل مشتری | Brief |
| موسیقی، پادکست، پخش‌کننده و اپ‌های مصرفی لوکس | Lucent |
| درمانگاه، نوبت‌دهی پزشک و پنل بیمار | Clinic |
| پلتفرم توسعه‌دهنده، API، مستندات و کنسول | Linework |
| آگهی ملک، آژانس املاک و پنل مشاور | Estate |
| جستار، خبرنامه، متن بلند و ابزار نویسنده | Margin |
| سخت‌افزار، گجت، خانهٔ هوشمند و اپ همراه | Dot |

## استفاده

نام سبک را در درخواست‌تان بیاورید یا آن را در `CLAUDE.md` ثبت کنید تا همهٔ نشست‌ها از آن پیروی کنند:

<div dir="ltr">

```md
## Design
Use the Tastefolio "kashi" skill for every UI change.
Brand color: #0c7c7a
Languages: fa (RTL, default) and en (LTR)
Stack: Next.js + Tailwind v4 + shadcn/ui
```

</div>

نمونهٔ درخواست:

```
با سبک kashi صفحهٔ اصلی یک رستوران سنتی را بساز:
سربرگ، منوی تب‌دار، برنامه‌های هفته، رزرو میز و پانویس.

حالا پنل مدیریت همان رستوران را بساز:
آمار امروز، نقشهٔ میزها، جدول رزروها با جست‌وجو و تنظیمات.
```

عامل قوانین هویتی، توکن‌ها و الگوهای اسکیل را می‌خواند، از کیت استفاده می‌کند (یا با `references/adapters.md` آن را
روی پشتهٔ شما پیاده می‌کند) و کارش را با چک‌لیست پیش از انتشار می‌سنجد.

## درون هر اسکیل

<div dir="ltr">

```
skills/kashi/
├── SKILL.md                  # identity rules, tokens, patterns for sites and dashboards, RTL, a11y, checklist
├── meta.json                 # gallery metadata (en + fa)
├── assets/
│   ├── tokens.css            # required: semantic tokens, dark theme, Persian overrides
│   ├── kit.css               # reference components for this style
│   └── kit.js                # shared runtime (copied from shared/kit.js)
├── references/adapters.md    # Tailwind v4 @theme, Tailwind v3 config, shadcn/ui variable mapping
└── examples/
    ├── site.html             # public website demo
    └── dashboard.html        # dashboard / user panel demo
```

</div>

سبکی که رفتار مخصوص خودش را لازم دارد، آن را به‌صورت یک فایل اضافه کنار کیت می‌آورد؛ مثلاً `assets/matrix.js` در
Dot صفحهٔ LED و ویرایشگر نشانه را می‌سازد.

همهٔ فایل‌های `tokens.css` نام‌های معنایی یکسانی دارند (`--canvas`، `--surface`، `--ink`، `--line`، `--brand`،
`--success`…، `--chart-*`، `--font-*`، `--fs-*`، `--space-*`، `--radius-*`)؛ برای همین کیت‌ها، نگاشت‌ها و نمودارها در همهٔ
سبک‌ها یکسان کار می‌کنند و هر سبک مقدارها و قوانین خودش را دارد.

## شخصی‌سازی بدون از دست رفتن سبک

- **رنگ برند:** فقط `--brand` را عوض کنید؛ `--brand-soft` و `--brand-strong` از آن ساخته می‌شوند. محدودهٔ مجاز هر سبک در `SKILL.md` آن آمده است.
- **حالت تیره:** `<html data-theme="dark">` (سبک‌های تیره‌محور حالت روشن هم دارند).
- **فارسی و راست‌به‌چپ:** `<html lang="fa" dir="rtl">`. کیت‌ها با ویژگی‌های منطقی CSS نوشته شده‌اند و خودبه‌خود آینه
  می‌شوند. فارسی در همهٔ سبک‌ها با **وزیرمتن** نوشته می‌شود؛ اعداد با رقم فارسی و تاریخ با تقویم شمسی از طریق `Intl`.
- **فریم‌ورک‌ها:** `references/adapters.md` توکن‌ها را به Tailwind نسخهٔ ۴ (`@theme inline`)، Tailwind نسخهٔ ۳ و shadcn/ui نگاشت می‌کند.

## اسکریپت مشترک

`shared/kit.js` (حدود ۵۰ کیلوبایت، ۱۶ کیلوبایت فشرده، بدون وابستگی) همهٔ دموها را با ویژگی‌های اعلانی راه می‌اندازد:
تغییر زبان و پوسته، تب، گروه دکمه‌ها، سوییچ، دیالوگ و کشو، فیلتر و جست‌وجوی زنده، مرتب‌سازی جدول، اعتبارسنجی فرم،
ویزارد چندمرحله‌ای، گام‌شمار، فیلدهای شرطی، اسلایدر، اعلان، پالت فرمان و میان‌برها، دکمهٔ کپی، قالب‌بندی عدد و تاریخ با
`Intl` (رقم فارسی، تاریخ شمسی، مدت زمان) و نمودارهای SVG: خطی، سطحی، میله‌ای، انباشته، کوچک، دونات و شمعی.
توضیح همهٔ این قلاب‌ها در کامنت ابتدای همان فایل آمده است.

## توسعه

به Node نسخهٔ ۲۰ یا بالاتر نیاز دارید.

<div dir="ltr">

```bash
npm ci
npx playwright install chromium
npm run dev
```

</div>

دستور `npm run dev` مخزن را روی http://localhost:4173 سرو می‌کند؛ نشانی `/skills/<name>/examples/site.html` را باز کنید.

| دستور | کارش |
|---|---|
| `npm run sync` | `shared/kit.js` را در همهٔ اسکیل‌ها کپی می‌کند و `references/adapters.md` و `.claude-plugin/marketplace.json` را از نو می‌سازد |
| `npm run check` | همهٔ اسکیل‌ها را بررسی می‌کند: فایل‌های لازم، frontmatter، `meta.json`، اتصال دموها و بازارچه |
| `npm run shots` | از همهٔ دموها در دسکتاپ و موبایل و به هر دو زبان عکس می‌گیرد (Playwright) |
| `npm run build` | گالری را در `dist/` می‌سازد (صفحه‌های فارسی و انگلیسی، فایل‌های فشرده، `catalog.json`، `llms.txt` و نقشهٔ سایت)؛ اگر `GITHUB_TOKEN` تنظیم شده باشد، رأی‌های 👍 هر اسکیل را هم برای ترتیب «محبوب‌ترین» می‌خواند |
| `npm run linkcheck` | همهٔ پیوندها و فایل‌های داخلی `dist/` را بررسی می‌کند |
| `npm run test:gallery` | گالری ساخته‌شده را در Chromium امتحان می‌کند: فیلترها، جست‌وجو و شمارش‌ها، نمایشگر عکس‌ها، زبانه‌های نصب، منوی موبایل و نبودِ اسکرول افقی در عرض ۳۲۰ و ۳۹۰ پیکسل |
| `npm run ci` | همهٔ موارد بالا به ترتیب؛ همان چیزی که GitHub Actions اجرا می‌کند |
| `npm run serve` | پوشهٔ `dist/` را روی http://localhost:4174 سرو می‌کند |

هر push به شاخهٔ `main` همین فرایند را اجرا و گالری را روی GitHub Pages منتشر می‌کند
(`.github/workflows/pages.yml`). این فرایند هر ساعت هم یک بار اجرا می‌شود تا رأی‌های تازه را بخواند: هر کارت گالری و صفحهٔ هر اسکیل
جعبهٔ رأی 👍 و نظر دارد (GitHub Discussions از طریق giscus) و ترتیب «محبوب‌ترین» در گالری همین 👍ها را می‌شمارد.

**افزودن سبک تازه:** پوشهٔ `skills/<name>/` را با فایل‌های بالا بسازید (یک اسکیل موجود را نقطهٔ شروع بگیرید)، قوانین
هویتی خودش را بنویسید، هر دو دمو را با خود اسکیل بسازید و بعد `npm run ci` را اجرا کنید و عکس‌ها را ببینید.

## مجوز

[MIT](LICENSE). فونت‌ها و آیکن‌ها از Google Fonts و jsDelivr با مجوزهای باز خودشان (SIL OFL / MIT) بارگذاری می‌شوند.
همهٔ برندها، افراد و داده‌های دموها ساختگی و نمونه‌اند.

</div>
