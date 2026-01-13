import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        addOns: true,
      },
      orderBy: {
        category: 'asc',
      },
    })

    // Transform the data to match the expected format
    const formattedItems = menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      ingredients: item.ingredients,
      allergens: item.allergens,
      sizes: item.sizes,
      addOns: item.addOns.map((ao) => ({
        id: ao.id,
        name: ao.name,
        price: ao.price,
      })),
    }))

    return NextResponse.json(formattedItems)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    )
  }
}
