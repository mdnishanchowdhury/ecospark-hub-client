"use client";
import { format } from "date-fns";
import { CornerDownRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ReplyInputForm from "./ReplyInput";



const SingleComment = ({ comment, isReply = false, currentUserId, currentUserRole, editingId,
    editValue, setEditingId, setEditValue, updateMutate, deleteMutate,
    activeReplyId, setActiveReplyId, mentionUser, setMentionUser,
    checkAuthAndRedirect, mutation, toggleExpand, expandedComments
}: any) => {
    const isOwnComment = comment.userId === currentUserId;
    const isAdmin = currentUserRole === "ADMIN";
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments[comment.id];
    const isEditing = editingId === comment.id;


    return (
        <div className={`group ${isReply ? "ml-10 mt-2" : "mt-6"}`}>
            <div className="flex gap-2 items-start">
                <div className={`shrink-0 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm ${isReply ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs"}`}>
                    {comment.user?.name?.charAt(0) || "U"}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 relative group/bubble">
                        {isEditing ? (
                            <div className="flex-1 space-y-2">
                                <input
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="w-full bg-white border border-primary/30 rounded-xl px-3 py-1 text-[13px] outline-none shadow-sm"
                                />
                                <div className="flex gap-2 text-[10px] font-bold text-slate-500 uppercase ml-1">
                                    <button onClick={() => updateMutate.mutate({ id: comment.id, content: editValue })} className="text-primary hover:underline">Save</button>
                                    <button onClick={() => setEditingId(null)} className="hover:underline">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="inline-block bg-[#F0F2F5] px-3 py-1.5 rounded-2xl max-w-full">
                                    <p className="font-bold text-[12px] text-slate-900 leading-none mb-1">{comment.user?.name}</p>
                                    <p className="text-[13px] text-slate-800 leading-snug">{comment.content}</p>
                                </div>

                                {(isOwnComment || isAdmin) && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="opacity-0 group-hover/bubble:opacity-100 p-1 hover:bg-slate-100 rounded-full transition-all">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="rounded-xl shadow-lg border-slate-100">

                                            {isOwnComment && (
                                                <DropdownMenuItem
                                                    onClick={() => { setEditingId(comment.id); setEditValue(comment.content); }}
                                                    className="text-xs font-medium gap-2 cursor-pointer"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuItem
                                                onClick={() => deleteMutate.mutate(comment.id)}
                                                className="text-xs font-medium gap-2 text-red-500 cursor-pointer"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </>
                        )}
                    </div>

                    {/* Action Bar */}
                    {!isEditing && (
                        <div className="flex items-center gap-3 ml-2 mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                            <span className="font-normal normal-case hover:underline cursor-pointer">
                                {comment.createdAt ? format(new Date(comment.createdAt), "h:mm a") : "Just now"}
                            </span>
                            {!isOwnComment && (
                                <button
                                    onClick={() => {
                                        if (!checkAuthAndRedirect()) return;
                                        setActiveReplyId(activeReplyId === comment.id ? null : comment.id);
                                        setMentionUser(comment.user?.name ? `@${comment.user.name.replace(/\s+/g, '')} ` : "");
                                    }}
                                    className="hover:underline transition-all"
                                >
                                    Reply
                                </button>
                            )}
                        </div>
                    )}

                    {/* View/Hide Replies */}
                    {!isReply && hasReplies && (
                        <button
                            onClick={() => toggleExpand(comment.id)}
                            className="flex items-center gap-1.5 ml-2 mt-2 text-[13px] font-bold text-slate-500 hover:underline"
                        >
                            <CornerDownRight className="h-3.5 w-3.5" />
                            {isExpanded ? "Hide replies" : `View ${comment.replies.length} replies`}
                        </button>
                    )}

                    {/* Reply Input */}
                    {activeReplyId === comment.id && (
                        <div className="mt-2">
                            <ReplyInputForm
                                initialValue={mentionUser}
                                currentUserId={currentUserId}
                                checkAuthAndRedirect={checkAuthAndRedirect}
                                onSubmit={(val: string) => {
                                    if (!checkAuthAndRedirect()) return;
                                    mutation.mutateAsync({ content: val, parentId: comment.parentId || comment.id });
                                }}
                                onCancel={() => setActiveReplyId(null)}
                                isPending={mutation.isPending}
                            />
                        </div>
                    )}

                    {/* Render Replies */}
                    {!isReply && isExpanded && comment.replies?.map((reply: any) => (
                        <SingleComment
                            key={reply.id}
                            comment={reply}
                            isReply={true}
                            {...{ currentUserId, currentUserRole, editingId, editValue, setEditingId, setEditValue, updateMutate, deleteMutate, activeReplyId, setActiveReplyId, mentionUser, setMentionUser, checkAuthAndRedirect, mutation, toggleExpand, expandedComments }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleComment;