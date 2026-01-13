import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Store for active WebSocket connections (in production, use Redis or similar)
const notificationSubscribers = new Map<string, Set<(data: any) => void>>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, tableNumber, status, type } = body

    // Validate input
    if (!orderId || !tableNumber || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, tableNumber, status' },
        { status: 400 }
      )
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            menuItem: true,
            addOns: {
              include: {
                addOn: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Prepare notification data
    const notificationData = {
      orderId,
      tableNumber,
      status,
      type: type || 'STATUS_UPDATE',
      timestamp: new Date().toISOString(),
      message: getNotificationMessage(status),
      items: order.orderItems.map(item => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        addOns: item.addOns.map(ao => `${ao.quantity}x ${ao.addOn.name}`),
      })),
    }

    // Broadcast to all subscribers
    const subscribers = notificationSubscribers.get(`table-${tableNumber}`)
    if (subscribers) {
      subscribers.forEach(callback => callback(notificationData))
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent',
      notification: notificationData,
    })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

function getNotificationMessage(status: string): string {
  const messages: Record<string, string> = {
    PENDING: 'Your order has been received! We\'re preparing it now.',
    CONFIRMED: 'Your order has been confirmed! We\'re starting to prepare it.',
    PREPARING: 'Your order is being prepared. Please wait a moment!',
    READY: 'Your order is ready! Please pick it up at the counter.',
    COMPLETED: 'Enjoy your drink! Thank you for your order.',
  }
  return messages[status] || 'Your order status has been updated.'
}

// Subscribe endpoint for SSE (Server-Sent Events)
export async function GET(request: NextRequest) {
  const tableNumber = request.nextUrl.searchParams.get('tableNumber')

  if (!tableNumber) {
    return NextResponse.json(
      { error: 'Missing tableNumber parameter' },
      { status: 400 }
    )
  }

  // Create a new response with SSE headers
  const stream = new ReadableStream({
    start(controller) {
      const key = `table-${tableNumber}`

      // Create a callback for this subscriber
      const callback = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      }

      // Add subscriber
      if (!notificationSubscribers.has(key)) {
        notificationSubscribers.set(key, new Set())
      }
      notificationSubscribers.get(key)!.add(callback)

      // Send initial connection message
      controller.enqueue(`data: ${JSON.stringify({ type: 'CONNECTED' })}\n\n`)

      // Handle client disconnect
      const cleanup = () => {
        const subscribers = notificationSubscribers.get(key)
        if (subscribers) {
          subscribers.delete(callback)
          if (subscribers.size === 0) {
            notificationSubscribers.delete(key)
          }
        }
      }

      // Cleanup on request abort
      request.signal.addEventListener('abort', cleanup)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
