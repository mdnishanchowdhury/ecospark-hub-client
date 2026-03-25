"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { isAxiosError } from "axios";

export const resetPasswordAction = async (payload: { email: string; otp: string; newPassword: string }) => {
    if (!payload.email || !payload.otp || !payload.newPassword) {
        return { success: false, message: "All fields are required." };
    }

    try {
        const response = await httpClient.post<any>("/auth/reset-password", payload);

        return {
            success: true,
            message: response.data?.message || "Password has been reset successfully.",
        };

    } catch (error: any) {
        let errorMessage = "Something went wrong. Please try again.";

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        }

        return { success: false, message: errorMessage };
    }
};