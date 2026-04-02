import { httpClient } from "@/lib/axios/httpClient";

export const getDashboardMetaData = async () => {
    try {
        const result = await httpClient.get("/meta");
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch dashboard metadata",
        };
    }
};


export const getMemberMetaData = async () => {
    try {
        const result = await httpClient.get("/meta");
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch dashboard metadata",
        };
    }
};