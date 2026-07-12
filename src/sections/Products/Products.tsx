import './Products.scss'
import {getTabsCategory} from "@/lib/tabsCategory";
import {getProducts} from "@/lib/products";
import {CatalogClient} from "@/components/CatalogClient";
import {Suspense} from "react";
import {TabList} from "@/components/TabList";
import {Oval} from "react-loader-spinner";

export const Products = async () => {
  const tabs = await getTabsCategory()
  const products = await getProducts()
  return (
    <section className="products container">
      <TabList tabs={tabs} />
      <Suspense fallback={<Oval height={80} width={80}/>}>
        <CatalogClient products={products} />
      </Suspense>
    </section>
  )
}
