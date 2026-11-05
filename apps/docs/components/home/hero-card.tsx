"use client";

import {
  Moon02Icon,
  Sun03Icon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/shell/icon";
import { getDictionary, type Key, translate } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { dirOf } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { ContentSwitcher, ContentSwitcherItem } from "@/registry/bases/base/ui/content-switcher";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/registry/bases/base/ui/field";
import { InlineAlert } from "@/registry/bases/base/ui/inline-alert";
import { Input } from "@/registry/bases/base/ui/input";
import { Link } from "@/registry/bases/base/ui/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/base/ui/select";
import { Switch } from "@/registry/bases/base/ui/switch";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

type Mode = "light" | "dark";

/** A group of two options on the registry Content Switcher. */
function Switcher<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; icon: IconSvgElement }[];
  onChange: (value: T) => void;
}) {
  return (
    <ContentSwitcher
      size="sm"
      aria-label={label}
      value={value}
      onValueChange={(next) => onChange(next as T)}
    >
      {options.map((o) => (
        <ContentSwitcherItem key={o.value} value={o.value}>
          <Icon icon={o.icon} />
          {o.label}
        </ContentSwitcherItem>
      ))}
    </ContentSwitcher>
  );
}

/**
 * A government service form in English or Arabic, light or dark, switched in place. Every
 * visible control is a registry component (Field, Input, Select, Switch, Tag, Inline Alert,
 * Button). The card opens in the page language and the whole card, status text and calls to
 * action included, follows the language switch: one language per view, never a mix. The panel
 * carries its own `dir` and `data-theme`, so only the card changes, not the page around it.
 */
export function HeroCard() {
  const { resolvedTheme } = useTheme();
  const { lang: pageLang } = useLocale();
  const t = useT();
  const [cardLang, setCardLang] = useState<Locale>(pageLang);
  const [chosen, setChosen] = useState<Mode | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const mode: Mode = chosen ?? (mounted && resolvedTheme === "dark" ? "dark" : "light");
  const dir = dirOf(cardLang);
  const dictionary = getDictionary(cardLang);
  const c = (key: Key) => translate(dictionary, key);
  const districts = [c("hero.card.district1"), c("hero.card.district2"), c("hero.card.district3")];
  const items = districts.map((label, i) => ({ value: String(i + 1), label }));

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Switcher
          label={t("hero.language")}
          value={cardLang}
          onChange={setCardLang}
          options={[
            { value: "en", label: t("hero.lang.en"), icon: TextAlignLeftIcon },
            { value: "ar", label: t("hero.lang.ar"), icon: TextAlignRightIcon },
          ]}
        />
        <Switcher
          label={t("hero.theme")}
          value={mode}
          onChange={setChosen}
          options={[
            { value: "light", label: t("preview.light"), icon: Sun03Icon },
            { value: "dark", label: t("preview.dark"), icon: Moon02Icon },
          ]}
        />
      </div>

      <div
        data-theme={mode}
        dir={dir}
        lang={cardLang}
        className={cn(
          mode === "dark" && "dark",
          "flex flex-col gap-6 rounded-lg border border-border-neutral-secondary bg-background-card p-6 text-text-default",
          mode === "light" && "shadow-md",
        )}
      >
        <header className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="t-h3 text-text-display">{c("hero.card.title")}</h2>
            <p className="text-sm text-text-primary-paragraph">{c("hero.card.intro")}</p>
          </div>
          <StatusTag variant="success" size="sm">
            {c("hero.card.status")}
          </StatusTag>
        </header>

        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
          key={cardLang}
        >
          <Field name="building">
            <FieldLabel>{c("hero.card.building")}</FieldLabel>
            <Input inputMode="numeric" defaultValue={c("hero.card.buildingValue")} />
            <FieldDescription>{c("hero.card.buildingHint")}</FieldDescription>
          </Field>
          <Field name="postal">
            <FieldLabel>{c("hero.card.postal")}</FieldLabel>
            <Input inputMode="numeric" defaultValue={c("hero.card.postalValue")} />
          </Field>
          <Field name="district" className="sm:col-span-2">
            <FieldLabel>{c("hero.card.district")}</FieldLabel>
            <Select items={items} defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder={c("hero.card.districtPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field orientation="horizontal" className="items-center justify-between sm:col-span-2">
            <FieldContent>
              <FieldLabel>{c("hero.card.sms")}</FieldLabel>
            </FieldContent>
            <Switch name="sms" defaultChecked />
          </Field>
          <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
            <Tag variant="neutral" size="sm">
              {c("hero.card.tag1")}
            </Tag>
            <Tag variant="neutral" outlined size="sm">
              {c("hero.card.tag2")}
            </Tag>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-neutral-secondary pt-4 sm:col-span-2">
            <span className="text-[0.8125rem] text-text-secondary-paragraph">
              {c("hero.card.reference")}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" type="button">
                {c("hero.card.draft")}
              </Button>
              <Button type="submit">{c("hero.card.submit")}</Button>
            </div>
          </div>
        </form>

        <InlineAlert
          variant="success"
          title={c("hero.card.noticeTitle")}
          actions={
            <Link href={`/${pageLang}/docs/components/inline-alert`} size="sm" className="w-fit">
              {c("hero.card.track")}
            </Link>
          }
        >
          {c("hero.card.noticeBody")}
        </InlineAlert>
      </div>
      <p className="text-[0.8125rem] text-text-secondary-paragraph">{t("hero.note")}</p>
    </div>
  );
}
