import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Check how many tables exist
    const existingTables = await prisma.table.count()

    if (existingTables >= 10) {
      return NextResponse.json({
        success: true,
        message: 'Tables already initialized',
        tablesCount: existingTables,
      })
    }

    // Create missing tables
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const createdTables = []

    for (let i = 1; i <= 10; i++) {
      // Check if table already exists
      const existingTable = await prisma.table.findUnique({
        where: { tableNumber: i },
      })

      if (!existingTable) {
        const qrData = `${baseUrl}/?table=${i}`
        
        const table = await prisma.table.create({
          data: {
            tableNumber: i,
            qrCode: qrData,
            qrCodeData: qrData,
            status: 'AVAILABLE',
          },
        })
        
        createdTables.push(table)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Initialized ${createdTables.length} tables`,
      tablesCreated: createdTables.length,
      totalTables: await prisma.table.count(),
    })
  } catch (error) {
    console.error('Error initializing tables:', error)
    return NextResponse.json(
      { error: 'Failed to initialize tables', success: false },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { tableNumber: 'asc' },
    })

    return NextResponse.json({
      success: true,
      tablesCount: tables.length,
      tables,
    })
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tables', success: false },
      { status: 500 }
    )
  }
}
