'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, Clock, CheckCircle, AlertCircle, Volume2 } from 'lucide-react'

interface Order {
  id: string
  tableNumber: number
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED'
  paymentStatus: 'UNPAID' | 'PAID'
  totalAmount: number
  createdAt: string
  orderItems: Array<{
    id: string
    quantity: number
    menuItem: { name: string }
    addOns: Array<{ id: string; quantity: number; addOn: { name: string } }>
  }>
}

export default function OrderTrackingPage() {
  const router = useRouter()
  const tableNumber = useCartStore((state) => state.tableNumber)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [notificationEnabled, setNotificationEnabled] = useState(false)

  useEffect(() => {
    if (!tableNumber) {
      router.push('/landing')
      return
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?table=${tableNumber}`)
        if (response.ok) {
          const orders = await response.json()
          // Get the most recent order for this table
          const latestOrder = orders.find(
            (o: Order) => o.tableNumber === tableNumber && o.status !== 'COMPLETED'
          )
          if (latestOrder) {
            setOrder(latestOrder)
            checkNotificationPermission()
          }
        }
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()

    // Poll for order updates every 2 seconds
    const interval = setInterval(fetchOrder, 2000)
    return () => clearInterval(interval)
  }, [tableNumber, router])

  const checkNotificationPermission = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationEnabled(true)
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        setNotificationEnabled(permission === 'granted')
      }
    }
  }

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const sendNotification = (title: string, message: string) => {
    if (notificationEnabled && 'Notification' in window) {
      new Notification(title, {
        body: message,
        icon: '/logo.jpg',
        tag: 'order-update',
      })
      playNotificationSound()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'PREPARING':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'READY':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-6 h-6" />
      case 'CONFIRMED':
        return <CheckCircle className="w-6 h-6" />
      case 'PREPARING':
        return <Clock className="w-6 h-6 animate-spin" />
      case 'READY':
        return <CheckCircle className="w-6 h-6" />
      default:
        return <AlertCircle className="w-6 h-6" />
    }
  }

  const statusSteps = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY']

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Loading your order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Active Order</h1>
          <p className="text-gray-600 mb-6">You haven't placed an order yet for Table {tableNumber}</p>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all">
            <Home size={20} />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="text-2xl font-bold">Order Tracking</h1>
          <button
            onClick={() => {
              checkNotificationPermission()
              sendNotification('Test', 'Notifications enabled!')
            }}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-all"
          >
            <Volume2 size={20} />
            <span className="hidden sm:inline text-sm">Notify</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Table & Order Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Table Number</p>
              <p className="text-3xl font-bold text-amber-600">🪑 {order.tableNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="text-lg font-mono font-bold text-gray-800">#{order.id.slice(0, 8)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Time Placed</p>
              <p className="text-lg font-bold text-gray-800">{new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-amber-600">₱{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Status Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
          
          {/* Status Timeline */}
          <div className="flex items-center justify-between mb-8">
            {statusSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    statusSteps.indexOf(order.status) >= index
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {statusSteps.indexOf(order.status) > index ? '✓' : index + 1}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center text-gray-700">{step}</p>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`h-1 w-full mt-4 ${
                      statusSteps.indexOf(order.status) > index ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Current Status Card */}
          <div className={`rounded-lg p-6 border-2 text-center ${getStatusColor(order.status)}`}>
            <div className="flex justify-center mb-3">{getStatusIcon(order.status)}</div>
            <h3 className="text-2xl font-bold mb-2">
              {order.status === 'PENDING' && '⏳ Waiting for confirmation...'}
              {order.status === 'CONFIRMED' && '✓ Order confirmed!'}
              {order.status === 'PREPARING' && '👨‍🍳 Preparing your order...'}
              {order.status === 'READY' && '✅ Ready for pickup!'}
            </h3>
            <p className="text-sm opacity-90">
              {order.status === 'PENDING' && 'Your order is being reviewed by the barista'}
              {order.status === 'CONFIRMED' && 'Your order has been confirmed and will be prepared shortly'}
              {order.status === 'PREPARING' && 'Your drink is being prepared with care'}
              {order.status === 'READY' && 'Your order is ready! Please pick it up at the counter'}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Your Items</h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item.id} className="border-l-4 border-amber-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900">
                  {item.quantity}x {item.menuItem.name}
                </p>
                {item.addOns.length > 0 && (
                  <ul className="ml-4 text-sm text-gray-600 mt-2">
                    {item.addOns.map((addOn) => (
                      <li key={addOn.id}>• {addOn.quantity}x {addOn.addOn.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💳 Payment Status</h2>
          <div className={`rounded-lg p-4 text-center font-bold text-lg ${
            order.paymentStatus === 'PAID'
              ? 'bg-green-100 text-green-800 border-2 border-green-300'
              : 'bg-red-100 text-red-800 border-2 border-red-300'
          }`}>
            {order.paymentStatus === 'PAID' ? '✓ Payment Completed' : '⏳ Awaiting Payment'}
          </div>
        </div>

        {/* Ready Message */}
        {order.status === 'READY' && (
          <div className="mt-8 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg p-8 text-center animate-pulse">
            <h3 className="text-3xl font-bold mb-2">🎉 Your Order is Ready!</h3>
            <p className="text-lg">Please pick up your drink at the counter</p>
          </div>
        )}
      </main>
    </div>
  )
}
