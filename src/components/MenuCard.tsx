'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import ItemModal from './ItemModal'

interface MenuCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  addOns: any[]
}

export default function MenuCard({
  id,
  name,
  description,
  price,
  image,
  category,
  addOns,
}: MenuCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setShowModal(true)
      setIsLoading(false)
    }, 150)
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-amber-600 border-2 border-transparent">
        {/* Image Container - Professional sizing */}
        <div className="relative w-full h-40 sm:h-44 md:h-40 lg:h-44 bg-gray-200 overflow-hidden group cursor-pointer" onClick={handleAddClick}>
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
              quality={75}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <span className="text-3xl">☕</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 right-2 bg-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
            {category}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Name */}
          <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-1 flex-grow">
            {description}
          </p>

          {/* Bottom Row - Price and Button */}
          <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div>
              <span className="text-lg sm:text-xl font-bold text-amber-700">
                ₱{price.toFixed(0)}
              </span>
            </div>

            <button
              onClick={handleAddClick}
              disabled={isLoading}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform active:scale-95 bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
              aria-label="Add to cart"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart size={16} className="sm:block" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      {showModal && (
        <ItemModal
          item={{
            id,
            name,
            description,
            price,
            image,
            category,
            addOns,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
