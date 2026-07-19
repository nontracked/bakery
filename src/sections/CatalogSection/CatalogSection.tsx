import './CatalogSection.scss'
import {CatalogClient} from "@/components/CatalogClient";
import {db} from "@/db";

export const CatalogSection = async () => {
  const productData = await db.query.products.findMany()
  return (
    <CatalogClient products={productData} />
  )
}