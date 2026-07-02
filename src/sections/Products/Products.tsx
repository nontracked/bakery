import './Products.scss'
import {getTabsCategory} from "@/lib/tabsCategory";
import {getProducts} from "@/lib/products";
import {CatalogClient} from "@/components/CatalogClient";
import {Suspense} from "react";

export const Products = async () => {
  const tabs = await getTabsCategory()
  const products = await getProducts()
  return (
    <section className="products container">
      <Suspense fallback={<div>Catalog loading...</div>}>
        <CatalogClient products={products} tabs={tabs} />
      </Suspense>
    </section>
  )
}
