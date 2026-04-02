import { Menu, Zap, Trees, Leaf, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";
import DashboardLink from "./DashboardLink";
import { getAllCategories } from "@/services/admin/category.services";

interface SubMenuItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  description?: string;
}

interface MainMenuItem {
  title: string;
  url: string;
  items?: SubMenuItem[];
}

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");

  const categoryRes = await getAllCategories();
  const categories = (categoryRes as any)?.data || [];

  const categoryMenuItems: SubMenuItem[] = categories.map((cat: any) => ({
    title: cat.name,
    url: `/menu-ideas?categoryId=${cat.id}`,
    icon: <Layers className="size-5" />,
    description: `Explore ideas in ${cat.name}`,
  }));

  const menu: MainMenuItem[] = [
    { title: "Home", url: "/" },
    {
      title: "Solutions",
      url: "#",
      items: categoryMenuItems,
    },
    { title: "Pricing", url: "/pricing" },
    { title: "Community", url: "/community" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* DESKTOP NAV */}
        <nav className="hidden h-14 items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Leaf className="size-6 text-emerald-600" />
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-emerald-600">Eco</span>Spark
              </span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[420px] lg:w-[500px] gap-3 p-4 md:grid-cols-2">
                            {item.items.map((subItem: SubMenuItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.url}
                                    className="block p-3 rounded-md hover:bg-slate-100 transition"
                                  >
                                    <div className="flex items-center gap-2 font-medium text-emerald-700">
                                      {subItem.icon} {subItem.title}
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link href={item.url} className={navigationMenuTriggerStyle()}>
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            {accessToken ? (
              <>
                <DashboardLink />
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* MOBILE NAV */}
        <div className="flex h-14 items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="size-6 text-emerald-600" />
            <span className="font-semibold">EcoSpark</span>
          </Link>

          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md border p-2 hover:bg-slate-100">
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2 border-b pb-4">
                  <Leaf className="size-5 text-emerald-600" /> EcoSpark
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 pt-6 px-5">
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      {item.items && item.items.length > 0 ? (
                        <>
                          <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2 pl-4">
                            {item.items.map((subItem: SubMenuItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.url}
                                className="py-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </AccordionContent>
                        </>
                      ) : (
                        <div className="py-4 border-b text-sm font-medium">
                          <Link href={item.url} className="block w-full">{item.title}</Link>
                        </div>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex flex-col gap-3 pt-6">
                  {accessToken ? (
                    <div className="space-y-3">
                      <DashboardLink />
                      <LogoutButton />
                    </div>
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button className="w-full bg-emerald-600">Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;