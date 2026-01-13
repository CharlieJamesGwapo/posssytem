import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const QRCode = require('qrcode')
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const tables = await (prisma as any).table.findMany({
      orderBy: { tableNumber: 'asc' },
    })

    return NextResponse.json(tables)
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
    const { tableNumber } = await request.json()

    if (!tableNumber || tableNumber < 1) {
      return NextResponse.json(
        { error: 'Invalid table number' },
        { status: 400 }
      )
    }

    // Check if table already exists
    const existingTable = await (prisma as any).table.findUnique({
      where: { tableNumber },
    })

    if (existingTable) {
      return NextResponse.json(
        { error: 'Table already exists' },
        { status: 400 }
      )
    }

    // Generate QR code
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const qrData = `${baseUrl}/?table=${tableNumber}`

    const qrCodeImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })

    // Create table in database
    const table = await (prisma as any).table.create({
      data: {
        tableNumber,
        qrCode: qrCodeImage,
        qrCodeData: qrData,
        status: 'AVAILABLE',
      },
    })

    return NextResponse.json(table, { status: 201 })
  } catch (error) {
    console.error('Error creating table:', error)
    return NextResponse.json(
      { error: 'Failed to create table' },
      { status: 500 }
    )
  }
}
