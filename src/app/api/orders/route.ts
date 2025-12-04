import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generatePaymentCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tableNumber, items, paymentMethod } = body

    let totalAmount = 0
    const orderItems = []

    // Calculate total and prepare order items
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({
        where: { id: item.menuItemId },
      })

      if (!menuItem) {
        return NextResponse.json(
          { error: `Menu item ${item.menuItemId} not found` },
          { status: 404 }
        )
      }

      // Use the price sent from frontend (includes size adjustment)
      // If no price is provided, fall back to menu item base price
      const itemPrice = item.price || menuItem.price
      const itemTotal = itemPrice * item.quantity
      let addOnsTotal = 0

      const addOns = []
      for (const addOn of item.addOns) {
        addOnsTotal += addOn.price * addOn.quantity
        addOns.push({
          addOnId: addOn.id,
          quantity: addOn.quantity,
        })
      }

      totalAmount += itemTotal + addOnsTotal
      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        size: item.size,
        sugarLevel: item.sugarLevel,
        itemTotal: itemTotal + addOnsTotal,
        addOns,
      })
    }

    // Create order
    const paymentCode = paymentMethod === 'CASH' ? generatePaymentCode() : null

    const order = await prisma.order.create({
      data: {
        tableNumber,
        totalAmount,
        paymentMethod,
        paymentCode,
        orderItems: {
          create: orderItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            size: item.size,
            sugarLevel: item.sugarLevel || 100,
            itemTotal: item.itemTotal,
            addOns: {
              create: item.addOns,
            },
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            addOns: true,
            menuItem: true,
          },
        },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Set cache headers for performance
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    }

    // Fetch only active orders (not completed or cancelled) for faster loading
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY'],
        },
      },
      include: {
        orderItems: {
          include: {
            addOns: {
              select: {
                id: true,
                quantity: true,
                addOn: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            menuItem: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 active orders for faster performance
    })

    return NextResponse.json(orders, { headers })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
