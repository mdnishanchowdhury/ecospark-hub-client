"use client";

import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createIdeaAction } from '@/services/ideas/idea.service';
import { getAllCategories } from '@/services/admin/category.services';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';
import { ideaFieldsSchema, createIdeaZodSchema } from '@/zod/idea.validation';
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

export default function CreateIdeaForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setIsMounted(true); }, []);

    const { data: catResponse, isLoading: isCatsLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
    const categories = (catResponse as any)?.data || [];

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: FormData) => createIdeaAction(payload),
        onSuccess: (result: any) => {
            if (result?.success) {
                toast.success("Idea submitted successfully! 🎉");
                form.reset();
                setSelectedFiles([]);
                setServerError(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        },
        onError: (error: any) => {
            setServerError(error.message || "Submission failed");
        }
    });

    const form = useForm({
        defaultValues: {
            title: "",
            problemStatement: "",
            solution: "",
            description: "",
            isPaid: false,
            price: 0,
            categoryId: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);

            const validation = createIdeaZodSchema.safeParse(value);
            if (!validation.success) {
                setServerError(validation.error.issues[0].message);
                return;
            }
            if (selectedFiles.length < 2) {
                const imgErr = "Please upload at least 2 images.";
                setServerError(imgErr);
                toast.error(imgErr);
                return;
            }

            const formData = new FormData();
            formData.append("title", value.title);
            formData.append("problemStatement", value.problemStatement);
            formData.append("solution", value.solution);
            formData.append("description", value.description);
            formData.append("categoryId", value.categoryId);
            formData.append("isPaid", String(value.isPaid));
            formData.append("price", String(value.isPaid ? value.price : 0));
            selectedFiles.forEach((file) => formData.append("images", file));

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

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <Card className='w-full max-w-[800px] rounded-[32px] shadow-md border-gray-100 bg-[#f0f4f1]'>
                <CardHeader className='bg-[#1b4332] text-white py-10 px-6 text-center relative'>
                    <CardTitle className="flex items-center text-3xl justify-center gap-3 mb-2">Share Your Green Idea</CardTitle>
                    <CardTitle className="text-[#95d5b2] font-medium italic">Inspire the world — every eco-solution starts with a single spark 🌱</CardTitle>
                </CardHeader>

                <CardContent className="px-6 md:px-10 pb-10 mt-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-6'
                    >
                        {/* Title Field */}
                        <form.Field name="title" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.title, value) }}>
                            {(field) => <AppField field={field} label="Idea Title" placeholder="Give your idea a catchy name..."
                                className="border-gray-200 bg-gray-50/50  "
                            />}
                        </form.Field>

                        {/* Problem & Solution Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <form.Field name="problemStatement" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.problemStatement, value) }}>
                                {(field) =>
                                    <textarea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-40 p-4 border border-gray-200 bg-gray-50/50 rounded-[24px] outline-none focus:border-[#009663] transition-all resize-none mt-2"
                                        placeholder="Describe the problem you're solving in detail..."
                                    />
                                }
                            </form.Field>

                            <form.Field name="solution" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.solution, value) }}>
                                {(field) =>
                                    <textarea
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-full h-40 p-4 border border-gray-200 bg-gray-50/50 rounded-[24px] outline-none focus:border-[#009663] transition-all resize-none mt-2"
                                        placeholder="How does your idea solve this problem?"
                                    />
                                }
                            </form.Field>
                        </div>

                        {/* Category & Pricing Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <form.Field name="categoryId" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.categoryId, value) }}>
                                {(field) => (
                                    <div className="space-y-3">
                                        <label className="text-[15px] font-bold text-slate-700 ml-1">Category</label>
                                        <Select onValueChange={(val) => field.handleChange(val)} value={field.state.value}>
                                            <SelectTrigger className="w-full h-[56px] border border-gray-200 bg-gray-50/50 rounded-2xl focus:ring-[#009663] mt-2">
                                                <SelectValue placeholder={isCatsLoading ? "Loading..." : "Select Category"} />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl shadow-xl">
                                                {categories.map((cat: any) => (
                                                    <SelectItem key={cat._id || cat.id} value={cat._id || cat.id} className="py-3 cursor-pointer">
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {field.state.meta.errors.length > 0 && (
                                            <p className="text-red-500 text-xs italic ml-1">{field.state.meta.errors[0]}</p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <div className="space-y-3">
                                <label className="text-[15px] font-bold text-slate-700 ml-1">Pricing Model</label>
                                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-gray-200 bg-gray-50/50 h-[56px] mt-2">
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="text-[10px] font-black text-slate-400 tracking-wider">FREE</span>
                                        <form.Field name="isPaid">
                                            {(field) => <Switch checked={field.state.value} onCheckedChange={field.handleChange} />}
                                        </form.Field>
                                        <span className="text-[10px] font-black text-[#009663] tracking-wider">PAID</span>
                                    </div>

                                    <form.Subscribe selector={(s) => s.values.isPaid}>
                                        {(isPaid) => isPaid && (
                                            <form.Field name="price">
                                                {(field) => (
                                                    <input
                                                        type="number"
                                                        className="w-24 p-2 bg-white border border-slate-200 rounded-xl outline-none text-center font-bold text-slate-700"
                                                        placeholder="$ 0"
                                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                                    />
                                                )}
                                            </form.Field>
                                        )}
                                    </form.Subscribe>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[15px] font-bold text-slate-700 ml-1">Images (Min 2, Max 5)</label>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-400 rounded-2xl hover:border-[#009663] bg-gray transition-colors"
                                >
                                    <Plus className="text-slate-400" size={24} />
                                </button>
                                <input type="file" ref={fileInputRef} multiple accept="image/*" className="hidden" onChange={handleFileChange} />

                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form.Field name="description" validators={{ onChange: ({ value }) => getZodError(ideaFieldsSchema.description, value) }}>
                            {(field) => (
                                <div className="space-y-2">
                                    <label className="text-[15px] font-bold text-slate-700 ml-1">Full Description</label>
                                    <textarea
                                        className="w-full min-h-[160px] p-4 border border-gray-200 bg-gray-50/50 rounded-[24px] outline-none focus:border-[#009663] transition-all resize-none mt-2"
                                        placeholder="Explain your idea in detail..."
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-red-500 text-xs italic ml-1">{field.state.meta.errors[0]}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {serverError && (
                            <Alert variant="destructive" className="rounded-2xl bg-red-50 border-red-100">
                                <AlertDescription className="font-bold text-center text-red-600">{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <AppSubmitButton isPending={isPending} className="w-full bg-[#009663] hover:bg-[#007b52] py-6 rounded-2xl font-extrabold text-xl shadow-lg transition-all active:scale-[0.98]">
                            {isPending ? "Publishing..." : "Publish Green Idea"}
                        </AppSubmitButton>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}