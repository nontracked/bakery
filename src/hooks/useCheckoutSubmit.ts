import {checkoutSchema} from "@/schemas/checkoutSchema";
import {z} from "zod";
import {useCartStore} from "@/store/useCartStore";
import {useTransition} from "react";
import {SubmitHandler} from "react-hook-form";
import {createOrder} from "@/actions/checkout";
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

export const useCheckoutSubmit = () => {
  const cart = useCartStore(state => state.cart)
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
  return {isPending, handleSubmit}
}