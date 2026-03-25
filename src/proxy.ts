import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getNewTokenWithRefreshToken } from './services/auth.services';
import { isTokenExpiringSoon } from './lib/tokenUtils';
import { jwtUtils } from './lib/jwtUtils';
import { UserRole } from './types/auth.type';
import { getDefaultDashboardRoute, getRouteOwner } from './lib/authUtils';

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
    try {
        const refresh = await getNewTokenWithRefreshToken(refreshToken);
        return !!refresh;
    } catch (error) {
        console.error("Error refreshing token in middleware:", error);
        return false;
    }
}

export async function proxy(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;
        const accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;
        const isGenericDashboard = pathname === "/dashboard";
        const routerOwner = getRouteOwner(pathname);

        if (!accessToken) {
            if (routerOwner || isGenericDashboard) {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("redirect", pathname);
                return NextResponse.redirect(loginUrl);
            }
            return NextResponse.next();
        }

        if (accessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
            const refreshed = await refreshTokenMiddleware(refreshToken);
            if (refreshed) {
                const response = NextResponse.redirect(request.nextUrl);
                response.headers.set("x-token-refresh", "1");
                return response;
            }
        }

        const tokenData = jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!);
        const userRole = tokenData?.data?.role as UserRole;

        if (userRole) {
            const correctDashboard = getDefaultDashboardRoute(userRole);

            if (isGenericDashboard || (routerOwner && routerOwner !== userRole && routerOwner !== "COMMON")) {
                if (pathname !== correctDashboard) {
                    return NextResponse.redirect(new URL(correctDashboard, request.url));
                }
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware Error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'
    ]
}