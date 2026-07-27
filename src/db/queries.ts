import {Product, products, sharedCarts} from "@/db/schema";
import {db} from "@/db/index";
import {eq} from "drizzle-orm";

export type SharedCartItem = {
  id: string;
  quantity: number;
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return await db.query.products.findFirst({
    where: eq(products.id, id) //  вернет первый, где продукт id совпадает с id из params
  })
}

export const getProducts = async () => {
  return db.query.products.findMany()
}

export const getTabs = async () => {
  return await db.query.categories.findMany()
}

export const createSharedCart = async (items: SharedCartItem[]) => {
  try {
    const result = await db.insert(sharedCarts)
      .values({items})
      .returning({id: sharedCarts.id})
    return result[0].id
  } catch (error) {
    console.error('Error save cart', error)
    return null
  }
}

export const getSharedCartById = async (cartId: string) => {
  try {
    const result = await db.select()
      .from(sharedCarts)
      .where(eq(sharedCarts.id, cartId))
    if (result.length > 0) { // если нашли такой
      return result[0].items as SharedCartItem[] // забираем массив товаров у 1 элемента массива [ { id: 'abc-123', items: [...] } ], в формате описаном выше
    }
    return null
  } catch (error) {
    console.error('Error get save cart', error)
    return null
  }
}