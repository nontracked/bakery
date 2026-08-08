import './CheckoutCart.scss'
import {CartList} from "@/components/CartList";
import {useCartMath} from "@/hooks/useCartMath";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {useCartStore} from "@/store/useCartStore";
import {CheckoutCartLoader} from "@/components/CheckoutCartLoader";

export const CheckoutCart = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart)
  const discountPercent = useCartStore((state) => state.discountPercent)
  const {
    subTotalFormatted,
    discountFormatted,
    totalFormatted,
    taxesFormatted,
    cartLength
  } = useCartMath(cart, discountPercent)
  return (
    <div className="checkout__cart">
      {!cart ? <CheckoutCartLoader/> : (
        <>
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
                {discountPercent > 0 && (
                  <span>Discount <p>- $ {discountFormatted}</p></span>
                )}
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
        </>
        )}
    </div>
  )
}