'use client'
import './Header.scss'
import {ChevronRight, ShoppingBasket} from "lucide-react";
import {CartCount} from "@/components/CartCount";
import {useCartStore} from "@/store/useCartStore";
import {Logo} from "@/components/Logo";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";

export const Header = () => {
  const openCart = useCartStore((state) => state.openCart)
  const pathname = usePathname()
  return (
    <header className="header">
      <Logo />
      <button
        className={clsx("header__cart-button", pathname === '/checkout' && 'visually-hidden')} type="button" onClick={openCart}
      >
        <ChevronRight className="header__cart-chevron" strokeWidth={1.5} size={40} />
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