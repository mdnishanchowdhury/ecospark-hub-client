"use client";

import { getIdea } from "@/app/(commonLayout)/_action";
import { useQuery } from "@tanstack/react-query";
import IdeaCard from "./IdeaCard";
export default function IdeaList() {
  const { data, isLoading } = useQuery({
    queryKey: ["ideas"],
    queryFn: getIdea,
  });

  const ideas = data?.data || [];

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea: any) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
    </section>
  );
}