"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { IpurchasedPayload, IpurchasedResult } from "@/types/idea.types";

export const createIdeaAction = async (formData: FormData) => {
    try {
        const response = await httpClient.post("/idea", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;

    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create idea",
        };
    }
};

export const getIdeas = async (queryString?: string) => {
    try {
        const response = await httpClient.get<any>(`/idea${queryString ? `?${queryString}` : ""}`);
        return response;

    } catch (error: any) {
        console.error("Error fetching ideas:", error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch ideas",
            data: []
        };
    }
}

export const getIdeaById = async (id: string) => {
    try {
        const response = await httpClient.get<any>(`/idea/${id}`);
        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Idea not found",
            data: null
        };
    }
};

export const purchasedIdea = async (payload: IpurchasedPayload) => {
    try {
        const response = await httpClient.post<IpurchasedResult>(
            `/idea/initiate-payment/${payload.ideaId}`,
            payload
        );
        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Payment initiation failed",
            data: null
        };
    }
};