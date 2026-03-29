import { toggleVote } from "@/services/comment/comment.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVote = (ideaId: string, initialVotes: any[] = [], userId?: string) => {
    const queryClient = useQueryClient();

    const voteMutation = useMutation({
        mutationFn: (type: "UPVOTE" | "DOWNVOTE") => toggleVote({ ideaId, type }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ideas"]
            });

            queryClient.invalidateQueries({
                queryKey: ["idea", ideaId]
            });

            toast.success("Vote recorded!");
        },
        onError: (err: any) => {
            toast.error(err?.message || "Something went wrong");
        }
    });

    const userVote = initialVotes?.find((v: any) =>
        v?.userId && userId && String(v.userId) === String(userId)
    );

    const isLiked = userVote?.type === "UPVOTE";
    const isDisliked = userVote?.type === "DOWNVOTE";

    return {
        handleLike: () => {
            if (!userId) return toast.error("Please login to vote");
            voteMutation.mutate("UPVOTE");
        },
        handleDislike: () => {
            if (!userId) return toast.error("Please login to vote");
            voteMutation.mutate("DOWNVOTE");
        },
        isLiked,
        isDisliked,
        isLoading: voteMutation.isPending,
    };
};