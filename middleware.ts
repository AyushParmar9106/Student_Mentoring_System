import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/app/lib/auth'

// Define protected routes
const protectedRoutes = ['/students', '/staff', '/studentmentoring', '/studentmentor']
const publicRoutes = ['/Login', '/public']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
    const isPublicRoute = publicRoutes.includes(path)

    // Get session from cookie (Using req.cookies is safer in Middleware)
    const cookie = req.cookies.get('session')?.value
    const session = cookie ? await decrypt(cookie) : null

    // 1. Redirect to /Login if accessing protected route OR ROOT path without session
    if ((isProtectedRoute || path === '/') && !session) {
        return NextResponse.redirect(new URL('/Login', req.nextUrl))
    }

    // 2. Redirect to dashboard if accessing /Login while authenticated
    if (isPublicRoute && session?.user && !req.nextUrl.pathname.startsWith('/dashboard')) {
        const role = session.user.role;
        if (role === 'Student') {
            return NextResponse.redirect(new URL(`/students/${session.user.id}`, req.nextUrl))
        } else if (role === 'Staff' || role === 'Admin') {
            if (session.user.isAdmin) {
                return NextResponse.redirect(new URL('/', req.nextUrl)) // Admin Dashboard
            }
            return NextResponse.redirect(new URL(`/staff/${session.user.id}`, req.nextUrl))
        }
    }

    // 3. Role-Based Access Control (RBAC)
    if (session && isProtectedRoute) {
        const role = session.user.role;
        const userId = session.user.id; // Ensure UserID is available in session

        // Prevent Students from accessing Staff/Mentor routes
        if (role === 'Student') {
            // 1. Block Staff Routes
            if (path.startsWith('/staff') || path.startsWith('/studentmentor')) {
                return NextResponse.redirect(new URL(`/students/${userId}`, req.nextUrl))
            }

            // 2. Strict Student Profile Access
            // Allow /students/[userId] ONLY. Block /students (list), /students/add, /students/edit, /students/otherID
            if (path.startsWith('/students')) {
                const authorizedPath = `/students/${userId}`;
                if (path !== authorizedPath) {
                    return NextResponse.redirect(new URL(authorizedPath, req.nextUrl))
                }
            }

            // 3. Block Add/Edit in Mentoring
            if (path.startsWith('/studentmentoring/add') || path.startsWith('/studentmentoring/edit')) {
                return NextResponse.redirect(new URL(`/students/${userId}`, req.nextUrl))
            }
        }
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
