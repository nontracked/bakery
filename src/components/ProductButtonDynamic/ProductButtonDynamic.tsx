'use client'
import './ProductButtonDynamic.scss'
import {QuantityItems} from "@/components/QuantityItems";
import {Button} from "@/ui/Button";
import React from "react";
import {Product} from "@/types/product";
import {useProductCart} from "@/hooks/useProductCart";

interface Props {
  product: Product;
}

export const ProductButtonDynamic =
  ({product}: Props) => {
    const {handleDecrease, handleIncrease, handleAdd, currentQuantity} = useProductCart(product)
    const {outOfStock} = product
    if (currentQuantity === undefined) {
      return <div className="product-card__button-skeleton" />
    }
    return (
      <>
        {currentQuantity > 0 ?
          (<QuantityItems onIncrease={handleIncrease} onDecrease={handleDecrease} quantity={currentQuantity} />)
          : (<Button
            onClick={handleAdd}
            className="product-card__button"
            label={outOfStock ? "Out of stock" : "Add to cart"}
            disabled={outOfStock}
          />)}
      </>
    )
  }