"use client"

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4 md:p-10">

            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}