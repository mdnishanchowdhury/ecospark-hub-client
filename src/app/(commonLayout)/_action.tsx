"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface IIdea {
    title: string;
    problemStatement: string;
    solution: string;
    description: string;
    images: string[];
    isPaid: boolean;
    price: number;
    categoryId: string;
    status?: "UNDER_REVIEW" | "APPROVED" | "REJECTED";
}

export const getIdea = async () => {
    const idea = await httpClient.get<IIdea[]>('/idea');
    return idea;
}