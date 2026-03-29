"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { usePathname, useRouter } from "next/navigation";
import { UserInfo } from "@/types/auth.type";
import { toast } from "sonner";

interface VoteButtonsProps {
    upVotes: number;
    downVotes: number;
    onLike: () => void;
    onDislike: () => void;
    isLiked: boolean;
    isDisliked: boolean;
    isLoading: boolean;
}

export const VoteButtons = ({
    upVotes,
    downVotes,
    onLike,
    onDislike,
    isLiked,
    isDisliked,
    isLoading,
}: VoteButtonsProps) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
        };
        fetchUser();
    }, []);

    const handleAuthAction = (e: React.MouseEvent, action: () => void) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error("Please login to participate in voting!", {
                description: "Redirecting you to the login page...",
            });

            const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
            router.push(loginUrl);
            return;
        }

        action();
    };

    return (
        <div className="flex items-center bg-slate-50/50 rounded-full border border-slate-100">
            {/* Like Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                onClick={(e) => handleAuthAction(e, onLike)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
                        ? "bg-white text-red-600 shadow-md border-red-100"
                        : "text-slate-500 hover:text-red-500 hover:bg-white"
                    }`}
            >
                <ThumbsUp
                    size={18}
                    className={`transition-all ${isLiked ? "fill-red-600 stroke-red-600" : "stroke-[2.5px]"}`}
                />
                <span className="font-black text-sm">{upVotes}</span>
            </motion.button>

            <div className="w-[1px] h-4 bg-slate-200" />

            {/* Downvote Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                onClick={(e) => handleAuthAction(e, onDislike)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isDisliked
                        ? "bg-white text-blue-600 shadow-md border-blue-100"
                        : "text-slate-500 hover:text-blue-500 hover:bg-white"
                    }`}
            >
                <ThumbsDown
                    size={18}
                    className={`transition-all ${isDisliked ? "fill-blue-600 stroke-blue-600" : "stroke-[2.5px]"}`}
                />
                <span className="font-black text-sm">{downVotes}</span>
            </motion.button>
        </div>
    );
};