import { NextRequest, NextResponse } from 'next/server'
// @ts-ignore
import QRCode from 'qrcode'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const tableNumber = request.nextUrl.searchParams.get('table')
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (!tableNumber) {
      return NextResponse.json(
        { error: 'Table number is required' },
        { status: 400 }
      )
    }

    // Validate table number
    const tableNum = parseInt(tableNumber)
    if (isNaN(tableNum) || tableNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid table number' },
        { status: 400 }
      )
    }

    // Generate QR code data URL with coffee-themed colors
    const qrData = `${appUrl}?table=${tableNum}`
    
    // Generate QR code with coffee brown on white background
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      width: 500,
      color: {
        dark: '#8B4513', // Coffee brown
        light: '#FFFFFF', // White background
      },
    })

    // Return QR code with metadata
    return NextResponse.json(
      {
        qrCode: qrCodeDataUrl,
        tableNumber: tableNum,
        url: qrData,
        title: 'FILTRA CAFÉ',
        subtitle: `Sit & Scan - Table ${tableNum}`,
        success: true,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate QR code',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
