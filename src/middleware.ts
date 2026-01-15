import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Temporarily disable all middleware to fix redirect loop
  return NextResponse.next()
}

export const config = {
  matcher: ['/staff/:path*', '/staff-login'],
}
