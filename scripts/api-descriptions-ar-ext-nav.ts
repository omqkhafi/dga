// Arabic API descriptions for the Phase 7 part 2 nav work stream (Menubar, Navigation Menu and
// Sidebar). Keyed `slug.Part` and `slug.Part.prop`. Prop names, values and code stay in English.

const render = "يتيح لك استبدال العنصر بمكوّن رابط خاص بك، مثل `<a href>` أو `Link` في Next.js.";

export const API_DESCRIPTIONS_AR_EXT_NAV: Record<string, string> = {
  // Menubar
  "menubar.Menubar":
    "شريط أفقي من القوائم، مثل شريط ملف وتحرير وعرض في التطبيقات (امتداد من كود المنصات وليس جزءًا من DGA). يفتح كل زر قائمة Menu من DGA. ينقل السهمان الأيمن والأيسر (يتبادلان في الصفحات العربية) بين الأزرار، ويفتح السهم لأسفل القائمة، وعند فتح قائمة يفتح الانتقال إلى الزر التالي قائمته. لقائمة واحدة خلف زر واحد استخدم Menu، ولروابط الصفحات استخدم Navigation Menu.",
  "menubar.Menubar.modal":
    "يقفل تمرير الصفحة ويجعل بقية الصفحة غير تفاعلية أثناء فتح قائمة. الافتراضي `true`.",
  "menubar.Menubar.loopFocus": "ينقل السهمان التركيز من الزر الأخير إلى الأول. الافتراضي `true`.",
  "menubar.Menubar.disabled": "يعطّل كل قوائم الشريط.",
  "menubar.MenubarMenu": "قائمة واحدة من الشريط. ضع بداخلها MenubarTrigger وMenubarContent.",
  "menubar.MenubarTrigger": "الزر في الشريط الذي يفتح قائمة.",
  "menubar.MenubarContent": "قائمة العناصر. تفتح أسفل زرها وتحاذي جهة البداية.",
  "menubar.MenubarItem": "إجراء واحد. ضع أيقونة أولًا ثم التسمية ثم MenubarShortcut اختياريًا.",
  "menubar.MenubarCheckboxItem": "عنصر يمكن تشغيله وإيقافه. يعرض علامة صح وهو مشغّل.",
  "menubar.MenubarRadioGroup": "يجمع خيارات MenubarRadioItem ليُختار واحد منها فقط.",
  "menubar.MenubarRadioItem": "خيار واحد من MenubarRadioGroup. يعرض الخيار المختار نقطة.",
  "menubar.MenubarGroup": "يجمع عناصر متصلة تحت MenubarLabel.",
  "menubar.MenubarLabel": "عنوان MenubarGroup.",
  "menubar.MenubarSeparator": "خط بين مجموعات العناصر.",
  "menubar.MenubarShortcut":
    "نص في نهاية العنصر مثل الاختصار. تبقى الأرقام والرموز من اليسار إلى اليمين.",
  "menubar.MenubarSub": "يجمع MenubarSubTrigger وMenubarSubContent.",
  "menubar.MenubarSubTrigger": "عنصر يفتح قائمة فرعية في جهة النهاية. ينعكس سهمه في RTL.",
  "menubar.MenubarSubContent": "القائمة الفرعية. تفتح بجوار عنصرها في جهة النهاية.",

  // Navigation Menu
  "navigation-menu.NavigationMenu":
    "روابط موقع أو تطبيق مع لوحات تضم مجموعات من الروابط (امتداد من كود المنصات وليس جزءًا من DGA). تفتح العناصر بالتمرير وبتركيز لوحة المفاتيح، وينقل السهمان الأيمن والأيسر (يتبادلان في الصفحات العربية) بين العناصر، ويفتح السهم لأسفل اللوحة، ويغلقها Escape. هي معلم `nav` فأعطها `aria-label`. لرأس الموقع بشعاره وبحثه وقائمته الجانبية على الهاتف استخدم Header.",
  "navigation-menu.NavigationMenu.viewport":
    "يعرض اللوحة المشتركة أسفل الشريط حيث يظهر محتوى العنصر المفتوح. أوقفه فقط إن عرضت اللوحة بنفسك.",
  "navigation-menu.NavigationMenu.sideOffset": "الفجوة بين الشريط واللوحة بالبكسل. الافتراضي 8.",
  "navigation-menu.NavigationMenu.value":
    "قيمة `value` للعنصر المفتوح (بتحكّم خارجي). و`null` تعني مغلقًا.",
  "navigation-menu.NavigationMenu.defaultValue":
    "قيمة `value` للعنصر المفتوح في البداية (دون تحكم).",
  "navigation-menu.NavigationMenu.onValueChange": "تُستدعى عند فتح عنصر أو إغلاقه.",
  "navigation-menu.NavigationMenu.delay":
    "المللي ثانية التي يستقر فيها المؤشر على الزر قبل فتح لوحته. الافتراضي 50.",
  "navigation-menu.NavigationMenu.closeDelay":
    "المللي ثانية التي تبقى فيها اللوحة بعد مغادرة المؤشر. الافتراضي 50.",
  "navigation-menu.NavigationMenu.orientation":
    "اتجاه القائمة. يستخدم العمودي السهمين لأعلى ولأسفل بدل الأيمن والأيسر.",
  "navigation-menu.NavigationMenuList": "صف العناصر.",
  "navigation-menu.NavigationMenuItem":
    "مدخل واحد في القائمة: رابط NavigationMenuLink أو زر NavigationMenuTrigger مع محتواه.",
  "navigation-menu.NavigationMenuItem.value":
    "يسمّي العنصر ليفتحه `value` و`defaultValue` في الجذر.",
  "navigation-menu.NavigationMenuTrigger":
    "الزر الذي يفتح لوحة عنصره. يدور سهم صغير أثناء فتح اللوحة.",
  "navigation-menu.NavigationMenuContent": "لوحة العنصر. تظهر في اللوحة المشتركة أسفل الشريط.",
  "navigation-menu.NavigationMenuLink":
    'رابط. مرّر `active` للصفحة الحالية فيضبط `aria-current="page"`. استخدم `variant="bar"` للرابط في الشريط مباشرة. اعرض مكوّن الرابط الخاص بك عبر `render`.',
  "navigation-menu.NavigationMenuLink.active":
    'هذه هي الصفحة الحالية: يضبط `aria-current="page"` والمظهر الحالي.',
  "navigation-menu.NavigationMenuLink.variant":
    "`item` رابط داخل لوحة (الافتراضي). و`bar` رابط في الشريط مباشرة.",
  "navigation-menu.NavigationMenuLinkTitle": "اسم الرابط في اللوحة.",
  "navigation-menu.NavigationMenuLinkDescription": "سطر مساعدة تحت عنوان الرابط في اللوحة.",

  // Sidebar
  "sidebar.SidebarProvider":
    "يحمل حالة الشريط الجانبي ويرتّبه والصفحة بجواره (امتداد من كود المنصات وليس جزءًا من DGA). يمكن أن يصير الشريط عمود أيقونات أو يختفي كليًا أو يصير Drawer على الهاتف. تُحفظ حالة الفتح في ملف تعريف ارتباط، ويبدّل Ctrl أو Command مع B حالته.",
  "sidebar.SidebarProvider.defaultOpen": "هل الشريط مفتوح في البداية (دون تحكم).",
  "sidebar.SidebarProvider.open": "هل الشريط مفتوح (بتحكّم خارجي).",
  "sidebar.SidebarProvider.onOpenChange": "تُستدعى بالحالة الجديدة.",
  "sidebar.SidebarProvider.persist":
    "يحفظ حالة الفتح في ملف تعريف ارتباط ويستعيدها في الزيارة التالية. أوقفه لشريط يبدأ دائمًا بالحالة نفسها.",
  "sidebar.SidebarProvider.cookieName": "اسم ملف تعريف الارتباط. أعطِ كل شريط في تطبيقك اسمه.",
  "sidebar.SidebarProvider.shortcut":
    "المفتاح الذي يفتح الشريط ويغلقه مع Ctrl أو Command. مرّر `false` لإيقاف الاختصار.",
  "sidebar.SidebarProvider.mobileBreakpoint": "دون هذا العرض بالبكسل يصير الشريط Drawer.",
  "sidebar.Sidebar":
    "لوحة التنقل. على سطح المكتب تقع بجوار الصفحة ويتحرك عرضها، ودون نقطة الهاتف تصير Drawer ينزلق من جهتها. أعطها `aria-label`.",
  "sidebar.Sidebar.side":
    "الحافة التي يقع عليها. و`start` و`end` جهتان للنص، فتكون `start` على اليمين في الصفحات العربية.",
  "sidebar.Sidebar.collapsible":
    "ما يحدث عند إغلاقه. `offcanvas` يخفيه، و`icon` يترك عمودًا بالأيقونات فقط، و`none` يجعله مفتوحًا دائمًا.",
  "sidebar.Sidebar.mobileTitle": "اسم الـ Drawer على الهاتف، يقرؤه قارئ الشاشة.",
  "sidebar.Sidebar.mobileDescription": "وصف قصير للـ Drawer على الهاتف.",
  "sidebar.Sidebar.closeLabel": "الاسم المتاح لزر إغلاق الـ Drawer. ترجمه في الصفحات العربية.",
  "sidebar.SidebarTrigger": "الزر الذي يفتح الشريط ويغلقه. يتبع `aria-expanded` فيه الحالة.",
  "sidebar.SidebarTrigger.label": "الاسم المتاح للزر. ترجمه في الصفحات العربية.",
  "sidebar.SidebarInset": "الصفحة بجوار الشريط. ضع `<main>` بداخلها.",
  "sidebar.SidebarHeader": "أعلى الشريط، للشعار أو للمبدّل.",
  "sidebar.SidebarFooter": "أسفل الشريط، للمستخدم الحالي أو لروابط المساعدة.",
  "sidebar.SidebarContent": "وسط الشريط القابل للتمرير. ضع المجموعات بداخله.",
  "sidebar.SidebarSeparator": "خط بين أجزاء الشريط.",
  "sidebar.SidebarGroup": "مجموعة عناصر متصلة مع SidebarGroupLabel اختياري يسمّيها.",
  "sidebar.SidebarGroupLabel": "عنوان المجموعة. يختفي في عمود الأيقونات لكنه يبقى اسمًا للمجموعة.",
  "sidebar.SidebarGroupContent": "يحمل قائمة المجموعة.",
  "sidebar.SidebarMenu": "قائمة عناصر.",
  "sidebar.SidebarMenuItem": "مدخل واحد في القائمة.",
  "sidebar.SidebarMenuButton":
    "رابط أو زر واحد في القائمة: أيقونة وتسمية. في عمود الأيقونات تختفي التسمية لكن قارئ الشاشة يقرؤها، ويعرضها `tooltip` عند التمرير والتركيز.",
  "sidebar.SidebarMenuButton.isActive":
    'هذه هي الصفحة الحالية: يضبط `aria-current="page"` والمظهر المحدد.',
  "sidebar.SidebarMenuButton.tooltip":
    "التسمية التي تظهر بجوار الأيقونة في عمود الأيقونات. دونه لا يظهر تلميح.",
  "sidebar.SidebarMenuButton.render": render,
  "sidebar.SidebarMenuBadge": "عدّاد أو وسم في نهاية العنصر. ضعه داخل SidebarMenuButton.",
  "sidebar.SidebarMenuCollapsible": "عنصر يفتح مجموعة متداخلة. ضع بداخله زرًا ومحتوى.",
  "sidebar.SidebarMenuCollapsibleTrigger":
    "الزر الذي يفتح مجموعة متداخلة، مع سهم. في عمود الأيقونات يفتح الضغط عليه الشريط ليظهر المحتوى.",
  "sidebar.SidebarMenuCollapsibleContent": "المجموعة المتداخلة. ضع بداخلها SidebarMenuSub.",
  "sidebar.SidebarMenuSub": "قائمة المجموعة المتداخلة.",
  "sidebar.SidebarMenuSubItem": "مدخل واحد في المجموعة المتداخلة.",
  "sidebar.SidebarMenuSubButton": "رابط أو زر في المجموعة المتداخلة.",
  "sidebar.SidebarMenuSubButton.isActive":
    'هذه هي الصفحة الحالية: يضبط `aria-current="page"` والمظهر المحدد.',
  "sidebar.SidebarMenuSubButton.render": render,
};
