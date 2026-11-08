"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/registry/bases/base/ui/breadcrumb";
import { Button } from "@/registry/bases/base/ui/button";
import { Pagination } from "@/registry/bases/base/ui/pagination";
import { Stepper, StepperItem } from "@/registry/bases/base/ui/stepper";
import { TableOfContents } from "@/registry/bases/base/ui/table-of-contents";
import { Bi, useBi, useLanguage } from "./bi";
import { Row, Stack } from "./kit";

/** Digits in the preview's content language: Arabic-Indic in RTL, Western in LTR. */
export function useNumber() {
  const arabic = useLanguage() === "ar";
  return (value: number) =>
    arabic ? value.toLocaleString("ar-EG", { useGrouping: false }) : String(value);
}

// ------------------------------------------------------------------------------- Breadcrumb

export function BreadcrumbBasic() {
  const t = useBi();
  const levels = [
    [
      t("Home", "الرئيسية"),
      t("Services", "الخدمات"),
      t("Licences", "التراخيص"),
      t("Renewal", "التجديد"),
    ],
    [t("Home", "الرئيسية"), t("Services", "الخدمات"), t("Licences", "التراخيص")],
    [t("Home", "الرئيسية"), t("Services", "الخدمات")],
  ];
  return (
    <Stack>
      {levels.map((names, row) => (
        <Breadcrumb
          // biome-ignore lint/suspicious/noArrayIndexKey: static rows
          key={row}
          aria-label={t("Breadcrumb", "مسار التنقل")}
        >
          {names.map((name, index) =>
            index === names.length - 1 ? (
              <BreadcrumbItem key={name}>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={name}>
                <BreadcrumbLink href="#">{name}</BreadcrumbLink>
              </BreadcrumbItem>
            ),
          )}
        </Breadcrumb>
      ))}
    </Stack>
  );
}

export function BreadcrumbCollapsed() {
  const t = useBi();
  const names = [
    t("Home", "الرئيسية"),
    t("Services", "الخدمات"),
    t("Business", "الأعمال"),
    t("Licences", "التراخيص"),
    t("Commercial", "التجارية"),
    t("Renewal", "التجديد"),
    t("Request details", "تفاصيل الطلب"),
  ];
  return (
    <Breadcrumb
      aria-label={t("Breadcrumb", "مسار التنقل")}
      expandLabel={t("Show full path", "عرض المسار كاملًا")}
    >
      {names.map((name, index) => (
        <BreadcrumbItem key={name}>
          {index === names.length - 1 ? (
            <BreadcrumbPage>{name}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="#">{name}</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export function BreadcrumbCompact() {
  const t = useBi();
  return (
    <Breadcrumb compact aria-label={t("Breadcrumb", "مسار التنقل")}>
      {[t("Home", "الرئيسية"), t("Services", "الخدمات"), t("Renewal", "التجديد")].map(
        (name, index, all) => (
          <BreadcrumbItem key={name}>
            {index === all.length - 1 ? (
              <BreadcrumbPage>{name}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href="#">{name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ),
      )}
    </Breadcrumb>
  );
}

// ------------------------------------------------------------------------------- Pagination

function usePaginationLabels() {
  const t = useBi();
  const n = useNumber();
  return {
    "aria-label": t("Results pages", "صفحات النتائج"),
    previousLabel: t("Previous page", "الصفحة السابقة"),
    nextLabel: t("Next page", "الصفحة التالية"),
    pageLabel: (page: number) => t(`Page ${page}`, `الصفحة ${n(page)}`),
    compactLabel: (page: number, count: number) =>
      t(`${page} of ${count}`, `${n(page)} من ${n(count)}`),
    formatNumber: n,
  };
}

export function PaginationBasic() {
  const labels = usePaginationLabels();
  return (
    <Stack className="items-center">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Pagination key={size} size={size} pageCount={12} defaultPage={5} {...labels} />
      ))}
    </Stack>
  );
}

export function PaginationStates() {
  const labels = usePaginationLabels();
  const [page, setPage] = useState(1);
  return (
    <Stack className="items-center">
      <Row label={<Bi en="First page: previous is disabled" ar="الصفحة الأولى: السابق معطّل" />}>
        <Pagination pageCount={9} defaultPage={1} {...labels} />
      </Row>
      <Row label={<Bi en="Last page: next is disabled" ar="الصفحة الأخيرة: التالي معطّل" />}>
        <Pagination pageCount={9} defaultPage={9} {...labels} />
      </Row>
      <Row label={<Bi en="Controlled, with links" ar="بتحكّم خارجي وروابط" />}>
        <Pagination
          pageCount={20}
          page={page}
          onPageChange={setPage}
          getHref={(target) => `#page-${target}`}
          {...labels}
        />
      </Row>
      <Row label={<Bi en="Few pages: every number shows" ar="صفحات قليلة: تظهر كل الأرقام" />}>
        <Pagination pageCount={4} defaultPage={2} {...labels} />
      </Row>
    </Stack>
  );
}

// ------------------------------------------------------------------------------- Table of Content

export function TableOfContentsBasic() {
  const t = useBi();
  const sections = [
    { id: "toc-overview", title: t("Overview", "نظرة عامة"), level: 1 as const },
    { id: "toc-eligibility", title: t("Eligibility", "الأهلية"), level: 1 as const },
    { id: "toc-citizens", title: t("Citizens", "المواطنون"), level: 2 as const },
    { id: "toc-residents", title: t("Residents", "المقيمون"), level: 2 as const },
    {
      id: "toc-documents",
      title: t("Required documents", "المستندات المطلوبة"),
      level: 1 as const,
    },
    { id: "toc-copies", title: t("Certified copies", "النسخ المصدّقة"), level: 3 as const },
    { id: "toc-fees", title: t("Fees", "الرسوم"), level: 1 as const },
  ];
  return (
    <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
      <div className="md:sticky md:top-4 md:self-start">
        <TableOfContents title={t("On this page", "في هذه الصفحة")} items={sections} offset={32} />
      </div>
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            <h3 className="text-lg font-bold text-text-display">{section.title}</h3>
            <p className="mt-2 text-md text-text-primary-paragraph">
              <Bi
                en="Sample text for this section. Use the links to jump between sections."
                ar="نص تجريبي لهذا القسم. استخدم الروابط للانتقال بين الأقسام."
              />
            </p>
            <div className="h-24" />
          </section>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------- Stepper

function useSteps() {
  const t = useBi();
  return [
    { title: t("Details", "البيانات"), description: t("Your information", "معلوماتك") },
    { title: t("Documents", "المستندات"), description: t("Upload files", "ارفع الملفات") },
    { title: t("Review", "المراجعة"), description: t("Check and confirm", "تحقق وأكّد") },
    { title: t("Submit", "الإرسال"), description: t("Send the request", "أرسل الطلب") },
  ];
}

function useStepperLabels() {
  const t = useBi();
  const n = useNumber();
  return {
    "aria-label": t("Request progress", "تقدّم الطلب"),
    labels: {
      completed: t("completed", "مكتملة"),
      current: t("current step", "الخطوة الحالية"),
      upcoming: t("not started", "لم تبدأ"),
      error: t("has a problem", "فيها مشكلة"),
    },
    formatNumber: n,
    compactLabel: (step: number, total: number) =>
      t(`${step} of ${total}`, `${n(step)} من ${n(total)}`),
    nextLabel: t("Next:", "التالي:"),
  };
}

export function StepperHorizontal() {
  const steps = useSteps();
  const props = useStepperLabels();
  return (
    <Stack className="gap-10">
      {[0, 1, 3].map((value) => (
        <Stepper key={value} value={value} {...props}>
          {steps.map((step) => (
            <StepperItem key={step.title} title={step.title} description={step.description} />
          ))}
        </Stepper>
      ))}
    </Stack>
  );
}

export function StepperVertical() {
  const steps = useSteps();
  const props = useStepperLabels();
  const t = useBi();
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <Stepper orientation="vertical" value={2} {...props}>
        {steps.map((step) => (
          <StepperItem key={step.title} title={step.title} description={step.description} />
        ))}
      </Stepper>
      <Stepper orientation="vertical" value={2} {...props}>
        {steps.map((step, index) => (
          <StepperItem
            key={step.title}
            title={step.title}
            description={
              index === 1 ? t("A file is too large", "حجم الملف كبير") : step.description
            }
            status={index === 1 ? "error" : undefined}
          />
        ))}
      </Stepper>
    </div>
  );
}

export function StepperInteractive() {
  const steps = useSteps();
  const props = useStepperLabels();
  const [value, setValue] = useState(1);
  return (
    <Stack>
      <Stepper value={value} onValueChange={setValue} {...props}>
        {steps.map((step) => (
          <StepperItem key={step.title} title={step.title} description={step.description} />
        ))}
      </Stepper>
      <Row>
        <Button
          variant="outline"
          size="sm"
          disabled={value === 0}
          onClick={() => setValue((v) => Math.max(0, v - 1))}
        >
          <Bi en="Back" ar="رجوع" />
        </Button>
        <Button
          size="sm"
          disabled={value === steps.length - 1}
          onClick={() => setValue((v) => Math.min(steps.length - 1, v + 1))}
        >
          <Bi en="Continue" ar="متابعة" />
        </Button>
      </Row>
    </Stack>
  );
}
