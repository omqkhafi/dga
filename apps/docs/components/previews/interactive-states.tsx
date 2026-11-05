"use client";

import { Calendar03Icon, File01Icon, FolderOpenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/registry/bases/base/ui/button";
import { ContentSwitcher, ContentSwitcherItem } from "@/registry/bases/base/ui/content-switcher";
import {
  Dialog,
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
import { InlineAlert } from "@/registry/bases/base/ui/inline-alert";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@/registry/bases/base/ui/menu";
import { Notification } from "@/registry/bases/base/ui/notification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/bases/base/ui/tabs";
import { Toaster, toast } from "@/registry/bases/base/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/bases/base/ui/tooltip";
import { Bi, useBi, useUi } from "./bi";
import { Center, Row, Stack } from "./kit";

/** The state of a controlled example, written out so the reader can see it change. */
function Readout({ label, value }: { label: string; value: string }) {
  return (
    <p className="m-0 text-[0.8125rem] text-text-secondary-paragraph">
      <code className="font-mono">{label}</code>: <code className="font-mono">{value}</code>
    </p>
  );
}

/* --------------------------------------------------------------- Dialog */

/** `disablePointerDismissal` and no corner button: the person must choose an action. */
export function DialogRequired() {
  const ui = useUi();
  return (
    <Center>
      <Dialog disablePointerDismissal>
        <DialogTrigger render={<Button variant="outline" destructive />}>
          <Bi en="Delete draft" ar="حذف المسودة" />
        </DialogTrigger>
        <DialogContent size="sm" showCloseButton={false} closeLabel={ui("ui.close")}>
          <DialogHeader>
            <DialogTitle>
              <Bi en="Delete this draft?" ar="حذف هذه المسودة؟" />
            </DialogTitle>
            <DialogDescription>
              <Bi
                en="A click outside the window does not close it. Choose an action."
                ar="النقر خارج النافذة لا يغلقها. اختر إجراءً."
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              <Bi en="Keep draft" ar="الإبقاء على المسودة" />
            </DialogClose>
            <DialogClose render={<Button destructive />}>
              <Bi en="Delete draft" ar="حذف المسودة" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Center>
  );
}

/** `open` and `onOpenChange`: the page owns the state. */
export function DialogControlled() {
  const [open, setOpen] = useState(false);
  const ui = useUi();
  return (
    <Center className="flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Bi en="Open from code" ar="فتح من الشيفرة" />
      </Button>
      <Readout label="open" value={String(open)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="sm" closeLabel={ui("ui.close")}>
          <DialogHeader>
            <DialogTitle>
              <Bi en="Controlled dialog" ar="نافذة بحالة مُدارة" />
            </DialogTitle>
            <DialogDescription>
              <Bi
                en="The page set open to true. Closing it calls onOpenChange."
                ar="ضبطت الصفحة open على true. وإغلاقها يستدعي onOpenChange."
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>
              <Bi en="Done" ar="تم" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Center>
  );
}

/* --------------------------------------------------------------- Drawer */

/** The white tone, no corner button, and an `open` state the page controls. */
export function DrawerControlled() {
  const [open, setOpen] = useState(false);
  const ui = useUi();
  return (
    <Center className="flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Bi en="Open from code" ar="فتح من الشيفرة" />
      </Button>
      <Readout label="open" value={String(open)} />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<span hidden />} />
        <DrawerContent showCloseButton={false} closeLabel={ui("ui.close")}>
          <DrawerHeader>
            <DrawerTitle>
              <Bi en="No corner button" ar="دون زر في الزاوية" />
            </DrawerTitle>
            <DrawerDescription>
              <Bi
                en="Close it with the button below, Escape, or a click on the page behind."
                ar="أغلقها بالزر أدناه أو بمفتاح Escape أو بالنقر على الصفحة خلفها."
              />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button />}>
              <Bi en="Close" ar="إغلاق" />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Center>
  );
}

/* -------------------------------------------------------------- Tooltip */

/** Open without an arrow, a long text with a title, and a disabled tooltip. */
export function TooltipStates() {
  const t = useBi();
  return (
    <TooltipProvider>
      <div className="grid min-h-56 grid-cols-1 place-items-center gap-x-6 gap-y-20 py-14 sm:grid-cols-3">
        <Tooltip defaultOpen>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            <Bi en="No arrow" ar="دون سهم" />
          </TooltipTrigger>
          <TooltipContent showArrow={false}>
            {t("Opens your saved drafts.", "يفتح المسودات المحفوظة.")}
          </TooltipContent>
        </Tooltip>
        <Tooltip defaultOpen>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            <Bi en="With a title" ar="مع عنوان" />
          </TooltipTrigger>
          <TooltipContent title={t("Drafts", "المسودات")} side="bottom">
            {t(
              "Requests you started and did not submit. They are kept for 30 days.",
              "الطلبات التي بدأتها ولم ترسلها. تُحفظ لمدة 30 يومًا.",
            )}
          </TooltipContent>
        </Tooltip>
        <Tooltip disabled>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            <Bi en="Disabled tooltip" ar="تلميح معطّل" />
          </TooltipTrigger>
          <TooltipContent>{t("Never shown.", "لا يظهر أبدًا.")}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

/* ----------------------------------------------------------------- Menu */

/** `closeOnClick={false}` keeps the menu open, and `open` makes the page the owner of the state. */
export function MenuStates() {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState({ name: true, date: true, status: false });
  const toggle = (key: keyof typeof columns) => setColumns((c) => ({ ...c, [key]: !c[key] }));
  return (
    <Center className="flex-col gap-3">
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger render={<Button variant="outline" />}>
          <Bi en="Columns" ar="الأعمدة" />
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem
            checked={columns.name}
            onCheckedChange={() => toggle("name")}
            closeOnClick={false}
          >
            <Bi en="Name" ar="الاسم" />
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={columns.date}
            onCheckedChange={() => toggle("date")}
            closeOnClick={false}
          >
            <Bi en="Date" ar="التاريخ" />
          </MenuCheckboxItem>
          <MenuCheckboxItem
            checked={columns.status}
            onCheckedChange={() => toggle("status")}
            closeOnClick={false}
          >
            <Bi en="Status" ar="الحالة" />
          </MenuCheckboxItem>
          <MenuSeparator />
          <MenuItem onClick={() => setColumns({ name: true, date: true, status: false })}>
            <Bi en="Reset (closes the menu)" ar="إعادة الضبط (تغلق القائمة)" />
          </MenuItem>
        </MenuContent>
      </Menu>
      <Readout label="open" value={String(open)} />
    </Center>
  );
}

/* ----------------------------------------------------------------- Tabs */

function Panel({ value, en, ar }: { value: string; en: string; ar: string }) {
  return (
    <TabsContent value={value} className="text-sm text-text-primary-paragraph">
      <Bi en={en} ar={ar} />
    </TabsContent>
  );
}

/** Manual activation, no divider, flush, and a controlled value. */
export function TabsBehaviour() {
  const t = useBi();
  const [value, setValue] = useState("details");
  return (
    <Stack>
      <Row
        label={t(
          "Manual activation: arrows move focus, Enter or Space selects",
          "تفعيل يدوي: الأسهم تحرك التركيز، وEnter أو Space يحدد",
        )}
      >
        <Tabs defaultValue="details" className="w-full">
          <TabsList activateOnFocus={false} aria-label={t("Manual", "يدوي")}>
            <TabsTrigger value="details">
              <Bi en="Details" ar="التفاصيل" />
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Bi en="Documents" ar="المستندات" />
            </TabsTrigger>
            <TabsTrigger value="history">
              <Bi en="History" ar="السجل" />
            </TabsTrigger>
          </TabsList>
          <Panel value="details" en="Applicant name and service." ar="اسم مقدم الطلب والخدمة." />
          <Panel value="documents" en="Two files attached." ar="ملفان مرفقان." />
          <Panel value="history" en="Submitted on 4 Nov 2026." ar="قُدّم في ٤ نوفمبر ٢٠٢٦." />
        </Tabs>
      </Row>
      <Row label={t("No divider", "دون خط فاصل")}>
        <Tabs defaultValue="details" className="w-full">
          <TabsList divider={false} aria-label={t("No divider", "دون خط فاصل")}>
            <TabsTrigger value="details">
              <Bi en="Details" ar="التفاصيل" />
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Bi en="Documents" ar="المستندات" />
            </TabsTrigger>
          </TabsList>
          <Panel value="details" en="Applicant name and service." ar="اسم مقدم الطلب والخدمة." />
          <Panel value="documents" en="Two files attached." ar="ملفان مرفقان." />
        </Tabs>
      </Row>
      <Row label={t("Flush", "بلا حشوة")}>
        <Tabs defaultValue="details" className="w-full">
          <TabsList flush aria-label={t("Flush", "بلا حشوة")}>
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
          <Panel value="details" en="Applicant name and service." ar="اسم مقدم الطلب والخدمة." />
          <Panel value="documents" en="Two files attached." ar="ملفان مرفقان." />
          <Panel value="history" en="Submitted on 4 Nov 2026." ar="قُدّم في ٤ نوفمبر ٢٠٢٦." />
        </Tabs>
      </Row>
      <Row label={t("Controlled value", "قيمة مُدارة")}>
        <Tabs value={value} onValueChange={setValue} className="w-full">
          <TabsList aria-label={t("Controlled", "مُدار")}>
            <TabsTrigger value="details">
              <Bi en="Details" ar="التفاصيل" />
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Bi en="Documents" ar="المستندات" />
            </TabsTrigger>
          </TabsList>
          <Panel value="details" en="Applicant name and service." ar="اسم مقدم الطلب والخدمة." />
          <Panel value="documents" en="Two files attached." ar="ملفان مرفقان." />
        </Tabs>
        <Readout label="value" value={value} />
      </Row>
    </Stack>
  );
}

/* ----------------------------------------------------- Content Switcher */

/** A disabled option, icon options, and a controlled value. */
export function ContentSwitcherStates() {
  const t = useBi();
  const [value, setValue] = useState("week");
  return (
    <Stack>
      <Row
        label={t(
          "A disabled option is skipped by the pointer, not hidden",
          "الخيار المعطّل لا يُختار بالمؤشر، ولا يُخفى",
        )}
      >
        <ContentSwitcher defaultValue="day" aria-label={t("Period", "الفترة")}>
          <ContentSwitcherItem value="day">
            <Bi en="Day" ar="يوم" />
          </ContentSwitcherItem>
          <ContentSwitcherItem value="week">
            <Bi en="Week" ar="أسبوع" />
          </ContentSwitcherItem>
          <ContentSwitcherItem value="month" disabled>
            <Bi en="Month" ar="شهر" />
          </ContentSwitcherItem>
        </ContentSwitcher>
      </Row>
      <Row label={t("Icon options", "خيارات بأيقونات")}>
        <ContentSwitcher defaultValue="details" aria-label={t("Section", "القسم")}>
          <ContentSwitcherItem value="details">
            <HugeiconsIcon icon={File01Icon} aria-hidden />
            <Bi en="Details" ar="التفاصيل" />
          </ContentSwitcherItem>
          <ContentSwitcherItem value="history">
            <HugeiconsIcon icon={Calendar03Icon} aria-hidden />
            <Bi en="History" ar="السجل" />
          </ContentSwitcherItem>
        </ContentSwitcher>
      </Row>
      <Row label={t("Controlled value", "قيمة مُدارة")}>
        <ContentSwitcher value={value} onValueChange={setValue} aria-label={t("Period", "الفترة")}>
          <ContentSwitcherItem value="day">
            <Bi en="Day" ar="يوم" />
          </ContentSwitcherItem>
          <ContentSwitcherItem value="week">
            <Bi en="Week" ar="أسبوع" />
          </ContentSwitcherItem>
          <ContentSwitcherItem value="month">
            <Bi en="Month" ar="شهر" />
          </ContentSwitcherItem>
        </ContentSwitcher>
        <Readout label="value" value={value} />
      </Row>
    </Stack>
  );
}

/* ---------------------------------------------------------------- Toast */

/** How long a toast stays and how it is announced: stays until closed, high priority, an action. */
export function ToastBehaviour() {
  const ui = useUi();
  const t = useBi();
  return (
    <>
      <Toaster closeLabel={ui("ui.close")} regionLabel={ui("ui.notifications")} />
      <Row>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "info",
              timeout: 0,
              title: t("Stays until you close it", "يبقى حتى تغلقه"),
              description: t("timeout: 0 turns off the timer.", "القيمة timeout: 0 توقف المؤقت."),
            })
          }
        >
          <Bi en="No timeout" ar="دون مهلة" />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "warning",
              title: t("Announced at once", "يُعلَن فورًا"),
              description: t(
                "Warnings and errors use priority high, so a screen reader interrupts.",
                "التحذيرات والأخطاء تستخدم الأولوية العالية، فيقاطع قارئ الشاشة.",
              ),
            })
          }
        >
          <Bi en="High priority" ar="أولوية عالية" />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "success",
              title: t("Request submitted", "تم إرسال الطلب"),
              description: t("Your reference number is 24810.", "رقمك المرجعي ٢٤٨١٠."),
              actionProps: { children: t("View request", "عرض الطلب") },
            })
          }
        >
          <Bi en="With an action" ar="مع إجراء" />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            for (let i = 1; i <= 4; i++) {
              toast.add({
                type: "neutral",
                title: t(`Toast ${i} of 4`, `إشعار ${i} من 4`),
                description: t("Only three show at once.", "يظهر ثلاثة فقط في وقت واحد."),
              });
            }
          }}
        >
          <Bi en="Four at once" ar="أربعة معًا" />
        </Button>
      </Row>
    </>
  );
}

/* ------------------------------------------------- Notification, Inline Alert */

/** Without an icon, and the state after the person dismisses it: nothing is left, and the page can bring it back. */
export function NotificationStates() {
  const ui = useUi();
  const [shown, setShown] = useState(true);
  return (
    <Stack>
      <Notification variant="info" hideIcon title={<Bi en="No icon:" ar="دون أيقونة:" />}>
        <Bi
          en="hideIcon removes the status icon. The colour and the title still carry the kind."
          ar="تزيل hideIcon أيقونة الحالة. ويحمل اللون والعنوان النوع."
        />
      </Notification>
      {shown ? (
        <Notification
          variant="warning"
          dismissible
          dismissLabel={ui("ui.dismiss")}
          onDismiss={() => setShown(false)}
          title={<Bi en="Notice:" ar="تنبيه:" />}
        >
          <Bi
            en="Dismiss me: onDismiss runs and the banner is gone."
            ar="أغلقني: تُستدعى onDismiss ويختفي الشريط."
          />
        </Notification>
      ) : (
        <Row>
          <p className="m-0 text-sm text-text-secondary-paragraph">
            <Bi en="Dismissed. Nothing is rendered in its place." ar="أُغلق. لا يُعرض شيء مكانه." />
          </p>
          <Button size="sm" variant="outline" onClick={() => setShown(true)}>
            <Bi en="Show again" ar="إظهاره مجددًا" />
          </Button>
        </Row>
      )}
    </Stack>
  );
}

export function InlineAlertStates() {
  const ui = useUi();
  const [shown, setShown] = useState(true);
  return (
    <Stack>
      <InlineAlert variant="neutral" hideIcon title={<Bi en="No icon" ar="دون أيقونة" />}>
        <Bi
          en="hideIcon removes the status icon. The bar and the title still carry the kind."
          ar="تزيل hideIcon أيقونة الحالة. ويحمل الشريط والعنوان النوع."
        />
      </InlineAlert>
      {shown ? (
        <InlineAlert
          variant="destructive"
          dismissible
          dismissLabel={ui("ui.dismiss")}
          onDismiss={() => setShown(false)}
          title={<Bi en="Could not save" ar="تعذّر الحفظ" />}
          actions={
            <Button size="sm" variant="outline">
              <Bi en="Try again" ar="حاول مرة أخرى" />
            </Button>
          }
        >
          <Bi
            en="A destructive alert is announced at once (role alert). Dismiss it to see the empty state."
            ar="يُعلَن التنبيه المدمّر فورًا (الدور alert). أغلقه لترى الحالة الفارغة."
          />
        </InlineAlert>
      ) : (
        <Row>
          <p className="m-0 text-sm text-text-secondary-paragraph">
            <Bi en="Dismissed. Nothing is rendered in its place." ar="أُغلق. لا يُعرض شيء مكانه." />
          </p>
          <Button size="sm" variant="outline" onClick={() => setShown(true)}>
            <Bi en="Show again" ar="إظهاره مجددًا" />
          </Button>
        </Row>
      )}
    </Stack>
  );
}
