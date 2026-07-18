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
  addToCart: (product: Omit<CartItem, 'quantity'>) => void,
  removeFromCart: (productId: string) => void,
  updateQuantity: (productId: string, action: 'increase' | 'decrease') => void,
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
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
    {name: 'cart-storage'}
  )
)
