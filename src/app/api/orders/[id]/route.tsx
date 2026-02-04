import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderItems: {
          include: {
            addOns: {
              include: {
                addOn: true,
              },
            },
            menuItem: true,
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

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, paymentStatus } = body

    // Get the current order to check if it's being completed
    const currentOrder = await prisma.order.findUnique({
      where: { id: params.id },
      select: { tableNumber: true, status: true, paymentStatus: true }
    })

    if (!currentOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
      },
      include: {
        orderItems: {
          include: {
            addOns: {
              include: {
                addOn: true,
              },
            },
            menuItem: true,
          },
        },
      },
    })

    // If order is completed (status is COMPLETED and payment is PAID), clear the table
    if (status === 'COMPLETED' && paymentStatus === 'PAID') {
      try {
        await prisma.table.update({
          where: { tableNumber: currentOrder.tableNumber },
          data: { status: 'AVAILABLE' }
        })
      } catch (error) {
        console.error('Error clearing table:', error)
        // Don't fail the order update if table clearing fails
      }
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
