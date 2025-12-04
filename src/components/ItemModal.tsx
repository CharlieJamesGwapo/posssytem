'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, AlertCircle, Droplet, Zap } from 'lucide-react'
import { useCartStore } from '@/store'
import { showSuccessAlert } from '@/utils'

interface ItemModalProps {
  item: {
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
  onClose: () => void
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number }>({ name: 'Medium', price: 145 })
  const [sugarLevel, setSugarLevel] = useState<number>(100)
  const [selectedAddOns, setSelectedAddOns] = useState<
    { id: string; name: string; price: number; quantity: number }[]
  >([])
  const addItem = useCartStore((state) => state.addItem)

  // Parse JSON fields
  const ingredients = item.ingredients ? JSON.parse(item.ingredients) : []
  const allergens = item.allergens ? JSON.parse(item.allergens) : []
  const sizes = item.sizes
    ? JSON.parse(item.sizes)
    : [
        { name: 'Small', price: 130 },
        { name: 'Medium', price: 145 },
        { name: 'Large', price: 160 },
      ]

  const handleAddAddOn = (addOn: any) => {
    const existing = selectedAddOns.find((ao) => ao.id === addOn.id)
    if (existing) {
      setSelectedAddOns(
        selectedAddOns.map((ao) =>
          ao.id === addOn.id ? { ...ao, quantity: ao.quantity + 1 } : ao
        )
      )
    } else {
      setSelectedAddOns([
        ...selectedAddOns,
        { id: addOn.id, name: addOn.name, price: addOn.price, quantity: 1 },
      ])
    }
  }

  const handleRemoveAddOn = (addOnId: string) => {
    setSelectedAddOns(selectedAddOns.filter((ao) => ao.id !== addOnId))
  }

  const handleDecreaseAddOn = (addOnId: string) => {
    setSelectedAddOns(
      selectedAddOns.map((ao) =>
        ao.id === addOnId && ao.quantity > 1
          ? { ...ao, quantity: ao.quantity - 1 }
          : ao
      ).filter(ao => ao.quantity > 0)
    )
  }

  // Calculate price
  const sizePrice = selectedSize.price
  const addOnsPrice = selectedAddOns.reduce((sum, ao) => sum + ao.price * ao.quantity, 0)
  const itemTotal = (sizePrice + addOnsPrice) * quantity

  const handleAddToCart = async () => {
    addItem({
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: sizePrice,
      quantity,
      image: item.image,
      addOns: selectedAddOns,
      size: selectedSize.name,
      sugarLevel: sugarLevel,
    })
    await showSuccessAlert(
      'Added to Cart! ✓',
      `${quantity}x ${item.name} (${selectedSize.name}) added successfully`
    )
    onClose()
  }

  const sugarLabels = {
    0: 'No Sugar',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-2 sm:px-6 sm:py-4 flex items-start justify-between flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-bold line-clamp-2">{item.name}</h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-0.5">{item.category}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-3 py-2.5 sm:px-6 sm:py-4 space-y-2.5 sm:space-y-4">
          {/* Product Image */}
          <div className="relative w-full h-32 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                quality={75}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                <Zap size={36} />
              </div>
            )}
          </div>

          {/* Description - More compact */}
          <p className="text-xs sm:text-base text-gray-700 line-clamp-2">{item.description}</p>

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-2 sm:p-4">
              <h4 className="font-semibold text-gray-800 text-xs sm:text-base mb-1.5">🥘 Ingredients:</h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {ingredients.map((ingredient: string, idx: number) => (
                  <span key={idx} className="bg-amber-100 text-amber-800 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens */}
          {allergens.length > 0 && allergens[0] !== 'None' && (
            <div className="bg-red-50 rounded-lg p-2 sm:p-4 border border-red-200">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
                <div>
                  <h4 className="font-semibold text-red-900 text-xs sm:text-base">Allergens:</h4>
                  <p className="text-xs sm:text-sm text-red-800 mt-0.5">
                    {allergens.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div>
            <h3 className="font-bold text-gray-800 text-xs sm:text-base mb-2">📏 Size</h3>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {sizes.map((size: any) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size)}
                  className={`py-1.5 sm:py-3 px-1.5 sm:px-3 rounded-lg font-semibold text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedSize.name === size.name
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-xs sm:text-base">{size.name}</div>
                  <div className="text-xs mt-0.5">₱{size.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sugar Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800 text-xs sm:text-base flex items-center gap-1.5">
                <Droplet size={16} className="text-amber-600 sm:w-5 sm:h-5" />
                Sugar Level
              </h3>
              <span className="text-amber-600 font-bold text-xs sm:text-base">
                {sugarLabels[sugarLevel as keyof typeof sugarLabels]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={sugarLevel}
              onChange={(e) => setSugarLevel(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-bold text-gray-800 text-xs sm:text-base mb-2">🔢 Quantity</h3>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1.5 w-fit">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Minus size={16} className="text-gray-700 sm:w-5 sm:h-5" />
              </button>
              <span className="w-6 text-center font-bold text-gray-800 text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Plus size={16} className="text-gray-700 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Add-ons */}
          {item.addOns.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 text-xs sm:text-base mb-2">➕ Add-ons</h3>
              <div className="space-y-1.5">
                {item.addOns.map((addOn) => {
                  const selected = selectedAddOns.find((ao) => ao.id === addOn.id)
                  return (
                    <div
                      key={addOn.id}
                      className={`flex items-center justify-between p-1.5 sm:p-3 rounded-lg border-2 transition-all ${
                        selected
                          ? 'bg-amber-50 border-amber-600'
                          : 'bg-gray-50 border-gray-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{addOn.name}</p>
                        <p className="text-amber-600 font-bold text-xs">+₱{addOn.price}</p>
                      </div>
                      {selected ? (
                        <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0 ml-2">
                          <button
                            onClick={() => handleDecreaseAddOn(addOn.id)}
                            className="p-1 hover:bg-amber-200 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center font-bold text-xs">
                            {selected.quantity}
                          </span>
                          <button
                            onClick={() => handleAddAddOn(addOn)}
                            className="p-1 hover:bg-amber-200 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => handleRemoveAddOn(addOn.id)}
                            className="p-1 hover:bg-red-200 rounded text-red-600 ml-0.5 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddAddOn(addOn)}
                          className="ml-2 bg-amber-100 hover:bg-amber-200 text-amber-700 p-1 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom - Price and Add to Cart */}
        <div className="border-t border-gray-200 bg-white p-2 sm:p-4 space-y-2 sm:space-y-3 flex-shrink-0">
          {/* Selected Add-ons Summary */}
          {selectedAddOns.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-1.5 sm:p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Selected Add-ons:</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {selectedAddOns.map((addOn) => (
                  <span key={addOn.id} className="bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded text-xs">
                    {addOn.name} x{addOn.quantity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price Breakdown - Compact */}
          <div className="space-y-0.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Size ({selectedSize.name}):</span>
              <span className="font-semibold">₱{selectedSize.price}</span>
            </div>
            {addOnsPrice > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Add-ons:</span>
                <span className="font-semibold">₱{addOnsPrice}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Unit:</span>
              <span className="font-semibold">₱{(sizePrice + addOnsPrice).toFixed(0)}</span>
            </div>
            <div className="h-px bg-gray-200 my-1"></div>
            <div className="flex justify-between text-sm sm:text-base font-bold">
              <span>Total ({quantity}x):</span>
              <span className="text-amber-600">₱{itemTotal.toFixed(0)}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-2.5 sm:py-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xs sm:text-base"
          >
            Add to Cart - ₱{itemTotal.toFixed(0)}
          </button>
        </div>
      </div>
    </div>
  )
}
