"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Globe, Search, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityCard from "./CommunityCard";


const forumPosts = [
    {
        id: 1,
        author: "arif hassan",
        role: "eco-architect",
        title: "optimizing solar panel placement for urban apartments",
        tags: ["energy", "urban"],
        likes: 24,
        replies: 8,
        time: "2h ago"
    },
    {
        id: 2,
        author: "sarah islam",
        role: "sustainability lead",
        title: "reducing plastic waste in local supply chains",
        tags: ["waste", "supply-chain"],
        likes: 42,
        replies: 15,
        time: "5h ago"
    },
    {
        id: 3,
        author: "ryan spark",
        role: "full-stack dev",
        title: "open-sourcing the ecospark carbon tracker api",
        tags: ["software", "api"],
        likes: 89,
        replies: 32,
        time: "1d ago"
    }
];

export default function CommunityPage() {
    return (
        <div className="bg-[#fafbfc] min-h-screen pt-28 pb-20 px-6 flex flex-col items-center">
            <div className="max-w-6xl w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="space-y-4 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest lowercase"
                        >
                            <Users size={12} />
                            global network
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter lowercase leading-[0.9]">
                            the <span className="text-emerald-500 font-serif italic">spark</span> community
                        </h1>
                        <p className="text-slate-400 font-medium lowercase text-lg leading-relaxed">
                            connect with thousands of eco-innovators, share your insights, and collaborate on the next big green revolution.
                        </p>
                    </div>

                    <Button className="bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl h-14 px-8 font-black transition-all lowercase gap-2 shadow-xl shadow-slate-200">
                        <PlusCircle size={20} />
                        start a discussion
                    </Button>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
                    <div className="relative w-full md:flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <Input
                            placeholder="search discussions, people or tags..."
                            className="pl-12 h-14 bg-white border-slate-100 rounded-2xl shadow-sm focus-visible:ring-emerald-500/10 focus-visible:border-emerald-200 lowercase font-medium"
                        />
                    </div>
                    <Tabs defaultValue="all" className="w-full md:w-auto">
                        <TabsList className="h-14 bg-white border border-slate-100 rounded-2xl px-2 shadow-sm">
                            <TabsTrigger value="all" className="rounded-xl px-6 lowercase font-bold data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600">all sparks</TabsTrigger>
                            <TabsTrigger value="trending" className="rounded-xl px-6 lowercase font-bold data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600">trending</TabsTrigger>
                            <TabsTrigger value="following" className="rounded-xl px-6 lowercase font-bold data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600">following</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {forumPosts.map((post, i) => (
                            <CommunityCard key={post.id} post={post} index={i} />
                        ))}
                    </div>

                    {/* Sidebar / Trending Stats */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest lowercase flex items-center gap-2">
                                <Globe size={16} className="text-emerald-500" />
                                community stats
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">12.4k</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase lowercase">members</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">856</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase lowercase">active ideas</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <MessageSquare size={160} />
                            </div>
                            <h3 className="text-xl font-black lowercase mb-2">weekly newsletter</h3>
                            <p className="text-emerald-100 text-sm lowercase leading-relaxed mb-6">get the most impactful sparks delivered to your inbox every monday.</p>
                            <Input placeholder="your email" className="bg-emerald-700/50 border-emerald-400 placeholder:text-emerald-300 rounded-xl mb-3 lowercase" />
                            <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black rounded-xl lowercase transition-colors">subscribe</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}