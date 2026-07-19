import {Product, products} from "@/db/schema";
import {db} from "@/db/index";
import {eq} from "drizzle-orm";

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