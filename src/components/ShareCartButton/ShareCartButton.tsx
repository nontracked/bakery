'use client'
import './ShareCartButton.scss'
import {useHydratedStore} from "@/hooks/useHydratedStore";
import {useCartStore} from "@/store/useCartStore";
import {useState} from "react";
import {generateShareCart} from "@/actions/shareCart";
import {toast} from "sonner";

export const ShareCartButton = () => {
  const cart = useHydratedStore(useCartStore, ((state) => state.cart))
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    if (!cart || cart.length === 0) return
    setIsLoading(true)
    try {
      const shortCart = cart.map(({id, quantity}) => ({id, quantity}))
      const cartId = await generateShareCart(shortCart)
      if (!cartId) throw new Error('Shopping cart ID not received')
      const shareUrl = `${window.location.origin}?cart=${cartId}`
      await navigator.clipboard.writeText(shareUrl)
      toast.success('The link to the shopping cart has been copied!')
    } catch (error) {
      toast.error('An error occurred whilst copying the link to the basket.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const isDisabled = !cart || cart.length === 0 || isLoading
  return (
    <button className="share-cart-button" onClick={handleClick} disabled={isDisabled}>
      {isLoading ? 'A link is being created...' : 'Share with the shopping cart'}
    </button>
  )
}