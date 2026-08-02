import './CheckoutForm.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "@/components/Field";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutSchema} from "@/schemas/checkoutSchema";

interface CheckoutFormProps {
  onSubmit: SubmitHandler<any> // SubmitHandler сам подхватит нужные типы данных
}

export const CheckoutForm = ({onSubmit}: CheckoutFormProps) => {
  const formId = 'checkout-form'
  const {register, handleSubmit, formState: {errors}} = useForm(
    {
      resolver: zodResolver(checkoutSchema),
      mode: 'onTouched',
    })
  return (
    <form className={formId} id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Field label="First Name" errors={errors} register={register} schemaName="firstName" placeholder="Ivan" />
    </form>
  )
}