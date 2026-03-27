"use server"

import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { httpClient } from "@/lib/axios/httpClient";
import { UserInfo } from "@/types/auth.type";

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const result = await httpClient.get<UserInfo>("/auth/me");

        if (result.success && result.data) {
            const data = result.data as any;
            return {
                id: data.id || data._id,
                name: data.name || "Unknown User",
                email: data.email,
                role: data.role,
                status: data.status,
                ...data
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