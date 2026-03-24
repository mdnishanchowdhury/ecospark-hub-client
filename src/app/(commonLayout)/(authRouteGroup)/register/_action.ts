"use server";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenINCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse, UserRole } from "@/types/auth.type";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const registerAction = async (payload: IRegisterPayload, redirectPath?: string): Promise<IRegisterResponse | ApiErrorResponse> => {
    const parsedPayload = registerZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError
        }
    }

    try {
        const response = await httpClient.post<IRegisterResponse>("/auth/register", parsedPayload.data);

        const { accessToken, refreshToken, token, user } = response.data;
        const { role, emailVerified, needPasswordChange, email } = user;

        await setTokenINCookies("accessToken", accessToken);
        await setTokenINCookies("refreshToken", refreshToken);
        await setTokenINCookies("better-auth.session_token", token, 24 * 60 * 60);

        if (!emailVerified) {
            redirect("/verify-email");
        }
        else if (needPasswordChange) {
            redirect(`/reset-password?email=${email}`);
        }
        else {
            const targetPath = (redirectPath && isValidRedirectForRole(redirectPath, role as UserRole))
                ? redirectPath
                : getDefaultDashboardRoute(role as UserRole);

            redirect(targetPath);
        }

    } catch (error: any) {
        if (error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: `Login Failed : ${error.message || "Something went wrong"}`,
        }
    }
}