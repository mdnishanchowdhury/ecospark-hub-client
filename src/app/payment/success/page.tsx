"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function SuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ideaId = searchParams.get("ideaId");

    useEffect(() => {
        if (ideaId) {
            toast.success("Payment Verified Successfully!", {
                description: "Your idea is now unlocked. Enjoy!",
                duration: 5000,
            });

            const timeout = setTimeout(() => {
                router.push(`/ideas/${ideaId}`);
                router.refresh();
            }, 3500);

            return () => clearTimeout(timeout);
        } else {
            router.push("/ideas");
        }
    }, [ideaId, router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-md border-none shadow-2xl bg-card">
                    <CardContent className="pt-12 pb-12 text-center space-y-6">
                        <div className="relative flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="rounded-full bg-green-100 p-4"
                            >
                                <CheckCircle2 className="h-16 w-16 text-green-600" />
                            </motion.div>
                            <PartyPopper className="absolute -top-2 -right-2 h-8 w-8 text-amber-500 animate-bounce" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-extrabold text-foreground">Success!</h1>
                            <p className="text-muted-foreground font-medium px-4">
                                We've received your payment. Your project details are now being prepared for you.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 text-primary font-semibold text-sm bg-primary/10 px-4 py-2 rounded-full">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Redirecting to your idea...</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default SuccessPage;