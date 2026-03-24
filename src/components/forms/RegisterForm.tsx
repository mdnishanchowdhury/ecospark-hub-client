"use client";

import { registerAction } from '@/app/(commonLayout)/(authRouteGroup)/register/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IRegisterPayload, registerZodSchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RegisterFormProps {
    redirectPath?: string;
}

export default function RegisterForm({ redirectPath }: RegisterFormProps) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IRegisterPayload) => registerAction(payload),
    });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result.success) {
                    setServerError(result.message || "Registration Failed");
                    return;
                }
                
                if (typeof window !== "undefined") {
                    window.location.href = redirectPath || "/dashboard";
                }
            } catch (error: any) {
                setServerError(`Registration failed: ${error.message}`);
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-6">
            <Card className='w-full max-w-[550px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-gray-200/60 rounded-[32px] overflow-hidden bg-white p-2'>
                <CardHeader className='text-center space-y-2 pt-10 pb-6'>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>
                        Create an account
                    </CardTitle>
                    <CardDescription className='text-slate-500 text-base'>
                        Join our community to fuel green innovation
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-10 pb-8'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-5'
                    >
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-800 ml-1">Full Name</label>
                            <form.Field name='name' validators={{ onChange: registerZodSchema.shape.name }}>
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="" 
                                        placeholder='Nishan Chowdhury'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-800 ml-1">Email Address</label>
                            <form.Field name='email' validators={{ onChange: registerZodSchema.shape.email }}>
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="" 
                                        type='email'
                                        placeholder='ecospark@gmail.com'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-800 ml-1">Password</label>
                                <form.Field name='password' validators={{ onChange: registerZodSchema.shape.password }}>
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label=""
                                            type={showPassword ? "text" : "password"}
                                            placeholder='••••••••'
                                            className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                            append={
                                                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-slate-400 mr-2">
                                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                                </button>
                                            }
                                        />
                                    )}
                                </form.Field>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-800 ml-1">Confirm</label>
                                <form.Field name='confirmPassword'>
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label=""
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder='••••••••'
                                            className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                            append={
                                                <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="text-slate-400 mr-2">
                                                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                                </button>
                                            }
                                        />
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        {serverError && (
                            <Alert variant={"destructive"} className="rounded-xl py-2">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <div className="pt-2">
                                    <AppSubmitButton
                                        isPending={isSubmitting || isPending}
                                        pendingLabel='Creating Account...'
                                        disabled={!canSubmit}
                                        className="w-full bg-[#009663] hover:bg-[#007d52] text-white font-bold py-6 rounded-xl transition-all text-lg shadow-sm"
                                    >
                                        Create Account
                                    </AppSubmitButton>
                                </div>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>

                <CardFooter className='flex flex-col items-center pb-10 pt-2 border-none'>
                    <p className='text-[15px] text-slate-500 font-medium'>
                        Already have an account?{" "}
                        <Link href="/login" className='text-[#009663] font-bold hover:underline ml-1'>
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}