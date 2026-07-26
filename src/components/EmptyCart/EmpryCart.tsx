import './EmptyCart.scss'
import Image from "next/image";
import React from "react";

export const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <Image className="empty-cart__image" src="/cartEmpty/1.jpg" alt="Empty cart" width={300} height={300} />
      <span>Please start adding items to your cart!</span>
    </div>
  )
}