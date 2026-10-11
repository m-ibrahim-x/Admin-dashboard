# دليل نظام الألوان للمشروع

## Color System Reference --- Light Mode & Dark Mode

## الهدف من الملف

هذا الملف هو المرجع الأساسي للألوان عند تصميم أو تعديل أي واجهة في
المشروع. يجب الالتزام بقيم الألوان المحددة هنا في الوضعين الفاتح
والداكن، مع استخدام أسماء الـ Tailwind CSS Tokens الموجودة فعليًا في
`src/index.css`.

**الأولوية الحالية:** توحيد الألوان الأساسية وتطبيقها بشكل صحيح في Light
Mode وDark Mode. تأثيرات الحركة والـ hover المتقدمة مثل التدرجات
والإضاءة ليست ضمن الأولوية الحالية، ولا يجوز أن تؤدي إلى تغيير لوحة
الألوان الأساسية.

## 1. قواعد إلزامية للـ AI

1.  اقرأ هذا الملف و`src/index.css` قبل تصميم أي صفحة أو تعديل أي
    Component.
2.  حافظ على قيم HEX الموضحة في هذا الدليل كما هي.
3.  استخدم Tailwind Tokens المحددة في هذا الملف بدل كتابة قيم HEX مباشرة
    داخل JSX/CSS عند تطبيق الألوان الأساسية.
4.  لا تخترع أسماء Tokens ولا تستخدم أسماء قديمة من مشروع آخر. أسماء الـ
    Tokens في هذا الملف مطابقة لتعريفات `@theme` الحالية في
    `src/index.css`.
5.  لا تستبدل أسماء الـ Tokens بأسماء مثل `bg-card` أو `text-primary` أو
    `border-border-custom`؛ هذه ليست أسماء الـ Tokens المعرّفة في
    `index.css` الحالي.
6.  لا تعدّل لوحة الألوان أو `src/index.css` لمجرد تنفيذ تصميم صفحة، إلا
    إذا طلب المستخدم تعديل نظام الألوان صراحةً.
7.  تأكد من أن كل عنصر يستخدم اللون الموافق لوظيفته في الجدول، في
    الوضعين الفاتح والداكن.
8.  حافظ على وضوح النصوص وتباينها مع الخلفية في الوضعين.
9.  لا تغيّر منطق التطبيق أو الـ API أو الـ routing أو بنية المكونات
    أثناء تطبيق ألوان الواجهة، إلا إذا كان ذلك مطلوبًا صراحةً.
10. لا تعِد تصميم تأثيرات الـ hover أو التدرجات أو الـ glow ضمن هذه
    المهمة. يمكن الاحتفاظ بالتأثيرات الموجودة بالفعل ما دامت لا تغيّر
    الألوان الأساسية ولا تضر بوضوح العناصر.
11. إذا كان هناك عنصر أو حالة لا يغطيها الدليل، استخدم أقرب Token موجود
    يناسب الوظيفة، واذكر النقص بدل اختراع لون أساسي جديد.
12. افحص الواجهة في الوضعين بعد التنفيذ؛ لا تفترض أن استخدام Token وحده
    يضمن صحة النتيجة إذا كان الـ Component يضع خلفية أو نصًا غير مناسب.

## 2. الألوان الأساسية وقواعد استخدامها

  -----------------------------------------------------------------------------------
  الدور البصري   Light Mode HEX Dark Mode HEX  Token في Tailwind       الاستخدام
  -------------- -------------- -------------- ----------------------- --------------
  خلفية الصفحة   `#f8f8f6`      `#0d0e10`      `bg-bg-main`            خلفية الصفحة
  الرئيسية                                                             العامة ومساحة
                                                                       المحتوى
                                                                       الرئيسية

  خلفية الكروت   `#ffffff`      `#161719`      `bg-card-bg`            الكروت،
  والـ Sidebar                                                         القوائم
                                                                       الجانبية،
                                                                       الجداول،
                                                                       النوافذ
                                                                       المنبثقة والـ
                                                                       panels

  خلفية حقول     `#f0f0ed`      `#1a1b1d`      `bg-input-bg`           حقول النصوص
  الإدخال والبحث                                                       والبحث
                                                                       والقوائم
                                                                       المنسدلة

  النص الأساسي   `#1a1b1d`      `#f2f2f0`      `text-text-primary`     العناوين،
                                                                       أسماء المنتجات
                                                                       والعملاء،
                                                                       والقيم المهمة

  النص الثانوي   `#5a5955`      `#c9c8c3`      `text-text-secondary`   الوصف، النصوص
  والأيقونات                                                           التوضيحية،
  المحايدة                                                             البيانات
                                                                       الثانوية
                                                                       والأيقونات
                                                                       المحايدة

  لون الهوية     `#b88322`      `#e3b158`      `bg-brand-active` /     الأزرار
  الأساسي                                      `text-brand-active` /   الأساسية،
                                               `border-brand-active`   الروابط
                                                                       النشطة، مؤشرات
                                                                       الاختيار
                                                                       والتركيز

  لون الهوية عند `#d9a441`      `#d9a441`      `bg-brand-hover` /      لون hover
  Hover                                        `text-brand-hover` /    للعناصر التي
                                               `border-brand-hover`    تستخدم لون
                                                                       الهوية، عند
                                                                       الحاجة

  خلفية العنصر   `#fcf4e4`      `#332813`      `bg-active-bg`          رابط Sidebar
  النشط                                                                النشط، العنصر
                                                                       المحدد،
                                                                       والتبويب
                                                                       المختار

  الحدود         `#e5e5e0`      `#2a2b2e`      `border-border-main` /  حدود الكروت
  والفواصل                                     `divide-border-main`    والمدخلات
                                                                       والفواصل وخطوط
                                                                       الجداول

  العناصر        `#d4d3ce`      `#3a3b3e`      `bg-disabled` /         خلفية الأزرار
  المعطلة                                      `border-disabled`       والحقول
                                                                       المعطلة

  النجاح         `#10b981`      `#34d399`      `text-status-success` / نجاح العمليات
                                               `bg-status-success`     والحالات
                                                                       المكتملة

  التحذير        `#f59e0b`      `#fbbf24`      `text-status-warning` / التحذيرات
                                               `bg-status-warning`     والحالات التي
                                                                       تحتاج انتباهًا

  الخطر والخطأ   `#c6604f`      `#c6604f`      `text-status-danger` /  الأخطاء والحذف
                                               `bg-status-danger`      والحالات
                                                                       الملغاة

  المعلومات      `#3b82f6`      `#60a5fa`      `text-status-info` /    الرسائل
                                               `bg-status-info`        المعلوماتية
                                                                       والحالات قيد
                                                                       المعالجة
  -----------------------------------------------------------------------------------

## 3. قواعد استخدام الألوان حسب العنصر

### خلفية الصفحة والتخطيط

-   استخدم `bg-bg-main` لخلفية الصفحة ومساحة المحتوى الأساسية.
-   استخدم `bg-card-bg` لأسطح الـ Header والـ Sidebar والكروت والـ
    panels.
-   افصل المناطق باستخدام `border-border-main`.
-   لا تستخدم خلفية داكنة ثابتة داخل Component يفترض أن يعمل في الوضعين.

### النصوص والأيقونات

-   استخدم `text-text-primary` للنصوص الرئيسية والعناوين والقيم المهمة.
-   استخدم `text-text-secondary` للوصف والبيانات الثانوية والأيقونات
    المحايدة.
-   استخدم `text-brand-active` للأيقونات أو النصوص التي تمثل عنصرًا نشطًا
    أو الهوية البصرية.
-   تجنب وضع نص ثانوي على خلفية لا تحقق تباينًا كافيًا.

### الأزرار

-   الزر الأساسي يستخدم `bg-brand-active`، مع لون نص متباين وواضح:
    `text-bg-main` هو الاختيار الافتراضي وفق لوحة الألوان الحالية، بشرط
    التأكد بصريًا من وضوحه في الوضعين.
-   يمكن الاحتفاظ بتأثيرات hover والتدرج والإضاءة الموجودة حاليًا، لكنها
    ليست أولوية ولا ينبغي أن تغيّر قيم الألوان الأساسية.
-   الأزرار الثانوية تستخدم `bg-card-bg` أو `bg-input-bg` مع
    `border-border-main` و`text-text-primary`.
-   زر الإلغاء يستخدم ألوانًا محايدة مناسبة من `bg-input-bg`
    و`text-text-secondary`.
-   أزرار الحذف تستخدم `text-status-danger`، ويمكن استخدام خلفية خفيفة
    مناسبة عند الحاجة.
-   الأزرار المعطلة تستخدم `bg-disabled` مع نص واضح ومقروء.

### الروابط والقائمة الجانبية

-   الرابط غير النشط: `text-text-secondary` وخلفية شفافة.
-   الرابط النشط: `bg-active-bg` مع `text-brand-active`.
-   حالة hover: يمكن استخدام `bg-active-bg`، مع الحفاظ على النص مقروءًا.
-   زر تسجيل الخروج يستخدم `text-text-secondary` في الحالة العادية
    و`text-status-danger` عند hover.

### الجداول وقوائم البيانات

-   خلفية الجدول والصفوف: `bg-card-bg`.
-   رأس الجدول: `bg-input-bg` مع `text-text-secondary`.
-   النص الرئيسي داخل الصف: `text-text-primary`.
-   التفاصيل الثانوية: `text-text-secondary`.
-   الفواصل: `divide-border-main` أو `border-border-main`.
-   الصف المحدد أو عند hover: `bg-active-bg` عند ملاءمته.

### النماذج وحقول الإدخال

-   خلفية الحقول: `bg-input-bg`.
-   النص المكتوب: `text-text-primary`.
-   النص الإرشادي: `placeholder:text-text-secondary`.
-   الحدود: `border-border-main`.
-   حالة التركيز: `focus:border-brand-active` و/أو
    `focus:ring-brand-active` إذا كانت متوافقة مع المكوّن.
-   حالة الخطأ: `border-status-danger` و`text-status-danger`.
-   الحقول المعطلة: `bg-disabled`.

### بطاقات الإحصائيات

-   خلفية البطاقة: `bg-card-bg`.
-   الحدود: `border-border-main`.
-   عنوان الإحصائية: `text-text-secondary`.
-   الرقم أو القيمة الأساسية: `text-text-primary`.
-   خلفية الأيقونة يمكن أن تستخدم `bg-active-bg`، والأيقونة
    `text-brand-active`.

### الحالات والإشعارات

-   النجاح: `text-status-success` أو `bg-status-success` وفق نوع المكوّن.
-   التحذير: `text-status-warning` أو `bg-status-warning`.
-   الخطأ أو الحذف: `text-status-danger` أو `bg-status-danger`.
-   المعلومات: `text-status-info` أو `bg-status-info`.
-   لا تستخدم ألوان الحالات كألوان زخرفية عامة. يجب أن تعكس الحالة معنى
    حقيقيًا.
-   عند استخدام لون الحالة كخلفية، تأكد من تباين النص فوقه؛ يمكن استخدام
    لون الحالة للنص أو المؤشر بدلًا من ملء الخلفية بالكامل.

## 4. ملاحظات حول Tailwind Tokens

الأسماء التالية مبنية على قسم `@theme` الحالي في `src/index.css`:

-   `bg-bg-main` ← `--color-bg-main` ← `--theme-bg-main`
-   `bg-card-bg` ← `--color-card-bg` ← `--theme-card-bg`
-   `bg-input-bg` ← `--color-input-bg` ← `--theme-input-bg`
-   `text-text-primary` ← `--color-text-primary` ←
    `--theme-text-primary`
-   `text-text-secondary` ← `--color-text-secondary` ←
    `--theme-text-secondary`
-   `bg-brand-active` / `text-brand-active` ← `--color-brand-active` ←
    `--theme-brand-active`
-   `bg-brand-hover` / `text-brand-hover` ← `--color-brand-hover` ←
    `--theme-brand-hover`
-   `bg-active-bg` ← `--color-active-bg` ← `--theme-active-bg`
-   `border-border-main` ← `--color-border-main` ← `--theme-border-main`
-   `bg-disabled` ← `--color-disabled` ← `--theme-disabled`
-   `text-status-success` / `bg-status-success` ←
    `--color-status-success` ← `--theme-status-success`
-   `text-status-warning` / `bg-status-warning` ←
    `--color-status-warning` ← `--theme-status-warning`
-   `text-status-danger` / `bg-status-danger` ← `--color-status-danger`
    ← `--theme-status-danger`
-   `text-status-info` / `bg-status-info` ← `--color-status-info` ←
    `--theme-status-info`

لا تستخدم أسماء Tokens غير معرفة في `@theme`. إذا كان Token مطلوبًا في
مثال أعلاه غير متاح في نسخة Tailwind أو إعداد المشروع، تحقق من التكوين
الفعلي قبل تعديل `index.css`.

## 5. قواعد التحقق قبل إنهاء أي تصميم

-   [ ] خلفية الصفحة تستخدم `bg-bg-main` وتظهر بشكل صحيح في الوضعين.
-   [ ] الكروت والـ Header والـ Sidebar تستخدم `bg-card-bg`.
-   [ ] النصوص الرئيسية والثانوية تستخدم Tokens الصحيحة.
-   [ ] الأزرار الأساسية تستخدم لون الهوية المناسب في كل وضع.
-   [ ] العناصر النشطة تستخدم `bg-active-bg` و`text-brand-active`.
-   [ ] الحدود تستخدم `border-border-main`.
-   [ ] ألوان الحالات تعكس معانيها الصحيحة.
-   [ ] لا توجد قيم HEX جديدة مضافة عشوائيًا داخل المكونات.
-   [ ] تم فحص الشاشة في Light Mode وDark Mode.
-   [ ] لم تتغير الوظائف أو الـ API أو الـ routing بسبب تعديل الألوان.

## الأولوية

**صحة الألوان الأساسية في Light Mode وDark Mode أهم من مؤثرات hover أو
التدرجات أو الإضاءة.** حافظ على المؤثرات الموجودة إذا كانت تعمل جيدًا،
لكن لا تضف مؤثرات جديدة ولا تغيّر لوحة الألوان الأساسية إلا بطلب صريح.
