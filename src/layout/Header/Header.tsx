'use client'
import './Header.scss'
import {ShoppingBasket} from "lucide-react";
import {CartCount} from "@/components/CartCount";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__cart">
        <span className="header__cart-count">
          <CartCount />
        </span>
        <button className="header__cart-button" type="button">
          <ShoppingBasket strokeWidth={1.25} height={30} width={30}  />
        </button>
      </div>
    </header>
  )
}