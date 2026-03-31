"use client";

import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { updateIdeaAction } from '@/services/ideas/idea.service';
import { getAllCategories } from '@/services/admin/category.services';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';
import { ideaFieldsSchema } from '@/zod/idea.validation';
import { z } from 'zod';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const getZodError = (schema: z.ZodTypeAny, value: any) => {
    const res = schema.safeParse(value);
    return res.success ? undefined : res.error.issues[0].message;
};

interface EditIdeaFormProps {
    idea: any;
    onComplete: () => void;
}

export default function EditIdeaForm({ idea, onComplete }: EditIdeaFormProps) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const { data: catResponse, isLoading: isCatsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    const categories = (catResponse as any)?.data || [];

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: FormData) => updateIdeaAction(idea.id || idea._id, payload),
        onSuccess: (result: any) => {
            if (result?.success !== false) {
                toast.success("Idea updated successfully! 🎉");
                queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
                onComplete();
            } else {
                setServerError(result.message || "Update failed");
            }
        },
        onError: (error: any) => {
            setServerError(error.message || "Update failed");
        }
    });

    const form = useForm({
        defaultValues: {
            title: idea.title || "",
            problemStatement: idea.problemStatement || "",
            solution: idea.solution || "",
            description: idea.description || "",
            isPaid: idea.isPaid || false,
            price: idea.price || 0,
            categoryId: idea.category?.id || idea.categoryId || "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            const formData = new FormData();
            formData.append("title", value.title);
            formData.append("problemStatement", value.problemStatement);
            formData.append("solution", value.solution);
            formData.append("description", value.description);
            formData.append("categoryId", value.categoryId);
            formData.append("isPaid", String(value.isPaid));
            formData.append("price", String(value.isPaid ? value.price : 0));

            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => formData.append("images", file));
            }

            await mutateAsync(formData);
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            if (selectedFiles.length + filesArray.length > 5) {
                toast.error("Maximum 5 images allowed");
                return;
            }
            setSelectedFiles((prev) => [...prev, ...filesArray]);
            e.target.value = '';
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className='space-y-5 pb-2'
        >
            {/* Title */}
            <form.Field name="title" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.title, value) }}>
                {(field) => (
                    <div className="space-y-1.5">
                        <AppField field={field} label="Idea Title" placeholder="What's your green idea?" />
                    </div>
                )}
            </form.Field>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field name="problemStatement" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.problemStatement, value) }}>
                    {(field) => <AppField field={field} label="The Problem" placeholder="Describe the issue..." />}
                </form.Field>
                <form.Field name="solution" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.solution, value) }}>
                    {(field) => <AppField field={field} label="Proposed Solution" placeholder="How to fix it?" />}
                </form.Field>
            </div>

            {/* Category & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <form.Field name="categoryId">
                    {(field) => (
                        <div className="space-y-2">
                            <label className="text-[14px] font-bold text-slate-700 ml-1 italic tracking-tight uppercase">Category</label>
                            <Select onValueChange={(val) => field.handleChange(val)} defaultValue={field.state.value}>
                                <SelectTrigger className="w-full h-[52px] bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-[#009663] focus:border-[#009663] transition-all">
                                    <SelectValue placeholder={isCatsLoading ? "Loading..." : "Select Category"} />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl shadow-xl border-slate-100">
                                    {categories.map((cat: any) => (
                                        <SelectItem key={cat.id} value={cat.id} className="focus:bg-emerald-50 rounded-lg">{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </form.Field>

                <div className="space-y-2">
                    <label className="text-[14px] font-bold text-slate-700 ml-1 italic tracking-tight uppercase">Pricing Model</label>
                    <div className="flex items-center gap-4 p-2 bg-slate-50/50 rounded-2xl border border-slate-100 h-[52px] transition-all">
                        <div className="flex items-center gap-3 flex-1 ml-2">
                            <span className="text-[10px] font-black text-slate-400 tracking-widest">FREE</span>
                            <form.Field name="isPaid">
                                {(field) => <Switch checked={field.state.value} onCheckedChange={field.handleChange} className="data-[state=checked]:bg-[#009663]" />}
                            </form.Field>
                            <span className="text-[10px] font-black text-[#009663] tracking-widest">PAID</span>
                        </div>
                        <form.Subscribe selector={(s) => s.values.isPaid}>
                            {(isPaid) => isPaid && (
                                <form.Field name="price">
                                    {(field) => (
                                        <div className="relative group mr-2">
                                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                                            <input
                                                type="number"
                                                className="w-24 pl-6 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none text-right font-black text-sm focus:border-[#009663] transition-all"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                            />
                                        </div>
                                    )}
                                </form.Field>
                            )}
                        </form.Subscribe>
                    </div>
                </div>
            </div>

            {/* Image Preview & Upload */}
            <div className="space-y-2">
                <label className="text-[14px] font-bold text-slate-700 ml-1 italic tracking-tight uppercase">Upload New Media</label>
                <div className="flex flex-wrap gap-3 p-3 bg-slate-50/30 rounded-2xl border border-slate-100 border-dashed">
                    <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#009663] hover:bg-emerald-50 bg-white transition-all group"
                    >
                        <Plus className="text-slate-300 group-hover:text-[#009663]" size={24} />
                    </button>
                    <input type="file" ref={fileInputRef} multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                    
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-in zoom-in-50 duration-200">
                            <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                            <button 
                                type="button" 
                                onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))} 
                                className="absolute top-0 right-0 bg-rose-500 text-white rounded-bl-xl p-1 hover:bg-rose-600 transition-colors"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description */}
            <form.Field name="description">
                {(field) => (
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-slate-700 ml-1 italic tracking-tight uppercase">Detailed Description</label>
                        <textarea
                            className="w-full min-h-[140px] p-4 bg-slate-50/50 border border-slate-100 rounded-2xl outline-none focus:border-[#009663] focus:ring-1 focus:ring-emerald-100 text-sm resize-none leading-relaxed transition-all placeholder:text-slate-400"
                            placeholder="Tell us more about your vision..."
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    </div>
                )}
            </form.Field>

            {serverError && (
                <Alert variant="destructive" className="rounded-2xl border-rose-100 bg-rose-50 text-rose-600 animate-in fade-in duration-300">
                    <AlertDescription className="text-center font-bold text-xs uppercase tracking-tight">{serverError}</AlertDescription>
                </Alert>
            )}

            <div className="flex gap-3 pt-2">
                 <AppSubmitButton 
                    isPending={isPending} 
                    className="w-full bg-[#009663] hover:bg-[#007b52] h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-100 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                    {isPending ? "Syncing..." : "Update Green Idea"}
                </AppSubmitButton>
            </div>
        </form>
    );
}