import {useMemo} from "react";
import {Product} from "@/db/schema";

export const useCatalogFilter = (products: Product[], activeTab: string) => {
  return useMemo(() => {
    if (activeTab === 'all') {
      return products
    } else if (activeTab === 'popular') {
      return products.filter(({rating}) => rating > 4.7).sort((a, b) => b.rating - a.rating)
    }
    return products.filter(({categoryId}) => categoryId === activeTab)
  }, [products, activeTab])
}