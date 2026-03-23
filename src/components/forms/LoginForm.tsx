"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
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

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome Back!
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to access your green ideas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        {/* Email Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ecospark@gmail.com"
                                required
                                className="h-10 focus-visible:ring-emerald-500"
                            />
                        </div>

                        {/* Password Field with Eye Icon */}
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Your Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-emerald-600 hover:underline underline-offset-4"
                                >
                                    Forgot password?
                                </Link>
                            </div>

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
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 mt-2">
                            <Button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10"
                            >
                                Sign In
                            </Button>
                            <Button variant="outline" type="button" className="w-full h-10 border-slate-200">
                                Continue with Google
                            </Button>
                        </div>

                        <p className="text-center text-sm text-slate-500 mt-2">
                            New here?{" "}
                            <Link href="/register" className="font-semibold text-emerald-600 hover:underline underline-offset-4">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}