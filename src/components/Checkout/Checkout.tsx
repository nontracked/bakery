'use client'
import './Checkout.scss'
import {CheckoutForm} from "@/components/CheckoutForm";
import {useRouter} from "next/navigation";
import {CheckoutCart} from "@/components/CheckoutCart";

export const Checkout = () => {
  const router = useRouter()
  const handleSubmit = () => {
    console.log('данные собраны')
  }

  return (
    <div className="checkout container">
      <div className="checkout__info">
        <div className="checkout__header">
          <button className="checkout__button" type="button" onClick={router.back}>
            Back
          </button>
          <h1 className="checkout__title">Shipping info</h1>
        </div>
        <CheckoutForm onSubmit={handleSubmit} />
      </div>
      <CheckoutCart />
    </div>
  )
}