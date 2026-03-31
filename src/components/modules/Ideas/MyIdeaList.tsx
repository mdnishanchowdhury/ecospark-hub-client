"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIdea, getMyIdeas } from "@/services/ideas/idea.service";
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
    MessageSquare, ThumbsUp, Clock, CheckCircle,
    XCircle, Eye, Tag, Calendar, Target,
    Lightbulb, Trash2, Edit
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import EditIdeaForm from "./EditIdeaForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MyIdeaList() {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState<any>(null);

    const queryClient = useQueryClient();

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ["my-ideas"],
        queryFn: getMyIdeas,
    });

    // Delete Mutation
    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => deleteIdea(id),
        onSuccess: (res: any) => {
            console.log("Delete Response:", res);

            toast.success("Idea deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
        },
        onError: (error) => {
            console.error("Delete Error:", error);
            toast.error("Something went wrong while deleting.");
        }
    });

    const ideas = Array.isArray(response) ? response : response?.data || [];

    const getStatusBadge = (status: string) => {
        const baseClass = "rounded-lg px-2 py-0.5 font-semibold text-[11px] uppercase tracking-wide gap-1";
        switch (status) {
            case "APPROVED":
                return <Badge className={`bg-emerald-50 text-emerald-600 border border-emerald-100 ${baseClass}`}><CheckCircle size={14} /> Approved</Badge>;
            case "UNDER_REVIEW":
                return <Badge className={`bg-amber-50 text-amber-600 border border-amber-100 ${baseClass}`}><Clock size={14} /> Under Review</Badge>;
            case "REJECTED":
                return <Badge className={`bg-rose-50 text-rose-600 border border-rose-100 ${baseClass}`}><XCircle size={14} /> Rejected</Badge>;
            default:
                return <Badge variant="outline" className={baseClass}>{status}</Badge>;
        }
    };

    if (isLoading) return <div className="p-20 text-center font-bold text-slate-400 animate-pulse">Fetching your green ideas...</div>;
    if (isError) return <div className="p-20 text-center text-red-400 font-bold">Failed to load ideas.</div>;

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-8 py-5 font-bold text-slate-700">Idea Info</TableHead>
                        <TableHead className="font-bold text-slate-700">Status</TableHead>
                        <TableHead className="font-bold text-slate-700">Engagement</TableHead>
                        <TableHead className="font-bold text-slate-700 text-right pr-8">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ideas && ideas.length > 0 ? (
                        ideas.map((idea: any) => (
                            <TableRow key={idea.id} className="group hover:bg-slate-50/40 transition-colors">
                                <TableCell className="pl-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0">
                                            <Image
                                                src={idea.images?.[0] || "/placeholder-idea.png"}
                                                alt={idea.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-extrabold text-slate-900 text-[15px] line-clamp-1 group-hover:text-[#009663] transition-colors">
                                                {idea.title.endsWith('.') ? idea.title.slice(0, -1) : idea.title}
                                            </h3>
                                            <Badge variant="secondary" className="gap-1 rounded-md px-1.5 py-0 font-bold text-[10px] text-slate-500 bg-slate-100 self-start">
                                                <Tag size={12} /> {idea.category?.name || "Uncategorized"}
                                            </Badge>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>{getStatusBadge(idea.status)}</TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-4 text-slate-500">
                                        <div className="flex items-center gap-1.5"><ThumbsUp size={16} className="text-blue-500" /> <span className="text-sm font-bold text-slate-700">{idea.upVotes || 0}</span></div>
                                        <div className="flex items-center gap-1.5"><MessageSquare size={16} className="text-slate-400" /> <span className="text-sm font-bold text-slate-700">{idea._count?.comments || 0}</span></div>
                                    </div>
                                </TableCell>

                                <TableCell className="text-right pr-8">
                                    <div className="flex justify-end gap-1">
                                        {/* VIEW BUTTON */}
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="ghost" size="icon" className="hover:bg-green-50 hover:text-green-600 rounded-full">
                                                    <Eye size={18} />
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="sm:max-w-xl overflow-y-auto p-0 border-l border-slate-100">
                                                <div className="p-8 space-y-8">
                                                    <SheetHeader className="text-left space-y-4">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <SheetTitle className="text-3xl font-black text-slate-950 tracking-tighter leading-tight">
                                                                {idea.title.endsWith('.') ? idea.title.slice(0, -1) : idea.title}
                                                            </SheetTitle>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2.5 pt-1">
                                                            {getStatusBadge(idea.status)}
                                                            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 font-bold text-slate-500 bg-slate-100"><Tag size={14} /> {idea.category?.name}</Badge>
                                                            {idea.isPaid && <Badge className="bg-amber-50 text-amber-700 border-amber-100 font-bold">PAID Idea: ${idea.price}</Badge>}
                                                        </div>
                                                    </SheetHeader>

                                                    {idea.images && idea.images.length > 0 && (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {idea.images.map((img: string, idx: number) => (
                                                                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                                                                    <Image src={img} alt="detail" fill className="object-cover" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="space-y-6 pt-2">
                                                        <div className="space-y-2">
                                                            <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-3">
                                                                <div className="p-2 bg-emerald-50 rounded-full border border-emerald-100"><Target size={18} className="text-emerald-600" /></div>
                                                                Problem Statement
                                                            </h4>
                                                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">{idea.problemStatement}</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-3">
                                                                <div className="p-2 bg-blue-50 rounded-full border border-blue-100"><Lightbulb size={18} className="text-blue-600" /></div>
                                                                Proposed Solution
                                                            </h4>
                                                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">{idea.solution}</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-3">
                                                                <div className="p-2 bg-slate-100 rounded-full border border-slate-200"><MessageSquare size={18} className="text-slate-500" /></div>
                                                                Full Description
                                                            </h4>
                                                            <p className="text-sm text-slate-600 leading-relaxed p-1 whitespace-pre-wrap">{idea.description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 flex justify-between items-center text-slate-400">
                                                    <div className="flex items-center gap-2.5 text-xs font-medium">
                                                        <Calendar size={16} />
                                                        <span>Submitted on: <span className="font-bold text-slate-600">{format(new Date(idea.createdAt), "PPP")}</span></span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-300 uppercase font-black tracking-widest">ECOSPARK HUB</span>
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                        {/* EDIT BUTTON */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-blue-50 hover:text-blue-600 rounded-full"
                                            onClick={() => {
                                                setSelectedIdea(idea);
                                                setIsEditOpen(true);
                                            }}
                                        >
                                            <Edit size={18} />
                                        </Button>

                                        {/* DELETE BUTTON */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-50 hover:text-red-600 rounded-full"
                                            disabled={isDeleting}
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this idea?")) {
                                                    handleDelete(idea.id);
                                                }
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="py-24 text-center text-slate-400 italic font-medium">No ideas found. Time to submit a green thought!</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* EDIT DIALOG */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border-none p-0 shadow-2xl">
                    <div className="p-8 space-y-6">
                        <DialogHeader className="text-left border-b border-slate-50 pb-4">
                            <DialogTitle className="text-2xl font-black text-slate-950 flex items-center gap-3">
                                <div className="p-2 bg-emerald-50 rounded-xl">
                                    <Edit className="text-[#009663]" size={20} />
                                </div>
                                Edit Your Green Idea
                            </DialogTitle>
                        </DialogHeader>

                        {selectedIdea && (
                            <EditIdeaForm
                                idea={selectedIdea}
                                onComplete={() => {
                                    setIsEditOpen(false);
                                    queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
                                }}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

