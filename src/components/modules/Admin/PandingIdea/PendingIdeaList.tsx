"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingIdeas, updateIdeaStatus } from "@/services/ideas/idea.service";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Clock,
    Eye,
    Calendar,
    Target,
    Lightbulb,
    User,
    DollarSign,
    CheckCircle,
    XCircle
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function PendingIdeaList() {
    const queryClient = useQueryClient();
    const [feedback, setFeedback] = useState("");

    const { data: response, isError } = useQuery({
        queryKey: ["pending-ideas"],
        queryFn: getPendingIdeas,
    });

    const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) => updateIdeaStatus(id, payload),
        onSuccess: (res: any) => {
            if (res?.success === false) {
                toast.error(res?.message || "Failed to update status");
            } else {
                toast.success("Status updated successfully!");
                setFeedback("");
                queryClient.invalidateQueries({ queryKey: ["pending-ideas"] });
            }
        },
        onError: (err: any) => {
            const errorMessage = err?.message || err?.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        },
    });

    const ideas = response?.data || [];

    if (isError) return <div className="p-20 text-center text-red-400 font-bold">Failed to load ideas.</div>;

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-8 py-5 font-bold text-slate-700">Idea Details</TableHead>
                        <TableHead className="font-bold text-slate-700">Category</TableHead>
                        <TableHead className="font-bold text-slate-700">Type</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right pr-8">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ideas.length > 0 ? (
                        ideas.map((idea: any) => (
                            <TableRow key={idea.id} className="group hover:bg-slate-50/40 transition-colors">
                                <TableCell className="pl-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                                            <Image
                                                src={idea.images?.[0] || "/placeholder-idea.png"}
                                                alt="idea" fill className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                                                {idea.title.endsWith('.') ? idea.title.slice(0, -1) : idea.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-medium">
                                                <User size={10} /> <span>{idea.author?.name || "Anonymous User"}</span>
                                                <span>•</span>
                                                <Calendar size={10} /> <span>{format(new Date(idea.createdAt), "MMM dd, yyyy")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-2 py-0.5 uppercase">
                                        {idea.category?.name || "General"}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {idea.isPaid ? (
                                        <Badge className="bg-amber-50 text-amber-600 border-amber-100 gap-1 text-[10px]">
                                            <DollarSign size={10} /> ${idea.price}
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-[10px] text-slate-400">Free</Badge>
                                    )}
                                </TableCell>

                                <TableCell className="text-right pr-8">
                                    <Sheet onOpenChange={() => setFeedback("")}>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" size="sm" className="rounded-full gap-2 border-slate-200 hover:bg-[#009663] hover:text-white transition-all shadow-sm">
                                                <Eye size={14} /> Review
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className="sm:max-w-xl overflow-y-auto p-0 border-l border-slate-100">
                                            <div className="p-8 space-y-8">
                                                <SheetHeader className="text-left">
                                                    <Badge className="w-fit bg-amber-50 text-amber-600 border-amber-100 gap-1 mb-3 font-bold text-xs">
                                                        <Clock size={12} /> PENDING REVIEW
                                                    </Badge>
                                                    <SheetTitle className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                                        {idea.title}
                                                    </SheetTitle>
                                                </SheetHeader>

                                                {/* Content Sections */}
                                                <div className="space-y-6">
                                                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                                                        <h4 className="font-extrabold text-slate-900 flex items-center gap-2.5 mb-3">
                                                            <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700"><Target size={16} /></div>
                                                            Problem Statement
                                                        </h4>
                                                        <p className="text-sm text-slate-600 leading-relaxed">{idea.problemStatement}</p>
                                                    </div>

                                                    <div className="bg-blue-50/30 p-5 rounded-2xl border border-blue-100/50">
                                                        <h4 className="font-extrabold text-slate-900 flex items-center gap-2.5 mb-3">
                                                            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-700"><Lightbulb size={16} /></div>
                                                            Proposed Solution
                                                        </h4>
                                                        <p className="text-sm text-slate-600 leading-relaxed">{idea.solution}</p>
                                                    </div>

                                                    {/* Admin Feedback Box */}
                                                    <div className="pt-4 border-t border-slate-100">
                                                        <h4 className="font-extrabold text-slate-900 mb-3 text-sm">Admin Feedback / Rejection Reason</h4>
                                                        <Textarea
                                                            placeholder="Enter feedback or reason for approval/rejection..."
                                                            value={feedback}
                                                            onChange={(e) => setFeedback(e.target.value)}
                                                            className="min-h-[100px] bg-slate-50 border-slate-200 rounded-xl focus:ring-emerald-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 flex gap-4 backdrop-blur-md">
                                                <Button
                                                    disabled={isUpdating}
                                                    onClick={() => handleUpdate({ id: idea.id, payload: { status: "APPROVED", feedback: feedback || "Your idea is approved!" } })}
                                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold py-6 gap-2"
                                                >
                                                    <CheckCircle size={18} /> {isUpdating ? "Updating..." : "Approve"}
                                                </Button>
                                                <Button
                                                    disabled={isUpdating}
                                                    onClick={() => {
                                                        if (!feedback) return toast.error("Please provide a reason for rejection.");
                                                        handleUpdate({ id: idea.id, payload: { status: "REJECTED", feedback } });
                                                    }}
                                                    variant="destructive"
                                                    className="flex-1 rounded-xl font-bold py-6 gap-2"
                                                >
                                                    <XCircle size={18} /> Reject
                                                </Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="py-24 text-center text-slate-400 italic">No pending ideas found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}