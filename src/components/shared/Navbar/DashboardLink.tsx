"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { Button } from "../../ui/button";
import { getCookie } from "@/services/auth/tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/types/auth.type";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

const DashboardLink = () => {
  const [dashboardHref, setDashboardHref] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
    
    const fetchRoleAndRoute = async () => {
      const accessToken = await getCookie("accessToken");
      
      if (accessToken) {
        try {
          const decoded = jwt.decode(accessToken) as JwtPayload;
          const userRole = decoded?.role as UserRole;
          if (userRole) {
            setDashboardHref(getDefaultDashboardRoute(userRole));
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          setDashboardHref("/dashboard"); 
        }
      }
    };

    fetchRoleAndRoute();
  }, []);

  if (!mounted || !dashboardHref) return null;

  return (
    <Button asChild variant="ghost" size="sm" className="gap-2 w-full lg:w-auto justify-start">
      <Link href={dashboardHref}>
        <LayoutDashboard className="size-4" /> Dashboard
      </Link>
    </Button>
  );
};

export default DashboardLink;