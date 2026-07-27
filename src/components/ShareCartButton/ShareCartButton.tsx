'use client'
import './ShareCartButton.scss'
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {useCartStore} from "@/store/useCartStore";
import {useState} from "react";
import {generateShareCart} from "@/actions/shareCart";

export const ShareCartButton = () => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart)
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    if (!cart || cart.length === 0) return
    setIsLoading(true)

    try {
      const shortItems = cart.map(({id, quantity}) => ({id, quantity})) // вернет укороченный массив
      const cartId = await generateShareCart(shortItems) // передаем items и получаем id корзины
      if (!cartId) throw new Error('Shopping cart ID not received')
      const shareURL = `${window.location.origin}?cart=${cartId}`
      await navigator.clipboard.writeText(shareURL)
      alert('Ссылка скопирована', +shareURL)
    } catch (error) {
      console.error('Произошла ошибка:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = !cart || isLoading || cart.length === 0

  return (
    <button className="share-cart-button" onClick={handleClick} disabled={isDisabled}>
      {isLoading ? 'A link is being created...' : 'Share with the shopping cart'}
    </button>
  )
}