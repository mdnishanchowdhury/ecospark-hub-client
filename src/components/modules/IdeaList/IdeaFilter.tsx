"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
    Search,
    RotateCcw,
    Leaf,
    Zap,
    Globe,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

interface FilterState {
    searchTerm: string;
    categoryId: string;
    isPaid: boolean | string | undefined;
    page: number;
    limit: number;
}

interface IdeaFilterProps {
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
    categories: any[];
}

export default function IdeaFilter({
    filters,
    setFilters,
    categories,
}: IdeaFilterProps) {
    const [showAll, setShowAll] = useState(false);

    const resetFilters = () => {
        setFilters({
            searchTerm: "",
            categoryId: "",
            isPaid: undefined,
            page: 1,
            limit: 9,
        });
    };

    const displayedCategories = showAll
        ? categories
        : categories?.slice(0, 6);

    return (
        <div className="w-full sticky top-24">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Leaf className="text-emerald-600" size={18} />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Filters
                        </h2>
                    </div>

                    <button
                        onClick={resetFilters}
                        className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>

                <div className="p-6 space-y-8">

                    {/* Search */}
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400 font-medium flex items-center gap-2">
                            <Search size={14} /> Search
                        </label>

                        <input
                            type="text"
                            placeholder="Search ideas..."
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                            value={filters.searchTerm}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    searchTerm: e.target.value,
                                    page: 1,
                                }))
                            }
                        />
                    </div>

                    {/* Categories */}
                    <div className="space-y-3">
                        <label className="text-xs text-slate-400 font-medium flex items-center gap-2">
                            <Globe size={14} /> Categories
                        </label>

                        <div className="flex flex-col gap-1">

                            {/* All Ideas */}
                            <button
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        categoryId: "",
                                        page: 1,
                                    }))
                                }
                                className={`w-full px-4 py-2.5 rounded-lg text-sm text-left transition
                ${filters.categoryId === ""
                                        ? "bg-indigo-50 text-indigo-600 font-medium"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                All Ideas
                            </button>

                            {/* Dynamic Categories */}
                            {displayedCategories?.map((cat) => {
                                const active = filters.categoryId === cat.id;

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                categoryId: cat.id,
                                                page: 1,
                                            }))
                                        }
                                        className={`w-full px-4 py-2.5 rounded-lg text-sm flex justify-between items-center transition
                    ${active
                                                ? "bg-indigo-50 text-indigo-600 font-medium"
                                                : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span>{cat.name}</span>

                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-md
                      ${active
                                                    ? "bg-indigo-100 text-indigo-600"
                                                    : "bg-slate-100 text-slate-400"
                                                }`}
                                        >
                                            {cat._count?.ideas || 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Show More */}
                        {categories?.length > 6 && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-xs text-indigo-500 flex items-center gap-1 mt-2"
                            >
                                {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                {showAll ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>

                    {/*  Access */}
                    <div className="space-y-3">
                        <label className="text-xs text-slate-400 font-medium flex items-center gap-2">
                            <Zap size={14} /> Access
                        </label>

                        <div className="flex gap-2">
                            {[
                                { label: "Free", value: "false" },
                                { label: "Premium", value: "true" },
                            ].map((opt) => {
                                const active = filters.isPaid === opt.value;

                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                isPaid:
                                                    prev.isPaid === opt.value
                                                        ? undefined
                                                        : opt.value,
                                                page: 1,
                                            }))
                                        }
                                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition
                    ${active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}