import { create } from 'zustand'

export interface CartAddOn {
  id: string
  name: string
  price: number
  quantity: number
}

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  image?: string
  addOns: CartAddOn[]
  size?: string
  sugarLevel?: number
}

export interface CartStore {
  items: CartItem[]
  tableNumber: number | null
  tableOccupied: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  addAddOn: (cartItemId: string, addOn: CartAddOn) => void
  removeAddOn: (cartItemId: string, addOnId: string) => void
  updateAddOnQuantity: (cartItemId: string, addOnId: string, quantity: number) => void
  setTableNumber: (tableNumber: number) => void
  setTableOccupied: (occupied: boolean) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  tableNumber: null,
  tableOccupied: false,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.menuItemId === item.menuItemId)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.menuItemId === item.menuItemId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id && item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id && item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),

  addAddOn: (cartItemId, addOn) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id && item.id === cartItemId
          ? {
              ...item,
              addOns: [...item.addOns, addOn],
            }
          : item
      ),
    })),

  removeAddOn: (cartItemId, addOnId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id && item.id === cartItemId
          ? {
              ...item,
              addOns: item.addOns.filter((ao) => ao.id && ao.id !== addOnId),
            }
          : item
      ),
    })),

  updateAddOnQuantity: (cartItemId, addOnId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id && item.id === cartItemId
          ? {
              ...item,
              addOns: item.addOns.map((ao) =>
                ao.id && ao.id === addOnId ? { ...ao, quantity: Math.max(1, quantity) } : ao
              ),
            }
          : item
      ),
    })),

  setTableNumber: (tableNumber) => set({ tableNumber }),

  setTableOccupied: (occupied) => set({ tableOccupied: occupied }),

  clearCart: () => set({ items: [], tableNumber: null, tableOccupied: false }),

  getTotalPrice: () => {
    const state = get()
    return state.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity
      const addOnsTotal = item.addOns.reduce(
        (sum, addOn) => sum + addOn.price * addOn.quantity,
        0
      )
      return total + itemTotal + addOnsTotal
    }, 0)
  },

  getItemCount: () => {
    const state = get()
    return state.items.reduce((count, item) => count + item.quantity, 0)
  },
}))
