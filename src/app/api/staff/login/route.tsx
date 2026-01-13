import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Fallback demo credentials
const DEMO_STAFF = {
  admin: { password: 'admin123', name: 'Admin User', role: 'admin' },
  barista: { password: 'barista123', name: 'Barista', role: 'barista' },
  manager: { password: 'manager123', name: 'Manager', role: 'manager' },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate inputs
    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check demo credentials first (for quick testing)
    const demoStaff = DEMO_STAFF[username as keyof typeof DEMO_STAFF]
    if (demoStaff && demoStaff.password === password) {
      const token = Buffer.from(`${username}:${Date.now()}:${Math.random()}`).toString('base64')
      return NextResponse.json(
        {
          token,
          id: username,
          name: demoStaff.name,
          username: username,
          role: demoStaff.role,
        },
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
    }

    // Try database authentication as fallback
    try {
      const staff = await prisma.staff.findUnique({
        where: { username },
      })

      // Verify password and staff is active
      if (!staff || staff.password !== password || !staff.isActive) {
        return NextResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 }
        )
      }

      // Generate token (fast base64 encoding)
      const token = Buffer.from(`${staff.id}:${Date.now()}:${Math.random()}`).toString('base64')

      // Return response with cache headers
      return NextResponse.json(
        {
          token,
          id: staff.id,
          name: staff.name,
          username: staff.username,
          role: staff.role,
        },
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
    } catch (dbError) {
      // Database error - return invalid credentials
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    )
  }
}
