import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Test basic database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Test if we can count menu items
    const menuCount = await prisma.menuItem.count()
    
    // Test if we can get actual menu items
    const firstItem = await prisma.menuItem.findFirst()
    
    return NextResponse.json({
      success: true,
      databaseConnection: 'OK',
      menuItemCount: menuCount,
      firstMenuItem: firstItem ? {
        id: firstItem.id,
        name: firstItem.name,
        category: firstItem.category,
        price: firstItem.price
      } : null,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseConnection: 'FAILED',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
