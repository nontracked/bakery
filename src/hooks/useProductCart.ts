import {useHydratedStore} from "@/hooks/useHydratedStore";
import {useCartStore} from "@/store/useCartStore";
import {useCallback} from "react";
import {Product} from "@/db/schema";

export const useProductCart = (product: Product) => {
  const {name, imgSrc, price, id} = product

  const currentQuantity = useHydratedStore(useCartStore, (state) => {
    const item = state.cart.find((cartItem) => cartItem.id === id)
    return item ? item.quantity : 0
  })
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const handleAdd = useCallback(() => {
    addToCart({id, name, imgSrc, price})
  }, [addToCart, id, name, imgSrc, price])

  const handleIncrease = useCallback(() => {
    updateQuantity(id, 'increase')
  }, [updateQuantity, id])

  const handleDecrease = useCallback(() => {
    if (currentQuantity === 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, 'decrease')
    }
  }, [updateQuantity, removeFromCart, id, currentQuantity])
  return {handleAdd, handleDecrease, handleIncrease, currentQuantity}
}