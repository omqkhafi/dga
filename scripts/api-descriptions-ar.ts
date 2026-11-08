// Arabic descriptions for the generated API reference (apps/docs/lib/generated/api.json).
// Keyed `slug.Part` for a part and `slug.Part.prop` for a prop. build-api.ts fails when a part
// or prop with an English description has no entry here, so a new prop ships in both languages.
// Prop names, values, token names and code stay in English.

import { API_DESCRIPTIONS_AR_EXT_DISPLAY } from "./api-descriptions-ar-ext-display";
import { API_DESCRIPTIONS_AR_EXT_INPUTS } from "./api-descriptions-ar-ext-inputs";
import { API_DESCRIPTIONS_AR_EXT_LAYOUT } from "./api-descriptions-ar-ext-layout";
import { API_DESCRIPTIONS_AR_EXT_MISC } from "./api-descriptions-ar-ext-misc";
import { API_DESCRIPTIONS_AR_EXT_NAV } from "./api-descriptions-ar-ext-nav";
import { API_DESCRIPTIONS_AR_EXT_OVERLAYS } from "./api-descriptions-ar-ext-overlays";

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
    "ينفّذ إجراءً. ستة أنماط، ونسختان للإجراءات المدمّرة وللخلفيات الملونة، وثلاثة أحجام، وزر بأيقونة فقط وحالة تحميل.",
  "button.Button.variant":
    "النمط. `neutral` يقابل Primary-Neutral في Figma، و`secondary` يقابل Secondary-Solid، و`outline` يقابل Secondary-Outline.",
  "button.Button.size": "الارتفاع: `sm` ‏24px، و`md` ‏32px، و`lg` ‏40px.",
  "button.Button.destructive":
    "النسخة المدمّرة من النمط. لا يوجد لـ `neutral` نسخة مدمّرة في Figma، فيعود إلى `primary` المدمّر.",
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
  // Forms
  "field.Field":
    "يلفّ عنصر تحكم واحدًا مع تسميته ونصه المساعد ورسالة الخطأ. ويربطها لتقنيات المساعدة: التسمية تسمّي العنصر، ويُقرأ النص المساعد ورسالة الخطأ عبر `aria-describedby`.",
  "field.Field.orientation":
    "`vertical` يرتّب التسمية والعنصر والنص المساعد والخطأ عموديًا. و`horizontal` يضع العنصر (مربع الاختيار أو زر الاختيار أو مفتاح التبديل) بجانب تسميته ونصوصه.",
  "field.Field.name": "اسم عنصر التحكم. يربطه بقيمة النموذج وبأخطاء الخادم.",
  "field.Field.invalid":
    "يعلّم عنصر التحكم غير صالح بناءً على تحققك الخاص. اقرنه بـ `match` في FieldError.",
  "field.Field.disabled": "يعطّل عنصر التحكم ويُخفِّت تسميته ونصه المساعد.",
  "field.FieldLabel": "الاسم الظاهر لعنصر التحكم. النقر عليه يركّز العنصر أو يبدّل حالته.",
  "field.FieldLabel.required":
    "يعرض علامة المطلوب (*). اضبط `required` على عنصر التحكم أيضًا ليُعلَن للقارئ.",
  "field.FieldLabel.optional":
    "يعرض علامة الاختياري، للحقول غير المطلوبة في نموذج أغلب حقوله مطلوبة.",
  "field.FieldLabel.optionalLabel": "نص علامة الاختياري. ترجمه في الصفحات العربية.",
  "field.FieldDescription": "نص مساعد تحت عنصر التحكم. يرتبط بالعنصر عبر `aria-describedby`.",
  "field.FieldError":
    "رسالة الخطأ، مع أيقونة حتى لا يعتمد الخطأ على اللون وحده. تظهر عند فشل التحقق، أو دائمًا عندما تكون `match` تساوي `true`. اضبط `invalid` على Field و`match` هنا للتحكم فيها من حالتك.",
  "field.FieldError.match":
    "متى تظهر الرسالة. `true` تُظهرها دائمًا (استخدمها مع `invalid`)، ومفتاح صلاحية يُظهرها عند ذلك الفشل، وعند حذفها تظهر كلما فشل التحقق.",
  "field.FieldContent": "يجمع التسمية والنص المساعد والخطأ بجانب عنصر تحكم أفقي.",
  "field.FieldGroup": "يرتّب عدة حقول عموديًا بالمسافة المعتمدة في DGA بينها.",
  "field.FieldItem":
    "مربع اختيار أو زر اختيار واحد داخل مجموعة، ليكون لكل منهما تسميته ونصه المساعد.",
  "field.FieldSet":
    "يجمع عناصر تحكم مترابطة (مجموعة أزرار اختيار، أو عدة مربعات اختيار) تحت عنوان.",
  "field.FieldLegend": "اسم مجموعة عناصر التحكم. استخدمه بدل التسمية في FieldSet.",
  "field.FieldLegend.required": "يعرض علامة المطلوب (*).",
  "field.FieldLegend.optional": "يعرض علامة الاختياري.",
  "field.FieldLegend.optionalLabel": "نص علامة الاختياري. ترجمه في الصفحات العربية.",
  "input.Input":
    'حقل نص من سطر واحد داخل إطار. سمّه بـ Field. استخدم `type="email"` أو `"tel"` أو `"url"` أو `"password"` للوحة المفاتيح والتعبئة التلقائية المناسبة.',
  "input.Input.size": "الارتفاع: `md` ‏32px، و`lg` ‏40px.",
  "input.Input.appearance":
    "التعبئة: `default` (أبيض) أو `lighter` أو `darker`. وتحتفظ الثلاث بحد ظاهر.",
  "input.Input.startAdornment": "أيقونة أو بادئة قصيرة (مثل `+966`) قبل النص، في جهة البداية.",
  "input.Input.endAdornment": "أيقونة أو لاحقة نصية أو زر بعد النص، في جهة النهاية.",
  "input.Input.inputClassName":
    "أصناف CSS للعنصر `<input>` نفسه. أما `className` فيصمّم الإطار المحيط به.",
  "input.Input.type": "نوع الحقل: `text` أو `email` أو `tel` أو `url` أو `password` وغيرها.",
  "input.Input.value": "قيمة متحكَّم بها.",
  "input.Input.defaultValue": "القيمة الابتدائية عند عدم التحكم.",
  "input.Input.onValueChange": "تُستدعى بالنص الجديد كلما تغيّر. من Base UI.",
  "input.Input.placeholder": "نص تلميحي يظهر والحقل فارغ.",
  "input.Input.disabled": "يعطّل الحقل.",
  "input.Input.readOnly": "يمكن قراءة النص ونسخه لكن لا يمكن تغييره.",
  "input.Input.required": "لا يمكن إرسال النموذج والحقل فارغ.",
  "textarea.Textarea":
    "حقل نص متعدد الأسطر يزداد ارتفاعه (وقابل لتغيير الحجم افتراضيًا). سمّه بـ Field. يرتبط بتسمية Field ونصه المساعد وخطأه كأي عنصر تحكم آخر.",
  "textarea.Textarea.appearance":
    "التعبئة: `default` (أبيض) أو `lighter` أو `darker`. وتحتفظ الثلاث بحد ظاهر.",
  "textarea.Textarea.className": "أصناف الإطار المحيط بالحقل (الحد والتعبئة والخط السفلي).",
  "textarea.Textarea.inputClassName": "أصناف عنصر `<textarea>` الأصلي.",
  "textarea.Textarea.resize":
    "`vertical` يتيح للمستخدم سحب الزاوية لتغيير الارتفاع. و`none` يثبّته.",
  "textarea.Textarea.rows": "عدد الأسطر الظاهرة، وهو يحدد الارتفاع الابتدائي.",
  "textarea.Textarea.value": "قيمة متحكَّم بها.",
  "textarea.Textarea.defaultValue": "القيمة الابتدائية عند عدم التحكم.",
  "textarea.Textarea.placeholder": "نص تلميحي يظهر والحقل فارغ.",
  "textarea.Textarea.disabled": "يعطّل الحقل.",
  "textarea.Textarea.readOnly": "يمكن قراءة النص ونسخه لكن لا يمكن تغييره.",
  "textarea.Textarea.required": "لا يمكن إرسال النموذج والحقل فارغ.",
  "select.Select":
    "يتيح اختيار خيار واحد من قائمة (في DGA: Dropdown Input، أي القائمة المنسدلة). ركّبه من SelectTrigger وSelectValue وSelectContent. مرّر `items` ليعرض الزر تسمية القيمة المختارة، وسمّه بـ Field.",
  "select.Select.items": "الخيارات مع تسمياتها، ليعرض الزر تسمية القيمة المختارة قبل فتح القائمة.",
  "select.Select.value": "قيمة متحكَّم بها.",
  "select.Select.defaultValue": "القيمة الابتدائية عند عدم التحكم.",
  "select.Select.onValueChange": "تُستدعى عند اختيار المستخدم خيارًا. من Base UI.",
  "select.Select.name": "اسم الحقل عند إرسال النموذج.",
  "select.Select.required": "لا يمكن إرسال النموذج دون اختيار.",
  "select.Select.disabled": "يعطّل القائمة المنسدلة.",
  "select.Select.readOnly": "يعرض الاختيار دون فتح القائمة.",
  "select.Select.multiple": "يتيح اختيار عدة خيارات. وتكون القيمة حينئذٍ مصفوفة.",
  "select.SelectGroup": "يجمع خيارات مترابطة تحت SelectLabel.",
  "select.SelectTrigger": "الزر الذي يعرض الخيار المختار ويفتح القائمة.",
  "select.SelectTrigger.size": "الارتفاع: `md` ‏32px، و`lg` ‏40px.",
  "select.SelectTrigger.appearance":
    "التعبئة: `default` (أبيض) أو `lighter` أو `darker`. وتحتفظ الثلاث بحد ظاهر.",
  "select.SelectValue": "الخيار المختار، أو `placeholder` ما دام لا يوجد اختيار.",
  "select.SelectValue.placeholder": "يظهر ما دام لم يُختر شيء.",
  "select.SelectContent": "القائمة المنبثقة. تفتح أسفل الزر افتراضيًا وبعرضه.",
  "select.SelectContent.side": "أي جهة من الزر تفتح عليها القائمة. الافتراضي `bottom`.",
  "select.SelectContent.align": "المحاذاة مع الزر. و`start` هي الحافة اليمنى في RTL.",
  "select.SelectContent.sideOffset": "الفجوة بين الزر والقائمة بالبكسل. الافتراضي 4.",
  "select.SelectContent.alignItemWithTrigger":
    "يجعل الخيار المختار فوق الزر تمامًا، كالقائمة الأصلية في macOS. الافتراضي `false`.",
  "select.SelectItem": "خيار واحد. يظهر على الخيار المختار علامة صح في جهة النهاية.",
  "select.SelectItem.value": "القيمة التي يمثلها هذا الخيار.",
  "select.SelectItem.disabled": "يعطّل الخيار.",
  "select.SelectLabel": "عنوان SelectGroup.",
  "checkbox.Checkbox":
    'مربع لاختيار نعم/لا، أو لاختيار واحد من عدة خيارات. `indeterminate` يعرض شرطة لعنصر أب اختير بعض أبنائه فقط. سمّه بـ Field (`orientation="horizontal"`) أو بتسمية تحيط به.',
  "checkbox.Checkbox.size": "حجم المربع: `md` ‏24px، و`sm` ‏20px، و`xs` ‏16px.",
  "checkbox.Checkbox.tone": "`primary` (أخضر) أو `neutral` (أسود في الوضع الفاتح).",
  "checkbox.Checkbox.checked": "حالة متحكَّم بها.",
  "checkbox.Checkbox.defaultChecked": "الحالة الابتدائية عند عدم التحكم.",
  "checkbox.Checkbox.onCheckedChange": "تُستدعى عند تبديل المستخدم المربع. من Base UI.",
  "checkbox.Checkbox.indeterminate":
    "يعرض شرطة ويُبلّغ بـ `aria-checked=mixed`، لعنصر أب اختير بعض أبنائه فقط.",
  "checkbox.Checkbox.disabled": "يعطّل المربع.",
  "checkbox.Checkbox.readOnly": "يعرض الحالة دون إمكانية تغييرها.",
  "checkbox.Checkbox.required": "لا يمكن إرسال النموذج قبل تحديده.",
  "checkbox.Checkbox.name": "اسم الحقل عند إرسال النموذج.",
  "checkbox.Checkbox.value": "القيمة التي تُرسل عند التحديد.",
  "radio.RadioGroup":
    "مجموعة أزرار اختيار لا يمكن اختيار أكثر من زر واحد فيها. تنقل مفاتيح الأسهم وتختار، ويدخل Tab المجموعة ويخرج منها. لفّها بـ Field مع FieldSet لتعطيها عنوانًا.",
  "radio.RadioGroup.value": "قيمة متحكَّم بها.",
  "radio.RadioGroup.defaultValue": "القيمة الابتدائية عند عدم التحكم.",
  "radio.RadioGroup.onValueChange": "تُستدعى عند اختيار المستخدم زرًا. من Base UI.",
  "radio.RadioGroup.name": "اسم الحقل عند إرسال النموذج.",
  "radio.RadioGroup.disabled": "يعطّل كل أزرار الاختيار في المجموعة.",
  "radio.RadioGroup.readOnly": "يعرض الاختيار دون إمكانية تغييره.",
  "radio.RadioGroup.required": "لا يمكن إرسال النموذج دون اختيار.",
  "radio.Radio": "زر اختيار دائري واحد في RadioGroup. أعطِ كل Radio قيمة `value`.",
  "radio.Radio.tone": "`primary` (أخضر) أو `neutral` (أسود في الوضع الفاتح).",
  "radio.Radio.value": "قيمة المجموعة عند اختيار هذا الزر.",
  "radio.Radio.disabled": "يعطّل هذا الزر.",
  "switch.Switch":
    'يشغّل إعدادًا أو يوقفه فورًا (في DGA: Switch). استخدم مربع الاختيار للخيارات التي لا تُطبَّق إلا عند إرسال النموذج. سمّه بـ Field (`orientation="horizontal"`).',
  "switch.Switch.icon": "يعرض علامة صح داخل المقبض أثناء التشغيل.",
  "switch.Switch.checked": "حالة متحكَّم بها.",
  "switch.Switch.defaultChecked": "الحالة الابتدائية عند عدم التحكم.",
  "switch.Switch.onCheckedChange": "تُستدعى عند قلب المستخدم المفتاح. من Base UI.",
  "switch.Switch.disabled": "يعطّل المفتاح.",
  "switch.Switch.readOnly": "يعرض الحالة دون إمكانية تغييرها.",
  "switch.Switch.required": "لا يمكن إرسال النموذج قبل تشغيله.",
  "switch.Switch.name": "اسم الحقل عند إرسال النموذج.",
  "number-input.NumberInput":
    "حقل رقمي بزرّي − و+. تُكتب الأرقام دائمًا من اليسار إلى اليمين، حتى في الصفحات العربية، وكتابة أرقام هندية (٣) تعطي أرقامًا غربية (3). سمّه بـ Field.",
  "number-input.NumberInput.size": "الارتفاع: `md` ‏32px، و`lg` ‏40px.",
  "number-input.NumberInput.appearance":
    "التعبئة: `default` (أبيض) أو `lighter` أو `darker`. وتحتفظ الثلاث بحد ظاهر.",
  "number-input.NumberInput.placeholder": "نص تلميحي يظهر والحقل فارغ.",
  "number-input.NumberInput.decrementLabel":
    "اسم زر الإنقاص لتقنيات المساعدة. ترجمه في الصفحات العربية.",
  "number-input.NumberInput.incrementLabel":
    "اسم زر الزيادة لتقنيات المساعدة. ترجمه في الصفحات العربية.",
  "number-input.NumberInput.hideSteppers": "يخفي زرّي − و+ ويترك حقلًا رقميًا بسيطًا.",
  "number-input.NumberInput.inputClassName":
    "أصناف CSS للعنصر `<input>` نفسه. أما `className` فيصمّم الإطار المحيط به.",
  "number-input.NumberInput.value": "قيمة متحكَّم بها. و`null` تعني حقلًا فارغًا.",
  "number-input.NumberInput.defaultValue": "القيمة الابتدائية عند عدم التحكم.",
  "number-input.NumberInput.onValueChange":
    "تُستدعى بالرقم بعد تحليله، وهو دائمًا `number` بأرقام غربية. من Base UI.",
  "number-input.NumberInput.min": "أصغر قيمة.",
  "number-input.NumberInput.max": "أكبر قيمة.",
  "number-input.NumberInput.step": "مقدار التغيير عند زرّي − و+ ومفتاحي السهمين. الافتراضي 1.",
  "number-input.NumberInput.locale":
    "لغة التنسيق. الافتراضي `en-u-nu-latn`: أرقام غربية في كل الصفحات، ومنها العربية.",
  "number-input.NumberInput.format": "خيارات التنسيق: العملة والنسبة المئوية والوحدات والكسور.",
  "number-input.NumberInput.disabled": "يعطّل الحقل وزرّيه.",
  "number-input.NumberInput.readOnly": "يمكن قراءة الرقم لكن لا يمكن تغييره.",
  "number-input.NumberInput.required": "لا يمكن إرسال النموذج والحقل فارغ.",
  "number-input.NumberInput.name": "اسم الحقل عند إرسال النموذج.",
  "search-box.SearchBox":
    'حقل بحث فيه أيقونة بحث في جهة البداية وزر مسح في جهة النهاية يظهر عند وجود نص. نوعه `type="search"`، فيمسحه Escape أيضًا.',
  "search-box.SearchBox.size": "الارتفاع: `md` ‏32px، و`lg` ‏40px.",
  "search-box.SearchBox.appearance":
    "التعبئة: `default` (أبيض) أو `lighter` أو `darker`. وتحتفظ الثلاث بحد ظاهر.",
  "search-box.SearchBox.onValueChange": "تُستدعى بالنص الجديد كلما تغيّر، ومنه عند المسح.",
  "search-box.SearchBox.clearLabel": "اسم زر المسح لتقنيات المساعدة. ترجمه في الصفحات العربية.",
  "search-box.SearchBox.inputClassName":
    "أصناف CSS للعنصر `<input>` نفسه. أما `className` فيصمّم الإطار المحيط به.",
  "search-box.SearchBox.value": "نص متحكَّم به.",
  "search-box.SearchBox.defaultValue": "النص الابتدائي عند عدم التحكم.",
  "search-box.SearchBox.placeholder": "نص تلميحي يظهر والحقل فارغ.",
  "search-box.SearchBox.disabled": "يعطّل الحقل.",
  "search-box.SearchBox.readOnly": "يمكن قراءة النص لكن لا يمكن تغييره. ويُخفى زر المسح.",
  "file-upload.FileUpload":
    "منطقة إفلات وقائمة بالملفات المختارة. المنطقة حقل ملف حقيقي، فتعمل بلوحة المفاتيح (Tab ثم Space أو Enter) وبالسحب والإفلات. الملفات التي تفشل في التحقق تبقى في القائمة مع سبب الرفض. سمّها بـ Field.",
  "file-upload.FileUpload.files":
    "الملفات في القائمة (متحكَّم بها). حدّث `status` و`progress` أثناء الرفع.",
  "file-upload.FileUpload.defaultFiles": "الملفات التي تبدأ بها القائمة (عند عدم التحكم).",
  "file-upload.FileUpload.onFilesChange": "تُستدعى بالقائمة كاملة كلما أُضيف ملف أو أُزيل.",
  "file-upload.FileUpload.onFilesAdded": "تُستدعى بالملفات التي اجتازت التحقق، لتبدأ رفعها.",
  "file-upload.FileUpload.maxSize": "أكبر حجم للملف الواحد بالبايت.",
  "file-upload.FileUpload.maxFiles":
    "أكبر عدد من الملفات في القائمة. تكون `multiple` مفعّلة افتراضيًا ما دام العدد أكبر من 1.",
  "file-upload.FileUpload.hint": "يعرض الصيغ المقبولة والحجم تحت منطقة الإفلات.",
  "file-upload.FileUpload.messages":
    "نصوص منطقة الإفلات وحالات الرفع والأخطاء. ترجمها في الصفحات العربية.",
  "file-upload.FileUpload.accept": "الصيغ المقبولة كما في سمة HTML `accept`: `.pdf,image/*`.",
  "file-upload.FileUpload.multiple": "يتيح عدة ملفات. مفعّل افتراضيًا ما لم تكن `maxFiles` تساوي 1.",
  "file-upload.FileUpload.disabled": "يعطّل منطقة الإفلات.",
  "file-upload.FileUpload.name": "اسم الحقل عند إرسال النموذج.",
  "file-upload.FileUpload.required": "لا يمكن إرسال النموذج دون ملف.",

  // Dialog
  "dialog.Dialog":
    "نافذة فوق الصفحة لقرار أو مهمة قصيرة (في DGA: Modal). يدخل التركيز إليها ويبقى فيها، والصفحة خلفها معطّلة، ويغلقها Escape، ويعود التركيز إلى الزر الذي فتحها.",
  "dialog.Dialog.open": "حالة الفتح بتحكّم خارجي.",
  "dialog.Dialog.defaultOpen": "مفتوحة في البداية (دون تحكم).",
  "dialog.Dialog.onOpenChange": "تُستدعى عند فتحها أو إغلاقها.",
  "dialog.Dialog.disablePointerDismissal":
    "يمنع الإغلاق بالنقر خارجها. استخدمه لقرار لا بد من الإجابة عنه؛ ويبقى Escape والأزرار تغلقها.",
  "dialog.Dialog.modal": "القيمة `true` (الافتراضية) تعطّل الصفحة خلفها وتقفل تمريرها.",
  "dialog.DialogTrigger": "الزر الذي يفتح النافذة.",
  "dialog.DialogContent": "النافذة: خلفية معتمة والبطاقة. في المنتصف، وتُمرَّر إن زاد طولها.",
  "dialog.DialogContent.size":
    "العرض: `sm` ‏400px، و`md` ‏600px (كما في DGA)، و`lg` ‏800px. وكلها تتقلص لتناسب الجوال.",
  "dialog.DialogContent.showCloseButton":
    "يعرض زر الإغلاق في الزاوية. أوقفه إن كان للتذييل زر خاص به.",
  "dialog.DialogContent.closeLabel":
    "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
  "dialog.DialogHeader": "يجمع العنوان والوصف في أعلى النافذة.",
  "dialog.DialogTitle": "اسم النافذة. يقرؤه قارئ الشاشة عند فتحها.",
  "dialog.DialogDescription": "يشرح النافذة. مرتبط بها عبر `aria-describedby`.",
  "dialog.DialogBody": "الجزء الأوسط القابل للتمرير في نافذة طويلة.",
  "dialog.DialogFooter": "الإجراءات، محاذاة إلى النهاية. ضع الإجراء الرئيس أخيرًا.",
  "dialog.DialogClose": "يغلق النافذة. اعرض Button معه: `<DialogClose render={<Button />}>`.",
  // Drawer
  "drawer.Drawer":
    "لوحة تنزلق من حافة الشاشة (في DGA: Slideout Menu). هي نافذة معتمة: يُحبس التركيز فيها ويغلقها Escape ويعود التركيز إلى الزر. وعلى شاشات اللمس تُغلق بالسحب.",
  "drawer.Drawer.side":
    "الحافة التي تنزلق منها. تتبع `start` و`end` اتجاه الصفحة، فتكون `start` على اليمين في الصفحات العربية. ويتبعها اتجاه السحب للإغلاق.",
  "drawer.Drawer.open": "حالة الفتح بتحكّم خارجي.",
  "drawer.Drawer.defaultOpen": "مفتوحة في البداية (دون تحكم).",
  "drawer.Drawer.onOpenChange": "تُستدعى عند فتحها أو إغلاقها.",
  "drawer.DrawerTrigger": "الزر الذي يفتح اللوحة.",
  "drawer.DrawerContent":
    "اللوحة: خلفية معتمة والبطاقة، بعرض 346px على الجانبين وبعرض كامل في الأعلى أو الأسفل.",
  "drawer.DrawerContent.tone": "السطح: `white` ‏(background-menu) أو `gray` ‏(neutral-100).",
  "drawer.DrawerContent.showCloseButton": "يعرض زر الإغلاق في الزاوية.",
  "drawer.DrawerContent.closeLabel":
    "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
  "drawer.DrawerHeader": "يجمع العنوان والوصف في أعلى اللوحة.",
  "drawer.DrawerTitle": "اسم اللوحة. يقرؤه قارئ الشاشة عند فتحها.",
  "drawer.DrawerDescription": "يشرح اللوحة. مرتبط بها عبر `aria-describedby`.",
  "drawer.DrawerFooter": "الإجراءات في أسفل اللوحة، محاذاة إلى النهاية.",
  "drawer.DrawerClose": "يغلق اللوحة. اعرض Button معه: `<DrawerClose render={<Button />}>`.",
  // Tooltip
  "tooltip.TooltipProvider":
    "يحدد مدة التمرير قبل فتح التلميح، ويتيح فتح التالي فورًا عند الانتقال بين العناصر. ضعه حول الصفحة أو شريط أدوات.",
  "tooltip.TooltipProvider.delay": "بالملّي ثانية قبل فتح التلميح عند التمرير. الافتراضي 300.",
  "tooltip.Tooltip":
    "تلميح قصير لعنصر، يظهر عند التمرير وعند تركيز لوحة المفاتيح (في DGA: Tooltip). التلميحات لمستخدمي الفأرة ولوحة المفاتيح المبصرين: فلا يعتمد عليها قارئ الشاشة ولا شاشات اللمس، فلا تحمل النسخة الوحيدة مما يحتاجه الناس، وليست للمحتوى التفاعلي. ويحتاج العنصر بأيقونة فقط إلى `aria-label`.",
  "tooltip.Tooltip.open": "حالة الفتح بتحكّم خارجي.",
  "tooltip.Tooltip.defaultOpen": "مفتوح في البداية (دون تحكم).",
  "tooltip.Tooltip.disabled": "لا يفتح أبدًا.",
  "tooltip.TooltipTrigger": "العنصر الذي يصفه التلميح. اعرض الزر أو الرابط الخاص بك عبر `render`.",
  "tooltip.TooltipContent": "الفقاعة. عرضها 240px على الأكثر وتبقى بعيدة عن حواف الشاشة.",
  "tooltip.TooltipContent.tone":
    "`light` أبيض (neutral-800 في الوضع الداكن)؛ و`dark` التلميح المعكوس.",
  "tooltip.TooltipContent.side":
    "الجهة التي يفتح عليها. `start` و`end` جهتا النص، فتتبادلان في الصفحات العربية.",
  "tooltip.TooltipContent.align":
    "المحاذاة على حافة العنصر. و`start` هي الحافة اليمنى في RTL للأعلى والأسفل.",
  "tooltip.TooltipContent.sideOffset":
    "الفجوة بين العنصر والفقاعة بالبكسل. الافتراضي 10 (مكان للسهم).",
  "tooltip.TooltipContent.title": "عنوان بخط عريض فوق النص.",
  "tooltip.TooltipContent.showArrow": "يعرض السهم الذي يشير إلى العنصر.",
  "tooltip.TooltipHelp":
    "أيقونة المساعدة في DGA: زر بعلامة استفهام بحجم 20px بجانب تسمية، يفتح شرحًا في فقاعة التلميح نفسها. وهو Popover يفتح أيضًا عند التمرير لا Tooltip: فالزر موجود ليعرض النص، فيجب أن يستطيع فتحه وقراءته مستخدمو لوحة المفاتيح واللمس وقارئ الشاشة.",
  "tooltip.TooltipHelp.label": "الاسم الذي يقرؤه قارئ الشاشة للزر. ترجمه في الصفحات العربية.",
  "tooltip.TooltipHelp.tone":
    "`light` أبيض (neutral-800 في الوضع الداكن)؛ و`dark` التلميح المعكوس.",
  "tooltip.TooltipHelp.align":
    "المحاذاة على حافة الزر. و`start` هي الحافة اليمنى في RTL للأعلى والأسفل.",
  "tooltip.TooltipHelp.sideOffset": "الفجوة بين الزر والفقاعة بالبكسل. الافتراضي 10 (مكان للسهم).",
  "tooltip.TooltipHelp.title": "عنوان بخط عريض فوق النص.",
  "tooltip.TooltipHelp.side":
    "الجهة التي يفتح عليها. `start` و`end` جهتا النص، فتتبادلان في الصفحات العربية.",
  "tooltip.TooltipHelp.children":
    "الشرح. يفتح عند التمرير والتركيز والنقر واللمس، ويستطيع قارئ الشاشة قراءته.",
  // Menu
  "menu.Menu":
    "قائمة إجراءات على سطح مؤقت (في DGA: Menu). تنقل مفاتيح الأسهم بين العناصر، وHome وEnd إلى الأول والأخير، وحرف يقفز إلى المطابق، ويغلقها Escape ويعود التركيز إلى الزر. وتفتح القوائم الفرعية في جهة النهاية وتنعكس في الصفحات العربية.",
  "menu.Menu.open": "حالة الفتح بتحكّم خارجي.",
  "menu.Menu.defaultOpen": "مفتوحة في البداية (دون تحكم).",
  "menu.Menu.onOpenChange": "تُستدعى عند فتحها أو إغلاقها.",
  "menu.MenuTrigger": "الزر الذي يفتح القائمة. اعرض Button الخاص بك عبر `render`.",
  "menu.MenuContent": "القائمة المنبثقة. تفتح أسفل الزر، محاذاة لجهة بدايته.",
  "menu.MenuContent.side": "أي جهة من الزر تفتح عليها. الافتراضي `bottom`.",
  "menu.MenuContent.align": "المحاذاة مع الزر. و`start` هي الحافة اليمنى في RTL.",
  "menu.MenuContent.sideOffset": "الفجوة بين الزر والقائمة بالبكسل. الافتراضي 4.",
  "menu.MenuContent.alignOffset": "يزيح القائمة على طول حافة الزر بالبكسل.",
  "menu.MenuItem":
    'إجراء واحد. ضع أيقونة أولًا ثم التسمية ثم MenuShortcut أو Tag أو Switch اختياريًا. واستخدم `render` ليكون رابطًا: `<MenuItem render={<a href="/" />}>`.',
  "menu.MenuItem.onClick": "تُستدعى عند اختيار العنصر بالفأرة أو لوحة المفاتيح.",
  "menu.MenuItem.disabled":
    "لا يمكن اختيار العنصر. ويبقى في ترتيب مفاتيح الأسهم ليمكن العثور عليه.",
  "menu.MenuItem.closeOnClick": "هل يغلق اختياره القائمة. الافتراضي `true`.",
  "menu.MenuCheckboxItem": "عنصر يمكن تشغيله وإيقافه. يعرض علامة صح عند تشغيله.",
  "menu.MenuCheckboxItem.checked": "حالة التشغيل بتحكّم خارجي.",
  "menu.MenuCheckboxItem.onCheckedChange": "تُستدعى عند تشغيله أو إيقافه.",
  "menu.MenuRadioGroup": "يجمع خيارات MenuRadioItem ليُختار واحد فقط.",
  "menu.MenuRadioGroup.value": "القيمة المختارة.",
  "menu.MenuRadioGroup.onValueChange": "تُستدعى بالقيمة المختارة حديثًا.",
  "menu.MenuRadioItem": "خيار في MenuRadioGroup. يعرض الخيار المختار نقطة.",
  "menu.MenuRadioItem.value": "قيمة هذا الخيار.",
  "menu.MenuGroup": "يجمع عناصر مترابطة تحت MenuLabel.",
  "menu.MenuLabel": "عنوان MenuGroup.",
  "menu.MenuSeparator": "خط بين مجموعات العناصر.",
  "menu.MenuShortcut":
    "نص في نهاية العنصر، كاختصار أو عدد. تبقى الأرقام والرموز من اليسار إلى اليمين.",
  "menu.MenuSub": "يجمع MenuSubTrigger مع MenuSubContent.",
  "menu.MenuSubTrigger": "عنصر يفتح قائمة فرعية. سهمه نحو جهة النهاية وينعكس في RTL.",
  "menu.MenuSubContent": "القائمة الفرعية. تفتح بجانب عنصرها في جهة النهاية.",
  // Tabs
  "tabs.Tabs":
    "ينتقل بين لوحات محتوى مترابطة في صفحة واحدة (في DGA: Tabs). تبويب واحد فقط في ترتيب Tab؛ وتنقل مفاتيح الأسهم بين التبويبات (يمين ويسار يتبادلان في الصفحات العربية، وأعلى وأسفل في القائمة العمودية)، وHome وEnd إلى الأول والأخير. ويفتح التبويب لوحته عند التركيز.",
  "tabs.Tabs.value": "التبويب المحدد بتحكّم خارجي.",
  "tabs.Tabs.defaultValue": "التبويب المحدد في البداية (دون تحكم).",
  "tabs.Tabs.onValueChange": "تُستدعى بقيمة التبويب الذي حُدد.",
  "tabs.Tabs.orientation": "اتجاه القائمة. تستخدم التبويبات العمودية مفتاحي أعلى وأسفل.",
  "tabs.TabsList":
    "صف التبويبات (أو عمودها في Tabs عمودي). أعطه `aria-label` عند وجود أكثر من قائمة.",
  "tabs.TabsList.size": "التباعد والنص: `sm` أو `md` أو `lg`.",
  "tabs.TabsList.divider": "خط بسمك 3px تحت القائمة (أو بجانبها). الافتراضي `true`.",
  "tabs.TabsList.flush": "بلا حشوة جانبية في بداية القائمة.",
  "tabs.TabsList.scrollable": "تُمرَّر جانبيًا بدل الالتفاف عندما لا تتسع التبويبات.",
  "tabs.TabsList.activateOnFocus":
    "يفتح التبويب لوحته بمجرد أن تركّزه مفاتيح الأسهم. الافتراضي `true`؛ واضبط `false` لفتحها بـ Enter أو Space.",
  "tabs.TabsList.overflow":
    "ما يحدث للتبويبات التي لا تتسع. `scroll` (الافتراضي) يمرّرها جانبيًا؛ و`menu` يطويها في تبويب «المزيد» (في DGA) يفتح قائمة.",
  "tabs.TabsList.moreLabel": "نص تبويب «المزيد». ترجمه في الصفحات العربية.",
  "tabs.TabsTrigger": "تبويب واحد. ضع أيقونة أولًا ثم التسمية.",
  "tabs.TabsTrigger.value": "ما يعرّف التبويب. وتظهر اللوحة ذات القيمة نفسها.",
  "tabs.TabsTrigger.disabled":
    "لا يمكن تحديد التبويب. ويبقى في ترتيب مفاتيح الأسهم ليمكن العثور عليه.",
  "tabs.TabsContent": "المحتوى الذي يعرضه التبويب. يُخفى ما دام تبويبه غير محدد.",
  "tabs.TabsContent.value": "قيمة التبويب الذي تنتمي إليه هذه اللوحة.",
  // Accordion
  "accordion.Accordion":
    "يعرض أقسام المحتوى ويخفيها تحت عناوينها (في DGA: Accordion). كل عنوان زر: ينقل Tab بين العناوين ويفتح Enter أو Space القسم أو يغلقه. ويُفتح قسم واحد في كل مرة ما لم تضبط `multiple`.",
  "accordion.Accordion.size":
    "حشوة العنوان وارتفاعه مغلقًا: `sm` ‏40px (حشوة 8px)، و`md` ‏48px (12px)، و`lg` ‏56px (16px).",
  "accordion.Accordion.iconPosition":
    "موضع السهم: `trailing` في النهاية (الافتراضي) أو `leading` في البداية.",
  "accordion.Accordion.variant":
    "`white` بلا تعبئة (الافتراضي)، أو `filled` بتعبئة `background-neutral-50` لكل عنصر.",
  "accordion.Accordion.flush": "تتوقف الخطوط على بعد 16px من الحواف.",
  "accordion.Accordion.value": "قيم العناصر المفتوحة بتحكّم خارجي.",
  "accordion.Accordion.defaultValue": "العناصر المفتوحة في البداية (دون تحكم).",
  "accordion.Accordion.onValueChange": "تُستدعى بقيم العناصر المفتوحة.",
  "accordion.Accordion.multiple": "يتيح فتح عدة عناصر معًا. الافتراضي `false`.",
  "accordion.AccordionItem": "قسم واحد: عنوان ولوحته. أعطه `value` للتحكم في المفتوح.",
  "accordion.AccordionItem.value": "ما يعرّف العنصر. الافتراضي موضعه.",
  "accordion.AccordionItem.disabled": "لا يمكن فتح القسم ولا إغلاقه.",
  "accordion.AccordionTrigger": "زر العنوان. يعرض سهمًا يدور عند فتح القسم.",
  "accordion.AccordionContent": "محتوى القسم. يحرّك ارتفاعه ويُخفى عن قارئ الشاشة وهو مغلق.",
  // Content Switcher
  "content-switcher.ContentSwitcher":
    "صف قصير من خيارين إلى أربعة يبدّل العرض تحته (في DGA: Content Switcher). يبقى خيار واحد مختارًا دائمًا. وخيار واحد في ترتيب Tab؛ وتنقل مفاتيح الأسهم بين الخيارات (يمين ويسار يتبادلان في الصفحات العربية). سمّه بـ `aria-label`.",
  "content-switcher.ContentSwitcher.size": "الارتفاع: `sm` ‏32px، و`md` ‏40px، و`lg` ‏48px.",
  "content-switcher.ContentSwitcher.onColor":
    "للخلفيات ذات لون العلامة (`background-primary`، وترويسة التنقل).",
  "content-switcher.ContentSwitcher.value": "الخيار المختار بتحكّم خارجي.",
  "content-switcher.ContentSwitcher.defaultValue":
    "الخيار المختار في البداية (دون تحكم). الأول إن لم تحدده.",
  "content-switcher.ContentSwitcher.onValueChange":
    "تُستدعى بالقيمة الجديدة. يبقى خيار مختار دائمًا فلا تكون فارغة.",
  "content-switcher.ContentSwitcherItem":
    "خيار واحد. قيمته `value` هي ما يبلّغ عنه ContentSwitcher. ضع أيقونة أولًا إن لزمت.",
  "content-switcher.ContentSwitcherItem.value": "ما يعرّف الخيار.",
  "content-switcher.ContentSwitcherItem.disabled": "لا يمكن اختيار الخيار.",
  // Toast
  "toast.Toaster":
    "ضع Toaster واحدًا في جذر التطبيق (في DGA: Notification Toast). يعرض الإشعارات في نهاية أسفل الشاشة: أسفل اليمين في الصفحات الإنجليزية وأسفل اليسار في العربية. يُعلَن كل إشعار لقارئ الشاشة عند ظهوره (منطقة حية مهذبة، وعاجلة للأخطاء والتنبيهات)، ويبقى ما دام عليه المؤشر أو التركيز، ويمكن سحبه لإزالته.",
  "toast.Toaster.limit": "أكثر عدد من الإشعارات يُعرض معًا. الافتراضي 3.",
  "toast.Toaster.timeout": "مدة بقاء الإشعار بالملّي ثانية. القيمة `0` تُبقيه حتى يُغلق.",
  "toast.Toaster.closeLabel": "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
  "toast.Toaster.regionLabel":
    "الاسم الذي يقرؤه قارئ الشاشة للمنطقة التي تحمل الإشعارات. ترجمه في الصفحات العربية.",
  // Notification
  "notification.Notification":
    'شريط بعرض كامل لرسالة تخص الصفحة كلها (في DGA: Notification)، في أعلى الصفحة أو قسم منها. هو منطقة حية: تُعلَن `critical` فورًا (`role="alert"`) وغيرها بأدب (`role="status"`). أضفه عند انطباق الرسالة لا قبله ليُعلَن.',
  "notification.Notification.variant":
    "النوع: `neutral` أو `info` أو `success` أو `warning` أو `critical`.",
  "notification.Notification.title": "نص افتتاحي بخط عريض قبل الرسالة، مثل «مهم:».",
  "notification.Notification.hideIcon": "يخفي أيقونة الحالة.",
  "notification.Notification.action": "رابط أو Button صغير بعد الرسالة.",
  "notification.Notification.dismissible":
    "يعرض زر الإغلاق. يخفي الإشعار نفسه ثم يستدعي `onDismiss`.",
  "notification.Notification.onDismiss": "تُستدعى بعد إغلاق الإشعار.",
  "notification.Notification.dismissLabel":
    "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
  // Inline Alert
  "inline-alert.InlineAlert":
    'رسالة داخل الصفحة بجانب ما تخصه (في DGA: Inline Alert): نموذج أو بطاقة أو قسم. يحمل النوعَ شريط ملون في جهة البداية مع أيقونة، فلا يكون اللون الإشارة الوحيدة. تُعلَن `destructive` و`warning` فورًا (`role="alert"`) وغيرهما بأدب (`role="status"`). أضفها عند انطباقها لتُعلَن.',
  "inline-alert.InlineAlert.variant":
    "النوع: `neutral` أو `info` أو `success` أو `warning` أو `destructive`.",
  "inline-alert.InlineAlert.tinted": "تعبئة ونص بلون النوع بدل الأبيض.",
  "inline-alert.InlineAlert.title": "العنوان القصير للتنبيه.",
  "inline-alert.InlineAlert.hideIcon": "يخفي أيقونة الحالة.",
  "inline-alert.InlineAlert.actions": "أزرار أو روابط تحت النص (اثنان على الأكثر).",
  "inline-alert.InlineAlert.dismissible":
    "يعرض زر الإغلاق. يخفي التنبيه نفسه ثم يستدعي `onDismiss`.",
  "inline-alert.InlineAlert.onDismiss": "تُستدعى بعد إغلاق التنبيه.",
  "inline-alert.InlineAlert.dismissLabel":
    "الاسم الذي يقرؤه قارئ الشاشة لزر الإغلاق. ترجمه في الصفحات العربية.",
  // Breadcrumb, Pagination, Table of Content, Card, List, Table, Data Table, Rating, Progress, Stepper
  "breadcrumb.Breadcrumb":
    "مسار الوصول إلى الصفحة الحالية (في DGA: Breadcrumb). ضع عناصر `BreadcrumbItem` بالترتيب على أن يحمل آخرها `BreadcrumbPage`. وسمِّه بـ `aria-label`. فوق `maxItems` مستوى تُطوى المستويات الوسطى خلف زر حذف، وتحت عرض `sm` يُطوى كل ما بين المستوى الأول والأخيرين بالطريقة نفسها. ويعرض `compact` رابط رجوع إلى المستوى السابق فقط. وتنعكس الفواصل في الصفحات العربية.",
  "breadcrumb.Breadcrumb.maxItems":
    "أكثر عدد من المستويات يُعرض قبل أن تُطوى الوسطى خلف زر حذف. تطويها DGA فوق 5 مستويات. ويبقى المستوى الأول والأخيران دائمًا. الافتراضي 5.",
  "breadcrumb.Breadcrumb.compact":
    "الشكل المضغوط (في DGA): بدل المسار كاملًا، رابط رجوع واحد إلى المستوى السابق (الرابط في العنصر قبل الأخير). ينعكس السهم في الصفحات العربية. الافتراضي false.",
  "breadcrumb.Breadcrumb.expandLabel":
    "اسم زر الحذف الذي يعرض المستويات المطوية. ترجمه في الصفحات العربية.",
  "breadcrumb.BreadcrumbItem":
    "مستوى واحد. يحمل `BreadcrumbLink`، أو `BreadcrumbPage` للصفحة الحالية.",
  "breadcrumb.BreadcrumbItem.separator":
    "يرسم الفاصل بعد العنصر. يوقفه `Breadcrumb` للعنصر الأخير.",
  "breadcrumb.BreadcrumbLink": "رابط إلى صفحة أعم. مرّر `render` لاستخدام رابط موجّهك.",
  "breadcrumb.BreadcrumbPage": 'الصفحة الحالية: نص عادي مع `aria-current="page"`.',
  "breadcrumb.BreadcrumbSeparator":
    "السهم بين المستويات. ينعكس في الصفحات العربية ويُخفى عن قارئات الشاشة.",
  "card.Card":
    "حاوية لمعلومات وإجراءات عن شيء واحد (في DGA: Card). قيمة `effect` إما `shadow` (ظل خفيف، الافتراضي) أو `stroke` أو `none`، وقيمة `size` تضبط الحشو والفجوات (`lg` هو الافتراضي في DGA). والبطاقة التي تنقل إلى مكان تحمل `CardLink` في عنوانها: فتعمل البطاقة كلها رابطًا وتحتفظ بدلالات الرابط الحقيقية. وأعطِ البطاقة التي هي عنصر قائمة أو مقال `role` المناسب.",
  "card.Card.disabled": "يُظلِّل البطاقة ويتجاهل النقر. استخدمه لشيء غير متاح الآن.",
  "card.CardMedia": "صورة أو وسائط أخرى في أعلى البطاقة، من الحافة إلى الحافة.",
  "card.CardIcon": "الأيقونة أو Featured Icon فوق العنوان.",
  "card.CardHeader": "يجمع العنوان والوصف.",
  "card.CardTitle": "عنوان البطاقة. وهو عنوان فعلي: مرّر `level` (الافتراضي 3) ليلائم مخطط الصفحة.",
  "card.CardDescription": "نص الوصف.",
  "card.CardContent": "محتوى حر: وسوم أو تقييم أو جدول أو أي شيء.",
  "card.CardActions":
    "الإجراءات الأساسية والثانوية. تقع فوق رابط البطاقة، فتبقى قابلة للنقر حين تكون البطاقة كلها رابطًا.",
  "card.CardLink":
    "الرابط الذي يجعل البطاقة كلها قابلة للنقر. ضعه حول نص العنوان. تمتد مساحة نقره على البطاقة، فتجد قارئة الشاشة رابطًا واحدًا باسم العنوان، ويرسم تركيز لوحة المفاتيح الحلقة حول البطاقة. مرّر `render` لاستخدام رابط موجّهك.",
  "card.CardExpandable":
    "بطاقة تُفتح تفاصيلها وتُغلق (في DGA: بطاقة قابلة للتوسيع). مبنية على Base UI Collapsible. ضع `CardExpandableTrigger` و`CardExpandablePanel` داخلها، والجزء الظاهر دائمًا أولًا.",
  "card.CardExpandableTrigger":
    "الزر الذي يفتح التفاصيل ويغلقها. يخبر `aria-expanded` قارئات الشاشة بحالته.",
  "card.CardExpandablePanel": "التفاصيل التي تُفتح وتُغلق.",
  "card.SelectableCard":
    "بطاقة تُختار (في DGA: بطاقة قابلة للاختيار)، مبنية على خانة اختيار: النقر في أي موضع منها، أو Space على الخانة المركَّزة، يبدّلها. ونص البطاقة يسمّي الخانة. لا تضع روابط أو أزرارًا داخلها؛ واستخدم `Card` مع `CardLink` لما ينقل إلى مكان.",
  "card.SelectableCard.checked": "هل البطاقة مختارة (بتحكم خارجي).",
  "card.SelectableCard.onCheckedChange": "تُستدعى بالحالة الجديدة.",
  "card.SelectableCard.disabled": "لا يمكن اختيار البطاقة.",
  "card.SelectableCard.name": "اسم حقل النموذج.",
  "card.SelectableCard.value": "قيمة حقل النموذج.",
  "data-table.DataTable":
    "جدول سجلات بالترتيب والتصفية وتحديد الصفوف والترقيم (مبني على TanStack Table وTable وPagination من DGA). هو جدول عادي في أساسه: للعناوين `aria-sort`، والتحديد خانات اختيار حقيقية، والجدول الأعرض من الشاشة يتمرر أفقيًا داخل منطقة تقبل تركيز لوحة المفاتيح. وتتبع الأعمدة اتجاه الصفحة فتمتد من اليمين في الصفحات العربية. اضبط `loading` أثناء الجلب.",
  "data-table.DataTable.columns":
    "تعريفات أعمدة TanStack Table. أعطِ كلًّا `header` نصًا أو `meta: { label }`.",
  "data-table.DataTable.data": "الصفوف.",
  "data-table.DataTable.getRowId":
    "معرّف ثابت للصف ليبقى تحديده بعد الترتيب والتنقل. الافتراضي ترتيبه.",
  "data-table.DataTable.pageSize":
    "عدد الصفوف في الصفحة. الافتراضي 10. مرّر `0` لعرض كل الصفوف وإخفاء الترقيم.",
  "data-table.DataTable.globalFilter": "نص تُصفّى به الصفوف عبر كل الأعمدة (بتحكم خارجي).",
  "data-table.DataTable.selectable": "يضيف عمود خانات اختيار وصفوفًا بـ `aria-selected`.",
  "data-table.DataTable.onSelectionChange": "تُستدعى بالصفوف المحددة كلما تغيّر التحديد.",
  "data-table.DataTable.defaultSorting": 'الترتيب في البداية، مثل `[{ id: "name", desc: false }]`.',
  "data-table.DataTable.loading": "يعرض صفوفًا نائبة ويضع على الجدول `aria-busy`.",
  "data-table.DataTable.emptyState": "ما يُعرض حين لا توجد صفوف. نص أو أي محتوى.",
  "data-table.DataTable.caption": "عنوان مرئي للجدول وهو اسمه المقروء.",
  "data-table.DataTable.labels": "النصوص التي يعرضها الجدول بنفسه. ترجمها في الصفحات العربية.",
  "list.List":
    "قائمة قصيرة من عناصر مترابطة (في DGA: List). قيمة `tone` إما `primary` أو `neutral` (الافتراضي) أو `onColor` لخلفيات العلامة. ضع `List` داخل `ListItem` للمستوى الثاني. القوائم المرتبة عناصر `ol` حقيقية فتعلن قارئة الشاشة الموضع؛ والعلامات المرئية زخرفة. وتقع العلامات عند جهة البداية فتنعكس في الصفحات العربية.",
  "list.List.type":
    "`unordered` (نقاط، الافتراضي) أو `ordered` (أرقام ثم حروف في المستوى الأدنى) أو `icon`.",
  "list.List.markers":
    "خط العلامات المرتبة: `latin` (‏1- وa-) أو `arabic` (‏١- وأ-). الافتراضي `latin`.",
  "list.ListItem":
    "عنصر واحد. في قائمة الأيقونات يستبدل `icon` علامة الصح الافتراضية (أي أيقونة من Hugeicons). ضع `List` بعد النص للمستوى الثاني.",
  "list.ListItem.icon": "أيقونة العنصر في قائمة الأيقونات. الافتراضي علامة صح.",
  "list.StructuredList":
    "صفوف نص في أعمدة (في DGA: Structured List)، وهي جدول HTML بمظهر أخف. استخدمها لحقائق قصيرة للقراءة أو لاختيار واحد بين الصفوف؛ ولبيانات تُرتَّب وتُصفّى استخدم `Table` أو `DataTable`. ومع `selectable` يكون لكل صف زر اختيار وتنقل مفاتيح الأسهم بين الصفوف.",
  "list.StructuredList.selectable":
    "يجعل الصفوف قابلة للاختيار، واحدًا في كل مرة (زر اختيار في العمود الأول). اقرنه بـ `StructuredListRow value`.",
  "list.StructuredList.value": "قيمة الصف المختار (بتحكم خارجي).",
  "list.StructuredList.onValueChange": "تُستدعى بقيمة الصف المختار.",
  "list.StructuredList.groupLabel": "يسمّي مجموعة أزرار الاختيار حين يكون `selectable`.",
  "list.StructuredListHead": 'عنوان عمود. استخدم `scope="col"` (الافتراضي).',
  "list.StructuredListRow.value": "ما يعرّف الصف في قائمة `selectable`.",
  "list.StructuredListRow.label": "الاسم الذي تقرؤه قارئة الشاشة لزر اختيار الصف، مثل عنوان الصف.",
  "list.StructuredListRow.disabled": "لا يمكن اختيار الصف.",
  "pagination.Pagination":
    'يتنقل في قائمة طويلة صفحةً صفحة (في DGA: Pagination). سمِّه بـ `aria-label`. للصفحة الحالية `aria-current="page"`. وتحت عرض `sm` تُطوى الأرقام إلى «3 من 12» بين سهمي السابق والتالي. وينعكس السهمان في الصفحات العربية.',
  "pagination.Pagination.page": "الصفحة الحالية، من 1 (بتحكم خارجي).",
  "pagination.Pagination.defaultPage": "الصفحة المعروضة في البداية (دون تحكم). الافتراضي 1.",
  "pagination.Pagination.pageCount": "عدد الصفحات.",
  "pagination.Pagination.onPageChange": "تُستدعى بالصفحة التي اختارها الشخص.",
  "pagination.Pagination.siblingCount": "عدد الصفحات المعروضة على كل جانب من الحالية. الافتراضي 1.",
  "pagination.Pagination.getHref":
    "يجعل كل عنصر رابطًا إلى هذا العنوان بدل زر، للترقيم من الخادم أو بالموجّه. ويعمل `onPageChange` عند النقر كذلك.",
  "pagination.Pagination.previousLabel": "اسم زر السابق. ترجمه في الصفحات العربية.",
  "pagination.Pagination.nextLabel": "اسم زر التالي. ترجمه في الصفحات العربية.",
  "pagination.Pagination.pageLabel": "اسم زر الصفحة، مثل «الصفحة 3». ترجمه في الصفحات العربية.",
  "pagination.Pagination.compactLabel": "النص بين السهمين في الشاشات الضيقة، مثل «3 من 12».",
  "pagination.Pagination.formatNumber":
    "يحوّل الرقم إلى الأرقام المعروضة، مثل الأرقام الهندية في الصفحات العربية.",
  "progress.Progress":
    "شريط يبيّن مدى تقدم مهمة (في DGA: شريط التقدم)، على Base UI Progress. قيمة `value` من 0 إلى `max` (100)؛ ومرّر `null` حين لا يُعرف الطول فيتحرك الشريط. تضيف `status` ‏`success` أو `error` لمهمة منتهية أيقونة واللون المناسب، وينبغي أن يقول نص المساعدة ما حدث. سمِّه بـ `label` (أو `aria-label`).",
  "progress.Progress.label": "التسمية فوق الشريط. وهي اسم شريط التقدم لقارئات الشاشة.",
  "progress.Progress.showValue": "يعرض النسبة المئوية في نهاية صف التسمية. الافتراضي `true`.",
  "progress.Progress.helperText": "سطر مساعدة تحت الشريط.",
  "progress.Progress.formatValue":
    'يحوّل القيمة إلى النص المعروض، مثل الأرقام الهندية: `(v) => "٥٠٪"`.',
  "progress.ProgressCircle":
    "حلقة تبيّن التقدم (في DGA: حلقة التقدم)، على Base UI Progress. الأحجام 64 و80 و120 و160 و200px. تعرض `status` ‏`success` علامة صح و`error` تنبيهًا بدل النسبة. ومع `value={null}` تدور الحلقة (قوس ثابت حين يفضّل الشخص تقليل الحركة).",
  "progress.ProgressCircle.label": "عنوان قصير تحت النسبة، مثل «مستخدم نشط». يُخفى دون 120px.",
  "progress.ProgressCircle.showValue": "يعرض النسبة في الوسط. الافتراضي `true`.",
  "progress.ProgressCircle.formatValue": 'يحوّل القيمة إلى النص المعروض. الافتراضي `"50%"`.',
  "rating.Rating":
    "تقييم بالنجوم (في DGA: Rating). تفاعلي افتراضيًا: مجموعة أزرار اختيار، فتكون نجمة واحدة في ترتيب Tab وتغيّر مفاتيح الأسهم التقييم (يمين ويسار يتبادلان في الصفحات العربية)، والمرور على نجمة يعاينها. ومع `readOnly` يصير صورة ببديل نصي. ويضيف `allowHalf` أنصاف النجوم، ويعرض للقراءة فقط القيم الكسرية. تقع النجمة الأولى عند جهة البداية، فتمتلئ من اليمين إلى اليسار في الصفحات العربية. ويستخدم `brand` اللون الأساسي بدل الذهبي.",
  "rating.Rating.value": "التقييم من 0 إلى `max` (بتحكم خارجي).",
  "rating.Rating.defaultValue": "التقييم في البداية (دون تحكم). الافتراضي 0، أي بلا تقييم.",
  "rating.Rating.onValueChange":
    "تُستدعى بالتقييم الذي اختاره الشخص، من 1 إلى `max` (من 0.5 مع `allowHalf`).",
  "rating.Rating.max": "عدد النجوم. الافتراضي 5.",
  "rating.Rating.allowHalf":
    "يتيح نصف نجمة (في DGA: نجوم نصفية). لكل نجمة نصف في جهة البداية ونصف في جهة النهاية، وتتحرك مفاتيح الأسهم بمقدار نصف نجمة. وفي التقييم للقراءة فقط تُرسم القيمة الكسرية كما هي مع هذه الخاصية أو بدونها.",
  "rating.Rating.readOnly": "يعرض التقييم دون السماح بتغييره.",
  "rating.Rating.disabled": "لا يمكن تغيير التقييم ويُخفَّف لونه.",
  "rating.Rating.required": "يجعل الحقل مطلوبًا في نموذج.",
  "rating.Rating.name": "اسم حقل النموذج.",
  "rating.Rating.starLabel":
    "اسم نجمة واحدة، مثل «3 نجوم». يسمّي كل نجمة لقارئة الشاشة. ترجمه في الصفحات العربية.",
  "rating.Rating.summaryLabel":
    "النص المقروء للتقييم في وضع القراءة فقط، مثل «التقييم 4 من 5». ترجمه في الصفحات العربية.",
  "stepper.Stepper":
    'يبيّن موضع الشخص في عملية (في DGA: Progress Indicator)، أفقيًا أو رأسيًا. ضع عناصر `StepperItem` بالترتيب واضبط `value` على الخطوة الحالية: فما قبلها مكتمل وما بعدها قادم، ويمكن وسم عنصر بـ `status="error"`. يعلن كل عنصر حالته، وللحالي `aria-current="step"`. وتحت عرض `sm` يُطوى Stepper الأفقي إلى شكل Radial Stepper المضغوط: حلقة فيها «2 من 4» واسم الخطوة والتالية. ومع `onValueChange` تكون الخطوات أزرارًا تُبلَغ بـ Tab.',
  "stepper.Stepper.value": "الخطوة الحالية، من 0 (بتحكم خارجي). الخطوات قبلها مكتملة وبعدها قادمة.",
  "stepper.Stepper.onValueChange":
    "تُستدعى بفهرس الخطوة حين يختارها شخص. تمريرها يحوّل الخطوات إلى أزرار؛ واتركها لـ Stepper للعرض فقط.",
  "stepper.Stepper.labels":
    "كلمات تُقرأ بعد عنوان كل خطوة، مثل «مكتملة». ترجمها في الصفحات العربية.",
  "stepper.Stepper.formatNumber":
    "يحوّل الرقم إلى الأرقام المعروضة، مثل الأرقام الهندية في الصفحات العربية.",
  "stepper.Stepper.compactLabel":
    "النص داخل حلقة الشكل المضغوط في الشاشات الضيقة، مثل «2 من 4». تنسّق الأرقام بنفسك. مرّر `false` ليبقى Stepper الكامل في كل عرض.",
  "stepper.Stepper.nextLabel": "البادئة قبل اسم الخطوة التالية في الشكل المضغوط، مثل «التالي:».",
  "stepper.StepperItem": "خطوة واحدة. يجب أن تكون ابنًا مباشرًا لـ `Stepper`.",
  "stepper.StepperItem.title": "اسم الخطوة.",
  "stepper.StepperItem.description": "سطر تحت الاسم.",
  "stepper.StepperItem.status":
    "يفرض حالة، مثل `error` حين تكون في الخطوة مشكلة. الافتراضي من `value`.",
  "stepper.StepperItem.disabled":
    "لا يمكن اختيار الخطوة حين يكون لـ Stepper الخاصية `onValueChange`.",
  "table-of-contents.TableOfContents":
    'مخطط للصفحة بروابط إلى أقسامها (في DGA: جدول المحتويات). يُميَّز القسم المقروء ويحمل `aria-current="location"`. ينقل Tab بين الروابط، وكذلك مفتاحا السهم لأعلى وأسفل وHome وEnd. اقرن كل رابط بعنصر له `id` مطابق، وأضف `scroll-margin-top` إلى تلك العناصر للترويسة الثابتة.',
  "table-of-contents.TableOfContents.items": "الأقسام بترتيب الصفحة. تتداخل المستويات بالإزاحة.",
  "table-of-contents.TableOfContents.activeId":
    "القسم الحالي (بتحكم خارجي). اتركه ليتبع موضع التمرير.",
  "table-of-contents.TableOfContents.onActiveChange":
    "تُستدعى حين يتغير القسم الحالي، بالتمرير أو باختيار رابط.",
  "table-of-contents.TableOfContents.offset":
    "عدد البكسلات من أعلى نافذة العرض الذي يُعدّ عنده القسم قد بُلغ. الافتراضي 96.",
  "table.Table":
    "جدول HTML دلالي بسيط (في DGA: Table). يصغّر `compact` الصفوف، ويظلل `striped` كل صف ثانٍ (في DGA: صفوف متبادلة)، ويضيف `contained` حدًا وزوايا مدورة، وترسم `rowDivider` (الافتراضي) و`columnDivider` الخطوط. يتمرر الجدول أفقيًا داخل غلافه حين تضيق الشاشة، وتتبع الأعمدة اتجاه الصفحة. أعطه `TableCaption` أو `aria-label`.",
  "table.Table.containerClassName": "أصناف الغلاف الذي يتمرر حول الجدول.",
  "table.Table.scrollLabel":
    "اسم منطقة التمرير الذي تقرؤه قارئات الشاشة حين يكون الجدول أعرض من حاويته. اتركه لجدول يتسع دائمًا.",
  "table.TableRow": "صف. يظلله `selected`، وتغمق الصفوف عند المرور.",
  "table.TableRow.selected": "يضع على الصف تعبئة التحديد و`aria-selected`.",
  "table.TableHead":
    'عنوان عمود أو صف. قيمة `scope` هي `col` افتراضيًا؛ ومرّر `scope="row"` لعنوان صف.',
  "table.TableSortButton":
    'زر الترتيب في عنوان عمود (في DGA: ترتيب في عنوان عمود الجدول). قيمة `direction` هي `false` (غير مرتب) أو `"asc"` أو `"desc"`. ضعه في `TableHead` وضع `aria-sort` على ذلك العنوان. وسمِّه، مثل «ترتيب حسب الاسم».',
  "table.TableFilterButton":
    "زر التصفية في عنوان عمود (في DGA: تصفية في عنوان عمود الجدول). قيمة `active` صحيحة ما دام مرشح مطبقًا؛ واضبط `aria-pressed` أو `aria-expanded` بما يفعله الزر.",
  "pagination.Pagination.size": "حجم العنصر: `sm` ‏24px، و`md` ‏32px (الافتراضي)، و`lg` ‏40px.",
  "card.Card.effect":
    "`shadow` (الافتراضي) أو `stroke` (حد 1px) أو `none`. ولا ظل في الوضع الداكن.",
  "card.Card.size": "الحشو والفجوة: `sm` أو `md` أو `lg` (الافتراضي، ‏16px و24px).",
  "card.CardExpandable.effect":
    "`shadow` (الافتراضي) أو `stroke` (حد 1px) أو `none`. ولا ظل في الوضع الداكن.",
  "card.CardExpandable.size": "الحشو والفجوة: `sm` أو `md` أو `lg` (الافتراضي، ‏16px و24px).",
  "card.SelectableCard.effect":
    "`shadow` (الافتراضي) أو `stroke` (حد 1px) أو `none`. ولا ظل في الوضع الداكن.",
  "card.SelectableCard.size": "الحشو والفجوة: `sm` أو `md` أو `lg` (الافتراضي، ‏16px و24px).",
  "list.List.tone": "اللون: `primary` أو `neutral` (الافتراضي) أو `onColor` لخلفيات العلامة.",
  "list.StructuredList.compact": "صفوف أقصر (48px).",
  "list.StructuredList.contained": "حد وزوايا مدورة حول القائمة.",
  "list.StructuredList.rowDivider": "خط بين الصفوف. الافتراضي `true`.",
  "list.StructuredList.columnDivider": "خط بين الأعمدة.",
  "table.Table.compact": "صفوف أقصر (48px) ورأس أقصر (40px).",
  "table.Table.contained": "حد وزوايا مدورة حول الجدول.",
  "table.Table.striped": "يظلل كل صف ثانٍ (في DGA: صفوف متبادلة).",
  "table.Table.rowDivider": "خط بين الصفوف. الافتراضي `true`.",
  "table.Table.columnDivider": "خط بين الأعمدة.",
  "rating.Rating.size": "حجم النجمة: `sm` ‏24px، و`md` ‏32px (الافتراضي)، و`lg` ‏48px.",
  "rating.Rating.brand": "اللون الأساسي بدل الذهبي.",
  "progress.Progress.size": "ارتفاع الشريط: `sm` ‏8px، و`md` ‏12px (الافتراضي)، و`lg` ‏16px.",
  "progress.Progress.tone": "لون التعبئة: `primary` (الافتراضي) أو `neutral`.",
  "progress.Progress.status": "`success` أو `error` لمهمة منتهية: يضيف أيقونة واللون المناسب.",
  "progress.ProgressCircle.size": "القطر بالبكسل: 64 أو 80 أو 120 (الافتراضي) أو 160 أو 200.",
  "progress.ProgressCircle.tone": "لون التعبئة: `primary` (الافتراضي) أو `neutral`.",
  "progress.ProgressCircle.status":
    "`success` أو `error` لمهمة منتهية: يضيف أيقونة واللون المناسب.",
  "stepper.Stepper.orientation": "`horizontal` (الافتراضي) أو `vertical`.",
  "carousel.Carousel.controls":
    "ما يظهر مع الشرائح: `arrows` (السابق والتالي بجانب الشرائح)، أو `dots` (الأسهم وصف النقاط)، أو `dots-only`.",
  "carousel.Carousel.index": "الشريحة الظاهرة، تبدأ من 0 (بتحكم خارجي).",
  "carousel.Carousel.defaultIndex": "الشريحة المعروضة في البداية (دون تحكم). الافتراضي 0.",
  "carousel.Carousel.onIndexChange": "تُستدعى برقم الشريحة الجديدة.",
  "carousel.Carousel.autoPlay":
    "ينتقل تلقائيًا كل هذا العدد من المللي ثانية. الافتراضي 0 ويعني إيقافه.",
  "carousel.Carousel.loop": "ينتقل من الشريحة الأخيرة إلى الأولى والعكس. الافتراضي `false`.",
  "carousel.Carousel.previousLabel": "اسم زر السابق. ترجمه في الصفحات العربية.",
  "carousel.Carousel.nextLabel": "اسم زر التالي.",
  "carousel.Carousel.pauseLabel": "اسم زر الإيقاف المؤقت (يظهر أثناء التشغيل).",
  "carousel.Carousel.playLabel": "اسم زر التشغيل (يظهر أثناء الإيقاف المؤقت).",
  "carousel.Carousel.slideLabel": "اسم كل شريحة، مثل «1 من 5».",
  "carousel.Carousel.dotLabel": "اسم كل نقطة، مثل «انتقل إلى الشريحة 2».",
  "carousel.Carousel.dotsLabel": "اسم صف النقاط.",
  "carousel.Carousel.dotSize": "حجم النقاط: 8 أو 12 أو 16px. الافتراضي `md`.",
  "carousel.Carousel":
    "تصفّح مجموعة من الشرائح (DGA: Carousel). زرّا السابق والتالي، وصف من النقاط، وتشغيل تلقائي مع زر إيقاف مؤقت، والسحب على شاشات اللمس، ومفتاحا السهمين اليمين واليسار (يتبادلان في الصفحات العربية) أثناء وجود التركيز داخله. تتبع الشرائح اتجاه الصفحة: الأولى على اليمين في العربية. يتوقف التشغيل التلقائي ما دام المؤشر أو التركيز داخله، ولا يبدأ إذا فضّل الشخص تقليل الحركة. سمِّه بـ `aria-label`. كل عنصر ابن شريحة.",
  "date-picker.Calendar.calendar": "التقويم المعروض (بتحكم خارجي).",
  "date-picker.Calendar.value":
    "التاريخ المختار بصيغة ISO، أو `null` (بتحكم خارجي). أو النطاق المختار؛ تكون `end` فارغة (`null`) ما دام الشخص يختار.",
  "date-picker.Calendar.months": "شهر واحد، أو شهران جنبًا إلى جنب (DGA: عرض الشهرين).",
  "date-picker.Calendar.min": "أبكر تاريخ يمكن اختياره، بصيغة ISO.",
  "date-picker.Calendar.max": "أحدث تاريخ يمكن اختياره.",
  "date-picker.Calendar.weekStartsOn": "أول أيام الأسبوع: 0 الأحد (الافتراضي)، و6 السبت.",
  "date-picker.Calendar.defaultCalendar":
    "التقويم المعروض في البداية (دون تحكم). الافتراضي `gregorian`.",
  "date-picker.Calendar.calendars":
    "التقاويم التي يمكن التبديل بينها. إدخال واحد يخفي المبدّل. الافتراضي الاثنان: الميلادي والهجري (أم القرى).",
  "date-picker.Calendar.isDateDisabled":
    "يجعل تواريخ أخرى غير متاحة، مثل عطلات نهاية الأسبوع أو الإجازات.",
  "date-picker.Calendar.today":
    "تاريخ اليوم بصيغة ISO. الافتراضي: تاريخ الجهاز. مفيد في الاختبارات.",
  "date-picker.Calendar.defaultMonth":
    "الشهر المعروض في البداية، بأي تاريخ ISO منه. الافتراضي: التاريخ المختار وإلا اليوم.",
  "date-picker.Calendar.locale":
    "لغة أسماء الأشهر والأيام. الافتراضي: العربية في الصفحات من اليمين إلى اليسار، والإنجليزية في غيرها.",
  "date-picker.Calendar.numerals":
    "الأرقام: `latn` (من 0 إلى 9، الافتراضي) أو `arab` (هندية عربية).",
  "date-picker.Calendar.secondaryDate":
    "يعرض يوم التقويم الآخر تحت كل رقم بصيغة «يوم/شهر» (DGA: التاريخ الثانوي)، مثل اليوم الهجري في التقويم الميلادي.",
  "date-picker.Calendar.yearDropdown":
    "يعرض السنة قائمة منسدلة في الترويسة (DGA: Year Dropdown) فيصل المستخدم إلى سنة بعيدة باختيار واحد. تسرد السنوات من `min` إلى `max` (مئة سنة قبل اليوم وبعده عند عدم تحديدهما). الافتراضي `true`.",
  "date-picker.Calendar":
    "شبكة شهر لاختيار تاريخ أو نطاق (DGA: Date Picker، التقويم). الميلادي والهجري (أم القرى) مع مبدّل بينهما. مفاتيح الأسهم تتحرك باليوم والأسبوع (يتبادل اليمين واليسار في الصفحات العربية)، وHome وEnd إلى بداية الأسبوع ونهايته، وPage Up وPage Down لتغيير الشهر ومعهما Shift لتغيير السنة، وEnter أو Space للاختيار. التواريخ نصوص ISO فلا تتأثر القيمة بالمنطقة الزمنية.",
  "date-picker.DatePicker.calendar": "التقويم المعروض (بتحكم خارجي).",
  "date-picker.DatePicker.months": "تعرض النافذة شهرين جنبًا إلى جنب.",
  "date-picker.DatePicker.min": "أبكر تاريخ يمكن اختياره، بصيغة ISO.",
  "date-picker.DatePicker.max": "أحدث تاريخ يمكن اختياره.",
  "date-picker.DatePicker.weekStartsOn": "أول أيام الأسبوع: 0 الأحد (الافتراضي)، و6 السبت.",
  "date-picker.DatePicker.name": "اسم حقل النموذج لقيمة ISO.",
  "date-picker.DatePicker.defaultCalendar":
    "التقويم المعروض في البداية (دون تحكم). الافتراضي `gregorian`.",
  "date-picker.DatePicker.calendars":
    "التقاويم التي يمكن التبديل بينها. إدخال واحد يخفي المبدّل. الافتراضي الاثنان: الميلادي والهجري (أم القرى).",
  "date-picker.DatePicker.isDateDisabled":
    "يجعل تواريخ أخرى غير متاحة، مثل عطلات نهاية الأسبوع أو الإجازات.",
  "date-picker.DatePicker.today":
    "تاريخ اليوم بصيغة ISO. الافتراضي: تاريخ الجهاز. مفيد في الاختبارات.",
  "date-picker.DatePicker.defaultMonth":
    "الشهر المعروض في البداية، بأي تاريخ ISO منه. الافتراضي: التاريخ المختار وإلا اليوم.",
  "date-picker.DatePicker.locale":
    "لغة أسماء الأشهر والأيام. الافتراضي: العربية في الصفحات من اليمين إلى اليسار، والإنجليزية في غيرها.",
  "date-picker.DatePicker.numerals":
    "الأرقام: `latn` (من 0 إلى 9، الافتراضي) أو `arab` (هندية عربية).",
  "date-picker.DatePicker.yearDropdown":
    "يعرض السنة قائمة منسدلة في ترويسة التقويم (DGA: Year Dropdown). الافتراضي `true`.",
  "date-picker.DatePicker.secondaryDate":
    "يعرض يوم التقويم الآخر تحت كل رقم بصيغة «يوم/شهر» (DGA: التاريخ الثانوي)، مثل اليوم الهجري في التقويم الميلادي.",
  "date-picker.DatePicker.invalid": "يحدد الحقل على أنه غير صالح (يفعل Field ذلك عبر `invalid`).",
  "date-picker.DatePicker.confirm": "يعرض زرّي «إلغاء» و«تطبيق»: لا يُحتسب الاختيار إلا بعد التطبيق.",
  "date-picker.DatePicker.quickOptions":
    "اختصارات تظهر بجانب التقويم، مثل «اليوم» أو «آخر 7 أيام».",
  "date-picker.DatePicker.quickOptionsLabel": "اسم قائمة الاختصارات.",
  "date-picker.DatePicker.startName": "أسماء حقول النموذج للنطاق.",
  "date-picker.DatePicker":
    'حقل تاريخ مع تقويم منبثق (DGA: Date Picker). اكتب التاريخ بصيغة `YYYY-MM-DD` في التقويم المعروض أو اخترْه من النافذة، وتُفتح بزر التقويم وتُغلق بـ Escape. `mode="range"` يعرض حقل بداية وحقل نهاية. ضعه داخل Field ليحصل على تسمية ونص مساعد ورسالة خطأ. مرّر `min` و`max` و`isDateDisabled` لتقييد التواريخ.',
  "filtration.Filtration.value": "المرشحات المختارة (بتحكم خارجي).",
  "filtration.Filtration.defaultValue": "المرشحات المختارة في البداية (دون تحكم).",
  "filtration.Filtration.groups": "مجموعات المرشحات بالترتيب.",
  "filtration.Filtration.onValueChange": "تُستدعى بالمرشحات الجديدة.",
  "filtration.Filtration.resultCount": "عدد النتائج، يظهر فوقها. احذفه لإخفاء العدد.",
  "filtration.Filtration.resultLabel": "تكتب العدد، مثل «12 نتيجة». ترجمها في الصفحات العربية.",
  "filtration.Filtration.clearAllLabel": "اسم زر مسح الكل.",
  "filtration.Filtration.appliedLabel": "اسم قائمة المرشحات المطبّقة.",
  "filtration.Filtration.removeLabel": "اسم زر إزالة الوسم، مثل «إزالة الرياض».",
  "filtration.Filtration.triggerLabel": "نص الزر الذي يفتح اللوحة على الشاشات الصغيرة.",
  "filtration.Filtration.applyLabel": "نص زر الدرج الذي يعرض النتائج.",
  "filtration.Filtration.drawerDescription": "سطر تحت عنوان الدرج لقارئات الشاشة.",
  "filtration.Filtration.drawerSide":
    'الجهة التي يُفتح منها الدرج على الشاشات الصغيرة (مع `placement="inline"`).',
  "filtration.Filtration.placement":
    "موضع اللوحة (DGA: Placement). `inline` (الافتراضي) بجانب النتائج من عرض `lg` وفي درج تحته. `start` و`end` يعرضان زرًّا دائمًا يفتح اللوحة مثبّتة على تلك الجهة في درج، و`center` يفتحها في مربع حوار في الوسط.",
  "filtration.Filtration.closeLabel": "اسم زر إغلاق الدرج.",
  "filtration.Filtration":
    "نمط التصفية (DGA: Filtration): لوحة من المجموعات (خانات اختيار وأزرار اختيار يمكن أن يكون لها حقل بحث وزر «عرض المزيد»، وقائمة منسدلة، وحقل نص، ونطاق، وتاريخ، وتقييم، أو عنصر تحكم ترسمه بنفسك)، والمرشحات المطبّقة وسومًا قابلة للإزالة مع زر مسح الكل، وعدد النتائج فوق نتائجك (`children`). تقع اللوحة افتراضيًا بجانب النتائج من عرض `lg` ويفتح زر اللوحة نفسها في درج تحته؛ ويجعل `placement` الزر هو المدخل الوحيد ويفتح اللوحة من جهة أو في الوسط. استخدمه بتحكم خارجي عبر `value` و`onValueChange`، أو دون تحكم عبر `defaultValue`. صفِّ بياناتك بنفسك بالقيمة.",
  "footer.Footer.logo": "شعار الجهة.",
  "footer.Footer.partnerLogos":
    "شعارات المنصات والشركاء (رؤية 2030، المنصات الوطنية) على لوح أبيض.",
  "footer.Footer.description": "نص قصير تحت الشعار.",
  "footer.Footer.columns": "أعمدة روابط التنقل.",
  "footer.Footer.columnsLabel": "اسم منطقة الروابط. ترجمه في الصفحات العربية.",
  "footer.Footer.social": "روابط وسائل التواصل الاجتماعي.",
  "footer.Footer.socialTitle": "عنوان قسم وسائل التواصل الاجتماعي.",
  "footer.Footer.accessibilityTools": "أدوات الوصول: أزرار أيقونات بإطار في قسم خاص بها.",
  "footer.Footer.accessibilityTitle": "عنوان قسم أدوات الوصول.",
  "footer.Footer.bottomLinks": "صف روابط مسطّرة فوق الصف القانوني، مثل مواقع الجهة.",
  "footer.Footer.bottomLabel": "اسم قائمة الروابط السفلية.",
  "footer.Footer.socialLabel": "اسم قائمة روابط التواصل الاجتماعي.",
  "footer.Footer.contactTitle": "عنوان قسم التواصل.",
  "footer.Footer.badges": "شارات المتاجر: مرّر الروابط مع صورها.",
  "footer.Footer.badgesTitle": "عنوان قسم شارات التطبيق.",
  "footer.Footer.legalLinks": "صف الروابط القانونية: الشروط والأحكام وسياسة الخصوصية.",
  "footer.Footer.legalLabel": "اسم قائمة الروابط القانونية.",
  "footer.Footer.copyright": "سطر حقوق النشر.",
  "footer.Footer.collapsible":
    "يطوي مجموعات الروابط في أكورديون على الشاشات الضيقة. الافتراضي `false`: عمودان.",
  "footer.Footer.fullWidth": "يمتد بكامل العرض. الافتراضي: في المنتصف بعرض أقصى 1280px.",
  "footer.Footer.externalLabel": "نص لقارئات الشاشة يُضاف إلى الروابط الخارجية.",
  "footer.Footer":
    "تذييل الموقع (DGA: Footer): شعارات (شعارات المنصات على الأبيض)، ومجموعات روابط، وقسم وسائل التواصل الاجتماعي، وقسم أدوات الوصول، وصف روابط مسطّرة، والصف القانوني بحقوق النشر والشروط والخصوصية. النص الوصفي وبيانات التواصل وشارات التطبيق اختيارية. افتراضي (رمادي) أو أخضر داكن. تحت عرض `sm` تصير المجموعات عمودين ويتوسط الصف القانوني؛ و`collapsible` يطويها في أكورديون. كل نص ظاهر خاصية، فترجمه في الصفحات العربية.",
  "header.Header.linkStyle":
    "شكل روابط القائمة الفرعية: نص فقط، أو مع أيقونة بسيطة، أو مع أيقونة داخل مربع.",
  "header.Header.top": "شريط فوق الترويسة: ضع هنا Second Nav.",
  "header.Header.submenuTone": "لوحة القائمة الفرعية: بيضاء، أو بالأخضر الداكن لعلم DGA.",
  "header.Header.logo": "الشعار، وهو عادةً رابط إلى الصفحة الرئيسية. مرّر `img` أو SVG خاصًّا بك.",
  "header.Header.items": "قائمة التنقل الرئيسية.",
  "header.Header.actions": "إجراءات في نهاية الشريط.",
  "header.Header.search": "حقل بحث أو زر يفتح البحث. يظهر في الشريط من `lg`، وفي أعلى الدرج تحته.",
  "header.Header.language": "مبدّل اللغة (مثل Menu أو رابط).",
  "header.Header.user": "منطقة المستخدم: زر تسجيل الدخول أو قائمة الحساب.",
  "header.Header.fullWidth": "يمتد بكامل العرض. الافتراضي: في المنتصف بعرض أقصى 1280px.",
  "header.Header.skipHref":
    "وجهة رابط التخطي. الافتراضي `#main-content`. أعطِ العنصر `main` هذا المعرّف.",
  "header.Header.skipLabel": "نص رابط التخطي. ترجمه في الصفحات العربية.",
  "header.Header.navLabel": "اسم قائمة التنقل الرئيسية. ترجمه في الصفحات العربية.",
  "header.Header.menuLabel": "اسم الزر الذي يفتح القائمة على الشاشات الصغيرة.",
  "header.Header.moreLabel": "اسم زر الفائض (…) على الشاشات الصغيرة، وهو يفتح الإجراءات.",
  "header.Header.drawerTitle": "عنوان الدرج.",
  "header.Header.drawerDescription": "سطر تحت عنوان الدرج لقارئات الشاشة.",
  "header.Header.closeLabel": "اسم زر إغلاق الدرج.",
  "header.Header":
    'ترويسة الموقع (DGA: Nav Header): شعار، وقائمة التنقل الرئيسية مع قوائم فرعية، وإجراءات وبحث ومبدّل لغة ومنطقة مستخدم. رابط التخطي أول ما يصله التركيز. مفتاحا اليمين واليسار (يتبادلان في الصفحات العربية) وHome وEnd ينقلان بين العناصر؛ وEnter أو Space أو السهم لأسفل يفتح القائمة الفرعية، وهي Menu من DGA. تحت عرض `lg` يصير الشريط زر القائمة والشعار في المنتصف وزر الفائض (…)، وتنتقل القائمة إلى Drawer. للصفحة الحالية `aria-current="page"`.',
  "header.HeaderAction.iconOnly": "أيقونة فقط: يخفي النص (ويبقى اسمًا للوصول). يحتاج إلى `icon`.",
  "header.HeaderAction.iconPosition": "يضع الأيقونة فوق النص.",
  "header.HeaderAction":
    "إجراء واحد في شريط الترويسة (DGA: `Header Action`): أيقونة ونص، في سطر واحد أو بالأيقونة فوق النص. يصير رابطًا إن كان له `href` وإلا زرًّا. الأنماط: مضمّن، وعلوي، ونص فقط، وأيقونة فقط، بالحالات الخمس وكتلة التحديد بشريطها السفلي. تحت عرض `lg` تنتقل الإجراءات إلى قائمة الفائض (…).",
  "second-nav.SecondNav.items":
    "عناصر سياقية في البداية: الطقس أو التاريخ أو الوقت أو الموقع (`kind`).",
  "second-nav.SecondNav.actions":
    "إجراءات في النهاية: بأيقونة فقط (`iconOnly`) أو بأيقونة ونص، مثل التكبير أو التباين.",
  "second-nav.SecondNavItem.entry":
    "الإدخال: `label` و`icon` أو `kind` (`weather` أو `date` أو `time` أو `location`) و`iconOnly` و`href` أو `onClick` و`current` و`disabled`.",
  "second-nav.SecondNavItem.tone":
    "`on-color` للشريط الأساسي (الأخضر). داخل `SecondNav` يتبع العنصر الشريط.",
  "second-nav.SecondNavItem":
    "عنصر واحد من الشريط (DGA: sub-header-Item): أيقونة اختيارية ونص بينهما 4px، بحالة افتراضية وحالة على اللون. يصير رابطًا إن كان له `href` وزرًّا إن كان له `onClick`. يستخدمه `SecondNav`، ويمكن استخدامه وحده.",
  "second-nav.SecondNav.fullWidth": "يمتد بكامل العرض. الافتراضي: في المنتصف بعرض أقصى 1280px.",
  "second-nav.SecondNav.divider": "يعرض الفاصل بين العناصر والإجراءات. الافتراضي `true`.",
  "second-nav.SecondNav":
    "الشريط الثانوي فوق الترويسة (DGA: Second Nav Header): عناصر سياقية هي الطقس والتاريخ والوقت والموقع، ثم الإجراءات بأيقونة فقط أو بأيقونة ونص، بارتفاع 40px، رمادي أو أساسي. الإدخال الذي له `href` رابط، والذي له `onClick` زر، وغيره نص عادي. على الشاشات الضيقة يتمرر أفقيًا بدل الالتفاف. سمِّه بـ `aria-label`.",
  "header.Header.defaultMenuOpen": "يفتح الدرج عند أول عرض. لعرضه في التوثيق.",
  ...API_DESCRIPTIONS_AR_EXT_OVERLAYS,
  ...API_DESCRIPTIONS_AR_EXT_INPUTS,
  ...API_DESCRIPTIONS_AR_EXT_MISC,
  ...API_DESCRIPTIONS_AR_EXT_NAV,
  ...API_DESCRIPTIONS_AR_EXT_LAYOUT,
  ...API_DESCRIPTIONS_AR_EXT_DISPLAY,
};
