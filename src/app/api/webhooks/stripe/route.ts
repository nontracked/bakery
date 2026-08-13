import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {Stripe} from "stripe";
import {db} from "@/db";
import {orders} from "@/db/schema";
import {eq} from "drizzle-orm";
import {resend} from "@/lib/resend";
import {ShortCartItems} from "@/actions/checkout";
import {Email} from "@/emails/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const POST = async (request: Request) => {
  const body = await request.text()
  const headerList = await headers()
  const signature = headerList.get('stripe-signature')
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (error: any) {
    console.error('Webhook signature error', error.message)
    return NextResponse.json({error: 'Invalid signature'}, {status: 400})
  }
  const session = event.data.object as Stripe.Checkout.Session
  const orderId = session.metadata?.orderId
  if (event.type === 'checkout.session.completed') {
    if (orderId) {
      const items = session.metadata?.receiptItems as string
      const customerEmail = session.customer_details?.email
      const parsedItems: ShortCartItems[] = JSON.parse(items)
      await db.update(orders).set({status: 'PAID'}).where(eq(orders.id, orderId))
      if (customerEmail) {
        await resend.emails.send({
          from: 'Bakery <onboarding@resend.dev>',
          to: customerEmail,
          subject: 'Your order has been successfully paid! ✅',
          react: Email({parsedItems, orderId})
        })
      }
    }
  } else if (event.type === 'checkout.session.expired') {
    if (orderId) {
      await db.update(orders).set({status: 'EXPIRED'}).where(eq(orders.id, orderId))
    }
  }
  return NextResponse.json({status: 200})
}