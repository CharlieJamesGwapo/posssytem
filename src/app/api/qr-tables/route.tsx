import { NextRequest, NextResponse } from 'next/server'

const QRCode = require('qrcode')

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const tableNumber = request.nextUrl.searchParams.get('table')
    
    if (!tableNumber) {
      return NextResponse.json(
        { error: 'Table number is required' },
        { status: 400 }
      )
    }

    // Create QR code data that includes table number and redirects to menu
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const qrData = `${baseUrl}/?table=${tableNumber}`

    // Generate QR code with logo
    const qrCodeImage = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H', // High error correction for logo overlay
      type: 'image/png',
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })

    return NextResponse.json({
      tableNumber,
      qrCode: qrCodeImage,
      qrData: qrData,
      message: `QR Code for Table ${tableNumber}`,
    })
  } catch (error) {
    console.error('QR code generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
