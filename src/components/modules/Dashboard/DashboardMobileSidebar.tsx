"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetTitle, SheetClose } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { Leaf, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/logoutUser";
import { UserInfo } from "@/types/auth.type";

interface DashboardMobileSidebarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo Section */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link href={dashboardHome} className="flex items-center gap-2.5">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Spark<span className="text-emerald-600">Hub</span>
          </span>
        </Link>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Navigation Area */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-7">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2">
              {section.title && (
                <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                          isActive
                            ? "bg-emerald-50 text-emerald-700 shadow-sm"
                            : "text-slate-500 active:bg-slate-50"
                        )}
                      >
                        <Icon className={cn("h-5 w-5", isActive ? "text-emerald-600" : "text-slate-400")} />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px] px-1.5 py-0",
                              isActive ? "border-emerald-200 text-emerald-600" : "text-slate-400"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-rose-50 px-4 py-4 text-sm font-bold text-rose-600 transition-all active:scale-[0.98] border border-rose-100 shadow-sm shadow-rose-100/50"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;