'use client'
import './CartHydrator.scss'
import {CartItem, useCartStore} from "@/store/useCartStore";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";
import {useScrollLock} from "@/hooks/useScrollLock";
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {CartItem as CartItemModal} from "@/components/CartItem";

interface Props {
  fullItems: CartItem[]
}

export const CartHydrator = ({fullItems}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cart = useHydratedStore(useCartStore, ((state) => state.cart))
  const setCart = useCartStore((state) => state.setCart)
  const mergeCart = useCartStore((state) => state.mergeCart)
  const clearUrl = () => {
    const newUrl = window.location.pathname
    window.history.replaceState({}, '', newUrl)
  }
  useEffect(() => {
    if (!fullItems || fullItems.length === 0) return
    const currentCart = useCartStore.getState().cart
    if (currentCart.length === 0) {
      setCart(fullItems)
      clearUrl()
      /*      setTimeout(() => {
              toast.success('The items have been added to the cart!',{duration:1000})
            }, 100)*/
    } else {
      setIsModalOpen(true)
    }
  }, [fullItems]);
  useScrollLock(isModalOpen)

  const handleMerge = () => {
    mergeCart(fullItems)
    setIsModalOpen(false)
    clearUrl()
    toast.success('The items have been added to the cart!')
  }

  const handleReplace = () => {
    setCart(fullItems)
    setIsModalOpen(false)
    clearUrl()
    toast.success('The items in your cart have been replaced!')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    clearUrl()
    toast.warning('The cart copying has been canceled!')
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCancel()
    }
  }

  if (!isModalOpen) return null

  return (
    <div
      className="cart-hydrator__overlay" onClick={handleOverlayClick}
    >
      <div className="cart-hydrator__content">
        <div className="cart-hydrator__info">
          <h3>You already have items in your cart!</h3>
          <p>You clicked on a link to a shared shopping cart. What should you do with the items?</p>
        </div>
        <div className="cart-hydrator__cart">
          <span className="cart-hydrator__cart-info">Current Cart</span>
          <ul className="cart-hydrator__list">
            {cart?.map((item) => (
              <li className="cart-hydrator__item" key={item.id}>
                <CartItemModal item={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-hydrator__actions">
          <button type="button" className="cart-hydrator__button cart-hydrator__button--cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="cart-hydrator__button cart-hydrator__button--replace" onClick={handleReplace}>
            Replace with new ones
          </button>
          <button type="button" className="cart-hydrator__button cart-hydrator__button--add" onClick={handleMerge} title="">
            Add to old cart
          </button>
        </div>
      </div>
    </div>
  )
}