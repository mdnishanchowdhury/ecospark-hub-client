import { httpClient } from "@/lib/axios/httpClient";


export const createComment = async (commentData: { ideaId: string; content: string; parentId?: string }) => {
    const { data } = await httpClient.post("/comment", commentData);
    return data;
};

export const updateComment = async (id: string, content: string) => {
    const { data } = await httpClient.patch(`/comment/${id}`, { content });
    return data;
};

export const deleteComment = async (id: string) => {
    const { data } = await httpClient.delete(`/comment/${id}`);
    return data;
};

export const toggleVote = async (voteData: { ideaId: string; type: "UPVOTE" | "DOWNVOTE" }) => {
    const { data } = await httpClient.post("/vote", voteData);
    return data;
};