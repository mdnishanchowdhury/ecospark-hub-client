"use client";

import { useEffect, useState } from "react";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVote } from "@/hooks/useVote";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/auth.type";
import { VoteButtons } from "../Ideas/VoteButtons";

export default function IdeaCard({ idea }: { idea: any }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  const currentUserId = user?.id || (user as any)?.userId;

  const { handleLike, handleDislike, isLiked, isDisliked, isLoading } = useVote(
    idea.id,
    idea.votes || [],
    currentUserId
  );

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-3xl h-full flex flex-col">
      {/* Image Section */}
      <div className="relative p-2">
        <div className="overflow-hidden rounded-2xl h-52">
          <img
            src={idea.images?.[0] || "/placeholder-idea.jpg"}
            alt={idea.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          {idea.isPaid && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none shadow-sm font-bold">
              ${idea.price}
            </Badge>
          )}
          <Badge variant={idea.status === "APPROVED" ? "default" : "secondary"} className="capitalize shadow-sm">
            {idea.status?.toLowerCase() || "pending"}
          </Badge>
        </div>
      </div>

      <CardHeader className="px-5 pt-2 pb-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            {idea.category?.name}
          </span>
          <div className="flex items-center text-muted-foreground text-[11px] gap-1">
            <Calendar size={12} />
            {mounted ? new Date(idea.createdAt).toLocaleDateString("en-GB") : "---"}
          </div>
        </div>
        <Link href={`/ideas/${idea.id}`}>
          <h2 className="text-lg font-bold line-clamp-1 group-hover:text-emerald-600 transition-colors cursor-pointer">
            {idea.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="px-5 py-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {idea.problemStatement || idea.description}
        </p>
      </CardContent>

      <div className="px-5">
        <div className="h-[1px] bg-slate-100 w-full" />
      </div>

      <CardFooter className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">

            {/* vote */}
            <VoteButtons
              upVotes={idea.upVotes || 0}
              downVotes={idea.downVotes || 0}
              onLike={handleLike}
              onDislike={handleDislike}
              isLiked={isLiked}
              isDisliked={isDisliked}
              isLoading={isLoading}
            />

            {/* Comment Link */}
            <Link
              href={`/ideas/${idea.id}#comments`}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-sky-500 transition-colors"
            >
              <MessageCircle size={18} className="text-sky-400" />
              <span className="text-xs font-bold">{idea._count?.comments || 0}</span>
            </Link>
          </div>

          <Button variant="ghost" size="sm" asChild className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold p-0 px-2 rounded-xl">
            <Link href={`/ideas/${idea.id}`}>
              Details <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}