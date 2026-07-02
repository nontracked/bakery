'use client'
import './CatalogClient.scss'
import {Product} from "@/types/product";
import {Category} from "@/types/category";
import {useMemo} from "react";
import {ProductCard} from "@/components/ProductCard";
import {TabButton} from "@/ui/TabButton";
import {useSearchParams} from "next/navigation";

interface CatalogClientProps {
  products: Product[];
  tabs: Category[];
}

export const CatalogClient = ({products, tabs}: CatalogClientProps) => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("category") || 'all'
  const handleTabClick = (id: string) => {
    // Берем текущие параметры (на случай, если там есть что-то еще, например ?sort=price)
    const params = new URLSearchParams(searchParams.toString())
    params.set("category", id)
    window.history.pushState(null,'',`?${params.toString()}`)
  }
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products
    } else if (activeTab === 'popular') {
      return products.filter(({rating}) => rating > 4.7)
    }
    return products.filter(({categories}) => categories === activeTab)
  }, [products, activeTab])
  return (
    <div className="catalog-client">
      <ul className="catalog-client__tabs-list">
        {tabs.map(({id, label}) => (
          <li className="catalog-client__tabs-item" key={id}>
            <TabButton label={label} activeTab={activeTab} id={id} onClick={()=> handleTabClick(id)} />
          </li>
        ))}
      </ul>
      <ul className="catalog-client__list">
        {filteredProducts.map((product) => (
          <li className="catalog-client__item" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}