"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Lock,
  Unlock,
  Tag,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IIdea } from "@/types/idea.types";

interface IdeaDetailProps {
  idea: IIdea;
}

const IdeaDetails = ({ idea }: IdeaDetailProps) => {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const isApproved = status === "APPROVED";
    return (
      <Badge variant={isApproved ? "default" : "secondary"} className={isApproved ? "bg-green-500" : ""}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {idea.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Posted on {format(new Date(idea.createdAt), "PPP")}</span>
            <Separator orientation="vertical" className="h-4" />
            <Tag className="h-4 w-4" />
            <span>{idea.category.name}</span>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Feed
        </Button>
      </div>

      {/* Lock/Paid Notification */}
      {idea.isLocked && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Premium Content</h3>
                <p className="text-sm text-amber-700 mt-1">
                  This is a paid project. To unlock the full solution and detailed description, you need to purchase it for <span className="font-bold">${idea.price}</span>.
                </p>
                <Button className="mt-3 bg-amber-600 hover:bg-amber-700" size="sm">
                  Unlock Full Access
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {idea.images.map((img, idx) => (
              <div key={idx} className="relative h-48 w-full rounded-xl overflow-hidden border">
                <Image
                  src={img}
                  alt={`Idea image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Problem Statement
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {idea.problemStatement}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <Unlock className="h-5 w-5 text-green-500" />
                  Proposed Solution
                </h4>
                <p className={`leading-relaxed ${idea.isLocked ? "italic text-muted-foreground" : ""}`}>
                  {idea.solution === "Locked" ? "Purchase to view the complete architectural solution." : idea.solution}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-2">Detailed Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {idea.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments ({idea._count.comments})
            </h3>
            {idea.comments.map((comment) => (
              <Card key={comment.id} className="bg-slate-50/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                      {comment.user.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(comment.createdAt), "MMM d")}
                    </span>
                  </div>
                  <p className="text-sm pl-10">{comment.content}</p>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-10 mt-3 pl-4 border-l-2 border-slate-200 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id}>
                          <span className="font-medium text-xs">{reply.user.name}: </span>
                          <span className="text-xs text-muted-foreground">{reply.content}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Author Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {idea.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{idea.author.name}</p>
                  <p className="text-xs text-muted-foreground">{idea.author.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-xl font-bold">{idea.upVotes}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> Upvotes
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold">{idea.downVotes}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ThumbsDown className="h-3 w-3" /> Downvotes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(idea.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <Badge variant="outline">{idea.isPaid ? "Paid" : "Free"}</Badge>
              </div>
              {idea.isPaid && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Price</span>
                    <span className="text-2xl font-bold text-primary">${idea.price}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button className="w-full gap-2">
            <Globe className="h-4 w-4" />
            Contact Author
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;