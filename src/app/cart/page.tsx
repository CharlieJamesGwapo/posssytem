'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Trash2, Plus, Minus, Coffee, Droplet, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store'
import { showConfirmAlert, showSuccessAlert } from '@/utils'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeAddOn = useCartStore((state) => state.removeAddOn)
  const updateAddOnQuantity = useCartStore((state) => state.updateAddOnQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const tableNumber = useCartStore((state) => state.tableNumber)

  const total = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image src="/logo.jpg" alt="Filtra Café" width={40} height={40} className="rounded-full object-cover" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Filtra Café</h1>
                <p className="text-xs text-amber-100">Order System</p>
              </div>
            </div>
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-semibold hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Menu
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Coffee className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-lg transition-all transform hover:scale-105 font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/logo.jpg" alt="Filtra Café" width={40} height={40} className="rounded-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Filtra Café</h1>
              <p className="text-xs text-amber-100">Order System</p>
            </div>
          </div>
          <ShoppingCart className="w-6 h-6" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-8 font-semibold hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Menu
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
            <h1 className="text-3xl font-bold">Your Cart</h1>
            <p className="text-amber-100 mt-2 flex items-center gap-2">
              <span>🪑</span> Table {tableNumber}
            </p>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id || `item-${Math.random()}`} className="p-6 hover:bg-amber-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      ₱{item.price.toFixed(2)} each
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      const result = await showConfirmAlert(
                        'Remove Item?',
                        `Are you sure you want to remove ${item.name} from your cart?`,
                        'Remove',
                        'Cancel'
                      )
                      if (result.isConfirmed) {
                        removeItem(item.id)
                        await showSuccessAlert('Removed', `${item.name} removed from cart`)
                      }
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Size and Sugar Level */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  {item.size && (
                    <div className="bg-amber-50 p-2 rounded-lg">
                      <span className="text-gray-600">Size: </span>
                      <span className="font-semibold text-gray-800">{item.size}</span>
                    </div>
                  )}
                  {item.sugarLevel !== undefined && (
                    <div className="bg-amber-50 p-2 rounded-lg flex items-center gap-1">
                      <Droplet size={14} className="text-amber-600" />
                      <span className="text-gray-600">Sugar: </span>
                      <span className="font-semibold text-gray-800">{item.sugarLevel}%</span>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Add-ons */}
                {item.addOns.length > 0 && (
                  <div className="bg-amber-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Add-ons:
                    </h4>
                    <div className="space-y-2">
                      {item.addOns.map((addOn) => (
                        <div
                          key={addOn.id || `addon-${Math.random()}`}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex-1">
                            <span className="text-gray-700">{addOn.name}</span>
                            <span className="text-gray-500 ml-2">
                              ₱{addOn.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateAddOnQuantity(
                                  item.id,
                                  addOn.id,
                                  addOn.quantity - 1
                                )
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">
                              {addOn.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateAddOnQuantity(
                                  item.id,
                                  addOn.id,
                                  addOn.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() =>
                                removeAddOn(item.id, addOn.id)
                              }
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Item Total */}
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">
                    ₱
                    {(
                      item.price * item.quantity +
                      item.addOns.reduce(
                        (sum, ao) => sum + ao.price * ao.quantity,
                        0
                      )
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-t-4 border-amber-200">
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Items:</span>
                <span className="font-semibold text-gray-800">{items.length}</span>
              </div>
              <div className="h-px bg-gray-300"></div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">
                  Total:
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ₱{total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 text-center shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
