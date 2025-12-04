'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Download, Printer, Home, AlertCircle } from 'lucide-react'
import { showErrorAlert } from '@/utils'

interface ReceiptData {
  orderId: string
  tableNumber: number
  paymentMethod: string
  total: number
  items: any[]
  timestamp: string
}

function ReceiptContent() {
  const searchParams = useSearchParams()
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    const tableNumber = searchParams.get('table')

    if (!orderId || !tableNumber) {
      setError('Missing order information')
      setLoading(false)
      return
    }

    const fetchReceipt = async () => {
      try {
        setError(null)
        // Fetch order details
        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const order = await response.json()

        setReceipt({
          orderId: order.id,
          tableNumber: parseInt(tableNumber as string),
          paymentMethod: order.paymentMethod || 'CASH',
          total: order.totalAmount,
          items: order.items || [],
          timestamp: new Date(order.createdAt).toLocaleString('en-PH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        })
      } catch (error) {
        console.error('Error fetching receipt:', error)
        setError('Failed to load receipt. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchReceipt()
  }, [searchParams])

  const handlePrint = () => {
    // Delay print to ensure content is rendered
    setTimeout(() => {
      window.print()
    }, 100)
  }

  const handleDownload = () => {
    if (!receipt) return

    // Create an HTML receipt for better formatting
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt - ${receipt.orderId.slice(0, 8).toUpperCase()}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      padding: 20px;
      line-height: 1.6;
    }
    .receipt-container {
      max-width: 400px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border: 2px solid #b45309;
      border-radius: 8px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #b45309;
      padding-bottom: 15px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: bold;
      color: #78350f;
      margin: 10px 0 5px;
    }
    .header p {
      color: #666;
      font-size: 12px;
    }
    .order-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 20px;
      text-align: center;
    }
    .info-item {
      text-align: center;
    }
    .info-label {
      color: #999;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 20px;
      font-weight: bold;
      color: #78350f;
      font-family: 'Courier New', monospace;
    }
    .datetime {
      text-align: center;
      color: #666;
      font-size: 12px;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #fcd34d;
    }
    .items {
      margin-bottom: 20px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
      font-size: 13px;
    }
    .item-name {
      flex: 1;
      color: #333;
      font-weight: 500;
    }
    .item-details {
      color: #999;
      font-size: 11px;
      margin-top: 3px;
    }
    .item-price {
      color: #b45309;
      font-weight: bold;
      text-align: right;
    }
    .divider {
      height: 2px;
      background: #fcd34d;
      margin: 15px 0;
      border-radius: 1px;
    }
    .total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-top: 15px;
    }
    .total-label {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    .total-amount {
      font-size: 24px;
      font-weight: bold;
      color: #b45309;
      font-family: 'Courier New', monospace;
    }
    .footer {
      text-align: center;
      padding-top: 15px;
      border-top: 2px solid #b45309;
      font-size: 12px;
      color: #666;
    }
    .footer p {
      margin-bottom: 5px;
    }
    .footer .copyright {
      color: #999;
      font-size: 10px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <h1>Filtra Café</h1>
      <p>Your Receipt</p>
    </div>
    
    <div class="order-info">
      <div class="info-item">
        <div class="info-label">Order Number</div>
        <div class="info-value">${receipt.orderId.slice(0, 8).toUpperCase()}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Table</div>
        <div class="info-value">#${receipt.tableNumber}</div>
      </div>
    </div>
    
    <div class="datetime">${receipt.timestamp}</div>
    
    <div class="divider"></div>
    
    <div class="items">
      ${receipt.items.length > 0 ? receipt.items.map((item: any) => `
        <div class="item">
          <div>
            <div class="item-name">${item.menuItem?.name || 'Unknown Item'}</div>
            <div class="item-details">
              ${item.quantity}x ${item.size}
              ${item.addOns && item.addOns.length > 0 ? `<br>+${item.addOns.map((a: any) => a.name).join(', ')}` : ''}
            </div>
          </div>
          <div class="item-price">₱${(item.price || 0).toFixed(2)}</div>
        </div>
      `).join('') : '<div style="text-align: center; color: #999;">No items</div>'}
    </div>
    
    <div class="divider"></div>
    
    <div class="total">
      <span class="total-label">TOTAL</span>
      <span class="total-amount">₱${receipt.total.toFixed(2)}</span>
    </div>
    
    <div class="footer">
      <p><strong>Thank you for your order!</strong></p>
      <p>Please proceed to payment counter</p>
      <p class="copyright">© 2024 Filtra Café</p>
    </div>
  </div>
</body>
</html>
    `.trim()

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `Receipt-${receipt.orderId.slice(0, 8).toUpperCase()}.html`)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Loading receipt...</p>
        </div>
      </div>
    )
  }

  if (error || !receipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle size={48} className="text-red-500" />
          </div>
          <p className="text-xl text-gray-800 mb-2 font-semibold">Unable to Load Receipt</p>
          <p className="text-gray-600 mb-6">{error || 'Receipt not found'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
          >
            <Home size={20} />
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-3 sm:p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center print:hidden w-full">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all transform hover:scale-105 font-semibold shadow-lg text-sm sm:text-base"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all transform hover:scale-105 font-semibold shadow-lg text-sm sm:text-base"
          >
            <Download size={18} />
            Download
          </button>
          <Link
            href={`/order-status?orderId=${receipt.orderId}&table=${receipt.tableNumber}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all transform hover:scale-105 font-semibold shadow-lg text-sm sm:text-base"
          >
            <Home size={18} />
            Track Order
          </Link>
        </div>

        {/* Receipt */}
        <div id="receipt-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden print:rounded-none print:shadow-none">
          {/* Header with Logo */}
          <div className="bg-white p-6 sm:p-8 text-center border-b-4 border-amber-600 print:border-b-2">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative mx-auto mb-2 logo-print">
              <Image
                src="/logo.jpg"
                alt="Filtra Café Logo"
                width={128}
                height={128}
                className="rounded-full object-cover shadow-lg print:shadow-none"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-1 print:text-2xl">Filtra Café</h1>
            <p className="text-gray-600 text-sm print:text-xs">Your Receipt</p>
          </div>

          {/* Receipt Content */}
          <div className="p-6 sm:p-8 print:p-6">
            {/* Divider */}
            <div className="h-1 bg-amber-200 rounded-full mb-6 print:h-px print:my-4"></div>

            {/* Order Info - Simple Clean Layout */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 print:text-xs">Order Number</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono print:text-xl">{receipt.orderId.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1 print:text-xs">Table</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono print:text-xl">#{receipt.tableNumber}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="text-center mb-6 print:text-xs print:mb-4">
              <p className="text-gray-600 text-sm print:text-xs">{receipt.timestamp}</p>
            </div>

            {/* Divider */}
            <div className="h-1 bg-amber-200 rounded-full mb-6 print:h-px print:my-3"></div>

            {/* Items with Professional Formatting */}
            <div className="mb-6 print:mb-3">
              <div className="space-y-4 print:space-y-2">
                {receipt.items.length > 0 ? (
                  receipt.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start gap-4 print:gap-2 print:text-xs">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base print:text-xs print:font-semibold">{item.menuItem?.name || 'Item'}</p>
                        <p className="text-xs text-gray-600 mt-1 print:text-xs print:mt-0">
                          {item.quantity}x {item.size}
                          {item.addOns && item.addOns.length > 0 && (
                            <span className="block text-gray-500 print:text-gray-600">
                              +{item.addOns.map((a: any) => a.name).join(', ')}
                            </span>
                          )}
                        </p>
                      </div>
                      <p className="font-bold text-amber-700 text-sm sm:text-base whitespace-nowrap print:text-xs print:font-bold">₱{(item.price || 0).toFixed(2)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center text-xs print:text-xs">No items</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-1 bg-amber-200 rounded-full mb-6 print:h-px print:my-3"></div>

            {/* Total - Professional */}
            <div className="mb-8 print:mb-3">
              <div className="flex justify-between items-center gap-4 print:gap-2">
                <span className="text-lg sm:text-xl font-bold text-gray-800 print:text-base print:font-bold">TOTAL</span>
                <span className="text-2xl sm:text-3xl font-bold text-amber-700 font-mono print:text-lg print:font-bold">₱{receipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-1 bg-amber-200 rounded-full mb-6 print:h-px print:my-3"></div>

            {/* Footer Message */}
            <div className="text-center py-4 print:py-2 print:text-xs">
              <p className="text-gray-700 text-sm font-semibold mb-2 print:text-xs print:font-semibold print:mb-1">Thank you for your order!</p>
              <p className="text-gray-500 text-xs print:text-xs">Please proceed to payment counter</p>
              <p className="text-gray-400 text-xs mt-3 print:text-xs print:mt-1">© 2024 Filtra Café</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: white !important;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          
          .print\:hidden {
            display: none !important;
          }
          
          div[class*="min-h-screen"] {
            min-height: auto !important;
            background: white !important;
            padding: 0 !important;
          }
          
          div[class*="max-w-2xl"] {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          #receipt-content {
            max-width: 100% !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            page-break-after: avoid;
          }
          
          #receipt-content > div {
            padding: 15mm !important;
          }
          
          .bg-white {
            background: white !important;
          }
          
          .text-amber-900,
          .text-amber-700 {
            color: #333 !important;
          }
          
          .text-gray-600,
          .text-gray-800 {
            color: #000 !important;
          }
          
          .border-amber-600 {
            border-color: #333 !important;
          }
          
          .bg-amber-200 {
            background: #ddd !important;
          }
          
          @page {
            size: 80mm auto;
            margin: 0;
            padding: 0;
          }
          
          .logo-print {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Loading receipt...</p>
        </div>
      </div>
    }>
      <ReceiptContent />
    </Suspense>
  )
}
