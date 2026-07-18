import './CartCount.scss'
import {useCartStore} from "@/store/useCartStore";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import CountUp from "react-countup";
import {useState} from "react";

export const CartCount = () => {
  const [firstAnim, setFirstAnim] = useState(false)
  const cartItems = useHydratedStore(useCartStore, (state) => state.cart)
  if (!cartItems) return null
  const totalItemsCount = cartItems.reduce((accum, cartItem) =>
    accum + cartItem.quantity, 0)
  if (firstAnim) {
    return (
      <span>
      {totalItemsCount}
    </span>
    )
  }
  return (
    <span>
      <CountUp end={totalItemsCount} duration={1} autoAnimateOnce onEnd={() => setFirstAnim(true)} />
    </span>
  )
}