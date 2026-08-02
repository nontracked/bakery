'use client'
import './CartDrawer.scss'
import {useCartStore} from "@/store/useCartStore";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {clsx} from "clsx";
import React from "react";
import {CartItem} from "@/components/CartItem";
import {formatPrice} from "@/utils/formatPrice";
import {X} from "lucide-react";
import {useScrollLock} from "@/hooks/useScrollLock";
import {EmptyCart} from "@/components/EmptyCart/EmpryCart";
import {ShareCartButton} from "@/components/ShareCartButton";
import Link from "next/link";

export const CartDrawer = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const cartItems = useHydratedStore(useCartStore, (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0))
  const subtotalPrice = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const subtotalPriceFormatted = formatPrice(subtotalPrice || 0)
  const clearCart = useCartStore((state) => state.clearCart)
  useScrollLock(isCartOpen)
  const isCartEmpty = !cart?.length
  return (
    <div className="cart-drawer">
      <div className={clsx("cart-drawer__overlay", isCartOpen && "cart-drawer__overlay--open")} onClick={closeCart} />
      <div className={clsx("cart-drawer__main", isCartOpen && "cart-drawer__main--open")}>
        <div className="cart-drawer__header">
          <h2
            className="cart-drawer__title"
          >Your cart {cart?.length === 0 ? 'is empty' : `has ${cartItems} product(-s)`}</h2>
          <X className="cart-drawer__close" size={44} strokeWidth={1.25} onClick={closeCart} />
        </div>
        {isCartEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <ul className="cart-drawer__list">
              {cart?.map((item) => (
                <li className="cart-drawer__item" key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <div>Subtotal:</div>
                <span></span>
                <div className="cart__drawer__price">${subtotalPriceFormatted}</div>
              </div>
              <div className="cart-drawer__checkout">
                <Link className="cart-drawer__button-checkout" href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
                <ShareCartButton />
                <button
                  className="cart-drawer__button-clear"
                  type="button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}