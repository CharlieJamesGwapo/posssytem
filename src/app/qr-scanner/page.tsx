'use client'

import { useEffect, useState } from 'react'
import { Home, QrCode, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import QRCodeWithLogo from '@/components/QRCodeWithLogo'

interface QRData {
  tableNumber: number
  qrCode: string
  qrData: string
}

interface TableStatus {
  tableNumber: number
  status: 'AVAILABLE' | 'OCCUPIED'
  isAvailable: boolean
}

export default function QRScannerPage() {
  const [qrCodes, setQrCodes] = useState<QRData[]>([])
  const [tableStatuses, setTableStatuses] = useState<Map<number, TableStatus>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generateAllQRCodes = async () => {
      try {
        setLoading(true)
        const codes: QRData[] = []

        // Generate QR codes for tables 1-10
        for (let i = 1; i <= 10; i++) {
          const response = await fetch(`/api/generate-qr?table=${i}`)
          if (!response.ok) {
            throw new Error(`Failed to generate QR code for table ${i}`)
          }
          const data = await response.json()
          codes.push(data)
        }

        setQrCodes(codes)
        setError(null)
        
        // Fetch initial table statuses
        await fetchTableStatuses(codes.map(c => c.tableNumber))
      } catch (err) {
        console.error('Error generating QR codes:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate QR codes')
      } finally {
        setLoading(false)
      }
    }

    generateAllQRCodes()
  }, [])

  const fetchTableStatuses = async (tableNumbers: number[]) => {
    try {
      const statuses = new Map<number, TableStatus>()
      
      for (const tableNumber of tableNumbers) {
        const response = await fetch('/api/table-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'check-status',
            tableNumber,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          statuses.set(tableNumber, data)
        }
      }
      
      setTableStatuses(statuses)
    } catch (err) {
      console.error('Error fetching table statuses:', err)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-white font-semibold">Generating QR codes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 p-4 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">Error</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-3 sm:p-4 md:p-6">
      {/* Professional Header */}
      <div className="mb-8 sm:mb-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-3 sm:px-4 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold text-sm shadow-md"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Back Home</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-3 flex-1 justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative bg-white rounded-full p-1 shadow-lg">
              <Image
                src="/logo.jpg"
                alt="Flitra Café Logo"
                width={48}
                height={48}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Flitra Café
              </h1>
              <p className="text-xs sm:text-sm text-gray-300">Scan Your Table</p>
            </div>
          </div>

          <div className="w-20 sm:w-24"></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-600 p-3 rounded-full">
              <QrCode size={32} className="text-white" />
            </div>
          </div>
          <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Scan Your Table QR Code
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Use your phone camera to scan the QR code at your table to start ordering
          </p>
        </div>
      </div>

      {/* QR Codes Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {qrCodes.map((item) => {
            const status = tableStatuses.get(item.tableNumber)
            const isOccupied = status && !status.isAvailable
            
            return (
              <div
                key={item.tableNumber}
                className={`relative rounded-2xl transition-all duration-300 pointer-events-none ${
                  isOccupied ? 'opacity-60' : ''
                }`}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 rounded-2xl shadow-lg transition-shadow ${
                  isOccupied
                    ? 'bg-red-50 border-2 border-red-300'
                    : 'bg-white border-2 border-gray-300'
                }`}></div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col items-center text-center">
                  {/* Table Number Badge */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg font-bold text-white text-2xl ${
                    isOccupied
                      ? 'bg-red-600'
                      : 'bg-orange-600'
                  }`}>
                    {item.tableNumber}
                  </div>

                  {/* QR Code with Logo */}
                  <div className={`bg-white rounded-xl p-2 mb-3 border-2 ${
                    isOccupied ? 'border-red-400' : 'border-gray-400'
                  }`}>
                    <div className={`${isOccupied ? 'opacity-50' : ''}`}>
                      <QRCodeWithLogo
                        qrImageUrl={item.qrCode}
                        logoUrl="/logo.jpg"
                        alt={`Table ${item.tableNumber} QR Code`}
                        width={128}
                        height={128}
                        logoSize={0.25}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <p className={`font-bold text-sm mb-1 ${isOccupied ? 'text-red-700' : 'text-gray-900'}`}>
                    Table {item.tableNumber}
                  </p>
                  
                  {/* Status */}
                  {isOccupied && (
                    <div className="flex items-center gap-1 text-xs text-red-600 font-semibold">
                      <AlertCircle size={14} />
                      <span>Occupied</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Total Tables: <strong className="text-orange-400">{qrCodes.length}</strong>
          </p>
          <p className="text-xs text-gray-500">
            © 2024 Flitra Café - Smart Table Ordering System
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Scan the QR code at your table to begin ordering
          </p>
        </div>
      </div>
    </div>
  )
}
