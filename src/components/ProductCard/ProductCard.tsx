import './ProductCard.scss'
import {Product} from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Maximize} from "lucide-react";
import {ProductButton} from "@/components/ProductButton";
import {useFormattedPrice} from "@/hooks/useFormattedPrice";
import {Rating} from "@/ui/Rating";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const {name, imgSrc, price, id, rating} = product
  const searchParams = useSearchParams()
  const currentQuery = searchParams.toString() // Превращаем текущие параметры URL в строку (получится "category=cookies")
  const productHref = currentQuery ? `/product/${id}?${currentQuery}` : `/product/${id}`
  const productPrice = useFormattedPrice(price)
  return (
    <div className="product-card">
      <Link className="product-card__link" href={productHref} scroll={false}>
        <div className="product-card__overlay">
          <Maximize className="product-card__icon" />
        </div>
        <Image className="product-card__image" src={imgSrc} alt={name} width={300} height={500} loading="eager" />
      </Link>
      <div className="product-card__body">
        <div className="product-card__info">
          <span className="product-card__title">{name}</span>
          <Rating rate={rating}  />
        </div>
        <div className="product-card__action">
          <div className="product-card__price">
            $ {productPrice}
          </div>
          <ProductButton />
        </div>
      </div>
    </div>
  )
}