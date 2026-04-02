"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const createCategory = async (payload: { name: string }) => {
    try {
        const result = await httpClient.post("/category", payload);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create category",
        };
    }
};


export const getAllCategories = async () => {
    try {
        const result = await httpClient.get("/category");
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch categories",
        };
    }
};

export const getCategoryById = async (id: string) => {
    try {
        const result = await httpClient.get(`/category/${id}`);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch category",
        };
    }
};

export const updateCategory = async (id: string, payload: { name: string }) => {
    try {
        const result = await httpClient.patch(`/category/${id}`, payload);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update category",
        };
    }
};

export const deleteCategory = async (id: string) => {
    try {
        const result = await httpClient.delete(`/category/${id}`);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete category",
        };
    }
};

