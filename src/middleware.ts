import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Maintence mode flag. Switch this to false when you are ready to launch!
const IS_MAINTENANCE_MODE = true;

export async function middleware(request: NextRequest) {
    // If we're not in maintenance mode, or if we're running locally (development), allow traffic
    if (!IS_MAINTENANCE_MODE || process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    // Allow requests to API routes, Next.js assets, public files, or if it's already the maintenance route
    if (
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname === '/maintenance' ||
        request.nextUrl.pathname.includes('.') // Allow files like favicon.ico, images, etc.
    ) {
        return NextResponse.next();
    }

    // Redirect all other traffic to the maintenance page
    return NextResponse.redirect(new URL('/maintenance', request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
