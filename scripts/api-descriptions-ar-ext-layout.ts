// Arabic API descriptions for the Phase 7 part 2 layout work stream (Collapsible, Scroll Area,
// Resizable and Aspect Ratio). Keyed `slug.Part` and `slug.Part.prop`. Prop names, values and code
// stay in English.

const render =
  "يتيح لك استبدال عنصر HTML الخاص بالمكوّن بوسم آخر، أو تركيبه مع مكوّن آخر. يقبل `ReactElement` أو دالة تعيد العنصر المراد عرضه.";

export const API_DESCRIPTIONS_AR_EXT_LAYOUT: Record<string, string> = {
  // Collapsible
  "collapsible.Collapsible":
    "لوحة واحدة تُفتح وتُغلق من زر (امتداد من كود المنصات وليس جزءًا من DGA). مبنية على Base UI Collapsible، وهي أساس القسم القابل للتوسيع في البطاقة Card.",
  "collapsible.Collapsible.open": "حالة الفتح عند التحكم بها من الخارج.",
  "collapsible.Collapsible.defaultOpen": "مفتوحة في البداية (غير متحكَّم بها).",
  "collapsible.Collapsible.onOpenChange": "تُستدعى عند فتحها أو إغلاقها.",
  "collapsible.Collapsible.disabled": "لا يستطيع الزر فتحها أو إغلاقها.",
  "collapsible.CollapsibleTrigger":
    "الزر الذي يفتح اللوحة ويغلقها. له `aria-expanded` و`aria-controls`.",
  "collapsible.CollapsibleTrigger.showChevron":
    "يضيف السهم الذي يدور عند فتح اللوحة. مغلق افتراضيًا.",
  "collapsible.CollapsibleTrigger.render": render,
  "collapsible.CollapsibleContent":
    "اللوحة نفسها. يتحرك ارتفاعها عند الفتح والإغلاق إلا إن فضّل المستخدم تقليل الحركة، وتُخفى عن لوحة المفاتيح وقارئ الشاشة وهي مغلقة.",
  // Scroll Area
  "scroll-area.ScrollArea":
    "منطقة بأشرطة تمرير مخصصة (امتداد من كود المنصات وليس جزءًا من DGA). مبنية على Base UI Scroll Area. يمكن أن تأخذ منطقة العرض التركيز فيمرّر بها مستخدم لوحة المفاتيح بالأسهم.",
  "scroll-area.ScrollArea.orientation":
    "أشرطة التمرير التي تظهر: `vertical` (الافتراضي) أو `horizontal` أو `both`.",
  "scroll-area.ScrollArea.visibility":
    "متى يظهر الشريط. `hover` يظهره عند مرور المؤشر وأثناء التمرير ووجود التركيز، و`always` يبقيه ظاهرًا.",
  "scroll-area.ScrollArea.label":
    "الاسم الذي يقرؤه قارئ الشاشة للمنطقة القابلة للتمرير. مرّره دائمًا وترجمه في الصفحات العربية.",
  "scroll-area.ScrollArea.viewportClassName": "أصناف CSS لعنصر التمرير نفسه (منطقة العرض).",
  "scroll-area.ScrollBar":
    "شريط تمرير واحد. يضيف `ScrollArea` الأشرطة التي يحتاجها بحسب `orientation`.",
  "scroll-area.ScrollBar.orientation": "المحور الذي يمرّره الشريط: `vertical` أو `horizontal`.",
  // Resizable
  "resizable.ResizablePanelGroup":
    "لوحات يغيّر المستخدم حجمها بسحب مقبض أو بمفاتيح الأسهم (امتداد من كود المنصات وليس جزءًا من DGA). مبنية على react-resizable-panels. اللوحة الأولى هي لوحة البداية: على اليسار في الإنجليزية وعلى اليمين في العربية.",
  "resizable.ResizablePanelGroup.dir": "اتجاه القراءة للوحات. الافتراضي اتجاه الصفحة.",
  "resizable.ResizablePanelGroup.autoSaveId":
    "يحفظ الأحجام في `localStorage` بهذا المفتاح فيبقى التخطيط بعد إعادة التحميل. لكل مجموعة في الصفحة مفتاحها، ولكل لوحة `id`.",
  "resizable.ResizablePanelGroup.orientation":
    "هل تقع اللوحات جنبًا إلى جنب (`horizontal` وهو الافتراضي) أم فوق بعضها.",
  "resizable.ResizablePanelGroup.onLayoutChanged":
    "تُستدعى بعد انتهاء تغيير الحجم، ومعها حجم كل لوحة بالنسبة المئوية بحسب `id`.",
  "resizable.ResizablePanelGroup.defaultLayout":
    "الأحجام بالنسبة المئوية بحسب `id` اللوحة، لتبدأ منها.",
  "resizable.ResizablePanel":
    'لوحة واحدة. حدّد `defaultSize` و`minSize` و`maxSize` بأرقام (بكسل) أو نصوص مثل `"30%"`.',
  "resizable.ResizablePanel.id": "اسم اللوحة. يلزم لحفظ التخطيط واستعادته.",
  "resizable.ResizablePanel.defaultSize":
    'الحجم في البداية. الرقم بكسل والنص مثل `"30%"` نسبة مئوية.',
  "resizable.ResizablePanel.minSize": "أصغر حجم يمكن سحبها إليه.",
  "resizable.ResizablePanel.maxSize": "أكبر حجم يمكن سحبها إليه.",
  "resizable.ResizablePanel.collapsible":
    "السحب إلى ما دون `minSize` يطويها إلى `collapsedSize`. وزر Enter على المقبض يطويها ويفتحها.",
  "resizable.ResizablePanel.collapsedSize": "الحجم عند الطي. الافتراضي `0%`.",
  "resizable.ResizableHandle":
    "المقبض بين لوحتين: فاصل يأخذ التركيز وله `aria-valuenow` وهو حجم اللوحة التي قبله. الأسهم تحركه 5%، وHome وEnd يرسلانه إلى أحد الطرفين، وEnter يطوي اللوحة القابلة للطي.",
  "resizable.ResizableHandle.withHandle": "يعرض مقبضًا للإمساك على المقبض.",
  "resizable.ResizableHandle.disabled": "لا يمكن سحب المقبض ولا تحريكه بلوحة المفاتيح.",
  "resizable.ResizableHandle.aria-label":
    "الاسم الذي يقرؤه قارئ الشاشة للمقبض. ترجمه في الصفحات العربية.",
  // Aspect Ratio
  "aspect-ratio.AspectRatio":
    "صندوق بنسبة ثابتة بين العرض والارتفاع (امتداد من كود المنصات وليس جزءًا من DGA). يضبط خاصية CSS `aspect-ratio` فلا يحتاج إلى سكربت ولا يسبب قفزة في التخطيط.",
  "aspect-ratio.AspectRatio.ratio": "العرض مقسومًا على الارتفاع: `16 / 9` أو `4 / 3` أو `1`.",
  "aspect-ratio.AspectRatio.fit":
    "كيف تملأ الصورة أو الفيديو الصندوق: `cover` يقصّ ما زاد، و`contain` يعرضها كاملة.",
};
