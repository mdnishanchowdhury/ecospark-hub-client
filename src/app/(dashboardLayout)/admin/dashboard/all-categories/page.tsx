import CategoryList from '@/components/modules/Admin/Category/CategoryList'
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getAllCategories } from "@/services/admin/category.services";

export default async function CategoryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="space-y-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryList />
      </HydrationBoundary>
    </div>
  )
}