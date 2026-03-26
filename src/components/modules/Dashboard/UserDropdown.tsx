"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/lib/logoutUser";
import { UserInfo } from "@/services/auth/getUserInfo";
import { Settings, User, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
    userInfo: UserInfo;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
    const handleLogout = async () => {
        await logoutUser();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50"
                >
                    <span className="text-sm font-bold text-emerald-700">
                        {userInfo.name.charAt(0).toUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-slate-100 rounded-xl">
                {/* User Header Section */}
                <DropdownMenuLabel className="font-normal px-2 py-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold text-slate-800 leading-none">{userInfo.name}</p>
                        <p className="text-xs text-slate-500 leading-tight">{userInfo.email}</p>
                        <div className="flex items-center gap-1.5 pt-1">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                {userInfo.role.replace("_", " ")}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="bg-slate-100" />
                
                {/* Menu Items */}
                <div className="py-1">
                    <DropdownMenuItem asChild>
                        <Link href={"/my-profile"} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <User className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">My Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild>
                        <Link href={"/change-password"} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <Settings className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">Account Settings</span>
                        </Link>
                    </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator className="bg-slate-100" />
                
                {/* Logout Action */}
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-rose-600 focus:text-rose-700 focus:bg-rose-50 transition-colors mt-1"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-bold">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;