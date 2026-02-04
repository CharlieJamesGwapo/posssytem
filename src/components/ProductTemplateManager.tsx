'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Edit2, Trash2, Save, X, Star, Package, DollarSign, FileText, Upload } from 'lucide-react'

interface ProductTemplate {
  id?: string
  name: string
  description: string
  price: number
  category: string
  ingredients: string[]
  sizes: { name: string; price: number }[]
  image?: string
  backgroundImage?: string
  isBestSeller: boolean
  isAvailable: boolean
}

const defaultCategories = [
  'Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Juices', 'Desserts', 'Others'
]

const defaultSizes = [
  { name: 'Small', price: 0 },
  { name: 'Medium', price: 20 },
  { name: 'Large', price: 40 }
]

export default function ProductTemplateManager() {
  const [products, setProducts] = useState<ProductTemplate[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductTemplate | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data.map((item: any) => ({
        ...item,
        ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
        sizes: item.sizes ? JSON.parse(item.sizes) : defaultSizes
      })) : [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewProduct = (): ProductTemplate => ({
    name: '',
    description: '',
    price: 100,
    category: defaultCategories[0],
    ingredients: [],
    sizes: defaultSizes,
    isBestSeller: false,
    isAvailable: true
  })

  const handleCreateNew = () => {
    setEditingProduct(createNewProduct())
    setIsCreating(true)
  }

  const handleEdit = (product: ProductTemplate) => {
    setEditingProduct({ ...product })
    setIsCreating(false)
  }

  const handleSave = async () => {
    if (!editingProduct) return

    setSaving(true)
    try {
      const payload = {
        ...editingProduct,
        ingredients: JSON.stringify(editingProduct.ingredients),
        sizes: JSON.stringify(editingProduct.sizes)
      }

      const url = isCreating ? '/api/menu' : `/api/menu/${editingProduct.id}`
      const method = isCreating ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        await fetchProducts()
        setEditingProduct(null)
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setIsCreating(false)
  }

  const updateEditingProduct = (field: keyof ProductTemplate, value: any) => {
    if (!editingProduct) return
    setEditingProduct({ ...editingProduct, [field]: value })
  }

  const addIngredient = () => {
    if (!editingProduct) return
    const ingredient = prompt('Enter ingredient name:')
    if (ingredient && ingredient.trim()) {
      updateEditingProduct('ingredients', [...editingProduct.ingredients, ingredient.trim()])
    }
  }

  const removeIngredient = (index: number) => {
    if (!editingProduct) return
    updateEditingProduct('ingredients', editingProduct.ingredients.filter((_, i) => i !== index))
  }

  const updateSize = (index: number, field: 'name' | 'price', value: any) => {
    if (!editingProduct) return
    const newSizes = [...editingProduct.sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    updateEditingProduct('sizes', newSizes)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Template Manager</h1>
          <p className="text-gray-600">Manage your menu items, pricing, and availability</p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {products.length} products total
            </span>
          </div>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        {/* Products Grid */}
        {!editingProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.isBestSeller && (
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star size={12} className="fill-current" />
                        Best Seller
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isAvailable ? 'Available' : 'Out of Stock'}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">₱{product.price}</span>
                  {product.image && (
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Form */}
        {editingProduct && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isCreating ? 'Create New Product' : 'Edit Product'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => updateEditingProduct('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => updateEditingProduct('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => updateEditingProduct('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {defaultCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₱)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => updateEditingProduct('price', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL</label>
                  <input
                    type="url"
                    value={editingProduct.image || ''}
                    onChange={(e) => updateEditingProduct('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                  <input
                    type="url"
                    value={editingProduct.backgroundImage || ''}
                    onChange={(e) => updateEditingProduct('backgroundImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/bg.jpg"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProduct.isBestSeller}
                      onChange={(e) => updateEditingProduct('isBestSeller', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProduct.isAvailable}
                      onChange={(e) => updateEditingProduct('isAvailable', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Available</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus size={16} />
                  Add Ingredient
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editingProduct.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Sizes & Pricing</label>
              <div className="space-y-2">
                {editingProduct.sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={size.name}
                      onChange={(e) => updateSize(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Size name"
                    />
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">₱</span>
                      <input
                        type="number"
                        value={size.price}
                        onChange={(e) => updateSize(index, 'price', parseFloat(e.target.value) || 0)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isCreating ? 'Create Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
