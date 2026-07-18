import './CatalogSection.scss'
import {CatalogClient} from "@/components/CatalogClient";
import {getProducts} from "@/lib/products";
import {db} from "@/db";

export const CatalogSection = async () => {
  const products = await getProducts()
  const productsData = await db.query.products.findMany({
    with: {
      category: true
    }
  })
  console.log(productsData)
  return (
    <CatalogClient products={products} />
  )
}