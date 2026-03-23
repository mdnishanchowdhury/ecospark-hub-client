import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getIdea } from "./_action";
import IdeaList from "@/components/modules/IdeaList/IdeaList";

const HomePage = async () => {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['ideas'],
    queryFn: getIdea,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IdeaList/>
    </HydrationBoundary>
  );
}
export default HomePage;