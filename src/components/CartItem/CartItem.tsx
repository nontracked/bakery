import './CartItem.scss'
import {CartItem as CartItemType, useCartStore} from "@/store/useCartStore";
import {Trash2} from "lucide-react";
import {QuantityItems} from "@/components/QuantityItems";
import {formatPrice} from "@/utils/formatPrice";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React from "react";
import {ProductImage} from "@/components/ProductImage";

interface CartItemProps {
  item: CartItemType
}

export const CartItem = ({item}: CartItemProps) => {
  const {name, price, imgSrc, quantity, id} = item
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const searchParams = useSearchParams()
  const currentQuery = searchParams.toString()
  const productHref = currentQuery ? `/product/${id}?${currentQuery}` : `/product/${id}`
  const onIncrease = () => {
    updateQuantity(id, 'increase')
  }

  const onDecrease = () => {
    if (quantity === 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, 'decrease')
    }
  }

  const productPrice = formatPrice(price)

  return (
    <div className="cart-item">
      <Link className="cart-item__link" href={productHref} scroll={false} prefetch={false}>
        <ProductImage className="cart-item__img" imgSrc={imgSrc} name={name} width={120} height={120} />
      </Link>
      <div className="cart-item__main">
        <h4 className="cart-item__title">{name}</h4>
        <div className="cart-item__body">
          <QuantityItems onIncrease={onIncrease} onDecrease={onDecrease} quantity={quantity} />
          <div className="cart-item__static">
            <span className="cart-item__price">$ {productPrice}</span>
            <button type="button" onClick={() => removeFromCart(id)}>
              <Trash2 className="cart-item__delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}