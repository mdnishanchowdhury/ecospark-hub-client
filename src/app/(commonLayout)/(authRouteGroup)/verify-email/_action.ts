"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenINCookies } from "@/lib/tokenUtils";
import { jwtUtils } from "@/lib/jwtUtils";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/auth.type";
import { cookies } from "next/headers";

export const verifyEmailAction = async (email: string, otp: string, redirectPath?: string) => {
    if (!email || !otp) {
        return { success: false, message: "Email and OTP are required." };
    }

    try {
        const response = await httpClient.post<any>("/auth/verify-email", {
            email,
            otp
        });

        const data = response?.data || response;

        if (response?.success || data?.success) {
            const { accessToken, refreshToken, token } = data;

            const cookieStore = await cookies();
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            cookieStore.delete("better-auth.session_token");

            if (accessToken) await setTokenINCookies("accessToken", accessToken);
            if (refreshToken) await setTokenINCookies("refreshToken", refreshToken);
            if (token) await setTokenINCookies("better-auth.session_token", token);

            let targetRoute = "/";
            if (accessToken) {
                const decoded = jwtUtils.decodedToken(accessToken);
                const userRole = decoded?.role as UserRole;

                if (userRole) {
                    targetRoute = getDefaultDashboardRoute(userRole);
                }
            } else {
                targetRoute = "/login";
            }

            const finalPath = redirectPath || targetRoute;

            redirect(finalPath);
        }

        return {
            success: false,
            message: data?.message || "Invalid OTP. Please try again.",
        };

    } catch (error: any) {
        if (error.digest?.includes("NEXT_REDIRECT") || error.message === "NEXT_REDIRECT") {
            throw error;
        }

        if (isAxiosError(error) && error.response?.status === 401) {
            redirect("/login?message=Email verified but session expired. Please login.");
        }

        let errorMessage = "Verification failed. Please try again.";
        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        }

        return { success: false, message: errorMessage };
    }
};