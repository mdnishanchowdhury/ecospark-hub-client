"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Zap, CheckCircle2, ShoppingBag, MessageSquare,
  ArrowUpRight, Clock, Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMemberMetaData } from "@/services/meta/meta.services";

interface MemberDashboardProps {
  initialData?: any;
}

export default function MemberDashboard({ initialData }: MemberDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString().toLowerCase());

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString().toLowerCase());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data: response } = useQuery({
    queryKey: ["member-metrics"],
    queryFn: getMemberMetaData,
    initialData: initialData,
  });

  const statsData = response?.data;

  const stats = [
    {
      title: "my total sparks",
      value: statsData?.myTotalIdeas || 0,
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "approved sparks",
      value: statsData?.approvedIdeas || 0,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "purchased",
      value: statsData?.purchasedIdeasCount || 0,
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "total comments",
      value: statsData?.myIdeasCommentsCount || 0,
      icon: MessageSquare,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
  ];

  return (
    <div className="min-h-screen w-full text-slate-900 font-sans ">
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              member active
            </div>
            <h1 className="text-5xl font-black tracking-tighter lowercase text-slate-900">
              my <span className="text-slate-300">dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-slate-400 text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              <Clock size={14} className="text-emerald-500" />
              {mounted ? currentTime : "syncing..."}
            </div>
          </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] hover:shadow-md transition-all duration-300 group overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="p-2 bg-slate-50 rounded-full text-slate-300 group-hover:text-emerald-500 transition-colors">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <div className="mt-8 space-y-1">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{stat.title}</p>
                    <h3 className="text-4xl font-black tracking-tighter text-slate-900">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm bg-white rounded-[3rem] p-10">
            <h3 className="text-xl font-bold lowercase tracking-tight text-slate-900 mb-4">
              spark overview
            </h3>
            <div className="space-y-4">
              <p className="text-slate-500 text-sm lowercase leading-relaxed">
                you have submitted a total of <span className="text-emerald-600 font-bold">{statsData?.myTotalIdeas || 0}</span> ideas.
                out of which <span className="text-emerald-600 font-bold">{statsData?.approvedIdeas || 0}</span> have been successfully approved by our team.
              </p>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${((statsData?.approvedIdeas || 0) / (statsData?.myTotalIdeas || 1)) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">approval rate: {Math.round(((statsData?.approvedIdeas || 0) / (statsData?.myTotalIdeas || 1)) * 100)}%</p>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-slate-900 text-white rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black lowercase tracking-tighter mb-2">engagement score</h3>
              <p className="text-slate-400 text-sm lowercase mb-6">interactions on your shared sparks</p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-emerald-400 text-3xl font-black">{statsData?.myIdeasCommentsCount || 0}</p>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">comments</p>
                </div>
                <div className="h-10 w-[1px] bg-slate-800" />
                <div>
                  <p className="text-blue-400 text-3xl font-black">{statsData?.purchasedIdeasCount || 0}</p>
                  <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">purchases</p>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[50px] rounded-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}