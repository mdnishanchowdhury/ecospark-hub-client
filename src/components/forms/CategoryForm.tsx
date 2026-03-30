"use client";

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { createCategory } from '@/services/admin/category.services';
import { createCategoryZodSchema } from '@/zod/idea.validation';

export default function CategoryForm() {
    const [serverError, setServerError] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: { name: string }) => createCategory(payload),
        onSuccess: (result: any) => {
            if (result?.success) {
                toast.success(result.message || "Category created successfully! 🎉");
                form.reset();
                setServerError(null);
            } else {
                setServerError(result?.message || "Failed to create category");
            }
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            setServerError(errorMsg);
            toast.error(errorMsg);
        }
    });

    const form = useForm({
        defaultValues: {
            name: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);

            const validation = createCategoryZodSchema.safeParse(value);
            if (!validation.success) {
                toast.error(validation.error.issues[0].message);
                return;
            }

            await mutateAsync(value);
        }
    });

    return (
        <Card className="w-full max-w-md mx-auto rounded-[24px] shadow-sm border-gray-100 bg-white">
            <CardHeader className="pt-8">
                <CardTitle className="text-xl font-bold text-slate-800 text-center">Add New Category</CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-5"
                >
                    <form.Field
                        name="name"
                        validators={{
                            onChange: ({ value }) => {
                                const res = createCategoryZodSchema.safeParse({ name: value });
                                return res.success ? undefined : res.error.issues[0].message;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <label className="text-[15px] font-bold text-slate-700 ml-1">Category Name</label>
                                <input
                                    className={`w-full p-4 bg-slate-50 border ${field.state.meta.errors.length ? 'border-red-500' : 'border-slate-100'} rounded-2xl outline-none focus:border-[#009663] transition-all`}
                                    placeholder="e.g. Solar Energy, Waste Management"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-red-500 text-xs italic ml-1 font-medium">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {serverError && (
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                            <p className="text-red-600 text-xs font-bold text-center">
                                {serverError}
                            </p>
                        </div>
                    )}

                    <AppSubmitButton
                        isPending={isPending}
                        className="w-full bg-[#009663] hover:bg-[#007b52] rounded-2xl py-8 font-extrabold text-lg shadow-md transition-transform active:scale-[0.98]"
                    >
                        {isPending ? "Creating..." : "Create Category"}
                    </AppSubmitButton>
                </form>
            </CardContent>
        </Card>
    );
}