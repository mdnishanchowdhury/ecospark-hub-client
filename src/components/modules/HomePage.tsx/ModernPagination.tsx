"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function ExactImagePagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex items-center gap-1.5 p-1 bg-white">
            {/* prev button */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-[45px] h-[45px] flex items-center justify-center text-slate-300 bg-slate-100 rounded-[10px] disabled:opacity-100 disabled:cursor-not-allowed transition-colors hover:bg-slate-200"
            >
                <ChevronLeft size={24} />
            </button>

            {/* dynamic page numbers */}
            <div className="flex items-center gap-1.5">
                {pages.map((page) => {
                    const isActive = currentPage === page;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-[45px] h-[45px] flex items-center justify-center rounded-[10px] text-lg font-extrabold transition-all duration-300 border-2 ${isActive
                                ? "border-indigo-600 bg-white text-indigo-700"
                                : "border-slate-100 bg-white text-slate-800 hover:border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* next button */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                suppressHydrationWarning
                className="w-[45px] h-[45px] flex items-center justify-center text-slate-300 bg-white border-2 border-slate-100 rounded-[10px] disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-slate-50"
            >
                <ChevronRight size={24} />
            </button>
        </nav>
    );
}