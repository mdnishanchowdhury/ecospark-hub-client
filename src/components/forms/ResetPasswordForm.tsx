"use client";

import { resetPasswordAction } from '@/app/(commonLayout)/(authRouteGroup)/reset-password/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ResetPasswordFormProps } from '@/types/api.types';
import { resetPasswordSchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';


export default function ResetPasswordForm({ email }: ResetPasswordFormProps) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: any) => resetPasswordAction(payload),
    });

    const form = useForm({
        defaultValues: {
            otp: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync({
                    email: email,
                    otp: value.otp,
                    newPassword: value.newPassword
                }) as any;

                if (result.success) {
                    toast.success(result.message || "Password reset successful!");
                    router.push('/login');
                } else {
                    setServerError(result.message || "Failed to reset password");
                }
            } catch (error: any) {
                setServerError(error.message || "Something went wrong");
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-4">
            <Card className='w-full max-w-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-gray-200/60 rounded-[32px] overflow-hidden bg-white p-2'>

                <CardHeader className='text-center space-y-2 pt-10 pb-6'>
                    <div className="mx-auto bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                        <ShieldCheck className="text-blue-600 size-8" />
                    </div>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>
                        Reset Password
                    </CardTitle>
                    <CardDescription className='text-slate-500 text-base'>
                        Check your email for the OTP and <br />
                        enter your new password below.
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-10 pb-4 text-left'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-5'
                    >
                        {/* OTP Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">OTP Code</label>
                            <form.Field
                                name='otp'
                                validators={{
                                    onChange: ({ value }) => {
                                        const res = resetPasswordSchema.shape.otp.safeParse(value);
                                        return res.success ? undefined : res.error.issues[0].message;
                                    }
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type='text'
                                        placeholder='Enter 6-digit code'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663] text-gray-600 tracking-widest font-semibold"
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* New Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">New Password</label>
                            <form.Field
                                name='newPassword'
                                validators={{
                                    onChange: ({ value }) => {
                                        const res = resetPasswordSchema.shape.newPassword.safeParse(value);
                                        return res.success ? undefined : res.error.issues[0].message;
                                    }
                                }}
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

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">Confirm New Password</label>
                            <form.Field
                                name='confirmPassword'
                                validators={{
                                    onChange: ({ value, fieldApi }) => {
                                        if (value !== fieldApi.form.getFieldValue('newPassword')) {
                                            return "Passwords don't match";
                                        }
                                        return undefined;
                                    }
                                }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label=""
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder='••••••••'
                                        className="rounded-xl border-gray-200 h-12 focus:ring-[#009663]"
                                        append={
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((v) => !v)}
                                                className="text-slate-400 mr-2"
                                            >
                                                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                            </button>
                                        }
                                    />
                                )}
                            </form.Field>
                        </div>

                        {serverError && (
                            <Alert variant="destructive" className="rounded-xl py-2 bg-red-50 border-red-100 text-red-600">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <div className="pt-2">
                                    <AppSubmitButton
                                        isPending={isSubmitting || isPending}
                                        pendingLabel='Resetting...'
                                        disabled={!canSubmit}
                                        className="w-full bg-[#009663] hover:bg-[#007d52] text-white font-bold py-5 rounded-xl transition-all text-lg shadow-sm"
                                    >
                                        Reset Password
                                    </AppSubmitButton>
                                </div>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>

                <CardFooter className='justify-center pb-10 pt-4 border-none'>
                    <Link
                        href="/login"
                        className='inline-flex items-center text-[15px] text-slate-500 font-bold hover:text-[#009663] transition-colors underline-offset-4 hover:underline'
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}