import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDashboardMetaData } from "@/services/meta/meta.services";
import MemberDashboard from "@/components/modules/Member/MemberDashboard";

export default async function MemberPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["member-metrics"],
    queryFn: getDashboardMetaData,
  });

  const state = dehydrate(queryClient);

  const dashboardResponse: any = queryClient.getQueryData(["admin-metrics"]);

  return (
    <main className="w-full">
      <HydrationBoundary state={state}>
        <MemberDashboard initialData={dashboardResponse} />
      </HydrationBoundary>
    </main>
  );
}