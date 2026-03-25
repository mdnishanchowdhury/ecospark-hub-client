"use client";

import { verifyEmailAction } from '@/app/(commonLayout)/(authRouteGroup)/verify-email/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { verifySchema } from '@/zod/auth.validation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function VarifyForm({
    initialEmail,
    redirectPath
}: {
    initialEmail: string;
    redirectPath?: string
}) {
    const [serverError, setServerError] = useState<string | null>(null);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: { email: string; otp: string }) =>
            verifyEmailAction(payload.email, payload.otp, redirectPath),
    });

    const form = useForm({
        defaultValues: { otp: "" },
        validators: {
            onChange: verifySchema,
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync({
                    email: initialEmail,
                    otp: value.otp
                });

                if (result && !result.success) {
                    setServerError(result.message || "Verification Failed");
                }
            } catch (error: any) {
                if (error.digest?.includes("NEXT_REDIRECT") || error.message === "NEXT_REDIRECT") {
                    return;
                }
                setServerError(error.message || "Something went wrong");
            }
        }
    });

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-4">
            <Card className='w-full max-w-[480px] shadow-lg border-gray-200 rounded-[32px] bg-white p-2'>
                <CardHeader className='text-center pt-10 pb-6'>
                    <CardTitle className='text-[32px] font-bold text-slate-900 tracking-tight'>
                        Verify Email
                    </CardTitle>
                    <CardDescription className='text-base text-slate-500'>
                        We've sent a code to <br />
                        <span className="font-bold text-[#009663]">{initialEmail || "your email"}</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className='px-10 pb-8'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-6'
                    >
                        <form.Field name='otp'>
                            {(field) => (
                                <div className="space-y-1">
                                    <AppField
                                        field={field}
                                        label=""
                                        type='text'
                                        placeholder='· · · · · ·'
                                        className="text-center text-2xl tracking-[10px] h-14 font-bold rounded-xl border-2 focus:ring-[#009663] transition-all"
                                        {...({
                                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                                                field.handleChange(val);
                                            }
                                        } as any)}
                                    />
                                    {field.state.meta.errors && (
                                        <p className="text-[13px] text-red-500 font-medium ml-1">
                                            {field.state.meta.errors.join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {serverError && (
                            <Alert variant="destructive" className="rounded-xl bg-red-50 border-red-100 text-red-600">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting, s.values.otp] as const}>
                            {([canSubmit, isSubmitting, otpValue]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    pendingLabel='Verifying...'
                                    disabled={!canSubmit || isSubmitting || otpValue.length < 6}
                                    className="w-full bg-[#009663] hover:bg-[#007d52] text-white py-5 rounded-xl text-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    Verify Now
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}