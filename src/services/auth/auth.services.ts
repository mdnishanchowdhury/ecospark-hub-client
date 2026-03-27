"use server";

import { cookies } from "next/headers";
import { getCookie, setCookie } from "./tokenHandlers";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenINCookies } from "@/lib/tokenUtils";

export interface RefreshTokenResponse {
    tokenRefreshed: boolean;
    success: boolean;
    accessToken?: string;
    message?: string;
}

export async function getNewAccessToken(): Promise<RefreshTokenResponse> {
    try {
        const refreshToken = await getCookie("refreshToken");
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        if (!refreshToken) {
            return { tokenRefreshed: false, success: false };
        }

        const response = await httpClient.post("/auth/refresh-token",
            { refreshToken, sessionToken },
            {
                headers: {
                    'Cookie': `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken || ""}`
                }
            }
        );

        const result = response as any;
        const apiData = result.data || result;

        const finalAccessToken = apiData.accessToken;
        const finalRefreshToken = apiData.refreshToken;
        const finalSessionToken = apiData.token || apiData.session?.token;

        if (!finalAccessToken) {
            throw new Error("New access token not found");
        }

        await setCookie("accessToken", finalAccessToken, {
            secure: true,
            httpOnly: true,
            maxAge: 3600,
            path: "/",
            sameSite: "lax",
        });

        if (finalRefreshToken) {
            await setCookie("refreshToken", finalRefreshToken, {
                secure: true,
                httpOnly: true,
                maxAge: 90 * 24 * 60 * 60,
                path: "/",
                sameSite: "lax",
            });
        }

        if (finalSessionToken) {
            await setTokenINCookies("better-auth.session_token", finalSessionToken, 24 * 60 * 60);
        }

        return {
            tokenRefreshed: true,
            success: true,
            accessToken: finalAccessToken
        };

    } catch (error: any) {
        console.error("Refresh Failed:", error.message);
        return {
            tokenRefreshed: false,
            success: false
        };
    }
}