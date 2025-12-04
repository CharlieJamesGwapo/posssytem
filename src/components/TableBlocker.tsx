'use client'

import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'

interface TableBlockerProps {
  tableNumber: number
}

export default function TableBlocker({ tableNumber }: TableBlockerProps) {
  const [isOccupied, setIsOccupied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkTableStatus = async () => {
      try {
        const response = await fetch('/api/table-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'check-status',
            tableNumber,
          }),
        })

        const data = await response.json()
        setIsOccupied(!data.isAvailable)
      } catch (error) {
        console.error('Error checking table status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkTableStatus()

    // Check every 3 seconds
    const interval = setInterval(checkTableStatus, 3000)
    return () => clearInterval(interval)
  }, [tableNumber])

  if (loading || !isOccupied) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Table {tableNumber} is Occupied
        </h2>

        <p className="text-gray-600 mb-6">
          This table is currently in use. Please try another table or wait for it to become available.
        </p>

        <a
          href="/customer-tables"
          className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Select Another Table
        </a>
      </div>
    </div>
  )
}
