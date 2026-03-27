"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Menu, Search, Settings, HelpCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavSection } from "@/types/dashboard.types";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { cn } from "@/lib/utils";
import { UserInfo } from "@/types/auth.type";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm"
        : "bg-white border-b border-slate-200"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8 relative">

        {isMobileSearchOpen && (
          <div className="absolute inset-0 z-50 flex items-center bg-white px-4 md:hidden">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                autoFocus
                type="search"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 text-slate-400"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* LEFT: Menu & Mobile Trigger */}
        <div className={cn("flex items-center gap-2", isMobileSearchOpen && "opacity-0")}>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                <Menu className="h-5 w-5 text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || "/dashboard"}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* CENTER SEARCH: Desktop Only */}
        <div className="flex-1 hidden md:flex justify-center px-4">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-11 pl-11 pr-4 bg-slate-50/50 border border-slate-200 rounded-xl text-[14px] placeholder:text-slate-400 focus:bg-white focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
            />
          </div>
        </div>

        <div className={cn("flex items-center gap-2 md:gap-3", isMobileSearchOpen && "opacity-0")}>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-500"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Help + Settings Hidden on Mobile */}
          <div className="hidden sm:flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-emerald-600">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-emerald-600">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Notification */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5 text-slate-600" />
            </Button>
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="hidden md:block h-6 w-px bg-slate-200 mx-1" />

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="hidden lg:block text-right leading-tight">
              <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {userInfo.name}
              </p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                {userInfo.role}
              </p>
            </div>
            <UserDropdown userInfo={userInfo} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;