'use client'
import './Modal.scss'
import {useRouter} from "next/navigation";
import React, {useRef, useState} from "react";
import {useIsMobile} from "@/hooks/useIsMobile";
import {clsx} from "clsx";
import Image from "next/image";
import {X} from 'lucide-react';
import {Product} from "@/types/product";
import {useFormattedPrice} from "@/hooks/useFormattedPrice";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useScrollLock} from "@/hooks/useScrollLock";
import {useFormattedIngredient} from "@/hooks/useFormattedIngredient";
import {Rating} from "@/ui/Rating";
import {Button} from "@/ui/Button";
import {Oval} from "react-loader-spinner";

gsap.registerPlugin(useGSAP);

interface ModalProps {
  product: Product
}

export const Modal = ({product}: ModalProps) => {
  const {name, imgSrc, desc, price, ingredients, rating, weight, outOfStock} = product
  const [imageLoading, setImageLoading] = useState<boolean>(true)
  const {isMobile} = useIsMobile()
  const productPrice = useFormattedPrice(price)
  const router = useRouter()
  const formattedIng = useFormattedIngredient(ingredients)
  useScrollLock()

  const containerRef = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)

  const {contextSafe} = useGSAP(() => {
    if (isMobile) return
    timeline.current = gsap.timeline({paused: true})
      .from(containerRef.current, {
        backgroundColor: 'rgba(0, 40, 3, 0)',
        duration: 0.25,
        ease: 'power2.inOut'
      })
      .from('.modal__body', {
        y: 120,
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        ease: 'back.out(1.2)'
      }, '<')
    timeline.current.play()
  }, {scope: containerRef, dependencies: [isMobile]})

  const onCloseClick = contextSafe(() => {
    timeline.current?.reverse().then(() => {
      router.back()
    })
  })
  return (
    <div
      className={clsx("modal", isMobile && "modal--mobile")}
      onClick={onCloseClick}
      ref={containerRef}
    >
      <div className="modal__body" onClick={(event) => event.stopPropagation()}>
        <div className="modal__image-wrap">
          {imageLoading && <Oval
            wrapperClass="modal__oval"
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />}
          <Image
            onLoad={() => setImageLoading(false)} loading="eager" className="modal__image" src={imgSrc} alt="name"
            width={500}
            height={690}
          />
        </div>
        <div className="modal__content">
          <header className="modal__header">
            <h4 className="modal__title">{name}</h4>
            <Rating className="modal__rating" rate={rating} />
            <div className="modal__desc">
              <p>{desc}</p>
            </div>
            <ul className="modal__list">
              {formattedIng.map((item, index) => (
                <li className="modal__item" key={index}>— {item}</li>
              ))}
            </ul>
            <div className="modal__product-weight">Weight: {weight} g</div>
          </header>
          <div className="modal__price">
            <p>$ {productPrice}</p>
          </div>
          <div className="modal__action">
            <Button
              className="product-card__button" label={outOfStock ? "Out of stock" : "Add to cart"} disabled={outOfStock}
            />
          </div>
        </div>
        <div className="modal__close-wrap" onClick={onCloseClick}>
          <X className="modal__close" size={44} strokeWidth={1.25} />
        </div>
      </div>
    </div>
  )
}