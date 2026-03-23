"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="space-y-1 text-center bg-slate-50/50 border-b mb-4">
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Join our community to fuel green innovation
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="grid gap-4">
                        {/* Full Name Field */}
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Nishan Chowdhury"
                                required
                                className="h-10 focus-visible:ring-emerald-500 border-slate-200"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="grid gap-2 text-left">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ecospark@gmail.com"
                                required
                                className="h-10 focus-visible:ring-emerald-500 border-slate-200"
                            />
                        </div>

                        {/* Password Fields Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2 text-left">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="h-10 pr-10 focus-visible:ring-emerald-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-2 text-left">
                                <Label htmlFor="confirm-password">Confirm</Label>
                                <div className="relative">
                                    <Input
                                        id="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="h-10 pr-10 focus-visible:ring-emerald-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-[12px] text-slate-400 -mt-2">
                            * Password must be at least 8 characters long.
                        </p>

                        <div className="flex flex-col gap-3 mt-2">
                            <Button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10 transition-all shadow-md shadow-emerald-100"
                            >
                                Create Account
                            </Button>

                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-400">Or sign up with</span>
                                </div>
                            </div>

                            <Button variant="outline" type="button" className="w-full h-10 border-slate-200 hover:bg-slate-50 transition-colors">
                                Continue with Google
                            </Button>
                        </div>

                        <p className="text-center text-sm text-slate-500 mt-2">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-emerald-600 hover:underline underline-offset-4 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>

            <p className="px-6 text-center text-[12px] text-slate-400 leading-relaxed">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-slate-600 transition-colors">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</Link>.
            </p>
        </div>
    );
}