import {Product} from "@/types/product";
import {useMemo} from "react";

export const useCatalogFilter = (products: Product[], activeTab: string) => {
  return useMemo(() => {
    if (activeTab === 'all') {
      return products
    } else if (activeTab === 'popular') {
      return products.filter(({rating}) => rating > 4.7).sort((a, b) => b.rating - a.rating)
    }
    return products.filter(({categories}) => categories === activeTab)
  }, [products, activeTab])
}