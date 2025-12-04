'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Download, Printer, Home } from 'lucide-react'
import Link from 'next/link'
import QRCodeWithLogo from '@/components/QRCodeWithLogo'

interface QRData {
  tableNumber: number
  qrCode: string
  qrData: string
}

export default function QRGeneratorPage() {
  const [qrCodes, setQrCodes] = useState<QRData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const downloadQRCode = (tableNumber: number, qrCode: string) => {
    const link = document.createElement('a')
    link.href = qrCode
    link.download = `table-${tableNumber}-qr.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrintAll = () => {
    window.print()
  }

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
      } catch (err) {
        console.error('Error generating QR codes:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate QR codes')
      } finally {
        setLoading(false)
      }
    }

    generateAllQRCodes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Generating QR codes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">Error</p>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/landing"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/landing"
            className="flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors"
          >
            <Home size={20} />
            <span className="font-semibold">Back</span>
          </Link>

          <h1 className="text-4xl font-bold text-amber-900">Table QR Codes</h1>

          <button
            onClick={handlePrintAll}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold print:hidden shadow-lg"
          >
            <Printer size={20} />
            Print All
          </button>
        </div>

        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Each table has a unique QR code. Customers can scan their table's QR code to auto-detect their table and start ordering. Print all QR codes or download individual ones.
        </p>
      </div>

      {/* QR Codes Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {qrCodes.map((item) => (
            <div
              key={item.tableNumber}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow print:break-inside-avoid print:shadow-none"
            >
              {/* Table Number Badge */}
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mb-4">
                <p className="text-3xl font-bold text-white">
                  {item.tableNumber}
                </p>
              </div>

              {/* QR Code with Logo */}
              <div className="bg-white border-4 border-amber-600 rounded-xl p-3 mb-4 print:border-2">
                <QRCodeWithLogo
                  qrImageUrl={item.qrCode}
                  logoUrl="/logo.jpg"
                  alt={`Table ${item.tableNumber} QR Code`}
                  width={160}
                  height={160}
                  logoSize={0.25}
                />
              </div>

              {/* Table Label */}
              <p className="font-bold text-gray-800 mb-2">Table {item.tableNumber}</p>
              <p className="text-xs text-gray-500 mb-4 break-all font-mono">
                {item.qrData}
              </p>

              {/* Download Button */}
              <button
                onClick={() => downloadQRCode(item.tableNumber, item.qrCode)}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold print:hidden w-full justify-center"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-gray-200 text-center print:mt-8 print:pt-4">
        <p className="text-gray-600">
          Total Tables: <strong>{qrCodes.length}</strong>
        </p>
        <p className="text-gray-400 text-sm mt-2">
          © 2024 Filtra Café - QR Code Management
        </p>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .print\:hidden {
            display: none !important;
          }
          .print\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .print\:shadow-none {
            box-shadow: none;
          }
          .print\:border-2 {
            border-width: 2px;
          }
          .print\:w-36 {
            width: 9rem;
          }
          .print\:h-36 {
            height: 9rem;
          }
          .print\:mt-8 {
            margin-top: 2rem;
          }
          .print\:pt-4 {
            padding-top: 1rem;
          }
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  )
}
