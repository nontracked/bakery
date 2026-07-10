import React from "react";
import {Modal} from "@/ui/Modal";
import {getProductById} from "@/lib/products";
import {notFound} from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductModal({params}: Props) {
  const {id} = await params
  const product = await getProductById(id)
  // переписать способ получения продукта
  if (!product) {
    return notFound()
  }
  return (
    <Modal product={product} />
  )
}


// сделать скелетоны, лоадеры, обработчики ошибок для всех компонентов,