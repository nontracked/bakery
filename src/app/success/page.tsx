import React from "react";
import {Success} from "@/components/Success";
import {db} from "@/db";
import {orders} from "@/db/schema";
import {eq} from "drizzle-orm";
import {notFound} from "next/navigation";

interface Props {
  searchParams: Promise<{ [key: string]: string }>
}

export default async function SuccessPage({searchParams}: Props) {
  const params = await searchParams
  const orderId = params?.order
  let dbOrder
  try {
    [dbOrder] = await db.select()
      .from(orders)
      .where(eq(orders.id, orderId))
    if (!dbOrder) {
      throw new Error('Error order ID')
    }
  } catch (e: any) {
    console.error(e)
    return notFound()
  }
  const {customerName, totalPrice, createdAt, email, discountPercent, subTotalPrice} = dbOrder
  const paymentTime = createdAt
    ? new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Yekaterinburg',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(createdAt)
    : 'Time not found';
  const shortOrderId = orderId?.split('-')[0]

  return (
    <>
      <main className="success__main container">
        <Success
          orderId={shortOrderId} totalPrice={totalPrice} email={email} clientName={customerName}
          paymentTime={paymentTime} subTotalPrice={subTotalPrice} discountPercent={discountPercent ?? 0}
        />
      </main>
    </>
  )
}