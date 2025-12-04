'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useCartStore } from '@/store'
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const tableNumber = useCartStore((state) => state.tableNumber)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'GCASH' | 'PAYMAYA' | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [orderCode, setOrderCode] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const total = getTotalPrice()

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      await showErrorAlert('Payment Method Required', 'Please select a payment method to continue')
      return
    }

    setLoading(true)

    try {
      const orderData = {
        tableNumber,
        paymentMethod,
        items: items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          size: item.size,
          sugarLevel: item.sugarLevel,
          price: item.price,
          addOns: item.addOns,
        })),
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const order = await response.json()
      setOrderCode(order.paymentCode || order.id)
      setOrderId(order.id)
      clearCart()

      // Show success alert and redirect to receipt
      showSuccessAlert(
        'Order Placed Successfully! 🎉',
        `Your order has been confirmed. Table: ${tableNumber}`
      )

      // Redirect to receipt page after a short delay
      setTimeout(() => {
        router.push(`/receipt?orderId=${order.id}&table=${tableNumber}`)
      }, 500)
    } catch (error) {
      console.error('Error placing order:', error)
      await showErrorAlert(
        'Order Failed',
        'Failed to place order. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCode = () => {
    if (orderCode) {
      navigator.clipboard.writeText(orderCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (items.length === 0 && !orderCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Menu
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold">Order Placed! 🎉</h1>
              <p className="text-green-100 mt-2">Your order has been confirmed</p>
            </div>

            {/* Order Details */}
            <div className="p-8">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 mb-6 text-center border-2 border-amber-300">
                <p className="text-gray-700 text-sm mb-2 font-semibold">
                  {paymentMethod === 'CASH'
                    ? 'Payment Code'
                    : 'Order Number'}
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                  {orderCode}
                </p>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                >
                  <Copy size={16} />
                  {copied ? 'Copied! ✓' : 'Copy Code'}
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Table Number:</span>
                  <span className="font-semibold">{tableNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold">
                    {paymentMethod === 'CASH' ? 'Cash' : 'GCash'}
                  </span>
                </div>
                <div className="flex justify-between text-lg border-t-2 border-gray-200 pt-2 mt-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ₱{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {paymentMethod === 'CASH' && (
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>💰 Instructions:</strong> Show this code to the cashier to complete your payment. Your order will be prepared after payment is confirmed.
                  </p>
                </div>
              )}

              {paymentMethod === 'GCASH' && (
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-900">
                    <strong>📱 Instructions:</strong> Please scan the GCash QR code at the counter to complete your payment. Your order will be prepared after payment is confirmed.
                  </p>
                </div>
              )}

              {paymentMethod === 'PAYMAYA' && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-900">
                    <strong>💳 Instructions:</strong> Please scan the PayMaya QR code at the counter to complete your payment. Your order will be prepared after payment is confirmed.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                <Link
                  href={`/order-status?orderId=${orderId}&table=${tableNumber}`}
                  className="block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all transform hover:scale-105 text-center shadow-lg text-sm sm:text-base"
                >
                  🔍 Track Order
                </Link>
                <Link
                  href="/"
                  className="block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all transform hover:scale-105 text-center shadow-lg text-sm sm:text-base"
                >
                  🏠 Back to Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-3 sm:p-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-4 sm:mb-8 font-semibold text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Filtra Café Logo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold truncate">Checkout</h1>
                <p className="text-xs sm:text-sm text-amber-100 mt-0.5">Complete your order</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-4 sm:p-6 border-b-4 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> Order Summary
            </h2>
            <div className="space-y-2 sm:space-y-3 mb-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Table Number:</span>
                <span className="font-semibold text-gray-800">🪑 {tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold text-gray-800">{items.length} item{items.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="h-px bg-gray-300"></div>
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ₱{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💳</span> Select Payment Method
            </h2>

            <div className="space-y-2 sm:space-y-3 mb-6">
              {/* Cash Option */}
              <button
                onClick={() => setPaymentMethod('CASH')}
                className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all text-left transform hover:scale-102 ${
                  paymentMethod === 'CASH'
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">💰 Cash Payment</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Pay at the counter with a code
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      paymentMethod === 'CASH'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === 'CASH' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>

              {/* GCash Option */}
              <button
                onClick={() => setPaymentMethod('GCASH')}
                className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all text-left transform hover:scale-102 ${
                  paymentMethod === 'GCASH'
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-300 hover:border-purple-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">📱 GCash Payment</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Scan QR code to pay online
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      paymentMethod === 'GCASH'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === 'GCASH' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>

              {/* PayMaya Option */}
              <button
                onClick={() => setPaymentMethod('PAYMAYA')}
                className={`w-full p-3 sm:p-4 border-2 rounded-xl transition-all text-left transform hover:scale-102 ${
                  paymentMethod === 'PAYMAYA'
                    ? 'border-red-500 bg-red-50 shadow-lg'
                    : 'border-gray-300 hover:border-red-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">💳 PayMaya Payment</h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Scan QR code to pay online
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      paymentMethod === 'PAYMAYA'
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === 'PAYMAYA' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* Payment Info */}
            {paymentMethod === 'CASH' && (
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-xs sm:text-sm text-blue-900">
                  <strong>ℹ️ Info:</strong> You will receive a payment code after placing your order. Show this code to the cashier to complete payment.
                </p>
              </div>
            )}

            {paymentMethod === 'GCASH' && (
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-xs sm:text-sm text-purple-900">
                  <strong>ℹ️ Info:</strong> You will be directed to scan a GCash QR code to complete your payment.
                </p>
              </div>
            )}

            {paymentMethod === 'PAYMAYA' && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-xs sm:text-sm text-red-900">
                  <strong>ℹ️ Info:</strong> You will be directed to scan a PayMaya QR code to complete your payment.
                </p>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!paymentMethod || loading}
              className={`w-full font-bold py-2.5 sm:py-3 rounded-xl transition-all transform text-sm sm:text-base ${
                paymentMethod && !loading
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? '⏳ Processing...' : '✓ Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
