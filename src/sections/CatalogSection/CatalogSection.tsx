import './CatalogSection.scss'
import {CatalogClient} from "@/components/CatalogClient";
import {getProducts} from "@/db/queries";

export const CatalogSection = async () => {
  const productData = await getProducts()
  return (
    <CatalogClient products={productData} />
  )
}