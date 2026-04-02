"use client";

import { changePasswordAction } from '@/app/(dashboardLayout)/[role]/dashboard/change-password/_action';
import { AppField } from '@/components/shared/form/Appfield';
import AppSubmitButton from '@/components/shared/form/AppSubmitButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ChangePasswordForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: any) => changePasswordAction(payload),
    });

    const form = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync({
                    currentPassword: value.currentPassword,
                    newPassword: value.newPassword
                }) as { success: boolean; message: string };

                if (result.success) {
                    toast.success(result.message || "Password updated successfully!");

                    form.reset();

                } else {
                    setServerError(result.message);
                }
            } catch (error: any) {
                setServerError(error?.message || "An unexpected error occurred");
            }
        }
    });

    if (!isMounted) return null;

    return (
        <div className="w-full flex items-center justify-center ">
            <Card className='w-full max-w-[480px] shadow-sm border-gray-200/60 rounded-[32px] overflow-hidden bg-white'>
                <CardHeader className='text-center space-y-2 pt-10 pb-6'>
                    <div className="mx-auto bg-emerald-50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                        <ShieldCheck className="text-emerald-600 size-8" />
                    </div>
                    <CardTitle className='text-2xl font-bold text-slate-900'>Security Settings</CardTitle>
                    <CardDescription>Update your account password to stay secure.</CardDescription>
                </CardHeader>

                <CardContent className='px-10 pb-4'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className='space-y-6'
                    >
                        {/* Current Password */}
                        <form.Field name='currentPassword'>
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Current Password"
                                    type={showPasswords.current ? "text" : "password"}
                                    placeholder='Enter current password'
                                    className="rounded-xl h-12"
                                    append={
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))}
                                            className="mr-3 text-slate-400"
                                        >
                                            {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                            )}
                        </form.Field>

                        {/* New Password */}
                        <form.Field name='newPassword'>
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="New Password"
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder='Enter new password'
                                    className="rounded-xl h-12"
                                    append={
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))}
                                            className="mr-3 text-slate-400"
                                        >
                                            {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                            )}
                        </form.Field>

                        {/* Confirm Password */}
                        <form.Field
                            name='confirmPassword'
                            validators={{
                                onChange: ({ value, fieldApi }) =>
                                    value !== fieldApi.form.getFieldValue('newPassword')
                                        ? "Passwords do not match"
                                        : undefined
                            }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Confirm New Password"
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder='Confirm new password'
                                    className="rounded-xl h-12"
                                    append={
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))}
                                            className="mr-3 text-slate-400"
                                        >
                                            {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                            )}
                        </form.Field>

                        {serverError && (
                            <Alert variant="destructive" className="rounded-xl py-2 bg-red-50 text-red-600 border-none">
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton
                                    isPending={isSubmitting || isPending}
                                    disabled={!canSubmit}
                                    className="w-full bg-[#009663] hover:bg-[#007d52] text-white font-bold py-5 rounded-xl text-lg shadow-sm"
                                >
                                    Update Password
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>
                </CardContent>

                <CardFooter className='justify-center pb-8 pt-2'>
                    <Link href="/dashboard" className='inline-flex items-center text-sm text-slate-500 font-bold hover:text-emerald-600 transition-colors'>
                        <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}