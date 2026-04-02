import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import CreateIdeaForm from '@/components/forms/IdeaForm';
import { getAllCategories } from '@/services/admin/category.services';

export default async function IdeaAddPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <CreateIdeaForm />
    </HydrationBoundary>
  );
}
