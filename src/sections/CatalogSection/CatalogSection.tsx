import './CatalogSection.scss'
import {CatalogClient} from "@/components/CatalogClient";
import {getProducts} from "@/lib/products";

export const CatalogSection = async () => {
  const products = await getProducts()
  return (
    <CatalogClient products={products} />
  )
}