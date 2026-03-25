"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { isAxiosError } from "axios";

export const forgotPasswordAction = async (email: string) => {
    if (!email) {
        return { success: false, message: "Email is required." };
    }

    try {
        const response = await httpClient.post<any>("/auth/forget-password", { email });

        return {
            success: true,
            message: response.data?.message || "Password reset link sent to your email.",
        };

    } catch (error: any) {
        let errorMessage = "Something went wrong. Please try again.";

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        }

        return { success: false, message: errorMessage };
    }
};