import { Menu, Zap, Trees, Leaf } from "lucide-react";
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

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");

  const menu = [
    { title: "Home", url: "/" },
    {
      title: "Solutions",
      url: "#",
      items: [
        {
          title: "Clean Energy",
          url: "/solutions/energy",
          icon: <Zap className="size-5" />,
          description: "Explore renewable energy ideas",
        },
        {
          title: "Environment",
          url: "/solutions/environment",
          icon: <Trees className="size-5" />,
          description: "Sustainability for a greener planet",
        },
      ],
    },
    { title: "Pricing", url: "/pricing" },
    { title: "Community", url: "/community" },
  ];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto">
        {/* DESKTOP */}
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
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[420px] lg:w-[500px] gap-3 p-4 md:grid-cols-2">
                            {item.items.map((subItem) => (
                              <li key={subItem.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.url}
                                    className="block p-3 rounded-md hover:bg-slate-100 transition"
                                  >
                                    <div className="flex items-center gap-2 font-medium">
                                      {subItem.icon} {subItem.title}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {subItem.description}
                                    </p>
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

        {/* MOBILE */}
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
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      {item.items ? (
                        <>
                          <AccordionTrigger>{item.title}</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.url}
                                className="py-2 text-sm"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </AccordionContent>
                        </>
                      ) : (
                        <div className="py-3 font-medium">
                          <Link href={item.url}>{item.title}</Link>
                        </div>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex flex-col gap-3 pt-6 border-t">
                  {accessToken ? (
                    <>
                      <DashboardLink />
                      <LogoutButton />
                    </>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full">Login</Button>
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