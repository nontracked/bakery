import {Product, products, sharedCarts} from "@/db/schema";
import {db} from "@/db/index";
import {eq, inArray, lt} from "drizzle-orm";
import {CartItem} from "@/store/useCartStore";

export type SharedCartItem = {
  id: string;
  quantity: number;
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return await db.query.products.findFirst({
    where: eq(products.id, id)
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
    console.error('Error saving the cart', error)
    return null
  }
}

export const getShaderCartById = async (cartId: string) => {
  try {
    const result = await db.select()
      .from(sharedCarts)
      .where(eq(sharedCarts.id, cartId))
    if (result.length > 0) {
      return result[0].items as SharedCartItem[]
    }
    return null
  } catch (error) {
    console.error('There is no shopping cart with that ID in the database')
    return null
  }
}

export const clearOldCart = async () => {
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  try {
    await db.delete(sharedCarts)
      .where(lt(sharedCarts.createdAt, twoWeeksAgo))
  } catch (error) {
    console.error('Error whilst clearing the table', error)
  }
}

export const fetchFullProductsBySharedItems = async (sharedItems: SharedCartItem[]): Promise<CartItem[]> => {
  try {
    const productsIds = sharedItems.map((items) => items.id)
    if (productsIds.length === 0) return []
    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productsIds))
    const fullCartItems = sharedItems.map((item) => {
      const productInfo = dbProducts.find((product) => product.id === item.id)
      if (!productInfo) return null
      return {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        imgSrc: productInfo.imgSrc,
        quantity: item.quantity,
      }
    })
    return fullCartItems.filter((item) => item !== null) as CartItem[]
  } catch (error) {
    console.error('Error adding product data', error)
    return []
  }

};
