import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getIdeas } from "@/services/ideas/idea.service";
import { getAllCategories } from "@/services/admin/category.services";
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

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["ideas", initialFilters],
      queryFn: () => getIdeas(initialFilters),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getAllCategories(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}