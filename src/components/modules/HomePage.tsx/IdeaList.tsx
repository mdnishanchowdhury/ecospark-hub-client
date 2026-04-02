"use client";

import IdeaCard from "./IdeaCard";
import { motion } from "framer-motion";
import { TIdea, TMeta } from "@/types/idea.types";
import ModernPagination from "./ModernPagination";
import { Sparkles } from "lucide-react";

interface IdeaListProps {
  ideas: TIdea[];
  isLoading: boolean;
  meta?: TMeta;
  currentUserId: string | undefined;
  onPageChange: (page: number) => void;
}

export default function IdeaList({
  ideas,
  isLoading,
  meta,
  currentUserId,
  onPageChange
}: IdeaListProps) {

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 w-full gap-4">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <div className="absolute animate-ping h-8 w-8 rounded-full bg-indigo-400/20"></div>
        </div>
        <p className="text-slate-400 text-xs font-bold lowercase tracking-widest animate-pulse">
          syncing hub...
        </p>
      </div>
    );
  }

  if (!ideas || ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 w-full group hover:border-indigo-200 transition-colors duration-500">
        <div className="p-4 bg-slate-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
          <Sparkles className="text-slate-300 group-hover:text-indigo-400" size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 lowercase">no ideas found</h3>
      </div>
    );
  }

  return (
    <section className="flex flex-col min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
      >
        {ideas.map((idea) => (
          <motion.div
            key={idea.id}
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <IdeaCard idea={idea} currentUserId={currentUserId} />
          </motion.div>
        ))}
      </motion.div>

      {meta && meta.totalPage > 1 && (
        <div className="mt-10 mb-10 flex justify-center w-full">
          <ModernPagination
            currentPage={meta.page}
            totalPages={meta.totalPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}