import {Checkout} from "@/components/Checkout";
import {Suspense} from "react";
import {Oval} from "react-loader-spinner";
import {Footer} from "@/layout/Footer";

export default function CheckoutPage() {

  return (
    <>
      <main className="checkout__main">
        <Suspense fallback={<Oval />}>
          <Checkout />
        </Suspense>
      </main>
    </>
  )
}