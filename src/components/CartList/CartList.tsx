import './CartList.scss'
import {CartItem as CartItemModal} from "@/components/CartItem";
import React from "react";
import {CartItem} from "@/store/useCartStore";
import {clsx} from "clsx";
import {motion, AnimatePresence} from 'framer-motion'

interface Props {
  cart: CartItem[],
  classNameList: string,
  classNameItem: string
}

export const CartList = ({cart, classNameList, classNameItem}: Props) => {
  return (
    <ul className={clsx(classNameList)}>
      <AnimatePresence initial={false}>
        {cart?.map((item) => (
          <motion.li
            className={clsx(classNameItem)}
            key={item.id}
            layout="position"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.25, ease: 'easeOut'}}
          >
            <CartItemModal item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}