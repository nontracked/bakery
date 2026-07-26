'use client'
import './Header.scss'
import {ShoppingBasket} from "lucide-react";
import {CartCount} from "@/components/CartCount";
import {useCartStore} from "@/store/useCartStore";
import {Logo} from "@/components/Logo";

export const Header = () => {
  const openCart = useCartStore((state) => state.openCart)
  return (
    <header className="header">
      <Logo />
      <button className="header__cart-button" type="button" onClick={openCart}>
        <div className="header__cart">
        <span className="header__cart-count">
          <CartCount />
        </span>
          <ShoppingBasket strokeWidth={1.25} height={30} width={30} />
        </div>
      </button>
    </header>
  )
}