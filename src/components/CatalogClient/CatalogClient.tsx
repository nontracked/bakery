'use client'
import './CatalogClient.scss'
import {Product} from "@/types/product";
import {Category} from "@/types/category";

import {useCatalogFilter} from "@/hooks/useCatalogFilter";
import {CatalogList} from "@/components/CatalogList";
import {useIsMobile} from "@/hooks/useIsMobile";
import {TabList} from "@/components/TabList";

interface CatalogClientProps {
  products: Product[];
  tabs: Category[];
}

export const CatalogClient = ({products, tabs}: CatalogClientProps) => {
  const {activeTab, handleTabClick, filteredProducts} = useCatalogFilter(products)
  const {isMobile} = useIsMobile()
  return (
    <div className="catalog-client">
      <TabList tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
      <CatalogList isMobile={isMobile} activeTab={activeTab} filteredProducts={filteredProducts} />
    </div>
  )
}