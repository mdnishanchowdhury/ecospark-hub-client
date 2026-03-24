"use server";

import { setTokenINCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokenWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cookie": `refreshToken=${refreshToken}`
            }
        });

        if (!res.ok) {
            return false;
        }

        const responseData = await res.json();

        const result = responseData?.data || responseData;

        const { accessToken, refreshToken: newRefreshToken, token } = result;

        if (accessToken) {
            await setTokenINCookies("accessToken", accessToken);
        }

        if (newRefreshToken) {
            await setTokenINCookies("refreshToken", newRefreshToken);
        }

        if (token) {
            await setTokenINCookies("better-auth.session_token", token, 24 * 60 * 60);
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token", error);
        return false;
    }
}