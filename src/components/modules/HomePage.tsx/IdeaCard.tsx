"use client";

import { useEffect, useState } from "react";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVote } from "@/hooks/useVote";
import { VoteButtons } from "../Ideas/VoteButtons";
import { TIdea } from "@/types/idea.types";

interface IdeaCardProps {
  idea: TIdea;
  currentUserId: string | undefined;
}

export default function IdeaCard({ idea, currentUserId }: IdeaCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { handleLike, handleDislike, isLiked, isDisliked, isLoading } = useVote(
    idea.id,
    idea.votes || [],
    currentUserId
  );

  const formattedDate = mounted
    ? new Date(idea.createdAt).toLocaleDateString("en-GB")
    : "";

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-3xl h-full flex flex-col">
      <div className="relative p-2">
        <div className="overflow-hidden rounded-2xl h-52 bg-slate-100">
          <img
            src={idea.images?.[0] || "https://placehold.co/600x400?text=No+Image"}
            alt={idea.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {idea.isPaid && <Badge className="bg-orange-500 text-white font-bold">${idea.price}</Badge>}
          <Badge variant={idea.status === "APPROVED" ? "default" : "secondary"}>
            {idea.status?.toLowerCase()}
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
            <span suppressHydrationWarning>
              {mounted ? formattedDate : "---"}
            </span>
          </div>
        </div>
        <Link href={`/ideas/${idea.id}`}>
          <h2 className="text-lg font-bold line-clamp-1 group-hover:text-emerald-600">
            {idea.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="px-5 py-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {idea.problemStatement || idea.description}
        </p>
      </CardContent>

      <CardFooter className="px-5 py-4 border-t border-slate-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={!mounted ? "opacity-50 pointer-events-none" : ""}>
              <VoteButtons
                upVotes={idea.upVotes || 0}
                downVotes={idea.downVotes || 0}
                onLike={handleLike}
                onDislike={handleDislike}
                isLiked={isLiked}
                isDisliked={isDisliked}
                isLoading={isLoading || !mounted}
              />
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MessageCircle size={18} className="text-sky-400" />
              <span className="text-xs font-bold">{idea._count?.comments || 0}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-emerald-600 font-bold p-0">
            <Link href={`/ideas/${idea.id}`}>
              Details <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}