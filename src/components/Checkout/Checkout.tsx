'use client'
import './Checkout.scss'
import {CheckoutForm} from "@/components/CheckoutForm";
import {useRouter} from "next/navigation";
import {CheckoutCart} from "@/components/CheckoutCart";
import {useCartStore} from "@/store/useCartStore";
import {SubmitHandler} from "react-hook-form";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {z} from "zod";
import {createOrder} from "@/actions/checkout";

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
  const appliedPromocode = useCartStore(state => state.appliedPromocode)
  const handleSubmit: SubmitHandler<CheckoutFormValues> = async (formData) => {
    if (!cart || cart.length === 0) return

    // Цены мы специально вырезаем, чтобы сервер сам их посчитал
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
      await createOrder(payload)
    } catch (e) {
      console.error(e)
    }
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