'use server'
import {createSharedCart, SharedCartItem} from "@/db/queries";

export const generateShareCart = async (items: SharedCartItem[]) => {
  const cartId = await createSharedCart(items)
  if (!cartId) {
    throw new Error('Error retrieving the cart ID')
  }
  return cartId
}