import './Products.scss'
import {getProducts} from "@/lib/products";
import {CatalogClient} from "@/components/CatalogClient";
import {Suspense} from "react";
import {Oval} from "react-loader-spinner";
import {TabsSection} from "@/sections/TabsSection";
import {TabsSkeleton} from "@/components/TabsSkeleton";

export const Products = async () => {
  const products = await getProducts()
  return (
    <section className="products container">
      <Suspense fallback={<TabsSkeleton/>}>
        <TabsSection />
      </Suspense>
      <Suspense fallback={<Oval height={80} width={80} />}>
        <CatalogClient products={products} />
      </Suspense>
    </section>
  )
}
