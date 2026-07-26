import './CatalogSection.scss'
import {CatalogClient} from "@/components/CatalogClient";
import {getProducts} from "@/db/queries";
import {CatalogError} from "@/components/CatalogError";

export const CatalogSection = async () => {
  try {
    const productData = await getProducts()
    return <CatalogClient products={productData} />
  } catch (error) {
    console.error('Error load data', error)
    return <CatalogError />
  }
}