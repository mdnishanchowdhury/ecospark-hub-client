import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyProfile } from "@/services/profile/profile.services";
import ProfileClientContainer from "@/components/modules/Profile/ProfileClientContainer";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["my-profile"],
        queryFn: getMyProfile,
    });

    return (
        <div className="container mx-auto py-12 px-4 max-w-6xl">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProfileClientContainer />
            </HydrationBoundary>
        </div>
    );
}