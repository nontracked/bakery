'use client'
import './Success.scss'
import Image from "next/image";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {TAXES_VALUE} from "@/lib/constants";
import {formatPrice} from "@/utils/formatPrice";
import {useCartStore} from "@/store/useCartStore";

interface Props {
  orderId: string,
  paymentTime?: string,
  clientName: string,
  totalPrice: number,
}

export const Success = ({orderId, paymentTime, clientName, totalPrice}: Props) => {
  const clearCart = useCartStore((state) => state.clearCart)
  const totalFormatted = formatPrice(totalPrice)
  const serviceFeeFormatted = formatPrice(totalPrice * TAXES_VALUE)
  const subTotalPrice = formatPrice(totalPrice - (totalPrice * TAXES_VALUE))
  const router = useRouter()
  const orderDetails = [
    {label: 'Short Order Id', value: orderId},
    {label: 'Payment Time', value: paymentTime},
    {label: 'Payment Method', value: 'Card'},
    {label: 'Client Name', value: clientName},
  ]
  const paymentDetails = [
    {label: 'Amount', value: `$ ${subTotalPrice}`},
    {label: 'Service Fee', value: `$ ${serviceFeeFormatted}`},
  ]
  useEffect(() => {
    clearCart()
    sessionStorage.removeItem('checkout-draft')
  }, []);
  return (
    <div className="success">
      <div className="success__wrap">
        <div className="success__inner">
          <header className="success__header">
            <Image className="success__icon" src="/success/success.svg" alt="success" width={100} height={100} />
            <h1 className="success__title">Payment Success!</h1>
            <span>$ {totalFormatted}</span>
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