import {Product} from "@/types/product";
import {useSearchParams} from "next/navigation";
import {useMemo} from "react";

export const useCatalogFilter = (products: Product[]) => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("category") || 'all'
  const handleTabClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())// Берем текущие параметры (на случай, если там есть что-то еще, например ?sort=price)
    params.set("category", id)
    window.history.pushState(null, '', `?${params.toString()}`)
  }
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products
    } else if (activeTab === 'popular') {
      return products.filter(({rating}) => rating > 4.7).sort((a, b) => b.rating - a.rating)
    }
    return products.filter(({categories}) => categories === activeTab)
  }, [products, activeTab])
  return {handleTabClick, filteredProducts, activeTab}
}