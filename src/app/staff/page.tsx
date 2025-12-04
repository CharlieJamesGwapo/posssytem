'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Coffee, CheckCircle, Clock, AlertCircle, LogOut, Menu, X, RefreshCw, QrCode, Home, ChevronDown } from 'lucide-react'
import { showSuccessAlert, showErrorAlert } from '@/utils'
import TableStatusPanel from '@/components/TableStatusPanel'

interface Table {
  id: string
  tableNumber: number
  status: string
  qrCode: string
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  id: string
  menuItem: {
    name: string
  }
  quantity: number
  addOns: Array<{
    id: string
    addOn: {
      name: string
    }
    quantity: number
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
  paymentCode?: string
}

export default function StaffDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [staffName, setStaffName] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [authenticated, setAuthenticated] = useState(false)
  const [showTableManager, setShowTableManager] = useState(false)
  const [tableManagerLoading, setTableManagerLoading] = useState(false)

  useEffect(() => {
    // Check authentication on client side only
    const token = localStorage.getItem('staffToken')
    const name = localStorage.getItem('staffName')

    if (!token) {
      // Redirect to login
      router.push('/staff-login')
      return
    }

    // Set authenticated state
    setStaffName(name || 'Staff')
    setAuthenticated(true)

    // Prevent accidental navigation away
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [router])

  useEffect(() => {
    // Only fetch orders if authenticated
    if (!authenticated) return

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          console.error('Failed to fetch orders:', response.status)
          setOrders([])
          return
        }
        const data = await response.json()
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    // Fetch immediately
    fetchOrders()

    // Refresh orders every 5 seconds
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [authenticated])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedOrder = orders.find((o) => o.id === orderId)
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        )

        // Send notification to customer
        if (updatedOrder) {
          await notifyCustomer(orderId, updatedOrder.tableNumber, newStatus)
        }
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const notifyCustomer = async (orderId: string, tableNumber: number, status: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          tableNumber,
          status,
          type: 'STATUS_UPDATE',
        }),
      })

      if (response.ok) {
        await showSuccessAlert('Notification Sent', `Customer at Table ${tableNumber} has been notified about the order status.`)
      }
    } catch (error) {
      console.error('Error notifying customer:', error)
    }
  }

  // Fetch all tables
  const fetchTables = async () => {
    try {
      const response = await fetch('/api/table-status')
      if (!response.ok) throw new Error('Failed to fetch tables')
      const data = await response.json()
      setTables(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

  // Mark table as available (customer done)
  const handleMarkTableAvailable = async (tableNumber: number) => {
    try {
      setTableManagerLoading(true)
      const response = await fetch('/api/table-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark-available',
          tableNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        await showErrorAlert('Error', data.error || 'Failed to update table status')
        return
      }

      // Check if table was already available
      if (data.alreadyAvailable) {
        await showSuccessAlert('Already Available', `Table ${tableNumber} is already available! ✅`)
        await fetchTables()
        return
      }

      if (data.success) {
        await showSuccessAlert('✅ Table Cleared', `Table ${tableNumber} is now available for new customers`)
        await fetchTables()
      } else {
        await showErrorAlert('Failed', data.message || 'Could not update table status')
      }
    } catch (error) {
      console.error('Error updating table:', error)
      await showErrorAlert('Error', 'Failed to mark table as available')
    } finally {
      setTableManagerLoading(false)
    }
  }

  // Mark table as occupied (customer arrived)
  const handleMarkTableOccupied = async (tableNumber: number) => {
    try {
      setTableManagerLoading(true)
      const response = await fetch('/api/table-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark-occupied',
          tableNumber,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        await showErrorAlert('Error', data.error || 'Failed to update table status')
        return
      }

      // Check if table was already occupied
      if (data.alreadyOccupied) {
        await showSuccessAlert('Already Occupied', `Table ${tableNumber} is already occupied! 🔴`)
        await fetchTables()
        return
      }

      if (data.success) {
        await showSuccessAlert('🔴 Table Occupied', `Table ${tableNumber} is now marked as occupied`)
        await fetchTables()
      } else {
        await showErrorAlert('Failed', data.message || 'Could not update table status')
      }
    } catch (error) {
      console.error('Error updating table:', error)
      await showErrorAlert('Error', 'Failed to mark table as occupied')
    } finally {
      setTableManagerLoading(false)
    }
  }

  // Initialize and load tables when component mounts
  useEffect(() => {
    if (authenticated) {
      const initializeTables = async () => {
        try {
          // First, try to initialize tables if they don't exist
          await fetch('/api/init-tables', { method: 'POST' })
        } catch (error) {
          console.error('Error initializing tables:', error)
        }
        // Then fetch the tables
        await fetchTables()
      }

      initializeTables()
      const interval = setInterval(fetchTables, 10000) // Refresh every 10 seconds
      return () => clearInterval(interval)
    }
  }, [authenticated])

  const handlePaymentConfirm = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: 'PAID' }),
      })

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order.id === orderId
              ? { ...order, paymentStatus: 'PAID' }
              : order
          )
        )
        await showSuccessAlert('Payment Confirmed', 'Payment status updated successfully')
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      await showErrorAlert('Error', 'Failed to confirm payment')
    }
  }

  const handleLogout = async () => {
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout? You will need to login again.')) {
      // Clear localStorage
      localStorage.removeItem('staffToken')
      localStorage.removeItem('staffName')
      localStorage.removeItem('staffRole')
      localStorage.removeItem('staffId')

      // Clear cookie
      document.cookie = 'staffToken=; path=/; max-age=0'

      await showSuccessAlert('Logged Out', 'You have been logged out successfully')
      router.push('/staff-login')
    }
  }

  const handleManualRefresh = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data)
      setLastRefresh(new Date())
      await showSuccessAlert('Refreshed', 'Orders updated successfully')
    } catch (error) {
      console.error('Error refreshing orders:', error)
      await showErrorAlert('Error', 'Failed to refresh orders')
    } finally {
      setRefreshing(false)
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true
    if (filter === 'pending')
      return order.status === 'PENDING' || order.status === 'CONFIRMED'
    if (filter === 'preparing') return order.status === 'PREPARING'
    if (filter === 'ready') return order.status === 'READY'
    return true
  })

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PREPARING: 'bg-orange-100 text-orange-800',
    READY: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
  }

  const paymentColors: Record<string, string> = {
    UNPAID: 'bg-red-100 text-red-800',
    PAID: 'bg-green-100 text-green-800',
  }

  // Show loading while checking authentication
  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Coffee className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
                  Staff Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-amber-100 truncate">Welcome, {staffName}</p>
              </div>
            </div>

            {/* Center Section - Stats */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <div className="text-center">
                <p className="text-xs text-amber-100">Total Orders</p>
                <p className="text-lg xl:text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-amber-100">Last Refresh</p>
                <p className="text-xs xl:text-sm font-semibold text-amber-50">
                  {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Link
                href="/landing"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all font-semibold text-xs sm:text-sm"
                title="Back to Home"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link
                href="/qr-generator"
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
                title="Generate QR codes"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <button
                onClick={() => setShowTableManager(!showTableManager)}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
                title="Manage tables"
              >
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <Link
                href="/staff-table-status"
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
                title="Monitor table status"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className={`p-2 rounded-lg transition-all ${
                  refreshing
                    ? 'bg-white bg-opacity-10 text-white cursor-not-allowed'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
                title="Refresh orders"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Info */}
          {mobileMenuOpen && (
            <div className="mt-4 pt-4 border-t border-amber-200 lg:hidden space-y-3 text-white">
              <div className="text-center">
                <p className="text-xs text-amber-100">Total Orders</p>
                <p className="text-lg font-bold text-white">{orders.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-amber-100">Last Refresh</p>
                <p className="text-xs font-semibold text-amber-50">
                  {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {['all', 'pending', 'preparing', 'ready'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status)
                  setMobileMenuOpen(false)
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm whitespace-nowrap ${
                  filter === status
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status === 'all' ? '📊 All' : status === 'pending' ? '⏳ Pending' : status === 'preparing' ? '👨‍🍳 Preparing' : '✅ Ready'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-8">
        {/* Table Status Panel */}
        <div className="mb-8 sm:mb-10">
          <TableStatusPanel />
        </div>

        {/* Orders Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Coffee className="text-amber-600" size={28} />
            Active Orders
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} to process
          </p>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-base sm:text-lg text-gray-600">No orders to display</p>
            <p className="text-sm text-gray-500 mt-2">Waiting for customers to place orders...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border-l-4 border-amber-600"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">🪑 Table {order.tableNumber}</h3>
                      <p className="text-xs sm:text-sm text-amber-100 mt-1">
                        ⏰ {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full font-mono text-xs sm:text-sm font-semibold">
                      #{order.id.slice(0, 8)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-5 border-b border-gray-200 max-h-48 overflow-y-auto flex-grow bg-gray-50">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">📋 Items:</h4>
                  <div className="space-y-2">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="text-xs sm:text-sm bg-white p-2 rounded border border-gray-200">
                        <p className="font-semibold text-gray-900">
                          {item.quantity}x {item.menuItem.name}
                        </p>
                        {item.addOns.length > 0 && (
                          <ul className="ml-3 text-gray-600 text-xs mt-1">
                            {item.addOns.map((addOn) => (
                              <li key={addOn.id} className="text-gray-500">
                                • {addOn.quantity}x {addOn.addOn.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Payment */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Order Status */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">👨‍🍳 Order Status</p>
                    <div className="flex gap-2 flex-wrap">
                      {['CONFIRMED', 'PREPARING', 'READY'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                          className={`text-xs sm:text-sm font-bold px-3 py-2 rounded-lg transition-all transform hover:scale-105 ${
                            order.status === status
                              ? statusColors[status] + ' shadow-md'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {status === 'CONFIRMED' ? '✓' : status === 'PREPARING' ? '👨‍🍳' : '✅'} {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">💳 Payment</p>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs sm:text-sm font-bold px-3 py-2 rounded-lg ${
                          paymentColors[order.paymentStatus]
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                      {order.paymentStatus === 'UNPAID' && (
                        <button
                          onClick={() => handlePaymentConfirm(order.id)}
                          className="text-xs sm:text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all transform hover:scale-105 font-bold"
                        >
                          ✓ Confirm
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notify Customer Button */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">🔔 Customer Notification</p>
                    <button
                      onClick={() => notifyCustomer(order.id, order.tableNumber, order.status)}
                      className="w-full text-xs sm:text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg transition-all transform hover:scale-105 font-bold shadow-md"
                    >
                      🔔 Notify Table {order.tableNumber}
                    </button>
                  </div>

                  {/* Payment Code */}
                  {order.paymentCode && (
                    <div className="bg-amber-50 rounded-lg p-3 text-center border-2 border-amber-200">
                      <p className="text-xs text-gray-600 font-bold mb-1">💰 Payment Code</p>
                      <p className="text-lg sm:text-xl font-bold text-amber-600 font-mono">
                        {order.paymentCode}
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t-2 border-gray-200 pt-3">
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      💵 Total: <span className="text-amber-600 text-lg">₱{order.totalAmount.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Table Manager Modal */}
      {showTableManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex items-center justify-between sticky top-0">
              <h2 className="text-2xl font-bold">🪑 Table Management</h2>
              <button
                onClick={() => setShowTableManager(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`rounded-xl shadow-lg p-4 text-center transition-all ${
                      table.status === 'OCCUPIED'
                        ? 'bg-red-100 border-2 border-red-600'
                        : 'bg-green-100 border-2 border-green-600'
                    }`}
                  >
                    {/* Table Number */}
                    <div
                      className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 shadow-lg ${
                        table.status === 'OCCUPIED'
                          ? 'bg-red-600'
                          : 'bg-green-600'
                      }`}
                    >
                      <p className="text-2xl font-bold text-white">
                        {table.tableNumber}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`text-xs font-bold mb-3 py-1 rounded-lg ${
                        table.status === 'OCCUPIED'
                          ? 'bg-red-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {table.status === 'OCCUPIED' ? '🔴 OCCUPIED' : '🟢 AVAILABLE'}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {table.status === 'OCCUPIED' && (
                        <button
                          onClick={() => handleMarkTableAvailable(table.tableNumber)}
                          disabled={tableManagerLoading}
                          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
                        >
                          ✓ Clear
                        </button>
                      )}
                      {table.status === 'AVAILABLE' && (
                        <button
                          onClick={() => handleMarkTableOccupied(table.tableNumber)}
                          disabled={tableManagerLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors text-xs"
                        >
                          ✓ Occupy
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 How to use:</strong> Click "Clear" to mark a table as free when customers are done. Click "Occupy" to mark a table as in-use. Tables automatically update based on active orders.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowTableManager(false)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  fetchTables()
                  showSuccessAlert('Refreshed', 'Table statuses updated')
                }}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
