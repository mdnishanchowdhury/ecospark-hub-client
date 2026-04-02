import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import MyIdeaList from "@/components/modules/Ideas/MyIdeaList";
import { getMyIdeas } from "@/services/ideas/idea.service";

export default async function MyIdeasPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["my-ideas"],
        queryFn: getMyIdeas,
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-800">My Submitted Ideas</h1>
                <p className="text-sm text-slate-500">Manage and track the progress of your shared green ideas.</p>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <MyIdeaList />
            </HydrationBoundary>
        </div>
    );
}