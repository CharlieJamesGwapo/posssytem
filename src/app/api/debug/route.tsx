import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      directDatabaseUrl: process.env.DIRECT_DATABASE_URL ? 'SET' : 'NOT_SET',
      nodeEnv: process.env.NODE_ENV,
      publicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
      publicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }

    return NextResponse.json({
      message: 'Debug info',
      environment: envVars,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
