"use client";

import ProfileView from "@/components/modules/Profile/ProfileView";
import { getMyProfile, ProfileResponse } from "@/services/profile/profile.services";
import { useQuery } from "@tanstack/react-query";

export default function ProfileClientContainer() {
    const { data: response, isError } = useQuery<ProfileResponse>({
        queryKey: ["my-profile"],
        queryFn: getMyProfile,
        staleTime: 60 * 1000,
    });

    if (isError || !response?.success || !response.data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-rose-500">Profile Not Found</h2>
                <p className="text-slate-500">Please ensure you are logged in correctly.</p>
            </div>
        );
    }

    return <ProfileView userData={response.data} />;
}