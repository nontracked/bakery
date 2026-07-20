import './ProductPage.scss'
import Image from "next/image";
import {Rating} from "@/ui/Rating";
import React from "react";
import {BackButton} from "@/ui/BackButton";
import {ProductButtonDynamic} from "@/components/ProductButtonDynamic";
import {Product} from "@/db/schema";
import {formatPrice} from "@/utils/formatPrice";
import {formatIngredients} from "@/utils/formatIngredients";

interface Props {
  product: Product,
}

export const ProductPage = ({product}: Props) => {
  const {imgSrc, name, rating, desc, weight, ingredients, price} = product
  const formattedIng = formatIngredients(ingredients)
  const formattedPrice = formatPrice(price)
  return (
    <div className="product-page">
      <div className="product-page__body container">
        <Image className="product-page__image" src={imgSrc} alt="name" width={500} height={690} />
        <div className="product-page__content">
          <header className="product-page__header">
            <h4 className="product-page__title">{name}</h4>
            <Rating className="product-page__rating" rate={rating} />
            <div className="product-page__desc">
              <p>{desc}</p>
            </div>
            <ul className="product-page__list">
              {formattedIng.map((item, index) => (
                <li className="product-page__item" key={index}>— {item}</li>
              ))}
            </ul>
            <div className="product-page__product-weight">Weight: {weight} g</div>
          </header>
          <div className="product-page__price">
            <p>$ {formattedPrice}</p>
          </div>
          <div className="product-page__action">
            <ProductButtonDynamic className="product-card__button--route" product={product} />
          </div>
          <div className="product-page__wrap">
            <BackButton className="product-page__button--back" />
          </div>
        </div>
      </div>
    </div>
  )
}