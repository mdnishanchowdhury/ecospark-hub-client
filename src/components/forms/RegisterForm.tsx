"use client";

import { registerAction } from '@/app/(commonLayout)/(authRouteGroup)/register/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IRegisterPayload, registerZodSchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { z } from 'zod';

const getZodError = (schema: z.ZodTypeAny, value: any) => {
    const res = schema.safeParse(value);
    return res.success ? undefined : res.error.issues[0].message;
};

export default function RegisterForm({ redirectPath }: { redirectPath?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IRegisterPayload) => registerAction(payload, redirectPath),
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
                const result = await mutateAsync(value);
                if (result && 'success' in result && !result.success) {
                    setServerError(result.message);
                }
            } catch (error: any) {
                if (!error.message?.includes("NEXT_REDIRECT")) {
                    setServerError(error.message);
                }
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4 font-sans">
            <Card className='w-full max-w-[520px] shadow-sm border-gray-200/60 rounded-[24px] bg-white'>
                <CardHeader className='text-center space-y-1 pt-8 pb-4'>
                    <CardTitle className='text-[28px] font-bold text-slate-900 tracking-tight'>
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-[15px]">
                        Join our community to fuel green innovation
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-8 pb-8 space-y-6'>
                    <div className="border-t border-gray-100 my-2" />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-4'
                    >
                        {/* Name Field */}
                        <form.Field
                            name='name'
                            validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.name, value) }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Full Name"
                                    placeholder='Nishan Chowdhury'
                                />
                            )}
                        </form.Field>

                        {/* Email Field */}
                        <form.Field
                            name='email'
                            validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.email, value) }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Email Address"
                                    type='email'
                                    placeholder='ecospark@gmail.com'
                                />
                            )}
                        </form.Field>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field
                                name='password'
                                validators={{ onChange: ({ value }) => getZodError(registerZodSchema.shape.password, value) }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>

                            <form.Field
                                name='confirmPassword'
                                validators={{
                                    onChange: ({ value, fieldApi }) => {
                                        if (value !== fieldApi.form.getFieldValue('password')) {
                                            return "Passwords don't match";
                                        }
                                        return undefined;
                                    }
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Confirm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-slate-400 hover:text-slate-600"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                        {serverError && (
                            <Alert variant="destructive" className="py-2">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <AppSubmitButton
                            isPending={isPending}
                            className="w-full bg-[#009663] hover:bg-[#007d52] text-white py-5 rounded-xl font-bold text-base transition-all shadow-sm mt-2"
                        >
                            Create Account
                        </AppSubmitButton>
                    </form>


                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or sign up with</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <Button
                        variant='outline'
                        type="button"
                        className='w-full py-5 rounded-xl border-gray-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all text-base shadow-sm flex items-center justify-center gap-3'
                        onClick={() => {
                            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                            window.location.href = `${baseUrl}/auth/login/google`;
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="text-center pt-2">
                        <p className='text-[15px] text-slate-500'>
                            Already have an account? <Link href="/login" className='text-[#009663] font-bold hover:underline'>Sign in</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}