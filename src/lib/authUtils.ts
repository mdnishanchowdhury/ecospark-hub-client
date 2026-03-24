import { UserRole } from "@/types/auth.type";

export const authRoutes = ["/login", "/register", "/forget-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export type RouteConfig = {
    exact: string[],
    pattern: RegExp[]
}

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: []
}

export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin\/dashboard/],
    exact: [
        "/admin/dashboard/manage-ideas",
        "/admin/dashboard/manage-users"
    ]
}

export const memberProtectedRoutes: RouteConfig = {
    pattern: [/^\/member\/dashboard/],
    exact: [
        "/member/dashboard/my-purchases",
        "/member/dashboard/payment/success"
    ]
}

export const isRouteMatch = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatch(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    if (isRouteMatch(pathname, memberProtectedRoutes)) {
        return "MEMBER";
    }

    if (isRouteMatch(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    return null;
}

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "MEMBER") {
        return "/member/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}