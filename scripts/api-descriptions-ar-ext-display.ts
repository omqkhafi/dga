// Arabic API descriptions for the Phase 7 part 2 display work stream (Kbd, Empty, Item and Chart).
// Keyed `slug.Part` and `slug.Part.prop`. Prop names, values and code stay in English.

const render =
  "يتيح لك استبدال عنصر HTML الخاص بالمكوّن بوسم آخر، مثل `ul` أو `li` أو `<a>`. يقبل `ReactElement` أو دالة تعيد العنصر المراد عرضه.";

export const API_DESCRIPTIONS_AR_EXT_DISPLAY: Record<string, string> = {
  // Kbd
  "kbd.Kbd":
    "مفتاح لوحة مفاتيح أو تلميح اختصار، مثل Ctrl أو ⌘K (امتداد من كود المنصات وليس جزءًا من DGA). عنصر `kbd` حقيقي يُرسم قبعةً صغيرة بتعبئة DGA المحايدة. تُقرأ أسماء المفاتيح من اليسار إلى اليمين حتى في الصفحات العربية. هو تلميح ولا يأخذ التركيز.",
  "kbd.KbdGroup": "مفاتيح تُضغط معًا، بترتيبها: Ctrl ثم K.",

  // Empty
  "empty.Empty":
    "حالة قائمة أو جدول أو صفحة لا شيء فيها للعرض (امتداد من كود المنصات وليس جزءًا من DGA). تتبع الحالة الفارغة في Data Table: أيقونة موسّطة وعنوان وشرح قصير والخطوة التالية. اكتب النصوص بنفسك وترجمها في الصفحات العربية.",
  "empty.Empty.bordered": "يرسم حدًّا متقطعًا، لمنطقة فارغة داخل صفحة.",
  "empty.EmptyHeader": "يجمع الأيقونة والعنوان والوصف.",
  "empty.EmptyMedia": "الأيقونة أو الصورة.",
  "empty.EmptyMedia.variant":
    "`default` يعرض الأيقونة أو الصورة كما هي؛ و`icon` يضع أيقونة على تعبئة دائرية.",
  "empty.EmptyTitle": "العنوان. فقرة لا عنوان، فيناسب أي مستوى عناوين في الصفحة.",
  "empty.EmptyDescription": "جملة أو جملتان تذكران سبب الفراغ وما يُفعل.",
  "empty.EmptyContent": "الخطوة التالية: أزرار أو روابط.",

  // Item
  "item.Item":
    'صف واحد بصورة أو أيقونة وعنوان ووصف وإجراءات (امتداد من كود المنصات وليس جزءًا من DGA). مظهره من List وCard في DGA. مرّر `render={<a href="…" />}` ليصير الصف كله رابطًا فيأخذ لون التمرير وإطار التركيز.',
  "item.Item.variant": "`default` بلا تعبئة، و`outline` بحد 1px، و`muted` بتعبئة رمادية.",
  "item.Item.size": "`default` بحشوة 16px، و`sm` أكثر إحكامًا.",
  "item.Item.render": render,
  "item.ItemGroup":
    "يرصّ عدة صفوف في عمود. لا يضيف دورًا: لقائمة حقيقية اعرضه بوسم `ul` وكل صف بوسم `li`.",
  "item.ItemGroup.render": render,
  "item.ItemSeparator": "خط بين صفين. هو Divider من DGA.",
  "item.ItemMedia": "الأيقونة أو الصورة في جهة البداية.",
  "item.ItemMedia.variant":
    "`default` لأي محتوى، و`icon` لأيقونة داخل إطار بقياس 40px، و`image` لصورة مقصوصة بقياس 40px.",
  "item.ItemContent": "يحمل العنوان والوصف، ويأخذ المساحة الفارغة.",
  "item.ItemTitle": "عنوان الصف.",
  "item.ItemDescription": "وصف الصف. سطران على الأكثر ثم تُقطع بنقاط.",
  "item.ItemActions": "أزرار أو شارة في جهة النهاية.",
  "item.ItemHeader": "سطر بعرض كامل فوق محتوى الصف.",
  "item.ItemFooter": "سطر بعرض كامل تحت محتوى الصف.",

  // Chart
  "chart.ChartContainer":
    'يغلّف مخططًا واحدًا من Recharts (امتداد من كود المنصات وليس جزءًا من DGA) بألوان DGA. افتراضيًا هو صورة للتقنيات المساعدة (`role="img"`) يسمّيها `title` ويصفها `description`، وبياناتها في `table`. لا يتحرك المخطط إن فضّل الشخص تقليل الحركة عند استخدام `useChartAnimation`.',
  "chart.ChartContainer.config":
    "السلاسل: تسميتها ولونها وشكل علامتها. يصير اللون متغيرًا باسم `--color-<key>`. استخدم `CHART_SERIES` للألوان الأربعة في DGA.",
  "chart.ChartContainer.title": "الاسم المتاح للمخطط، وعنوان جدوله. ترجمه في الصفحات العربية.",
  "chart.ChartContainer.description":
    "ما يعرضه المخطط في جملة: الاتجاه أو أكبر قيمة. تُقرأ بعد الاسم.",
  "chart.ChartContainer.table": "البيانات نفسها جدولًا: البديل المتاح للصورة.",
  "chart.ChartContainer.tableMode":
    "`toggle` يضيف زرًّا يُظهر الجدول تحت المخطط، و`hidden` يُبقيه لقارئات الشاشة فقط، و`none` يحذفه.",
  "chart.ChartContainer.tableLabels": "نصا زر الجدول: `show` و`hide`. ترجمهما في الصفحات العربية.",
  "chart.ChartContainer.interactive":
    "يتيح للوحة المفاتيح التنقل بين النقاط بالأسهم وإظهار التلميح. فيصير المخطط مجموعة تقبل التركيز بدل صورة.",
  "chart.ChartDataTable": "بيانات المخطط جدولًا. يعرضه `ChartContainer` من خاصية `table`.",
  "chart.ChartTooltipContent.indicator":
    "كيف تُعلَّم السلسلة في التلميح: بنقطة `dot` أو بخط `line` أو بخط متقطع `dashed`.",
  "chart.ChartDot":
    "نقطة لخط بشكل السلسلة، فتُميَّز الخطوط المتقاطعة دون لون: دائرة أو مربع أو مثلث أو معيّن.",
  "chart.ChartSwatch": "شكل صغير يعلّم السلسلة في وسيلة الإيضاح والتلميح.",
};
