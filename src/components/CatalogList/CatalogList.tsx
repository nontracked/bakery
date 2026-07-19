import './CatalogList.scss'
import {motion} from "framer-motion";
import {ProductCard} from "@/components/ProductCard";
import {containerVariants, itemVariants} from "@/components/CatalogList/catalog.animations";
import {Product} from "@/db/schema";

interface CatalogListProps {
  filteredProducts: Product[];
  isMobile: boolean;
  activeTab: string;
}

export const CatalogList = ({isMobile, activeTab, filteredProducts}: CatalogListProps) => {
  return (
    <motion.ul
      className="catalog-client__list"
      key={activeTab}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,  // Анимация проиграется 1 раз. Если false - будет прыгать каждый раз при скролле туда-сюда
        amount: isMobile ? 0 : 0.03,
        margin: isMobile ? '100px' : '0px'         // Запустить, когда хотя бы 10% блока покажется на экране
      }}
    >
      {filteredProducts.length === 0 ?
        (<div>Desserts will be available for purchase soon</div>)
        :
        (filteredProducts.map((product) => (
          <motion.li className="catalog-client__item" key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.li>
        )))
      }
    </motion.ul>
  )
}