import './ProductCard.scss'
import {Product} from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Maximize} from "lucide-react";
import {useFormattedPrice} from "@/hooks/useFormattedPrice";
import {Rating} from "@/ui/Rating";
import {Button} from "@/ui/Button";
import React, {useState} from "react";
import {Oval} from "react-loader-spinner";
import {clsx} from "clsx";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  const {name, imgSrc, price, id, rating, outOfStock} = product
  const [imageLoad, setImageLoad] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const currentQuery = searchParams.toString() // Превращаем текущие параметры URL в строку (получится "category=cookies")
  const productHref = currentQuery ? `/product/${id}?${currentQuery}` : `/product/${id}`
  const productPrice = useFormattedPrice(price)
  return (
    <div className="product-card">
      <Link className="product-card__link" href={productHref} scroll={false}>
        <div className={clsx("product-card__overlay", imageLoad && "visually-hidden")}>
          <Maximize className="product-card__icon" />
        </div>
        <div className="product-card__image-wrapper">
          {imageLoad && <Oval
            wrapperClass="product-card__oval"
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />}
          <Image
            className={clsx("product-card__image")}
            onLoad={() => setImageLoad(false)}
            src={imgSrc} alt={name} width={300}
            height={535}
            loading="eager"
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
          <Button
            className="product-card__button" label={outOfStock ? "Out of stock" : "Add to cart"} disabled={outOfStock}
          />
        </div>
      </div>
    </div>
  )
}