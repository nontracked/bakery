import {Stripe} from "stripe";
import {NextResponse} from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const POST = async (req: Request) => {
  try {
    const body = await req.json() // Получаем данные, которые фронтенд пришлет при клике на чекаут
    const {amount} = body
    // Создаем "намерение об оплате" в Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      }
    })
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Error creating a payment', error)
    return NextResponse.json(
      {error: 'Server error'},
      {status: 500}
    )
  }
}