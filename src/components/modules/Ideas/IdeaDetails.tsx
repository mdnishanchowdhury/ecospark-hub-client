"use client";

import { useQuery } from "@tanstack/react-query";
import { getIdeaById } from "@/services/ideas/idea.service";
import { IIdea } from "@/types/idea.types";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { AlertCircle, Calendar, Lock, Unlock, User, ChevronLeft, } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PurchaseIdeaButton } from "./PurchaseIdeaButton";
import { CommentSection } from "./CommentSection";
import { UserInfo } from "@/types/auth.type";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { VoteButtons } from "./VoteButtons";
import { useVote } from "@/hooks/useVote";

interface IdeaDetailProps {
  initialIdea: IIdea;
}

const IdeaDetails = ({ initialIdea }: IdeaDetailProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  const { data: response } = useQuery({
    queryKey: ["idea", initialIdea.id],
    queryFn: () => getIdeaById(initialIdea.id),
    initialData: { success: true, data: initialIdea, message: "Loaded" },
    staleTime: 1000 * 10,
  });

  const idea = response?.data || initialIdea;

  const { handleLike, handleDislike, isLiked, isDisliked, isLoading } = useVote(
    idea.id,
    idea.votes || [],
    user?.id
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 font-semibold">{idea.category?.name}</Badge>
          <Badge className={idea.status === "APPROVED" ? "bg-green-600 text-white" : "bg-amber-500 text-white"}>
            {idea.status}
          </Badge>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-tight">
          {idea.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{idea.createdAt ? format(new Date(idea.createdAt), "PPP") : "N/A"}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>By <span className="text-foreground font-bold">{idea.author?.name}</span></span>
          </div>
        </div>
      </div>

      {/* Locked Banner */}
      {idea.isLocked && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-amber-200 bg-amber-50/50 shadow-sm overflow-hidden border-dashed">
            <CardContent className="p-0 flex flex-col md:flex-row items-center">
              <div className="bg-amber-100 p-6 self-stretch flex items-center justify-center">
                <Lock className="h-8 w-8 text-amber-600" />
              </div>
              <div className="p-6 flex-1 text-center md:text-left">
                <h3 className="font-bold text-amber-900 text-lg uppercase tracking-tight">Technical Implementation Locked</h3>
                <p className="text-sm text-amber-700">
                  Access the architecture, code snippets, and implementation steps for <strong>${idea.price}</strong>.
                </p>
              </div>
              <div className="p-6">
                <PurchaseIdeaButton ideaId={idea.id} price={idea.price} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Images Gallery */}
          {idea.images && idea.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {idea.images.map((img: string, idx: number) => (
                <div key={idx} className="relative h-72 w-full rounded-2xl overflow-hidden border shadow-sm group bg-muted">
                  <img
                    src={img}
                    alt={`${idea.title} - preview ${idx + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}

          {/* vote */}
          <Card className="shadow-sm border-muted">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black">The Concept</CardTitle>
                <VoteButtons
                  upVotes={idea.upVotes || 0}
                  downVotes={idea.downVotes || 0}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                  isLoading={isLoading}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-8 pt-6">
              {/* Problem Section */}
              <section>
                <h4 className="font-bold text-lg flex items-center gap-2 mb-3 text-red-600">
                  <AlertCircle className="h-5 w-5" /> The Problem
                </h4>
                <div className="p-5 bg-red-50/30 rounded-xl border border-red-100/50 text-slate-700 ">
                  "{idea.problemStatement}"
                </div>
              </section>

              {/* Solution Section */}
              <section>
                <h4 className="font-bold text-lg flex items-center gap-2 mb-3 text-green-600">
                  <Unlock className="h-5 w-5" /> Proposed Solution
                </h4>
                <div className="relative group">
                  <div className={`p-6 rounded-xl bg-green-50/30 border border-green-100/50 leading-relaxed transition-all ${idea.isLocked ? "blur-xl select-none opacity-40" : ""}`}>
                    {idea.isLocked ? "The detailed solution is encrypted. Please unlock to view." : idea.solution}
                  </div>
                  {idea.isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Lock className="h-6 w-6 text-amber-600 animate-bounce" />
                      <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">Premium Content</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Description */}
              <section>
                <h4 className="font-bold text-lg mb-3">Detailed Description</h4>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                  {idea.description}
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <CommentSection
            ideaId={idea.id}
            comments={idea.comments || []}
            commentCount={idea._count?.comments || 0}
            currentUserId={user?.id || ""}
            currentUserRole={user?.role || ""}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author Card */}
          <Card className="text-center overflow-hidden border shadow-sm p-6 bg-white">
            <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 p-1 border-4 border-primary/20 shadow-inner relative mb-4 flex items-center justify-center">
              {idea.author?.image ? (
                <img src={idea.author.image} className="rounded-full object-cover w-full h-full" alt={idea.author.name} />
              ) : (
                <span className="text-3xl font-black text-primary uppercase">
                  {idea.author?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <h3 className="font-bold text-xl">{idea.author?.name}</h3>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Expert Contributor</p>
            <Button variant="outline" className="w-full rounded-xl font-bold hover:bg-primary hover:text-white transition-colors">View Profile</Button>
          </Card>

          {/* Pricing/Access Card */}
          <Card className="shadow-lg border-2 border-primary/10 overflow-hidden sticky top-6">
            <div className="bg-primary p-3 text-center text-white text-xs font-black uppercase tracking-widest">
              Pricing & Access
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm font-medium">Implementation Cost</span>
                <span className="text-3xl font-black text-primary">${idea.price}</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-center">
                <div className="bg-slate-100 p-2 rounded border">{idea.isPaid ? "Premium" : "Free"}</div>
                <div className="bg-slate-100 p-2 rounded border">{idea.status}</div>
              </div>
              {idea.isLocked ? (
                <PurchaseIdeaButton ideaId={idea.id} price={idea.price} />
              ) : (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6">
                  Owned / Accessible
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;