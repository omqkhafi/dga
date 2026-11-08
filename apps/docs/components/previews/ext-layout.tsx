"use client";

import { useState } from "react";
import { AspectRatio } from "@/registry/bases/base/ui/aspect-ratio";
import { Button } from "@/registry/bases/base/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/bases/base/ui/collapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/bases/base/ui/resizable";
import { ScrollArea } from "@/registry/bases/base/ui/scroll-area";
import { Bi, useBi } from "./bi";
import { Row, Stack } from "./kit";

/* ---------------------------------------------------------- Collapsible */

export function CollapsibleBasic() {
  return (
    <Collapsible className="flex flex-col w-full max-w-md gap-3">
      <CollapsibleTrigger showChevron className="w-full">
        <Bi en="Required documents" ar="المستندات المطلوبة" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          <li>
            <Bi en="National ID or residency permit" ar="الهوية الوطنية أو الإقامة" />
          </li>
          <li>
            <Bi en="A recent photograph" ar="صورة شخصية حديثة" />
          </li>
          <li>
            <Bi en="The previous passport, if any" ar="جواز السفر السابق إن وُجد" />
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CollapsibleStates() {
  const [open, setOpen] = useState(false);
  return (
    <Stack className="w-full max-w-md gap-6">
      <Row label={<Bi en="Controlled" ar="متحكَّم به" />}>
        <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col w-full gap-3">
          <CollapsibleTrigger showChevron className="w-full">
            <Bi en="Processing times" ar="مدة المعالجة" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="m-0">
              <Bi en="A renewal takes three working days." ar="يستغرق التجديد ثلاثة أيام عمل." />
            </p>
          </CollapsibleContent>
        </Collapsible>
        <p className="m-0 text-sm text-text-secondary-paragraph" data-testid="collapsible-state">
          {open ? <Bi en="Open" ar="مفتوح" /> : <Bi en="Closed" ar="مغلق" />}
        </p>
      </Row>
      <Row label={<Bi en="Open at first" ar="مفتوح في البداية" />}>
        <Collapsible defaultOpen className="flex flex-col w-full gap-3">
          <CollapsibleTrigger showChevron className="w-full">
            <Bi en="Fees" ar="الرسوم" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="m-0">
              <Bi en="There is no fee for a first renewal." ar="لا رسوم على التجديد الأول." />
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Row>
      <Row label={<Bi en="Disabled" ar="معطّل" />}>
        <Collapsible disabled className="flex flex-col w-full gap-3">
          <CollapsibleTrigger showChevron className="w-full">
            <Bi en="Appeals" ar="الاعتراضات" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="m-0">
              <Bi en="Not available yet." ar="غير متاح بعد." />
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Row>
    </Stack>
  );
}

export function CollapsibleList() {
  const [open, setOpen] = useState(false);
  const rows: [string, string][] = [
    ["Passport renewal", "تجديد جواز السفر"],
    ["National ID", "الهوية الوطنية"],
    ["Driving licence", "رخصة القيادة"],
    ["Vehicle registration", "تسجيل المركبة"],
    ["Commercial register", "السجل التجاري"],
  ];
  const list = (items: [string, string][]) =>
    items.map(([en, ar]) => (
      <li key={en} className="rounded-sm border border-border-neutral-primary px-3 py-2">
        <Bi en={en} ar={ar} />
      </li>
    ));
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col w-full max-w-md gap-2">
      <ul className="m-0 flex list-none flex-col gap-2 p-0">{list(rows.slice(0, 2))}</ul>
      <CollapsibleContent>
        <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">{list(rows.slice(2))}</ul>
      </CollapsibleContent>
      <CollapsibleTrigger render={<Button variant="outline" size="sm" className="self-start" />}>
        {open ? (
          <Bi en="Show fewer" ar="عرض أقل" />
        ) : (
          <Bi en="Show all services" ar="عرض كل الخدمات" />
        )}
      </CollapsibleTrigger>
    </Collapsible>
  );
}

/* ---------------------------------------------------------- Scroll Area */

function Lines({ count = 24 }: { count?: number }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-2 p-3">
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: a static sample list
        <li key={i} className="text-md">
          <Bi en={`Application ${i + 1}`} ar={`الطلب رقم ${i + 1}`} />
        </li>
      ))}
    </ol>
  );
}

export function ScrollAreaVertical() {
  const t = useBi();
  return (
    <ScrollArea
      label={t("Applications, scrollable", "الطلبات، قابلة للتمرير")}
      className="h-60 w-72 rounded-md border border-border-neutral-primary bg-background-white"
    >
      <Lines />
    </ScrollArea>
  );
}

export function ScrollAreaHorizontal() {
  const t = useBi();
  return (
    <ScrollArea
      orientation="horizontal"
      label={t("Service shortcuts, scrollable", "اختصارات الخدمات، قابلة للتمرير")}
      className="w-full max-w-md rounded-md border border-border-neutral-primary bg-background-white"
    >
      <ul className="m-0 flex w-max list-none gap-3 p-3">
        {Array.from({ length: 12 }, (_, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: a static sample list
            key={i}
            className="flex h-20 w-32 items-center justify-center rounded-sm border border-border-neutral-primary text-md"
          >
            <Bi en={`Service ${i + 1}`} ar={`الخدمة ${i + 1}`} />
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export function ScrollAreaBoth() {
  const t = useBi();
  return (
    <ScrollArea
      orientation="both"
      label={t("Fees table, scrollable", "جدول الرسوم، قابل للتمرير")}
      className="h-60 w-full max-w-md rounded-md border border-border-neutral-primary bg-background-white"
    >
      <table className="w-max border-collapse text-md">
        <tbody>
          {Array.from({ length: 14 }, (_, r) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: a static sample table
            <tr key={r}>
              {Array.from({ length: 8 }, (_, c) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: a static sample table
                <td key={c} className="border border-border-neutral-primary px-4 py-2">
                  <Bi en={`Row ${r + 1}, column ${c + 1}`} ar={`صف ${r + 1}، عمود ${c + 1}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

export function ScrollAreaVisibility() {
  const t = useBi();
  return (
    <Row className="items-start gap-6">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm text-text-secondary-paragraph">
          <Bi en="On hover (default)" ar="عند التمرير بالمؤشر (الافتراضي)" />
        </p>
        <ScrollArea
          label={t("Hover scrollbar", "شريط يظهر عند التمرير بالمؤشر")}
          className="h-40 w-56 rounded-md border border-border-neutral-primary bg-background-white"
        >
          <Lines count={14} />
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm text-text-secondary-paragraph">
          <Bi en="Always visible" ar="ظاهر دائمًا" />
        </p>
        <ScrollArea
          visibility="always"
          label={t("Always visible scrollbar", "شريط ظاهر دائمًا")}
          className="h-40 w-56 rounded-md border border-border-neutral-primary bg-background-white"
        >
          <Lines count={14} />
        </ScrollArea>
      </div>
    </Row>
  );
}

/* ------------------------------------------------------------ Resizable */

function PaneText({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="flex size-full items-center justify-center p-4 text-center text-md">
      <Bi en={en} ar={ar} />
    </div>
  );
}

const FRAME =
  "h-56 w-full max-w-2xl overflow-hidden rounded-md border border-border-neutral-primary bg-background-white";

export function ResizableHorizontal() {
  const t = useBi();
  return (
    <div className={FRAME}>
      <ResizablePanelGroup>
        <ResizablePanel id="list" defaultSize="35%" minSize="20%" maxSize="60%">
          <PaneText en="Requests" ar="الطلبات" />
        </ResizablePanel>
        <ResizableHandle aria-label={t("Resize the requests panel", "تغيير حجم لوحة الطلبات")} />
        <ResizablePanel id="detail" defaultSize="65%" minSize="30%">
          <PaneText en="Request details" ar="تفاصيل الطلب" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export function ResizableVertical() {
  const t = useBi();
  return (
    <div className="h-72 w-full max-w-md overflow-hidden rounded-md border border-border-neutral-primary bg-background-white">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel id="top" defaultSize="40%" minSize="20%">
          <PaneText en="Summary" ar="الملخص" />
        </ResizablePanel>
        <ResizableHandle aria-label={t("Resize the summary", "تغيير حجم الملخص")} />
        <ResizablePanel id="bottom" defaultSize="60%" minSize="20%">
          <PaneText en="Activity" ar="النشاط" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export function ResizableHandleGrip() {
  const t = useBi();
  return (
    <div className={FRAME}>
      <ResizablePanelGroup>
        <ResizablePanel id="a" defaultSize="25%" minSize="15%">
          <PaneText en="Filters" ar="المرشحات" />
        </ResizablePanel>
        <ResizableHandle withHandle aria-label={t("Resize the filters", "تغيير حجم المرشحات")} />
        <ResizablePanel id="b" defaultSize="50%" minSize="20%">
          <PaneText en="Results" ar="النتائج" />
        </ResizablePanel>
        <ResizableHandle withHandle aria-label={t("Resize the results", "تغيير حجم النتائج")} />
        <ResizablePanel id="c" defaultSize="25%" minSize="15%">
          <PaneText en="Preview" ar="المعاينة" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export function ResizableCollapsible() {
  const t = useBi();
  return (
    <div className={FRAME}>
      <ResizablePanelGroup>
        <ResizablePanel id="nav" defaultSize="30%" minSize="20%" collapsible collapsedSize="0%">
          <PaneText
            en="Sections (Enter on the handle collapses it)"
            ar="الأقسام (Enter على المقبض يطويها)"
          />
        </ResizablePanel>
        <ResizableHandle withHandle aria-label={t("Resize the sections", "تغيير حجم الأقسام")} />
        <ResizablePanel id="content" defaultSize="70%" minSize="30%">
          <PaneText en="Content" ar="المحتوى" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export function ResizableSaved() {
  const t = useBi();
  return (
    <div className={FRAME}>
      <ResizablePanelGroup autoSaveId="docs-resizable-saved">
        <ResizablePanel id="left" defaultSize="50%" minSize="20%">
          <PaneText en="Drag, then reload: the size is kept" ar="اسحب ثم أعد التحميل: يبقى الحجم" />
        </ResizablePanel>
        <ResizableHandle withHandle aria-label={t("Resize", "تغيير الحجم")} />
        <ResizablePanel id="right" defaultSize="50%" minSize="20%">
          <PaneText en="Saved in this browser" ar="محفوظ في هذا المتصفح" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

/* --------------------------------------------------------- Aspect Ratio */

function Frame({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="m-0 text-sm text-text-secondary-paragraph">{label}</p>
      {children}
    </div>
  );
}

export function AspectRatioRatios() {
  return (
    <Row className="items-start gap-6">
      {[
        { ratio: 16 / 9, label: "16 / 9" },
        { ratio: 4 / 3, label: "4 / 3" },
        { ratio: 1, label: "1 / 1" },
      ].map(({ ratio, label }) => (
        <Frame key={label} label={<span dir="ltr">{label}</span>}>
          <AspectRatio
            ratio={ratio}
            data-testid={`ratio-${label.replace(/\s/g, "")}`}
            className="w-40 border border-border-neutral-primary bg-background-neutral-50"
          >
            <div className="flex size-full items-center justify-center text-md">
              <Bi en="Content" ar="المحتوى" />
            </div>
          </AspectRatio>
        </Frame>
      ))}
    </Row>
  );
}

export function AspectRatioFit() {
  const t = useBi();
  return (
    <Row className="items-start gap-6">
      {(["cover", "contain"] as const).map((fit) => (
        <Frame
          key={fit}
          label={
            fit === "cover" ? (
              <Bi en="Cover (crops)" ar="تغطية (تقصّ)" />
            ) : (
              <Bi en="Contain (whole image)" ar="احتواء (الصورة كاملة)" />
            )
          }
        >
          <AspectRatio
            ratio={16 / 9}
            fit={fit}
            className="w-56 border border-border-neutral-primary bg-background-neutral-50"
          >
            {/* biome-ignore lint/performance/noImgElement: a static sample */}
            <img src="/avatar-sample.svg" alt={t("A sample picture", "صورة توضيحية")} />
          </AspectRatio>
        </Frame>
      ))}
    </Row>
  );
}
