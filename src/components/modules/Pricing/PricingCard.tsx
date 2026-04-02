"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface PricingCardProps {
    plan: {
        name: string;
        price: string;
        description: string;
        features: string[];
        buttonText: string;
        href: string;
        isPopular: boolean;
    };
    index: number;
}

export default function PricingCard({ plan, index }: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full flex"
        >
            <Card
                className={`w-full flex flex-col rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white/80 backdrop-blur-sm transition-all hover:shadow-md ${plan.isPopular ? "ring-2 ring-emerald-500/20 shadow-emerald-100/50" : "border border-slate-100"
                    }`}
            >
                {plan.isPopular && (
                    <div className="bg-emerald-500 py-2 text-center text-[10px] font-black text-white uppercase tracking-widest lowercase">
                        most popular
                    </div>
                )}

                <CardHeader className="pt-8 px-8">
                    <CardTitle className="text-xl font-black text-slate-800 lowercase tracking-tight">
                        {plan.name}
                    </CardTitle>
                    <CardDescription className="text-slate-400 lowercase text-xs leading-relaxed pt-1">
                        {plan.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow px-8 pt-4">
                    <div className="mb-6 flex items-baseline gap-1">
                        <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                        <span className="text-slate-400 font-bold text-xs lowercase">/month</span>
                    </div>

                    <ul className="space-y-3">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-xs text-slate-600 font-medium lowercase">
                                <Check className="size-3.5 text-emerald-500 mt-0.5" strokeWidth={3} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </CardContent>

                <CardFooter className="p-8 pt-4">
                    <Link href={plan.href} className="w-full">
                        <Button
                            variant={plan.isPopular ? "default" : "outline"}
                            className={`w-full h-12 rounded-xl font-bold lowercase transition-all ${plan.isPopular ? "bg-emerald-600 hover:bg-emerald-700 shadow-md" : "border-slate-200 text-slate-600"
                                }`}
                        >
                            {plan.buttonText}
                            <ArrowRight size={14} className="ml-2" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}