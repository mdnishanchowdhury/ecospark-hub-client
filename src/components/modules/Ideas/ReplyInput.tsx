"use client";
import { useState } from "react";
import { Send, X } from "lucide-react";

const ReplyInputForm = ({ onSubmit, onCancel, isPending, initialValue, currentUserId, checkAuthAndRedirect }: any) => {
    const [text, setText] = useState(initialValue || "");
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            if (!currentUserId) {
                checkAuthAndRedirect();
                return;
            }

            if (text.trim())
                onSubmit(text);
        }} className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 flex items-center bg-[#F0F2F5] rounded-2xl px-3 py-1 border border-primary/10">
                <input
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 bg-transparent py-1 text-[13px] outline-none"
                />
                <div className="flex gap-1">
                    <button type="button" onClick={onCancel} className="p-1 text-slate-400 hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
                    <button type="submit" disabled={isPending} className="p-1 text-primary"><Send className="h-3.5 w-3.5" /></button>
                </div>
            </div>
        </form>
    );
};

export default ReplyInputForm;