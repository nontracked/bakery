import './CheckoutForm.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "@/components/Field";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {Button} from "@/ui/Button";
import {usePromocode} from "@/hooks/usePromocode";

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
  const {isSuccess, handleApply, isApplyDisabled} = usePromocode({watch, getValues, clearErrors, setError} )
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
          disabled={isApplyDisabled}
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