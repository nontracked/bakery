import './CheckoutForm.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "@/components/Field";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {Button} from "@/ui/Button";
import {useState, useTransition} from "react";
import {checkPromocode} from "@/actions/checkPromocode";
import {useCartStore} from "@/store/useCartStore";

interface CheckoutFormProps {
  onSubmit: SubmitHandler<any> // SubmitHandler сам подхватит нужные типы данных
}

export const CheckoutForm = ({onSubmit}: CheckoutFormProps) => {
  const formId = 'checkout-form'
  const {
    register,
    handleSubmit,
    watch, // перерисовывает компонент
    getValues,// позволяет "подсмотреть" текущее значение любого поля в RHF без запуска валидации и сабмита всей формы (не перерисовывает компонент)
    setError, // zod не знает про промокоды ничего, поэтому будем в ручную вызывать ошибку
    clearErrors,// сброс старой ошибки
    formState: {errors}
  } = useForm(
    {
      resolver: zodResolver(checkoutSchema),
      mode: 'onTouched',
    })
  const setAppliedPromocode = useCartStore((state) => state.setAppliedPromocode)
  const appliedPromocode = useCartStore((state) => state.appliedPromocode)
  const [isSuccess, setIsSuccess] = useState('')
  const [isPending, setTransition] = useTransition()// не даем зависнуть интерфейсу пока делам запрос, управляем загрузкой
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
  return (
    <form className={formId} id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Field label="First Name" isReq errors={errors} register={register} schemaName="firstName" placeholder="Ivan" />
      <Field label="Last Name" errors={errors} register={register} schemaName="lastName" placeholder="Ivanov" />
      <Field
        label="Email" isReq placeholder="example@gmail.com" errors={errors} register={register} schemaName="email"
      />
      <Field label="Phone" isReq placeholder="Your Number" errors={errors} register={register} schemaName="phone" />
      <Field
        className="wide" isReq label="Address" placeholder="Your Address"
        errors={errors} register={register}
        schemaName="address"
      />

      <Field
        className="wide" label="Discount" isSuccess={isSuccess} placeholder="Discount Code" errors={errors}
        register={register}
        schemaName="promocode"
        actionElement={<Button
          type="button"
          label="Apply" className="field__button-apply"
          disabled={isPending || !promocodeWatcher || promocodeWatcher?.trim()?.toUpperCase() === appliedPromocode?.toUpperCase()}
          onClick={handleApply}
        />}
      />

      <Field
        className="wide" textarea label="Comment" placeholder="Write a comment..." errors={errors} register={register}
        schemaName="comment"
      />
    </form>
  )
}