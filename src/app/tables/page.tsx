'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function TablesPage() {
  const router = useRouter()
  const { setTableNumber } = useCartStore()
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  const tables = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
    { id: 4, number: 4 },
    { id: 5, number: 5 },
    { id: 6, number: 6 },
    { id: 7, number: 7 },
    { id: 8, number: 8 },
    { id: 9, number: 9 },
    { id: 10, number: 10 },
  ]

  const handleTableSelect = (tableNumber: number) => {
    setTableNumber(tableNumber)
    setSelectedTable(tableNumber)
    setTimeout(() => {
      router.push('/')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 p-4">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/landing" className="flex items-center gap-2 text-white hover:text-amber-200 transition-colors">
          <Home size={24} />
          <span className="text-sm font-semibold">Back Home</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex-1">
          Select Your Table
        </h1>
        <div className="w-24"></div>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white bg-opacity-10 border border-amber-200 rounded-xl p-6 text-white text-center">
          <p className="text-lg">
            Click on your table number to start ordering
          </p>
          <p className="text-sm text-amber-100 mt-2">
            Or scan the QR code on your table to auto-detect
          </p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => handleTableSelect(table.number)}
              className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                selectedTable === table.number
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl scale-105'
                  : 'bg-white bg-opacity-10 border-2 border-amber-200 hover:bg-opacity-20'
              }`}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  selectedTable === table.number
                    ? 'bg-gradient-to-br from-orange-400 to-orange-600 opacity-75 blur-xl'
                    : 'bg-orange-400 opacity-0 blur-xl'
                }`}
              ></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {table.number}
                </div>
                <p className="text-amber-100 text-sm font-semibold">Table</p>

                {selectedTable === table.number && (
                  <div className="mt-2 text-green-300 text-xs font-bold animate-pulse">
                    ✓ Selected
                  </div>
                )}
              </div>

              {/* Click Effect */}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Table Info */}
      {selectedTable && (
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl">
            <p className="text-white text-lg font-semibold mb-2">
              Table {selectedTable} Selected! 🎉
            </p>
            <p className="text-green-100 text-sm">
              Redirecting to menu in a moment...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
