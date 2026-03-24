import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getNewTokenWithRefreshToken } from './services/auth.services';
import { isTokenExpiringSoon } from './lib/tokenUtils';
import { jwtUtils } from './lib/jwtUtils';
import { UserRole } from './types/auth.type';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';

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

        const tokenData = accessToken
            ? jwtUtils.verifyToken(accessToken, (process.env.JWT_ACCESS_SECRET as string))
            : null;

        const decodedAccessToken = tokenData?.data;
        const isValidAccessToken = tokenData?.success;

        let userRole: UserRole | null = null;
        if (decodedAccessToken) {
            userRole = decodedAccessToken.role as UserRole;
        }

        const routerOwner = getRouteOwner(pathname);
        const isAuth = isAuthRoute(pathname);

        if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken as string))) {
            const requestHeaders = new Headers(request.headers);
            try {
                const refreshed = await refreshTokenMiddleware(refreshToken);
                if (refreshed) {
                    requestHeaders.set("x-token-refresh", "1");
                }
                return NextResponse.next({
                    request: { headers: requestHeaders },
                });
            } catch (error) {
                console.error("Token refresh failed:", error);
            }
        }

        if (isAuth && isValidAccessToken && userRole) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
        }

        if (routerOwner === null) {
            return NextResponse.next();
        }

        if (!accessToken) {
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (routerOwner === userRole || routerOwner === "COMMON") {
            return NextResponse.next();
        }

        const ecoSparkRoles = ["ADMIN", "MEMBER"];
        if (userRole && ecoSparkRoles.includes(routerOwner as string)) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
        }

        return NextResponse.next();

    } catch (error) {
        console.error("Error in EcoSpark Middleware:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'
    ]
}