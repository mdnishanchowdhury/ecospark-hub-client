"use client";

import ProfileView from "@/components/modules/Profile/ProfileView";
import { getMyProfile, ProfileResponse } from "@/services/profile/profile.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { data: response, isLoading, isError } = useQuery<ProfileResponse>({
        queryKey: ["my-profile"],
        queryFn: getMyProfile,
    });

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50/50">
                <Loader2 className="h-10 w-10 animate-spin text-[#009663]" />
            </div>
        );
    }

    if (isError || !response?.success || !response.data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-rose-500">Profile Not Found</h2>
                <p className="text-slate-500">Please ensure you are logged in correctly.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-6xl">
            <ProfileView userData={response.data} />
        </div>
    );
}