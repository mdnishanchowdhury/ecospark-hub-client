"use server";

import { setTokenINCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getNewTokenWithRefreshToken(refreshToken: string): Promise<boolean> {
    if (!refreshToken || refreshToken === "undefined") {
        console.error("Refresh token is missing before fetch");
        return false;
    }

    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("better-auth.session_token")?.value;

        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cookie": `refreshToken=${refreshToken}; better-auth.session_token=${sessionToken || ""}`
            },
            body: JSON.stringify({ refreshToken, sessionToken })
        });

        if (!res.ok) {
            const errorMsg = await res.text();
            console.error("Fetch failed:", res.status, errorMsg);
            return false;
        }

        const responseData = await res.json();
        const result = responseData?.data || responseData;

        const { accessToken, refreshToken: newRefreshToken, token, session } = result;

        if (accessToken) {
            await setTokenINCookies("accessToken", accessToken);
        }

        if (newRefreshToken) {
            await setTokenINCookies("refreshToken", newRefreshToken);
        }

        const finalSessionToken = token || session?.token;
        if (finalSessionToken) {
            await setTokenINCookies("better-auth.session_token", finalSessionToken, 24 * 60 * 60);
        }

        return true;
    } catch (error) {
        console.error("Error in getNewTokenWithRefreshToken:", error);
        return false;
    }
}