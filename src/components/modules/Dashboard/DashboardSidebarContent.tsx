"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";
import { Leaf, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/lib/logoutUser";
import { UserInfo } from "@/types/auth.type";

interface DashboardSidebarContentProps {
    userInfo: UserInfo;
    navItems: NavSection[];
    dashboardHome: string;
}

function DashboardSidebarContent({
    dashboardHome,
    navItems,
    userInfo,
}: DashboardSidebarContentProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <div className="hidden md:flex h-full w-64 flex-col border-r border-slate-200 bg-[#0d4e42] text-white"
            suppressHydrationWarning
        >
            {/* Logo Section */}
            <div className="flex h-20 items-center border-b border-slate-100 px-6">
                <Link href={dashboardHome} className="flex items-center gap-1 group">
                    <div className=" p-1.5 rounded-lg transition-transform group-hover:rotate-12">
                        <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-600 transition-colors">
                        <span className="text-emerald-600">Eco</span>Spark
                    </span>
                </Link>
            </div>

            <ScrollArea className="flex-1 px-4 py-6">
                <nav className="space-y-8">
                    {navItems.map((section, sectionId) => (
                        <div key={sectionId} className="space-y-2">
                            {section.title && (
                                <h4 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                                    {section.title}
                                </h4>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item, id) => {
                                    const isActive = pathname === item.href;
                                    const Icon = getIconComponent(item.icon);
                                    return (
                                        <Link
                                            href={item.href}
                                            key={id}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-[#078d60] text-emerald-700"
                                                    : "text-slate-500 hover:bg-[#078d60] hover:text-slate-900"
                                            )}
                                        >
                                            <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white")} />
                                            <span className="text-white">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* Logout Footer Section */}
            <div className="p-4 border-t border-slate-100 bg-[#0d4e42]">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-rose-600 transition-all duration-200 bg-emerald-50 hover:bg-rose-50 hover:text-rose-700 group border border-transparent hover:border-rose-100 shadow-sm hover:shadow-none"
                >
                    <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

export default DashboardSidebarContent;