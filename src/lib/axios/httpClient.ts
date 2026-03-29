import axios from 'axios';
import { ApiResponse } from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in environment variables');
}
const axiosInstance = async () => {
    let cookieHeader = "";

    if (typeof window === "undefined") {
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            cookieHeader = cookieStore
                .getAll()
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; ");
        } catch (error) {
            console.error("Error accessing server cookies:", error);
        }
    } else {
        cookieHeader = document.cookie;
    }

    return axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        withCredentials: true,
    });
};

export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

// Helper function to handle requests
const handleRequest = async <TData>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions
): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.request<ApiResponse<TData>>({
            url: endpoint,
            method,
            data,
            params: options?.params,
            headers: options?.headers,
        });
        return response.data;
    } catch (error: any) {
        console.error(`${method.toUpperCase()} request to ${endpoint} failed:`, error.message);
        throw error;
    }
};

export const httpClient = {
    get: <TData>(url: string, opts?: ApiRequestOptions) => handleRequest<TData>('get', url, undefined, opts),
    post: <TData>(url: string, data: unknown, opts?: ApiRequestOptions) => handleRequest<TData>('post', url, data, opts),
    put: <TData>(url: string, data: unknown, opts?: ApiRequestOptions) => handleRequest<TData>('put', url, data, opts),
    patch: <TData>(url: string, data: unknown, opts?: ApiRequestOptions) => handleRequest<TData>('patch', url, data, opts),
    delete: <TData>(url: string, opts?: ApiRequestOptions) => handleRequest<TData>('delete', url, undefined, opts),
};