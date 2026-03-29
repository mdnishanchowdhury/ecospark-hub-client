import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import IdeaList from "@/components/modules/IdeaList/IdeaList";
import { getIdeas } from "@/services/ideas/idea.service";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['ideas'],
    queryFn: () => getIdeas(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Innovation Ideas</h1>
        <IdeaList />
      </div>
    </HydrationBoundary>
  );
};

export default HomePage;