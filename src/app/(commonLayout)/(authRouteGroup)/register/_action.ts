"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse, UserRole } from "@/types/auth.type";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const registerAction = async (payload: IRegisterPayload, redirectPath?: string): Promise<IRegisterResponse | ApiErrorResponse> => {
    const parsedPayload = registerZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return { success: false, message: parsedPayload.error.issues[0].message || "Invalid input" };
    }

    try {
        const response = await httpClient.post<any>("/auth/register", parsedPayload.data);

        let actualData = response.data?.data;
        if (actualData && actualData.data) {
            actualData = actualData.data;
        }

        if (!actualData || !actualData.user) {
            return {
                success: false,
                message: "User data not found in response."
            };
        }

        const { user } = actualData;
        const { role, emailVerified, needPasswordChange, email } = user;

        if (!emailVerified) {
            redirect(`/verify-email?email=${encodeURIComponent(email)}`);
        }
        else if (needPasswordChange) {
            redirect(`/reset-password?email=${encodeURIComponent(email)}`);
        }
        else {
            const targetPath = (redirectPath && isValidRedirectForRole(redirectPath, role as UserRole))
                ? redirectPath
                : getDefaultDashboardRoute(role as UserRole);

            redirect(targetPath);
        }

    } catch (error: any) {
        if (error && error.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: error.response?.data?.message || error.message || "Registration Failed",
        };
    }
}