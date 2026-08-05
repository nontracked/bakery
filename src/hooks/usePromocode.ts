import {useState, useTransition} from "react";
import {useCartStore} from "@/store/useCartStore";
import {checkPromocode} from "@/actions/checkPromocode";
import {UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormWatch} from "react-hook-form";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {z} from "zod";
import {useHydratedStore} from "@/hooks/useHydratedStore";

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface Props {
  watch: UseFormWatch<CheckoutFormValues>,
  getValues: UseFormGetValues<CheckoutFormValues>,
  clearErrors: UseFormClearErrors<CheckoutFormValues>,
  setError: UseFormSetError<CheckoutFormValues>
}

export const usePromocode = ({watch, getValues, clearErrors, setError}: Props) => {
  const cart = useHydratedStore(useCartStore, (state) => state.cart)
  const setAppliedPromocode = useCartStore((state) => state.setAppliedPromocode)
  const appliedPromocode = useCartStore((state) => state.appliedPromocode)
  const [isSuccess, setIsSuccess] = useState('')
  const [isPending, setTransition] = useTransition()
  const promocodeWatcher = watch('promocode')
  const handleApply = () => {
    const code = getValues('promocode')
    if (!code || code.length === 0) return
    clearErrors('promocode')
    setIsSuccess('')
    setAppliedPromocode(0, '')
    setTransition(async () => {
      const response = await checkPromocode(code)
      if (response.error) {
        setError('promocode', {type: 'server', message: response.error})
      } else if (response.success && response.percent) {
        setAppliedPromocode(response.percent, code)
        setIsSuccess(`Promo code applied! (-${response.percent}%)`)
      }
    })
  }
  const isApplyDisabled =
    !cart ||
    cart.length === 0 ||
    isPending ||
    !promocodeWatcher ||
    promocodeWatcher?.trim()?.toUpperCase() === appliedPromocode?.toUpperCase()

  return {isSuccess, isApplyDisabled, handleApply}
}