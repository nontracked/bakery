'use client'
import './CatalogClient.scss'
import {Product} from "@/types/product";
import {Category} from "@/types/category";
import {useEffect, useMemo, useState} from "react";
import {ProductCard} from "@/components/ProductCard";
import {TabButton} from "@/ui/TabButton";
import {useSearchParams} from "next/navigation";
import {motion, Variants} from 'framer-motion';

interface CatalogClientProps {
  products: Product[];
  tabs: Category[];
}

const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      // Это та самая задержка: каждая следующая карточка появляется на 0.05с позже
      staggerChildren: 0.05,
    },
  },
};
const itemVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  show: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 300, damping: 24}
  },
}

export const CatalogClient = ({products, tabs}: CatalogClientProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("category") || 'all'
  const handleTabClick = (id: string) => {
    // Берем текущие параметры (на случай, если там есть что-то еще, например ?sort=price)
    const params = new URLSearchParams(searchParams.toString())
    params.set("category", id)
    window.history.pushState(null, '', `?${params.toString()}`)
  }
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return products
    } else if (activeTab === 'popular') {
      return products.filter(({rating}) => rating > 4.7)
    }
    return products.filter(({categories}) => categories === activeTab)
  }, [products, activeTab])
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 765)
    }
    checkIsMobile()
    console.log(isMobile)
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [isMobile]);
  return (
    <div className="catalog-client">
      <ul
        className="catalog-client__tabs-list"
      >
        {tabs.map(({id, label}) => (
          <li className="catalog-client__tabs-item" key={id}>
            <TabButton label={label} activeTab={activeTab} id={id} onClick={() => handleTabClick(id)} />
          </li>
        ))}
      </ul>
      <motion.ul
        className="catalog-client__list"
        key={activeTab}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,  // Анимация проиграется 1 раз. Если false - будет прыгать каждый раз при скролле туда-сюда
          amount: isMobile ? 0 : 0.1,
          margin: isMobile ? '100px' : '0px'
          // Запустить, когда хотя бы 10% блока покажется на экране
        }}
      >
        {filteredProducts.map((product) => (
          <motion.li className="catalog-client__item" key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}