"use client";

import { logoutUser } from "@/lib/logoutUser";
import { LogOut } from "lucide-react";

const LogoutButton = () => {

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-md px-4 py-1 text-sm font-bold text-rose-600 transition-all duration-200 bg-emerald-50 hover:bg-rose-50 hover:text-rose-700 group border border-transparent hover:border-rose-100 shadow-sm hover:shadow-none"
    >
      <LogOut className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;