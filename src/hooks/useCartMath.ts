import {CartItem} from "@/store/useCartStore";
import {formatPrice} from "@/utils/formatPrice";
import {useMemo} from "react";

export const useCartMath = (cart: CartItem[] | undefined, discountPercent: number) => {
  return useMemo(() => {
    const safeCart = cart || []
    const cartLength = safeCart.reduce((acc, item) => acc + item.quantity, 0)
    const subTotal = safeCart.reduce((acc, item) => (acc + (item.price * item.quantity)), 0)
    const discount = subTotal * discountPercent / 100
    const taxes = subTotal * 0.05
    const totalPrice = subTotal - discount + taxes
    return {
      cartLength,
      subTotalFormatted: formatPrice(subTotal),
      taxesFormatted: formatPrice(taxes),
      discountFormatted: formatPrice(discount),
      totalFormatted: formatPrice(totalPrice)
    }

  }, [cart, discountPercent])
}