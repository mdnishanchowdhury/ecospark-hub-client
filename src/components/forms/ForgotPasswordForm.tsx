"use client";

import { forgotPasswordAction } from '@/app/(commonLayout)/(authRouteGroup)/forgot-password/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { forgotPasswordSchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { KeyRound, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (email: string) => forgotPasswordAction(email),
    });

    const form = useForm({
        defaultValues: { email: "" },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value.email) as any;
                if (result.success) {
                    toast.success(result.message || "Reset link sent!");
                    router.push(`/reset-password?email=${encodeURIComponent(value.email)}`);
                } else {
                    setServerError(result.message || "Failed to send reset link");
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
                    <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                        <KeyRound className="text-[#009663] size-8" />
                    </div>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>Forgot Password?</CardTitle>
                    <CardDescription className='text-slate-500 text-base'>
                        Enter your email and we&apos;ll send <br /> you a link to reset your password.
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-10 pb-4 text-left'>
                    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }} className='space-y-5'>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-800 ml-1">Email Address</label>
                            <form.Field
                                name='email'
                                validators={{
                                    onChange: ({ value }) => {
                                        const res = forgotPasswordSchema.shape.email.safeParse(value);
                                        return res.success ? undefined : res.error.issues[0].message;
                                    }
                                }}
                            >
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

                        {serverError && (
                            <Alert variant="destructive" className="rounded-xl py-2 bg-red-50 border-red-100 text-red-600">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    pendingLabel='Sending...'
                                    disabled={!canSubmit}
                                    className="w-full bg-[#009663] hover:bg-[#007d52] text-white font-bold py-5 rounded-xl transition-all text-lg"
                                >
                                    Send Reset Link
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>

                <CardFooter className='justify-center pb-10 pt-4'>
                    <Link href="/login" className='inline-flex items-center text-[15px] text-slate-500 font-bold hover:text-[#009663]'>
                        <ArrowLeft className="mr-2 size-4" /> Back to Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}