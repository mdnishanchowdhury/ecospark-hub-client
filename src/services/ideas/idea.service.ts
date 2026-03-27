"use server"

import { IIdea } from "@/app/(commonLayout)/_action";
import { httpClient } from "@/lib/axios/httpClient";

export async function getIdeaById(IdeaId: string) {
    try {
        const result = await httpClient.get<IIdea>(`/idea/${IdeaId}`);

        if (result.success && result.data) {
            return {
                success: true,
                data: result.data
            };
        }

        return {
            success: false,
            data: null,
            message: result.message || "Idea not found",
        };
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to fetch idea";
        console.error("Error fetching idea:", errorMessage);

        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
}