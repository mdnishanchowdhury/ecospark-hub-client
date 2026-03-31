"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lightbulb, ShoppingBag, MessageSquare, Download, Calendar } from "lucide-react";
import Link from "next/link";

export default function ProfileView({ userData }: { userData: any }) {
    return (
        <div className="space-y-10">
            {/* User Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                <div className="h-32 w-32 rounded-full bg-emerald-50 border-4 border-white shadow-inner flex items-center justify-center text-[#009663] text-4xl font-black">
                    {userData.image ? (
                        <img src={userData.image} alt={userData.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        userData.name?.charAt(0).toUpperCase()
                    )}
                </div>
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">{userData.name}</h1>
                    <p className="text-slate-500 font-medium text-lg">{userData.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                        <Badge className="bg-[#009663] hover:bg-[#007a50] px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                            {userData.role}
                        </Badge>
                        <Badge variant="outline" className="border-slate-200 text-slate-400 rounded-full">
                            Active Since {new Date(userData.createdAt).getFullYear()}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <StatCard title="My Ideas" count={userData.ideas?.length} icon={<Lightbulb />} color="text-amber-500" />
                <StatCard title="Purchased" count={userData.purchasedIdeas?.length} icon={<ShoppingBag />} color="text-blue-500" />
                <StatCard title="Votes" count={userData.votes?.length} icon={<User />} color="text-emerald-500" />
                <StatCard title="Comments" count={userData.comments?.length} icon={<MessageSquare />} color="text-slate-400" />
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="ideas" className="w-full">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-[24px] mb-8 inline-flex">
                    <TabsTrigger value="ideas" className="rounded-[18px] px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
                        Published Ideas
                    </TabsTrigger>
                    <TabsTrigger value="purchased" className="rounded-[18px] px-8 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
                        Purchase History
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="ideas" className="space-y-4">
                    {userData.ideas?.length > 0 ? (
                        userData.ideas.map((idea: any) => (
                            <Card key={idea.id} className="rounded-3xl border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-xl text-slate-800">{idea.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(idea.createdAt).toLocaleDateString()}</span>
                                            <Badge variant="secondary" className="bg-slate-100 text-[10px] uppercase">{idea.status}</Badge>
                                        </div>
                                    </div>
                                    <Link href={`/ideas/${idea.id}`} className="text-[#009663] font-bold text-sm bg-emerald-50 px-6 py-2 rounded-full hover:bg-emerald-100">
                                        View Details
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center py-10 text-slate-400">No ideas published yet.</p>
                    )}
                </TabsContent>

                <TabsContent value="purchased" className="space-y-4">
                    {userData.purchasedIdeas?.length > 0 ? (
                        userData.purchasedIdeas.map((purchase: any) => (
                            <div key={purchase.id} className="flex flex-col md:flex-row justify-between bg-white border border-slate-100 p-6 rounded-[28px] items-center gap-4">
                                <div className="flex gap-4 items-center">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800 text-lg">Transaction: {purchase.transactionId.split('-').pop()}</p>
                                        <p className="text-sm text-slate-500 font-medium">Amount Paid: <span className="text-slate-900 font-bold">${purchase.amount}</span></p>
                                    </div>
                                </div>
                                {purchase.invoiceUrl && (
                                    <a
                                        href={purchase.invoiceUrl}
                                        target="_blank"
                                        className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-[20px] text-sm font-bold hover:bg-slate-800 transition-colors w-full md:w-auto justify-center"
                                    >
                                        <Download size={16} /> Download Invoice
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-10 text-slate-400">You haven't purchased any ideas yet.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ title, count, icon, color }: any) {
    return (
        <Card className="rounded-[32px] border-slate-100 shadow-sm overflow-hidden bg-white group hover:border-emerald-200 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">{title}</CardTitle>
                <div className={`${color} group-hover:scale-110 transition-transform`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black text-slate-900">{count || 0}</div>
            </CardContent>
        </Card>
    );
}