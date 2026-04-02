"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, updateComment } from "@/services/comment/comment.service";
import { MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { CommentSectionProps } from "@/types/idea.types";
import { usePathname, useRouter } from "next/navigation";
import SingleComment from "./SingleComment";



export const CommentSection = ({ ideaId, comments, commentCount, currentUserId, currentUserRole }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [mentionUser, setMentionUser] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const checkAuthAndRedirect = () => {
    if (!currentUserId) {
      toast.error("Please login to comment or reply!");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return false;
    }
    return true;
  };

  // --- Mutations ---
  const mutation = useMutation({
    mutationFn: (data: { content: string; parentId?: string }) =>
      createComment({ ideaId, content: data.content, parentId: data.parentId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["idea", ideaId] });
      toast.success("Posted!");
      setActiveReplyId(null);
      if (variables.parentId) {
        setExpandedComments(prev => ({ ...prev, [variables.parentId!]: true }));
      }
    },
  });

  const deleteMutate = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", ideaId] });
      toast.success("Deleted!");
    },
  });

  const updateMutate = useMutation({
    mutationFn: (data: { id: string; content: string }) => updateComment(data.id, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", ideaId] });
      toast.success("Updated!");
      setEditingId(null);
    },
  });

  const mainForm = useForm({
    defaultValues: { comment: "" },
    onSubmit: async ({ value }) => {
      if (!checkAuthAndRedirect()) return;
      if (!value.comment.trim()) return;
      await mutation.mutateAsync({ content: value.comment });
      mainForm.reset();
    },
  });

  const toggleExpand = (commentId: string) => {
    setExpandedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };



  return (
    <div className="my-10 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
      {/* ... Header and Main Input remains same ... */}
      <div className="flex items-center gap-2 mb-6 px-2">
        <MessageSquare className="h-4 w-4 text-primary" />
        <span className="font-bold text-sm text-slate-600">{commentCount} Comments</span>
      </div>

      <div className="flex gap-2 mb-8 border-b pb-6">
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] uppercase">ME</div>
        <form onSubmit={(e) => { e.preventDefault(); mainForm.handleSubmit(); }} className="flex-1 relative">
          <mainForm.Field
            name="comment"
            children={(field) => (
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-[#F0F2F5] rounded-full px-4 py-2 text-sm outline-none border border-transparent focus:border-slate-200 transition-all"
              />
            )}
          />
          <button type="submit" disabled={mutation.isPending} className="absolute right-2 top-1.5 p-1 text-primary hover:scale-110 disabled:opacity-30">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="space-y-1">
        {comments.map((comment: any) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            {...{ currentUserId, currentUserRole, editingId, editValue, setEditingId, setEditValue, updateMutate, deleteMutate, activeReplyId, setActiveReplyId, mentionUser, setMentionUser, checkAuthAndRedirect, mutation, expandedComments, toggleExpand }}
          />
        ))}
      </div>
    </div>
  );
};

//ReplyInputForm
