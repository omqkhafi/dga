// Arabic API descriptions for the Phase 7 overlays work stream. Keyed `slug.Part` and
// `slug.Part.prop`. Prop names, values, token names and code stay in English.

const open = "حالة الفتح بتحكّم خارجي.";
const defaultOpen = "مفتوحة في البداية (دون تحكم).";
const onOpenChange = "تُستدعى عند فتحها أو إغلاقها.";
const align = "المحاذاة مع الزر. و`start` هي الحافة اليمنى في RTL.";
const alignOffset = "يزيحها على طول حافة الزر بالبكسل.";
const side =
  "الجهة التي تفتح عليها. `start` و`end` جهتان للنص فتتبادلان في الصفحات العربية. الافتراضي `bottom`.";

export const API_DESCRIPTIONS_AR_EXT_OVERLAYS: Record<string, string> = {
  // Popover
  "popover.Popover":
    "لوحة محتوى أو نموذج صغير تفتح من زر وتبقى حتى تُغلق (امتداد من كود المنصات وليس جزءًا من DGA). سطحها سطح Menu من DGA وسهمها الاختياري سهم Tooltip. ينتقل التركيز إلى اللوحة عند فتحها، ويغلقها Escape أو النقر خارجها، ويعود التركيز إلى الزر. للتلميح استخدم Tooltip، ولقائمة الإجراءات استخدم Menu.",
  "popover.Popover.open": open,
  "popover.Popover.defaultOpen": defaultOpen,
  "popover.Popover.onOpenChange": onOpenChange,
  "popover.PopoverTrigger": "الزر الذي يفتح اللوحة. اعرض Button الخاص بك عبر `render`.",
  "popover.PopoverContent": "اللوحة. عرضها 320px كحد أقصى وتبقى بعيدة عن حواف الشاشة.",
  "popover.PopoverContent.side": side,
  "popover.PopoverContent.align": align,
  "popover.PopoverContent.sideOffset": "الفجوة بين الزر واللوحة بالبكسل. الافتراضي 8.",
  "popover.PopoverContent.alignOffset": alignOffset,
  "popover.PopoverContent.showArrow": "يعرض السهم الذي يشير إلى الزر.",
  "popover.PopoverContent.showCloseButton": "يعرض زر إغلاق في الزاوية.",
  "popover.PopoverContent.closeLabel": "الاسم المتاح لزر الإغلاق. ترجمه في الصفحات العربية.",
  "popover.PopoverHeader": "يجمع العنوان والوصف في أعلى اللوحة.",
  "popover.PopoverTitle": "اسم اللوحة. يقرؤه قارئ الشاشة مع اللوحة.",
  "popover.PopoverDescription": "يشرح اللوحة. مرتبط بها عبر `aria-describedby`.",
  "popover.PopoverClose": "يغلق اللوحة. اعرض Button معه: `<PopoverClose render={<Button />}>`.",
  "popover.PopoverFooter": "الإجراءات أسفل اللوحة، محاذاة لجهة النهاية.",
  // Hover Card
  "hover-card.HoverCard":
    "معاينة لما يشير إليه رابط، تظهر عند تمرير المؤشر على الرابط أو تركيزه (امتداد من كود المنصات وليس جزءًا من DGA). سطحها سطح Menu وPopover من DGA. شاشات اللمس وقارئات الشاشة لا تحصل على البطاقة، لذلك يجب أن يكون الزر رابطًا حقيقيًا إلى المحتوى نفسه، ولا تحمل البطاقة النسخة الوحيدة من أي شيء. تبقى البطاقة مفتوحة ما دام المؤشر فوقها ويغلقها Escape (WCAG 1.4.13).",
  "hover-card.HoverCard.open": open,
  "hover-card.HoverCard.defaultOpen": defaultOpen,
  "hover-card.HoverCard.onOpenChange": onOpenChange,
  "hover-card.HoverCardTrigger":
    "الرابط الذي تعاينه البطاقة. يعرض وسم `a` فأعطه `href`. `delay` مدة بقاء المؤشر على الرابط قبل فتح البطاقة، و`closeDelay` مدة بقائها بعد مغادرة المؤشر، بالمللي ثانية.",
  "hover-card.HoverCardTrigger.delay":
    "المللي ثانية التي يبقاها المؤشر على الرابط قبل فتح البطاقة. الافتراضي 400.",
  "hover-card.HoverCardTrigger.closeDelay":
    "المللي ثانية التي تبقاها البطاقة بعد مغادرة المؤشر. الافتراضي 200.",
  "hover-card.HoverCardContent": "البطاقة. عرضها 320px كحد أقصى وتبقى بعيدة عن حواف الشاشة.",
  "hover-card.HoverCardContent.side": side,
  "hover-card.HoverCardContent.align": align,
  "hover-card.HoverCardContent.sideOffset": "الفجوة بين الرابط والبطاقة بالبكسل. الافتراضي 8.",
  "hover-card.HoverCardContent.alignOffset": alignOffset,
  "hover-card.HoverCardContent.showArrow": "يعرض السهم الذي يشير إلى الرابط.",
  // Alert Dialog
  "alert-dialog.AlertDialog":
    "حوار يقاطع المستخدم لتأكيد إجراء يصعب التراجع عنه (امتداد من كود المنصات وليس جزءًا من DGA). هو Dialog (النافذة المنبثقة) من DGA بسلوك حوار التنبيه: الدور `alertdialog`، ويبدأ التركيز على زر الإلغاء، ولا يغلقه النقر خارجه فيجب أن يختار الشخص. ويبقى Escape للإلغاء. وللنماذج أو المحتوى الأطول استخدم Dialog.",
  "alert-dialog.AlertDialog.open": open,
  "alert-dialog.AlertDialog.defaultOpen": defaultOpen,
  "alert-dialog.AlertDialog.onOpenChange": onOpenChange,
  "alert-dialog.AlertDialogTrigger": "الزر الذي يفتح الحوار.",
  "alert-dialog.AlertDialogContent": "النافذة: خلفية معتمة وبطاقة بعرض 400px افتراضيًا.",
  "alert-dialog.AlertDialogContent.size": "العرض: `sm` ‏400px (الافتراضي) أو `md` ‏600px.",
  "alert-dialog.AlertDialogContent.initialFocus":
    "العنصر الذي يناله التركيز أولًا. الافتراضي: زر الإلغاء.",
  "alert-dialog.AlertDialogHeader": "يجمع العنوان والوصف في أعلى النافذة.",
  "alert-dialog.AlertDialogTitle": "السؤال أو العبارة. يعلنه قارئ الشاشة عند فتح الحوار.",
  "alert-dialog.AlertDialogDescription": "يذكر ما الذي سيحدث. يقرؤه قارئ الشاشة مع العنوان.",
  "alert-dialog.AlertDialogFooter": "الإجراءات، محاذاة لجهة النهاية. ضع الإجراء الرئيسي أخيرًا.",
  "alert-dialog.AlertDialogAction": "يؤكد الإجراء ويغلق الحوار. نفّذ شيفرتك في `onClick`.",
  "alert-dialog.AlertDialogAction.destructive":
    "يستخدم زر Button المدمّر، لإجراء يحذف شيئًا أو يسحبه.",
  "alert-dialog.AlertDialogAction.onClick": "تُستدعى عند اختيار الإجراء. يُغلق الحوار بعدها.",
  "alert-dialog.AlertDialogCancel": "يلغي ويغلق الحوار. يبدأ التركيز هنا عند فتح الحوار.",
  // Context Menu
  "context-menu.ContextMenu":
    "قائمة إجراءات تفتح حيث ينقر الشخص بزر الفأرة الأيمن، أو بالضغط المطول على شاشة اللمس، أو بـ `Shift+F10` أو مفتاح القائمة على منطقة مركَّزة (امتداد من كود المنصات وليس جزءًا من DGA). قائمتها هي Menu من DGA فالعناصر وعناصر مربع الاختيار والراديو والمجموعات والقوائم الفرعية هي نفسها. قائمة السياق اختصار: يجب أن يمكن الوصول إلى كل إجراء فيها بطريقة أخرى في الصفحة لأن أغلب الناس لا يفتحونها.",
  "context-menu.ContextMenu.open": open,
  "context-menu.ContextMenu.defaultOpen": defaultOpen,
  "context-menu.ContextMenu.onOpenChange": onOpenChange,
  "context-menu.ContextMenuTrigger":
    "المنطقة التي تفتح القائمة. يمكن تركيزها بلوحة المفاتيح فيفتح `Shift+F10` أو مفتاح القائمة القائمة عندها. نسّقها أو اعرض عنصرك عبر `render`.",
  "context-menu.ContextMenuTrigger.tabIndex":
    "ترتيب المنطقة في Tab. الافتراضي 0 ليمكن فتح القائمة بلوحة المفاتيح.",
  "context-menu.ContextMenuContent":
    "القائمة المنبثقة. تفتح عند المؤشر وتبقى بعيدة عن حواف الشاشة.",
  "context-menu.ContextMenuContent.align": align,
  "context-menu.ContextMenuContent.sideOffset": "الفجوة بين المؤشر والقائمة بالبكسل. الافتراضي 2.",
  "context-menu.ContextMenuContent.alignOffset": alignOffset,
  "context-menu.ContextMenuItem":
    "إجراء واحد. ضع أيقونة أولًا ثم التسمية ثم ContextMenuShortcut اختياريًا.",
  "context-menu.ContextMenuCheckboxItem": "عنصر يمكن تشغيله وإيقافه. يعرض علامة صح وهو مشغّل.",
  "context-menu.ContextMenuRadioGroup": "يجمع خيارات ContextMenuRadioItem ليُختار واحد فقط.",
  "context-menu.ContextMenuRadioItem": "خيار واحد من ContextMenuRadioGroup. المختار يعرض نقطة.",
  "context-menu.ContextMenuGroup": "يجمع عناصر متصلة تحت ContextMenuLabel.",
  "context-menu.ContextMenuLabel": "عنوان ContextMenuGroup.",
  "context-menu.ContextMenuSeparator": "خط بين مجموعات العناصر.",
  "context-menu.ContextMenuShortcut":
    "نص في نهاية العنصر مثل اختصار. تبقى الأرقام والرموز من اليسار إلى اليمين.",
  "context-menu.ContextMenuSub": "يجمع ContextMenuSubTrigger وContextMenuSubContent.",
  "context-menu.ContextMenuSubTrigger":
    "عنصر يفتح قائمة فرعية. يشير سهمه إلى جهة النهاية ويُعكس في RTL.",
  "context-menu.ContextMenuSubContent": "القائمة الفرعية. تفتح بجانب عنصرها في جهة النهاية.",
};
