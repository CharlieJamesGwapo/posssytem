'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Coffee, QrCode } from 'lucide-react'
import MenuCard from '@/components/MenuCard'
import WelcomeScreen from '@/components/WelcomeScreen'
import TableBlocker from '@/components/TableBlocker'
import { useCartStore } from '@/store'
import { showErrorAlert, showSuccessAlert } from '@/utils'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  addOns: any[]
  ingredients?: string
  allergens?: string
  sizes?: string
}

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const setTableNumberStore = useCartStore((state) => state.setTableNumber)
  const setTableOccupied = useCartStore((state) => state.setTableOccupied)
  const itemCount = useCartStore((state) => state.getItemCount())
  const storedTableNumber = useCartStore((state) => state.tableNumber)
  const tableOccupied = useCartStore((state) => state.tableOccupied)

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

    // Check for table number from QR code scan (URL parameter)
    const tableFromURL = searchParams.get('table')
    
    if (tableFromURL) {
      const parsedTable = parseInt(tableFromURL, 10)
      if (!isNaN(parsedTable) && parsedTable > 0) {
        setTableNumber(parsedTable)
        setTableNumberStore(parsedTable)
        setTableOccupied(true) // Mark table as occupied
        setShowWelcome(true) // Show welcome screen with auto-detected table
        
        // Mark table as occupied in database
        fetch('/api/table-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'mark-occupied',
            tableNumber: parsedTable,
          }),
        }).catch(err => console.error('Error marking table occupied:', err))
      }
    } else if (storedTableNumber) {
      // Check if user has already started ordering (from cart or previous session)
      setShowWelcome(false)
      setTableNumber(storedTableNumber)
    }
  }, [searchParams, storedTableNumber, setTableNumberStore, setTableOccupied])

  // Redirect to landing page if no table is selected
  useEffect(() => {
    if (tableNumber === null && !storedTableNumber && !loading) {
      router.push('/landing')
    }
  }, [tableNumber, storedTableNumber, loading, router])

  const handleStartOrder = () => {
    setShowWelcome(false)
    setMobileMenuOpen(false)
  }

  const categories = Array.from(
    new Set((menuItems || []).map((item) => item.category))
  )

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-amber-700 mx-auto mb-4 animate-bounce" />
          <p className="text-xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (tableNumber === null && !storedTableNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-amber-700 mx-auto mb-4 animate-bounce" />
          <p className="text-xl text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Professional Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0 bg-white rounded-full p-1">
              <Image
                src="/logo.jpg"
                alt="Flitra Café Logo"
                width={48}
                height={48}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white truncate">Flitra Café</h1>
              <p className="text-xs sm:text-sm text-amber-100">🪑 Table {tableNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Link
              href="/qr-scanner"
              className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg transition-all transform hover:scale-105 items-center gap-2 font-semibold text-sm"
              title="Scan QR Code"
            >
              <QrCode size={18} />
              <span>Scan QR</span>
            </Link>
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex-shrink-0 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-amber-500 bg-gradient-to-r from-amber-500 to-orange-500 p-3 space-y-2 animate-slide-in">
            <Link
              href="/qr-scanner"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 justify-center font-semibold text-sm"
            >
              <QrCode size={18} />
              <span>Scan QR Code</span>
            </Link>
            <Link
              href="/cart"
              className="relative w-full bg-white hover:bg-gray-100 text-amber-600 px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 justify-center font-semibold text-sm shadow-md"
            >
              <ShoppingCart size={18} />
              <span>View Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-amber-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-1 sm:mb-2">
            Filtra Café
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-700 font-medium">
            Sit & Scan - Order Your Perfect Coffee
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📋</span>
              <span>Choose a Category</span>
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-amber-600'
                }`}
              >
                All Items
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-amber-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Grid - Improved responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-8">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>

        {/* Full Menu Link */}
        <div className="text-center mb-8">
          <Link
            href="/full-menu"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            <span>📋 View Full Menu</span>
          </Link>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl">
            <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg sm:text-xl text-gray-600">No items found in this category</p>
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-amber-700 mx-auto mb-4 animate-bounce" />
          <p className="text-xl text-gray-600">Loading menu...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
