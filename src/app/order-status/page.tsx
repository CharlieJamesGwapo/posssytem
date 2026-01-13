'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Zap, Volume2, VolumeX, Bell } from 'lucide-react'
import { showInfoAlert } from '@/utils'

interface OrderItem {
  id: string
  quantity: number
  size?: string
  sugarLevel?: number
  menuItem: {
    name: string
  }
  addOns: Array<{
    id: string
    quantity: number
    addOn: {
      name: string
    }
  }>
}

interface Order {
  id: string
  tableNumber: number
  status: string
  paymentStatus: string
  totalAmount: number
  orderItems: OrderItem[]
  createdAt: string
  estimatedTime: number
  paymentCode?: string
}

const statusSteps = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED']

const statusIcons: Record<string, any> = {
  PENDING: <Clock className="w-6 h-6" />,
  CONFIRMED: <CheckCircle className="w-6 h-6" />,
  PREPARING: <Zap className="w-6 h-6" />,
  READY: <CheckCircle className="w-6 h-6" />,
  COMPLETED: <CheckCircle className="w-6 h-6" />,
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-300',
  PREPARING: 'bg-orange-100 text-orange-800 border-orange-300',
  READY: 'bg-green-100 text-green-800 border-green-300',
  COMPLETED: 'bg-gray-100 text-gray-800 border-gray-300',
}

const statusMessages: Record<string, string> = {
  PENDING: 'Your order is being confirmed',
  CONFIRMED: 'Your order has been confirmed',
  PREPARING: 'Your order is being prepared',
  READY: 'Your order is ready for pickup!',
  COMPLETED: 'Thank you for your order!',
}

function OrderStatusContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const tableNumber = searchParams.get('table')

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [previousStatus, setPreviousStatus] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }
  }, [])

  // Play notification sound
  const playNotificationSound = () => {
    if (!soundEnabled) return

    // Create a simple beep sound using Web Audio API
    try {
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
    } catch (err) {
      console.log('Could not play sound:', err)
    }
  }

  // Send browser notification
  const sendBrowserNotification = (title: string, options?: NotificationOptions) => {
    if (!notificationEnabled || !('Notification' in window)) return

    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/logo.jpg',
        badge: '/logo.jpg',
        ...options,
      })
    }
  }

  // Handle status update notification
  const handleStatusUpdate = (newStatus: string) => {
    if (previousStatus && previousStatus !== newStatus) {
      const messages: Record<string, string> = {
        PENDING: 'Your order has been received!',
        CONFIRMED: 'Your order has been confirmed!',
        PREPARING: 'Your order is being prepared!',
        READY: 'Your order is ready for pickup!',
        COMPLETED: 'Enjoy your drink! Thank you for your order!',
      }

      const message = messages[newStatus] || 'Your order status has been updated'

      // Play sound
      playNotificationSound()

      // Send browser notification
      sendBrowserNotification('Order Update', {
        body: message,
        tag: 'order-update',
        requireInteraction: newStatus === 'READY',
      })

      // Vibrate if available
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }
    }
    setPreviousStatus(newStatus)
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setError('No order ID provided')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/orders/${orderId}`)
        if (!response.ok) {
          throw new Error('Order not found')
        }

        const data = await response.json()
        
        // Check if status changed
        if (order && order.status !== data.status) {
          handleStatusUpdate(data.status)
        } else if (!order) {
          setPreviousStatus(data.status)
        }

        setOrder(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()

    // Auto-refresh every 3 seconds if order is not completed
    let interval: ReturnType<typeof setInterval>
    if (autoRefresh) {
      interval = setInterval(fetchOrder, 3000)
    }

    return () => clearInterval(interval)
  }, [orderId, autoRefresh, order, previousStatus, soundEnabled, notificationEnabled])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading order status...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
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
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">{error || 'Order not found'}</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold"
            >
              Place New Order
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentStatusIndex = statusSteps.indexOf(order.status)
  const estimatedReadyTime = new Date(
    new Date(order.createdAt).getTime() + order.estimatedTime * 60000
  )

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

        {/* Main Status Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className={`${statusColors[order.status]} p-6 border-b-4`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/logo.jpg"
                    alt="Filtra Café Logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {statusMessages[order.status]}
                  </h1>
                  <p className="text-sm opacity-75">Order #{order.id.slice(0, 8)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Table Number</p>
                <p className="text-2xl font-bold text-amber-700">
                  {order.tableNumber}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-orange-700">
                  ₱{order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Order Progress</h3>
              <div className="space-y-3">
                {statusSteps.map((status, index) => (
                  <div key={status} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        index <= currentStatusIndex
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white scale-110'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          index <= currentStatusIndex
                            ? 'text-gray-800'
                            : 'text-gray-500'
                        }`}
                      >
                        {status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {statusMessages[status]}
                      </p>
                    </div>
                    {index <= currentStatusIndex && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated Time */}
            {order.status !== 'COMPLETED' && (
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-lg mb-6 border-2 border-amber-300">
                <p className="text-gray-700 text-sm mb-1">Estimated Ready Time</p>
                <p className="text-xl font-bold text-amber-700">
                  {estimatedReadyTime.toLocaleTimeString()}
                </p>
              </div>
            )}

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {item.quantity}x {item.menuItem?.name || 'Item'}
                        </p>
                        {item.size && (
                          <p className="text-sm text-gray-600">Size: {item.size}</p>
                        )}
                        {item.sugarLevel !== undefined && (
                          <p className="text-sm text-gray-600">
                            Sugar: {item.sugarLevel}%
                          </p>
                        )}
                        {item.addOns && item.addOns.length > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            <p className="font-medium">Add-ons:</p>
                            <ul className="list-disc list-inside">
                              {item.addOns.map((addon) => (
                                <li key={addon.id}>
                                  {addon.quantity}x {addon.addOn?.name || 'Add-on'}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No items in this order</p>
                )}
              </div>
            </div>

            {/* Payment Status */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    order.paymentStatus === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Notification Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                autoRefresh
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span>🔄</span>
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                soundEnabled
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {soundEnabled ? 'Sound ON' : 'Sound OFF'}
            </button>

            <button
              onClick={() => setNotificationEnabled(!notificationEnabled)}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                notificationEnabled
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Bell size={18} />
              {notificationEnabled ? 'Alerts ON' : 'Alerts OFF'}
            </button>
          </div>
        </div>

        {/* Auto-refresh Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transition-all"
          >
            Refresh Now
          </button>
        </div>

        {/* Back to Menu */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
          >
            Place Another Order
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading order status...</p>
        </div>
      </div>
    }>
      <OrderStatusContent />
    </Suspense>
  )
}
