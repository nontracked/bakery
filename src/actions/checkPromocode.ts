'use server'
import {db} from "@/db";
import {discount} from "@/db/schema";
import {eq} from "drizzle-orm";

export const checkPromocode = async (code: string) => {
  const normalizeCode = code.trim().toUpperCase()
  try {
    const [foundPromocode] = await db
      .select()
      .from(discount)
      .where(eq(discount.promocode, normalizeCode))
      .limit(1)

    if (!foundPromocode) {
      return {error: 'Invalid or expired code'}
    }
    return {success: 'Промокод успешно применен', percent: foundPromocode.discountPercent}
  } catch (error) {
    console.error('Error promocode checking')
    return {error: 'Error promocode checking'}
  }

}