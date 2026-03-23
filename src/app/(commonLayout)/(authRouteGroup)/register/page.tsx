"use client"

import { RegisterForm } from "@/components/forms/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 md:p-10">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  )
}