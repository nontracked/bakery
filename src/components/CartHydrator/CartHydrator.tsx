import './CartHydratator.scss'
import {CartItem, useCartStore} from "@/store/useCartStore";
import {useEffect, useState} from "react";

interface Props {
  fullItems: CartItem[]
}

export const CartHydratator = ({fullItems}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const setCart = useCartStore((state) => state.setCart)
  const mergeCart = useCartStore((state) => state.mergeCart)
  const clearUrl = () => {
    const newUrl = window.location.pathname
    window.history.replaceState({}, '', newUrl)
  }
  useEffect(() => {
    if (!fullItems || fullItems.length === 0) return
    const currentCart = useCartStore.getState().cart // достаем текущую корзину напрямую
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
    <div className="cart-hydrator">

    </div>
  )
}