import { UserRole } from "@/types/auth.type";
import { getDefaultDashboardRoute } from "./authUtils";
import { NavSection } from "@/types/dashboard.types";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defualtDashboard = getDefaultDashboardRoute(role)
    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defualtDashboard,
                    icon: "LayoutDashboard"
                },
                {
                    title: "my-profile",
                    href: `/my-profile`,
                    icon: "User"
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "change-password",
                    icon: "Settings"
                }
            ]
        }
    ]
}

export const memberNavItems: NavSection[] = [
    {
        title: "Member Management",
        items: [
            {
                title: "Add Idea",
                href: `/member/dashboard/add-idea`,
                icon: "Plus"
            },
            {
                title: "My Ideas",
                href: `/member/dashboard/my-ideas`,
                icon: "List"
            }
        ]
    }
]

export const adminNavItems: NavSection[] = [
    {
        title: "Admin Management",
        items: [
            {
                title: "Pending Ideas",
                href: `/admin/dashboard/pending-ideas`,
                icon: "Clock"
            },
            {
                title: "Add Category",
                href: `/admin/dashboard/add-category`,
                icon: "Plus"
            },
            {
                title: "All Categories",
                href: `/admin/dashboard/all-categories`,
                icon: "List"
            }
        ]
    }
]


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems]

        case "MEMBER":
            return [...commonNavItems, ...memberNavItems]
    }
}