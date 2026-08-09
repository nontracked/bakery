'use client'
import './Checkout.scss'
import {CheckoutForm} from "@/components/CheckoutForm";
import {useRouter, useSearchParams} from "next/navigation";
import {CheckoutCart} from "@/components/CheckoutCart";
import {useCartStore} from "@/store/useCartStore";
import {SubmitHandler} from "react-hook-form";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {z} from "zod";
import {createOrder} from "@/actions/checkout";
import {useEffect, useTransition} from "react";
import {toast} from "sonner";

type CheckoutFormValues = z.infer<typeof checkoutSchema>
export type Payload = {
  customerName: string;
  phone: string;
  address: string;
  email: string;
  promocode: string | null;
  comment: string | null;
  items: {
    productId: string;
    quantity: number
  }[];
}
export const Checkout = () => {
  const router = useRouter()
  const cart = useCartStore(state => state.cart)
  const searchParams = useSearchParams()
  const appliedPromocode = useCartStore(state => state.appliedPromocode)
  const [isPending, startTransition] = useTransition()
  const handleSubmit: SubmitHandler<CheckoutFormValues> = async (formData) => {
    if (!cart || cart.length === 0) return
    const itemsForBackend = cart.map(({id, quantity}) => ({
      productId: id,
      quantity
    }))
    const payload: Payload = {
      customerName: `${formData.firstName} ${formData.lastName || ''}`.trim(),
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      comment: formData.comment || null,
      promocode: appliedPromocode || null,
      items: itemsForBackend,
    }
    try {
      startTransition(async () => {
        const response = await createOrder(payload)
        if (response.success && response.url) {
          toast.success('Successfully processed!', {className: 'custom-toast__checkout'})
          window.location.href = response.url // просто перенаправляем пользователя по ссылке от Stripe
        } else {
          toast.warning('Error whilst placing an order', {className: 'custom-toast__checkout'})
        }
      })
    } catch (e) {
      console.error(e)
      toast.error('Error whilst placing an order', {className: 'custom-toast__checkout'})
    }
  }
  useEffect(() => {
    let timer = null
    if (searchParams.has('canceled')) {
      timer = setTimeout(() => {
        toast.warning('Payment was cancelled', {className: 'custom-toast__checkout'})
      }, 500)
      window.history.replaceState({}, '', '/checkout')
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [searchParams]);
  return (
    <div className="checkout container">
      <div className="checkout__info">
        <div className="checkout__header">
          <button className="checkout__button" type="button" onClick={router.back}>
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