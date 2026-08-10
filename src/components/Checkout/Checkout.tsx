'use client'
import './Checkout.scss'
import {CheckoutForm} from "@/components/CheckoutForm";
import {useRouter} from "next/navigation";
import {CheckoutCart} from "@/components/CheckoutCart";
import {usePaymentCancelToast} from "@/hooks/usePaymentCancelToast";
import {useCheckoutSubmit} from "@/hooks/useCheckoutSubmit";

export const Checkout = () => {
  const router = useRouter()
  const {isPending, handleSubmit} = useCheckoutSubmit()
  usePaymentCancelToast()
  return (
    <div className="checkout container">
      <div className="checkout__info">
        <div className="checkout__header">
          <button className="checkout__button" type="button" onClick={()=> {
            router.push('/')
          }}>
            Back
          </button>
          <button className="checkout__button" form="checkout-form" type="reset">
            Clear form
          </button>
          <h1 className="checkout__title">Shipping info</h1>
        </div>
        <CheckoutForm onSubmit={handleSubmit} />
      </div>
      <CheckoutCart isPending={isPending} />
    </div>
  )
}