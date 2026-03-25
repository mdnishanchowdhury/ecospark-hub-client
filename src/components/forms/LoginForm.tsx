"use client";

import { loginAction } from '@/app/(commonLayout)/(authRouteGroup)/login/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ILoginPayload, loginZodSchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LoginForm({ redirectPath }: { redirectPath?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    });

    const form = useForm({
        defaultValues: { email: "", password: "" },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result.success) setServerError(result.message || "Login Failed");
            } catch (error: any) {
                setServerError(`Login failed: ${error.message}`);
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-4">

            <Card className='w-full max-w-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-gray-200/60 rounded-[32px] overflow-hidden bg-white p-2'>

                <CardHeader className='text-center space-y-2 pt-10 pb-6'>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>
                        Welcome Back!
                    </CardTitle>
                    <CardDescription className='text-slate-500 text-base'>
                        Enter your credentials to access your green ideas
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
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">Email Address</label>
                            <form.Field
                                name='email'
                                validators={{ onChange: loginZodSchema.shape.email }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type='email'
                                        placeholder='ecospark@gmail.com'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663] text-gray-600"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-bold text-slate-800">Your Password</label>
                                <Link href="/forgot-password" className='text-sm text-[#009663] hover:underline font-medium'>
                                    Forgot password?
                                </Link>
                            </div>
                            <form.Field
                                name='password'
                                validators={{ onChange: loginZodSchema.shape.password }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type={showPassword ? "text" : "password"}
                                        placeholder='••••••••'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="text-slate-400 mr-2"
                                            >
                                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                        {serverError && (
                            <Alert variant={"destructive"} className="rounded-xl py-2">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        {/* Sign In Button */}
                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <div className="pt-2">
                                    <AppSubmitButton
                                        isPending={isSubmitting || isPending}
                                        pendingLabel='Signing In...'
                                        disabled={!canSubmit}
                                        className="w-full bg-[#009663] hover:bg-[#007d52] text-white font-bold py-5 rounded-xl transition-all text-lg shadow-sm"
                                    >
                                        Sign In
                                    </AppSubmitButton>
                                </div>
                            )}
                        </form.Subscribe>
                    </form>

                    {/* Google Button */}
                    <div className='mt-4'>
                        <Button
                            variant='outline'
                            type="button"
                            className='w-full py-5 rounded-xl border-gray-200 text-slate-700 font-medium hover:bg-slate-50 transition-all text-lg'
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
                    </div>
                </CardContent>

                <CardFooter className='justify-center pb-10 pt-2 border-none'>
                    <p className='text-[15px] text-slate-500 font-medium'>
                        New here?{" "}
                        <Link href="/register" className='text-[#009663] font-bold hover:underline ml-1'>
                            Create an account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}