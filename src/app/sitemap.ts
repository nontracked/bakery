import {MetadataRoute} from "next";
import {db} from "@/db";
import {products} from "@/db/schema";


export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://m-e-bakery.vercel.app'
  const allProducts = await db.select().from(products)
  const productUrls = allProducts.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productUrls,
  ]
}