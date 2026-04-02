import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getIdeas } from "@/services/ideas/idea.service";
import HomePage from "@/components/modules/HomePage.tsx/HomePage";
export const dynamic = "force-dynamic";

export default async function Page() {
  const queryClient = new QueryClient();

  const initialFilters = {
    searchTerm: "",
    categoryId: "",
    isPaid: undefined,
    page: 1,
    limit: 9,
  };

  await queryClient.prefetchQuery({
    queryKey: ["ideas", initialFilters],
    queryFn: () => getIdeas(initialFilters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}