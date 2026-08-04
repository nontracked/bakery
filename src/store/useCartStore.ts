import {create} from "zustand/react";
import {persist} from "zustand/middleware";

export interface CartItem {
  id: string,
  name: string,
  price: number,
  imgSrc: string,
  quantity: number,
}

interface CartState {
  cart: CartItem[],
  isCartOpen: boolean,
  discountPercent: number, // визуальное отображение для фронтенда
  appliedPromocode: string | null,// текст промокода и логика для бекенда
  setAppliedPromocode: (percent: number, code: string) => void,
  removeAppliedPromocode: () => void,
  openCart: () => void,
  closeCart: () => void,
  addToCart: (product: Omit<CartItem, 'quantity'>) => void,
  removeFromCart: (productId: string) => void,
  updateQuantity: (productId: string, action: 'increase' | 'decrease') => void,
  clearCart: () => void,
  setCart: (items: CartItem[]) => void,
  mergeCart: (items: CartItem[]) => void,
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      discountPercent: 0,
      appliedPromocode: null,
      setAppliedPromocode: (percent, code) => set({ // для обновления
        discountPercent: percent,
        appliedPromocode: code,
      }),
      removeAppliedPromocode: () => set({
        discountPercent: 0,
        appliedPromocode: null,
      }),
      isCartOpen: false,
      openCart: () => set({isCartOpen: true}),
      closeCart: () => set({isCartOpen: false}),
      setCart: (items) => set({cart: items}),
      mergeCart: (sharedItems) => set((state) => {
        const newCart = [...state.cart]
        sharedItems.map((sharedItem) => {
          const existingItem = newCart.find((cartItem) => cartItem.id === sharedItem.id)
          if (existingItem) {
            const indexToUpdate = newCart.indexOf(existingItem)
            newCart[indexToUpdate] = {
              ...existingItem,
              quantity: existingItem.quantity + sharedItem.quantity
            }
          } else {
            newCart.push(sharedItem)
          }
        })
        return {cart: newCart}
      }),

      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id)
        if (existingItem) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
            )
          }
        }
        return {
          cart: [...state.cart, {...product, quantity: 1}]
        }
      }),
      removeFromCart: (productId) => set((state) => {
        return {
          cart: state.cart.filter((cartItem) => cartItem.id !== productId)
        }
      }),
      updateQuantity: (productId, action) => set((state) => {
        return {
          cart: state.cart.map((cartItem) => {
            if (cartItem.id === productId) {
              const newQuantity = action === 'increase' ? cartItem.quantity + 1 : cartItem.quantity - 1
              return {...cartItem, quantity: Math.max(newQuantity, 1)}
            }
            return cartItem
          })
        }
      }),
      clearCart: () => set({cart: []})
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({cart: state.cart}),
    },
  )
)
