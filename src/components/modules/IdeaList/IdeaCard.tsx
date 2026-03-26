"use client";

import { useEffect, useState } from "react";
import { Calendar, ThumbsUp, ThumbsDown, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function IdeaCard({ idea }: { idea: any }) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVote = async (type: "UPVOTE" | "DOWNVOTE") => {
    try {
      toast.success(`${type === "UPVOTE" ? "Liked" : "Disliked"} successfully!`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please login first.");
    }
  };

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-3xl">
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
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              ${idea.price}
            </Badge>
          )}
          <Badge variant={idea.status === "APPROVED" ? "default" : "secondary"} className="capitalize">
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
        <h2 className="text-lg font-bold line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {idea.title}
        </h2>
      </CardHeader>

      <CardContent className="px-5 py-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {idea.problemStatement || idea.description}
        </p>
      </CardContent>

      <div className="px-5">
        <div className="h-[1px] bg-slate-100 w-full" />
      </div>

      <CardFooter className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => handleVote("UPVOTE")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-600 transition-colors group/btn"
          >
            <ThumbsUp size={16} className="text-emerald-500 group-active/btn:scale-125 transition-transform" />
            <span className="text-xs font-medium">{idea.upVotes || 0}</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => handleVote("DOWNVOTE")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-rose-500 transition-colors group/btn"
          >
            <ThumbsDown size={16} className="text-rose-400 group-active/btn:scale-125 transition-transform" />
            <span className="text-xs font-medium">{idea.downVotes || 0}</span>
          </button>

          {/* Comment Button */}
          <Link href={`/ideas/${idea.id}#comments`} className="flex items-center gap-1.5 text-muted-foreground hover:text-sky-500 transition-colors">
            <MessageCircle size={16} className="text-sky-400" />
            <span className="text-xs font-medium">{idea._count?.comments || 0}</span>
          </Link>
        </div>

        <Button variant="ghost" size="sm" asChild className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold p-0 px-2">
          <Link href={`/ideas/${idea.id}`}>
            Details <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}