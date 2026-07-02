import './ProductCard.scss'
import {Product} from "@/types/product";
import Image from "next/image";
import {Button} from "@/ui/Button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const {name, imgSrc, price} = product
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
  return (
    <div className="product-card">
      <div>
        <Image className="product-card__image" src={imgSrc} alt={name} width={300} height={500} loading="eager" />
      </div>
      <div className="product-card__body">
        <div className="product-card__info">
          <h3 className="product-card__title">{name}</h3>
          <div>rating</div>
        </div>
        <div className="product-card__action">
          <div className="product-card__price">
            $ {formattedPrice}
          </div>
          <Button className="product-card__button" label="Add to cart" />
        </div>
      </div>

    </div>
  )
}