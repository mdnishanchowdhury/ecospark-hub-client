export const dynamic = "force-dynamic";

import IdeaCard from "@/components/modules/HomePage.tsx/IdeaCard";
import IdeaFilters from "@/components/modules/HomePage.tsx/IdeaFilters";
import { getIdeasMenu } from "@/services/ideas/idea.service";
import { getUserInfo } from "@/services/auth/getUserInfo";

interface IdeasPageProps {
  searchParams: Promise<{
    categoryId?: string;
    isPaid?: string;
    searchTerm?: string;
    page?: string;
  }>;
}

export default async function IdeasPage({ searchParams }: IdeasPageProps) {
  const user = await getUserInfo();
  const currentUserId = user?.id;

  const { categoryId, isPaid, searchTerm, page } = await searchParams;

  const ideasRes = await getIdeasMenu({
    categoryId,
    isPaid,
    searchTerm,
    page: Number(page) || 1,
    limit: 9
  });

  const ideas = ideasRes?.data || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Explore Ideas</h1>
        <p className="text-slate-500 mt-2">Filter and find the best eco-solutions.</p>
      </div>

      <IdeaFilters
        categoryId={categoryId}
        isPaid={isPaid}
        searchTerm={searchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.length > 0 ? (
          ideas.map((idea: any) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">No ideas found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}