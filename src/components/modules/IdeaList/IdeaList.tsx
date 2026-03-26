"use client";

import { getIdea } from "@/app/(commonLayout)/_action";
import { useQuery } from "@tanstack/react-query";
import IdeaCard from "./IdeaCard";
import { motion } from "framer-motion";

export default function IdeaList() {
  const { data, isLoading } = useQuery({
    queryKey: ["ideas"],
    queryFn: getIdea,
  });

  const ideas = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No ideas found. Be the first to spark one!
      </div>
    );
  }

  return (
    <section className="py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {ideas.map((idea: any) => (
          <motion.div
            key={idea.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <IdeaCard idea={idea} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}