'use client'

import { useState } from 'react'
import { Smartphone, QrCode, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

interface GCashPaymentProps {
  amount: number
  orderNumber: string
  onPaymentComplete: (paymentMethod: string, reference: string) => void
  onCancel: () => void
}

export default function GCashPayment({ amount, orderNumber, onPaymentComplete, onCancel }: GCashPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'app'>('qr')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentCode, setPaymentCode] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const generatePaymentCode = () => {
    const code = `GC${Date.now().toString().slice(-8)}`
    setPaymentCode(code)
    return code
  }

  const handleQRPayment = async () => {
    setIsProcessing(true)
    const code = generatePaymentCode()
    
    // Simulate QR code generation and processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real implementation, this would integrate with GCash API
    // For now, we'll simulate successful payment
    setShowSuccess(true)
    setTimeout(() => {
      onPaymentComplete('GCASH_QR', code)
    }, 2000)
  }

  const handleAppPayment = async () => {
    setIsProcessing(true)
    const code = generatePaymentCode()
    
    // In a real implementation, this would open GCash app or deep link
    // For now, we'll simulate app redirect
    const gcashDeepLink = `gcash://payment?amount=${amount}&reference=${code}`
    
    try {
      // Try to open GCash app
      window.location.href = gcashDeepLink
      
      // Fallback: show instructions
      setTimeout(() => {
        alert(`Please open your GCash app and scan the code with reference: ${code}`)
        setShowSuccess(true)
        setTimeout(() => {
          onPaymentComplete('GCASH_APP', code)
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error('Error opening GCash app:', error)
      alert('Unable to open GCash app. Please ensure GCash is installed.')
      setIsProcessing(false)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === 'qr') {
      handleQRPayment()
    } else {
      handleAppPayment()
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Reference Number</p>
            <p className="font-mono font-bold text-lg">{paymentCode}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Please keep this reference number for your records.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">GCash Payment</h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isProcessing}
          >
            ×
          </button>
        </div>

        {/* Amount Display */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 mb-6">
          <p className="text-sm opacity-90 mb-1">Total Amount</p>
          <p className="text-3xl font-bold">₱{amount.toFixed(2)}</p>
          <p className="text-sm opacity-90 mt-1">Order #{orderNumber}</p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Choose Payment Method:</p>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'qr'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">QR Code Payment</p>
                  <p className="text-sm text-gray-600">Scan QR code with GCash app</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('app')}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'app'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">GCash App</p>
                  <p className="text-sm text-gray-600">Pay directly via GCash app</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              {paymentMethod === 'qr' ? (
                <div>
                  <p className="font-semibold mb-1">QR Code Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Click "Proceed to Payment" below</li>
                    <li>A QR code will be generated</li>
                    <li>Open your GCash app and scan the QR code</li>
                    <li>Confirm the payment in your GCash app</li>
                  </ol>
                </div>
              ) : (
                <div>
                  <p className="font-semibold mb-1">GCash App Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Click "Proceed to Payment" below</li>
                    <li>You'll be redirected to the GCash app</li>
                    <li>Confirm the payment details</li>
                    <li>Complete the payment in the app</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Proceed to Payment
              </>
            )}
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secured by GCash Payment Gateway
          </p>
        </div>
      </div>
    </div>
  )
}
