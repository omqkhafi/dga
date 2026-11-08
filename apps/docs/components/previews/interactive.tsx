"use client";

import {
  Calendar03Icon,
  Copy01Icon,
  Delete02Icon,
  Edit02Icon,
  File01Icon,
  FolderOpenIcon,
  Home01Icon,
  Settings02Icon,
  Share08Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/bases/base/ui/accordion";
import { Button } from "@/registry/bases/base/ui/button";
import { ContentSwitcher, ContentSwitcherItem } from "@/registry/bases/base/ui/content-switcher";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/base/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/bases/base/ui/drawer";
import { Field, FieldLabel } from "@/registry/bases/base/ui/field";
import { InlineAlert } from "@/registry/bases/base/ui/inline-alert";
import { Input } from "@/registry/bases/base/ui/input";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/registry/bases/base/ui/menu";
import { Notification } from "@/registry/bases/base/ui/notification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/bases/base/ui/tabs";
import { Toaster, toast } from "@/registry/bases/base/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipHelp,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/bases/base/ui/tooltip";
import { Bi, useBi, useLanguage, useUi } from "./bi";
import { Center, Row, Stack } from "./kit";

/** The close button's accessible name, from the locale dictionary. */
function useClose() {
  return useUi()("ui.close");
}

/* --------------------------------------------------------------- Dialog */

export function DialogBasic() {
  const close = useClose();
  return (
    <Center>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <Bi en="Cancel request" ar="إلغاء الطلب" />
        </DialogTrigger>
        <DialogContent closeLabel={close}>
          <DialogHeader>
            <DialogTitle>
              <Bi en="Cancel this request?" ar="إلغاء هذا الطلب؟" />
            </DialogTitle>
            <DialogDescription>
              <Bi
                en="Request 24810 will be withdrawn. You can submit it again later."
                ar="سيُسحب الطلب ٢٤٨١٠. يمكنك تقديمه مرة أخرى لاحقًا."
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              <Bi en="Keep request" ar="الإبقاء على الطلب" />
            </DialogClose>
            <DialogClose render={<Button destructive />}>
              <Bi en="Cancel request" ar="إلغاء الطلب" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Center>
  );
}

export function DialogSizes() {
  const close = useClose();
  return (
    <Row>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" />}>
            {size === "sm" ? "400px" : size === "md" ? "600px" : "800px"}
          </DialogTrigger>
          <DialogContent size={size} closeLabel={close}>
            <DialogHeader>
              <DialogTitle>
                <Bi en="Service terms" ar="شروط الخدمة" />
              </DialogTitle>
              <DialogDescription>
                <Bi
                  en={`The ${size} dialog is ${size === "sm" ? "400" : size === "md" ? "600" : "800"}px wide and shrinks to fit a phone.`}
                  ar={`عرض النافذة ${size === "sm" ? "٤٠٠" : size === "md" ? "٦٠٠" : "٨٠٠"} بكسل، وتتقلص لتناسب الجوال.`}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button />}>
                <Bi en="Got it" ar="حسنًا" />
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </Row>
  );
}

export function DialogForm() {
  const close = useClose();
  const t = useBi();
  return (
    <Center>
      <Dialog>
        <DialogTrigger render={<Button />}>
          <Bi en="Update contact details" ar="تحديث بيانات التواصل" />
        </DialogTrigger>
        <DialogContent closeLabel={close}>
          <DialogHeader>
            <DialogTitle>
              <Bi en="Contact details" ar="بيانات التواصل" />
            </DialogTitle>
            <DialogDescription>
              <Bi
                en="We use these to send updates about your request."
                ar="نستخدمها لإرسال تحديثات عن طلبك."
              />
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Field name="mobile">
              <FieldLabel>
                <Bi en="Mobile number" ar="رقم الجوال" />
              </FieldLabel>
              <Input
                type="tel"
                inputMode="tel"
                dir="ltr"
                placeholder={t("50 123 4567", "٥٠ ١٢٣ ٤٥٦٧")}
              />
            </Field>
            <Field name="email">
              <FieldLabel>
                <Bi en="Email" ar="البريد الإلكتروني" />
              </FieldLabel>
              <Input type="email" dir="ltr" placeholder="name@example.gov.sa" />
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              <Bi en="Cancel" ar="إلغاء" />
            </DialogClose>
            <DialogClose render={<Button />}>
              <Bi en="Save" ar="حفظ" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Center>
  );
}

/* --------------------------------------------------------------- Drawer */

const SIDES = [
  { side: "start", en: "Start", ar: "البداية" },
  { side: "end", en: "End", ar: "النهاية" },
  { side: "top", en: "Top", ar: "الأعلى" },
  { side: "bottom", en: "Bottom", ar: "الأسفل" },
] as const;

export function DrawerSides() {
  const close = useClose();
  return (
    <Row>
      {SIDES.map((s) => (
        <Drawer key={s.side} side={s.side}>
          <DrawerTrigger render={<Button variant="outline" />}>
            <Bi en={s.en} ar={s.ar} />
          </DrawerTrigger>
          <DrawerContent closeLabel={close}>
            <DrawerHeader>
              <DrawerTitle>
                <Bi en="Filters" ar="التصفية" />
              </DrawerTitle>
              <DrawerDescription>
                <Bi
                  en="This drawer slides in from the start, end, top or bottom edge. Start and end follow the page direction."
                  ar="تنزلق هذه اللوحة من حافة البداية أو النهاية أو الأعلى أو الأسفل. وتتبع البداية والنهاية اتجاه الصفحة."
                />
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                <Bi en="Reset" ar="إعادة ضبط" />
              </DrawerClose>
              <DrawerClose render={<Button />}>
                <Bi en="Apply" ar="تطبيق" />
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </Row>
  );
}

const NAV = [
  { icon: Home01Icon, en: "Home", ar: "الرئيسية" },
  { icon: File01Icon, en: "My requests", ar: "طلباتي" },
  { icon: FolderOpenIcon, en: "Documents", ar: "المستندات" },
  { icon: Settings02Icon, en: "Settings", ar: "الإعدادات" },
];

export function DrawerNav() {
  const close = useClose();
  const t = useBi();
  return (
    <Center>
      <Drawer side="start">
        <DrawerTrigger render={<Button variant="outline" />}>
          <Bi en="Open menu" ar="فتح القائمة" />
        </DrawerTrigger>
        <DrawerContent tone="gray" closeLabel={close}>
          <DrawerHeader>
            <DrawerTitle>
              <Bi en="Services" ar="الخدمات" />
            </DrawerTitle>
          </DrawerHeader>
          <nav aria-label={t("Main", "القائمة الرئيسية")} className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Button
                key={item.en}
                variant="transparent"
                nativeButton={false}
                render={<a href="#top" />}
                className="justify-start"
              >
                <HugeiconsIcon icon={item.icon} data-icon="inline-start" />
                <Bi en={item.en} ar={item.ar} />
              </Button>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </Center>
  );
}

/* -------------------------------------------------------------- Tooltip */

export function TooltipBasic() {
  const t = useBi();
  return (
    <TooltipProvider>
      <Row>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            <Bi en="Hover or focus me" ar="مرّر أو ركّز عليّ" />
          </TooltipTrigger>
          <TooltipContent>
            {t("Opens your saved drafts.", "يفتح المسودات المحفوظة.")}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="secondary" iconOnly aria-label={t("Settings", "الإعدادات")} />}
          >
            <HugeiconsIcon icon={Settings02Icon} />
          </TooltipTrigger>
          <TooltipContent tone="dark">{t("Settings", "الإعدادات")}</TooltipContent>
        </Tooltip>
      </Row>
    </TooltipProvider>
  );
}

export function TooltipPlacements() {
  const t = useBi();
  return (
    <div className="grid min-h-60 grid-cols-2 place-items-center gap-x-6 gap-y-16 py-12 sm:grid-cols-4">
      {(
        [
          ["top", "Top", "أعلى"],
          ["bottom", "Bottom", "أسفل"],
          ["start", "Start", "البداية"],
          ["end", "End", "النهاية"],
        ] as const
      ).map(([side, en, ar]) => (
        <Tooltip key={side} defaultOpen>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            <Bi en={en} ar={ar} />
          </TooltipTrigger>
          <TooltipContent side={side} title={t("Tooltip title", "عنوان التلميح")}>
            {t(
              "Start and end swap on Arabic pages.",
              "تتبادل البداية والنهاية في الصفحات العربية.",
            )}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export function TooltipHelpDemo() {
  const t = useBi();
  return (
    <TooltipProvider>
      <Stack className="max-w-sm">
        <Field name="nid">
          <FieldLabel>
            <span className="inline-flex items-center gap-1">
              <Bi en="National ID" ar="رقم الهوية الوطنية" />
              <TooltipHelp
                label={t("About the National ID", "عن رقم الهوية الوطنية")}
                side="end"
                tone="dark"
              >
                {t(
                  "The 10 digits on your national ID card.",
                  "الأرقام العشرة على بطاقة الهوية الوطنية.",
                )}
              </TooltipHelp>
            </span>
          </FieldLabel>
          <Input inputMode="numeric" />
        </Field>
      </Stack>
    </TooltipProvider>
  );
}

/* ----------------------------------------------------------------- Menu */

function ItemIcon({ icon }: { icon: typeof Edit02Icon }) {
  return <HugeiconsIcon icon={icon} aria-hidden />;
}

export function MenuBasic() {
  const t = useBi();
  return (
    <Center>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>
          <Bi en="Actions" ar="الإجراءات" />
        </MenuTrigger>
        <MenuContent>
          <MenuItem>
            <ItemIcon icon={Edit02Icon} />
            <Bi en="Edit request" ar="تعديل الطلب" />
            <MenuShortcut>E</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <ItemIcon icon={Copy01Icon} />
            <Bi en="Duplicate" ar="نسخ" />
            <MenuShortcut>D</MenuShortcut>
          </MenuItem>
          <MenuItem disabled>
            <ItemIcon icon={Share08Icon} />
            <Bi en="Share" ar="مشاركة" />
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            <ItemIcon icon={Delete02Icon} />
            <Bi en="Withdraw request" ar="سحب الطلب" />
          </MenuItem>
        </MenuContent>
        <span className="sr-only">{t("Menu", "قائمة")}</span>
      </Menu>
    </Center>
  );
}

export function MenuGroups() {
  const [alerts, setAlerts] = useState(true);
  const [view, setView] = useState("list");
  return (
    <Center>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>
          <HugeiconsIcon icon={Settings02Icon} data-icon="inline-start" />
          <Bi en="View" ar="العرض" />
        </MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuLabel>
              <Bi en="Layout" ar="التخطيط" />
            </MenuLabel>
            <MenuRadioGroup value={view} onValueChange={setView}>
              <MenuRadioItem value="list">
                <Bi en="List" ar="قائمة" />
              </MenuRadioItem>
              <MenuRadioItem value="cards">
                <Bi en="Cards" ar="بطاقات" />
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuLabel>
              <Bi en="Notifications" ar="الإشعارات" />
            </MenuLabel>
            <MenuCheckboxItem checked={alerts} onCheckedChange={setAlerts}>
              <Bi en="Request updates" ar="تحديثات الطلب" />
            </MenuCheckboxItem>
          </MenuGroup>
        </MenuContent>
      </Menu>
    </Center>
  );
}

export function MenuSubmenu() {
  return (
    <Center>
      <Menu>
        <MenuTrigger render={<Button variant="outline" />}>
          <Bi en="Move request" ar="نقل الطلب" />
        </MenuTrigger>
        <MenuContent>
          <MenuItem>
            <ItemIcon icon={UserIcon} />
            <Bi en="Assign to me" ar="إسناد إليّ" />
          </MenuItem>
          <MenuSub>
            <MenuSubTrigger>
              <ItemIcon icon={FolderOpenIcon} />
              <Bi en="Move to" ar="نقل إلى" />
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>
                <Bi en="Inbox" ar="الوارد" />
              </MenuItem>
              <MenuItem>
                <Bi en="Under review" ar="قيد المراجعة" />
              </MenuItem>
              <MenuItem>
                <Bi en="Archive" ar="الأرشيف" />
              </MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>
            <ItemIcon icon={Calendar03Icon} />
            <Bi en="Schedule" ar="جدولة" />
          </MenuItem>
        </MenuContent>
      </Menu>
    </Center>
  );
}

/* ----------------------------------------------------------------- Tabs */

function TabsContentSample({ value }: { value: string }) {
  const text: Record<string, [string, string]> = {
    details: [
      "Applicant name, service and submission date.",
      "اسم مقدم الطلب والخدمة وتاريخ التقديم.",
    ],
    documents: [
      "Two files attached: the lease and a site plan.",
      "ملفان مرفقان: عقد الإيجار ومخطط الموقع.",
    ],
    history: ["Submitted on 4 Nov 2026. Under review.", "قُدّم في ٤ نوفمبر ٢٠٢٦. قيد المراجعة."],
  };
  const [en, ar] = text[value] ?? ["", ""];
  return (
    <TabsContent value={value} className="text-sm text-text-primary-paragraph">
      <Bi en={en} ar={ar} />
    </TabsContent>
  );
}

export function TabsHorizontal() {
  const t = useBi();
  return (
    <Stack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Tabs key={size} defaultValue="details">
          <TabsList size={size} aria-label={t(`Request (${size})`, `الطلب (${size})`)}>
            <TabsTrigger value="details">
              <HugeiconsIcon icon={File01Icon} aria-hidden />
              <Bi en="Details" ar="التفاصيل" />
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Bi en="Documents" ar="المستندات" />
            </TabsTrigger>
            <TabsTrigger value="history">
              <Bi en="History" ar="السجل" />
            </TabsTrigger>
            <TabsTrigger value="locked" disabled>
              <Bi en="Locked" ar="مقفل" />
            </TabsTrigger>
          </TabsList>
          <TabsContentSample value="details" />
          <TabsContentSample value="documents" />
          <TabsContentSample value="history" />
        </Tabs>
      ))}
    </Stack>
  );
}

export function TabsVertical() {
  const t = useBi();
  return (
    <Tabs orientation="vertical" defaultValue="details" className="max-w-xl">
      <TabsList aria-label={t("Request sections", "أقسام الطلب")}>
        <TabsTrigger value="details">
          <HugeiconsIcon icon={File01Icon} aria-hidden />
          <Bi en="Details" ar="التفاصيل" />
        </TabsTrigger>
        <TabsTrigger value="documents">
          <HugeiconsIcon icon={FolderOpenIcon} aria-hidden />
          <Bi en="Documents" ar="المستندات" />
        </TabsTrigger>
        <TabsTrigger value="history">
          <HugeiconsIcon icon={Calendar03Icon} aria-hidden />
          <Bi en="History" ar="السجل" />
        </TabsTrigger>
      </TabsList>
      <TabsContentSample value="details" />
      <TabsContentSample value="documents" />
      <TabsContentSample value="history" />
    </Tabs>
  );
}

/* ------------------------------------------------------------ Accordion */

const FAQ = [
  {
    value: "a",
    en: ["Who can apply?", "Citizens and residents with a valid national ID or residence permit."],
    ar: ["من يستطيع التقديم؟", "المواطنون والمقيمون ممن لديهم هوية وطنية أو إقامة سارية."],
  },
  {
    value: "b",
    en: ["How long does it take?", "Most requests are completed within five working days."],
    ar: ["كم تستغرق المعالجة؟", "تُنجز معظم الطلبات خلال ٥ أيام عمل."],
  },
  {
    value: "c",
    en: ["What does it cost?", "The fee is shown before you submit. You can pay online."],
    ar: ["ما الرسوم؟", "تظهر الرسوم قبل التقديم، ويمكنك الدفع إلكترونيًا."],
  },
];

export function AccordionBasic() {
  return (
    <Accordion defaultValue={["a"]} className="max-w-xl">
      {FAQ.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <Bi en={item.en[0] as string} ar={item.ar[0] as string} />
          </AccordionTrigger>
          <AccordionContent>
            <Bi en={item.en[1] as string} ar={item.ar[1] as string} />
          </AccordionContent>
        </AccordionItem>
      ))}
      <AccordionItem value="d" disabled>
        <AccordionTrigger>
          <Bi en="Disabled section" ar="قسم معطّل" />
        </AccordionTrigger>
        <AccordionContent>
          <Bi en="Hidden." ar="مخفي." />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionVariants() {
  const t = useBi();
  return (
    <Stack className="max-w-xl">
      {(["sm", "md"] as const).map((size) => (
        <Accordion key={size} size={size} multiple aria-label={t(`Size ${size}`, `الحجم ${size}`)}>
          {FAQ.slice(0, 2).map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>
                <Bi en={item.en[0] as string} ar={item.ar[0] as string} />
              </AccordionTrigger>
              <AccordionContent>
                <Bi en={item.en[1] as string} ar={item.ar[1] as string} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ))}
      <Accordion
        iconPosition="leading"
        flush
        defaultValue={["a"]}
        aria-label={t("Leading, flush", "أيقونة في البداية، بلا إطار")}
      >
        {FAQ.slice(0, 2).map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>
              <Bi en={item.en[0] as string} ar={item.ar[0] as string} />
            </AccordionTrigger>
            <AccordionContent>
              <Bi en={item.en[1] as string} ar={item.ar[1] as string} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Stack>
  );
}

/* ----------------------------------------------------- Content Switcher */

const RANGES = [
  { value: "day", en: "Day", ar: "يوم" },
  { value: "week", en: "Week", ar: "أسبوع" },
  { value: "month", en: "Month", ar: "شهر" },
];

export function ContentSwitcherBasic() {
  const t = useBi();
  const [value, setValue] = useState("week");
  const chosen = RANGES.find((r) => r.value === value);
  return (
    <Stack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <ContentSwitcher
          key={size}
          size={size}
          value={value}
          onValueChange={setValue}
          aria-label={t(`Period (${size})`, `الفترة (${size})`)}
        >
          {RANGES.map((r) => (
            <ContentSwitcherItem key={r.value} value={r.value}>
              <Bi en={r.en} ar={r.ar} />
            </ContentSwitcherItem>
          ))}
        </ContentSwitcher>
      ))}
      <p className="text-sm text-text-primary-paragraph" aria-live="polite">
        <Bi en={`Showing: ${chosen?.en}`} ar={`المعروض: ${chosen?.ar}`} />
      </p>
    </Stack>
  );
}

export function ContentSwitcherOnColor() {
  const t = useBi();
  return (
    <div className="flex rounded-md bg-background-primary p-6">
      <ContentSwitcher onColor defaultValue="week" aria-label={t("Period", "الفترة")}>
        {RANGES.map((r) => (
          <ContentSwitcherItem key={r.value} value={r.value}>
            <Bi en={r.en} ar={r.ar} />
          </ContentSwitcherItem>
        ))}
      </ContentSwitcher>
    </div>
  );
}

/* ---------------------------------------------------------------- Toast */

export function ToastDemo() {
  const t = useBi();
  const ui = useUi();
  const kinds = [
    ["neutral", "Neutral", "محايد"],
    ["info", "Info", "معلومة"],
    ["success", "Success", "نجاح"],
    ["warning", "Warning", "تنبيه"],
    ["error", "Error", "خطأ"],
  ] as const;
  const messages = {
    neutral: [
      t("Draft saved", "حُفظت المسودة"),
      t("You can continue later from My requests.", "يمكنك المتابعة لاحقًا من طلباتي."),
    ],
    info: [
      t("New service hours", "ساعات خدمة جديدة"),
      t("The centre is open until 8 pm from Sunday.", "المركز مفتوح حتى ٨ مساءً ابتداءً من الأحد."),
    ],
    success: [
      t("Request submitted", "تم إرسال الطلب"),
      t("Your reference number is 24810.", "رقمك المرجعي ٢٤٨١٠."),
    ],
    warning: [
      t("ID expires soon", "الهوية على وشك الانتهاء"),
      t("Your ID expires in 14 days.", "تنتهي هويتك خلال ١٤ يومًا."),
    ],
    error: [
      t("Could not submit", "تعذّر الإرسال"),
      t("Check your connection and try again.", "تحقق من اتصالك وحاول مرة أخرى."),
    ],
  } as const;
  return (
    <>
      <Toaster closeLabel={ui("ui.close")} regionLabel={ui("ui.notifications")} />
      <Row>
        {kinds.map(([type, en, ar]) => (
          <Button
            key={type}
            variant="outline"
            onClick={() =>
              toast.add({
                type,
                title: messages[type][0],
                description: messages[type][1],
                ...(type === "success" ? { actionProps: { children: t("View", "عرض") } } : {}),
              })
            }
          >
            <Bi en={en} ar={ar} />
          </Button>
        ))}
      </Row>
    </>
  );
}

/* --------------------------------------------------------- Notification */

export function NotificationKinds() {
  const ui = useUi();
  const t = useBi();
  const kinds = [
    [
      "neutral",
      "Note:",
      "ملاحظة:",
      "Services are available in Arabic and English.",
      "الخدمات متاحة بالعربية والإنجليزية.",
    ],
    [
      "info",
      "New:",
      "جديد:",
      "You can now track your request online.",
      "يمكنك الآن تتبع طلبك إلكترونيًا.",
    ],
    ["success", "Done:", "تم:", "Your request was submitted.", "تم إرسال طلبك."],
    [
      "warning",
      "Notice:",
      "تنبيه:",
      "The portal will be down for maintenance on Friday.",
      "ستتوقف البوابة للصيانة يوم الجمعة.",
    ],
    [
      "critical",
      "Important:",
      "مهم:",
      "Your account has been locked. Contact support.",
      "تم قفل حسابك. تواصل مع الدعم.",
    ],
  ] as const;
  return (
    <Stack>
      {kinds.map(([variant, titleEn, titleAr, en, ar], i) => (
        <Notification
          key={variant}
          variant={variant}
          title={t(titleEn, titleAr)}
          dismissible
          dismissLabel={ui("ui.dismiss")}
          action={i === 1 ? <a href="#top">{t("Learn more", "اعرف المزيد")}</a> : undefined}
        >
          <Bi en={en} ar={ar} />
        </Notification>
      ))}
    </Stack>
  );
}

/* ---------------------------------------------------------- Inline Alert */

export function InlineAlertKinds() {
  const ui = useUi();
  const arabic = useLanguage() === "ar";
  const kinds = [
    ["neutral", "Draft saved", "حُفظت المسودة", "You can continue later.", "يمكنك المتابعة لاحقًا."],
    [
      "info",
      "Documents needed",
      "مستندات مطلوبة",
      "Attach your lease contract before you submit.",
      "أرفق عقد الإيجار قبل التقديم.",
    ],
    [
      "success",
      "Request submitted",
      "تم إرسال الطلب",
      "We will email you when it is reviewed.",
      "سنراسلك عند مراجعته.",
    ],
    [
      "warning",
      "ID expires soon",
      "الهوية على وشك الانتهاء",
      "Renew it within 14 days to keep using the service.",
      "جدّدها خلال ١٤ يومًا لمواصلة استخدام الخدمة.",
    ],
    [
      "destructive",
      "Payment failed",
      "فشلت عملية الدفع",
      "Your card was declined. Try another card.",
      "تم رفض بطاقتك. جرّب بطاقة أخرى.",
    ],
  ] as const;
  const rtl = arabic;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {([false, true] as const).map((tinted) => (
        <Stack key={String(tinted)}>
          {kinds.map(([variant, titleEn, titleAr, en, ar], i) => (
            <InlineAlert
              key={variant}
              variant={variant}
              tinted={tinted}
              title={rtl ? titleAr : titleEn}
              dismissible={i === 0 || i === 3}
              dismissLabel={ui("ui.dismiss")}
              actions={
                i === 2 || i === 4 ? (
                  <>
                    <Button size="sm" variant={tinted ? "outline" : "primary"}>
                      <Bi
                        en={i === 2 ? "View request" : "Try again"}
                        ar={i === 2 ? "عرض الطلب" : "حاول مجددًا"}
                      />
                    </Button>
                    <Button size="sm" variant="transparent">
                      <Bi en="Dismiss" ar="تجاهل" />
                    </Button>
                  </>
                ) : undefined
              }
            >
              {rtl ? ar : en}
            </InlineAlert>
          ))}
        </Stack>
      ))}
    </div>
  );
}
