"use client";

import {
  Calendar01Icon,
  File01Icon,
  Folder01Icon,
  HelpCircleIcon,
  Home01Icon,
  InboxIcon,
  Settings01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/bases/base/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/bases/base/ui/navigation-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuCollapsibleContent,
  SidebarMenuCollapsibleTrigger,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/registry/bases/base/ui/sidebar";
import { Bi, useBi } from "./bi";
import { Row } from "./kit";

/* -------------------------------------------------------------- Menubar */

export function MenubarBasic() {
  const t = useBi();
  return (
    <div className="flex min-h-72 items-start justify-center pt-6">
      <Menubar aria-label={t("Document", "المستند")}>
        <MenubarMenu>
          <MenubarTrigger>
            <Bi en="File" ar="ملف" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="New request" ar="طلب جديد" />
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Bi en="Open" ar="فتح" />
              <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>
                <Bi en="Share" ar="مشاركة" />
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <Bi en="By email" ar="بالبريد الإلكتروني" />
                </MenubarItem>
                <MenubarItem>
                  <Bi en="Copy link" ar="نسخ الرابط" />
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              <Bi en="Print" ar="طباعة" />
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Bi en="Edit" ar="تحرير" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="Undo" ar="تراجع" />
              <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Bi en="Redo" ar="إعادة" />
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Bi en="View" ar="عرض" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="Zoom in" ar="تكبير" />
              <MenubarShortcut>⌘+</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Bi en="Zoom out" ar="تصغير" />
              <MenubarShortcut>⌘-</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export function MenubarGroups() {
  const t = useBi();
  const [bookmarks, setBookmarks] = useState(true);
  const [view, setView] = useState("list");
  return (
    <div className="flex min-h-72 items-start justify-center pt-6">
      <Menubar aria-label={t("View options", "خيارات العرض")}>
        <MenubarMenu>
          <MenubarTrigger>
            <Bi en="View" ar="عرض" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              <Bi en="Show bookmarks" ar="إظهار الإشارات المرجعية" />
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>
                <Bi en="Layout" ar="التخطيط" />
              </MenubarLabel>
              <MenubarRadioGroup value={view} onValueChange={setView}>
                <MenubarRadioItem value="list">
                  <Bi en="List" ar="قائمة" />
                </MenubarRadioItem>
                <MenubarRadioItem value="grid">
                  <Bi en="Grid" ar="شبكة" />
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export function MenubarStates() {
  const t = useBi();
  return (
    <div className="flex min-h-72 items-start justify-center pt-6">
      <Menubar aria-label={t("States", "الحالات")} modal={false}>
        <MenubarMenu defaultOpen>
          <MenubarTrigger>
            <Bi en="Open" ar="مفتوحة" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="Enabled item" ar="عنصر مفعّل" />
            </MenubarItem>
            <MenubarItem disabled>
              <Bi en="Disabled item" ar="عنصر معطّل" />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Bi en="Closed" ar="مغلقة" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="Item" ar="عنصر" />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled>
            <Bi en="Disabled" ar="معطّلة" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Bi en="Item" ar="عنصر" />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

/* ------------------------------------------------------- Navigation Menu */

function ServicesPanel() {
  return (
    <NavigationMenuContent>
      <ul className="m-0 grid list-none gap-1 p-0">
        <li>
          <NavigationMenuLink href="#civil">
            <NavigationMenuLinkTitle>
              <Bi en="Civil affairs" ar="الأحوال المدنية" />
            </NavigationMenuLinkTitle>
            <NavigationMenuLinkDescription>
              <Bi
                en="Identity cards, passports and certificates."
                ar="الهويات وجوازات السفر والشهادات."
              />
            </NavigationMenuLinkDescription>
          </NavigationMenuLink>
        </li>
        <li>
          <NavigationMenuLink href="#traffic" active>
            <NavigationMenuLinkTitle>
              <Bi en="Traffic" ar="المرور" />
            </NavigationMenuLinkTitle>
            <NavigationMenuLinkDescription>
              <Bi en="Licences, vehicles and fines." ar="الرخص والمركبات والمخالفات." />
            </NavigationMenuLinkDescription>
          </NavigationMenuLink>
        </li>
        <li>
          <NavigationMenuLink href="#business">
            <NavigationMenuLinkTitle>
              <Bi en="Business" ar="الأعمال" />
            </NavigationMenuLinkTitle>
            <NavigationMenuLinkDescription>
              <Bi en="Commercial registers and permits." ar="السجلات التجارية والتراخيص." />
            </NavigationMenuLinkDescription>
          </NavigationMenuLink>
        </li>
      </ul>
    </NavigationMenuContent>
  );
}

export function NavigationMenuBasic() {
  const t = useBi();
  return (
    <div className="flex min-h-72 items-start justify-center pt-6">
      <NavigationMenu aria-label={t("Main", "الرئيسية")}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink variant="bar" href="#home" active>
              <Bi en="Home" ar="الرئيسية" />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Bi en="Services" ar="الخدمات" />
            </NavigationMenuTrigger>
            <ServicesPanel />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Bi en="About" ar="عن المنصة" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="m-0 grid list-none gap-1 p-0">
                <li>
                  <NavigationMenuLink href="#news">
                    <NavigationMenuLinkTitle>
                      <Bi en="News" ar="الأخبار" />
                    </NavigationMenuLinkTitle>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#contact">
                    <NavigationMenuLinkTitle>
                      <Bi en="Contact us" ar="تواصل معنا" />
                    </NavigationMenuLinkTitle>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function NavigationMenuLinks() {
  const t = useBi();
  return (
    <Row>
      <NavigationMenu aria-label={t("Sections", "الأقسام")} viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink variant="bar" href="#home" active>
              <Bi en="Current page" ar="الصفحة الحالية" />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink variant="bar" href="#other">
              <Bi en="Link" ar="رابط" />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink variant="bar" href="#disabled" aria-disabled="true">
              <Bi en="Disabled" ar="معطّل" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Row>
  );
}

export function NavigationMenuOpen() {
  const t = useBi();
  return (
    <div className="flex min-h-96 items-start justify-center pt-6">
      <NavigationMenu aria-label={t("Main", "الرئيسية")} defaultValue="services">
        <NavigationMenuList>
          <NavigationMenuItem value="services">
            <NavigationMenuTrigger>
              <Bi en="Services" ar="الخدمات" />
            </NavigationMenuTrigger>
            <ServicesPanel />
          </NavigationMenuItem>
          <NavigationMenuItem value="about">
            <NavigationMenuTrigger>
              <Bi en="About" ar="عن المنصة" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#news">
                <NavigationMenuLinkTitle>
                  <Bi en="News" ar="الأخبار" />
                </NavigationMenuLinkTitle>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

/* -------------------------------------------------------------- Sidebar */

/** A framed page with the sidebar and some content, so the preview does not fill the docs page. */
function Frame({
  children,
  className = "h-96",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-md border border-border-neutral-primary ${className}`}>
      {children}
    </div>
  );
}

function Page({ trigger = true }: { trigger?: boolean }) {
  const t = useBi();
  return (
    <SidebarInset className="gap-3 p-4">
      <div className="flex items-center gap-2">
        {trigger ? <SidebarTrigger label={t("Toggle sidebar", "تبديل الشريط الجانبي")} /> : null}
        <h3 className="m-0 text-lg font-bold text-text-display">
          <Bi en="Traffic services" ar="خدمات المرور" />
        </h3>
      </div>
      <p className="m-0 text-md text-text-primary-paragraph">
        <Bi
          en="The page sits beside the sidebar and takes the space it leaves."
          ar="تقع الصفحة بجوار الشريط الجانبي وتأخذ المساحة التي يتركها."
        />
      </p>
    </SidebarInset>
  );
}

function Items({ withBadge = false }: { withBadge?: boolean }) {
  const t = useBi();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={t("Home", "الرئيسية")} render={<a href="#home" />}>
          <HugeiconsIcon icon={Home01Icon} aria-hidden />
          <span>
            <Bi en="Home" ar="الرئيسية" />
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive
          tooltip={t("Requests", "الطلبات")}
          render={<a href="#requests" />}
        >
          <HugeiconsIcon icon={InboxIcon} aria-hidden />
          <span>
            <Bi en="Requests" ar="الطلبات" />
          </span>
          {withBadge ? <SidebarMenuBadge>12</SidebarMenuBadge> : null}
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={t("Appointments", "المواعيد")}
          render={<a href="#appointments" />}
        >
          <HugeiconsIcon icon={Calendar01Icon} aria-hidden />
          <span>
            <Bi en="Appointments" ar="المواعيد" />
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function Brand() {
  return (
    <SidebarHeader>
      <div className="flex items-center gap-2 px-2 font-bold text-text-display">
        <HugeiconsIcon
          icon={Folder01Icon}
          aria-hidden
          className="size-6 shrink-0 text-icon-primary"
        />
        <span className="in-data-[collapsible=icon]:sr-only">
          <Bi en="Platform Code" ar="كود المنصات" />
        </span>
      </div>
    </SidebarHeader>
  );
}

function Account() {
  const t = useBi();
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={t("Help", "المساعدة")} render={<a href="#help" />}>
            <HugeiconsIcon icon={HelpCircleIcon} aria-hidden />
            <span>
              <Bi en="Help" ar="المساعدة" />
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export function SidebarBasic() {
  const t = useBi();
  return (
    <Frame>
      <SidebarProvider persist={false} className="h-full">
        <Sidebar
          aria-label={t("Main navigation", "التنقل الرئيسي")}
          collapsible="none"
          className="h-full"
        >
          <Brand />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Bi en="Services" ar="الخدمات" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Items withBadge />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <Account />
        </Sidebar>
        <Page trigger={false} />
      </SidebarProvider>
    </Frame>
  );
}

export function SidebarNested() {
  const t = useBi();
  return (
    <Frame className="h-[28rem]">
      <SidebarProvider persist={false} className="h-full">
        <Sidebar
          aria-label={t("Main navigation", "التنقل الرئيسي")}
          collapsible="none"
          className="h-full"
        >
          <Brand />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Bi en="Menu" ar="القائمة" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuCollapsible defaultOpen>
                      <SidebarMenuCollapsibleTrigger>
                        <HugeiconsIcon icon={File01Icon} aria-hidden />
                        <span className="me-auto">
                          <Bi en="Documents" ar="المستندات" />
                        </span>
                      </SidebarMenuCollapsibleTrigger>
                      <SidebarMenuCollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton render={<a href="#drafts" />}>
                              <Bi en="Drafts" ar="المسودات" />
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton isActive render={<a href="#sent" />}>
                              <Bi en="Sent" ar="المرسلة" />
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuCollapsibleContent>
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuCollapsible>
                      <SidebarMenuCollapsibleTrigger>
                        <HugeiconsIcon icon={Settings01Icon} aria-hidden />
                        <span className="me-auto">
                          <Bi en="Settings" ar="الإعدادات" />
                        </span>
                      </SidebarMenuCollapsibleTrigger>
                      <SidebarMenuCollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton render={<a href="#profile" />}>
                              <Bi en="Profile" ar="الملف الشخصي" />
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton render={<a href="#privacy" />}>
                              <Bi en="Privacy" ar="الخصوصية" />
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuCollapsibleContent>
                    </SidebarMenuCollapsible>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#account" />}>
                      <HugeiconsIcon icon={User02Icon} aria-hidden />
                      <span>
                        <Bi en="Account" ar="الحساب" />
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <Page trigger={false} />
      </SidebarProvider>
    </Frame>
  );
}

function Collapsing({
  collapsible,
  defaultOpen = true,
  side = "start",
  persist = false,
  cookieName,
}: {
  collapsible: "icon" | "offcanvas";
  defaultOpen?: boolean;
  side?: "start" | "end";
  persist?: boolean;
  cookieName?: string;
}) {
  const t = useBi();
  return (
    <Frame>
      <SidebarProvider
        defaultOpen={defaultOpen}
        persist={persist}
        cookieName={cookieName}
        className="h-full"
      >
        <Sidebar
          aria-label={t("Main navigation", "التنقل الرئيسي")}
          collapsible={collapsible}
          side={side}
          mobileTitle={t("Navigation", "التنقل")}
          mobileDescription={t("The main navigation.", "التنقل الرئيسي.")}
          closeLabel={t("Close", "إغلاق")}
          className="h-full"
        >
          <Brand />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Bi en="Services" ar="الخدمات" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Items withBadge />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <Account />
        </Sidebar>
        <Page />
      </SidebarProvider>
    </Frame>
  );
}

export function SidebarIcon() {
  return <Collapsing collapsible="icon" />;
}

export function SidebarRail() {
  return <Collapsing collapsible="icon" defaultOpen={false} />;
}

export function SidebarOffcanvas() {
  return <Collapsing collapsible="offcanvas" />;
}

export function SidebarEnd() {
  return <Collapsing collapsible="icon" side="end" />;
}

export function SidebarPersisted() {
  return <Collapsing collapsible="icon" persist cookieName="dga_docs_sidebar" />;
}

export function SidebarMobile() {
  const t = useBi();
  return (
    <div className="flex min-h-40 items-center justify-center">
      <SidebarProvider persist={false} mobileBreakpoint={100000} className="w-auto">
        <SidebarTrigger variant="secondary" label={t("Open navigation", "فتح التنقل")} />
        <Sidebar
          aria-label={t("Main navigation", "التنقل الرئيسي")}
          mobileTitle={t("Navigation", "التنقل")}
          mobileDescription={t("The main navigation.", "التنقل الرئيسي.")}
          closeLabel={t("Close", "إغلاق")}
        >
          <Brand />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <Bi en="Services" ar="الخدمات" />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Items />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <Account />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
