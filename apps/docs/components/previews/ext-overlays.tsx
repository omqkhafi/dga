"use client";

import {
  Copy01Icon,
  Delete02Icon,
  Edit02Icon,
  Share08Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/bases/base/ui/alert-dialog";
import { Avatar } from "@/registry/bases/base/ui/avatar";
import { Button } from "@/registry/bases/base/ui/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/bases/base/ui/context-menu";
import { Field, FieldLabel } from "@/registry/bases/base/ui/field";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/bases/base/ui/hover-card";
import { Input } from "@/registry/bases/base/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/bases/base/ui/popover";
import { Bi, useBi, useUi } from "./bi";
import { Center, Row } from "./kit";

function useClose() {
  return useUi()("ui.close");
}

/* -------------------------------------------------------------- Popover */

export function PopoverBasic() {
  const close = useClose();
  return (
    <Center>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <Bi en="Request details" ar="تفاصيل الطلب" />
        </PopoverTrigger>
        <PopoverContent showCloseButton closeLabel={close}>
          <PopoverHeader>
            <PopoverTitle>
              <Bi en="Request 24810" ar="الطلب ٢٤٨١٠" />
            </PopoverTitle>
            <PopoverDescription>
              <Bi
                en="Submitted on 8 November. A reviewer will reply within three working days."
                ar="قُدّم في ٨ نوفمبر. سيردّ المراجع خلال ثلاثة أيام عمل."
              />
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Center>
  );
}

function Placements<T extends string>({
  items,
  render,
}: {
  items: readonly (readonly [T, string, string])[];
  render: (side: T, label: React.ReactNode) => React.ReactNode;
}) {
  // Top and bottom first, then start and end side by side in the middle, so every panel has room.
  const [top, bottom, start, end] = items;
  const label = (item: readonly [T, string, string]) => <Bi en={item[1]} ar={item[2]} />;
  return (
    <div className="flex min-h-72 flex-col items-center gap-52 py-36">
      <div className="flex gap-24">
        {top ? render(top[0], label(top)) : null}
        {bottom ? render(bottom[0], label(bottom)) : null}
      </div>
      <div className="flex gap-12">
        {start ? render(start[0], label(start)) : null}
        {end ? render(end[0], label(end)) : null}
      </div>
    </div>
  );
}

const SIDES = [
  ["top", "Top", "أعلى"],
  ["bottom", "Bottom", "أسفل"],
  ["start", "Start", "البداية"],
  ["end", "End", "النهاية"],
] as const;

export function PopoverPlacements() {
  const t = useBi();
  return (
    <Placements
      items={SIDES}
      render={(side, label) => (
        <Popover key={side} defaultOpen>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>{label}</PopoverTrigger>
          <PopoverContent side={side} showArrow className="w-56">
            <PopoverHeader>
              <PopoverTitle>{t("Popover title", "عنوان النافذة")}</PopoverTitle>
              <PopoverDescription>
                {t(
                  "Start and end swap on Arabic pages.",
                  "تتبادل البداية والنهاية في الصفحات العربية.",
                )}
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}

export function PopoverForm() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState("");
  const t = useBi();
  return (
    <Center className="flex-col gap-3">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <HugeiconsIcon icon={Edit02Icon} data-icon="inline-start" />
          <Bi en="Rename request" ar="إعادة تسمية الطلب" />
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>
              <Bi en="Rename request" ar="إعادة تسمية الطلب" />
            </PopoverTitle>
          </PopoverHeader>
          <Field name="request-name">
            <FieldLabel>
              <Bi en="Name" ar="الاسم" />
            </FieldLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <PopoverFooter>
            <PopoverClose render={<Button variant="outline" size="sm" />}>
              <Bi en="Cancel" ar="إلغاء" />
            </PopoverClose>
            <PopoverClose render={<Button size="sm" onClick={() => setSaved(name)} />}>
              <Bi en="Save" ar="حفظ" />
            </PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-text-primary-paragraph" aria-live="polite">
        {saved ? t(`Saved as "${saved}".`, `حُفظ باسم «${saved}».`) : " "}
      </p>
    </Center>
  );
}

export function PopoverStates() {
  const [open, setOpen] = useState(false);
  const close = useClose();
  return (
    <Center className="flex-col gap-3">
      <Row>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button variant="outline" />}>
            {open ? <Bi en="Close the popover" ar="إغلاق النافذة" /> : <Bi en="Open" ar="فتح" />}
          </PopoverTrigger>
          <PopoverContent showArrow showCloseButton closeLabel={close}>
            <PopoverHeader>
              <PopoverTitle>
                <Bi en="Controlled" ar="بتحكّم خارجي" />
              </PopoverTitle>
              <PopoverDescription>
                <Bi
                  en="Its state lives in your code: open and onOpenChange."
                  ar="حالتها في شيفرتك: open وonOpenChange."
                />
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" disabled />}>
            <Bi en="Disabled trigger" ar="زر معطّل" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverDescription>
              <Bi en="Never shown." ar="لا تظهر أبدًا." />
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      </Row>
    </Center>
  );
}

/* ----------------------------------------------------------- Hover Card */

function PersonCard() {
  const t = useBi();
  return (
    <div className="flex gap-3">
      <Avatar size={48} initials={t("DG", "هـ")} />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="m-0 text-md font-semibold text-text-display">
          <Bi en="Digital Government Authority" ar="هيئة الحكومة الرقمية" />
        </p>
        <p className="m-0 text-sm text-text-primary-paragraph">
          <Bi
            en="Leads the digital transformation of government services."
            ar="تقود التحول الرقمي للخدمات الحكومية."
          />
        </p>
        <p className="m-0 text-sm text-text-secondary-paragraph">
          <Bi en="Riyadh" ar="الرياض" />
        </p>
      </div>
    </div>
  );
}

export function HoverCardBasic() {
  return (
    <Center>
      <p className="m-0 text-md">
        <Bi en="Services are published by the " ar="تنشر الخدمات " />
        <HoverCard>
          <HoverCardTrigger href="#authority">
            <Bi en="Digital Government Authority" ar="هيئة الحكومة الرقمية" />
          </HoverCardTrigger>
          <HoverCardContent>
            <PersonCard />
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </Center>
  );
}

export function HoverCardPlacements() {
  return (
    <Placements
      items={SIDES}
      render={(side, label) => (
        <HoverCard key={side} defaultOpen>
          <HoverCardTrigger href={`#${side}`}>{label}</HoverCardTrigger>
          <HoverCardContent side={side} showArrow className="w-56">
            <p className="m-0 text-sm text-text-primary-paragraph">
              <Bi
                en="Start and end swap on Arabic pages."
                ar="تتبادل البداية والنهاية في الصفحات العربية."
              />
            </p>
          </HoverCardContent>
        </HoverCard>
      )}
    />
  );
}

export function HoverCardStates() {
  const t = useBi();
  return (
    <Center className="gap-8">
      <HoverCard>
        <HoverCardTrigger href="#instant" delay={0} closeDelay={0}>
          <Bi en="Opens at once" ar="تفتح فورًا" />
        </HoverCardTrigger>
        <HoverCardContent showArrow>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={UserIcon} aria-hidden className="size-5 text-icon-default" />
            <span className="text-sm">{t("delay 0, closeDelay 0", "تأخير ٠ وتأخير إغلاق ٠")}</span>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger href="#slow" delay={1000}>
          <Bi en="Opens after a second" ar="تفتح بعد ثانية" />
        </HoverCardTrigger>
        <HoverCardContent>
          <span className="text-sm">
            <Bi en="delay 1000" ar="تأخير ١٠٠٠" />
          </span>
        </HoverCardContent>
      </HoverCard>
    </Center>
  );
}

/* --------------------------------------------------------- Alert Dialog */

export function AlertDialogBasic() {
  return (
    <Center>
      <AlertDialog>
        <AlertDialogTrigger render={<Button destructive variant="outline" />}>
          <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
          <Bi en="Withdraw request" ar="سحب الطلب" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Bi en="Withdraw this request?" ar="سحب هذا الطلب؟" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Bi
                en="Request 24810 will be withdrawn and its documents deleted. This cannot be undone."
                ar="سيُسحب الطلب ٢٤٨١٠ وتُحذف مستنداته. لا يمكن التراجع عن ذلك."
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Bi en="Keep request" ar="الإبقاء على الطلب" />
            </AlertDialogCancel>
            <AlertDialogAction destructive>
              <Bi en="Withdraw" ar="سحب" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
}

export function AlertDialogNeutral() {
  return (
    <Center>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          <Bi en="Submit application" ar="تقديم الطلب" />
        </AlertDialogTrigger>
        <AlertDialogContent size="md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Bi en="Submit your application?" ar="تقديم طلبك؟" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Bi
                en="After you submit, you can no longer change the documents you attached."
                ar="بعد التقديم لا يمكنك تغيير المستندات التي أرفقتها."
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Bi en="Review again" ar="المراجعة مرة أخرى" />
            </AlertDialogCancel>
            <AlertDialogAction>
              <Bi en="Submit" ar="تقديم" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
}

export function AlertDialogControlled() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<"none" | "confirmed" | "cancelled">("none");
  const t = useBi();
  const text = {
    none: t("Nothing chosen yet.", "لم يُختر شيء بعد."),
    confirmed: t("You confirmed.", "أكّدتَ."),
    cancelled: t("You cancelled.", "ألغيتَ."),
  }[result];
  return (
    <Center className="flex-col gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Bi en="Open from code" ar="فتح من الشيفرة" />
      </Button>
      <p className="m-0 text-sm text-text-primary-paragraph" aria-live="polite">
        {text}
      </p>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Bi en="Sign out of all devices?" ar="تسجيل الخروج من كل الأجهزة؟" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Bi
                en="Clicking outside does not close this window. Choose one of the buttons, or press Escape to cancel."
                ar="النقر خارج النافذة لا يغلقها. اختر أحد الزرين، أو اضغط Escape للإلغاء."
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResult("cancelled")}>
              <Bi en="Cancel" ar="إلغاء" />
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setResult("confirmed")}>
              <Bi en="Sign out" ar="تسجيل الخروج" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
}

/* ---------------------------------------------------------- Context Menu */

function Area({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-40 w-full items-center justify-center rounded-md border border-dashed border-border-neutral-primary bg-background-neutral-50 p-4 text-center text-sm text-text-primary-paragraph">
      {children}
    </div>
  );
}

function ItemIcon({ icon }: { icon: typeof Edit02Icon }) {
  return <HugeiconsIcon icon={icon} aria-hidden />;
}

export function ContextMenuBasic() {
  const t = useBi();
  return (
    <ContextMenu>
      <ContextMenuTrigger
        aria-label={t(
          "Request row. Right-click for actions.",
          "صف الطلب. انقر بالزر الأيمن للإجراءات.",
        )}
        render={<div className="w-full" />}
      >
        <Area>
          <Bi
            en="Right-click here, long-press on a touch screen, or focus this area and press Shift+F10."
            ar="انقر هنا بالزر الأيمن، أو اضغط مطولًا على شاشة اللمس، أو ركّز هذه المنطقة واضغط مفتاح القائمة."
          />
        </Area>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ItemIcon icon={Edit02Icon} />
          <Bi en="Edit request" ar="تعديل الطلب" />
          <ContextMenuShortcut>E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <ItemIcon icon={Copy01Icon} />
          <Bi en="Duplicate" ar="نسخ" />
          <ContextMenuShortcut>D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <ItemIcon icon={Share08Icon} />
          <Bi en="Share" ar="مشاركة" />
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ItemIcon icon={Delete02Icon} />
          <Bi en="Withdraw request" ar="سحب الطلب" />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function ContextMenuGroups() {
  const t = useBi();
  const [alerts, setAlerts] = useState(true);
  const [view, setView] = useState("list");
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={<div className="w-full" />}
        aria-label={t("Options area", "منطقة الخيارات")}
      >
        <Area>
          <Bi en="Right-click for view options." ar="انقر بالزر الأيمن لخيارات العرض." />
        </Area>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>
            <Bi en="Layout" ar="التخطيط" />
          </ContextMenuLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="list">
              <Bi en="List" ar="قائمة" />
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="cards">
              <Bi en="Cards" ar="بطاقات" />
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={alerts} onCheckedChange={setAlerts}>
          <Bi en="Show alerts" ar="إظهار التنبيهات" />
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function ContextMenuSubmenu() {
  const t = useBi();
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={<div className="w-full" />}
        aria-label={t("Options area", "منطقة الخيارات")}
      >
        <Area>
          <Bi
            en="Right-click, then open Share with the arrow that points to the end."
            ar="انقر بالزر الأيمن، ثم افتح «مشاركة» بالسهم المتجه إلى النهاية."
          />
        </Area>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Bi en="Open" ar="فتح" />
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Bi en="Share" ar="مشاركة" />
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>
              <Bi en="Copy link" ar="نسخ الرابط" />
            </ContextMenuItem>
            <ContextMenuItem>
              <Bi en="Send by email" ar="إرسال بالبريد" />
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Bi en="Properties" ar="الخصائص" />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
