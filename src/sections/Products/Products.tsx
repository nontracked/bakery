import './Products.scss'
import {Suspense} from "react";
import {TabsSection} from "@/sections/TabsSection";
import {TabsSkeleton} from "@/components/TabsSkeleton";
import {CatalogSection} from "@/sections/CatalogSection";
import {CatalogSkeleton} from "@/components/CatalogSkeleton";

export const Products = async () => {
  return (
    <section className="products container">
      <Suspense fallback={<TabsSkeleton />}>
        <TabsSection />
      </Suspense>
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogSection />
      </Suspense>
    </section>
  )
}
