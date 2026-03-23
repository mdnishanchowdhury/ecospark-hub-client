"use server";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function checkAuthStatus(): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/idea`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Auth status check failed:", error);
        return false;
    }
}