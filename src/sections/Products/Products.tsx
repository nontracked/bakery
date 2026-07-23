import './Products.scss'
import {Suspense} from "react";
import {TabsSection} from "@/sections/TabsSection";
import {TabsSkeleton} from "@/components/TabsSkeleton";
import {CatalogSection} from "@/sections/CatalogSection";
import {Oval} from "react-loader-spinner";

export const Products = async () => {
  return (
    <section className="products container">
      <Suspense fallback={<TabsSkeleton />}>
        <TabsSection />
      </Suspense>
      <Suspense fallback={<Oval height={80} width={80} />}>
        <CatalogSection />
      </Suspense>
    </section>
  )
}
