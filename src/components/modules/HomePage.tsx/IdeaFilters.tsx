"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X, Filter, CircleDollarSign, LayoutGrid } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";

interface IdeaFiltersProps {
    categoryId?: string;
    isPaid?: string;
    searchTerm?: string;
}

export default function IdeaFilters({ categoryId, isPaid, searchTerm }: IdeaFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const updateQueryParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "all" && value !== "") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSearch = useDebouncedCallback((term: string) => updateQueryParams("searchTerm", term), 400);

    const hasFilters = !!(searchTerm || (categoryId && categoryId !== 'all') || isPaid);

    return (
        <div className="w-full mb-10 space-y-4">
            
            <div className="flex flex-col lg:flex-row gap-4 items-center bg-white/80 backdrop-blur-md p-2 lg:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300">

                <div className="relative w-full lg:flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <Input
                        placeholder="Search innovative eco-ideas..."
                        className="pl-12 h-14 bg-slate-50/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-500/20 text-slate-700 placeholder:text-slate-400 transition-all"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchTerm}
                    />
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto px-2 lg:px-0">

                    {/* Custom Select Wrapper */}
                    <div className="relative flex-1 lg:flex-none">
                        <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        <select
                            className="h-14 pl-10 pr-8 rounded-xl border-none bg-slate-50/50 text-sm font-semibold text-slate-600 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer appearance-none min-w-[140px] w-full"
                            onChange={(e) => updateQueryParams("isPaid", e.target.value)}
                            value={isPaid || "all"}
                            suppressHydrationWarning
                        >
                            <option value="all">Pricing: All</option>
                            <option value="true">Paid Only</option>
                            <option value="false">Free Access</option>
                        </select>
                    </div>

                    {/* Reset Button - Stylish & Subtle */}
                    {hasFilters && (
                        <Button
                            variant="outline"
                            onClick={() => router.push(pathname)}
                            className="h-14 px-6 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-slate-500 font-medium transition-all duration-200 group"
                        >
                            <X size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
                            Reset
                        </Button>
                    )}

                    {/* Filter Icon for visual balance */}
                    <div className="hidden lg:flex items-center justify-center h-14 w-14 rounded-xl bg-emerald-50 text-emerald-600">
                        <Filter size={20} />
                    </div>
                </div>
            </div>

            {/* Active Filter Chips */}
            {hasFilters && (
                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Active Filters:</span>
                    {searchTerm && (
                        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            "{searchTerm}" <X size={12} className="ml-1 cursor-pointer" onClick={() => updateQueryParams("searchTerm", null)} />
                        </div>
                    )}
                    {isPaid && (
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            {isPaid === "true" ? "Paid Only" : "Free Only"} <X size={12} className="ml-1 cursor-pointer" onClick={() => updateQueryParams("isPaid", null)} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}