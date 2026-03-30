import MyIdeaList from "@/components/modules/Ideas/MyIdeaList";


export default function MyIdeasPage() {
    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-800">My Submitted Ideas</h1>
                <p className="text-sm text-slate-500">Manage and track the progress of your shared green ideas.</p>
            </div>
            
            <MyIdeaList />
        </div>
    );
}