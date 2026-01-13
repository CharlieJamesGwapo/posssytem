import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Get all tables
    const tables = await prisma.table.findMany({
      orderBy: { tableNumber: 'asc' },
    })

    // Get all active orders (not completed or cancelled)
    const activeOrders = await prisma.order.findMany({
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY'],
        },
      },
      select: {
        tableNumber: true,
      },
    })

    // Create a set of table numbers with active orders
    const occupiedTableNumbers = new Set(activeOrders.map(o => o.tableNumber))

    // Update table statuses based on active orders
    const tablesWithStatus = tables.map(table => ({
      ...table,
      status: occupiedTableNumbers.has(table.tableNumber) ? 'OCCUPIED' : 'AVAILABLE',
      isAvailable: !occupiedTableNumbers.has(table.tableNumber),
    }))

    return NextResponse.json(tablesWithStatus)
  } catch (error) {
    console.error('Error fetching tables:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tables' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, tableNumber } = await request.json()

    if (action === 'mark-occupied') {
      // Check if table exists first
      const existingTable = await prisma.table.findUnique({
        where: { tableNumber },
      })

      if (!existingTable) {
        return NextResponse.json(
          { error: `Table ${tableNumber} not found`, success: false },
          { status: 404 }
        )
      }

      // Check if already occupied
      if (existingTable.status === 'OCCUPIED') {
        return NextResponse.json({
          success: false,
          message: `Table ${tableNumber} is already occupied`,
          alreadyOccupied: true,
          table: existingTable,
        })
      }

      // Mark table as occupied
      const table = await prisma.table.update({
        where: { tableNumber },
        data: { status: 'OCCUPIED' },
      })

      // Send notification to staff
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        await fetch(`${baseUrl}/api/table-notifications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create-notification',
            tableNumber,
            status: 'OCCUPIED',
            message: `🪑 Table ${tableNumber} is now occupied - Customer is ordering`,
          }),
        })
      } catch (notifError) {
        console.error('Error sending notification:', notifError)
        // Don't fail the request if notification fails
      }

      return NextResponse.json({ success: true, message: `Table ${tableNumber} marked as occupied`, table })
    }

    if (action === 'mark-available') {
      // Check if table exists first
      const existingTable = await prisma.table.findUnique({
        where: { tableNumber },
      })

      if (!existingTable) {
        return NextResponse.json(
          { error: `Table ${tableNumber} not found`, success: false },
          { status: 404 }
        )
      }

      // Check if already available
      if (existingTable.status === 'AVAILABLE') {
        return NextResponse.json({
          success: false,
          message: `Table ${tableNumber} is already available`,
          alreadyAvailable: true,
          table: existingTable,
        })
      }

      // Mark table as available
      const table = await prisma.table.update({
        where: { tableNumber },
        data: { status: 'AVAILABLE' },
      })

      // Send notification to staff
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        await fetch(`${baseUrl}/api/table-notifications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'create-notification',
            tableNumber,
            status: 'AVAILABLE',
            message: `✅ Table ${tableNumber} is now available`,
          }),
        })
      } catch (notifError) {
        console.error('Error sending notification:', notifError)
        // Don't fail the request if notification fails
      }

      return NextResponse.json({ success: true, message: `Table ${tableNumber} marked as available`, table })
    }

    if (action === 'check-status') {
      // Check if table is available
      const table = await prisma.table.findUnique({
        where: { tableNumber },
      })

      if (!table) {
        return NextResponse.json(
          { error: 'Table not found' },
          { status: 404 }
        )
      }

      const isAvailable = table.status === 'AVAILABLE'
      return NextResponse.json({
        tableNumber,
        status: table.status,
        isAvailable,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error managing table:', error)
    return NextResponse.json(
      { error: 'Failed to manage table' },
      { status: 500 }
    )
  }
}
