import { NextRequest, NextResponse } from 'next/server'

// In-memory store for notifications (in production, use a database or WebSocket)
const notifications: Array<{
  id: string
  tableNumber: number
  status: 'OCCUPIED' | 'AVAILABLE'
  timestamp: Date
  message: string
}> = []

export async function GET(request: NextRequest) {
  try {
    // Get all recent notifications (last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recentNotifications = notifications.filter(
      (n) => n.timestamp > fiveMinutesAgo
    )

    return NextResponse.json({
      success: true,
      notifications: recentNotifications,
      count: recentNotifications.length,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, tableNumber, status, message } = await request.json()

    if (action === 'create-notification') {
      const notification = {
        id: `notif-${Date.now()}`,
        tableNumber,
        status,
        timestamp: new Date(),
        message: message || `Table ${tableNumber} is now ${status.toLowerCase()}`,
      }

      notifications.push(notification)

      // Keep only last 100 notifications
      if (notifications.length > 100) {
        notifications.shift()
      }

      return NextResponse.json({
        success: true,
        notification,
      })
    }

    if (action === 'clear-old') {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      const initialLength = notifications.length
      notifications.splice(
        0,
        notifications.findIndex((n) => n.timestamp > fiveMinutesAgo)
      )

      return NextResponse.json({
        success: true,
        cleared: initialLength - notifications.length,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error managing notifications:', error)
    return NextResponse.json(
      { error: 'Failed to manage notifications' },
      { status: 500 }
    )
  }
}
