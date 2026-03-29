import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getIdeaById } from "@/services/ideas/idea.service";
import { notFound } from "next/navigation";
import IdeaDetails from "@/components/modules/Ideas/IdeaDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdeaById(id),
  });

  const state = dehydrate(queryClient);
  const ideaResponse: any = state.queries.find((q) => q.queryKey[1] === id)?.state.data;

  if (!ideaResponse?.success || !ideaResponse?.data) {
    notFound();
  }

  return (
    <HydrationBoundary state={state}>
      <IdeaDetails initialIdea={ideaResponse.data} />
    </HydrationBoundary>
  );
}