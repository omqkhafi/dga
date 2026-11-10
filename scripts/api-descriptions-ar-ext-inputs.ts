// Arabic API descriptions for the Phase 7 inputs work stream. Keyed `slug.Part` and
// `slug.Part.prop`. Prop names, values and code stay in English.
const render = "يتيح لك استبدال عنصر HTML الخاص بالمكوّن بوسم آخر. من Base UI.";
const disabled = "يتجاهل كل تفاعل.";

export const API_DESCRIPTIONS_AR_EXT_INPUTS: Record<string, string> = {
  // Slider
  "slider.Slider":
    "يختار قيمة، أو نطاقًا من قيمتين، بسحب مقبض على مسار (DGA: Slider). السهمان الأيمن والأيسر (أو الأعلى والأسفل) يحركان المقبض بمقدار `step`، ومفتاحا Page Up وDown بمقدار `largeStep`، وHome وEnd إلى الطرفين. يتبع الملء والسهمان اتجاه الصفحة: في الصفحات العربية يكون الحد الأدنى على اليمين، ويرفع السهم الأيسر القيمة ويخفضها الأيمن. مرّر مصفوفة في `value` أو `defaultValue` للنطاق.",
  "slider.Slider.size": "صغير (مسار 4px ومقبض 16px) أو متوسط (مسار 6px ومقبض 20px).",
  "slider.Slider.label": "الاسم المرئي فوق المسار. داخل Field اتركه واستخدم FieldLabel.",
  "slider.Slider.helperText": "نص مساعد تحت المسار. داخل Field استخدم FieldDescription.",
  "slider.Slider.error": "رسالة خطأ بأيقونة، وتحمّر معها المقابض. داخل Field استخدم FieldError.",
  "slider.Slider.showValue": "يعرض القيمة الحالية (أو قيمتي النطاق) مقابل التسمية (في DGA: Value).",
  "slider.Slider.showMinMax":
    "يعرض تسميتي الحد الأدنى والأقصى (في DGA: الحد الأدنى والأقصى) تحت طرفي المسار. الافتراضي `false`.",
  "slider.Slider.minLabel": "يستبدل نص تسمية الحد الأدنى، وهي `min` افتراضيًا.",
  "slider.Slider.maxLabel": "يستبدل نص تسمية الحد الأقصى، وهي `max` افتراضيًا.",
  "slider.Slider.thumbLabels":
    "الأسماء البرمجية للمقابض. النطاق يحتاج اسمين (مثل الحد الأدنى والأقصى)، والمقبض المفرد تسميه التسمية. ترجمها في الصفحات العربية.",
  "slider.Slider.value": "القيمة (متحكَّم بها). مصفوفة من رقمين تجعله نطاقًا.",
  "slider.Slider.defaultValue": "القيمة الأولية (غير متحكَّم بها). مصفوفة من رقمين تجعله نطاقًا.",
  "slider.Slider.onValueChange": "يُستدعى أثناء تحريك مقبض، مع الرقم أو المصفوفة.",
  "slider.Slider.onValueCommitted": "يُستدعى عند رفع المؤشر أو ضغط مفتاح، مع القيمة النهائية.",
  "slider.Slider.min": "أدنى قيمة. الافتراضي 0.",
  "slider.Slider.max": "أعلى قيمة. الافتراضي 100.",
  "slider.Slider.step": "خطوة مفاتيح الأسهم. الافتراضي 1.",
  "slider.Slider.largeStep": "خطوة Page Up وDown ومفتاح Shift مع السهم. الافتراضي 10.",
  "slider.Slider.disabled": disabled,
  "slider.Slider.locale": "لغة عرض القيمة ونطقها، مثل `ar-EG` للأرقام العربية الهندية.",
  // Phone Input
  "phone-input.PhoneInput":
    "حقل رقم جوال: قائمة قابلة للبحث بكل دول العالم، يظهر فيها مفتاح الدولة في عمود ثابت العرض ثم اسمها في سطر واحد، ثم الرقم (امتداد من كود المنصات على Combobox وInput). يبقى الرقم من اليسار إلى اليمين في الصفحات العربية أيضًا، والأرقام العربية الهندية (٥) تتحول إلى غربية (5)، ويُجمَّع الرقم أثناء الكتابة، وقيمته هي الرقم الدولي (`+966512345678`) الجاهز للإرسال. لصق رقم يبدأ بـ `+` أو `00` يختار الدولة تلقائيًا. داخل Field.",
  "phone-input.PhoneInput.size": "الارتفاع: `md` ‏32px، و`lg` ‏40px.",
  "phone-input.PhoneInput.appearance": "نمط التعبئة. `lighter` و`darker` يُبقيان الحد.",
  "phone-input.PhoneInput.value":
    "الرقم بالصيغة الدولية، مثل `+966512345678` (متحكَّم به). نص فارغ يعني حقلًا فارغًا.",
  "phone-input.PhoneInput.defaultValue": "الرقم الأولي بالصيغة الدولية (غير متحكَّم به).",
  "phone-input.PhoneInput.onValueChange":
    "يُستدعى عند كل تغيير بالرقم الدولي وتفاصيله: الدولة والأرقام الوطنية والتنسيق وصحة الطول.",
  "phone-input.PhoneInput.country": "الدولة المختارة برمزها (`SA`) (متحكَّم بها).",
  "phone-input.PhoneInput.defaultCountry":
    "الدولة الأولية (غير متحكَّم بها). الافتراضي: أولى `preferredCountries`، وإلا `SA`.",
  "phone-input.PhoneInput.onCountryChange":
    "يُستدعى عند تغير الدولة، باختيارها من القائمة أو بكتابة رقم يبدأ بـ `+` أو لصقه.",
  "phone-input.PhoneInput.excludeCountries":
    "يستثني هذه الدول (برموزها) من القائمة. ولا يُتعرَّف على رقم يبدأ بمفتاح إحداها.",
  "phone-input.PhoneInput.onlyCountries":
    "يعرض هذه الدول فقط (برموزها). يجتمع مع `excludeCountries`.",
  "phone-input.PhoneInput.preferredCountries":
    "دول تُعرض أولًا بهذا الترتيب تحت `preferredLabel`، ولا تتكرر في بقية القائمة.",
  "phone-input.PhoneInput.showFlag":
    "يعرض العلم قبل مفتاح الدولة. مطفأ افتراضيًا لأن ويندوز يرسم أعلام الإيموجي حروفًا.",
  "phone-input.PhoneInput.locale":
    "لغة أسماء الدول (`en` أو `ar`). الافتراضي: `lang` الصفحة. البحث يطابق اللغتين دائمًا.",
  "phone-input.PhoneInput.detectCountry":
    "يتعرف على الدولة حين يُكتب أو يُلصق رقم يبدأ بـ `+` أو `00`. الافتراضي `true`.",
  "phone-input.PhoneInput.stripTrunkPrefix":
    "يحذف الصفر الذي يُطلب داخل الدولة نفسها (`05…` تصبح `5…`). الافتراضي `true`.",
  "phone-input.PhoneInput.format": "يجمّع الأرقام أثناء الكتابة (`51 234 5678`). الافتراضي `true`.",
  "phone-input.PhoneInput.examplePlaceholder":
    "يعرض رقمًا نموذجيًا تلميحًا حتى تبدأ الكتابة. الافتراضي `true`، و`placeholder` يستبدله.",
  "phone-input.PhoneInput.invalid":
    "يعلّم الحقل بأنه خاطئ. الافتراضي: يصبح خاطئًا بعد مغادرته برقم طوله غير صحيح لدولته.",
  "phone-input.PhoneInput.validate":
    "دالة تستبدل فحص الطول المدمج. تستقبل التفاصيل وتعيد هل الرقم صحيح.",
  "phone-input.PhoneInput.name": "اسم الحقل المخفي الذي يُرسل مع النموذج، وقيمته الرقم الدولي.",
  "phone-input.PhoneInput.countryName": "اسم حقل مخفي ثانٍ يرسل رمز الدولة.",
  "phone-input.PhoneInput.countryLabel":
    "دالة تعيد اسم زر الدولة لقارئ الشاشة، وتستقبل اسم الدولة. ترجمها في الصفحات العربية.",
  "phone-input.PhoneInput.searchPlaceholder":
    "تلميح مربع البحث في القائمة. ترجمه في الصفحات العربية.",
  "phone-input.PhoneInput.emptyText": "يظهر حين لا تطابق أي دولة. ترجمه في الصفحات العربية.",
  "phone-input.PhoneInput.preferredLabel": "عنوان الدول المفضلة. ترجمه في الصفحات العربية.",
  "phone-input.PhoneInput.allLabel":
    "عنوان بقية الدول، ويظهر مع `preferredCountries` فقط. ترجمه في الصفحات العربية.",
  "phone-input.PhoneInput.statusLabel": "النص الذي يُقرأ لقارئ الشاشة عند تغير عدد النتائج.",
  "phone-input.PhoneInput.inputClassName": "أصناف خانة الرقم نفسها. أما `className` فللإطار حولها.",
  "phone-input.PhoneInput.countryDisabled": "يعطّل قائمة الدول ويترك الرقم قابلًا للتحرير.",
  "phone-input.PhoneInput.defaultOpen": "يفتح قائمة الدول من البداية.",
  // Input OTP
  "input-otp.InputOTP":
    "رمز لمرة واحدة في خانات منفصلة، مثل رمز الرسالة النصية (امتداد من كود المنصات على Base UI OTP Field). الكتابة تنقل إلى الخانة التالية، والحذف إلى السابقة، واللصق يملأها كلها. الأرقام العربية الهندية (٣) تتحول إلى غربية (3). تبقى الخانات من اليسار إلى اليمين في الصفحات العربية أيضًا لأن هذا ترتيب قراءة الأرقام وإرسالها. تتبع حالات Input وتعمل داخل Field.",
  "input-otp.InputOTP.length": "عدد الخانات. الافتراضي 6.",
  "input-otp.InputOTP.size": "ارتفاع الخانات: `md` ‏32px أو `lg` ‏40px (حجما Input).",
  "input-otp.InputOTP.groups":
    "مواضع الفواصل بعدد الخانات قبل كل فاصل. `[3]` على ست خانات تعطي 3 + 3. الافتراضي: بلا فواصل.",
  "input-otp.InputOTP.slotLabel":
    "الاسم البرمجي للخانات من الثانية فصاعدًا. يستبدل `{index}` و`{length}`، مثل «الرقم 2 من 6». تُسمّى الخانة الأولى بتسمية Field أو `aria-label` المجموعة.",
  "input-otp.InputOTP.invalid": "يعلّم الرمز بأنه خاطئ: حد وخط سفلي أحمران على كل خانة.",
  "input-otp.InputOTP.value": "الرمز (متحكَّم به). أرقام فقط.",
  "input-otp.InputOTP.defaultValue": "الرمز الأولي (غير متحكَّم به).",
  "input-otp.InputOTP.onValueChange": "يُستدعى عند تغير الرمز بالكتابة أو اللصق أو الحذف.",
  "input-otp.InputOTP.onValueComplete": "يُستدعى عند امتلاء كل الخانات أو لصق رمز كامل.",
  "input-otp.InputOTP.mask": "يعرض نقاطًا بدل الأرقام، للرقم السري. الافتراضي `false`.",
  "input-otp.InputOTP.disabled": disabled,
  "input-otp.InputOTP.readOnly": "يعرض الرمز دون السماح بتغييره.",
  "input-otp.InputOTP.name": "اسم الحقل عند إرسال النموذج.",
  "input-otp.InputOTP.autoSubmit": "يرسل النموذج عند اكتمال الرمز. الافتراضي `false`.",
  // Toggle
  "toggle.Toggle":
    "زر بحالتين يبقى مضغوطًا (امتداد من كود المنصات، ومظهره مثل زر DGA). استخدمه لإعداد يسري فورًا ويمكن إيقافه، مثل «عريض» أو «إظهار المرشحات». ‏Space وEnter يقلبانه. حالة الضغط هي تعبئة الزر المحدد مع حد داكن، مع `aria-pressed`، فلا تعتمد على اللون وحده. الزر بأيقونة فقط يحتاج `aria-label`. استخدم Switch لإعدادات النماذج، وCheckbox للخيارات التي تُرسل مع النموذج.",
  "toggle.Toggle.variant":
    "المظهر. `outline` (الافتراضي) و`subtle` و`transparent` تتبع أنماط الزر في DGA، و`secondary` هو المصمت.",
  "toggle.Toggle.value": "القيمة داخل ToggleGroup.",
  "toggle.Toggle.size": "الارتفاع: `sm` ‏24px، و`md` ‏32px، و`lg` ‏40px، مثل الزر.",
  "toggle.Toggle.iconOnly": "مربع بأيقونة فقط. يحتاج إلى `aria-label`.",
  "toggle.Toggle.onColor": "لأزرار التبديل على خلفيات لون العلامة.",
  "toggle.Toggle.pressed": "هل هو مضغوط (متحكَّم به).",
  "toggle.Toggle.defaultPressed": "هل هو مضغوط في البداية (غير متحكَّم به).",
  "toggle.Toggle.onPressedChange": "يُستدعى عند الضغط عليه أو تحريره.",
  "toggle.Toggle.disabled": disabled,
  "toggle.Toggle.render": render,
  // Toggle Group
  "toggle-group.ToggleGroup":
    "صف (أو عمود) من أزرار التبديل المترابطة (امتداد من كود المنصات). يمكن ضغط خيار واحد في كل مرة افتراضيًا، وبضبط `multiple` يمكن عدة خيارات كما في شريط أنماط النص. وعلى خلاف مبدّل المحتوى لا يلزم أن يبقى خيار مختارًا: الضغط على المضغوط يوقفه. زر واحد فقط في ترتيب Tab، وتنقل مفاتيح الأسهم بين الأزرار (وتتبادل في الاتجاه من اليمين إلى اليسار). سمِّ المجموعة بـ `aria-label`.",
  "toggle-group.ToggleGroup.attached":
    "يصل الأزرار بحواف مشتركة (الافتراضي)، أو يبقيها متباعدة 8px.",
  "toggle-group.ToggleGroup.variant": "مظهر كل الأزرار، كما في Toggle.",
  "toggle-group.ToggleGroup.size": "ارتفاع كل الأزرار: `sm` أو `md` أو `lg`.",
  "toggle-group.ToggleGroup.iconOnly": "أزرار مربعة بأيقونة فقط. تحتاج `aria-label`.",
  "toggle-group.ToggleGroup.value": "قيم الأزرار المضغوطة (متحكَّم بها).",
  "toggle-group.ToggleGroup.defaultValue": "القيم المضغوطة في البداية (غير متحكَّم بها).",
  "toggle-group.ToggleGroup.onValueChange": "يُستدعى بمصفوفة القيم المضغوطة الجديدة.",
  "toggle-group.ToggleGroup.multiple": "يسمح بضغط عدة أزرار معًا. الافتراضي `false`.",
  "toggle-group.ToggleGroup.orientation":
    "اتجاه الصف. العمودي يستخدم السهمين الأعلى والأسفل. الافتراضي أفقي.",
  "toggle-group.ToggleGroup.disabled": disabled,
  "toggle-group.ToggleGroup.loopFocus": "هل يلتف السهم من آخر زر إلى الأول. الافتراضي `true`.",
  "toggle-group.ToggleGroupItem": "خيار واحد. يأخذ مظهر مجموعته؛ و`value` يحدده ضمن قيمة المجموعة.",
  // Input Group
  "input-group.InputGroup":
    "صندوق Input يحوي أكثر من نص: إضافات قبل الحقل وبعده، مثل بادئة أو أيقونة أو وحدة أو اختصار لوحة مفاتيح أو زر (امتداد من كود المنصات؛ الصندوق هو Input من DGA بحالاته نفسها). ضع InputGroupInput واحدًا وما تشاء من InputGroupAddon. الخط السفلي للتركيز والحد وحالة الخطأ تخص المجموعة كلها. استخدم `startAdornment` و`endAdornment` في Input إن كفت أيقونة أو بادئة قصيرة. سمِّه بـ Field.",
  "input-group.InputGroup.size": "الارتفاع: `md` ‏32px أو `lg` ‏40px، مثل Input.",
  "input-group.InputGroup.appearance": "`default`، أو التعبئتان `lighter` و`darker` من Input.",
  "input-group.InputGroupInput": "حقل النص داخل InputGroup. يأخذ تسمية Field ونصه المساعد وخطأه.",
  "input-group.InputGroupAddon":
    "يحمل أيقونة أو نصًا أو اختصارًا أو زرًا في بداية المجموعة أو نهايتها.",
  "input-group.InputGroupText":
    "نص داخل إضافة، مثل `https://` أو ريال أو كيلوغرام. يحتفظ باتجاه قراءته.",
  "input-group.InputGroupKbd": "تلميح لاختصار لوحة مفاتيح داخل إضافة. من اليسار إلى اليمين دائمًا.",
  // Button Group
  "button-group.ButtonGroup":
    "يضم أزرارًا مترابطة في كتلة واحدة بحواف مشتركة (امتداد من كود المنصات). ضع داخله Button وButtonGroupText وButtonGroupSeparator. هو تخطيط فقط: يحتفظ كل زر بإجرائه. استخدم Toggle Group إن كانت الأزرار تُضغط وتُرفع، ومبدّل المحتوى إن كان خيار واحد مختارًا دائمًا. سمِّه بـ `aria-label`.",
  "button-group.ButtonGroup.orientation": "`horizontal` (الافتراضي) أو `vertical`.",
  "button-group.ButtonGroupText": "مقطع نصي غير تفاعلي، مثل عدد أو تسمية، يُرسم مثل الأزرار.",
  "button-group.ButtonGroupSeparator": "خط رفيع بين زرين لهما التعبئة نفسها لتبقى حافتهما ظاهرة.",
};
