'use client'

import { useEffect, useState } from 'react'
import { X, Bell, Coffee, CheckCircle, Package } from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'status' | 'payment' | 'system'
  title: string
  message: string
  timestamp: Date
  autoClose?: boolean
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Play notification sound
  const playNotificationSound = (type: 'order' | 'status' | 'payment' | 'system') => {
    try {
      const audio = new Audio()
      
      // Different sounds for different notification types
      switch (type) {
        case 'order':
          // Create a simple beep sound for new orders
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
          break
        case 'status':
          // Create a different sound for status updates
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
          break
        case 'payment':
          // Create a success sound for payments
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
          break
        default:
          // Default notification sound
          audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
      }
      
      audio.volume = 0.5
      audio.play().catch(err => console.log('Could not play notification sound:', err))
    } catch (error) {
      console.log('Error playing notification sound:', error)
    }
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      autoClose: notification.autoClose !== false
    }

    setNotifications(prev => [newNotification, ...prev].slice(0, 5)) // Keep only last 5 notifications
    setIsVisible(true)
    playNotificationSound(notification.type)

    // Auto-close after 5 seconds if enabled
    if (newNotification.autoClose) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, 5000)
    }
  }

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    if (notifications.length <= 1) {
      setIsVisible(false)
    }
  }

  // Clear all notifications
  const clearAll = () => {
    setNotifications([])
    setIsVisible(false)
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Coffee className="w-5 h-5 text-blue-600" />
      case 'status':
        return <Package className="w-5 h-5 text-orange-600" />
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  // Get notification color based on type
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'border-blue-200 bg-blue-50'
      case 'status':
        return 'border-orange-200 bg-orange-50'
      case 'payment':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  // Listen for custom events from other components
  useEffect(() => {
    const handleNewOrder = ((event: CustomEvent) => {
      addNotification({
        type: 'order',
        title: '🆕 New Order Received!',
        message: `Table ${event.detail.tableNumber} - Order #${event.detail.orderNumber}`,
        autoClose: false
      })
    }) as EventListener

    const handleStatusUpdate = ((event: CustomEvent) => {
      addNotification({
        type: 'status',
        title: '📋 Order Status Updated',
        message: `Order #${event.detail.orderNumber} is now ${event.detail.status}`,
        autoClose: true
      })
    }) as EventListener

    const handlePaymentComplete = ((event: CustomEvent) => {
      addNotification({
        type: 'payment',
        title: '💳 Payment Completed',
        message: `Order #${event.detail.orderNumber} paid via ${event.detail.method}`,
        autoClose: true
      })
    }) as EventListener

    // Add event listeners
    window.addEventListener('newOrder', handleNewOrder)
    window.addEventListener('statusUpdate', handleStatusUpdate)
    window.addEventListener('paymentComplete', handlePaymentComplete)

    return () => {
      window.removeEventListener('newOrder', handleNewOrder)
      window.removeEventListener('statusUpdate', handleStatusUpdate)
      window.removeEventListener('paymentComplete', handlePaymentComplete)
    }
  }, [])

  if (!isVisible || notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
        <button
          onClick={clearAll}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-2 shadow-lg transition-all duration-300 animate-in slide-in-from-right-2 ${getNotificationColor(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Export helper functions to trigger notifications from other components
export const triggerNewOrderNotification = (tableNumber: number, orderNumber: string) => {
  window.dispatchEvent(new CustomEvent('newOrder', { 
    detail: { tableNumber, orderNumber } 
  }))
}

export const triggerStatusUpdateNotification = (orderNumber: string, status: string) => {
  window.dispatchEvent(new CustomEvent('statusUpdate', { 
    detail: { orderNumber, status } 
  }))
}

export const triggerPaymentCompleteNotification = (orderNumber: string, method: string) => {
  window.dispatchEvent(new CustomEvent('paymentComplete', { 
    detail: { orderNumber, method } 
  }))
}
