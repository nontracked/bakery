'use client'
import './Checkout.scss'
import {CheckoutForm} from "@/components/CheckoutForm";

export const Checkout = () => {
  const handleSubmit = () => {
    console.log('данные собраны')
  }
  return (
    <div className="checkout container">
      <CheckoutForm onSubmit={handleSubmit} />
      <div className="checkout__cart">
        <button type="submit" form="checkout-form">
          send
        </button>
      </div>
    </div>
  )
}