import './CartItem.scss'
import {CartItem as CartItemType, useCartStore} from "@/store/useCartStore";
import {Trash2} from "lucide-react";
import {QuantityItems} from "@/components/QuantityItems";
import {formatPrice} from "@/utils/formatPrice";

interface CartItemProps {
  item: CartItemType
}

export const CartItem = ({item}: CartItemProps) => {
  const {name, price, imgSrc, quantity, id} = item
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

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
      <img className="cart-item__img" src={imgSrc} alt={name} />
      <div className="cart-item__main">
        <h4 className="cart-item__title">{name}</h4>
        <div className="cart-item__body">
          <QuantityItems onIncrease={onIncrease} onDecrease={onDecrease} quantity={quantity} />
          <div className="cart-item__static">
            <span className="cart-item__price">{productPrice}</span>
            <button type="button" onClick={() => removeFromCart(id)}>
              <Trash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}