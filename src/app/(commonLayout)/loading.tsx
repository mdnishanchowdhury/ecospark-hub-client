import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardGlobalLoading() {
  return (
    <div className="w-full min-h-screen p-6 md:p-10 space-y-8 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-10 w-2/3 md:w-1/3 rounded-xl bg-slate-200/80" />
          <Skeleton className="h-4 w-full md:w-1/2 rounded-lg bg-slate-100" />
        </div>
        <Skeleton className="h-14 w-40 rounded-2xl bg-emerald-100/40 shrink-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/50 p-6 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 bg-slate-200" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-md bg-slate-100" />
                <Skeleton className="h-8 w-20 rounded-md bg-slate-100" />
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-50">
                  <Skeleton className="h-16 w-16 rounded-2xl bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4 bg-slate-200" />
                    <Skeleton className="h-4 w-1/2 bg-slate-100" />
                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-6 w-16 rounded-full bg-slate-50" />
                      <Skeleton className="h-6 w-16 rounded-full bg-slate-50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Skeleton className="h-6 w-24 bg-slate-200 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-100" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-full bg-slate-100" />
                    <Skeleton className="h-2 w-2/3 bg-slate-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}