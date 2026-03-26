"use server"

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

 export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MEMBER";
    status?: string;
    bio?: string;
    address?: string;
    phoneNumber?: string;
    totalIdeasShared?: number;
    totalPurchases?: number;
    needPasswordChange?: boolean;
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "no-store", 
            next: { tags: ["user-info"] }
        });

        const result = await response.json();

        if (result.success && result.data) {
            return {
                id: result.data.id || result.data._id,
                name: result.data.name || "Unknown User",
                email: result.data.email,
                role: result.data.role, 
                status: result.data.status,
                ...result.data
            } as UserInfo;
        }

        const accessToken = await getCookie("accessToken");

        if (accessToken) {
            const decodedToken = jwt.decode(accessToken) as JwtPayload;

            if (decodedToken) {
                return {
                    id: decodedToken.id || "",
                    name: decodedToken.name || "EcoSpark User",
                    email: decodedToken.email || "",
                    role: decodedToken.role || "MEMBER", 
                } as UserInfo;
            }
        }

        return null; 

    } catch (error: any) {
        console.error("Error fetching user info in EcoSpark:", error.message);

        return null; 
    }
};