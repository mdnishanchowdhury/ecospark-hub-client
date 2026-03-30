import PendingIdeaList from "@/components/modules/Admin/PandingIdea/PendingIdeaList";


export default function PendingIdeasPage() {
    return (
        <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8 space-y-10">
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

            <PendingIdeaList />
        </div>
    );
}