"use server"

import { httpClient } from "@/lib/axios/httpClient";

export interface ProfileResponse {
    success: boolean;
    message: string;
    data: any;
}


export const getMyProfile = async (): Promise<ProfileResponse> => {
    try {
        const res = await httpClient.get("/auth/me");
        return res
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch profile",
            data: null
        };
    }
};