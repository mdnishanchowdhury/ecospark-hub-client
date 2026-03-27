import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getNewAccessToken } from './services/auth/auth.services';
import { UserRole } from './types/auth.type';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';

export async function proxy(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const url = request.nextUrl.clone();

    if (searchParams.has('tokenRefreshed')) {
        url.searchParams.delete('tokenRefreshed');
        return NextResponse.redirect(url);
    }

    let accessToken = request.cookies.get("accessToken")?.value || null;
    const refreshToken = request.cookies.get("refreshToken")?.value || null;

    if (!accessToken && refreshToken) {
        const refreshResult = await getNewAccessToken();

        if (refreshResult?.tokenRefreshed && refreshResult.success) {
            url.searchParams.set('tokenRefreshed', 'true');
            const response = NextResponse.redirect(url);

            if (refreshResult.accessToken) {
                response.cookies.set("accessToken", refreshResult.accessToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                });
            }
            return response;
        }
    }

    let userRole: UserRole | null = null;
    if (accessToken) {
        try {
            const verifiedToken = jwt.decode(accessToken) as JwtPayload;
            if (verifiedToken) {
                userRole = verifiedToken.role as UserRole;
            }
        } catch (error) {
            const loginUrl = new URL('/login', request.url);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            return response;
        }
    }

    const isAuth = isAuthRoute(pathname);
    if (accessToken && isAuth && userRole) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
    }

    const routerOwner = getRouteOwner(pathname);

    if (routerOwner === null || routerOwner === "COMMON") {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === "ADMIN" || routerOwner === "MEMBER") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'],
};