import {Checkout} from "@/components/Checkout";
import {Suspense} from "react";

export default function CheckoutPage() {

  return (
    <main className="checkout__main">
      <Suspense fallback={<div>Loading...</div>}>
        <Checkout />
      </Suspense>
    </main>
  )
}