'use server'

import {Payload} from "@/components/Checkout/Checkout";
import {db} from "@/db";
import {discount, orders, ordersItems, products} from "@/db/schema";
import {eq, inArray} from "drizzle-orm";
import {TAXES_VALUE} from "@/lib/constants";

type CartProducts = {
  orderId: string;
  productId: string;
  quantity: number;
  price: number
}

export const createOrder = async (payload: Payload) => {
  if (!payload.items || payload.items.length === 0) {
    return {success: false, message: 'Empty cart'}
  }
  try {
    const productIds = payload.items.map((item) => item.productId)
    const dbProducts = await db.select()
      .from(products)
      .where(inArray(products.id, productIds))

    const cartPrice = payload.items.reduce((accum, item) => {
      const dbProduct = dbProducts.find((productItem) => productItem.id === item.productId)
      if (!dbProduct) return accum
      const currentItemSum = dbProduct.price * item.quantity
      return accum + currentItemSum
    }, 0)
    let currentDiscountPercent = 0
    const promocodeFormatted = payload.promocode?.trim().toUpperCase()
    if (promocodeFormatted) {
      const [dbPromocode] = await db.select()
        .from(discount)
        .where(eq(discount.promocode, promocodeFormatted))
      if (dbPromocode) {
        currentDiscountPercent = dbPromocode.discountPercent
      }
    }
    const discountSum = cartPrice * (currentDiscountPercent / 100)
    const taxesSum = cartPrice * TAXES_VALUE
    const totalPrice = Math.round(cartPrice + taxesSum - discountSum)
    const [newOrder] = await db
      .insert(orders)
      .values({
        customerName: payload.customerName,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        appliedPromocode: promocodeFormatted,
        discountPercent: currentDiscountPercent,
        totalPrice: totalPrice,
        comment: payload.comment
      })
      .returning()

    const cartProducts = payload.items.reduce((accum, item) => {
      const dbProduct = dbProducts.find((product) => product.id === item.productId)
      if (!dbProduct) return accum
      accum.push({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: dbProduct.price,
      })
      return accum
    }, [] as CartProducts[])
    await db.insert(ordersItems).values(cartProducts)
    return {success: true, orderId: newOrder.id}

  } catch (e) {
    console.error('Order creating error', e)
    return {success: false, message: 'Something went wrong while placing your order'}
  }
}
