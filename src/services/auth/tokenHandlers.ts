"use server"

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string, options?: Partial<ResponseCookie>) => {
    try {
        const cookieStore = await cookies();
        cookieStore.set(key, value, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            ...options
        });
    } catch (error) {
        console.warn(`Could not set cookie "${key}" during rendering. This is normal for Server Components.`);
    }
}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value || null;
}

export const deleteCookie = async (key: string) => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(key);
    } catch (error) {
        console.warn(`Could not delete cookie "${key}" during rendering.`);
    }
}