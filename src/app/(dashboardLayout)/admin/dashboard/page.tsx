import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AdminDashboard from "@/components/modules/Admin/Dashboard/AdminDashboard";
import { getDashboardMetaData } from "@/services/meta/meta.services";

export default async function AdminPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-metrics"],
    queryFn: getDashboardMetaData,
  });

  const state = dehydrate(queryClient);

  const dashboardResponse: any = queryClient.getQueryData(["admin-metrics"]);

  return (
    <main className="w-full">
      <HydrationBoundary state={state}>
        <AdminDashboard initialData={dashboardResponse} />
      </HydrationBoundary>
    </main>
  );
}