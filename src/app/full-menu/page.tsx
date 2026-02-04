'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ArrowLeft, Search, Filter } from 'lucide-react'
import MenuCard from '@/components/MenuCard'
import { useCartStore } from '@/store'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  addOns: any[]
  isBestSeller?: boolean
  isAvailable?: boolean
}

function FullMenuContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  
  const cartItems = useCartStore((state) => state.items)
  const setTableNumber = useCartStore((state) => state.setTableNumber)
  const setTableOccupied = useCartStore((state) => state.setTableOccupied)
  const clearCart = useCartStore((state) => state.clearCart)
  const itemCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu')
        const data = await response.json()
        setMenuItems(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching menu:', error)
        setMenuItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()

    // Check for table number from URL parameters
    const tableFromURL = searchParams.get('table')
    if (tableFromURL) {
      const parsedTable = parseInt(tableFromURL, 10)
      if (!isNaN(parsedTable) && parsedTable > 0) {
        setTableNumber(parsedTable)
        setTableOccupied(true)
      }
    }
  }, [searchParams, setTableNumber, setTableOccupied])

  const categories = Array.from(
    new Set((menuItems || []).map((item) => item.category))
  )

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const isAvailable = item.isAvailable !== false
    return matchesSearch && matchesCategory && isAvailable
  })

  const handleStartOrder = () => {
    // If no table is set, redirect to landing page to select table
    const tableNumber = useCartStore.getState().tableNumber
    if (!tableNumber) {
      router.push('/landing')
    } else {
      router.push('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Full Menu</h1>
                <p className="text-xs sm:text-sm text-amber-100">Browse our complete menu</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors sm:hidden"
              >
                <Filter size={20} />
              </button>
              
              <Link
                href="/cart"
                className="relative bg-white hover:bg-gray-100 text-amber-600 px-3 sm:px-4 py-2 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold text-sm shadow-md hover:shadow-lg"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Category Filter */}
          {(showFilters || categories.length > 0) && (
            <div className={`${showFilters ? 'block' : 'hidden sm:block'}`}>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Items
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredItems.length} {selectedCategory ? selectedCategory : 'Items'}
            </h2>
            {itemCount > 0 && (
              <button
                onClick={handleStartOrder}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                Start Ordering
              </button>
            )}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg text-gray-600">No items found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
                addOns={item.addOns}
                isBestSeller={item.isBestSeller}
                isAvailable={item.isAvailable}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Button (Mobile) */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 md:hidden z-30 animate-bounce">
          <Link
            href="/cart"
            className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transform hover:scale-110 transition-transform"
          >
            <ShoppingCart size={20} />
            <span className="font-bold text-sm">{itemCount}</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default function FullMenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    }>
      <FullMenuContent />
    </Suspense>
  )
}
