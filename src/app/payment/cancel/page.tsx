"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function CancelPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-md border-none shadow-2xl bg-card">
                    <CardContent className="pt-12 pb-12 text-center space-y-6">
                        <div className="flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="rounded-full bg-red-100 p-4"
                            >
                                <XCircle className="h-16 w-16 text-red-600" />
                            </motion.div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                                Payment Cancelled
                            </h1>
                            <p className="text-muted-foreground font-medium px-6 leading-relaxed">
                                It seems the transaction wasn't completed. Don't worry, no charges were made to your account.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 pt-4 px-6">
                            <Button
                                onClick={() => router.back()}
                                className="w-full gap-2 rounded-xl h-12 font-bold transition-all hover:scale-[1.02]"
                            >
                                <RefreshCcw className="h-4 w-4" /> Try Again
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => router.push("/ideas")}
                                className="w-full gap-2 rounded-xl h-12 border-muted-foreground/20 hover:bg-muted"
                            >
                                <ArrowLeft className="h-4 w-4" /> Browse Other Ideas
                            </Button>
                        </div>

                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest pt-4">
                            EcoSpark-Hub Secure Payment
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default CancelPage;