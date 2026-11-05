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
};
