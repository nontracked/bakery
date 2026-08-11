import React from "react";
import './Success.scss'
import Image from "next/image";

export default function SuccessPage() {
  return (
    <>
      {/*      <Header />*/}
      <main className="success__main container">
        <div className="success__wrap">
          <div className="success__inner">
            <header className="success__header">
              <Image className="success__icon" src="/success/success.svg" alt="success" width={100} height={100} />
              <h1 className="success__title">Payment Success!</h1>
              <span>$21.12</span>
            </header>
            <div className="success__body">
              <div className="success__cell">
                <span className="success__info">Short Order Id</span>
                <p className="success__data">23131423</p>
              </div>
              <div className="success__cell">
                <span className="success__info">Payment Time</span>
                <p className="success__data">14:10</p>
              </div>
              <div className="success__cell">
                <span className="success__info">Payment Method</span>
                <p className="success__data">Card</p>
              </div>
              <div className="success__cell">
                <span className="success__info">Client Name</span>
                <p className="success__data">Piter Griffin</p>
              </div>
            </div>
            <div className="success__payment">
              <div className="success__cell">
                <span className="success__info">Amount</span>
                <p className="success__data">$ 21.21</p>
              </div>
              <div className="success__cell">
                <span className="success__info">Service Fee</span>
                <p className="success__data">$ 0.68</p>
              </div>
            </div>
          </div>
          <button className="success__button" type="button" >
            Back To Main Page
          </button>
        </div>

      </main>
      {/*      <Footer />*/}
    </>
  )
}