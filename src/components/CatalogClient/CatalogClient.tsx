'use client'
import './CatalogClient.scss'
import {Product} from "@/types/product";
import {useCatalogFilter} from "@/hooks/useCatalogFilter";
import {CatalogList} from "@/components/CatalogList";
import {useIsMobile} from "@/hooks/useIsMobile";
import {useCatalogURL} from "@/hooks/useCatalogUrl";

interface CatalogClientProps {
  products: Product[];
}

export const CatalogClient = ({products}: CatalogClientProps) => {
  const {activeTab} = useCatalogURL()
  const filteredProducts = useCatalogFilter(products, activeTab)
  const {isMobile} = useIsMobile()
  return (
    <div className="catalog-client">
      <CatalogList isMobile={isMobile} activeTab={activeTab} filteredProducts={filteredProducts} />
    </div>
  )
}