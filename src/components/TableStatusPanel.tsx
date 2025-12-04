'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'

interface TableStatus {
  tableNumber: number
  status: 'AVAILABLE' | 'OCCUPIED'
  isAvailable: boolean
}

export default function TableStatusPanel() {
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const fetchTableStatuses = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/table-status', {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          setTableStatuses(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching table statuses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTableStatuses()

    // Refresh every 3 seconds
    const interval = setInterval(fetchTableStatuses, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleManualRefresh = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/table-status', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setTableStatuses(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error refreshing table statuses:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const occupiedTables = tableStatuses.filter((t) => !t.isAvailable)
  const availableTables = tableStatuses.filter((t) => t.isAvailable)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="text-amber-600" size={24} />
            Table Status Overview
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time table occupancy status
          </p>
        </div>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50"
        >
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading table statuses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Occupied Tables */}
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-red-600" size={20} />
              <h3 className="font-bold text-red-900">
                Occupied Tables ({occupiedTables.length})
              </h3>
            </div>
            {occupiedTables.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {occupiedTables.map((table) => (
                  <div
                    key={table.tableNumber}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md"
                  >
                    Table {table.tableNumber}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-700 text-sm">No occupied tables</p>
            )}
          </div>

          {/* Available Tables */}
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-600" size={20} />
              <h3 className="font-bold text-green-900">
                Available Tables ({availableTables.length})
              </h3>
            </div>
            {availableTables.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {availableTables.map((table) => (
                  <div
                    key={table.tableNumber}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md"
                  >
                    Table {table.tableNumber}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-700 text-sm">No available tables</p>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-amber-600">
              {tableStatuses.length}
            </p>
            <p className="text-sm text-gray-600">Total Tables</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-600">
              {occupiedTables.length}
            </p>
            <p className="text-sm text-gray-600">Occupied</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {availableTables.length}
            </p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
        </div>
      </div>
    </div>
  )
}
