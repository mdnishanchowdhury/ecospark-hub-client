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

export default function RegisterForm({ redirectPath }: { redirectPath?: string }) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                    setServerError(`Error: ${error.message}`);
                }
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
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
                        <form.Field name='name' validators={{ onChange: registerZodSchema.shape.name }}>
                            {(field) => (
                                <AppField 
                                    field={field} 
                                    label="Full Name" 
                                    placeholder='Nishan Chowdhury' 
                                    className="h-11 rounded-lg border-gray-200 focus:ring-[#009663]"
                                />
                            )}
                        </form.Field>

                        {/* Email Field */}
                        <form.Field name='email' validators={{ onChange: registerZodSchema.shape.email }}>
                            {(field) => (
                                <AppField 
                                    field={field} 
                                    label="Email Address" 
                                    type='email' 
                                    placeholder='ecospark@gmail.com' 
                                    className="h-11 rounded-lg border-gray-200 focus:ring-[#009663]"
                                />
                            )}
                        </form.Field>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form.Field name='password' validators={{ onChange: registerZodSchema.shape.password }}>
                                {(field) => (
                                    <AppField 
                                        field={field} 
                                        label="Password" 
                                        type={showPassword ? "text" : "password"} 
                                        className="h-11 rounded-lg border-gray-200"
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
                            <form.Field name='confirmPassword'>
                                {(field) => (
                                    <AppField 
                                        field={field} 
                                        label="Confirm" 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        className="h-11 rounded-lg border-gray-200"
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

                        <p className="text-[12px] text-slate-400">
                            * Password must be at least 8 characters long.
                        </p>

                        {serverError && (
                            <Alert variant="destructive" className="py-2">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <AppSubmitButton
                            isPending={isPending}
                            className="w-full bg-[#009663] hover:bg-[#007d52] text-white py-5 rounded-lg font-semibold text-base transition-all shadow-sm mt-2"
                        >
                            Create Account
                        </AppSubmitButton>
                    </form>

                    {/* Divider */}
                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or sign up with</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                        variant='outline'
                        type="button"
                        className='w-full py-5 rounded-lg border-gray-200 text-slate-600 font-medium hover:bg-slate-50 transition-all text-base shadow-sm'
                        onClick={() => {
                            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                            window.location.href = `${baseUrl}/auth/login/google`;
                        }}
                    >
                        Continue with Google
                    </Button>

                    <div className="text-center pt-2">
                        <p className='text-[15px] text-slate-500'>
                            Already have an account? <Link href="/login" className='text-[#009663] font-bold hover:underline'>Sign in</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Footer Links */}
            <div className="mt-8 text-center px-4">
                <p className="text-[13px] text-slate-400 leading-relaxed">
                    By clicking continue, you agree to our <Link href="/terms" className="underline hover:text-slate-600">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}