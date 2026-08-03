import './CheckoutCart.scss'
import {formatPrice} from "@/utils/formatPrice";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {useCartStore} from "@/store/useCartStore";
import {CartList} from "@/components/CartList";

export const CheckoutCart = () => {
  const cart = useHydratedStore(useCartStore, ((state) => state.cart))
  if (!cart) return null
  const cartLength = cart.reduce((acc, item) => acc + item.quantity, 0)
  const subTotal = cart.reduce((acc, item) => (acc + (item.price * item.quantity)), 0)
  const subTotalFormatted = formatPrice(subTotal)
  const discountPercent = 20
  const discount = subTotal * discountPercent / 100
  const discountFormatted = formatPrice(discount)
  const taxes = (subTotal - discount) * 0.05
  const taxesFormatted = formatPrice(taxes)
  const totalPrice = subTotal - discount + taxes
  const totalFormatted = formatPrice(totalPrice)
  return (
    <div className="checkout__cart">
      <div className="checkout__cart-inner">
        <h2 className="checkout__cart-title">
          Your cart {cartLength > 0 ? `has ${cartLength} item(-s)` : 'is empty'}
        </h2>
        <div className="checkout__cart-body">
          <CartList cart={cart} classNameList="checkout__cart-list" classNameItem="checkout__cart-item" />
          <div className="checkout__cart-info">
            <span>Subtotal <p>$ {subTotalFormatted}</p></span>
            <span>Service Fee <p>$ {taxesFormatted}</p></span>
            <span>Shipping <p>Free</p></span>
            <span>Discount <p>- $ {discountFormatted}</p></span>
            <div className="checkout__cart-total">
              <span>Total <p>$ {totalFormatted}</p></span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="checkout__cart-button-payment" disabled={!cart || cart.length === 0} type="submit"
        form="checkout-form"
      >
        Continue to Payment
      </button>
    </div>
  )
}