"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Zap, Users, BadgeDollarSign, Layers,
  ArrowUpRight, Globe, BarChart3, Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, CartesianGrid
} from "recharts";
import { getDashboardMetaData } from "@/services/meta/meta.services";

interface AdminDashboardProps {
  initialData: any;
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString().toLowerCase());

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString().toLowerCase());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data: response } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getDashboardMetaData,
    initialData: initialData,
  });

  const statsData = response?.data;

  const stats = [
    { title: "total sparks", value: statsData?.totalIdeas || 0, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "innovators", value: statsData?.totalUsers || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "revenue", value: `$${statsData?.totalRevenue || 0}`, icon: BadgeDollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "sectors", value: statsData?.totalCategories || 0, icon: Layers, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen w-full text-slate-900 font-sans">
      <div className="space-y-8">

        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              system live
            </div>
            <h1 className="text-5xl font-black tracking-tighter lowercase text-slate-900">
              intelligence <span className="text-slate-300">hub</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <Clock size={14} className="text-emerald-500" />
            last updated: {currentTime || "syncing..."}
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

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Growth Chart */}
          <Card className="lg:col-span-2 border-none shadow-sm bg-white rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <h3 className="text-xl font-bold lowercase tracking-tight flex items-center gap-2 text-slate-900">
                  <BarChart3 size={20} className="text-emerald-500" /> performance trajectory
                </h3>
                <p className="text-slate-400 text-xs lowercase">monthly spark submission analytics.</p>
              </div>
              <div className="flex gap-2">
                {['7d', '30d', '90d'].map((t) => (
                  <button key={t} className="px-4 py-1.5 rounded-full border border-slate-100 text-[10px] font-bold text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100 transition-all uppercase">{t}</button>
                ))}
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData?.barChartData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                    tickFormatter={(str) => {
                      try {
                        return new Date(str).toLocaleDateString('en-US', { month: 'short' });
                      } catch (e) {
                        return str;
                      }
                    }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }}
                    itemStyle={{ color: '#0f172a', fontWeight: 800, fontSize: '14px' }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={32}>
                    {statsData?.barChartData?.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === statsData.barChartData.length - 1 ? '#10b981' : '#e2e8f0'}
                        className="transition-all duration-500 hover:fill-emerald-400"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Side Info Panel */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-white to-emerald-50/30 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6">
                  <Globe size={24} />
                </div>
                <h3 className="text-3xl font-black leading-none tracking-tighter lowercase text-slate-900">global <br /> footprint</h3>
                <p className="text-slate-500 text-sm lowercase leading-relaxed">your ecosystem is expanding across <span className="text-emerald-600 font-bold">{statsData?.totalCategories || 0}</span> sustainable sectors.</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">distribution</p>
                {statsData?.ideaStatusDistribution?.map((item: any) => (
                  <div key={item.status} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-50 shadow-sm transition-transform hover:scale-[1.02]">
                    <span className="text-xs font-bold text-slate-500 lowercase">{item.status}</span>
                    <span className="text-sm font-black text-emerald-600">{item._count.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Background Aesthetic Blur */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-200/20 blur-[80px] rounded-full pointer-events-none" />
          </Card>

        </div>
      </div>
    </div>
  );
}