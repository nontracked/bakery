import './CartCount.scss'
import {useCartStore} from "@/store/useCartStore";
import {useHydratedStore} from "@/hooks/useHydratedStore";

export const CartCount = () => {
  // @ts-ignore
  const cartItems = useHydratedStore(useCartStore, (state) => state.cart)
  if (!cartItems) return null
  const totalItemsCount = cartItems.reduce((accum: number, cartItem: {
    quantity: number
  }) => accum + cartItem.quantity, 0)
  return (
    <span>{totalItemsCount}</span>
  )
}