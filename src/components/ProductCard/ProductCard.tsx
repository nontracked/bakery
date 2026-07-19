import './ProductCard.scss'
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Maximize} from "lucide-react";
import {Rating} from "@/ui/Rating";
import React, {useState} from "react";
import {clsx} from "clsx";
import {ProductButtonDynamic} from "@/components/ProductButtonDynamic";
import {ProductImage} from "@/components/ProductImage";
import {Product} from "@/db/schema";
import {formatPrice} from "@/utils/formatPrice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const {name, imgSrc, price, id, rating} = product
  const [imageLoad, setImageLoad] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const currentQuery = searchParams.toString() // Превращаем текущие параметры URL в строку (получится "category=cookies")
  const productHref = currentQuery ? `/product/${id}?${currentQuery}` : `/product/${id}`
  const productPrice = formatPrice(price)

  return (
    <div className="product-card">
      <Link className="product-card__link" href={productHref} scroll={false}>
        <div className={clsx("product-card__overlay", imageLoad && "visually-hidden")}>
          <Maximize className="product-card__icon" />
        </div>
        <div className="product-card__image-wrapper">
          <ProductImage
            className="product-card__image" imgSrc={imgSrc} name={name} width={300} height={535}
            onImageLoad={() => setImageLoad(false)}
          />
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__info">
          <span className="product-card__title">{name}</span>
          <Rating rate={rating} />
        </div>
        <div className="product-card__action">
          <div className="product-card__price">
            $ {productPrice}
          </div>
          <ProductButtonDynamic product={product} />
        </div>
      </div>
    </div>
  )
}