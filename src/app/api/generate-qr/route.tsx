import { NextRequest, NextResponse } from 'next/server'
import qrcode from 'qrcode'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tableNumber = searchParams.get('table')

    if (!tableNumber) {
      return NextResponse.json(
        { error: 'Table number is required' },
        { status: 400 }
      )
    }

    const parsedTable = parseInt(tableNumber, 10)
    if (isNaN(parsedTable) || parsedTable < 1) {
      return NextResponse.json(
        { error: 'Invalid table number' },
        { status: 400 }
      )
    }

    // Generate QR code URL that includes table number
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const qrData = `${baseUrl}/?table=${parsedTable}`

    // Generate QR code as data URL
    const qrCode = await qrcode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 2,
      width: 400,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    return NextResponse.json({
      tableNumber: parsedTable,
      qrCode,
      qrData,
      success: true,
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
