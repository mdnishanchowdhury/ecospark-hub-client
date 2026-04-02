"use client";

import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIdeas } from "@/services/ideas/idea.service";
import { getAllCategories } from "@/services/admin/category.services";
import { LayoutGrid, Sparkles } from "lucide-react";
import HeroSection from "@/components/modules/Hero/HeroSection";
import CommunityCollaboration from "@/components/modules/Hero/CommunityCollaboration";
import IdeaFilter from "./IdeaFilter";
import IdeaList from "./IdeaList";
import { getUserInfo } from "@/services/auth/getUserInfo";


export default function HomePage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { data: userRes } = useQuery({ queryKey: ['user'], queryFn: getUserInfo });
    const currentUserId = userRes?.id || (userRes as any)?.data?.id;

    const [filters, setFilters] = useState({
        searchTerm: "",
        categoryId: "",
        isPaid: undefined,
        page: 1,
        limit: 9,
    });

    const { data: ideaRes, isLoading } = useQuery<any>({
        queryKey: ["ideas", filters],
        queryFn: () => getIdeas(filters),
    });

    const { data: categoryRes } = useQuery<any>({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
    });

    const ideas = ideaRes?.data || [];
    const meta = ideaRes?.meta;
    const categories = categoryRes?.data || [];

    const handlePageChange = (newPage: number) => {
        setFilters((prev) => ({ ...prev, page: newPage }));

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <div className="min-h-screen">
            <HeroSection />

            <div ref={scrollRef} className="container mx-auto py-14 px-6 scroll-mt-20">

                {/* HEADER */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* Left */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
                            <Sparkles size={14} />
                            innovation hub
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Explore Ideas
                        </h1>
                        <p className="text-slate-500 text-sm max-w-md">
                            Discover eco-friendly solutions and sustainable innovations from the community.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                        <LayoutGrid size={16} className="text-indigo-500" />
                        <p className="text-slate-500 text-xs font-medium">
                            Showing{" "}
                            <span className="text-slate-900 font-semibold">
                                {ideas.length}
                            </span>{" "}
                            of{" "}
                            <span className="text-slate-900 font-semibold">
                                {meta?.total || 0}
                            </span>
                        </p>
                    </div>
                </div>

                {/* MAIN LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-[300px] shrink-0">
                        <IdeaFilter
                            filters={filters}
                            setFilters={setFilters as any}
                            categories={categories}
                        />
                    </aside>

                    <main className="flex-grow">
                        <IdeaList
                            ideas={ideas}
                            isLoading={isLoading}
                            currentUserId={currentUserId}
                            meta={meta}
                            onPageChange={handlePageChange}
                        />
                    </main>
                </div>
            </div>

            <CommunityCollaboration />
        </div>
    );
}