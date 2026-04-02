"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PricingCard from "@/components/modules/Pricing/PricingCard";

const pricingPlans = [
    {
        name: "free innovation",
        price: "$0",
        description: "perfect for students and hobbyists starting their eco-journey.",
        features: ["access to public ideas", "community forum access", "up to 3 saved projects", "basic eco-tips"],
        buttonText: "get started",
        href: "/register",
        isPopular: false,
    },
    {
        name: "pro activist",
        price: "$19",
        description: "best for activists and creators who want to make a real impact.",
        features: [
            "everything in free",
            "unlimited saved projects",
            "priority project support",
            "early access to features",
            "ad-free experience",
        ],
        buttonText: "join pro spark",
        href: "/checkout?plan=pro",
        isPopular: true,
    },
    {
        name: "enterprise hub",
        price: "$49",
        description: "tailored for organizations driving large-scale sustainability.",
        features: [
            "everything in pro",
            "team collaboration tools",
            "custom analytics dashboard",
            "dedicated account manager",
            "api access for developers",
        ],
        buttonText: "contact sales",
        href: "/contact",
        isPopular: false,
    },
];

export default function PricingPage() {
    return (
        <div className="bg-[#fcfdfe] min-h-screen w-full py-20 px-6 relative flex flex-col items-center justify-center">

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/30 via-transparent to-transparent -z-10" />

            <div className="max-w-7xl w-full flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] uppercase tracking-widest"
                    >
                        pricing plans
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 lowercase tracking-tight">
                        choose your <span className="text-emerald-500">impact</span>
                    </h1>
                    <p className="text-slate-400 font-medium max-w-lg lowercase text-center">
                        simple, transparent pricing to help you fuel eco-friendly innovations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto justify-center items-stretch">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={plan.name} plan={plan} index={index} />
                    ))}
                </div>

                {/* Footer Support */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-400 lowercase">
                        questions? <Link href="/contact" className="text-emerald-600 font-bold hover:underline">chat with us ↗</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}