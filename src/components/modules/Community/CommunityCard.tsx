"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityCard({ post, index }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all flex flex-col md:flex-row items-start gap-6 cursor-pointer"
        >
            <Avatar className="w-12 h-12 border-2 border-slate-100">
                <AvatarFallback className="bg-emerald-50 text-emerald-600 font-bold lowercase">
                    {post.author[0]}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-slate-800 lowercase tracking-tight">{post.author}</span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest lowercase">• {post.time}</span>
                    <Badge variant="secondary" className="bg-slate-50 text-slate-400 text-[9px] font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors lowercase px-2">
                        {post.role}
                    </Badge>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors lowercase tracking-tight leading-tight">
                    {post.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-emerald-600/60 lowercase tracking-widest">#{tag}</span>
                    ))}
                </div>

                <div className="flex items-center gap-6 pt-2 border-t border-slate-50 mt-4">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <ThumbsUp size={16} className="group-hover:text-emerald-500 transition-colors" />
                        <span className="text-xs font-black">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <MessageSquare size={16} className="group-hover:text-indigo-500 transition-colors" />
                        <span className="text-xs font-black">{post.replies}</span>
                    </div>
                </div>
            </div>

            <div className="hidden md:block">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={20} />
                </div>
            </div>
        </motion.div>
    );
}