"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Leaf,
    PlusCircle,
    ArrowRight,
    Zap,
    Cloud,
    Cpu,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";

const HeroSection = () => {
    const [currentRole, setCurrentRole] = useState<string>("member");

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserInfo();
            if (user?.role) {
                setCurrentRole(user.role.toLowerCase());
            }
        };
        fetchUser();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <TooltipProvider>
            <section className="relative bg-white overflow-hidden py-16 lg:py-15 bg-grid-pattern min-h-[85vh] flex items-center">
                {/* Decorative Blurs */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Content */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8 text-center lg:text-left"
                        >
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Leaf size={14} /> World's #1 Green Idea Hub
                                    </span>
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
                            >
                                Ignite the Spark of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-900 to-emerald-600">Sustainability</span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
                            >
                                Join a global network of eco-innovators. Share your green concepts, collaborate on projects, and transform sustainable ideas into measurable world impact.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">

                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-2xl px-8 py-7 bg-emerald-700 hover:bg-emerald-800 shadow-xl shadow-emerald-100 text-md font-bold gap-2 group transition-all"
                                >
                                    <Link href={`/${currentRole}/dashboard/add-idea`}>
                                        <PlusCircle size={20} />
                                        Submit Your Idea
                                    </Link>
                                </Button>

                                <Link href="/">
                                    <Button variant="outline" size="lg" className="rounded-2xl px-8 py-7 border-slate-200 hover:border-emerald-200 text-md font-bold gap-2 group transition-all">
                                        Explore Innovations
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Trust Badges */}
                            <motion.div
                                variants={itemVariants}
                                className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-8 opacity-70"
                            >
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Powered By:</p>
                                <div className="flex gap-8 text-slate-400">
                                    <TechIcon icon={<Zap size={26} />} label="Clean Energy" />
                                    <TechIcon icon={<Cloud size={26} />} label="Cloud Infrastructure" />
                                    <TechIcon icon={<Cpu size={26} />} label="Innovation Engine" />
                                    <TechIcon icon={<Activity size={26} />} label="Real-time Metrics" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Visuals */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group">
                                <img
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
                                    alt="Eco Innovation"
                                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </TooltipProvider>
    );
};

const TechIcon = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <div className="hover:text-emerald-600 transition-colors cursor-help">
                {icon}
            </div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs font-bold border-none">
            <p>{label}</p>
        </TooltipContent>
    </Tooltip>
);

export default HeroSection;