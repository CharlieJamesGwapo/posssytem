import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect staff routes (except login)
  if (pathname.startsWith('/staff') && pathname !== '/staff-login') {
    // Check for staff token in cookies
    const token = request.cookies.get('staffToken')?.value

    // If no token, redirect to staff login
    if (!token) {
      return NextResponse.redirect(new URL('/staff-login', request.url))
    }
  }

  // Redirect /staff-login to /staff if already authenticated
  if (pathname === '/staff-login') {
    const token = request.cookies.get('staffToken')?.value
    if (token) {
      return NextResponse.redirect(new URL('/staff', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/staff/:path*', '/staff-login'],
}
