'use client'

import { useEffect, useState } from 'react'
import { Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface Table {
  id: string
  tableNumber: number
  status: string
  createdAt: string
  updatedAt: string
}

export default function StaffTableStatusPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetchTables()

    // Auto-refresh every 5 seconds
    const interval = setInterval(() => {
      fetchTables()
    }, 5000)

    setRefreshInterval(interval)

    return () => clearInterval(interval)
  }, [])

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/table-status')
      if (!response.ok) throw new Error('Failed to fetch tables')
      const data = await response.json()
      setTables(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      console.error('Error fetching tables:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch tables')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAvailable = async (tableNumber: number) => {
    try {
      const response = await fetch('/api/table-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'mark-available',
          tableNumber,
        }),
      })

      if (!response.ok) throw new Error('Failed to update table status')

      // Refresh tables list
      fetchTables()
    } catch (err) {
      console.error('Error updating table:', err)
      alert('Error updating table status')
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchTables()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border-2 border-red-600 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-bold text-lg mb-4">Error Loading Tables</p>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/staff"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors"
          >
            <Home size={20} />
            <span className="font-semibold">Staff Dashboard</span>
          </Link>

          <h1 className="text-4xl font-bold text-blue-900">Table Status Monitor</h1>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        <p className="text-gray-600 text-center">
          Real-time view of all table statuses. Green = Available, Red = Occupied
        </p>
      </div>

      {/* Tables Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`rounded-2xl shadow-lg p-6 text-center transition-all ${
                table.status === 'OCCUPIED'
                  ? 'bg-red-100 border-4 border-red-600'
                  : 'bg-green-100 border-4 border-green-600'
              }`}
            >
              {/* Table Number */}
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-lg ${
                  table.status === 'OCCUPIED'
                    ? 'bg-red-600'
                    : 'bg-green-600'
                }`}
              >
                <p className="text-3xl font-bold text-white">
                  {table.tableNumber}
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`text-sm font-bold mb-4 py-2 rounded-lg ${
                  table.status === 'OCCUPIED'
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white'
                }`}
              >
                {table.status === 'OCCUPIED' ? '🔴 OCCUPIED' : '🟢 AVAILABLE'}
              </div>

              {/* Mark Available Button */}
              {table.status === 'OCCUPIED' && (
                <button
                  onClick={() => handleMarkAvailable(table.tableNumber)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                >
                  ✓ Clear Table
                </button>
              )}

              {table.status === 'AVAILABLE' && (
                <p className="text-sm text-green-700 font-semibold">
                  Ready for customers
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Table Status Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              <div>
                <p className="font-semibold text-gray-900">AVAILABLE</p>
                <p className="text-sm text-gray-600">Table is ready for new customers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full"></div>
              <div>
                <p className="font-semibold text-gray-900">OCCUPIED</p>
                <p className="text-sm text-gray-600">Customer is currently ordering/waiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-refresh Info */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-600">
        <p>⏱️ Auto-refreshing every 5 seconds</p>
      </div>
    </div>
  )
}
