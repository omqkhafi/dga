// Arabic API descriptions for the Phase 7 Combobox, Command and Digital Stamp.
// Keyed `slug.Part` and `slug.Part.prop`. Prop names, values and code stay in English.

const commandShared = {
  onSelect: "يُستدعى بعد اختيار إجراء، ومعه ذلك الإجراء.",
  items: "الإجراءات، في مجموعات. لكل مجموعة `label` و`items`.",
  filter: "مطابقة مخصصة. الافتراضية تتجاهل حالة الأحرف وتشكيل العربية. مرّر `null` لإيقاف التصفية.",
  placeholder: "النص التلميحي في المربع الفارغ. ترجمه في الصفحات العربية.",
  inputLabel: "اسم مربع البحث لقارئ الشاشة. ترجمه في الصفحات العربية.",
  emptyText: "يظهر حين لا يطابق أي إجراء. ترجمه في الصفحات العربية.",
  countLabel: "دالة تعيد النص الذي يقرؤه قارئ الشاشة عند تغيّر عدد النتائج.",
  query: "نص البحث. استخدمه للتحكم في البحث.",
  onQueryChange: "يُستدعى عند تغيّر نص البحث.",
};

export const API_DESCRIPTIONS_AR_EXT_MISC: Record<string, string> = {
  // Combobox
  "combobox.Combobox":
    "حقل نصي مع قائمة خيارات تضيق أثناء الكتابة (امتداد من كود المنصات، شكله شكل قائمة الإدخال المنسدلة في DGA). اختيار واحد أو متعدد `multiple`، بخيارات مسطحة أو في مجموعات، وقابل للإنشاء `creatable`. تنقل مفاتيح الأسهم بين الخيارات، ويختار Enter، ويغلق Esc، ويقرأ قارئ الشاشة عدد النتائج.",
  "combobox.Combobox.items":
    "الخيارات، أو مجموعات الخيارات. الخيار `{ value, label }` والمجموعة `{ label, items }`.",
  "combobox.Combobox.filter":
    "مطابقة مخصصة. الافتراضية تتجاهل حالة الأحرف، وفي العربية تتجاهل التشكيل وفروق الألف والياء والتاء المربوطة. مرّر `null` حين يكون الخادم قد صفّى القائمة.",
  "combobox.Combobox.creatable":
    "يعرض سطر إنشاء حين لا يطابق النص المكتوب أي خيار (إضافة منا، لا يوفرها shadcn).",
  "combobox.Combobox.createLabel":
    "دالة تعيد نص سطر الإنشاء من النص المكتوب. ترجمه في الصفحات العربية.",
  "combobox.Combobox.onCreate":
    "يُستدعى عند اختيار سطر الإنشاء، ومعه النص. أعد الخيار الجديد (وأضفه إلى `items`) فيُختار، أو لا تعد شيئًا لتجاهله.",
  "combobox.ComboboxControl":
    "الحقل: خانة كتابة داخل إطار Input مع زر المسح والسهم. في الصندوق المتعدد تظهر الخيارات المختارة رقائق قابلة للحذف قبل الخانة ويحذف Backspace آخرها.",
  "combobox.ComboboxControl.size":
    "الارتفاع: `md` ‏32px و`lg` ‏40px. ويزداد ارتفاع الصندوق المتعدد كلما التفّت الرقائق.",
  "combobox.ComboboxControl.appearance": "نمط التعبئة. `lighter` و`darker` يُبقيان الحد.",
  "combobox.ComboboxControl.clearable": "يعرض زر المسح حين يوجد اختيار أو نص. الافتراضي `true`.",
  "combobox.ComboboxControl.clearLabel": "اسم زر المسح لقارئ الشاشة. ترجمه في الصفحات العربية.",
  "combobox.ComboboxControl.triggerLabel":
    "اسم زر السهم الذي يفتح القائمة. ترجمه في الصفحات العربية.",
  "combobox.ComboboxControl.removeLabel": "دالة تعيد اسم زر حذف كل رقاقة، وتستقبل تسمية الخيار.",
  "combobox.ComboboxControl.removeHint": "تلميح حذف الرقاقة بلوحة المفاتيح، يُقرأ مع الرقاقة.",
  "combobox.ComboboxControl.chipsLabel": "اسم مجموعة الرقائق لقارئ الشاشة.",
  "combobox.ComboboxControl.boxClassName": "أصناف الإطار حول الخانة.",
  "combobox.ComboboxContent":
    "القائمة المنبثقة: بعرض الحقل، على سطح البطاقة، وفيها حالتا الفراغ والتحميل وإعلان عدد النتائج.",
  "combobox.ComboboxContent.children":
    "أسطر مخصصة. الافتراضي: كل خيار ComboboxItem، وكل مجموعة بعنوانها.",
  "combobox.ComboboxContent.emptyText": "يظهر حين لا يطابق شيء. ترجمه في الصفحات العربية.",
  "combobox.ComboboxContent.loadingText": "يظهر بدل القائمة أثناء `loading`.",
  "combobox.ComboboxContent.loading":
    "يعرض `loadingText` مع مؤشر تحميل. استخدمه أثناء جلب الخيارات من خادم.",
  "combobox.ComboboxContent.statusLabel":
    "دالة تعيد النص الذي يقرؤه قارئ الشاشة عند تغيّر عدد النتائج.",
  "combobox.ComboboxContent.itemClassName": "أصناف كل خيار.",
  "combobox.ComboboxItem": "خيار واحد. تظهر علامة صح في جهة النهاية عند اختياره.",
  "combobox.ComboboxGroup": "يجمع الخيارات المتقاربة تحت ComboboxLabel.",
  "combobox.ComboboxLabel": "عنوان ComboboxGroup.",
  "combobox.ComboboxSeparator": "خط بين المجموعات.",
  // Command
  "command.Command":
    "مربع بحث فوق قائمة إجراءات (امتداد من كود المنصات، شكله شكل Search Box وMenu). ينفّذ إجراءات ولا يحفظ قيمة: وللحقل الذي يحفظ اختيارًا استخدم Combobox. اكتب للتصفية، وتنقل مفاتيح الأسهم، وينفّذ Enter الإجراء المظلَّل، ويُظلَّل أول مطابق أثناء الكتابة. مبني على Base UI Autocomplete بلا cmdk.",
  "command.Command.onSelect": commandShared.onSelect,
  "command.Command.items": commandShared.items,
  "command.Command.filter": commandShared.filter,
  "command.Command.placeholder": commandShared.placeholder,
  "command.Command.inputLabel": commandShared.inputLabel,
  "command.Command.emptyText": commandShared.emptyText,
  "command.Command.countLabel": commandShared.countLabel,
  "command.Command.query": commandShared.query,
  "command.Command.onQueryChange": commandShared.onQueryChange,
  "command.Command.className": "أصناف الصندوق الخارجي.",
  "command.CommandDialog":
    "Command داخل Dialog في وسط الصفحة. افتحه بزر `trigger` أو تحكّم في `open`. لا يربط المكوّن مفاتيح الاختصار، فيقرر تطبيقك ذلك. ينتقل التركيز إلى مربع البحث، ويغلقه Esc ويعود التركيز إلى ما كان عليه.",
  "command.CommandDialog.onSelect": commandShared.onSelect,
  "command.CommandDialog.items": commandShared.items,
  "command.CommandDialog.filter": commandShared.filter,
  "command.CommandDialog.placeholder": commandShared.placeholder,
  "command.CommandDialog.inputLabel": commandShared.inputLabel,
  "command.CommandDialog.emptyText": commandShared.emptyText,
  "command.CommandDialog.countLabel": commandShared.countLabel,
  "command.CommandDialog.query": commandShared.query,
  "command.CommandDialog.onQueryChange": commandShared.onQueryChange,
  "command.CommandDialog.title": "اسم الحوار الذي يُقرأ عند فتحه. ترجمه في الصفحات العربية.",
  "command.CommandDialog.description": "يشرح الحوار لقارئ الشاشة. ترجمه في الصفحات العربية.",
  "command.CommandDialog.closeOnSelect": "يغلق الحوار بعد تنفيذ إجراء. الافتراضي `true`.",
  "command.CommandDialog.trigger": "الزر الذي يفتح الحوار.",
  "command.CommandShortcut": "مفاتيح في نهاية الإجراء. تبقى من اليسار إلى اليمين في العربية.",
  // Digital Stamp
  "digital-stamp.DigitalStamp":
    "شريط الموقع الرسمي (DGA: Digital Stamp): شريط بارتفاع 32px في أعلى موقع حكومي يعلن أن الموقع رسمي، وزر يفتح لوحة تشرح كيف يُتحقق منه: العنوان ينتهي بنطاق سعودي، والاتصال https، والموقع مسجّل لدى هيئة الحكومة الرقمية. ضعه في خانة `stamp` من Header. الزر مبدّل حقيقي بـ `aria-expanded`، ويغلق Esc اللوحة ويعيد التركيز إليه.",
  "digital-stamp.DigitalStamp.domain":
    "لاحقة عنوان الموقع، وتظهر في اللوحة. تُقرأ من اليسار إلى اليمين.",
  "digital-stamp.DigitalStamp.label": "السطر في الشريط. ترجمه في الصفحات العربية.",
  "digital-stamp.DigitalStamp.toggleLabel": "نص الزر الذي يفتح اللوحة. ترجمه في الصفحات العربية.",
  "digital-stamp.DigitalStamp.domainTitle": "عنوان بند النطاق في اللوحة.",
  "digital-stamp.DigitalStamp.domainText":
    "يشرح النطاق. الافتراضي: عنوان الموقع ينتهي باللاحقة `domain`.",
  "digital-stamp.DigitalStamp.httpsTitle": "عنوان بند الاتصال الآمن.",
  "digital-stamp.DigitalStamp.httpsText": "يشرح القفل وhttps.",
  "digital-stamp.DigitalStamp.registrationTitle": "عنوان بند التسجيل. مرّر `null` لحذف البند.",
  "digital-stamp.DigitalStamp.registrationText": "يشرح التسجيل لدى هيئة الحكومة الرقمية.",
  "digital-stamp.DigitalStamp.open": "يفتح اللوحة أو يغلقها. استخدمه للتحكم في الختم.",
  "digital-stamp.DigitalStamp.defaultOpen": "هل تبدأ اللوحة مفتوحة.",
  "digital-stamp.DigitalStamp.hideIcon": "يخفي أيقونة العلم في بداية الشريط.",
  // Header
  "header.Header.stamp": "شريط الموقع الرسمي فوق كل شيء: ضع هنا Digital Stamp. يقع فوق `top`.",
};
