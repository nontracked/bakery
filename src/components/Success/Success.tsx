'use client'
import './Success.scss'
import Image from "next/image";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useCartStore} from "@/store/useCartStore";
import {useReceiptMath} from "@/hooks/useReceiptMath";

interface Props {
  orderId: string,
  paymentTime: string,
  clientName: string,
  totalPrice: number,
  email: string,
  discountPercent: number,
  subTotalPrice: number
}

export const Success = ({
                          orderId,
                          email,
                          discountPercent,
                          subTotalPrice,
                          paymentTime,
                          clientName,
                          totalPrice
                        }: Props) => {
  const clearCart = useCartStore((state) => state.clearCart)
  const {
    subTotalPriceFormatted,
    totalPriceFormatted,
    serviceFeeFormatted,
    discountSumFormatted
  } = useReceiptMath({totalPrice, subTotalPrice, discountPercent})
  const router = useRouter()
  const orderDetails = [
    {label: 'Short Order Id', value: orderId},
    {label: 'Payment Time', value: paymentTime},
    {label: 'Payment Method', value: 'Card'},
    {label: 'Client Name', value: clientName},
    {label: 'Client Email', value: email},
  ]
  const paymentDetails = [
    {label: 'Amount', value: `$ ${subTotalPriceFormatted}`},
    {label: 'Service Fee', value: `$ ${serviceFeeFormatted}`},
  ]
  useEffect(() => {
    clearCart()
    sessionStorage.removeItem('checkout-draft')
  }, [clearCart]);
  return (
    <div className="success">
      <div className="success__wrap">
        <div className="success__inner">
          <header className="success__header">
            <Image className="success__icon" src="/success/success.svg" alt="success" width={100} height={100} />
            <h1 className="success__title">Payment Success!</h1>
            <span>$ {totalPriceFormatted}</span>
          </header>
          <div className="success__body">
            {orderDetails.map(({label, value}) => (
              <div className="success__cell" key={label}>
                <span className="success__info">{label}</span>
                <p className="success__data">{value}</p>
              </div>
            ))}
          </div>
          <div className="success__payment">
            {paymentDetails.map(({label, value}) => (
              <div className="success__cell" key={label}>
                <span className="success__info">{label}</span>
                <p className="success__data">{value}</p>
              </div>
            ))}
            {discountSumFormatted && (
              <div className="success__cell">
                <span className="success__info">Discount</span>
                <p className="success__data">-$ {discountSumFormatted}</p>
              </div>
            )}
          </div>
        </div>
        <button
          className="success__button" type="button" onClick={() => router.replace('/')}
        >
          Back To Main Page
        </button>
      </div>
    </div>
  )
}