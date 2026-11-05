// Arabic descriptions for the generated API reference (apps/docs/lib/generated/api.json).
// Keyed `slug.Part` for a part and `slug.Part.prop` for a prop. build-api.ts fails when a part
// or prop with an English description has no entry here, so a new prop ships in both languages.
// Prop names, values, token names and code stay in English.

const render =
  "يتيح لك استبدال عنصر HTML الخاص بالمكوّن بوسم آخر، أو تركيبه مع مكوّن آخر. يقبل `ReactElement` أو دالة تعيد العنصر المراد عرضه.";
const iconOnly = "مربع بأيقونة فقط. يحتاج إلى `aria-label`.";
const outlined = "بإطار فقط بدل التعبئة.";
const rounded = "زوايا مستديرة بالكامل (على شكل حبة).";

export const API_DESCRIPTIONS_AR: Record<string, string> = {
  // Avatar
  "avatar.Avatar": "صورة شخص أو الأحرف الأولى من اسمه أو أيقونة مستخدم عامة.",
  "avatar.Avatar.size": "الحجم بالبكسل.",
  "avatar.Avatar.square": "مربع بزوايا مستديرة بدل الدائرة.",
  "avatar.Avatar.bordered": "يضيف حلقة حول الصورة الرمزية.",
  "avatar.Avatar.initials": "حرف أو حرفان يظهران عند عدم وجود صورة.",
  "avatar.Avatar.src":
    "رابط الصورة. إن غاب الرابط أو فشل تحميل الصورة تظهر الأحرف الأولى أو الأيقونة.",
  "avatar.Avatar.alt": "النص البديل للصورة. استخدم اسم الشخص.",
  "avatar.AvatarGroup":
    'صف من الصور الرمزية. ضع Avatar بأحرف مثل "+3" في النهاية للدلالة على الباقي.',
  "avatar.AvatarGroup.stacked": "تداخل الصور الرمزية (في Figma: Stacked).",
  // Badge
  "badge.Badge": "وسم قصير غير تفاعلي للحالة أو العدد أو التصنيف.",
  "badge.Badge.variant": "عائلة اللون. `on-color` للشارات على الخلفيات ذات لون العلامة.",
  "badge.Badge.size": "الارتفاع: `sm` ‏20px، و`md` ‏24px، و`lg` ‏32px.",
  "badge.Badge.outlined": outlined,
  "badge.Badge.rounded": rounded,
  "badge.Badge.iconOnly": iconOnly,
  // Button
  "button.Button":
    "ينفّذ إجراءً. ستة أنماط، ونسختان للإجراءات الحاذفة وللخلفيات الملونة، وثلاثة أحجام، وزر بأيقونة فقط وحالة تحميل.",
  "button.Button.variant":
    "النمط. `neutral` يقابل Primary-Neutral في Figma، و`secondary` يقابل Secondary-Solid، و`outline` يقابل Secondary-Outline.",
  "button.Button.size": "الارتفاع: `sm` ‏24px، و`md` ‏32px، و`lg` ‏40px.",
  "button.Button.destructive":
    "النسخة الحاذفة من النمط. لا يوجد لـ `neutral` نسخة حاذفة في Figma، فيعود إلى `primary` الحاذف.",
  "button.Button.onColor": "للأزرار على خلفيات لون العلامة (`background-primary`، وترويسة التنقل).",
  "button.Button.iconOnly": iconOnly,
  "button.Button.loading":
    "يعرض مؤشر تحميل مكان الأيقونة الأولى (أو الأيقونة نفسها في الأزرار ذات الأيقونة فقط)، ويضبط aria-busy، ويتجاهل النقرات. يحافظ الزر على عرضه ويبقى قابلًا للتركيز.",
  "button.Button.render": render,
  // Divider
  "divider.Divider": 'يفصل المحتوى إلى أقسام. يُعلَن كفاصل؛ مرّر role="none" إن كان بصريًا فقط.',
  "divider.Divider.variant": "اللون. `alpha-white` و`white` للفواصل على خلفيات لون العلامة.",
  "divider.Divider.orientation": "اتجاه الفاصل.",
  // Featured Icon
  "featured-icon.FeaturedIcon":
    'أيقونة داخل حاوية مظلّلة، تتصدّر البطاقات والحالات الفارغة والنوافذ الحوارية. تزيينية افتراضيًا؛ مرّر role="img" وaria-label إن كانت الأيقونة تحمل معنى.',
  "featured-icon.FeaturedIcon.variant": "عائلة اللون.",
  "featured-icon.FeaturedIcon.appearance":
    "`light` حاوية مظلّلة، و`hard` حاوية مصمتة، و`outlined` حلقة.",
  "featured-icon.FeaturedIcon.size": "حجم الحاوية: من `sm` ‏32px إلى `xl` ‏56px.",
  "featured-icon.FeaturedIcon.circle": "حاوية دائرية بدل المربعة.",
  // Link
  "link.Link": "رابط نصي بألوان الروابط في DGA. يعمل مع `Link` من Next.js عبر `render`.",
  "link.Link.render": render,
  "link.Link.variant": "اللون. `on-color` للروابط على خلفيات لون العلامة.",
  "link.Link.size": "حجم النص: `sm` ‏14px، و`md` ‏16px.",
  "link.Link.inline": "مسطّر دائمًا، للروابط داخل النص المتصل (WCAG 1.4.1).",
  "link.Link.external":
    'يفتح في نافذة جديدة، ويضيف rel="noopener noreferrer" وأيقونة الرابط الخارجي.',
  "link.Link.externalLabel": "نص لقارئ الشاشة يُضاف إلى الروابط الخارجية. ترجمه في الصفحات العربية.",
  "link.Link.href": "الوجهة.",
  "link.Link.disabled": "يُعرض بلا href ومع aria-disabled.",
  // Skeleton
  "skeleton.Skeleton":
    'عنصر نائب يظهر أثناء تحميل المحتوى. مخفي عن قارئ الشاشة: اضبط aria-busy="true" على المنطقة التي تُحمَّل بدلًا من ذلك.',
  "skeleton.Skeleton.shape": "شكل العنصر النائب.",
  "skeleton.Skeleton.size": "الحجم في Figma. احذفه وحدّد حجم الهيكل بـ `className`.",
  // Spinner
  "spinner.Spinner": "مؤشر تحميل. يدور ببطء عند تفضيل تقليل الحركة.",
  "spinner.Spinner.size": "القطر بأحجام Figma، من `2xs` (‏20px) إلى `2xl` (‏44px).",
  "spinner.Spinner.variant": "اللون. `current` يأخذ لون نص العنصر الأب، للاستخدام داخل الأزرار.",
  "spinner.Spinner.label":
    "نص يُعلَن لقارئ الشاشة. مرّر `null` عندما يعلن شيء آخر حالة الانشغال (مثل زر فيه aria-busy).",
  // Tag and Status Tag
  "tag.StatusTag": "حالة عنصر أو مهمة أو طلب، مع نقطة ملونة.",
  "tag.StatusTag.variant": "عائلة اللون. `on-color` للوسوم على خلفيات لون العلامة.",
  "tag.StatusTag.size": "الارتفاع: `xs` ‏20px، و`sm` ‏24px، و`md` ‏32px.",
  "tag.StatusTag.appearance": "`subtle` تعبئة مظلّلة، و`inverted` تعبئة مصمتة، و`ghost` بلا تعبئة.",
  "tag.Tag": "وسم لتصنيف أو لمرشّح محدَّد. يمكن إزالته اختياريًا.",
  "tag.Tag.variant": "عائلة اللون. `on-color` للوسوم على خلفيات لون العلامة.",
  "tag.Tag.size": "الارتفاع: `xs` ‏20px، و`sm` ‏24px، و`md` ‏32px.",
  "tag.Tag.outlined": outlined,
  "tag.Tag.rounded": rounded,
  "tag.Tag.iconOnly": iconOnly,
  "tag.Tag.onDismiss": "يضيف زر إغلاق في النهاية.",
  "tag.Tag.dismissLabel": "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
};
