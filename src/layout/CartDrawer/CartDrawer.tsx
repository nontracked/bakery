'use client'
import './CartDrawer.scss'
import {useCartStore} from "@/store/useCartStore";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {clsx} from "clsx";
import {useEffect} from "react";

export const CartDrawer = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  useEffect(() => {
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollWidth}px`
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }

  }, [isCartOpen]);

  return (
    <div className="cart-drawer">
      <div className={clsx("cart-drawer__overlay", isCartOpen && "cart-drawer__overlay--open")} onClick={closeCart} />
      <div className={clsx("cart-drawer__main", isCartOpen && "cart-drawer__main--open")}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title"></h2>
        </div>
        <div className="cart-drawer__body">
          items...
        </div>
        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>Subtotal:</span>
            <span>$</span>
          </div>
          <div className="cart-drawer__checkout">
            <button type="button">
              Оплата
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}