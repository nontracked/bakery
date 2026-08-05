import {useState, useTransition} from "react";
import {useCartStore} from "@/store/useCartStore";
import {checkPromocode} from "@/actions/checkPromocode";
import {UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormWatch} from "react-hook-form";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {z} from "zod";

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface Props {
  watch: UseFormWatch<CheckoutFormValues>,
  getValues: UseFormGetValues<CheckoutFormValues>,
  clearErrors: UseFormClearErrors<CheckoutFormValues>,
  setError: UseFormSetError<CheckoutFormValues>
}

export const usePromocode = ({watch, getValues, clearErrors, setError}: Props) => {
  const setAppliedPromocode = useCartStore((state) => state.setAppliedPromocode)
  const appliedPromocode = useCartStore((state) => state.appliedPromocode)
  const [isSuccess, setIsSuccess] = useState('')
  const [isPending, setTransition] = useTransition()
  const promocodeWatcher = watch('promocode')
  const handleApply = () => {
    const code = getValues('promocode')
    if (!code || code.length === 0) return
    clearErrors('promocode') // очищаем предыдущие ошибки если были
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
    isPending ||
    !promocodeWatcher ||
    promocodeWatcher?.trim()?.toUpperCase() !== appliedPromocode?.trim()?.toUpperCase()

  return {isSuccess, isApplyDisabled, handleApply}
}