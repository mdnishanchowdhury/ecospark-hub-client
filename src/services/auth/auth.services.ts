"use server";

import { setTokenINCookies } from "@/lib/tokenUtils";
import { cookies } from "next/headers";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { parse } from "cookie";
import { serverFetch } from "@/lib/server-fetch";

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

export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();

        console.log("access token refreshed!!");

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}