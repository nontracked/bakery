import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {Stripe} from "stripe";
import {db} from "@/db";
import {orders} from "@/db/schema";
import {eq} from "drizzle-orm";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (request: Request) => {
  const body = await request.text()
  const headerList = await headers()
  const signature = headerList.get('stripe-signature')
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error) {
    console.error('Webhook signature error', error.message)
    return NextResponse.json({error: 'Invalid signature'}, {status: 400})
  }
  const session = event.data.object as Stripe.Checkout.Session
  const orderId = session.metadata?.orderId
  if (event.type === 'checkout.session.completed') {
    if (orderId) {
      await db.update(orders).set({status: 'PAID'}).where(eq(orders.id, orderId))
    } else if (event.type === 'checkout.session.expired') {
      await db.update(orders).set({status: 'EXPIRED'}).where(eq(orders.id, orderId))
    }
  }
  return NextResponse.json({status: 200})
}