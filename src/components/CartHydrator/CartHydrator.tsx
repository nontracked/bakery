'use client'
import './CartHydrator.scss'
import {CartItem, useCartStore} from "@/store/useCartStore";
import {useEffect, useState} from "react";

interface Props {
  fullItems: CartItem[]
}

export const CartHydrator = ({fullItems}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    } else {
      setIsModalOpen(true)
    }
  }, [fullItems]);

  const handleMerge = () => {
    mergeCart(fullItems)
    setIsModalOpen(false)
    clearUrl()
  }

  const handleReplace = () => {
    setCart(fullItems)
    setIsModalOpen(false)
    clearUrl()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    clearUrl()
  }

  if (!isModalOpen) return null

  return (
    <div className="cart-hydrator__overlay" onClick={handleCancel}>
      <div className="cart-hydrator__content">
        <h3>В вашей корзине уже есть товары!</h3>
        <p>Вы перешли по ссылке с совместной корзиной. Как поступить с товарами?</p>
        <div className="cart-hydrator__actions">
          <button type="button" className="cart-hydrator__button" onClick={handleCancel}>
            Отменить
          </button>
          <button type="button" className="cart-hydrator__button" onClick={handleReplace}>
            Заменить
          </button>
          <button type="button" className="cart-hydrator__button" onClick={handleMerge}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}