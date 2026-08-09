import './CheckoutForm.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "@/components/Field";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutSchema} from "@/schemas/checkoutSchema";
import {Button} from "@/ui/Button";
import {usePromocode} from "@/hooks/usePromocode";
import {z} from "zod";
import React, {useEffect} from "react";

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: SubmitHandler<CheckoutFormValues>
}

type FieldConfig = {
  schemaName: keyof CheckoutFormValues;
  label: string;
  placeholder: string;
  isReq?: boolean;
  className?: string;
  textarea?: boolean;
}

const getSaveFromData = () => {
  try {
    const savedData = sessionStorage.getItem('checkout-draft')
    return savedData ? JSON.parse(savedData) : {}
  } catch (error) {
    return {}
  }
}

const STANDARD_FIELDS: FieldConfig[] = [
  {schemaName: 'firstName', label: 'First Name', placeholder: 'Ivan', isReq: true},
  {schemaName: 'lastName', label: 'Last Name', placeholder: 'Ivanov'},
  {schemaName: 'email', label: 'Email', placeholder: 'example@gmail.com', isReq: true},
  {schemaName: 'phone', label: 'Phone', placeholder: 'Your Number', isReq: true},
  {schemaName: 'address', label: 'Address', placeholder: 'Your Address', isReq: true, className: 'wide'}
]

export const CheckoutForm = ({onSubmit}: CheckoutFormProps) => {
  const formId = 'checkout-form'
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    reset,
    clearErrors,
    formState: {errors}
  } = useForm(
    {
      resolver: zodResolver(checkoutSchema),
      mode: 'onTouched',
      defaultValues: getSaveFromData(),
    })
  const {isSuccess, handleApply, isApplyDisabled} = usePromocode({watch, getValues, clearErrors, setError})
  const allFormData = watch()
  const handleReset = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
      promocode: ''
    })
    sessionStorage.removeItem('checkout-draft')
  }
  useEffect(() => {
    const {promocode, ...rest} = allFormData
    sessionStorage.setItem('checkout-draft', JSON.stringify(rest))

  }, [allFormData]);

  return (
    <form className={formId} id={formId} onReset={handleReset} onSubmit={handleSubmit(onSubmit)}>
      {STANDARD_FIELDS.map(({label, schemaName, placeholder, isReq, className}) => (
        <Field
          key={schemaName}
          className={className} isReq={isReq} label={label} errors={errors} register={register} schemaName={schemaName}
          placeholder={placeholder}
        />
      ))}

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