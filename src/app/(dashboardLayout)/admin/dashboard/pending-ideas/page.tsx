import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPendingIdeas } from "@/services/ideas/idea.service";
import PendingIdeaList from "@/components/modules/Admin/PandingIdea/PendingIdeaList";

export default async function PendingIdeasPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["pending-ideas"],
        queryFn: getPendingIdeas,
    });

    return (
        <div className="space-y-10 px-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-950 tracking-tighter">
                        Pending Innovations <span className="text-[#009663]">.</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">
                        Review and evaluate incoming green ideas for approval.
                    </p>
                </div>

                <div className="bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Action Required</span>
                </div>
            </div>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <PendingIdeaList />
            </HydrationBoundary>
        </div>
    );
}